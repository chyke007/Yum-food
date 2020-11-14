// eslint-disable-next-line no-unused-vars
const Express = require("express");
const {
  Helper: {
    checkPayload,
    checkId,
    checkOrderItems,
    checkShippingData,
    checkStatus,
  },
  Db: { paginate: Paginate },
  Constants: { PENDING, ADMIN, USER },
  ErrorCodes,
  ErrorMessage,
  CustomException,
  Logger,
} = require("../utils");
const { Order } = require("../model");

const log = new Logger("Controller:Order");
/**
 * tranforms query parameters for mongo
 * @param  {Object} body
 * @return {Object} query
 */
const parseQuery = ({ search, status, shipping, totalPrice }) => {
  let query = {};
  const and = [];
  if (search) {
    const name = {
      $or: [{ "orderItems.name": { $regex: search, $options: "i" } }],
    };
    and.push(name);
  }
  if (status) {
    const a = String(status).split(",");
    const stat = { $or: [] };
    a.forEach((_) => {
      stat.$or.push({ status: { $regex: _, $options: "i" } });
    });
    and.push(stat);
  }
  if (shipping) {
    const ship = {
      $or: [
        { "shipping.address": { $regex: shipping, $options: "i" } },
        { "shipping.city": { $regex: shipping, $options: "i" } },
        { "shipping.postalCode": { $regex: shipping, $options: "i" } },
        { "shipping.country": { $regex: shipping, $options: "i" } },
      ],
    };
    and.push(ship);
  }

  if (totalPrice) {
    const a = String(totalPrice).split(",");
    const pr = { $or: [] };
    a.forEach((_) => {
      const [from, to] = _.split("-");
      if (to === "*") {
        pr.$or.push({ totalPrice: { $gte: from } });
      } else {
        pr.$or.push({
          totalPrice: {
            $gte: from,
            $lte: to,
          },
        });
      }
    });
    and.push(pr);
  }
  if (and.length > 0) {
    query = { ...query, $and: and };
  }
  return query;
};

/**
 * Send result to user
 * @param  {object} order
 * @param  {Express.Response} res
 * @param {function} next
 */
