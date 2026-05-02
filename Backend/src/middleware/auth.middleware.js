require('dotenv').config()
const jwt=require('jsonwebtoken')


async function authMiddleware(req,res,next){
    const token=req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"token is missing"
        })
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.userId=decoded.userId
        next();
    }catch(err){
        res.status(401).json({
            message:err
        })
    }
}


module.exports=authMiddleware;