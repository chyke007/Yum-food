const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { uid } = require("uid");
const config = require("../../config");
const {
  Storage: { PRODUCT },
  CustomException,
  Logger,
} = require("../utils");

const log = new Logger("Service:cloudinary");

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

const tempDir = "/tmp";

const testStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, tempDir);
  },
  filename(req, file, cb) {
    cb(null, uid(15));
  },
});

let storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: PRODUCT,
    transformation: [{ crop: "scale" }],
  },
});

if (config.NODE_ENV === "test") storage = testStorage;
const upload = multer({
  storage,

  // file limit is 1mb
  limits: { fileSize: 1024 * 1024 },

  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(gif|jpe?g|png)$/i)) {
      return cb(new CustomException("file must be an image"));
    }
    return cb(null, true);
  },
});

const deleteFile = async (params) => {
  try {
    return await cloudinary.uploader.destroy(params, (error, result) => {
      if (error) return log.info(`An error occured: ${JSON.stringify(result)}`);
      return log.info(`File deleted succesfully ${JSON.stringify(result)}`);
    });
  } catch (err) {
    return log.info(`ERROR in file Deleting : ${JSON.stringify(err)}`);
  }
};

module.exports = {
  upload,
  deleteFile,
};
