const Chalk = require("chalk");
const debug = require("debug");

/**
 * Logging utility
 */
class Logger {
  /**
   * @param  {string} namespace
   */
  constructor(namespace) {
    this.debug = debug(`yum-food:${namespace}`);
    this.isDebugMode = process.env.NODE_ENV !== "production";
  }

  /**
   * @param  {string} message
   * info level message
   */
  info(message) {
    if (!this.isDebugMode) return;
    let obMessage = false;
    if (typeof message === "object") obMessage = JSON.stringify(message);

    this.debug(`${Chalk.green("INFO")}: ${obMessage || message}`);
  }

  /**
   * @param  {string} message - error message
   * @param  {object} stacktrace - the stacktrace of the error
   */
  error(message, stacktrace) {
    if (!this.isDebugMode) return;
    this.debug(`${Chalk.red("ERROR:")} ${message}`);
    if (stacktrace) {
      debug(`${Chalk.red("STACK_TRACE:")} ${JSON.stringify(stacktrace)}`);
    }
  }

  /**
   * @param  {string} message - warning message
   */
  warning(message) {
    if (!this.isDebugMode) return;
    this.debug(`${Chalk.yellow("WARNING:")} ${message}`);
  }
}

module.exports = Logger;
