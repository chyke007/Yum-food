const Cloudinary = require("./cloudinary");

exports.cloudinary = Cloudinary.upload.single("image");
exports.deleteCloud = Cloudinary.deleteFile;
