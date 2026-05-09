const hotelModel=require("../models/hotel.model")
const bookingModel=require("../models/book.model")



async function createHotelController(req,res){
    
    try{
        const {title,description,price,city,room}=req.body;

        if(!title || !description || !price || !city){
            return res.json({
                message:"filed is missing check again"
            })
        }

        const hotel=await hotelModel.create({
            title,
            description,
            price,
            city,
            createdBy:req.userId,
            room
        })

        res.json({
            message:"hotel created succesfully",
            title:hotel.title,
            price:hotel.price,
            city:hotel.city,
            description:hotel.description,
            room:hotel.room,
            createdBy:hotel.createdBy
        })
    }catch(err){
        res.json({
            message:err
        })
    }
    
}

async function bookingHotelController(req, res) {
    try {
      const {
        checkIn,
        checkOut,
        selectRoom,
        totalPrice,
      } = req.body;
  
      const { hotelId } = req.params;
      console.log(hotelId);
  
      // validation
      if (!checkIn || !checkOut) {
        return res.status(400).json({
          success: false,
          message: "Fields are missing",
        });
      }
  
      // create booking
      const bookingHotel =
        await bookingModel.create({
          userId: req.userId,
          hotelId,
          checkIn,
          checkOut,
          selectRoom,
          totalPrice,
        });
  
      res.status(201).json({
        success: true,
        message: "Hotel booked successfully",
        booking: bookingHotel,
      });
  
    } catch (error) {
      console.error(error);
  
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

async function getHotelController(req,res){
    const hotel=await hotelModel.find();

    if(!hotel){
        return res.json({
            message:"No hotel exist"
        })
    }
    res.status(200).json({
        message:"Hotel fetched succesfully",
        hotels:hotel
    })
}
module.exports={createHotelController,bookingHotelController,getHotelController}
