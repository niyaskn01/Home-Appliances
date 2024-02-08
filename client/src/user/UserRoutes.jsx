import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Spinner from '../components/Spinner'

function UserRoutes() {
  const userInfo=useSelector(state=>state?.user)
  return (
    <>
      {
        userInfo?.token && userInfo?.role !== 1 ? <Outlet/> : <Spinner path={'/about'}/>
      }
    </>
  )
}

export default UserRoutes