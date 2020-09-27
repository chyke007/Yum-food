const express = require("express");
const path = require("path");

const server = express();
const apiRouter = require("./routes/api");

// Serve static files from the React app
server.use(express.static(path.join(__dirname, "../frontend/build")));

server.use("/api", apiRouter);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});
module.exports = server;
