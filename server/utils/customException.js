// const Codes = require("./errorCodes");
// const Message = require("./errorMessage");
/**
 * A custom exception
 */
class Exception {
  /**
   * @param  {string} message
   * @param  {string} code
   */
  constructor(message = "Message.UNKNOWN", code = "Codes.UNKNOWN") {
    // super(message)
    this.message = message;
    this.code = code;
  }
}

module.exports = Exception;
