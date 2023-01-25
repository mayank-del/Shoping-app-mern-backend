const jwt = require("jsonwebtoken");

const generateToken=(user)=>{
    //actully during signing time with jwt ,they are hiding password key
    return jwt.sign(JSON.parse(JSON.stringify(user)),process.env.JWT_SECRET,{
        expiresIn:'1d',
    })
}
const isAuth=(req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const verifyToken =  jwt.verify(token, process.env.JWT_SECRET,(err,decode)=>{
            if(err){
                res.status(401).send({message:"Invalid Token"})
            }else{
                req.user=decode;
                next();
            }
        });
        console.log(verifyToken)
}catch(err){

}

}
module.exports={generateToken,isAuth}


/* _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin, */