import { Button, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import axiosInstance from '../axios/axiosInstance'
import { useNavigate } from 'react-router-dom';
import { useDispatch  } from 'react-redux';
import { getResult  } from '../redux/searchResult';

function SearchBox() {

  const textFieldStyles = {
    borderTopLeftRadius:'16px', 
    borderBottomLeftRadius:'16px', 
    width: '300px', 
    height: '32px', 
    border: '1px solid black',
    marginRight: '5px', 
    forntSize:'19px',
  };
  const [loading,setLoading]=useState(false)
  const [keyword,setKeyword]=useState('')
  const dispatch=useDispatch()
  const navigate=useNavigate()
  //search
  const handleSearch=async()=>{
    setLoading(true)
    const {data}=await axiosInstance.get(`/product/search/${keyword}`)
    dispatch(getResult(data?.products))
    setLoading(false)
    setKeyword('')
    navigate('/searchpage')

  }
  return (
    <>
      <input
        placeholder="Search"
        variant="outlined"
        fullWidth
        style={textFieldStyles}
        onChange={(e)=>setKeyword(e.target.value)}
      />
      <Button sx={{borderTopRightRadius:'16px',borderBottomRightRadius:'16px'}} 
      color="inherit" size='small' 
      variant='outlined' onClick={handleSearch}
      >
        {loading ? <CircularProgress size={20} color="inherit" /> : 'Search'}
      </Button>
    </>
  )
}

export default SearchBox