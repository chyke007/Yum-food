const mongoose = require("mongoose");
const { Logger } = require("../utils");
const { DB_NAME, DB_URL, DB_OPTIONS } = require("../../config");

const log = new Logger("Middleware:Mongo");

module.exports = () => {
  log.info(DB_URL);
  log.info(DB_OPTIONS);
  log.info("connecting to mongo...");
  const connectWithRetry = () => {
    mongoose.connect(DB_URL, DB_OPTIONS);
  };
  mongoose.connection.on("error", () => {
    connectWithRetry();
    log.warning("Could not connect to MongoDB");
  });

  mongoose.connection.on("disconnected", () => {
    log.warning("Lost MongoDB connection...");
    log.warning("Lost MongoDB connection...");
    if (DB_NAME !== "test") connectWithRetry();
  });

  mongoose.connection.on("connected", async () => {
    log.info("Connection established to MongoDB");
  });

  mongoose.connection.on("reconnected", () =>
    log.info("Reconnected to MongoDB")
  );

  connectWithRetry();
};
