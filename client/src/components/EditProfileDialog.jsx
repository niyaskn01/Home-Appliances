import React, { useCallback, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from '../axios/axiosInstance';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

function EditProfileDialog({ open, setOpen }) {
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const user = useSelector(state => state.user);


  const handleClose = () => {
    setOpen(false);
  };

  // Separate getUser function logic
  const getUser = useCallback(async () => {
    const config = {
      headers: {
        Authorization: user?.token,
      },
    };
    try {
      const { data } = await axiosInstance(`/user/get-user/${user?._id}`, config);
      
      setName(data?.user?.name);
      setState(data?.user?.address?.state);
      setStreet(data?.user?.address?.street);
      setCity(data?.user?.address?.city);
      setZip(data?.user?.address?.zip);

    } catch (error) {
      console.log(error);
    }
  }, [user?.token, user?._id]);

  // Edit profile logic
  const handleEditProfile = async () => {
    const config={
      headers:{
        Authorization:user?.token
      }
    }
    const address={
      street,
      city,
      state,
      zip
    }
    const body = { name, address};
    try {
      const {data}=await axiosInstance.put(`/user/update/${user?._id}`,body,config)
      if(data.success){
        toast.success('profile updated')
        getUser()
        setOpen(false)
        localStorage.setItem('userAddress',JSON.stringify({name:data?.user?.name,address:data?.user?.address}))
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [getUser]); 

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle textAlign='center'>Edit Profile</DialogTitle>
      <DialogContent>
        <TextField label="Name" 
          name="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          fullWidth 
          margin="normal" />
        <TextField 
          label="Street" 
          name="street" 
          value={street} 
          onChange={(e) => setStreet(e.target.value)} 
          fullWidth 
          margin="normal" />
        <TextField 
          label="City" 
          name="city" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          fullWidth 
          margin="normal" />
        <TextField 
          label="State" 
          name="state" 
          value={state} 
          onChange={(e) => setState(e.target.value)} 
          fullWidth 
          margin="normal" />
        <TextField 
          label="ZIP Code" 
          name="zip" 
          value={zip} 
          onChange={(e) => setZip(e.target.value)} 
          fullWidth 
          margin="normal" />
      </DialogContent>
      <DialogActions>
        <Button color="inherit" variant='contained' onClick={handleEditProfile}>
          Submit
        </Button>
        <Button onClick={handleClose} color="primary">
          <CloseIcon />
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditProfileDialog;
