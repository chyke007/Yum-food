const mongoose = require("mongoose");
const { Logger } = require("../utils");
const config = require("../../config");

const log = new Logger("Middleware:Mongo");

module.exports = () => {
  log.info(config.DB_URL);
  log.info(config.DB_OPTIONS);
  log.info("connecting to mongo...");
  const connectWithRetry = () =>
    mongoose.connect(config.DB_URL, config.DB_OPTIONS);

  mongoose.connection.on("error", () => {
    connectWithRetry();
    log.warning("Could not connect to MongoDB");
  });

  mongoose.connection.on("disconnected", () => {
    log.warning("Lost MongoDB connection...");
    log.warning("Lost MongoDB connection...");
    connectWithRetry();
  });

  mongoose.connection.on("connected", () =>
    log.info("Connection established to MongoDB")
  );

  mongoose.connection.on("reconnected", () =>
    log.info("Reconnected to MongoDB")
  );

  connectWithRetry();
};
