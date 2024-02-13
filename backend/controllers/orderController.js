const orderModel=require('../model/orderModel')

//get order
const getOrderController=async(req,res)=>{
  try {
    const orders=await orderModel.find({buyer:req.user.id})
    .populate('products','-image')
    .populate('buyer','name').sort({createdAt:-1})
    res.json(orders)
  } catch (error) {
    console.log(error);
  }
}

//get all orders
const getAllOrdersController=async(req,res)=>{
  try {
    const order=await orderModel.find()
    .populate('products','-image')
    .populate('buyer','name email').sort({createdAt:-1})
    res.send({
      order
    })
  } catch (error) {
    console.log(error);
    res.send(error)
  }
}

//create order
const createOrderController = async (req, res) => {
  const { products } = req.body;

  try {
    // Create a new order using the orderModel
    const order = await orderModel.create({
      products,
      buyer: req.user.id, 
      status: 'Processing', 
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, error: 'Error creating order' });
  }
};


module.exports={
  getOrderController,
  createOrderController,
  getAllOrdersController
}