const express = require("express");
const mapController = require("../controllers/mapController");
const router = express.Router();
const { query } = require("express-validator");
const authmiddleware = require("../middlewares/authMiddleware");
const { getCoordinates } = require("../services/maps.service");

router.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authmiddleware.authUser,
  mapController.getCoordinates
);

router.get(
  "/get-distance-time",
  [
    query("origin").isString().isLength({ min: 3 }),
    query("destination").isString().isLength({ min: 3 }),
  ],
  authmiddleware.authUser,
  mapController.getDistanceTime
);

router.get(
  "/get-suggestions",
  query("input").isString().isLength({ min: 1 }),
  authmiddleware.authUser,
  mapController.getSuggestions
);
module.exports = router;
