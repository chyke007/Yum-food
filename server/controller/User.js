// eslint-disable-next-line no-unused-vars
const Express = require("express");
// const { User } = require("../model");

/**
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {function} next
 */
const register = async (req, res) => {
  // User.save();
  return res.json({ message: "Register" });
};

/**
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {function} next
 */
const login = async (req, res) => {
  return res.json({ message: "Login" });
};

module.exports = { login, register };
