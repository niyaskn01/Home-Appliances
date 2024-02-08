import React from 'react'
import Header from './Header'
import { Toaster } from 'react-hot-toast'
import Footer from './footer'
import { useLocation } from 'react-router-dom';
import { Toolbar, Typography } from '@mui/material';

function Layout({children}) {
  const location = useLocation();
  const { pathname } = location;
  console.log(pathname);
  return (
    <div>
      <Header/>
      <Toaster/>
      <main className='main'>
        {children}
      </main>
      {
        pathname !== '/login' && pathname !== '/register' && <Footer/>
      }
      
    </div>
  )
}

export default Layout