import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from '../axios/axiosInstance'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function DelDialog({openDel,setOpenDel,prodID,token}) {
  const navigate=useNavigate()
  const handleCloseDel=()=>{
    setOpenDel(false)
  }

  //handle delete
  const handleDelete=async()=>{
    const config={
      headers:{
        "Content-Type":"multipart/form-data",
        Authorization:token
        }
        }
    try {
      const {data}=await axiosInstance.delete(`/product/delete/${prodID}`,config)
      console.log(data);
      if(data.success){
        navigate('/dashboard/admin/products')
        setTimeout(() => {
          toast.success(data.message)
        }, 500);
      }else{
        toast.error('error')
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
        <Dialog open={openDel} onClose={handleCloseDel}>
          <DialogTitle textAlign='center'>Delete product</DialogTitle>
          <DialogContent>
            <p>are you sure to delete this product</p>
          </DialogContent>
          <DialogActions 
            style={{ display: 'flex', justifyContent: 'space-between' }}
            >
            
            <Button onClick={()=> setOpenDel(false)} 
            color="error"
            variant='outlined'
            >
              <CloseIcon/>
            </Button>
            <Button onClick={()=>handleDelete()}
              color="primary"
              variant='outlined'>
              <CheckIcon/>
            </Button>
          </DialogActions>
        </Dialog>
      )
    }

export default DelDialog