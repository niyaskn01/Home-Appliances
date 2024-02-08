// import React, { useState } from 'react'
// import { IconButton } from '@mui/material';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import axios from 'axios';

// function Contact() {
//   const [val,setVal]=useState(false)
//   const [products,setProducts]=useState([])
//   const get=async(sortOrder)=>{
//     setVal(!val)
//     const {data}=await axios.get(`http://localhost:8080/product/filterbyprice/${sortOrder}`)
    
//     setProducts(data?.products)
//   }
//   return (
//     <div>
//       {
//         val ? 
//         <IconButton onClick={()=>get('asc')}>
//         <ArrowUpwardIcon />
//         <AttachMoneyIcon/>
//       </IconButton> :
//       <IconButton onClick={()=>get('desc')}>
//       <ArrowDownwardIcon/>
//       <AttachMoneyIcon/>
//     </IconButton>
//       }
//       {
//         products.map((p)=>(
//           <div key={p._id} style={{margin:"15px"}} >
//             <h3>{p.name}</h3>
//             <span>Price:{p.price}$</span><br />
//             <button onClick={()=>window.open(`https://www.google.com/search
//             ?q=${encodeURIComponent(p.name)}&source=univ&tbm
//             =shop`,'_blank')}>Search on Google</button>
//             </div>

//         ))
//       }
      
//     </div>
//   )
// }

// export default Contact

import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button, Typography } from '@mui/material';
import Popover from '@mui/material/Popover';

function Contact() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Layout>
      <h1>Contact</h1>
      <Button variant="contained" onClick={handleClick}>
        Open Popover
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </Layout>
  );
}

export default Contact;
