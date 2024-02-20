const express=require('express')
const router=express.Router()
const { requireSignIn } =require('../middlewares/authMiddleware')
const { getOrderController, createOrderController, getAllOrdersController, updateStatusController } = require('../controllers/orderController')

//get order
router.get('/get-orders',requireSignIn,getOrderController)

//get all orders
router.get('/get-all-orders',requireSignIn,getAllOrdersController)

//create order
router.post('/create-order',requireSignIn,createOrderController)

//update status
router.put('/update-status',updateStatusController)

module.exports=router