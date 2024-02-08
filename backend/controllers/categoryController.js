const categoryModel=require('../model/categoryModel')
const slugify=require('slugify')

//create new category
const createCategoryController=async(req,res)=>{
  const {name}=req.body
  if(!name) return res.send({message:'name is required'})

  try {
    const category=await categoryModel.findOne({name})
    if(category) return res.send({message:'category already exists'})
    const newCategory=await new categoryModel({
      name,
      slug:slugify(name)
    }).save()

    res.status(200).send({
      success:true,
      message:`${newCategory} created`,
      category:newCategory
    })
  } catch (error) {
    res.status(500).send({
      success:false,
      message:'error in create category',
      error
    })
  }
}

//update category
const updataCategoryController=async(req,res)=>{
  const {name}=req.body
  const {catID}=req.params
  try {
    const category=await categoryModel.findByIdAndUpdate(catID,{name,slug:slugify(name)},{
      new:true
    })
    res.status(200).send({
      success:true,
      message:`updated to ${category.name}`,
      category
    })
  } catch (error) {
    res.status(500).send({
      success:false,
      message:'error in update category',
      error
    })
  }
}

//get all category
const getAllCategoryController=async(req,res)=>{
  try {
    const category=await categoryModel.find()
    res.status(200).send({
      success:true,
      category
    })
  } catch (error) {
    res.status(500).send({
      success:false,
      message:'error in getting category',
      error
    })
  }
}

//get single category
const getSingleCategoryController=async(req,res)=>{
  const {catID}=req.params
  try {
    const category=await categoryModel.findById(catID)
    res.status(200).send({
      success:true,
      category
    })
  } catch (error) {
    res.status(500).send({
      success:false,
      message:'error in getting category',
      error
    })
  }
}

//delete category
const deleteCategoryController=async(req,res)=>{
  const {catID} = req.params
  try {
    const deleted=await categoryModel.findByIdAndDelete(catID)
    if(deleted){
      res.status(200).send({
        success: true,
        message: 'category has been deleted'
        });
    }else{
      res.send('cant delete')
    }

  } catch (error) {
    res.status(500).send({
      success:false,
      message:'error in getting category',
      error
    })
  }
}

module.exports={
  createCategoryController,
  updataCategoryController,
  getAllCategoryController,
  getSingleCategoryController,
  deleteCategoryController
}
