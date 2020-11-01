// eslint-disable-next-line no-unused-vars
const Express = require("express");
const { CustomException, ErrorMessage, ErrorCodes } = require("../utils/index");
const {
  Constants: { ADMIN },
} = require("../utils");
/**
 * Prevents requests from USER, allows only ADMIN
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {function} next
 */
module.exports = (req, res, next) => {
  const {
    user: { accountType },
  } = req;
  if (accountType && accountType === ADMIN) next();
  else {
    res.status(403);
    next(
      new CustomException(ErrorMessage.NO_PRIVILEGE, ErrorCodes.NO_PRIVILEGE)
    );
  }
};
