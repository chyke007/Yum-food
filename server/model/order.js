const mongoose = require("mongoose");

const { Schema } = mongoose;

const Product = require("./product");

const {
  Constants: { PENDING, ACCEPTED, DECLINED },
  CustomException,
  ErrorCodes,
  ErrorMessage,
} = require("../utils");

const shippingSchema = {
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
};

const orderItemSchema = new Schema(
  {
    name: { type: String, required: true, default: "Item name" },
    qty: { type: Number, required: true },
    image: { type: String, required: true, default: "/uploads/default.png" },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [orderItemSchema],
    shipping: shippingSchema,
    itemsPrice: { type: Number, default: 0 },
    shippingPrice: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, default: 0 },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    status: {
      type: String,
      default: PENDING,
      enum: [PENDING, ACCEPTED, DECLINED],
    },
  },
  {
    timestamps: true,
  }
);

/* eslint-disable func-names */
OrderSchema.methods.addItem = async function (orderItem) {
  const product = await Product.findById(orderItem.product);
  if (!product) {
    throw new CustomException(
      ErrorMessage.PRODUCT_NOT_FOUND,
      ErrorCodes.PRODUCT_NOT_FOUND
    );
  }

  if (
    this.orderItems.some((e) => String(e.product) === String(orderItem.product))
  ) {
    throw new CustomException(
      ErrorMessage.DUPLICATE_PRODUCT_IN_ORDER,
      ErrorCodes.DUPLICATE_PRODUCT_IN_ORDER
    );
  }

  const newOrderItem = {
    ...orderItem,
    price: product.price,
    total: (orderItem.qty || 1) * product.price,
    qty: orderItem.qty || 1,
  };
  this.orderItems = [...this.orderItems, newOrderItem];
  this.updatedItemsPrice(this.orderItems);
};

OrderSchema.methods.updatedItemsPrice = function (items) {
  const itemsPrice = items.reduce((acc, next) => {
    return acc + next.total;
  }, 0);
  this.itemsPrice = itemsPrice;
  this.updatedTotalPrice(this.itemsPrice);
};

OrderSchema.methods.updatedTotalPrice = function (itemsPrice) {
  const newShippingPrice = itemsPrice + this.shippingPrice;
  this.totalPrice = newShippingPrice;
};

module.exports = mongoose.model("order", OrderSchema);
