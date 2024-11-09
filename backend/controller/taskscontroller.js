const taskModel=require('../models/task')
const mongoose=require('mongoose')

const createTask =async(req,res)=>{
    const{prodName,MRP,amt,size}=req.body
    try{
        const task= await taskModel.create({prodName,MRP,amt,size})
        res.status(200).json(task)
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
};
const getTask = async(req,res)=>{
    try{
        const tasks=await taskModel.find({});
        res.status(200).json(tasks);
    }
    catch(e){
        res.status(400).json({error:e.message});
    }
};
const deleteProduct=async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:'Task not found'});
    }
    try{
        const delTask=await taskModel.findByIdAndDelete(id);
        res.status(400).json(delTask);

    }
    catch(e){
        res.status(400).json({error:e.message});
    }
}


const searchProducts = async (req, res) => {
  try {
    const query = req.query.query; // Get the product name from query params
    const products = await taskModel.find({ prodName: { $regex: query, $options: 'i' } }); // Case-insensitive search
    
    if (products.length > 0) {
      res.status(200).json({
        message: 'Products found',
        products: products
      });
    } else {
      res.status(404).json({
        message: 'No products found'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error searching products',
      error: error.message
    });
  }
};

  

module.exports={createTask,getTask,deleteProduct,searchProducts};