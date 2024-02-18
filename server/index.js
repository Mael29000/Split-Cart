require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const winston = require("winston");
const setupWebSocketServer = require('./routes/websocket');

const app = express();
const port = process.env.SERVER_PORT || 3001;
const server = http.createServer(app);

setupWebSocketServer(server);

require("./start/db")();
require("./start/routes")(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((err, req, res, next) => {
  winston.error(err.message, err);
  res.status(500).send("Something failed.");
});

server.listen(port, () => {
  winston.info(`Server is running at http://localhost:${port}`);
});
