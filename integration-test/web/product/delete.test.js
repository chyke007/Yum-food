const { request } = require("../../index");
const { Product, User } = require("../../../server/model");
const db = require("../../setup/db_setup");
const path = require("path");
const {
  Constants: { SAMPLE_MONGO_ID, USER, ADMIN },
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
 * Product test
 */
describe("Product", () => {
  db.setupDB();
  it("should respond with single product object for deleted product", async (done) => {
    const validProduct = new Product(productData);
    const savedProduct = await validProduct.save();

    const validUser = new User({ ...userData, accountType: ADMIN });
    await validUser.setPassword(userData.password);
    const savedUser = await validUser.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);

    token = token.body.data.token;
    let response = await request
      .delete(`/api/product/${savedProduct._id}`)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.price).toBe(productData.price);
    expect(response.status).toBe(200);
    done();
  });

  it("should respond with single product object for deleted product - With image", async (done) => {
    const validUser = new User({ ...userData, accountType: ADMIN });
    await validUser.setPassword(userData.password);
    const savedUser = await validUser.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;
    const filePath = path.join(__dirname, "logo192.png");
    let response = await request
      .post("/api/product")
      .field("name", productData.name)
      .field("price", productData.price)
      .field("description", productData.description)
      .attach("image", filePath)
      .set("apikey", apikey)
      .set("Accept", "multipart/form-data")
      .set("Authorization", `Bearer ${token}`);
    response = await request
      .delete(`/api/product/${response.body.data._id}`)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    // expect(response.body.image).toBeDefined();
    expect(response.body.data.price).toBe(productData.price);
    expect(response.status).toBe(200);
    done();
  });
  it("should respond with 400 error for unauthorized access", async (done) => {
    const validProduct = new Product(productData);
    const savedProduct = await validProduct.save();

    let token = await request
      .post("/api/signup")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;

    let response = await request
      .delete(`/api/product/${savedProduct._id}`)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeDefined();
    expect(response.status).toBe(400);
    done();
  });

  it("should respond with 400 error for invalid mongo id format", async (done) => {
    const validProduct = new Product(productData);
    const savedProduct = await validProduct.save();

    const validUser = new User({ ...userData, accountType: ADMIN });
    await validUser.setPassword(userData.password);
    const savedUser = await validUser.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);

    token = token.body.data.token;

    let response = await request
      .delete(`/api/product/123`)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeDefined();
    expect(response.status).toBe(400);
    done();
  });

  it("should respond with 404 error for missing product", async (done) => {
    const validProduct = new Product(productData);
    const savedProduct = await validProduct.save();

    const validUser = new User({ ...userData, accountType: ADMIN });
    await validUser.setPassword(userData.password);
    const savedUser = await validUser.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);

    token = token.body.data.token;

    let response = await request
      .delete(`/api/product/${SAMPLE_MONGO_ID}`)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeDefined();
    expect(response.status).toBe(404);
    done();
  });
});
