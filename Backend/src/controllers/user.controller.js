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

        res.cookie(token,token,{
            httpOnly:true,
            secure:false,
            sameSite:"lax"
        });

        res.status(200).json({
            message:"User created sucessfully",
            token:token,
            user:user._id,
            email:user.email
        })


    }catch(err){
        res.json({
            message:"Some error to register controller"
        })
    }
}

    async function loginController(req, res) {
        try {
        const { email, password } = req.body;
    
        if (!email || !password) {
            return res.status(400).json({
            message: "Email and password required",
            });
        }
    
        const user = await userModel.findOne({ email });
    
        if (!user) {
            return res.status(404).json({
            message: "User does not exist",
            });
        }
    
        const pass = await bcrypt.compare(password, user.password);
    
        if (!pass) {
            return res.status(401).json({
            message: "Password does not match",
            });
        }
    
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );
    
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
    
        return res.status(200).json({
            user: {
            _id: user._id,
            name: user.username,
            email: user.email,
            },
        });
    
        } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
        }
    }
async function getMeController(req,res){
    
    const user=await userModel.findById(req.userId)
    // console.log(user)
    if(!user){
        res.json({
            message:"No user exist try to register yourself"
        })
    }

    res.status(200).json({
        message:"User fetched succesfully",
        username:user.username,
        email:user.email
    })
}   


module.exports={registerController,loginController,getMeController}