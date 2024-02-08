const mongoose=require('mongoose')
const schema=mongoose.Schema

const orderSchema=new schema({
  products:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'product'
    }
  ],
  payment:{
    Type:String
  },
  buyer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  status:{
    type:String,
    default:'Not Process',
    enum:['Not Process','Processing','Shipped','Delivered','Cancelled']
  }

},{timestamps:true})

module.exports=mongoose.model('orders',orderSchema)