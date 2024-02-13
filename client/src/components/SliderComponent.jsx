import { Box, Slider } from '@mui/material'
import React from 'react'

function SliderComponent({setPrice,price}) {
  // const [val,setval]=useState(null)
  const handleChange=(e,newVal)=>{
    setPrice(newVal)
  }
  return (
      <Box sx={{ width: '100%' }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        valueLabelDisplay="auto"
        min={0}
        max={25000}
        value={price}
        onChange={handleChange}
      />
    </Box>
  )
}

export default SliderComponent