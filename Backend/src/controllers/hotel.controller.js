const hotelModel=require("../models/hotel.model")
const bookingModel=require("../models/book.model")
const {uploadFile}=require('../services/imageKit.service')


async function createHotelController(req, res) {
  try {

      console.log("hello ji create hotel");

      const { title, description, price, city, room } = req.body;

      // Validation
      if (!title || !description || !price || !city) {
          return res.status(400).json({
              message: "Fields are missing",
          });
      }

      // File Validation
      if (!req.file) {
          return res.status(400).json({
              message: "Image file is required",
          });
      }

      console.log("BODY:", req.body);
      console.log("FILE:", req.file);
      console.log("USER:", req.userId);

      // Upload image
      let result;

      try {
          result = await uploadFile(
              req.file.buffer.toString("base64")
          );

          console.log("UPLOAD RESULT:", result);

      } catch (uploadErr) {

          console.error("Upload Error:", uploadErr);

          return res.status(500).json({
              message: "Image upload failed",
          });
      }

      // Create Hotel
      const hotel = await hotelModel.create({
          title,
          description,
          price: Number(price),
          city,
          room: Number(room),
          createdBy: req.userId,
          img: result.url
      });

      return res.status(201).json({
          message: "Hotel created successfully",
          hotel,
      });

  } catch (err) {

      console.error("Create Hotel Error:", err);
      console.error(err.stack);

      return res.status(500).json({
          message: err.message || "Server Error",
      });
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

async function deleteHotelController(req, res) {

  try {

    const { hotelId } = req.params;

    // CHECK HOTEL EXISTS
    const hotel = await hotelModel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found"
      });
    }

    // DELETE HOTEL
    await hotelModel.findByIdAndDelete(hotelId);

    return res.status(200).json({
      success: true,
      message: "Hotel deleted successfully"
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

async function listingController(req, res) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    const listing = await hotelModel.find({
      createdBy: req.userId,
    });

    return res.status(200).json({
      success: true,
      message: "Listings fetched successfully",
      hotels: listing,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

module.exports={createHotelController,bookingHotelController,
    listingController,getHotelController,deleteHotelController}
