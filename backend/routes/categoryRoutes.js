const express=require('express')
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware')
const { createCategoryController,
        updataCategoryController, 
        getAllCategoryController,
        getSingleCategoryController,
        deleteCategoryController} = require('../controllers/categoryController')
const router=express.Router()
 
//create  
router.post('/create-category',requireSignIn,isAdmin,createCategoryController)

//update 
router.put('/update-category/:catID',requireSignIn,isAdmin,updataCategoryController)

//get all 
router.get('/get-all',getAllCategoryController)
 
//get single
router.get('/get-single/:catID',getSingleCategoryController)
 
//delete
router.delete('/delete/:catID',requireSignIn,isAdmin,deleteCategoryController)


module.exports=router