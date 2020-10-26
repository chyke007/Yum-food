const validator = require("validator");

exports.email = (value) => validator.isEmail(value);

/** returns true if the value has atleast a lowercase character,
 * an uppercase character, a number or a special character,
 * and is at least  characters long
 * @param  {string} value
 * @return {boolean}
 */
exports.password = (value) =>
  validator.matches(
    value,
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+).{8,}/ // eslint-disable-line
  );

/**
 * @param {String} value
 * @return {boolean}
 */
exports.phone = (value) =>
  validator.isNumeric(value) && validator.isLength(value, 10);

exports.name = (value) =>
  validator.isLength(value, 3) && validator.matches(value, /(?=.*[a-z][A-z])/);

exports.isMongoId = (value) => validator.isMongoId(value);

exports.checkLen = (value, low) => validator.isLength(value, low);

exports.isToken = (value) => validator.isJWT(value);

exports.isUrl = (value) =>
  validator.isURL(value, {
    protocols: ["https"],
    allow_underscores: true,
  });
