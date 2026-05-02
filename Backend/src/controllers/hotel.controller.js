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

async function bookingHotelController(req,res){
    const {hotelId,checkIn,checkOut,selectRoom,totalPrice}=req.body;

    if(!checkIn || !checkOut){
        return res.json({
            message:"field is missing check again"
        })
    }

    const bookingHotel=await bookingModel.create({
        userId:req.userId,
        hotelId,
        checkIn,
        checkOut,
        selectRoom,
        totalPrice
    })

    res.status(201).json({
        message:"hotel booking sucessfully",
        checkIn:bookingHotel.checkIn,
        checkOut:bookingHotel.checkOut,
        roomAvailable:bookingHotel.selectRoom,
        totalPrice:bookingHotel.totalPrice
    })
}
module.exports={createHotelController,bookingHotelController}
