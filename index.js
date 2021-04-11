const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  socket.emit("welcome-message", "Welcome to the chat app");

  socket.on("join-room", (user) => {
    socket.broadcast.emit("join-message", `${user} joined the chat room`);
  });

  socket.on("disconnect", () => {
    io.emit("join-message", "A user left the chat room");
  });

  socket.on("client-message", (item) => {
    io.emit("message", item);
  });
});
const port = 5000 || process.env.PORT;
server.listen(port, () => console.log(`App is listining on port ${port}`));
