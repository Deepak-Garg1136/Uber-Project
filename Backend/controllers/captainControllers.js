const blackListToken = require("../models/blackListToken");
const capModel = require("../models/captainModel");
const captainService = require("../services/captainService");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  const existingCaptain = await capModel.findOne({ email });

  if (existingCaptain) {
    return res.status(400).json({
      message:
        "An account with this email already exists. Please try logging in.",
    });
  }

  const hashesPassword = await capModel.hashPassword(password);

  try {
    const captain = await captainService.createCaptain(
      fullname.firstname,
      fullname.lastname,
      email,
      hashesPassword,
      vehicle.color,
      vehicle.plate,
      vehicle.capacity,
      vehicle.vehicleType
    );
    // const token = await captain.generateToken(captain);
    res.status(201).json({ captain });
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: "All fields are required" });
  }
};

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const captain = await capModel.findOne({ email }).select("+password");

  if (!captain) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = captain.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = await captain.generateToken(captain);
  res.cookie("token", token);
  res.status(200).json({ token, captain });
};

module.exports.captainProfile = (req, res, next) => {
  return res.status(200).json(req.captain);
};

module.exports.logoutCaptain = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  res.clearCookie("token");
  await blackListToken.create({ token });
  res.json({ message: "Logged out successfully" });
};
