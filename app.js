const express = require('express');
let app = express();
let http = require("http").createServer(app);
let io = require("socket.io")(http);
const chalk = require("chalk");
const serverPort = 3000;

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/app.html");
});

io.on("connection", (socket) => {
  socket.broadcast.emit("joined", "");

  socket.on("disconnect", () => {
    socket.broadcast.emit("disconnected", "");
  });

  socket.on("new message", (msg) => {
    io.emit("new message", msg);
  });
});

http.listen(serverPort, () => {
  console.log(chalk.green(`\nServer is running on port ${serverPort}\n`));
});
