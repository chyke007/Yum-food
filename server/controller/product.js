// eslint-disable-next-line no-unused-vars
const Express = require("express");
const {
  Helper: { validateBody },
  Logger,
  ErrorCodes,
  ErrorMessage,
  CustomException,
  Db: { paginate: Paginate },
} = require("../utils");
const { Product } = require("../model");

const log = new Logger("Controller:Product");

/**
 * tranforms query parameters for mongo
 * @param  {Object} body
 * @return {Object} query
 */
const parseQuery = ({ search, price, rating, reviews, active }) => {
  let query = {};
  const and = [];
  if (search) {
    const sea = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    };
    and.push(sea);
  }
  if (price) {
    const a = String(price).split(",");
    const pr = { $or: [] };
    a.forEach((_) => {
      const [from, to] = _.split("-");
      if (to === "*") {
        pr.$or.push({ price: { $gte: from } });
      } else {
        pr.$or.push({
          price: {
            $gte: from,
            $lte: to,
          },
        });
      }
    });
    and.push(pr);
  }
  if (rating) query = { rating, ...query };
  if (reviews) {
    const a = String(reviews).split(",");
    const rev = { $or: [] };
    a.forEach((_) => {
      const [from, to] = _.split("-");
      if (to === "*") {
        rev.$or.push({ numReviews: { $gte: from } });
      } else {
        rev.$or.push({
          numReviews: {
            $gte: from,
            $lte: to,
          },
        });
      }
    });
    and.push(rev);
  }
  if (active)
    query = {
      ...query,
      isActive: active,
    };
  if (and.length > 0) {
    query = { ...query, $and: and };
  }
  return query;
};
/* eslint func-names: ["error", "never"] */
/**
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {function} next
 */
const getAll = async function (req, res, next) {
  const query = parseQuery(req.query);
  const { page, perpage } = req.query;
  // eslint-disable-next-line new-cap
  Paginate(res, next, Product, {
    perPage: perpage,
    query,
    page,
    projections: { countInStock: 0 },
  });
};

module.exports = { getAll };
