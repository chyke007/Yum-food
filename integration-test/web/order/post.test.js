const { request } = require("../../index");
const { User, Product } = require("../../../server/model");
const db = require("../../setup/db_setup");
const path = require("path");
const {
  Constants: { ADMIN },
} = require("../../../server/utils");
let apikey = process.env.API_KEY;
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

let shippingData = {
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
  let mockResponse = () => {
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
  it("should respond with single order object for authenticated user ", async (done) => {
    const validUser = await new User({ ...userData, accountType: ADMIN });
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
    expect(response.body.data).toBeDefined();

    const expectedPrice = productData.price * orderItemData.qty;

    expect(response.body.data.itemsPrice).toBe(expectedPrice);
    expect(response.body.data.orderItems[0].total).toBe(expectedPrice);
    expect(response.body.data.totalPrice).toBe(
      expectedPrice + orderData.shippingPrice
    );

    expect(response.status).toBe(200);
    done();
  });

  //Missing Values

  it("should respond with error message for missing value - (items)", async (done) => {
    const validUser = await new User({ ...userData, accountType: ADMIN });
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
      ...orderData,
    };
    let response = await request
      .post("/api/order")
      .send(order)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);

    expect(response.body.error.message).toBeDefined();
    expect(response.status).toBe(422);
    done();
  });
  it("should respond with error message for missing value - (shippingData)", async (done) => {
    const validUser = await new User({ ...userData, accountType: ADMIN });
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
    };
    let response = await request
      .post("/api/order")
      .send(order)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);

    expect(response.body.error.message).toBeDefined();
    expect(response.status).toBe(422);
    done();
  });

  //Invalid Items
  it("should respond with error message for invalid value - (items)", async (done) => {
    const validUser = await new User({ ...userData, accountType: ADMIN });
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
      items: [],
      ...orderData,
    };
    let response = await request
      .post("/api/order")
      .send(order)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.error.message).toBeDefined();
    expect(response.status).toBe(400);
    order = {
      items: "{items:'kkkk'}",
      ...orderData,
    };
    response = await request
      .post("/api/order")
      .send(order)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.error.message).toBeDefined();
    expect(response.status).toBe(400);
    done();
  });
  it("should respond with error message for invalid value - (shippingData)", async (done) => {
    const validUser = await new User({ ...userData, accountType: ADMIN });
    await validUser.setPassword(userData.password);
    await validUser.save();

    const validProduct = new Product(productData);
    const savedProduct = await validProduct.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;

    //invalid postalCode
    let order = {
      items: [{ ...orderItemData, product: savedProduct._id }],
      shippingData: {
        address: "2A/12 Mopi drive, LA, Pluto",
        city: "LA",
        postalCode: "093",
        country: "Pluto",
      },
    };
    let response = await request
      .post("/api/order")
      .send(order)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.error.message).toBeDefined();
    expect(response.status).toBe(400);

    delete shippingData.country;

    //missing country
    order = {
      items: [{ ...orderItemData, product: savedProduct._id }],
      shippingData,
    };
    response = await request
      .post("/api/order")
      .send(order)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    shippingData.country = "Pluto";
    expect(response.body.error.message).toBeDefined();
    expect(response.status).toBe(400);
    done();
  });
  it("should remove sensitive order properties before saving", async (done) => {
    const validUser = await new User({ ...userData, accountType: ADMIN });
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
      items: [
        {
          ...orderItemData,

          product: savedProduct._id,
        },
      ],
      itemsPrice: 230,
      isDelivered: true,
      shippingData,
    };
    let response = await request
      .post("/api/order")
      .send(order)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.itemsPrice).toBe(
      orderItemData.qty * productData.price
    );
    expect(response.status).toBe(200);

    done();
  });
  it("should throw 400 error for invalid product in order", async (done) => {
    const validUser = await new User({ ...userData, accountType: ADMIN });
    await validUser.setPassword(userData.password);
    await validUser.save();

    const validProduct = new Product(productData);

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;

    let order = {
      items: [
        {
          ...orderItemData,
          product: validProduct._id,
        },
      ],

      shippingData,
    };
    let response = await request
      .post("/api/order")
      .send(order)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);

    expect(response.body.error.message).toBeDefined();
    expect(response.status).toBe(400);

    done();
  });
  it("should throw 400 error for duplicate product in order", async (done) => {
    const validUser = await new User({ ...userData, accountType: ADMIN });
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
      items: [
        {
          ...orderItemData,
          product: savedProduct._id,
        },
        {
          ...orderItemData,
          product: savedProduct._id,
        },
      ],

      shippingData,
    };
    let response = await request
      .post("/api/order")
      .send(order)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);

    expect(response.body.error.message).toBeDefined();
    expect(response.status).toBe(400);

    done();
  });
});
