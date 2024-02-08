import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material'
import axiosInstance from '../axios/axiosInstance'
import CloseIcon from '@mui/icons-material/Close';
import AdminMenu from './AdminMenu'
import CheckIcon from '@mui/icons-material/Check';
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

function CreateCategory() {
  const [category,setCategory]=useState([])
  const [newCategory,setNewCategory]=useState('')
  const [updateCat,setUpdateCat]=useState('')
  const userInfo=useSelector(state=>state.user)
  const [open,setOpen]=useState(false)
  const [updateValue,setUpdateValue]=useState('')
  const [updateCatID,setUpdateCatID]=useState('')
  const [openDel,setOpenDel]=useState(false)
  const [delCat,setDelCat]=useState('')
  const token=userInfo?.token
  // get all categories
  const getAllCategories=async()=>{
    try {
      const {data}=await axiosInstance('/category/get-all')
      if(data.success) {
        setCategory(data.category);
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  //create category
  const createCategory=async()=>{
    try {
      const {data}=await axiosInstance.post('/category/create-category',{name:newCategory},{
        headers:{
          Authorization:token
        }
      })
      if(data?.success){
        toast.success(`${data.category.name} created`)
        setNewCategory('');
        getAllCategories(); 
        
      }
    } catch (error) { 
      console.log(error);
    }
  }

  const handleClose=()=>{
    setOpen(false)
  }

  const handleCloseDel=()=>{
    setOpenDel(false)
  }

  //update
  const handleUpdate=async(catID)=>{
    const {data}=await axiosInstance.put(`/category/update-category/${catID}`,
    {name:updateValue},
    {headers:{
      'Authorization':token
    }})
    if(data.success){
      toast.success(data.message)
      getAllCategories()
      setUpdateValue('')
      setOpen(false)
    }else{
      toast.error('updation failed')
    }
  }

  //delete
  const handleDelete=async(catID)=>{
    const {data}=await axiosInstance.delete(`/category/delete/${catID}`,{
      headers:{
        Authorization:token
      }
    })
    if(data.success){
      toast.success("Deleted Successfully")
      getAllCategories()
      setOpenDel(false)
    }else{
      toast.error(data.message)
    }
  }

  useEffect(()=>{
    if(category.length < 1){
      getAllCategories();
    }
  },[category])
  return (
    <Layout>
     <Grid container >
        {/* Admin Menu (Left Column) */}
        <Grid item xs={4}>
          <AdminMenu />
        </Grid>

        {/* Content (Right Column) */}
        <Grid item xs={8}>
          <Box  height={'100%'} display="flex" flexDirection={'column'}  alignItems={'center'}>
            <h1>Create Category</h1>
            <Box width={'60%'} >
            <TextField
              label="Enter new category"
              variant="outlined"
              margin="normal"
              value={newCategory}
              onChange={(e)=>setNewCategory(e.target.value)}
              fullWidth
            />

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle textAlign='center'>Upadate category</DialogTitle>
              <DialogContent>
                <input type="text" value={updateValue?updateValue:updateCat}  
                onChange={(e)=>{setUpdateValue(e.target.value)}}/>
              </DialogContent>
              <DialogActions>
                <Button onClick={()=>handleUpdate(updateCatID)} color="inherit" variant='contained'>
                  Submit
                </Button>
                <Button onClick={handleClose} color="primary">
                  <CloseIcon/>
                </Button>
              </DialogActions>
            </Dialog>
    

            <Dialog open={openDel} onClose={handleCloseDel}>
              <DialogTitle textAlign='center'>Delete category</DialogTitle>
              <DialogContent>
                <p>are you sure to delete this category</p>
              </DialogContent>
              <DialogActions 
               style={{ display: 'flex', justifyContent: 'space-between' }}
               >
                
                <Button onClick={()=> setOpenDel(false)} 
                color="error"
                variant='outlined'
                >
                  <CloseIcon/>
                </Button>
                <Button onClick={()=>handleDelete(delCat)}
                 color="primary"
                 variant='outlined'>
                  <CheckIcon/>
                </Button>
              </DialogActions>
            </Dialog>


            {/* Submit Button */}
            <Button type="submit" variant="contained" color="inherit" fullWidth
              onClick={createCategory}>
              Submit
            </Button>
            </Box>

            
            <hr style={{ width: '60%', marginTop: '16px', marginBottom: '16px', border: '1px solid #000' }} />
            
            
              {
                category.length < 1 ?
                <h1>no category found</h1>
                :
                <>
                {
                  category.map((c)=>(
                    <>
                    <Box display="flex" 
                    justifyContent='space-between'
                     width='60%' 
                     style={{ overflowY: 'hidden' }}>
                    <h2>{c.name}</h2>
                    <Box display="flex" gap='15px'>
                      <Button type="submit" variant="contained" color="primary" fullWidth
                        onClick={() => {
                          setOpen(true);
                          setUpdateCat(c.name);
                          setUpdateCatID(c._id)
                        }}
                        >
                        Edit
                      </Button>
                      <Button type="submit" 
                      variant="contained" 
                      color="error" 
                      fullWidth
                      onClick={()=>{setOpenDel(true); setDelCat(c._id)}}
                      >
                        Delete 
                      </Button>
                    </Box>
                    </Box>
                    <hr style={{ width: '60%', marginTop: '16px', marginBottom: '16px', border: '1px solid #ddd' }} />
                  </>
                ))
                }
                </>
              }
          </Box>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default CreateCategory