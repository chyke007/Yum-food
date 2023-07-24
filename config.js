exports.SECRET = process.env.SECRET || "secret";
exports.URL = process.env.URL;

// DB Config
exports.DB_URL = `mongodb${process.env.DB_EXTENSION}${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
exports.DB_OPTIONS = {
  // ssl: true,
  useNewUrlParser: true,
  useUnifiedTopology: false,
  useCreateIndex: true,
  useFindAndModify: false,
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
exports.DB_NAME = process.env.DB_NAME;
exports.API_KEY = process.env.API_KEY || "key";
exports.NODE_ENV = process.env.NODE_ENV;

// Cloudinary
exports.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
exports.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
exports.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
