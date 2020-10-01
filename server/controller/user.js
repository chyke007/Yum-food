// eslint-disable-next-line no-unused-vars
const Express = require("express");

/**
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {function} next
 */
const register = function register() {};

/**
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {function} next
 */
const login = async function login(req, res) {
  return res.json({ message: "Login" });
};

module.exports = { login, register };
