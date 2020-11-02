// eslint-disable-next-line no-unused-vars
const Express = require("express");
const {
  Helper: { checkId, checkPayload, validateBody },
  ErrorCodes,
  ErrorMessage,
  CustomException,
  Db: { paginate: Paginate },
  Logger,
} = require("../utils");
const { FileManager } = require("../service");
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

/**
 * Send result to user
 * @param  {object} product
 * @param  {Express.Response} res
 * @param {function} next
 */
const handleResult = function (product, res, next) {
  if (product) {
    res.json({ data: product });
  } else {
    res.status(404);
    next(
      new CustomException(
        // eslint-disable-next-line new-cap
        ErrorMessage.PRODUCT_NOT_FOUND,
        ErrorCodes.PRODUCT_NOT_FOUND
      )
    );
  }
};

/**
 * make sure protected content is not overriden
 * @param  {string} body
 */

/* eslint no-param-reassign: ["error", { "props": false }] no-underscore-dangle: ["error", { "allow": ["_id"] }] */

const sanitizeBody = function (body) {
  delete body._id;
  delete body.createdAt;
  delete body.updatedAt;
  delete body.numReviews;
  delete body.reviews;
  delete body.rating;
  delete body.image;
  delete body.public_id;
};

/* eslint func-names: ["error", "never"] */
/** returns all products
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

/**
 * Get specific product record
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {function} next
 */
const get = async function (req, res, next) {
  const { id } = req.params;
  if (!checkId(id)) {
    next(
      new CustomException(
        // eslint-disable-next-line new-cap
        ErrorMessage.PRODUCT_NOT_FOUND,
        ErrorCodes.PRODUCT_NOT_FOUND
      )
    );
    return;
  }

  Product.findById(id, { countInStock: 0 }).then((product) => {
    handleResult(product, res, next);
  });
};

/**
 * Adds a product record
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {function} next
 */
const post = async function (req, res, next) {
  if (checkPayload(req.user || {})) {
    const { body } = req;

    if (!("name" in body) || !("price" in body)) {
      res.status(422);
      return next(
        new CustomException(
          ErrorMessage.REQUIRED_NAME_PRICE,
          ErrorCodes.REQUIRED_NAME_PRICE
        )
      );
    }
    if (!("description" in body)) {
      res.status(422);
      return next(
        new CustomException(
          ErrorMessage.REQUIRED_DESCRIPTION,
          ErrorCodes.REQUIRED_DESCRIPTION
        )
      );
    }

    const isValid = validateBody(
      ["name", "price", "description"],
      body,
      res,
      next
    );
    if (!isValid) return false;

    log.info("passed validation");
    const { name, price, description } = body;

    const validProduct = new Product({
      name,
      price,
      description,
    });

    if (req.file) {
      log.info(req.file);
      if (!req.file.path) {
        log.error("error saving image", {
          file: "product.js add(image)",
        });
      } else {
        validProduct.image = req.file.path;
        validProduct.public_id = req.file.filename;
      }
    }
    await validProduct.save();
    return handleResult(validProduct, res, next);
  }
  return next(
    new CustomException(
      // eslint-disable-next-line new-cap
      ErrorMessage.NO_PRIVILEGE,
      ErrorCodes.NO_PRIVILEGE
    )
  );
};

/**
 * updates a single product
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {function} next
 */
const update = async function (req, res, next) {
  const {
    params: { id },
    body,
  } = req;
  if (checkPayload(req.user || {}) && checkId(id)) {
    sanitizeBody(body);
    const newData = [];
    if (body.name) newData.push("name");
    if (body.price) newData.push("price");
    if (body.description) newData.push("description");

    const isValid = validateBody(newData, body, res, next);
    if (!isValid) return false;
    return Product.findByIdAndUpdate(id, body, { new: true })
      .then(async (product) => {
        if (req.file) {
          log.info(req.file);
          if (!req.file.path) {
            log.error("error saving image", {
              file: "product.js update(image)",
            });
          } else {
            // delete previous file
            if (product && product.public_id) {
              FileManager.deleteCloud(product.public_id || "");
            }
            product.image = req.file.path;
            product.public_id = req.file.filename;
            await product.save();
          }
        }
        return handleResult(product, res, next);
      })
      .catch((err) => {
        return next(err);
      });
  }
  return next(
    new CustomException(
      // eslint-disable-next-line new-cap
      ErrorMessage.NO_PRIVILEGE,
      ErrorCodes.NO_PRIVILEGE
    )
  );
};
/**
 * delete a single product
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {function} next
 */
const deleteProduct = async function (req, res, next) {
  const { params } = req;
  if (checkPayload(req.user || {}) && checkId(params.id)) {
    Product.findByIdAndRemove(params.id).then((product) => {
      if (product && product.public_id) {
        FileManager.deleteCloud(product.public_id || "");
      }
      handleResult(product, res, next);
    });
  } else {
    next(
      new CustomException(
        // eslint-disable-next-line new-cap
        ErrorMessage.NO_PRIVILEGE,
        ErrorCodes.NO_PRIVILEGE
      )
    );
  }
};

module.exports = { getAll, get, post, deleteProduct, update };
