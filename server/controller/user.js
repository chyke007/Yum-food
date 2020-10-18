// eslint-disable-next-line no-unused-vars
const Express = require("express");
const { User } = require("../model");
const {
  Helper: { formatUser, tokenPayload, validateBody },
  Logger,
  ErrorCodes,
  ErrorMessage,
  CustomException,
} = require("../utils");
let { Jwt } = require("../service");

Jwt = new Jwt(process.env.SECRET);
const log = new Logger("Controller:User");

/* eslint func-names: ["error", "never"] */
/**
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {function} next
 */
const register = async function (req, res, next) {
  const { body } = req;
  log.info("register ", body);
  if (!("email" in body) || !("password" in body) || !("name" in body)) {
    res.status(422);
    return next(
      new CustomException(
        ErrorMessage.REQUIRED_EMAIL_PASSWORD,
        ErrorCodes.REQUIRED_EMAIL_PASSWORD
      )
    );
  }

  const isValid = validateBody(
    ["email", "password", "name", "phone"],
    body,
    res,
    next
  );
  if (!isValid) return false;
  const { email, password, name, phone } = body;
  let user = await User.findOne({ email });
  if (user) {
    res.status(422);
    return next(
      new CustomException(
        // eslint-disable-next-line new-cap
        ErrorMessage.EMAIL_IN_USE(email),
        ErrorCodes.EMAIL_IN_USE
      )
    );
  }

  user = new User({
    email,
    name,
    phone,
  });
  user.setPassword(password);
  await user.save();

  const token = Jwt.signToken(tokenPayload(user));
  const data = formatUser(user, token);
  return res.json({ data });
};

/**
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {function} next
 */
const login = async (req, res, next) => {
  const { body } = req;
  log.info("login ", body);

  if (!("email" in body) || !("password" in body)) {
    res.status(422);
    return next(
      new CustomException(
        ErrorMessage.REQUIRED_EMAIL_PASSWORD,
        ErrorCodes.REQUIRED_EMAIL_PASSWORD
      )
    );
  }

  const isValid = validateBody(["email", "password"], body, res, next);
  if (!isValid) return false;

  log.info("passed validation");
  const { email, password } = body;

  User.findOne({ email })
    .then((user) => {
      log.info(!(user && user.email));
      if (!(user != null && user.email != null)) {
        return next(
          new CustomException(
            ErrorMessage.ACCOUNT_NOT_FOUND,
            ErrorCodes.ACCOUNT_NOT_FOUND
          )
        );
      }
      if (!user.validatePassword(password)) {
        return next(
          new CustomException(
            ErrorMessage.INCORRECT_PASSWORD,
            ErrorCodes.INCORRECT_PASSWORD
          )
        );
      }

      if (!user.isActive) {
        return next(
          new CustomException(
            ErrorMessage.ACCOUNT_DEACTIVATED,
            ErrorCodes.ACCOUNT_DEACTIVATED
          )
        );
      }
      const token = Jwt.signToken(tokenPayload(user));
      const data = formatUser(user, token);
      return res.json({ data });
      // log that an account was created login was succesful
    })
    .catch((err) => {
      log.info(`error ${err}`);
      return next(
        new CustomException(ErrorMessage.UNKNOWN, ErrorCodes.UNKNOWN)
      );
    });
};

module.exports = { login, register };
