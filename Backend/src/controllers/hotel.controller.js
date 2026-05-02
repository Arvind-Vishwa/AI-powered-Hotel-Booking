const hotelModel=require("../models/hotel.model")


async function createHotelController(req,res){
    
    try{
        const {title,description,price,city}=req.body;

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
            // createdBy:req.user.id
        })

        res.json({
            message:"hotel created succesfully",
            title:hotel.title,
            price:hotel.price,
            city:hotel.city,
            description:hotel.description
        })
    }catch(err){
        res.json({
            message:err
        })
    }
    
}

module.exports={createHotelController}
