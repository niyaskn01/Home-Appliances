const mongoose=require('mongoose')
const schema=mongoose.Schema
const cartSchema=new schema({
  userID:{
    type:mongoose.Schema.Types.ObjectId, 
    required:true
  },
  products:[
    {
      productID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
      },
      count:{
        type:Number,
        default:1
      }
    }
  ]
})

module.exports= mongoose.model('cart',cartSchema)