import { Box, List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function UserMenu() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, borderRadius: 5, backgroundColor: '#eee' }}>
        <List>
          <ListItem sx={{
              display: 'flex',
              justifyContent: 'space-between',
              '&:hover': {
                backgroundColor: '#ddd', // Add your desired background color on hover
              },
            }}>
            <NavLink to="/dashboard/user/order" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemText primary="Orders" />
            </NavLink>
            <NavigateNextIcon />
          </ListItem>
        </List>
      </Box>
  )
}

export default UserMenu