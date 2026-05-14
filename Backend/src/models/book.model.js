const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

  // USER WHO BOOKED
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  // HOTEL BOOKED
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hotel",
    required: true,
  },

  // CHECK-IN DATE
  checkIn: {
    type: Date,
    required: true,
  },

  // CHECK-OUT DATE
  checkOut: {
    type: Date,
    required: true,
  },

  // TOTAL PRICE
  totalPrice: {
    type: Number,
    required: true,
  },

  // ROOMS BOOKED
  selectedRooms: {
    type: Number,
    required: true,
    min: 1,
  },

  // TOTAL GUESTS
  guests: {
    type: Number,
    default: 1,
  },

  // BOOKING STATUS
  bookingStatus: {
    type: String,

    enum: [
      "pending",
      "confirmed",
      "cancelled",
      "completed",
    ],

    default: "confirmed",
  },

  // SPECIAL REQUESTS
  specialRequests: {
    type: String,
    default: "",
  },

  // PRICE SNAPSHOT
  pricePerNight: {
    type: Number,
  },

  // TOTAL NIGHTS
  totalNights: {
    type: Number,
  },

}, {
  timestamps: true,
});

bookingSchema.index({ userId: 1 });

bookingSchema.index({ hotelId: 1 });

const bookingModel = mongoose.model(
  "book",
  bookingSchema
);

module.exports = bookingModel;