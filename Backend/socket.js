const { Server } = require("socket.io");
const userModel = require("./models/userModel");
const captainModel = require("./models/captainModel");
let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      console.log(`User ${userId} joined as ${userType}`);

      if (userType === "user") {
        const user = await userModel.findById(userId);
        user.socketId = socket.id;
        await user.save();
      } else if (userType === "captain") {
        const captain = await captainModel.findById(userId);
        captain.socketId = socket.id;
        await captain.save();
      }
    });
    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;
      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", "Invalid location data");
      }
      const captain = await captainModel.findById(userId);
      captain.location.ltd = location.ltd;
      captain.location.lng = location.lng;
      await captain.save();
    });
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};

const sendMessageToSocketId = (socketId, message) => {
  console.log(message);

  if (io) {
    io.to(socketId).emit(message.event, message.data);
  } else {
    console.error("Socket.io is not initialized");
  }
};

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
