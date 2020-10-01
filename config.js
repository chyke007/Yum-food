exports.SECRET = process.env.SECRET;
exports.URL = process.env.URL;

// DB Config
exports.DB_URL = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
exports.DB_OPTIONS = {
  // ssl: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  autoIndex: false,
  auto_reconnect: true,
  auth: { authSource: "admin" },
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  // reconnectTries: 10,
  // reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 50,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};
exports.API_KEY = process.env.API_KEY;
exports.STORAGE = ".../../frontend/build";
