const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// On connection
io.on("connection", (socket) => {
  console.log("🔌 A user connected");

  socket.on("disconnect", () => {
    console.log("❌ A user disconnected");
  });

  socket.on("sendSwap", (data) => {
    io.emit("newSwap", data); // Broadcast to all users
  });
});

server.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
