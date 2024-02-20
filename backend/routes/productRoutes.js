const express=require('express')
const { 
  createProductController, 
  getProductsController,
  getSingleProductController,
  getPhotoController,
  updateProductController,
  deleteProductController,
  searchProductController,
  categoryProductController,
  paymentController,
  filterByPriceController,
  getSimiliarProductsController,
  productListController,
  filterByCheckboxController
 } = require('../controllers/productController')
const formidable=require('express-formidable')
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware')
const router=express.Router()

//create a product
router.post('/create-product',requireSignIn,isAdmin,formidable(), createProductController)

//get products
router.get('/get-products',getProductsController)

//get single product
router.get('/get-single-product/:prodID',getSingleProductController)

//get photo
router.get('/get-photo/:prodID',getPhotoController)

//update product
router.put('/update/:prodID',requireSignIn,isAdmin,formidable(),updateProductController)

//delete
router.delete('/delete/:prodID',requireSignIn,isAdmin,deleteProductController)

//search by keyword
router.get('/search/:keyword',searchProductController)

//category wise product
router.get('/category-product/:catID',categoryProductController)

//filter by price
router.get('/filterbyprice/:sortOrder',filterByPriceController)

//get similiar products 
router.get('/get-similiar/:catID/:prodID',getSimiliarProductsController)

//payment
router.post('/payment/:userID',paymentController)

router.get('/product-list/:page',productListController)

//get products per check box
router.post('/get-checkbox',filterByCheckboxController)



module.exports=router