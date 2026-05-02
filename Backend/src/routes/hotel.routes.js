const express=require('express')
const router=express.Router();
const {createHotelController}=require('../controllers/hotel.controller')
const {bookingHotelController}=require("../controllers/hotel.controller")
const authMiddleware=require("../middleware/auth.middleware")


router.post('/create',authMiddleware,createHotelController)

router.post('/book',authMiddleware,bookingHotelController)

module.exports=router