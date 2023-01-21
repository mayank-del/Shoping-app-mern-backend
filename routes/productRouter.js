const express=require("express")
const { Product } = require("../models/productModel");


const productRouter=express.Router()

productRouter.get('/',async(req,res)=>{
    const products=await Product.find();
    res.send(products)
})

productRouter.get("/slug/:slug",async(req,res)=>{
    //const product=data.products.find((x) => x.slug===req.params.slug); //it can be used for dummy data present in one file data.js in backend
    const product=await Product.findOne({slug:req.params.slug}); 
    if(product){
        res.send(product)
        
    }
    else{
        //console.log(req.params.slug)
        res.status(404).send({message:"Product not found!"})
    }
})

productRouter.get("/:id",async(req,res)=>{
    //const product=data.products.find((x) => x._id===req.params.id); //it can be used for dummy data present in one file data.js in backend
    const product=await Product.findById(req.params.id);
    if(product){
        res.send(product)        
    }
    else{
        //console.log(req.params.id)
        res.status(404).send(req.params.id)
    }
})



module.exports=productRouter