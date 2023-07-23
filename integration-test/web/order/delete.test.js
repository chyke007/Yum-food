const { request } = require("../../index");
const { User, Product } = require("../../../server/model");
const db = require("../../../server/middleware/mongo");
const {
  Constants: { USER, ADMIN, SAMPLE_MONGO_ID },
} = require("../../../server/utils");

const apikey = process.env.API_KEY;
const userData = {
  name: "Zell",
  email: "test@gmail.com",
  password: "Password2@",
  phone: "09036040503",
};
const userData2 = {
  name: "Zell",
  email: "test2@gmail.com",
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

  it("should respond with single order object for user ", async (done) => {
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
    response = await request
      .delete(`/api/order/${id}`)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.data).toBeDefined();
    done();
  })

  it("should respond with 404 error for order not added by user", async (done) => {
    const validUser = await new User({ ...userData, accountType: USER });
    await validUser.setPassword(userData.password);
    await validUser.save();

    //new user
    const validUser2 = await new User({ ...userData2, accountType: USER });
    await validUser2.setPassword(userData2.password);
    await validUser2.save();

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

    token = await request
      .post("/api/login")
      .send(userData2)
      .set("apikey", apikey);
    token = token.body.data.token;

    response = await request
      .delete(`/api/order/${id}`)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.error.message).toBeDefined();
    expect(response.status).toBe(404);
    done();
  })

  it("should respond with valid product for order not added by admin", async (done) => {
    const validUser = await new User({ ...userData, accountType: USER });
    await validUser.setPassword(userData.password);
    await validUser.save();

    //new user
    const validUser2 = await new User({ ...userData2, accountType: ADMIN });
    await validUser2.setPassword(userData2.password);
    await validUser2.save();

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

    token = await request
      .post("/api/login")
      .send(userData2)
      .set("apikey", apikey);
    token = token.body.data.token;

    response = await request
      .delete(`/api/order/${id}`)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.data).toBeDefined();
    expect(response.status).toBe(200);
    done();
  })

  it("should respond with 400 error for invalid mongo id format", async (done) => {
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

    response = await request
      .delete(`/api/order/123`)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.error.message).toBeDefined();
    expect(response.status).toBe(400);
    done();
  })

  it("should respond with 404 error for missing order", async (done) => {
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

    response = await request
      .delete(`/api/order/${SAMPLE_MONGO_ID}`)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.error.message).toBeDefined();
    expect(response.status).toBe(404);
    done();
  })
})