const express=require('express')
const dotenv=require('dotenv')
const cors=require('cors')
const db=require('./config/connect')
const userRouter=require('./routes/userRouter')
const categoryRouter=require('./routes/categoryRoutes')
const productRouter=require('./routes/productRoutes')
const cartRouter=require('./routes/cartRoutes')
const orderRouter=require('./routes/orderRoutes')
const app=express()

dotenv.config()    
const corsOptions = {    
  origin: '*', 
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions))
app.use(express.json())
db()
app.get('/',(req,res)=>{
  res.send('api checked')
}) 
app.use('/user',userRouter)
app.use('/category',categoryRouter) 
app.use('/product',productRouter)
app.use('/cart',cartRouter)
app.use('/order',orderRouter)

const port=process.env.PORT || 8080

app.listen(port,()=>{
  console.log('server is running at ',port);
})




