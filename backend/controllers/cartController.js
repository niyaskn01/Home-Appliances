const cartModel=require('../model/cartModel')

//create cart
const createCartController=async(req,res)=>{
  const {userID}=req.params
  const {prodID}=req.body
  try {
    let cart=await cartModel.findOne({userID,'products.productID':prodID})
    if(cart){
      await cartModel.updateOne(
        {userID,'products.productID':prodID},
        {$inc:{'products.$.count':1}}
      )
    }else{
      await cartModel.updateOne(
        { userID },
        { $push: { products: { productID: prodID, count: 1 } } },
        { upsert: true }
      );
    }
    res.status(200).send({
      message:'added to cart',
      success:true
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:'error in adding to cart'
    })
  }
}

//get cart items
const getCartItemsController=async(req,res)=>{
  const {userID}=req.params
  
  try {
    const cartItems=await cartModel.findOne({userID})
    res.send(cartItems.products)
  } catch (error) {
    console.log(error);
  }
}
module.exports={
  createCartController,
  getCartItemsController
}