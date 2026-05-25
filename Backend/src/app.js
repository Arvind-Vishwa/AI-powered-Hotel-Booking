const express=require('express')
const app=express();
const cookieParser=require('cookie-parser')
const cors=require('cors')

app.use(cors({
    origin:[
        'http://localhost:5173',
        'https://singular-cannoli-2a3fd2.netlify.app'
    ],
    credentials:true
}))

// routes
const AuthRouter=require("../src/routes/user.route")
const hotelRouter=require("../src/routes/hotel.routes")
const ownerRouter=require("./routes/owner.route")


app.use(express.json())
app.use(cookieParser());

// user route
app.use('/api/auth',AuthRouter);

app.use('/api/hotel',hotelRouter);

app.use('/api',ownerRouter)









module.exports=app;