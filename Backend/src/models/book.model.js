const mongoose=require('mongoose')


const bookingSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    hotelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"hotel",
        required:true
    },
    checkIn:{
        type:Date,
        default:Date.now,
        required:true
    },checkOut:{
        type:Date,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    selectRoom:{
        type:Number,
        required:true
    }
})

const bookingModel=mongoose.model('book',bookingSchema)

module.exports=bookingModel