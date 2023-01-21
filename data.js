const bcrypt=require("bcryptjs")
/* hello user */
const data={
    users:[
        {
            
            name:"Mayank",
            email:"admin@mayank.com",
            password:bcrypt.hashSync('123456'),
            isAdmin:true
        },

        {
            name:"User1",
            email:"user@mayank.com",
            password:bcrypt.hashSync('123456'),
            isAdmin:false
        }
    ],

    products:[
        {   //_id:"1",
            name:'Nike Slim Shirt',
            slug:'nike-slim-shirt',
            category:'Shirts',
            image:'/images/model.jpg',
            price:230,
            countInStock:10,
            brand:'Nike',
            rating:4.5,
            numReviews:654,
            description:'high quality shirt'
        },
        {   //_id:"2",
            name:'Adidas Fit Shirt',
            slug:'adidas-fit-shirt',
            category:'Shirts',
            image:'/images/model.jpg',
            price:120,
            countInStock:0,
            brand:'Nike',
            rating:5,
            numReviews:1032,
            description:'high quality shirt'
        },
        {   //_id:"3",
            name:'Nike Slim Pant',
            slug:'nike-slim-pant',
            category:'Shirts',
            image:'/images/model.jpg',
            price:420,
            countInStock:4,
            brand:'Nike',
            rating:3.9,
            numReviews:10,
            description:'high quality shirt'
        },
        {  // _id:"4",
            name:'Adidas Fit Pant',
            slug:'adidas-fit-pant',
            category:'Shirts',
            image:'/images/model.jpg',
            price:190,
            countInStock:14,
            brand:'Nike',
            rating:4.3,
            numReviews:976,
            description:'high quality shirt'
        }
    ]
}
module.exports=data
