const ErrorCodes = require("./errorCodes");
const ErrorMessage = require("./errorMessage");
const CustomException = require("./customException");
const Logger = require("./logger");
const Validator = require("./validator");

const log = new Logger("utils:helper");

/**
 * @param  {User} user
 * @param  {string} token
 * @return {object}
 */
function formatUser(user, token) {
  if (user && token) {
    const u = user.toJSON();
    u.token = token;
    delete u.salt;
    delete u.hash;
    log.info(`user: ${JSON.stringify(u)}`);
    return u;
  }
  return null;
}

/**
 * @param  {User} user
 * @param  {string} token
 * @return {object}
 */
function tokenPayload(user) {
  return {
    email: user.email || null,
    id: user.id || null,
    accountType: user.accountType || null,
  };
}

/**
 * @param  {[string]} scope
 * @param  {object} body
 * @param  {Express.Response} res
 * @param  {function(err, result)} done
 * @return {function(err, result)}
 */
function validateBody(scope, body, res, done) {
  const { email, password, name, phone } = body;
  if (scope.includes("email")) {
    if (!(email && Validator.email(email))) {
      log.info("invalid email");
      res.status(422);
      if (done) {
        done(
          new CustomException(
            ErrorMessage.INVALID_EMAIL,
            ErrorCodes.INVALID_EMAIL
          )
        );
      }
      return false;
    }
  }
  if (scope.includes("password")) {
    if (!(password && Validator.password(password))) {
      log.info("invalid password");
      res.status(422);
      if (done) {
        done(
          new CustomException(
            ErrorMessage.INVALID_PASSWORD,
            ErrorCodes.INVALID_PASSWORD
          )
        );
      }
      return false;
    }
  }

  if (scope.includes("name")) {
    if (!(name && Validator.name(name))) {
      log.info("invalid name");
      res.status(422);
      if (done) {
        done(
          new CustomException(
            ErrorMessage.INVALID_NAME,
            ErrorCodes.INVALID_NAME
          )
        );
      }
      return false;
    }
  }

  if (scope.includes("phone")) {
    if (!(phone && Validator.phone(phone))) {
      log.info("invalid phone number");
      res.status(422);
      if (done) {
        done(
          new CustomException(
            ErrorMessage.INVALID_PHONE,
            ErrorCodes.INVALID_PHONE
          )
        );
      }
      return false;
    }
  }
  return true;
}

module.exports = { formatUser, tokenPayload, validateBody };
