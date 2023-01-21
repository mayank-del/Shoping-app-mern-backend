const jwt = require("jsonwebtoken");

const generateToken=(user)=>{
    //actully during signing time with jwt ,they are hiding password key
    return jwt.sign(JSON.parse(JSON.stringify(user)),process.env.JWT_SECRET,{
        expiresIn:'1d',
    })
}
module.exports={generateToken}


/* _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin, */