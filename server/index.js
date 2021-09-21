const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const app = express();
const PORT = 5000;
const { user_Disconnect, join_User, getUserId } = require("./dummyuser");

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
  let userId = getUserId();
  if (userId) {
    socket.emit("disableElement");
  }
  socket.on("activeElement", () => {
    join_User(socket.id);
    socket.broadcast.emit("disableElement");
  });
  socket.on("passiveElement", () => {
    user_Disconnect();
    socket.broadcast.emit("enableElement");
  });
  socket.on("disconnect", () => {
    let userId = getUserId();
    console.log(`user is disconnected ip ${socket.id}`);
    console.log(socket.id === userId);
    if (socket.id === userId) {
      user_Disconnect();
      io.emit("enableElement");
    }
  });
});
// ========================================
