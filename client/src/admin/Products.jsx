import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Box, Grid } from '@mui/material'
import AdminMenu from './AdminMenu'
import axiosInstance from '../axios/axiosInstance'
import CardComponent from '../components/Card'

function Products() {
  const[product,setProduct]=useState([])

  const getProducts=async()=>{
    const {data}=await axiosInstance('/product/get-products')
    setProduct(data.product)
  }

  useEffect(()=>{
    getProducts();
  
  },[product])
  return (
    <Layout>
      
      <Grid container p={2}>
        {/* Admin Menu (Left Column) */}
        <Grid item xs={4}>
          <AdminMenu />
        </Grid>

        {/* Content (Right Column) */}
        <Grid item container xs={8} spacing={2}>
            {product.map((val) => (
            <Grid
              key={val._id}
              item
              xs={12}
              sm={6}
              md={3}
              style={{ textDecoration: 'none' }}
            >
              <CardComponent update product={val} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Products