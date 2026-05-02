const express=require('express')
const app=express();
const cookieParser=require('cookie-parser')


// routes
const AuthRouter=require("../src/routes/user.route")
const hotelRouter=require("../src/routes/hotel.routes")


app.use(express.json())
app.use(cookieParser());

// user route
app.use('/api/auth',AuthRouter);

app.use('/api/hotel',hotelRouter);









module.exports=app;