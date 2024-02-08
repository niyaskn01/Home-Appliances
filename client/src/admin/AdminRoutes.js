import React from 'react'
import { Outlet } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { useSelector } from 'react-redux'

function AdminRoutes() {
  const userInfo=useSelector(state=>state.user)
  return (
    <>
      {
        userInfo?.role !== 1 ?<Spinner/> : <Outlet/>
      }
      
    </>
  )
}

export default AdminRoutes