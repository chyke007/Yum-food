const JwtManager = require("../service/jwt");
const { ErrorMessage, ErrorCodes } = require("../utils");
const { CustomException } = require("../utils");
const config = require("../../config");

const jwt = new JwtManager(config.SECRET);

/**
 * Prevents requests from random sources
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {function} next
 */
module.exports = (req, res, next) => {
  const token = JwtManager.getTokenFromHeaders(req);
  if (!token) {
    return next(
      new CustomException(
        ErrorMessage.NO_TOKEN_FOUND,
        ErrorCodes.NO_TOKEN_FOUND
      )
    );
  }

  const decoded = jwt.verifyToken(token);
  req.user = decoded;
  if (decoded instanceof CustomException) {
    res.status(401);
    return next(decoded);
  }
  return next();
};
