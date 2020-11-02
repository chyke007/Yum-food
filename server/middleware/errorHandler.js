// const MulterError = require('multer').MulterError
const {
  CustomException,
  ErrorMessage,
  ErrorCodes,
  Logger,
} = require("../utils");

const log = new Logger("Middleware:ErrorHandler");
/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const handleMulter = (err, req, res, next) => {
  switch (err.code) {
    case "LIMIT_FILE_SIZE":
      return res.status(413).json({
        error: new CustomException(
          ErrorMessage.FILE_TOO_LARGE,
          ErrorCodes.FILE_TOO_LARGE
        ),
      });

    case "LIMIT_UNEXPECTED_FILE":
      return res.status(400).json({
        error: new CustomException(
          "An unexpected error occured could not upload this file",
          ErrorCodes.FILE_TOO_LARGE
        ),
      });

    default:
      return res.status(400).json({
        error: new CustomException(
          "An unexpected error occured could not upload this file",
          ErrorCodes.FILE_TOO_LARGE
        ),
      });
  }
};

/**
 * handles sending error responses,
 * you are expected to set the error code on the reponse object
 * @param  {object} err
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {function} next
 * @return {null}
 */
module.exports = (err, req, res, next) => {
  log.info(JSON.stringify(res.statusCode));
  if (res.statusCode < 400) res.status(400);
  if (err instanceof CustomException) return res.json({ error: err });
  if (err.name === "MulterError") {
    return handleMulter(err, req, res, next);
  }
  if (err.error && err.error.message != null) {
    return res.json(err);
  }
  if (err.message) {
    return res.json({ error: { message: err.message, code: err.code } });
  }
  return res.json({
    error: new CustomException(ErrorMessage.UNKNOWN, ErrorCodes.UNKNOWN),
  });
};
