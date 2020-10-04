// eslint-disable-next-line no-unused-vars
const Express = require("express");
const { CustomException, ErrorCodes, ErrorMessage } = require("../utils");

/**
 * Handles sending message incase of a 404
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {function} next
 */
module.exports = (req, res, next) => {
  res.status(404);
  next(new CustomException(ErrorMessage.NOT_FOUND, ErrorCodes.NOT_FOUND));
};
