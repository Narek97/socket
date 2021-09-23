const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const app = express();
const PORT = 5000;
const {
  joinUser,
  userDisconnect,
  getCurrentUser,
  joinActiveUser,
  getActiveUser,
  removeActiveUser,
} = require("./dummyuser");

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

//initializing the socket io connection
io.on("connection", (socket) => {
  console.log(`user connect ${socket.id}`);
  socket.on("joinRoom", ({ lockOwner, topicName }) => {
    const user = joinUser(socket.id, lockOwner, topicName);
    socket.join(user.topicName);
    console.log(`user join in room ${user.topicName}`);
    let active = getActiveUser(topicName);
    if (active) {
      socket.emit("disableElement");
    }
  });

  socket.on("activeElement", ({ lockOwner, topicName }) => {
    const user = getCurrentUser(lockOwner);
    joinActiveUser(socket.id, lockOwner, topicName);
    socket.broadcast.to(user.topicName).emit("disableElement");
  });

  socket.on("passiveElement", ({ lockOwner, topicName }) => {
    const user = getCurrentUser(lockOwner);
    removeActiveUser(lockOwner);
    socket.broadcast.to(user.topicName).emit("enableElement");
  });

  socket.on("disconnect", () => {
    userDisconnect(socket.id);
    const user = removeActiveUser(socket.id);
    if (user) {
      io.to(user.topicName).emit("enableElement");
    }
  });
});

// ========================================
