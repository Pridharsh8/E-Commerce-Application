const express= require('express')
const route=express.Router();
const _=require('lodash')
const {createTask,getTask,deleteProduct,searchItems, searchProducts, addCart}=require('../controller/taskscontroller')
route.post('/', createTask)
route.get('/', getTask)
route.delete('/:id',deleteProduct)
route.get('/search', searchProducts);
// route.post('/cart', addCart);



module.exports=route;
