const express = require("express");
const app = express();
const socket = require("socket.io");
const color = require("colors");
const cors = require("cors");
const path = require("path");
const fs = require("fs").promises;
app.use(express());

const port = process.env.PORT ?? 8000;
const logsPath = path.resolve(__dirname, "data", "logs.txt");

app.use(cors());

var server = app.listen(
  port,
  console.log(`Server is running on the port no: ${port} `.green)
);

app.get("/", async function (req, res) {
  const data = await fs.readFile(logsPath, "utf-8");
  const logs = data.split("\r\n").filter((i) => !!i);
  res.json(logs);
});

const io = socket(server);

io.on("connection", (socket) => {
  console.log("user is connected ip", socket.id);
  socket.on("sendData", (message) => {
    io.emit("message", message);
    message = JSON.stringify(message);
    fs.appendFile(logsPath, `${message}\r\n`);
  });
  socket.on("focuses", (userName) => {
    socket.broadcast.emit("disableInput", userName);
  });
  socket.on("blur", () => {
    io.emit("enableInput");
  });
  socket.on("disconnect", () => {
    console.log("user is disconnected ip", socket.id);
    io.emit("enableInput");
  });
});

// ========================================

// const express = require("express");
// const app = express();
// const http = require("http");
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

// app.get("/", (req, res) => {
//   res.send("hello world");
// });

// io.on("connection", (socket) => {
//   socket.on("chat message", (msg) => {
//     console.log("backend", msg);
//     io.emit("chat message", msg + " world");
//   });
// });

// server.listen(5000, () => {
//   console.log("listening on *:5000");
// });
// ========================================
// Node.js WebSocket server script

// const http = require("http");
// const express = require("express");
// const app = express();
// const server = http.createServer(app);
// const WebSocket = require("ws");

// const wss = new WebSocket.Server({ server });

// wss.on("connection", function connection(ws) {
//   console.log("new client connected");
//   ws.send("welcome");
//   ws.on("message", function incoming(message) {
//     console.log("message", message);
//     ws.send("message back " + message);
//   });
// });

// app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

// server.listen(3000, () => console.log("port run:3000"));
