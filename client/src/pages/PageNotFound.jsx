import React from 'react';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const NotFoundPage = () => {
  return (
    <Layout>
    <div style={{ textAlign: 'center', marginTop: '10px',marginBottom:'20px' }}>
      <img
        src="https://i.giphy.com/VwoJkTfZAUBSU.webp" // Replace with your own image URL
        alt="Page Not Found Illustration"
        style={{ maxWidth: '16%', marginBottom: '20px' }}
      />
      <Typography variant="h4" color="error" gutterBottom>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        The page you are looking for might be under construction or does not exist.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Go to Home
      </Button>
    </div>
    </Layout>
  );
};

export default NotFoundPage;
