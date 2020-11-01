const Express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
/**
 * @param  {Express.Application} server
 */
module.exports = (server) => {
  server.use(logger("dev"));
  server.use(Express.json());
  server.use(Express.urlencoded({ extended: false }));
  server.use(Express.static(path.join(__dirname, "../../frontend/build")));
  server.use(cors());
};
