const slugify=require('slugify')
const stripe = require('stripe')(process.env.STRIPE_KEY);
const productModel=require('../model/productModel')
const fs=require('fs');
const userModel = require('../model/userModel');

//create new product
const createProductController=async(req,res)=>{
  const {name,description,price,quantity,category}=req.fields
  const {photo}=req.files

  if(!name) return res.send({message:'name is required'})
  if(!description) return res.send({message:'description is required'})
  if(!price) return res.send({message:'price is required'})
  if(!quantity) return res.send({message:'quantity is required'})
  if(!category) return res.send({message:'category is required'})
  if(photo && photo.size > 10000000) return res.send({message:'photo should be size less than 10mb'})

  try {
    const product=new productModel({...req.fields,slug:slugify(name)})
    
    if(photo){
      product.image.data=fs.readFileSync(photo.path)
      product.image.ContentType=photo.type
    }
    await product.save()
    res.status(200).send({  
      success:true,
      message:'new product created successfully',
      product
     })
  } catch (error) {
    res.status(500).send({
      error
    })
  }
}

//get all products
const getProductsController=async(req,res)=>{
  try { 
    const product=await productModel.find({})
    .populate('category')
    .select('-image')
    .sort({createdAt:-1})
    //.limit(12)

    res.status(200).send({
      success:true,
      count:product.length,
      product
    })
  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
}

//get singleProduct
const getSingleProductController=async(req,res)=>{
  const {prodID}=req.params
  try {
    const product=await productModel.findById(prodID)
    .populate('category')
    .select('-image')

    res.status(200).send({
      success:true,
      product
    })
  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
}

//get photo
const getPhotoController = async (req, res) => {
  const { prodID } = req.params;
  try {
    const product = await productModel.findById(prodID).select('image');
    if (!product) return res.status(404).send({ message: 'No product found' });

    if (product.image.data) {
      res.set('Content-Type', product.image.ContentType);
      return res.status(200).send(product.image.data);
    } else {
      return res.status(404).send({ message: 'No image data found for the product' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
    });
  }
}; 


//update product
const updateProductController=async(req,res)=>{
  const {prodID}=req.params
  //const {name,description,price,quantity,category}=req.fields
  const {photo}=req.files
  try {
    const product=await productModel.findByIdAndUpdate(prodID,{
      ...req.fields,slug:slugify(req.fields.name) 
    },{new:true})

    if(photo){
      product.image.data=fs.readFileSync(photo.path)
      product.image.ContentType=photo.type
    }
    await product.save()

    res.status(200).send({
      success: true,
      product,
      message:'product updated'
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
    });
  }
}

//delete product
const deleteProductController=async(req,res)=>{
  const {prodID}=req.params
  try {
    const product=await productModel.findByIdAndDelete(prodID)

    res.status(200).send({
      success:true,
      message:'product deleted',
      product
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
    });
  }
}

//search product
const searchProductController=async(req,res)=>{
  const {keyword}=req.params
  try {
    const product=await productModel.find({
      $or:[
        {name:{$regex:keyword,$options:'i'}},
        {description:{$regex:keyword,$options:'i'}}
      ]
    }).select('-image')

    res.status(200).send({
      success:true,
      count:product.length, 
      products:product
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
    });
  }
}

//get similiar products
const getSimiliarProductsController=async(req,res)=>{
  const {catID,prodID}=req.params
  try {
    const products=await productModel.find({
      category:catID,
      _id:{$ne:prodID}
    }).limit(4).select('-image')
    res.send({
      products
    }) 
  } catch (error) {
    console.log(error);
  }
}

//category wise product
const categoryProductController=async(req,res)=>{
  const {catID}=req.params
  try {
    const products=await productModel.find({category:catID})
    res.status(200).send({
      success:true,
      count:products.length,
      products
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
      
    })
  }
}

//filter by checkbox
const filterByCheckboxController=async(req,res)=>{
  const {selectedCategories,maxPrice}=req.body
  try {
    let query={category:{$in:selectedCategories}}
    if(maxPrice){
      query.price={ $lte: maxPrice }
    }
    let products=await productModel.find(query).select('-image')
    console.log(typeof(selectedCategories),"selectedCategories")
    res.status(200).json(products)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

//filter by price
const filterByPriceController=async(req,res)=>{
  const {sortOrder}=req.params
  try {
    let sortOptions = {};
    if(sortOrder==='desc'){
      sortOptions={price:-1}
    }
    if(sortOrder==='asc'){
      sortOptions={price:1}
    }
    const products= await productModel.find().sort(sortOptions).select('-image')
    res.status(200).send({
      products,
      success:true
    })
  } catch (error) {
    console.log(error);
  }
}
  
//payment
const paymentController=async(req,res)=>{
  try { 
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: 'inr',
          product_data: { 
            name: item.name,
          }, 
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
        
      })),
      //customer_email: req.body.customerEmail, 
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['IN'], 
      },
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',

    });
    const {userID}=req.params
    await userModel.findByIdAndUpdate(userID,{cart:[]})
    
    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });  
  }
}

//product list per page
const productListController=async(req,res)=>{
  const perPage=12
  const {page}=req.params
  try {
    const product=await productModel.find({})
    .skip((Number(page)-1)*perPage)
    .limit(perPage)
    .select('-image')
    .sort({createdAt:-1})
    const count=await productModel.estimatedDocumentCount()
    res.status(200).send({
      success:true,
      product,
      count
    })
  } catch (error) {
    res.status(500).send({
      message:'error in getting product'
    })
  }
}

module.exports={
  createProductController,
  getPhotoController,
  getProductsController,
  getSingleProductController,
  updateProductController,
  deleteProductController,
  searchProductController,
  getSimiliarProductsController,
  filterByCheckboxController,
  categoryProductController,
  paymentController,
  filterByPriceController,
  productListController
}