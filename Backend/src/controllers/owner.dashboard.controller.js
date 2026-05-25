const hotelModel = require("../models/hotel.model");
const bookingModel = require("../models/book.model");

const ownerDashboard = async (req, res) => {

  try {

    const ownerId = req.userId;
    console.log(ownerId)
    // FIND HOTELS CREATED BY OWNER
    const hotels = await hotelModel.find({
      createdBy: ownerId
    });

    const hotelIds = hotels.map(hotel => hotel._id);

    // FIND BOOKINGS RELATED TO OWNER HOTELS
    const bookings = await bookingModel
      .find({
        hotelId: { $in: hotelIds }
      })
      .populate("userId", "username email")
      .populate("hotelId", "title city");

    // TOTAL STATS
    const totalHotels = hotels.length;

    const totalRooms = hotels.reduce((acc, hotel) => {
      return acc + hotel.room;
    }, 0);

    const totalBookings = bookings.length;

    const totalRevenue = bookings.reduce((acc, booking) => {
      return acc + booking.totalPrice;
    }, 0);

    res.status(200).json({
      success: true,

      stats: {
        totalHotels,
        totalRooms,
        totalBookings,
        totalRevenue,
      },

      hotels,
      bookings,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

module.exports = {ownerDashboard};