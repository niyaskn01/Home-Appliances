import React, { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';
import axiosInstance, { baseURL } from '../axios/axiosInstance';
import toast from 'react-hot-toast';
import { Grid, Paper } from '@mui/material';
import ProductMoreInfo from '../components/ProductMoreInfo';
import SimiliarProducts from '../components/SimiliarProducts';

function ProductDetails() {
  const [product, setProduct] = useState([]);
  const { productID } = useParams();

  const getSingleProduct =useCallback( async () => {
    try {
      const { data } = await axiosInstance(`/product/get-single-product/${productID}`);
      if (data.success) {
        setProduct(data.product);
        
      } else {
      }
    } catch (error) {
      console.log(error);
      toast.error('Something wrong happened on the server side');
    }
  },[productID]);
  useEffect(() => {
    getSingleProduct();
  }, [getSingleProduct]); 

  return (
    <Layout>
      <Grid container p={1} spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={`${baseURL}/product/get-photo/${productID}`}
              alt=""
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} >
          <Paper style={{ height: '100%' }}>
            <ProductMoreInfo product={product} />
          </Paper>
        </Grid>
        <Grid item xs={12} >
          <Paper style={{padding:'16px',}} >
            {
              product?.category?._id &&
              <SimiliarProducts catID={product?.category?._id} prodID={productID}/>
            }
            
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default ProductDetails;
