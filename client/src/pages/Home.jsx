import React, { useEffect, useState,useCallback } from 'react'
import Layout from '../components/Layout'
import CardComponent from '../components/Card'
import { Grid,Tooltip, IconButton, Box } from '@mui/material'
import axiosInstance from '../axios/axiosInstance'
import SideBar from '../components/SideBar'
import SortIcon from '@mui/icons-material/Sort';
import image from '../images/tgif.gif'

function Home() {
  
  const[product,setProduct]=useState([])
  const [loading,setLoading]=useState(false)

  const getProducts=useCallback(async()=>{
    setLoading(true)
    const {data}=await axiosInstance('/product/get-products')
    setProduct(data.product)
    setLoading(false)
  },[])
  // const get=async(sortOrder)=>{
  //   setProduct([])
  //   setVal(!val)
  //   const {data}=await axiosInstance.get(`product/filterbyprice/${sortOrder}`)
    
  //   setProduct(data?.products)
  // }

  // useEffect(()=>{
  //   getProducts();
  
  // },[getProducts])
  return (
    <Layout>
      <Grid container marginTop={1} spacing={2}>
        <Grid item xs={2}>
          <Box pl={3} pr={3}>
          <SideBar product={product} getProducts={getProducts} setProduct={setProduct} />
          </Box>
        </Grid>
        <Grid item container xs={10} spacing={2}>
        
          {/* <IconButton 
            onClick={()=>get(val?"desc" : "asc")}
            elevation={3}
            style={{background:'#fc0b03',color:'#fff', position:'fixed',top:'110px',right:'80px'}}
          >
            {
              val ?
              <Tooltip 
                placement="left"
                style={{width:'max-content'}} title={`sort from highr price`} >
                <SortIcon />
              </Tooltip>
            :
              <Tooltip 
                placement="left"
                style={{width:'max-content'}} title={`sort from lower price`} >
                <SortIcon />
              </Tooltip>
            }
            
          </IconButton> */}
          
          {loading ? (
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
            <>
              {product.map((val) => (
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
              ))}
            </>
          )
          }
          
        </Grid>

      </Grid>
    </Layout>

  )
}

export default Home 