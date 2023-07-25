const { request } = require("../../index");
const { User, Product } = require("../../../server/model");
const db = require("../../../server/middleware/mongo");
const {
  Constants: { ADMIN, SAMPLE_MONGO_ID, ACCEPTED, DECLINED, PENDING },
} = require("../../../server/utils");

const { API_KEY } = require("../../../config");

const apikey = API_KEY;
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

  afterEach(async () => {
    await db.dropCollections();
  });

  afterAll(async () => {
    await db.dropDatabase();
  });

  it("should respond with single order object for admin user - ACCEPTED ", async (done) => {
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
    let status = { mode: ACCEPTED };
    response = await request
      .put(`/api/order/status/${id}`)
      .send(status)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.status).toBe(ACCEPTED);
    done();
  })

  it("should respond with single order object for admin user - DECLINED ", async (done) => {
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
    let status = { mode: DECLINED };
    response = await request
      .put(`/api/order/status/${id}`)
      .send(status)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.status).toBe(DECLINED);
    done();
  })

  it("should respond with 400 error for invalid mode", async (done) => {
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
    let status = { mode: PENDING };
    response = await request
      .put(`/api/order/status/${id}`)
      .send(status)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.error.message).toBeDefined();
    expect(response.status).toBe(400);
    done();
  })

  it("should respond with 400 error for missing mode ", async (done) => {
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
    let status = { status: ACCEPTED };
    response = await request
      .put(`/api/order/status/${id}`)
      .send(status)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.error.message).toBeDefined();
    expect(response.status).toBe(400);
    done();
  })

  it("should respond with 404 error for missing order", async (done) => {
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
    let status = { mode: ACCEPTED };
    response = await request
      .put(`/api/order/status/${SAMPLE_MONGO_ID}`)
      .send(status)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.error.message).toBeDefined();
    expect(response.status).toBe(404);
    done();
  })

  it("should respond with 400 error for invalid id", async (done) => {
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
    let status = { mode: ACCEPTED };
    response = await request
      .put(`/api/order/status/123`)
      .send(status)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.error.message).toBeDefined();
    expect(response.status).toBe(400);
    done();
  })
})