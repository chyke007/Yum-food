const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { Logger } = require("../utils");
const { DB_URL, DB_OPTIONS, NODE_ENV } = require("../../config");

const log = new Logger("Middleware:Mongo");

let mongo;

if (NODE_ENV === "test") {
  module.exports.setUp = async () => {
    mongo = await MongoMemoryServer.create();
    const url = mongo.getUri();

    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
      });
    } catch (e) {
      log.info("Server running already");
    }
  };
} else {
  module.exports.setUp = async () => {
    try {
      await mongoose.connect(DB_URL, DB_OPTIONS);
    } catch (e) {
      log.info("Server running already");
    }
  };
}

module.exports.dropDatabase = async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  }
};

module.exports.dropCollections = async () => {
  if (mongo) {
    const { collections } = mongoose.connection;
    const results = [];

    Object.keys(collections).forEach((key) => {
      const collection = collections[key];
      results.push(collection.deleteMany());
    });

    await Promise.all(results);
  }
};
