const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const captainRoutes = require("./routes/captainRoutes");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

const connectToDb = require("./db/db");
connectToDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware to parse cookies
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.get("/", (req, res) => {
  res.send("Hello world");
});

module.exports = app;
