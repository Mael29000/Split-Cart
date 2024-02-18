require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const winston = require("winston");

const app = express();
const port = process.env.SERVER_PORT || 3001;
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors()); // Apply CORS middleware here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./start/db")();
require("./start/routes")(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((err, req, res, next) => {
  winston.error(err.message, err);
  res.status(500).send("Something failed.");
});

io.on("connection", (socket) => {
  winston.info("a user connected");
  socket.on("disconnect", () => {
    winston.info("user disconnected");
  });
});

server.listen(port, () => {
  winston.info(`Server is running at http://localhost:${port}`);
});

module.exports = io;
