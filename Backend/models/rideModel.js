const mongoose = require("mongoose");

const rideSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },

  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Captain",
  },

  pickup: {
    type: String,
    required: true,
  },

  destination: {
    type: String,
    required: true,
  },

  fare: {
    type: Number,
    required: true,
  },

  otp: {
    type: String,
    select: false,
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "ongoing", "completed"],
    default: "pending",
  },

  duration: {
    type: Number,
  },

  distance: {
    type: Number,
  },

  paymentId: {
    type: String,
  },

  orderId: {
    type: String,
  },

  signature: {
    type: String,
  },
});

const rideModel = mongoose.model("ride", rideSchema);
module.exports = rideModel;
