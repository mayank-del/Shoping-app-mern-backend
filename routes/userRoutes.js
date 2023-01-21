const express=require("express");
const { User } = require("../models/userModel");
const bcrypt=require("bcryptjs");
const expressAsyncHandler=require('express-async-handler');
const { generateToken } = require("../utils");

const userRouter=express.Router()

userRouter.post(
    '/signin',expressAsyncHandler(async(req,res)=>{
        const user=await User.findOne({email:req.body.email})
        if(user){
            if(bcrypt.compareSync(req.body.password,user.password)){ // note-: in compareSync, 1st parameter should always be user entered password, 2nd should be password with which we have to compare
                res.status(200).send({
                    _id:user.id,
                    name:user.name,
                    email:user.email,
                    isAdmin:user.isAdmin,
                    token:user.generateToken,
                })
                return;
            }
            else{
                res.status(401).send({message:"Wrong password"})

            }
        }
        else{
                res.status(401).send({message:"Invalid email"})

        }
    })
)

userRouter.post(
   '/signup',
   expressAsyncHandler(async(req,res)=>{
    const newUser=new User({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password)
    })
    const user=await newUser.save();
    res.status(200).send({
        _id:user.id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:user.generateToken,
    })
   }) 
)

module.exports=userRouter