const express=require('express')
const { createCartController, getCartItemsController } = require('../controllers/cartController')
const router=express.Router()

//create cart 
router.post('/create/:userID',createCartController)  

//get cart
router.get('/getcart/:userID',getCartItemsController)

module.exports=router