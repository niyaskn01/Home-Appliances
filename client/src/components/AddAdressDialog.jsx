import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import axiosInstance from '../axios/axiosInstance'
import toast from 'react-hot-toast';

function AddAdressDialog({open,setOpen}) {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
  });
  const user=useSelector(state=>state.user)

  const handleClose=()=>{
    setOpen(false)
  }

  //add address
  const handleAddAdress=async()=>{
    const userID=user._id
    const config={
      headers:{
        Authorization:user?.token
        }
      }
    try {
      const {data}=await axiosInstance.put(`/user/update/${userID}`,{address},config)
      const {user}=data
      if(data.success){
        toast.success(data.message)
        localStorage.setItem('userAddress',JSON.stringify({name:user.name,address:user.address}))
        console.log(data.user);
        setAddress({
          street: '',
          city: '',
          state: '',
          zip: '',
        });
        handleClose()
      }else{
        toast.error('cant update')
      }
    } catch (error) {
      console.log(error);
      toast.error('error in adding address')
    }
  }


  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign='center'>Add Address</DialogTitle>
        <DialogContent>
        <TextField
          label="Street"
          name="street"
          value={address.street}
          onChange={(e)=>setAddress({...address,street:e.target.value})}
          fullWidth
          margin="normal"
        />
        <TextField
          label="City"
          name="city"
          value={address.city}
          onChange={(e)=>setAddress({...address,city:e.target.value})}
          fullWidth
          margin="normal"
        />
        <TextField
          label="State"
          name="state"
          value={address.state}
          onChange={(e)=>setAddress({...address,state:e.target.value})}
          fullWidth
          margin="normal"
        />
        <TextField 
          label="ZIP Code"
          name="zip"
          value={address.zip}
          onChange={(e)=>setAddress({...address,zip:e.target.value})}
          fullWidth
          margin="normal"
        />
        </DialogContent>
        <DialogActions>
          <Button color="inherit" variant='contained'
          onClick={handleAddAdress}
          >
            Submit
          </Button>
          <Button onClick={handleClose} color="primary">
            <CloseIcon/>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddAdressDialog