import React from 'react'
import {styled} from '@mui/system'
import { Button } from '@mui/material'

function CustomeButton() {
  const CustomeButton=(styled(Button))(()=>({
    backgroundColor:'#111',
    color:'#fff',
    fontSize:'16px',
    fontWeight:'500',
    margin:'10px',
    width:'98%',
    cursor:'pointer',
    padding:'0.5rem 1.25rem',
    borderRadius:'7px',
    textTransform:'none',
    display:'block',
    letterSpacing:'3px',
    border:'2px solid transparent',
    '&:hover':{
      backgroundColor:'#fff',
      color:'#333',
      borderColor: '#333'
    },
  }))
  return (
    <CustomeButton>LoadMore...</CustomeButton>
  )
}

export default CustomeButton