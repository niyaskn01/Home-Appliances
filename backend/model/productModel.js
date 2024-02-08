const mongoose=require('mongoose')
const schema=mongoose.Schema
const productSchema=new schema({
  name:{type:String,required:true},
  slug:{type:String,required:true},
  description:{type:String,required:true},
  price:{type:Number,required:true},
  quantity:{type:Number,required:true},
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'category',
    required:true
  },
  image:{
    data:Buffer,
    ContentType:String
  },
  shipping:{
    type:Boolean
  }
},{timestamps:true})

module.exports=mongoose.model('product',productSchema)