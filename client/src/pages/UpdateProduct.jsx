import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import toast from 'react-hot-toast';
import axiosInstance, { baseURL } from '../axios/axiosInstance';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DelDialog from '../components/DelDialog';

function UpdateProduct() {
  const [openDel,setOpenDel]=useState(false)
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [quantity,setQuantity]=useState('')
  const [description,setDescription]=useState('')
  const [image,setImage]=useState('')
  const userInfo=useSelector(state=>state.user)
  const token=userInfo?.token
  const {prodID}=useParams()
  const navigate=useNavigate()

  //get single product
  const getSingleProduct=async()=>{
    try {
      const {data}=await axiosInstance(`/product/get-single-product/${prodID}`)
      if(data.success){
        const {name,category,price,quantity,description}=data.product
        setProductName(name)
        setPrice(price)
        setQuantity(quantity)
        setDescription(description)
        setCategoryId(category._id)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getAllCategories = async () => {
    try {
      const { data } = await axiosInstance('/category/get-all');
      setCategories(data.category);
    } catch (error) {
      console.log(error);
    }
  };

  //create product
  const handleSubmit=async()=>{
    let formData=new FormData();
    formData.append("name",productName)
    formData.append("category",categoryId)
    formData.append("price",price)
    formData.append("quantity",quantity)
    formData.append("description",description)
    if(image){formData.append("photo", image)}
    const config={
      headers:{
        "Content-Type":"multipart/form-data",
        Authorization:token
        }
        }
        const {data}=await axiosInstance.put(`/product/update/${prodID}`,formData,config)
        if(data.success){
          navigate('/dashboard/admin/products')
          setTimeout(() => {
            toast.success('Product updated')
          }, 500);
        }else{
          toast.error(data.message)
        }
  }

  useEffect(() => {
    getAllCategories();
    getSingleProduct();
  }, []);
  return (
    <Layout>
      <Grid container p={1}>
      <Grid item xs={5}>
        {
          image ?
            <img
              src={URL.createObjectURL(image)}
              alt=""
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            /> :
            <img
              src={`${baseURL}/product/get-photo/${prodID}`}
              alt=""
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
        }
      
      </Grid>
      <Grid item xs={7}>
        <DelDialog 
          token={token}
          setOpenDel={setOpenDel} 
          prodID={prodID}
          openDel={openDel} />
          <Box
            height={'100%'}
            display="flex"
            flexDirection={'column'}
            alignItems={'center'}
            borderRadius={5}
            boxShadow={7}
            p={1}
          >
            <h1>Update Product {productName}</h1>
            <Box
              width='80%'
              display='flex'
              flexDirection='column'
              alignItems='stretch'
              marginTop={2}
            >
              <FormControl fullWidth 
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <InputLabel>Select a category</InputLabel>
                <Select
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
                 label="Select an option">
                  {categories.map((c) => (
                    <MenuItem key={c._id} value={c._id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  type="file"
                  id="file-input"
                  inputProps={{ accept: 'image/*' }}
                  style={{ display: 'none' }}
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <label htmlFor="file-input">
                  <Button variant="outlined" component="span" fullWidth>
                    {image ? image.name : 'Upload File'}
                  </Button>
                </label>
                <TextField 
                label="Set a name" 
                variant="outlined" 
                margin="normal" 
                fullWidth 
                value={productName}
                onChange={(e)=>setProductName(e.target.value)}
                />

                <TextField
                  label="Set a description"
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={2}
                  fullWidth
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}
                />
                <Box display="flex" gap={2}>
                  <TextField 
                  label="Set a price" 
                  variant="outlined" 
                  margin="normal" 
                  fullWidth 
                  type="number"
                  value={price}
                  onChange={(e)=>setPrice((e.target.value))}
                  />
                  <TextField 
                  label="Set a quantity" 
                  variant="outlined" 
                  margin="normal" 
                  fullWidth 
                  type="number"
                  value={quantity}
                  onChange={(e)=>setQuantity((e.target.value))}
                  />
                </Box>
                <Select label="Select an option"
                placeholder='shipping'
                >
                  <MenuItem value="">yes</MenuItem>
                  <MenuItem value="">no</MenuItem>

                </Select>
              </FormControl>
              <Box display='flex' gap={2}>
                <Button sx={{marginTop:'5px'}} variant="contained" 
                  onClick={handleSubmit}
                  fullWidth>
                  Update
                </Button>
                <Button sx={{marginTop:'5px'}} variant="contained" 
                  onClick={()=>setOpenDel(true)}
                  color='error'
                  fullWidth>
                  Delete
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
        </Grid>
    </Layout>
  )
}

export default UpdateProduct