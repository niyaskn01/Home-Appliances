import { Checkbox, Divider, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect, useState,useCallback } from 'react'
import axiosInstance from '../axios/axiosInstance'
import SliderComponent from './SliderComponent';
import { useNavigate } from 'react-router-dom';

function SideBar({setProduct,getProducts,product}) {
  const navigate=useNavigate()
  const [category,setCategory]=useState([])
  const [selectedCategory, setSelectedCategory] = useState({}); 
  const [loading,setLoading]=useState(false)
  const [price,setPrice]=useState(null)

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
   const handleChange=async(checkedCategory)=>{
    if(window.location.pathname !== '/'){
      navigate('/')
      return
    }
    setSelectedCategory({
      ...selectedCategory,[checkedCategory]:!selectedCategory[checkedCategory]
    })
   }

   //get products with all checked ones
   const getProductsByChecked=useCallback(async()=>{
    const allSelectedCategory=Object.keys(selectedCategory).filter(key => selectedCategory[key]);
    try {
      const {data}=await axiosInstance.post('/product/get-checkbox',
      {selectedCategories:allSelectedCategory,maxPrice:price} )
      setProduct(data)
    } catch (error) {
      console.log(error)
    }
   })

  useEffect(()=>{
    getAllCategories();
  },[])

  useEffect(()=>{
    getProductsByChecked()
  },[selectedCategory,price])

  useEffect(()=>{
    if( product?.length==0){
      getProducts()
    }
  },[product,price])
  return (
    <div>
      {
        loading ? <span>loading...</span> :

        <FormControl component="fieldset">
          <Typography textAlign={'center'} variant='subtitle1'>Filter by category</Typography>
          <Divider/>
          {
            category.map((c)=>(
              <FormControlLabel
              onChange={()=>handleChange(c._id)}
               control={<Checkbox/>} label={c.name} />
            ))
          }
          <SliderComponent price={price} setPrice={setPrice}/>
        </FormControl>
      }
      
    </div>
  )
}

export default SideBar