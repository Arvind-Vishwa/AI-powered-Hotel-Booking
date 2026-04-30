const express=require('express')
const app=express();
const AuthRouter=require("../src/routes/user.route")
const cookieParser=require('cookie-parser')

app.use(express.json())
app.use(cookieParser());

// user route
app.use('/api/auth',AuthRouter)










module.exports=app;