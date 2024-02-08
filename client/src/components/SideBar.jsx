import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../axios/axiosInstance'

function SideBar({setProduct}) {
  const [category,setCategory]=useState([])
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const [loading,setLoading]=useState(false)

  //get category
  const getAllCategories = async () => {
    try {
      setLoading(true)
      const { data } = await axiosInstance('/category/get-all');
      setCategory(data.category);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };
  const handleChange=async(e)=>{
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);
    console.log(selectedValue);
    try {
      if(!selectedValue){
        getAllCategories()
      }else{
        const {data}=await axiosInstance(`/product/category-product/${selectedValue}`)
        setProduct(data.products)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getAllCategories();
  },[])
  return (
    <div>
      {
        loading ? <span>loading...</span> :
        <FormControl sx={{gap:'20px'}} component="fieldset">
          
          <RadioGroup
            aria-label="gender"
            name="controlled-radio-buttons-group"
            value={selectedCategory}
            onChange={handleChange}
          ><span style={{color:'#2771c4',fontSize:'18px',fontWeight:'bold'}}>choose by category</span>
          {
            category.map((c)=>(
              <FormControlLabel 
              key={c._id}
              value={c._id}
              control={<Radio />} 
              label={c.name} />
            ))
          }
            
          </RadioGroup>
        </FormControl>
      }
      
    </div>
  )
}

export default SideBar