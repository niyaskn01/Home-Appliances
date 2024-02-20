import { Button } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios/axiosInstance'

function Checkout({open,setOpen}) {
const userfullInfo=useSelector(state=>state.userInformation)
const user=useSelector(state=>state.user)
const cartList=useSelector(state=>state.getCart.cartItems)
  const navigate=useNavigate()

  const handleOrder=()=>{
    if(userfullInfo?.address && user?._id){
      checkout()
    }
    else if(user?._id){
      setOpen(true)
    }
    else{
      navigate('/login')
    }
  }
  const products=cartList.map((item)=>item._id)
  const config={
    headers:{
      Authorization:user?.token
    }
  }
  //create order
  const createOrder=async()=>{
    await axiosInstance.post('order/create-order',{products},config)
  }

  //payement
  const checkout = async () => {
    try {
      createOrder()
      const res = await fetch(`http://localhost:8080/product/payment/${user?._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({
          customerName: userfullInfo?.name,
          items: cartList.map((item)=>(
            {
              _id:item?._id,
              quantity:item?.count,
              name:item?.name,
              price:item?.price
            }
            )),

        }),
      });
      const data = await res.json();
      window.location = data.url;
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <Button sx={{marginTop:'20px'}} variant='contained' onClick={handleOrder}>
        Order now
      </Button>
    </div>
  )
}

export default Checkout





