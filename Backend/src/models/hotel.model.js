const mongoose=require('mongoose')


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
        
    }
})

const hotelModel=mongoose.model('hotel',hotelSchema);

module.exports=hotelModel;