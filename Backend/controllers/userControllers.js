const userService = require("../services/userService");
const userModel = require("../models/userModel");
const { validationResult } = require("express-validator");
const blackListToken = require("../models/blackListToken");
module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password } = req.body;

  // Check if user with the same email already exists
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      errors:
        "An account with this email already exists. Please try logging in.",
    });
  }

  const hashPassword = await userModel.hashPassword(password);

  const user = await userService.createUser(
    fullname.firstname,
    fullname.lastname,
    email,
    hashPassword
  );
  const token = user.generateToken(user);
  console.log(token);
  res.status(201).json({ token, user });
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = user.generateToken(user);
  // Setting cookie in the response
  res.cookie("token", token);
  return res.status(200).json({ token, user });
};

module.exports.getUserProfile = (req, res, next) => {
  // const user = req.user;
  // console.log(user);

  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  // NOTE :- We are storing token to the blacklist table/collection while logging out because if somehow user have the token in the localhost or else even after logged out, so he will not able to access the resources till it log in again. In the authMiddler we aftre getting token we first do a check that wheather the token is blacklisted or not, if it is blacklisted that means user had logged out with that token and not allowed to access the resources with that token.
  console.log("blacklisting");

  await blackListToken.create({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};
