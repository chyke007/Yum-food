const express = require("express");
const path = require("path");

const server = express();
const apiRouter = require("./routes/api");
const { Mongo, App } = require("./middleware");

// connect to mongo
Mongo();

// setup global middleware
App(server);

// api router
server.use("/api", apiRouter);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});
module.exports = server;
