import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { useSelector } from 'react-redux'
import { Grid } from '@mui/material'
import SideBar from '../components/SideBar'
import CardComponent from '../components/Card'
import { useNavigate } from 'react-router-dom'

function SearchPage() {
  const {result}=useSelector(state=>state?.search)
  const navigate=useNavigate()
  console.log('result :',result)
  useEffect(()=>{
    if(result.length ===0){
      navigate('/')
    }
  },[result,navigate])
  
  return (
    <Layout>
      <Grid container marginTop={1} spacing={2}>
        <Grid item xs={2}>
          <SideBar />
        </Grid>
        <Grid item container xs={10} spacing={2}>
          {
            !result && <h2>no res</h2>
          }

          {
            result.map((val) => (
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
          }
        </Grid>
      </Grid>
    </Layout>
  )
}

export default SearchPage