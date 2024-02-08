require('dotenv').config()
const jwt=require('jsonwebtoken')
const userModel = require('../model/userModel')

//generate token
const generateToken=(userID)=>{ 
  return jwt.sign({id: userID},process.env.JWT_SECRET,{expiresIn:'30d'}) 
}

const requireSignIn=(req,res,next)=>{
  try{
    const decode=jwt.verify(req.headers.authorization,process.env.JWT_SECRET)
    req.user=decode
    next()
  }catch(err){
    console.log('err :',err);

  } 
}


//admin access
const isAdmin=async(req,res,next)=>{
  try{
    const user=await userModel.findById(req.user.id)
    if(user.role!==1){
      res.status(404).send({
        success:false,
        message:'access denied'
      })
    }else{
      
      next()
    }
  }catch(err){
    console.log(err);
  }
}

module.exports={
  generateToken,
  requireSignIn,
  isAdmin
}