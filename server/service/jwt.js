const assert = require("assert");
const Cryptr = require("cryptr");
const jwt = require("jsonwebtoken");
const {
  ErrorMessage,
  ErrorCodes,
  CustomException,
  Logger,
} = require("../utils");

const log = new Logger("common:Jwt");

/**
 * Manages all jwt related issues
 * @param  {string} secret
 */
class Jwt {
  /**
   * @param  {string} secret
   */
  constructor(secret) {
    assert.ok(secret, "Secret must be defined");
    this.secret = secret;
    this.cryptr = new Cryptr(secret);
    this.iss = "com.yum-food/api";
    this.aud = "com.yum-food";
  }

  /**
   * decode jwt error
   * @param  {object} error
   * @return {object} the structured error
   */
  static decodeError(error) {
    switch (error.name) {
      case "TokenExpiredError":
        return new CustomException(
          ErrorMessage.EXPIRED_TOKEN,
          ErrorCodes.EXPIRED_TOKEN
        );

      case "JsonWebTokenError":
        return new CustomException(
          ErrorMessage.UNAUTHORIZED_TOKEN,
          ErrorCodes.UNAUTHORIZED_TOKEN
        );
      default:
        return new CustomException(
          "could not decode your token",
          ErrorCodes.UNKNOWN
        );
    }
  }

  /**
   * generate a new JWT
   * @param  {object} data
   * @param  {string} expiresIn
   * @return {string}
   */
  signToken(data, expiresIn = "12h") {
    // encrypt the payload
    const encrypted = this.encryptData(data);
    const { iss } = this;
    const { aud } = this;
    return jwt.sign({ data: encrypted, iss, aud }, this.secret, {
      expiresIn,
    });
  }

  /**
   * encrypt data
   * @param  {string} data
   * @return {object} the decoded data
   */
  encryptData(data) {
    return this.cryptr.encrypt(JSON.stringify(data));
  }

  /**
   * decode encrypted data
   * @param  {string} token
   * @return {object} the decoded token
   */
  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, this.secret, {
        iss: this.iss,
        aud: this.aud,
      });
      if (decoded.iss !== this.iss) throw jwt.JsonWebTokenError;
      const data = this.decryptData(decoded.data);
      log.info(decoded.iss);
      return data;
    } catch (err) {
      log.info(err);
      return Jwt.decodeError(err);
    }
  }

  /**
   * verify that a jwt is valid
   * @param  {string} data
   * @return {object} the decoded data
   */
  decryptData(data) {
    log.info("decrypting data");
    log.info(data);
    const decrypted = this.cryptr.decrypt(data);
    log.info(decrypted);
    return JSON.parse(decrypted);
  }

  /**
   * @param  {Express.Request} req - a request object
   * @return {string} - the ezxtracted token
   */
  static getTokenFromHeaders(req) {
    const {
      headers: { authorization },
      query,
      params,
    } = req;
    if (authorization && authorization.split(" ")[0] === "Bearer") {
      log.info(authorization);
      return authorization.split(" ")[1];
    }
    if (query && query.token) {
      return query.token;
    }
    // if (params && params.token) {
    //   return params.token;
    // }
    return null;
  }
}

module.exports = Jwt;
