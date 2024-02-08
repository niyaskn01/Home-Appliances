// SimiliarProducts.js
import React, { useEffect, useState } from 'react';
import axiosInstance,{baseURL} from '../axios/axiosInstance'
import { Box, Button, Card, CardContent, CardMedia, Divider, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddtoCartButton from './AddtoCartButton';


 function SimiliarProducts({catID,prodID}) {
  const [relatedProduct,setRelatedProducts]=useState([])
  const navigate=useNavigate()

  useEffect(() => {
    const getRelatedProducts = async () => {
      try {
        const { data } = await axiosInstance(`product/get-similiar/${catID}/${prodID}`);
        setRelatedProducts(data?.products);
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };

    getRelatedProducts();
  }, [catID, prodID]);

  return (
  <Box>
    <Typography margin={2} variant='h4' textAlign='center'>Similiar products</Typography>
    <Divider style={{marginBottom:'5px'}}/>
    <Grid container spacing={2} >
      {relatedProduct.map((p) => (
        <Grid item key={p._id} xs={12} sm={6} md={4} lg={3}>
          <Card 
          style={{
            boxShadow: '2px 8px 8px rgba(0, 10, 0, 0.5)', 
          }}>
            <CardMedia
              component="img"
              alt={p.name}
              height="140"
              image={`${baseURL}/product/get-photo/${p._id}`}
            />
            <CardContent style={{ maxHeight: '180px', overflow: 'hidden' }}>
              <Typography variant="h5" component="div">{p.name}</Typography>
              <Typography variant="body2" color="text.secondary">{p.description.substring(0, 30)}...</Typography>
            </CardContent>
            <div style={{ padding: '8px', display: 'flex', justifyContent: 'space-around' }}>
              <Button variant='contained'
               onClick={()=>navigate(`/product/details/${p._id}`)}
               color='inherit'
               className="m-1">See More</Button>
              <AddtoCartButton product={p}/>
            </div>
          </Card>
        </Grid>
      ))}
    </Grid>
    </Box>
  );
}

export default SimiliarProducts;
