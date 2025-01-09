const express = require("express");
const router = express.Router();
const captainController = require("../controllers/captainControllers");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color name must be at least 3 characters long"),
    body("vehicle.plate")
      .isLength({ min: 4, max: 13 })
      .withMessage(
        "Plate number must be between 4 and 13 characters long and contain only letters and numbers"
      ),
    body("vehicle.capacity")
      .isLength({ min: 1 })
      .withMessage("Vehicle capacity must be at least 1 passenger"),
    body("vehicle.vehicleType")
      .isIn(["car", "auto", "bike"])
      .withMessage("Vehicle type must be either 'car', 'auto', or 'bike'"),
  ],
  captainController.registerCaptain
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  captainController.loginCaptain
);

router.get(
  "/profile",
  authMiddleware.authCaptain,
  captainController.captainProfile
);

router.get(
  "/logout",
  authMiddleware.authCaptain,
  captainController.logoutCaptain
);

module.exports = router;
