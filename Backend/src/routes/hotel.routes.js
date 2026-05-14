const express=require('express')
const router=express.Router();
const {createHotelController,getHotelController}=require('../controllers/hotel.controller')
const {bookingHotelController,deleteHotelController,listingController}=require("../controllers/hotel.controller")
const {aiSearchController}=require("../controllers/aiSearch.controller")
const authMiddleware=require("../middleware/auth.middleware")
const {uploadFile}=require('../services/imageKit.service')
const multer=require('multer')
const authorize=require('../middleware/authorize')
const upload=multer({
    storage:multer.memoryStorage()
})

router.post('/create',authMiddleware,upload.single('img'),createHotelController)
router.get('/getHotel',getHotelController)


router.post('/book/:hotelId',authMiddleware,bookingHotelController)

// delete
router.delete('/book/:hotelId',authMiddleware,authorize("admin"),deleteHotelController)

// owner will se their only created listngs
router.get('/listing',authMiddleware,listingController)


// AI seach 
router.post(
    "/ai-search",
    aiSearchController
  );

module.exports=router