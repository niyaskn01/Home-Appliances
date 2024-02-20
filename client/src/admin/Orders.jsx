import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Grid, List, ListItemButton, ListItemText, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AdminMenu from './AdminMenu';
import axiosInstance, { baseURL } from '../axios/axiosInstance';
import { useSelector } from 'react-redux';
import moment from 'moment';
import toast from 'react-hot-toast';

function Orders() {
  const [orders, setOrders] = useState([]);
  const { token } = useSelector((state) => state.user);
  const actions=['Not Process','Processing','Shipped','Delivered','Cancelled'];

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  //handle update action
  const handleUpdateAction=async(action)=>{
    try {
      const {data}=await axiosInstance.put('/order/update-status',{orderID: selectedOrderId, status: action});
      toast.success(data)
      getAllOrders()
      handlePopoverClose()
    } catch (error) {
      console.log(error)
    }
  }

  const getAllOrders = async () => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const { data } = await axiosInstance('/order/get-all-orders', config);
      setOrders(data.order);
      console.log(orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    
      
    getAllOrders();
  }, [token]); 

  return (
    <Layout>
      <Grid container>
        {/* Admin Menu (Left Column) */}
        <Grid item xs={2}>
          <AdminMenu />
        </Grid>

        {/* Content (Right Column)*/}
        <Grid item xs={10}>
          <TableContainer sx={{background:'#333'}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{color:'white'}}>
                  <TableCell sx={{color:'white'}} align="center">Order ID</TableCell>
                  <TableCell sx={{color:'white'}} align="center">Buyer Name</TableCell>
                  <TableCell sx={{color:'white'}} align="center">Buyer Email</TableCell>
                  <TableCell sx={{color:'white'}} align="center"></TableCell>
                  <TableCell sx={{color:'white'}} align="center">Product Name</TableCell>
                  <TableCell sx={{color:'white'}} align="center">Total Price</TableCell>
                  <TableCell sx={{color:'white'}} align="center">Status</TableCell>
                  <TableCell sx={{color:'white'}} align="center">Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell sx={{color:'white'}} align="center">{order._id}</TableCell>
                    <TableCell sx={{color:'white'}} align="center">{order.buyer.name}</TableCell>
                    <TableCell sx={{color:'white'}} align="center">{order.buyer.email}</TableCell>
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
                    <TableCell sx={{color:'white'}} align="center">{
                      order.products.reduce((acc,item)=>item.price+acc,0)
                    } rupees</TableCell>
                    <TableCell 
                      sx={{color:'white',cursor:'pointer'}} 
                      align="center"
                      onClick={(event)=>handlePopoverOpen(event, order?._id)}
                    >
                      {order.status}
                    </TableCell>
                    <TableCell sx={{color:'white'}} align="center">{moment(order.createdAt).fromNow()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {selectedOrderId && (
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'right',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'right',
                horizontal: 'right',
              }}
            >
              <List>
                {actions.map(action => (
                  <ListItemButton key={action}
                    onClick={()=>handleUpdateAction(action)}
                  >
                    <ListItemText>{action}</ListItemText>
                  </ListItemButton>
                ))}
              </List>
            </Popover>
          )}
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Orders;
