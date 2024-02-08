import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useSelector } from 'react-redux';
import { Box, Button, Divider, Grid , Typography } from '@mui/material';
import EditProfileDialog from '../components/EditProfileDialog';
import UserMenu from './UserMenu';

function UserDashboard() {
  const [open,setOpen]=useState(false)

  const userFullInfo = useSelector((state) => state.userInformation);
  const user=useSelector(state=>state.user)

  return (

    <Layout>
      <EditProfileDialog   open={open} setOpen={setOpen} />
      <Grid container>
        {/* Admin Menu (Left Column) */}
        <Grid item xs={3}>
          <UserMenu />
        </Grid>


        {/* Content (Right Column) */}
        <Grid item xs={9}  display='flex' justifyContent="center">

          <Box 
            mt={2}
            p={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            component='div'
            border={1}
            borderRadius={4}
            borderColor='white'
            boxShadow='0 4px 8px rgba(0, 0, 0, 0.2)'
            elevation={3}
            width="100%" // Set width to 100%
            maxWidth="500px" // Optionally set a max width
          >
            <Typography borderBottom={2} variant="h5">Personal Details</Typography>
            <Typography variant="h4">Name: {userFullInfo?.name} {user?.role ? '(admin)' :''}</Typography>
            {userFullInfo?.address && (
              <>
               <Divider style={{ width: '100%', margin: '16px 0' }} />
                <Box>
                  <Typography variant="h6">Street: {userFullInfo?.address?.street}</Typography>
                  <Typography variant="h6">City: {userFullInfo?.address?.city}</Typography>
                  <Typography variant="h6">State: {userFullInfo?.address?.state}</Typography>
                  <Typography variant="h6">ZIP: {userFullInfo?.address?.zip}</Typography>
                </Box>
              </>
            )}
            <Button style={{marginTop:'15px'}} variant='outlined'
            onClick={()=>setOpen(true)}
            >
              edit profile
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default UserDashboard;
