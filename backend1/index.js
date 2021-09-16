const express = require("express");
let bodyParser = require("body-parser");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io-client");
const socket = io.connect("http://localhost:5000", { reconnect: true });

let jsonParser = bodyParser.json();
app.post("/", jsonParser, function (req, res) {
  console.log("CHECK", req.body);
  socket.emit("chat message", req.body.text);

  socket.on("chat message", function (msg) {
    console.log("CHECK msg", msg);
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
