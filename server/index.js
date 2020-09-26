const express = require("express");

const server = express();
const apiRouter = require("./routes/api");

server.use("/api", apiRouter);

module.exports = server;
