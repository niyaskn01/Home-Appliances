require('dotenv').config()

const mongoose=require('mongoose')
mongoose.connect(process.env.MONGO_URL)

const connect=()=>{
  const db=mongoose.connection

  db.on('error',(err)=>{
    console.log(err);
  })

  db.once('open',()=>{
    console.log('connected with database');
  })
}

module.exports=connect


