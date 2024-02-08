import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import image from '../images/tgif.gif'

const Spinner = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => prevValue - 1);
    }, 1000);

    // Clear the interval and navigate when count reaches 0
    if (count === 0) {
      clearInterval(interval);
      navigate('/'); 
    }

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {/* <CircularProgress size={80} /> */}
      <img src={image} style={{width:'350px'}} alt="loading..." />
    </div>
  );
};

export default Spinner;
