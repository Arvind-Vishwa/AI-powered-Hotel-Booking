const userModel=require('../models/user.model')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


async function registerController(req,res){

    try{
        const {username,email,password}=req.body;

        if(!username || !email || !password){
            return res.json({
                message:"username or email or password something is missing"
            })
        }

        const isUserExist=await userModel.findOne({
            email
        })

        if(isUserExist){
            return res.status(401).json({
                message:"User already exist"
            })
        }



        const hash=await bcrypt.hash(password,10);

        const user=await userModel.create({
            username,
            email,
            password:hash
        })

        const token=jwt.sign({
            userId:user._id
        },process.env.JWT_SECRET,
        {expiresIn:"3d"})

        res.cookie(token,token);

        res.status(200).json({
            message:"User created sucessfully",
            user:user._id,
            email:user.email
        })


    }catch(err){
        res.json({
            message:"Some error to register controller"
        })
    }
}

async function loginController(req,res){
    try{
        const {email,password}=req.body;

    if(!email || !password)
    {
        return res.status(402).json({
            message:"forbidden error"
        })
    }

    const user=await userModel.findOne({
        email
    }).select('+password')

    if(!user){
        return res.json({
            message:"user does not exist"
        })
    }

    const pass=bcrypt.compare(password,user.password);
    if(!pass){
        return res.json({
            message:"password does not match"
        })
    }

    const token=jwt.sign({
        userId:user._id
    },process.env.JWT_SECRET,
    {expiresIn:"3d" })

    res.cookie("token",token);

    res.status(200).json({
        message:"User login sucessfully"
    })
    }catch(err){
        res.status(401).json({
            message:err
        })
    }
}


module.exports={registerController,loginController}