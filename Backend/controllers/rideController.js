const rideService = require("../services/rideService");
const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/rideModel");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination, vehicleType } = req.body;
  try {
    const ride = await rideService.createride({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    res.status(201).json({ ride });

    const pickupCordinates = await mapService.getAddressCoordinates(pickup);

    const captainsInRadius = await mapService.getCaptainsInTheRadius(
      pickupCordinates.ltd,
      pickupCordinates.lng,
      2
    );

    const rideWithUser = await rideModel
      .findOne({
        _id: ride._id,
      })
      .populate("user");
    ride.otp = "";
    captainsInRadius.map((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination } = req.query;

  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json({ fare });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId } = req.body;

  try {
    const ride = await rideService.confirmRide(rideId, req.captain._id);
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });
    res.status(200).json({ ride });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId, otp } = req.query;

  try {
    const ride = await rideService.startRide({
      rideId,
      otp,
      captain: req.captain,
    });
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });

    return res.status(200).json({ ride });
  } catch (error) {
    console.log("message", error.message);
    return res.status(400).json({ message: error.message });
  }
};

module.exports.endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId } = req.body;
  try {
    const ride = await rideService.endRide({ rideId, captain: req.captain });
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-ended",
      data: ride,
    });
    return res.status(200).json({ ride });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
