const path = require("path");
const { request } = require("../../index");
const { User, Product, Order } = require("../../../server/model");
const db = require("../../setup/db_setup");
const {
  Constants: { USER, SAMPLE_MONGO_ID, ACCEPTED },
} = require("../../../server/utils");

const apikey = process.env.API_KEY;
const userData = {
  name: "Zell",
  email: "test@gmail.com",
  password: "Password2@",
  phone: "09036040503",
};

const productData = {
  name: "Jellof rice",
  price: 2000,
  countInStock: 2,
  description: "Jellof rice as you like it",
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

const orderData = {
  shippingData,
  shippingPrice: 0,
};

beforeEach(() => {
  const mockResponse = () => {
    const response = {};
    response.status = jest.fn().mockReturnValue(response);
    response.body = jest.fn().mockReturnValue(response);
    response.json = jest.fn().mockReturnValue(response);
    response.sendStatus = jest.fn().mockReturnValue(response);
    response.clearCookie = jest.fn().mockReturnValue(response);
    response.cookie = jest.fn().mockReturnValue(response);
    return response;
  };
  mockResponse();
});

/**
 * Order test
 */
describe("Order", () => {
  db.setupDB();
  it("should respond with single order object for admin user ", async (done) => {
    const validUser = await new User({ ...userData, accountType: USER });
    await validUser.setPassword(userData.password);
    await validUser.save();

    const validProduct = new Product(productData);
    const savedProduct = await validProduct.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;
    const order = {
      items: [{ ...orderItemData, product: savedProduct._id }],
      ...orderData,
    };
    let response = await request
      .post("/api/order")
      .send(order)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.data).toBeDefined();
    const id = response.body.data._id;
    const newOrder = {
      ...order,
      shippingData: { ...shippingData, city: "VN" },
      items: [{ ...orderItemData, qty: 4, product: savedProduct._id }],
    };
    response = await request
      .put(`/api/order/${id}`)
      .send(newOrder)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.data).toBeDefined();
    const savedOrder = response.body.data;
    const expectedPrice = productData.price * 4;
    expect(savedOrder.itemsPrice).toBe(expectedPrice);
    expect(savedOrder.orderItems[0].total).toBe(expectedPrice);
    expect(savedOrder.shipping.city).toBe("VN");
    done();
  });

  // Missing Values
  it("should respond with error message for missing value - (items)", async (done) => {
    const validUser = await new User({ ...userData, accountType: USER });
    await validUser.setPassword(userData.password);
    await validUser.save();

    const validProduct = new Product(productData);
    const savedProduct = await validProduct.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;

    let order = {
      items: [{ ...orderItemData, product: savedProduct._id }],
      ...orderData,
    };
    let response = await request
      .post("/api/order")
      .send(order)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);

    const id = response.body.data._id;
    order = {
      ...orderData,
    };

    response = await request
      .put(`/api/order/${id}`)
      .send(order)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.error.message).toBeDefined();
    expect(response.status).toBe(422);
    done();
  });
  it("should respond with error message for missing value - (shippingData)", async (done) => {
    const validUser = await new User({ ...userData, accountType: USER });
    await validUser.setPassword(userData.password);
    await validUser.save();

    const validProduct = new Product(productData);
    const savedProduct = await validProduct.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;

    let order = {
      items: [{ ...orderItemData, product: savedProduct._id }],
      ...orderData,
    };
    let response = await request
      .post("/api/order")
      .send(order)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);

    const id = response.body.data._id;
    order = {
      items: [{ ...orderItemData, product: savedProduct._id }],
    };

    response = await request
      .put(`/api/order/${id}`)
      .send(order)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.error.message).toBeDefined();
    expect(response.status).toBe(422);
    done();
  });

  // Invalid Items
  it("should respond with error message for invalid value - (items)", async (done) => {
    const validUser = await new User({ ...userData, accountType: USER });
    await validUser.setPassword(userData.password);
    await validUser.save();

    const validProduct = new Product(productData);
    const savedProduct = await validProduct.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;

    let order = {
      items: [{ ...orderItemData, product: savedProduct._id }],
      ...orderData,
    };

    let response = await request
      .post("/api/order")
      .send(order)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);

    const id = response.body.data._id;
    order = {
      items: "{items:'kkkk'}",
      ...orderData,
    };

    response = await request
      .put(`/api/order/${id}`)
      .send(order)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.error.message).toBeDefined();
    expect(response.status).toBe(400);
    done();
  });
  it("should respond with error message for invalid value - (shippingData)", async (done) => {
    const validUser = await new User({ ...userData, accountType: USER });
    await validUser.setPassword(userData.password);
    await validUser.save();

    const validProduct = new Product(productData);
    const savedProduct = await validProduct.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;

    let order = {
      items: [{ ...orderItemData, product: savedProduct._id }],
      ...orderData,
    };
    let response = await request
      .post("/api/order")
      .send(order)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);

    const id = response.body.data._id;
    order = {
      items: [{ ...orderItemData, product: savedProduct._id }],
      shippingData: {
        address: "2A/12 Mopi drive, LA, Pluto",
        city: "LA",
        postalCode: "093",
        country: "Pluto",
      },
    };

    response = await request
      .put(`/api/order/${id}`)
      .send(order)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.error.message).toBeDefined();
    expect(response.status).toBe(400);
    done();
  });

  it("should throw 400 error for invalid product in order", async (done) => {
    const validUser = await new User({ ...userData, accountType: USER });
    await validUser.setPassword(userData.password);
    await validUser.save();

    const validProduct = new Product(productData);
    const savedProduct = await validProduct.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;

    let order = {
      items: [{ ...orderItemData, product: savedProduct._id }],
      ...orderData,
    };
    let response = await request
      .post("/api/order")
      .send(order)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);

    const id = response.body.data._id;

    order = {
      items: [{ ...orderItemData, product: savedProduct._id }],
      ...orderData,
    };

    response = await request
      .put(`/api/order/${SAMPLE_MONGO_ID}`)
      .send(order)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.error.message).toBeDefined();
    expect(response.status).toBe(404);
    done();
  });

  it("should throw 400 error for product status changed by admin", async (done) => {
    const validUser = await new User({ ...userData, accountType: USER });
    await validUser.setPassword(userData.password);
    await validUser.save();

    const validProduct = new Product(productData);
    const savedProduct = await validProduct.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;

    let order = {
      items: [{ ...orderItemData, product: savedProduct._id }],
      ...orderData,
    };

    let response = await request
      .post("/api/order")
      .send(order)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);

    const id = response.body.data._id;
    await Order.findByIdAndUpdate(id, { status: ACCEPTED });
    order = {
      items: [{ ...orderItemData, product: savedProduct._id }],
      ...orderData,
    };

    response = await request
      .put(`/api/order/${id}`)
      .send(order)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.error.message).toBeDefined();
    expect(response.status).toBe(400);
    done();
  });

  it("should throw 400 error for product status changed by admin", async (done) => {
    const validUser = await new User({ ...userData, accountType: USER });
    await validUser.setPassword(userData.password);
    await validUser.save();

    const validProduct = new Product(productData);
    const savedProduct = await validProduct.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;

    let order = {
      items: [{ ...orderItemData, product: savedProduct._id }],
      ...orderData,
    };

    let response = await request
      .post("/api/order")
      .send(order)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);

    const validProduct2 = new Product(productData);

    const id = response.body.data._id;
    order = {
      items: [{ ...orderItemData, product: validProduct2._id }],
      ...orderData,
    };

    response = await request
      .put(`/api/order/${id}`)
      .send(order)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.error.message).toBeDefined();
    expect(response.status).toBe(400);
    done();
  });
});
