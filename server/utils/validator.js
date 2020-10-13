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
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d@$!%~#*?&^])[A-Za-z\d@$!%~*#?&^]{8,}$/
  );

/**
 * @param {String} value
 * @return {boolean}
 */
exports.phone = (value) =>
  validator.isNumeric(value) && validator.isLength(value, 10);

exports.name = (value) => validator.isLength(value, 3);

exports.isMongoId = (value) => validator.isMongoId(value);

exports.checkLen = (value, low) => validator.isLength(value, low);

exports.isToken = (value) => validator.isJWT(value);

exports.isUrl = (value) =>
  validator.isURL(value, {
    protocols: ["https"],
    allow_underscores: true,
  });
