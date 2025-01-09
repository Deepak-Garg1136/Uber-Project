const mongoose = require("mongoose");

function connectToDb() {
  const uri = process.env.DB_CONNECT;
  mongoose
    .connect(uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));
}

module.exports = connectToDb;
