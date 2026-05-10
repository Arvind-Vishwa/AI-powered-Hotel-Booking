const userModel=require('../models/user.model')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


    async function registerController(req, res) {

        try {
    
        const {
            username,
            email,
            password,
            role
        } = req.body;
    
        // VALIDATION
        if (!username || !email || !password) {
    
            return res.status(400).json({
            success: false,
            message: "Username, email or password missing"
            });
        }
    
        // CHECK EXISTING USER
        const isUserExist = await userModel.findOne({
            email
        });
    
        if (isUserExist) {
    
            return res.status(409).json({
            success: false,
            message: "User already exists"
            });
        }
    
        // ALLOW ONLY USER OR OWNER
        const allowedRoles = ["user", "owner"];
    
        const userRole = allowedRoles.includes(role)
            ? role
            : "user";
    
        // HASH PASSWORD
        const hash = await bcrypt.hash(password, 10);
    
        // CREATE USER
        const user = await userModel.create({
            username,
            email,
            password: hash,
            role: userRole
        });
    
        // CREATE JWT
        const token = jwt.sign(
            {
            userId: user._id,
            role: user.role
            },
            process.env.JWT_SECRET,
            {
            expiresIn: "3d"
            }
        );
    
        // STORE COOKIE
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production
            sameSite: "lax",
            maxAge: 3 * 24 * 60 * 60 * 1000
        });
    
        // RESPONSE
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
    
            user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
            }
        });
    
        } catch (err) {
    
        console.log(err);
    
        return res.status(500).json({
            success: false,
            message: "Server error in register controller"
        });
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
            { 
                userId: user._id,
                role:user.role
            },
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
            role:user.role
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