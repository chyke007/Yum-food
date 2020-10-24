const mongoose = require("mongoose");
const { Order, User, Product } = require("./index");
const config = require("../../config");
const db = require("../../integration-test/setup/db_setup");

const { CustomException } = require("../utils");

const userData = {
  name: "TekLoon",
  email: "Male@gmail.com",
  phone: "08032394493",
  password: "Facebook46",
};

const productData = {
  name: "Jellof rice",
  image: "/uploads/jellof.png",
  price: 2000,
  countInStock: 2,
  description: "Jellof rice as you like it",
};
const productData2 = {
  name: "Rice Flakes",
  image: "/uploads/rice.png",
  price: 1100,
  countInStock: 5,
  description: "Your yummy flakes as you like it",
};
const productData3 = {
  name: "Bean cake",
  image: "/uploads/bean_cake.png",
  price: 400,
  countInStock: 19,
  description: "Hot bean cake as you like it",
};

const shippingData = {
  address: "2A/12 Mopi drive, LA, Pluto",
  city: "LA",
  postalCode: "028293",
  country: "Pluto",
};

const orderItemData = {
  name: "Jellof rice",
  qty: 2,
  image: "/uploads/jellof.jpg",
};
const orderItemData2 = {
  name: "Rice Flakes",
  qty: 2,
  image: "/uploads/rice.png",
};
const orderItemData3 = {
  name: "Rice Flakes",
  qty: 10,
  image: "/uploads/bean_cake.png",
};

const orderData = {
  shipping: shippingData,
  shippingPrice: 10,
};

// Connects to test database
db.setupDB();

/**
 * Order model
 */
describe("Order model", () => {
  it("create & save order successfully", async (done) => {
    const validUser = new User(userData);
    await validUser.setPassword(userData.password);
    const savedUser = await validUser.save();

    const validOrder = new Order({ ...orderData, user: savedUser._id });
    const savedOrder = await validOrder.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedOrder._id).toBeDefined();
    expect(savedOrder.product).toBe(orderData.product);
    expect(savedOrder.shippingPrice).toBe(orderData.shippingPrice);
    expect(savedOrder.user).toBeDefined();
    done();
  });

  // You shouldn't be able to add in any field that isn't defined in the schema
  it("insert order successfully, but the field does not defined in schema should be undefined", async () => {
    const validUser = new User(userData);
    await validUser.setPassword(userData.password);
    const savedUser = await validUser.save();

    const orderWithInvalidField = new Order({
      ...orderData,
      user: savedUser._id,
      deliveryTime: 20,
    });
    const savedOrderWithInvalidField = await orderWithInvalidField.save();

    expect(savedOrderWithInvalidField._id).toBeDefined();
    expect(savedOrderWithInvalidField.deliveryTime).toBeUndefined();
  });

  //   // It should us tell us the errors in on user field.
  it("create order without required field should failed", async () => {
    const orderWithoutRequiredField = new Order(orderData);
    let err;
    try {
      const savedOrderWithoutRequiredField = await orderWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.user).toBeDefined();
  });

  describe("Add order", () => {
    it("should create and add order item to order successfully", async (done) => {
      const validUser = new User(userData);
      await validUser.setPassword(userData.password);
      const savedUser = await validUser.save();

      const validProduct = new Product(productData);
      const savedProduct = await validProduct.save();

      const validOrder = new Order({ ...orderData, user: savedUser._id });

      await validOrder.addItem({ ...orderItemData, product: savedProduct._id });
      const savedOrder = await validOrder.save();

      const expectedPrice = productData.price * orderItemData.qty;
      expect(savedOrder.itemsPrice).toBe(expectedPrice);
      expect(savedOrder.orderItems[0].total).toBe(expectedPrice);
      expect(savedOrder.totalPrice).toBe(
        expectedPrice + orderData.shippingPrice
      );

      done();
    });

    it("should create, add order item and get right prices of order successfully", async (done) => {
      const validUser = new User(userData);
      await validUser.setPassword(userData.password);
      const savedUser = await validUser.save();

      const validProduct = new Product(productData);
      const savedProduct = await validProduct.save();

      const validProduct2 = new Product(productData2);
      const savedProduct2 = await validProduct2.save();

      const validProduct3 = new Product(productData3);
      const savedProduct3 = await validProduct3.save();

      const validOrder = new Order({ ...orderData, user: savedUser._id });

      await validOrder.addItem({ ...orderItemData, product: savedProduct._id });
      await validOrder.addItem({
        ...orderItemData2,
        product: savedProduct2._id,
      });
      await validOrder.addItem({
        ...orderItemData3,
        product: savedProduct3._id,
      });
      const savedOrder = await validOrder.save();

      const expectedPrice =
        productData.price * orderItemData.qty +
        productData2.price * orderItemData2.qty +
        productData3.price * orderItemData3.qty;

      expect(savedOrder.itemsPrice).toBe(expectedPrice);
      expect(savedOrder.totalPrice).toBe(
        expectedPrice + orderData.shippingPrice
      );
      done();
    });

    it("should assign order item quantity to be 1 if not provided", async (done) => {
      const validUser = new User(userData);
      await validUser.setPassword(userData.password);
      const savedUser = await validUser.save();

      const validProduct = new Product(productData);
      const savedProduct = await validProduct.save();

      const validOrder = new Order({ ...orderData, user: savedUser._id });
      delete orderItemData.qty;
      await validOrder.addItem({ ...orderItemData, product: savedProduct._id });

      const savedOrder = await validOrder.save();

      const expectedPrice = productData.price * 1;

      expect(savedOrder.itemsPrice).toBe(expectedPrice);
      expect(savedOrder.totalPrice).toBe(
        expectedPrice + orderData.shippingPrice
      );
      done();
    });

    it("should throw error for invalid product in order", async (done) => {
      const validUser = new User(userData);
      await validUser.setPassword(userData.password);
      const savedUser = await validUser.save();

      const validProduct = new Product(productData);

      const validOrder = new Order({ ...orderData, user: savedUser._id });

      let err;
      try {
        await validOrder.addItem({
          ...orderItemData,
          product: validProduct._id,
        });
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(CustomException);
      expect(err.message).toBeDefined();
      done();
    });

    it("should throw error for duplicate product in order", async (done) => {
      const validUser = new User(userData);
      await validUser.setPassword(userData.password);
      const savedUser = await validUser.save();

      const validProduct = new Product(productData);
      const savedProduct = await validProduct.save();

      const validOrder = new Order({ ...orderData, user: savedUser._id });
      await validOrder.addItem({
        ...orderItemData,
        product: savedProduct._id,
      });

      let err;
      try {
        await validOrder.addItem({
          ...orderItemData,
          product: savedProduct._id,
        });
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(CustomException);
      expect(err.message).toBeDefined();
      done();
    });
  });
});
