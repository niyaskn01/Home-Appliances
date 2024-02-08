const { hashPassword, comparePassword } = require('../helpers/authHelper')
const { generateToken } = require('../middlewares/authMiddleware')
const userModel=require('../model/userModel')

//user login
const userLoginController=async(req,res)=>{
  const {email,password}=req.body
  if(!email || !password) return res.send({message:'invalid email or password'})

  try {
    const user =await userModel.findOne({email})
    if(!user) return res.send({message:'invalid email'})

    const validPassword=await comparePassword(password,user.password)
    if(!validPassword) return res.send({message:'invalid password'})

    const token=generateToken(user._id)
    const userInfo={
      _id:user._id,
      role:user.role,
      token
    }
    res.status(200).send({
      success:true,
      message:'user login successfull',
      userInfo,
      user
    })
  } catch (error) {
    
  }
}

//user registration
const userRegisterController=async(req,res)=>{
  const {name,email,password}=req.body
  if(!name) return res.send({message:'name is required'})
  if(!email) return res.send({message:'email is required'})
  if(!password) return res.send({message:'password is required'})

  try {
    const existingUser=await userModel.findOne({email})
    if(existingUser) return res.send({message:'user already exists,please login'})

    const hashedPassword=await hashPassword(password)
    const newUser=new userModel({name,email,password:hashedPassword})
    await newUser.save()

    //create token
    const token=generateToken(newUser._id)
    const userInfo={
      _id:newUser._id,
      role:newUser.role,
      token
    }

    res.status(200).send({
      success:true,
      message:'new user created',
      userInfo,
    })

  } catch (error) {
    res.status(500).send({
      success:false,
      message:'error in register',
      error
    })
  }
}

//update user
const updateUserController=async(req,res)=>{
  const {userID}=req.params
  try {
    const user=await userModel.findByIdAndUpdate(userID,{...req.body},{new:true})
    .select('name _id address');

    res.status(200).send({
      success: true,
      message: 'Address added',
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error
    })
  }
}

//getSingle user
const getSingleUserController = async (req, res) => {
  const { userID } = req.params;
  try {
    const user=await userModel.findById(userID).select('-password')
    res.status(200).send({
      user
    })
  } catch (error) {
    console.log(error);
  }
}

//get all users
const getAllUsersController=async(req,res)=>{
  try {
    const users=await userModel.find({
      _id:{$ne:req.user.id}
    })
    res.status(200).send({
      success:true,
      users
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:'errror in getting users'
    })
  }
}

//add to cart
const addToCartController = async (req, res) => {
  let { userID } = req.params;
  userID = userID.trim();
  const { count, product } = req.body;

  try {
    const user = await userModel.findOne({ _id: userID });
    if (!user) return res.send({ success: false, message: "No such user" });

    // Initialize cart if it doesn't exist
    if (!user.cart) {
      user.cart = [];
    }

    // Find index of the product in the cart
    let existingProductIndex = user.cart.findIndex(
      (item) => item._id.toString() === product._id.toString()
    );

    if (existingProductIndex !== -1) {
      await userModel.findOneAndUpdate({_id:userID,'cart._id':product._id},
      {$inc:{'cart.$.count':parseInt(count)||1}})

      res.json('cart updated')
    } else {
      // Product doesn't exist, add to cart
      const productToAdd = { ...product, count: parseInt(count) || 1 };
      user.cart.push(productToAdd);
      await user.save();
      res.json('product added to cart')
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};


//get cart items
const getCartController=async(req,res)=>{
  const {userID}=req.params
  try {
    const responce=await userModel.findOne({_id:userID}).select('cart')
  if(responce && responce?.cart.length > 0){
    res.status(200).send({
      success:true,
      responce
    })
  }else{
    res.status(200).send({
      responce:{
        cart:[]
      },
      message:'no items in the cart'
    })
  }
  } catch (error) {
    console.log(error)
    res.send(error)
}
}

//remove from cart
const removeCartController=async(req,res)=>{
  const {userID}=req.params
  let {product}=req.body
  try {
    const user=await userModel.findById(userID)
    if(!user) return res.json('user not found')

    const existingIndex=user.cart.findIndex(item=>item._id===product._id)
    if(existingIndex!==-1){
      user.cart.splice(existingIndex,1)
      await user.save()
      res.status(200).json('item removed')
    }else{
      res.json('no such product in cart')
    }
  } catch (error) {
    console.log(error)  
  } 
}
 
module.exports={
  userLoginController,
  userRegisterController,
  updateUserController,
  getSingleUserController,
  getAllUsersController,
  addToCartController,
  getCartController,
  removeCartController
}