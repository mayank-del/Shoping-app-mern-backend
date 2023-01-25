/* import express from "express"
//import data from "./data" */

require("dotenv").config()
const express =require("express")
const data=require("./data")
const mongoose=require("mongoose")
const seedRouter = require("./routes/seedRoutes")
const productRouter=require("./routes/productRouter")


const cors=require("cors")
const userRouter = require("./routes/userRoutes")
const orderRouter = require("./routes/orderRoutes")

const app=express()
app.use(express.json())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Connected to MongoDB");
}).catch(err=>{
    console.log(err.message)
})

app.get('/api/keys/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
  });
  
app.use("/api/seed",seedRouter)
app.use("/api/product",productRouter)
app.use('/api/users',userRouter)
app.use('/api/orders',orderRouter)

app.get("/",(req,res)=>{
    console.log("Home page")
    res.send("Home page")
})
/* app.get("/api/product",(req,res)=>{
    //console.log(data.products)
    res.send(data.products)
}) */

app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message}); 
})


const port =5000

app.listen(port,()=>{
    console.log(`Server is listening to ${port}`)
})