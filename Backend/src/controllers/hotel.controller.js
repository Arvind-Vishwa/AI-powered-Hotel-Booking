const hotelModel=require("../models/hotel.model")
const bookingModel=require("../models/book.model")
const {uploadFile}=require('../services/imageKit.service')


async function createHotelController(req, res) {

  try {

    console.log("Create Hotel API");

    const {
      title,
      description,
      price,
      city,
      room,

      // NEW FIELDS
      address,
      rating,
      maxGuests,
      hotelType,

      amenities,
      tags,
      nearbyPlaces,
      policies,

      checkInTime,
      checkOutTime,

      featured

    } = req.body;

    // BASIC VALIDATION
    if (
      !title ||
      !description ||
      !price ||
      !city ||
      !room
    ) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    // IMAGE VALIDATION
    if (!req.file) {
      return res.status(400).json({
        message: "Hotel image required",
      });
    }

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    // IMAGE UPLOAD
    let result;

    try {

      result = await uploadFile(
        req.file.buffer.toString("base64")
      );

      console.log("UPLOAD RESULT:", result);

    } catch (uploadErr) {

      console.error(uploadErr);

      return res.status(500).json({
        message: "Image upload failed",
      });
    }

    // CONVERT STRING ARRAYS
    // because frontend may send:
    // "wifi,pool,breakfast"

    const amenitiesArray = amenities
      ? amenities.split(",").map(item =>
          item.trim().toLowerCase()
        )
      : [];

    const tagsArray = tags
      ? tags.split(",").map(item =>
          item.trim().toLowerCase()
        )
      : [];

    const nearbyPlacesArray = nearbyPlaces
      ? nearbyPlaces.split(",").map(item =>
          item.trim().toLowerCase()
        )
      : [];

    const policiesArray = policies
      ? policies.split(",").map(item =>
          item.trim().toLowerCase()
        )
      : [];

    // CREATE HOTEL
    const hotel = await hotelModel.create({

      title,

      description,

      city: city.toLowerCase(),

      address,

      price: Number(price),

      rating: Number(rating) || 0,

      room: Number(room),

      maxGuests: Number(maxGuests) || 2,

      hotelType,

      amenities: amenitiesArray,

      tags: tagsArray,

      nearbyPlaces: nearbyPlacesArray,

      policies: policiesArray,

      checkInTime,

      checkOutTime,

      featured: featured || false,

      createdBy: req.userId,

      img: result.url,

    });

    return res.status(201).json({

      message: "Hotel created successfully",

      hotel,

    });

  } catch (err) {

    console.error("Create Hotel Error:", err);

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
      selectedRooms,
      guests,
      specialRequests,
    } = req.body;

    const { hotelId } = req.params;

    // VALIDATION
    if (
      !checkIn ||
      !checkOut ||
      !selectedRooms
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    // FIND HOTEL
    const hotel = await hotelModel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    // DATE VALIDATION
    const checkInDate = new Date(checkIn);

    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {

      return res.status(400).json({
        success: false,
        message:
          "Check-out must be after check-in",
      });
    }

    // TOTAL NIGHTS
    const totalNights = Math.ceil(
      (
        checkOutDate - checkInDate
      ) /
      (1000 * 60 * 60 * 24)
    );

    // ROOM VALIDATION
    if (
      Number(selectedRooms) > hotel.room
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Requested rooms not available",
      });
    }

    // TOTAL PRICE
    const totalPrice =
      hotel.price *
      totalNights *
      Number(selectedRooms);

    // CREATE BOOKING
    const bookingHotel =
      await bookingModel.create({

        userId: req.userId,

        hotelId,

        checkIn: checkInDate,

        checkOut: checkOutDate,

        selectedRooms:
          Number(selectedRooms),

        guests:
          Number(guests) || 1,

        specialRequests:
          specialRequests || "",

        totalPrice,

        totalNights,

        pricePerNight:
          hotel.price,

        bookingStatus:
          "confirmed",

      });

    // OPTIONAL:
    // reduce room count temporarily

    hotel.room =
      hotel.room -
      Number(selectedRooms);

    await hotel.save();

    // RESPONSE
    res.status(201).json({

      success: true,

      message:
        "Hotel booked successfully",

      booking: bookingHotel,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message:
        error.message ||
        "Server Error",

    });
  }
}

async function getHotelController(req, res) {

  try {

    const hotels = await hotelModel
      .find()
      .sort({ createdAt: -1 });

    res.status(200).json({

      success: true,

      message: "Hotels fetched successfully",

      totalHotels: hotels.length,

      hotels,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message:
        error.message ||
        "Server Error",

    });
  }
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
