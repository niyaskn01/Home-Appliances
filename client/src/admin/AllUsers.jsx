
import React, { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Box, Divider, Grid, IconButton, Paper, Popover, Typography } from '@mui/material';
import AdminMenu from './AdminMenu';
import axiosInstance from '../axios/axiosInstance';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { useSelector } from 'react-redux';

function AllUsers() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [users, setUsers] = useState([]);
  const user = useSelector((state) => state.user);
  const { token } = user;

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const getUsers = useCallback(async () => {
    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const { data } = await axiosInstance('/user/all-users', config);
      setUsers(data?.users);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Layout>
      <Grid container>
        {/* Admin Menu (Left Column) */}
        <Grid item xs={4}>
          <AdminMenu />
        </Grid>

        {/* Content (Right Column) */}
        <Grid item xs={8}>
          <Box height={'100%'}>
            {users.map((user) => (
              <Paper
                key={user._id}
                sx={{
                  p: 2,
                  m: 2,
                  bgcolor: '#f0ece1',
                  color: '#05061a',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <Typography variant="h5">Name :{user.name}{user?.role ? '(admin)':null}</Typography>
                  <Typography variant="h6">Email :{user.email}</Typography>
                  <Typography variant="h6">{user?.phone && `phone : ${user?.phone}`}</Typography>
                  {
                   user?.address && 
                  (
                    <Box marginTop={1}>
                      <Typography variant="h6">Address</Typography>
                      <Divider/>
                      <Typography variant="body1">Street :{user?.address?.street}</Typography>
                      <Typography variant="body1">City :{user?.address?.city}</Typography>
                      <Typography variant="body1">Zip :{user?.address?.zip}</Typography>
                    </Box>
                    )
                  }
                </Box>
                <Box>
                  <IconButton onClick={handlePopoverOpen}>
                    <EditIcon />
                  </IconButton>
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
                    <Typography pl={1} pr={1} variant='body1'>Make as Admin</Typography>
                    <Box display='flex' justifyContent='space-between'>
                      <IconButton>
                        <CancelIcon />
                      </IconButton>
                      <IconButton>
                        <CheckIcon />
                      </IconButton>
                    </Box>
                  </Popover>
                </Box>
              </Paper>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default AllUsers;
