const userModel = require("../models/userModel");
const blackListToken = require("../models/blackListToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const capModel = require("../models/captainModel");
module.exports.authUser = async (req, res, next) => {
  // console.log(req.headers.authorization);

  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  // console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlackListed = await blackListToken.findOne({ token });
  if (isBlackListed) {
    console.log("Blacklisted");

    return res.status(401).json({ message: "Unauthorized" });
  }
  // Verifing the token
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await userModel.findById(decoded._id);
    req.user = user;
    console.log("forwareded");

    return next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlackListed = await blackListToken.findOne({ token });

  if (isBlackListed) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // Verifing the token
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const captain = await capModel.findById(decoded._id);
    req.captain = captain;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
