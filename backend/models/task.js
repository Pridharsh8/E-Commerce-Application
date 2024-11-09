const mongoose=require('mongoose');
const schema=mongoose.Schema

const productSchema=new schema(
    {
     prodName:{
        type:String,
        required:true
     },
     MRP:{
        type:Number,
        required:true
     },
     amt:{
        type:Number,
        required:true
     },
     size:{
        type:String,
        required:true
     }

    }
);
module.exports=mongoose.model("ecommerces",productSchema)