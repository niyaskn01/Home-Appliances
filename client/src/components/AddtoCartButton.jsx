import React from 'react'
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios/axiosInstance'
import toast from 'react-hot-toast';

function AddtoCartButton({product}) {
  const navigate=useNavigate()
  const user=useSelector(state=>state.user)
  
  const handleAddToCart = async(product) => {
    if(user?._id){
      try {
        const {data}=await axiosInstance.post(`/user/addcart/${user._id}`,{product})
        toast.success(data)
      } catch (error) {
        console.log(error)
      }
    }else{
      navigate('/login')
    }

  };



  return (
    <Button variant="contained"
      style={{ backgroundColor: 'black', color: 'white' }}
      onClick={()=>handleAddToCart(product)}
    >
      Add to cart
    </Button>
  )
}

export default AddtoCartButton