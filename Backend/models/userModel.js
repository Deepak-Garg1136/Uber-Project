const { model } = require("mongoose");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters long"],
      maxlength: [50, "First name must be at most 50 characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "First name must be at least 3 characters long"],
      maxlength: [50, "First name must not exceed 50 characters."],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"],
    select: false, // This will bot provide the password implicitly while finding something from the database
  },
  // INFO - We will use it for live tracking of drivers
  socketId: {
    type: String,
  },
});

userSchema.methods.generateToken = (user) => {
  const payload = {
    _id: user._id,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" });
  return token;
};

// Hash the password before saving it to the database

// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   }
//   next();
// });

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};
// Add a method to compare the entered password with the hashed one

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Add a method to update the user's socketId
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
