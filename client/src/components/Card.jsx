import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import AddtoCartButton from './AddtoCartButton';
import axiosInstance, { baseURL } from '../axios/axiosInstance'

function CardComponent({ product,update }) {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link 
      to={!update ? `/product/details/${product?._id}` : `/dashboard/product/update/${product?._id}`} 
      style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          height="160"
          image={`${baseURL}/product/get-photo/${product?._id}`}
          alt="green iguana"
        />
        </Link>
        <CardContent>
        <Link 
        to={!update ? `/product/details/${product?._id}` : `/dashboard/product/update/${product?._id}`} 
        style={{ textDecoration: 'none' }}>

          <Typography gutterBottom variant="h5" color='black' component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            &#8377;{product.price}/-
          </Typography>
          </Link>
          <Rating/>
      {
        ! update &&
        <Box display="flex"  justifyContent="flex-end">
        <AddtoCartButton product={product} />
        </Box>
        
      }
      
      </CardContent>
    </Card>
  );
}

export default CardComponent;
