import React, { useEffect, useState } from 'react'
import './log-reg.css'
import logo from '../images/shopping-cart.png'
import { Button, TextField  } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom' 
import axiosInstance from '../axios/axiosInstance'
import Layout from '../components/Layout'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo } from '../redux/userSlice'
import {setUserFullData} from '../redux/userFullDet'

function Login() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate=useNavigate()
  const dispatch=useDispatch()
  //handle register
  const handleLogin=async(e)=>{
    e.preventDefault();
    try {
      const {data}= await axiosInstance.post('/user/login',{email,password})
      const {user}=data
      if(data.success){
        navigate('/')
        //window.location.reload()
        dispatch(setUserFullData(data.user))
        localStorage.setItem('userData',JSON.stringify(data.userInfo))
        if(data?.user?.address){
          localStorage.setItem('userAddress',JSON.stringify({name:user.name,address:user.address}))
          dispatch(setUserFullData({name:user.name,address:user.address}))
        }else{
          localStorage.setItem('userAddress',JSON.stringify({name:user.name,address:''}))
          dispatch(setUserFullData({name:user.name}))
        }
        setTimeout(() => {
          toast.success(data.message);
          
        }, 500);

      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('error in register')
      console.log(error);
    }
  }
  const userInfo=useSelector(state=>(state.user))
  

  useEffect(()=>{
    dispatch(setUserInfo())
    if(userInfo?._id && userInfo?.token) {
      navigate('/')
    }
  },[userInfo?._id,userInfo?.token,dispatch,navigate])
  
  return (
    <Layout>
    <div className='login-container'>
      <div className="image-container">
        <img src={logo} alt="logo" className='welcome-logo' />
      </div>
      <div className="login-box">
        <p>Login to your account</p>
        <TextField id="outlined-basic"
        label="Enter email"
        type='email'
        variant="outlined"
        onChange={(e)=>setEmail(e.target.value)}
        required
        />

        <TextField id="outlined-password-input"
        label="Enter password"
        type='password'
        autoComplete='current-password'
        onChange={(e)=>setPassword(e.target.value)}
        required
        />

        <Button onClick={handleLogin} variant="contained" >LOGIN</Button>
        <p className='get-to-acc'>Dont have an accout?? <Link to="/register">signup now</Link></p>
      </div>
      
    </div>
    </Layout>
  )
}

export default Login