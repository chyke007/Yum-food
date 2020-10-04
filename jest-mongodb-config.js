module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: "3.4.0",
      skipMD5: true,
    },
    instance: {
      dbName: "jest",
    },
    autoStart: false,
  },
};