const handleResult = function (order, res, next) {
  if (order) {
    res.json({ data: order });
  } else {
    res.status(404);
    next(
      new CustomException(
        // eslint-disable-next-line new-cap
        ErrorMessage.ORDER_NOT_FOUND,
        ErrorCodes.ORDER_NOT_FOUND
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
  delete body.user;
  delete body.status;
  delete body.itemsPrice;
  delete body.isDelivered;
  delete body.deliveredAt;
  delete body.isPaid;
  delete body.paidAt;
  delete body.totalPrice;
  delete body.orderItems;
};

/**
 * check if the order data from the body has proper items and shipping data
 * @param  {object} order
 * @param  {function} next
 * @return {boolean}
 */
function checkOrder(order, next) {
  const { orderItems: items, shipping } = order;
  if (checkOrderItems(items, next) && checkShippingData(shipping, next)) {
    // ensure desired object values
    return true;
  }

  return false;
}

/* eslint func-names: ["error", "never"] */

/**
 * Get specific order record
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
  let validOrder = {};
  if (req.user.accountType === ADMIN) {
    validOrder = await Order.findById(id).populate({
      path: "user",
      select: "name email",
    });
  } else {
    validOrder = await Order.findOne({
      _id: id,
      user: req.user.id,
    }).populate({ path: "user", select: "name email" });
  }
  handleResult(validOrder, res, next);
};

/** returns all orders
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {function} next
 */
const getAll = async function (req, res, next) {
  let query = parseQuery(req.query);
  const { page, perpage } = req.query;
  if (req.user.accountType === USER) {
    query = { ...query, user: req.user.id };
  }

  // eslint-disable-next-line new-cap
  Paginate(res, next, Order, {
    perPage: perpage,
    query,
    page,
    projections: { countInStock: 0 },
    populate: [{ path: "user", select: "name email" }],
  });
};

/**
 * Adds an order record
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {function} next
 */
const post = async function (req, res, next) {
  if (checkPayload(req.user || {})) {
    const { body } = req;
    if (!("items" in body)) {
      res.status(422);
      return next(
        new CustomException(
          ErrorMessage.REQUIRED_ITEMS,
          ErrorCodes.REQUIRED_ITEMS
        )
      );
    }
    if (!("shippingData" in body)) {
      res.status(422);
      return next(
        new CustomException(
          ErrorMessage.REQUIRED_SHIPPING_DATA,
          ErrorCodes.REQUIRED_SHIPPING_DATA
        )
      );
    }

    sanitizeBody(req.body);

    const { items, shippingData } = body;
    const order = {
      shipping: shippingData,
      orderItems: items,
      user: req.user.id,
    };
    const isValid = checkOrder(order, next);
    if (!isValid) return false;

    delete order.orderItems;
    const validOrder = await new Order(order);

    let error = null;
    await Promise.all(
      items.map(async (val) => {
        try {
          await validOrder.addItem(val);
          return val;
        } catch (err) {
          log.info(err);
          error = err;
          return err;
        }
      })
    );
    if (error) return next({ error });
    await validOrder.save();
    return handleResult(validOrder, res, next);
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
 * updates a single order
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
    if (!("items" in body)) {
      res.status(422);
      return next(
        new CustomException(
          ErrorMessage.REQUIRED_ITEMS,
          ErrorCodes.REQUIRED_ITEMS
        )
      );
    }
    if (!("shippingData" in body)) {
      res.status(422);
      return next(
        new CustomException(
          ErrorMessage.REQUIRED_SHIPPING_DATA,
          ErrorCodes.REQUIRED_SHIPPING_DATA
        )
      );
    }

    sanitizeBody(req.body);

    const { items, shippingData } = body;
    const order = {
      shipping: shippingData,
      orderItems: items,
      user: req.user.id,
    };
    const isValid = checkOrder(order, next);
    if (!isValid) return false;

    order.orderItems = [];

    let error = null;
    const validOrder = await Order.findByIdAndUpdate(id, order, { new: true });
    if (!validOrder) return handleResult(validOrder, res, next);
    if (validOrder.status !== PENDING)
      return next(
        new CustomException(
          // eslint-disable-next-line new-cap
          `order has already been by ${validOrder.status} by admin`,
          ErrorCodes.ORDER_HAS_BEEN_ACCEPTED_REJECTED
        )
      );
    await Promise.all(
      items.map(async (val) => {
        try {
          await validOrder.addItem(val);
          return val;
        } catch (err) {
          log.info(err);
          error = err;
          return err;
        }
      })
    );
    if (error) return next({ error });
    await validOrder.save();
    return handleResult(validOrder, res, next);
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
 * updates a single order status (Admin)
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {function} next
 */
const updateStatus = async function (req, res, next) {
  const {
    params: { id },
    body,
  } = req;
  if (checkPayload(req.user || {}) && checkId(id)) {
    sanitizeBody(req.body);

    const { mode: status } = body;
    const isValid = checkStatus(status, next);
    if (!isValid) return false;

    const validOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    return handleResult(validOrder, res, next);
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
 * deletes a single order
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {function} next
 */

const deleteOrder = async function (req, res, next) {
  const {
    params: { id },
  } = req;
  if (checkPayload(req.user || {}) && checkId(id)) {
    let validOrder = {};
    if (req.user.accountType === ADMIN) {
      validOrder = await Order.findByIdAndRemove(id);
    } else {
      validOrder = await Order.findOne({
        _id: id,
        user: req.user.id,
      });
      if (validOrder) {
        await Order.findByIdAndRemove(id);
      }
    }
    return handleResult(validOrder, res, next);
  }
  return next(
    new CustomException(
      // eslint-disable-next-line new-cap
      ErrorMessage.NO_PRIVILEGE,
      ErrorCodes.NO_PRIVILEGE
    )
  );
};

module.exports = {
  get,
  getAll,
  post,
  update,
  updateStatus,
  deleteOrder,
};
