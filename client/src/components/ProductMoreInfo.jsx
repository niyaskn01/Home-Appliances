import React, { useState } from 'react';
import { Button, CardContent, CardHeader, Divider, List, ListItem, ListItemText } from '@mui/material';
import CartQuantityBox from './CartQuantityBox';
import { useSelector } from 'react-redux';
import axiosInstance from '../axios/axiosInstance'
import toast from 'react-hot-toast';

const ProductMoreInfo = ({product}) => {
  const [quantity, setQuantity] = useState(1);
  const user=useSelector(state=>state.user)
  const handleAddToCart=async(product)=>{
    try {
      const {data}=await axiosInstance.post(`/user/addcart/${user._id}`,{product,count:quantity});
      toast.success(data)
      setQuantity(1)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
      <CardHeader title={product.description} subheader="SKU: LHLDEGEDML8O009" />
      <Divider />
      <CardContent>
        <List>
          <ListItem>
            <ListItemText
              primary="B22 Cool Daylight"
              secondary={`Final Price: ₹${product.price}.00  (Incl. of all taxes)`}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Final Price: ₹${product.price}.00  (Incl. of all taxes)`} />
          </ListItem>
          <ListItem>
            <ListItemText primary="(Net Quantity 1N)" />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Manufactured By: ${product.name}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Country Of Origin: India" />
          </ListItem>
          <CartQuantityBox  setQuantity={setQuantity} quantity={quantity}/>
          <ListItem>
            <Button variant="contained" 
              style={{ backgroundColor: 'black', color: 'white' }}
              onClick={()=>handleAddToCart(product)}
              >
              Add to cart
            </Button>
          </ListItem>
        </List>
      </CardContent>
    </div>
  );
};

export default ProductMoreInfo;
