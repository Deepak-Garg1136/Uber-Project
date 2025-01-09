const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const captainSchema = mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [2, "First name must be at least 2 characters long."],
      maxlength: [50, "First name must not exceed 50 characters."],
    },
    lastname: {
      type: String,
      minlength: [2, "Last name must be at least 2 characters long."],
      maxlength: [50, "Last name must not exceed 50 characters."],
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address.",
    ],
  },

  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long."],
    select: false, // Don't return password in response
  },

  socketId: {
    type: String,
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },

  vehicle: {
    color: {
      type: String,
      required: true,
    },

    plate: {
      type: String,
      required: true,
      unique: true,
      minlength: [4, "Plate must be at least 4 characters long."],
      maxlength: [13, "Plate must not exceed 13 characters."],
      // match: [/^[A-Z]{2}-\d{3}-\d{3}$/, "Please enter a valid plate number in the format 'AB-123-456'."]
    },

    capacity: {
      type: Number,
      required: true,
      min: [1, "Vehicle capacity must be at least 1 passenger."],
    },

    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "auto", "bike"],
    },
  },

  location: {
    lng: {
      type: Number,
    },
    lat: {
      type: Number,
    },
  },
});

captainSchema.methods.generateToken = function (user) {
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
  return token;
};

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const capModel = mongoose.model("Captain", captainSchema);
module.exports = capModel;
