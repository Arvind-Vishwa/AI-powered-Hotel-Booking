const mongoose=require('mongoose')


    // const RoomSchema = new mongoose.Schema({
    // hotelId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Hotel",
    //     required: true
    // },

    // type: {
    //     type: String,
    //     required: true, // e.g. Single, Deluxe, Suite
    // },

    // price: {
    //     type: Number,
    //     required: true
    // },

    // maxGuests: {
    //     type: Number,
    //     required: true
    // },

    // roomNumber: {
    //     type: Number,
    //     required: true,
    //     unique: true
    // },

    // unavailableDates: {
    //     type: [Date],
    //     default: []
    // }

    // }, { timestamps: true });



const hotelSchema=new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:true
    },
    description:{
        type:String,
        required:true,
        select:false
    },
    city:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        
    },
    room:{
        type:Number,
        required:true
    }
})

const hotelModel=mongoose.model('hotel',hotelSchema);

module.exports=hotelModel;