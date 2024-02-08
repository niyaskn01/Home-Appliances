const mongoose=require('mongoose')
const schema=mongoose.Schema
const userSchema=new schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  phone:{
    type:String,
  },
  address:{
    type:{},
  },
  role:{
    type:Number,
    default:0
  },
  cart:{
    type:Array
  }
},{timestamps:true})


module.exports=mongoose.model('user',userSchema)