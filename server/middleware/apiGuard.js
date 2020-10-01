// eslint-disable-next-line no-unused-vars
const Express = require("express");
const { Exception, ErrorMessage, ErrorCodes } = require("../utils/index");
const { API_KEY } = require("../../config");

/**
 * Prevents requests from random sources
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {function} next
 */
module.exports = (req, res, next) => {
  const {
    headers: { apikey },
  } = req;
  if (apikey && apikey === API_KEY) next();
  else {
    res.status(401);
    next(new Exception(ErrorMessage.UNAUTHORIZED, ErrorCodes.UNAUTHORIZED_KEY));
  }
};
