const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const app = express();
const PORT = 5000;
// ========================================
app.use(express());
app.use(cors());
// ========================================Server run
const server = app.listen(
  PORT,
  console.log(`Server is running on the port no: ${PORT} `)
);
// ========================================SOCKET
const io = socket(server);
io.on("connection", (socket) => {
  console.log(`user is connected ip ${socket.id}`);
  socket.on("activeElement", () => {
    socket.broadcast.emit("disableElement");
  });
  socket.on("passiveElement", () => {
    socket.broadcast.emit("enableElement");
  });
  socket.on("disconnect", () => {
    console.log(`user is disconnected ip ${socket.id}`);
    socket.broadcast.emit("enableElement");
  });
});
// ========================================
