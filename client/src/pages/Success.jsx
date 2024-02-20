import { Button, Typography } from '@mui/material';
import React from 'react';


const SuccessPage = () => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
    <Typography variant="h3" style={{ fontSize: 100, color: '#4caf50', marginBottom: 32 }}>
      ✓
    </Typography>
    <Typography variant="h5" style={{ marginBottom: 16 }}>
      Payment Successful
    </Typography>
    <Button variant="contained" color="primary" style={{ marginTop: 16 }} href="/">
      Back to Home
    </Button>
  </div>
  );
};

export default SuccessPage;
