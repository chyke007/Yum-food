const ErrorCodes = require("./errorCodes");
const ErrorMessage = require("./errorMessage");
/**
 * A custom exception
 */
class Exception {
  /**
   * @param  {string} message
   * @param  {string} code
   */
  constructor(message = ErrorMessage.UNKNOWN, code = ErrorCodes.UNKNOWN) {
    // super(message)
    this.message = message;
    this.code = code;
  }
}

module.exports = Exception;
