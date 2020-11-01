const multer = require("multer");
const { uid } = require("uid");
const del = require("del");
const fs = require("fs-extra");
const path = require("path");
const config = require("../../config");
const { Logger, CustomException } = require("../utils");

const tempDir = "/tmp";
const log = new Logger("Service:fileManager");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, tempDir);
  },
  filename(req, file, cb) {
    cb(null, uid(15));
  },
});

const uploader = multer({
  storage,
  // file limit is 1mb
  limits: { fileSize: 1024 * 1024 },

  fileFilter(req, file, cb) {
    // console.log(req,)
    if (!file.originalname.match(/\.(gif|jpe?g|tiff|png|webp|bmp)$/i)) {
      return cb(new CustomException("file must be an image"));
    }
    return cb(null, true);
  },
});

/**
 * upload a single file to the server and save to temp directory
 */
exports.upload = uploader.single("image");
exports.any = uploader.any();

/* eslint-disable */
/**
 * deletes a file given the file path
 * @param  {string} file - the file path to delete
 */
exports.deleteFile = async function (file) {
  log.info(file);
  if (file != null && file !== "") {
    const f = path.join(config.STORAGE, file);
    if (f == config.STORAGE) return null;
    const deletedPaths = await del([f], { force: true });
    log.info(`${f} file deleted succesfully ${deletedPaths}`);
  }
};

/**
 * folder to save the file
 * @param  {string} folder
 * @param  {File} file
 */
exports.saveFile = async function (folder = Storage.PRODUCT, file) {
  if (!file) return null;
  const { originalname, filename } = file;
  const extension = path.extname(originalname);
  const name = `${filename}${extension}`;
  const storagePath = path.join(config.STORAGE, folder, name);
  return await new Promise((resolve) => {
    fs.move(file.path, storagePath, (err) => {
      if (err) {
        return resolve(
          new CustomException(
            "An unexpected error occured could not upload this file"
          )
        );
      }

      const imageUrl = `/upload/${folder}/${name}`;
      log.info({ imageUrl, storagePath });
      resolve(imageUrl);
    });
  });
};
