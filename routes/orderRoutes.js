const express=require("express");
//const { User } = require("../models/userModel");
const expressAsyncHandler=require('express-async-handler');
const { isAuth } = require("../utils");
const { Order } = require("../models/orderModel");

const orderRouter=express.Router()

orderRouter.post('/',isAuth,expressAsyncHandler(async(req,res)=>{
    const neworder=new Order({
        orderItems:req.body.orderItems.map((x)=>({...x,product:x._id})),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id, 
    })
    const order=await neworder.save();
    res.status(201).send({message: 'New Order Created',order})
}))

orderRouter.get('/:id',isAuth,expressAsyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id)
    if(order){
        res.send(order);
    }else{
        res.status(404).send({message:"Order not found"});
    }
}))
orderRouter.put(
    '/:id/pay',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id).populate(
        'user',
        'email name'
      );
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.email_address,
        };
  
        const updatedOrder = await order.save();
        mailgun()
          .messages()
          .send(
            {
              from: 'Amazona <amazona@mg.yourdomain.com>',
              to: `${order.user.name} <${order.user.email}>`,
              subject: `New order ${order._id}`,
              html: payOrderEmailTemplate(order),
            },
            (error, body) => {
              if (error) {
                console.log(error);
              } else {
                console.log(body);
              }
            }
          );
  
        res.send({ message: 'Order Paid', order: updatedOrder });
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    })
  );
  orderRouter.delete(
    '/:id',
    isAuth,
    
    expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
        await order.remove();
        res.send({ message: 'Order Deleted' });
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    })
  );

module.exports=orderRouter