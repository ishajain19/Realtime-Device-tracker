
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("send-location", (data) => {
    console.log("Location received:", data);
    // You can broadcast this to other clients if needed
  });
});

server.listen(8010, () => {
  console.log("Server running on http://localhost:8010");
});

