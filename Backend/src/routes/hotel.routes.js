const express=require('express')
const router=express.Router();
const {createHotelController}=require('../controllers/hotel.controller')


router.post('/create',createHotelController)



module.exports=router