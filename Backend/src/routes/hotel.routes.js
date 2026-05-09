const express=require('express')
const router=express.Router();
const {createHotelController,getHotelController}=require('../controllers/hotel.controller')
const {bookingHotelController}=require("../controllers/hotel.controller")
const authMiddleware=require("../middleware/auth.middleware")
const {uploadFile}=require('../services/imageKit.service')

const upload=multer({
    storage:multer.memoryStorage()
})

router.post('/create',authMiddleware,upload.single('img'),createHotelController)
router.get('/getHotel',getHotelController)


router.post('/book/:hotelId',authMiddleware,bookingHotelController)

module.exports=router