const express=require('express')
const { userLoginController, userRegisterController, updateUserController, getSingleUserController, getAllUsersController, addToCartController, getCartController, removeCartController, updateAsAdminrController } = require('../controllers/userController')
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware')
const router=express.Router()

//login
router.post('/login',userLoginController)
 
//register  
router.post('/register',userRegisterController)
 
//update user(add address)
router.put('/update/:userID',requireSignIn,updateUserController)
 
//get single user
router.get('/get-user/:userID',requireSignIn,getSingleUserController)

//get all users 
router.get('/all-users',requireSignIn,isAdmin,getAllUsersController) 
 
//add to cart
router.post('/addcart/:userID',addToCartController)

//make as admin
router.put('/role-change/:userID',updateAsAdminrController)
 
// get cart 
router.get("/cart/:userID",getCartController)

//remove cart items
router.put('/remove/:userID',removeCartController)

module.exports=router 