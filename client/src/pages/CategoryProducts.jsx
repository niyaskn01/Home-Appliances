import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../axios/axiosInstance'
import Layout from '../components/Layout'
import CardComponent from '../components/Card'
import { Grid, Typography } from '@mui/material'
import SideBar from '../components/SideBar'
import image from '../images/tgif.gif'

function CategoryProducts() {
  const {catID}=useParams()
  const [loading,setLoading]=useState(false)
  const [products,setProducts]=useState([])
  //get products with category id
  const getCatBasedProduts=useCallback(async()=>{
    try {
      setLoading(true)
      const {data}=await axiosInstance(`/product/category-product/${catID}`)
       
      if(data.success){
        setProducts(data.products)
      }
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  },[catID])

  useEffect(()=>{
    getCatBasedProduts()
  },[getCatBasedProduts, catID])
  return (
    <Layout>
      <Grid container marginTop={1} spacing={2}>
        <Grid item xs={2}>
          <SideBar />
        </Grid>
        <Grid item container xs={10} spacing={2}>
        
        {products.length < 1 && (
        <Typography width='100%' p={4} textAlign="center" variant="h5" paragraph>
          no items to show
        </Typography>
        ) }
        
          {}

          {
            loading ? (
              <div
              style={{
                width:'100%',
                display: 'flex',
                justifyContent:'center',
                alignItems:'center',
                height:'70vh'
              }}
            >
              <img src={image} style={{ width: '350px' }} alt="loading..." />
            </div>
            ):(
              products.map((val) => (
                <Grid
                  key={val._id}
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  style={{ textDecoration: 'none' }}
                >
                  <CardComponent product={val} />
                </Grid>
              ))
            )
          }
        </Grid>
      </Grid>
    </Layout>
  )
}

export default CategoryProducts