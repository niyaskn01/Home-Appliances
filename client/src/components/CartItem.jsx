import React from 'react';
import { Box, Button, ListItem, Paper, Typography } from '@mui/material';
import { baseURL } from '../axios/axiosInstance';
import axiosInstance from '../axios/axiosInstance'
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const CartItem = ({ item,cartList }) => 
{
  const user=useSelector(state=>state.user)
  const cartItem=cartList.find((c)=>item._id===c._id)

  const handleCart = async(product,count) => {
      try {
        const {data}=await axiosInstance.post(`/user/addcart/${user._id}`,{product,count})
        toast.success(data)
      } catch (error) {
        console.log(error)
      }
  };

  const handleRemove=async(product)=>{
    try {
      const {data}=await axiosInstance.put(`/user/remove/${user?._id}`,{product});
      toast.success(data)
    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <Paper style={{ display: 'flex', alignItems: 'center', minHeight: '200px', marginBottom: '10px' }}>
      <img
        src={`${baseURL}/product/get-photo/${item._id}`}  
        alt={item.name}
        style={{ maxWidth: '100px', marginRight: '20px', marginLeft: '30px' }}
      />
      <Box>
        <Typography variant="h5">{item.name}</Typography>
        <Typography variant="h6">price :{item.price}</Typography>
        <ListItem>
          Qty :
          <div style={{border:'1px solid gray',padding:'10px 10px',borderRadius:'5px'}}>
            <span
            onClick={()=>handleCart(item,-1)}
            style={{padding:'5px',cursor:'pointer',pointerEvents: cartItem.count <= 1 ? 'none' : 'auto'}}
            
            >
              -
            </span>
            <span style={{marginRight:'10px',marginLeft:'10px'}}>
             {cartItem.count}
            </span>
            <span 
            onClick={()=>handleCart(item,1)}
            style={{padding:'5px',cursor:'pointer'}}>
              +
            </span>
          </div>

        <Button style={{marginLeft:30}} variant='contained' color='error'
        onClick={()=>handleRemove(item)}
        >
          Remove
        </Button>
        </ListItem>
      </Box>
    </Paper>
  );
};

export default CartItem;
