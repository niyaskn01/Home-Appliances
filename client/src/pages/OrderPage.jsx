import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Layout from '../components/Layout';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axiosInstance, { baseURL } from '../axios/axiosInstance';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Box } from '@mui/material';

function OrderPage() {
  const { token } = useSelector(state => state.user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const { data } = await axiosInstance('/order/get-orders', {
          headers: {
            Authorization: token
          }
        });
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };

    getOrder();
  }, [token]);

  return (
    <Layout>
      <Box p={1}>
      <TableContainer sx={{background:'#333'}} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{color:'white'}}>
              <TableCell sx={{color:'white'}} align="center">Order ID</TableCell>
              <TableCell sx={{color:'white'}} align="center"></TableCell>
              <TableCell sx={{color:'white'}} align="center">Product Name</TableCell>
              <TableCell sx={{color:'white'}} align="center">Price</TableCell>
              <TableCell sx={{color:'white'}} align="center">Total Price</TableCell>
              <TableCell sx={{color:'white'}} align="center">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order.id}>
                <TableCell sx={{color:'white'}} align="center">{order._id}</TableCell>
                <TableCell sx={{color:'white'}} align="center">
                  {order.products.map(product => (
                    <div key={product._id}>
                      <img 
                        style={{ height: '40px', width: '40px'}}
                        src={`${baseURL}/product/get-photo/${product._id}`}
                        alt={product.name}
                      />
                    </div>
                  ))}
                </TableCell>
                <TableCell sx={{color:'white'}} align="center">
                  {order.products.map(product => (
                    <div key={product._id} style={{margin:'22px'}}>{product.name}</div>
                  ))}
                </TableCell>
                <TableCell sx={{color:'white'}} align="center">
                  {order.products.map(product => (
                    <div key={product._id} style={{margin:'22px'}}>{product.price} rupees</div>
                  ))}
                </TableCell>
                <TableCell sx={{color:'white'}} align="center">{
                  order.products.reduce((acc,item)=>item.price+acc,0)
                } rupees</TableCell>
                <TableCell sx={{color:'white'}} align="center">{moment(order.createdAt).fromNow()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
    </Layout>
  );
}

export default OrderPage;
