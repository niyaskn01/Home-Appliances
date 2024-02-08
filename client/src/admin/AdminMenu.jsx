import { Box, List, ListItem, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function AdminMenu() {
  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, borderRadius: 5, backgroundColor: '#eee' }}>
        <List>
          <ListItem sx={{
              display: 'flex',
              justifyContent: 'space-between',
              '&:hover': {
                backgroundColor: '#ddd', 
              },
            }}>
            <NavLink to="/dashboard/admin/create-category" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemText primary="Create Category" />
            </NavLink>
            <NavigateNextIcon />
          </ListItem>
          
          <ListItem sx={{
              display: 'flex',
              justifyContent: 'space-between',
              '&:hover': {
                backgroundColor: '#ddd', 
              },
            }}>
            <NavLink to="/dashboard/admin/create-product" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemText primary="Create Products" />
            </NavLink>
            <NavigateNextIcon />
          </ListItem>
          <ListItem sx={{
              display: 'flex',
              justifyContent: 'space-between',
              '&:hover': {
                backgroundColor: '#ddd', 
              },
            }}>
            <NavLink to="/dashboard/admin/products" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemText primary="Products" />
            </NavLink>
            <NavigateNextIcon />
          </ListItem>
          <ListItem sx={{
              display: 'flex',
              justifyContent: 'space-between',
              '&:hover': {
                backgroundColor: '#ddd',
              },
            }}>
            <NavLink to="/dashboard/admin/orders" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemText primary="Show Orders" />
            </NavLink>
            <NavigateNextIcon />
          </ListItem>
          <ListItem sx={{
              display: 'flex',
              justifyContent: 'space-between',
              '&:hover': {
                backgroundColor: '#ddd',
              },
            }}>
            <NavLink to="/dashboard/admin/all-users" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemText primary="Show Users" />
            </NavLink>
            <NavigateNextIcon />
          </ListItem>
        </List>
      </Box>

    </div>
  );
}

export default AdminMenu;
