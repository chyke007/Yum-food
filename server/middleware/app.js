const Express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const config = require("../../config");
// const { Logger } = require("../utils");
// const log = new Logger("Middleware:App");
/**
 * @param  {Express.Application} server
 */
module.exports = (server) => {
  // var gracefulExit = function () {
  //   mongoose.connection.close(function () {
  //     log(
  //       "Mongoose default connection with DB :" +
  //         db_server +
  //         " is disconnected through app termination"
  //     );
  //     process.exit(0);
  //   });
  // };

  // If the Node process ends, close the Mongoose connection
  // process.on("SIGINT", gracefulExit).on("SIGTERM", gracefulExit);

  server.use(logger("dev"));
  server.use(Express.json());
  server.use(Express.urlencoded({ extended: false }));
  server.use("/upload", Express.static(path.join(__dirname, config.STORAGE)));
  server.use(Express.static(path.join(__dirname, "../../frontend/build")));
  server.use(cors());
};
