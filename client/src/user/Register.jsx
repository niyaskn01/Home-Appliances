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

function Register() {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate=useNavigate()
  const dispatch=useDispatch()
  //handle register
  const handleRegister=async(e)=>{
    e.preventDefault();
    try {
      const {data}= await axiosInstance.post('/user/register',{name,email,password})
      if(data.success){
        navigate('/')
        //window.location.reload()
        localStorage.setItem('userData',JSON.stringify(data.userInfo))
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
        <p>Create your account</p>
        <TextField id="outlined-basic"
        label="Enter username"
        variant="outlined"
        onChange={(e)=>setName(e.target.value)}
        required
        />

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
        required/>

        <Button variant="contained" onClick={handleRegister} >Sign Up</Button>
        <p className='get-to-acc'>Already a user?? <Link to="/login">login</Link></p>
      </div>
      
    </div>
    </Layout>
  )
}

export default Register