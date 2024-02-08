import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Grid, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import AddAdressDialog from '../components/AddAdressDialog';
import Checkout from '../order/Checkout'
import { Link } from 'react-router-dom';

function CartPage() {
  const [open,setOpen]=useState(false)
  const cart=useSelector(state=>state?.getCart) || null
  const cartList=cart.cartItems
  const total=cart?.cartItems.reduce((acc,val)=>acc+(val.count)*val.price,0) || 0

 
  return (
    <Layout>
      <Grid container justifyContent="center" p={2}>
        <Grid item xs={12} m={4}>
        <Typography
              bgcolor="red"
              color="white"
              variant="h5"
              pt={1}
              pb={1}
              pl={2}
              pr={2}
              style={{ fontWeight: '700', width: 'max-content' }}
            >
              MY CART
            </Typography>
        </Grid>
        {
          cartList.length < 1 ? <h2>no items to show <Link to='/'>continue shopping</Link></h2> :
          <>
          <Grid item xs={8} paddingRight={2}>
          
            
          {cartList.map((item) => (
            <CartItem key={item._id} item={item} cartList={cartList} />
          ))}
        
      </Grid>
      <AddAdressDialog open={open} setOpen={setOpen} />

      <Grid item xs={4}>
        <Paper style={{ textAlign: 'center', minHeight: '400px', padding: '20px' }}>
          <Typography variant="h5">Subtotal: ₹{total}.00</Typography>
          <Typography variant="h5">Grand total: ₹{total}.00</Typography>
          <Checkout open={open} setOpen={setOpen} />
        </Paper>
      </Grid>
          </>
          
        }
        
      </Grid>
    </Layout>
  );
}

export default CartPage;
