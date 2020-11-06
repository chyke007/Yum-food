const { request } = require("../../index");
const { User } = require("../../../server/model");
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
  it("should respond with single product object for authenticated user - No image", async (done) => {
    const validUser = await new User({ ...userData, accountType: ADMIN });
    await validUser.setPassword(userData.password);
    const savedUser = await validUser.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;

    let response = await request
      .post("/api/product")
      .field("name", productData.name)
      .field("price", productData.price)
      .field("description", productData.description)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.price).toBe(productData.price);
    expect(response.status).toBe(200);
    done();
  });

  it("should respond with single product object for authenticated user - With image", async (done) => {
    const validUser = await new User({ ...userData, accountType: ADMIN });
    await validUser.setPassword(userData.password);
    const savedUser = await validUser.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;
    const filePath = path.join(__dirname, "./assets/logo192.png");
    let response = await request
      .post("/api/product")
      .field("name", productData.name)
      .field("price", productData.price)
      .field("description", productData.description)
      .attach("image", filePath)
      .set("apikey", apikey)
      .set("Accept", "multipart/form-data")
      .set("Authorization", `Bearer ${token}`);
    // expect(response.body.image).toBeDefined();
    expect(response.body.data.price).toBe(productData.price);
    expect(response.status).toBe(200);
    done();
  });

  it("should respond with 413 error for upload image - Too large", async (done) => {
    const validUser = await new User({ ...userData, accountType: ADMIN });
    await validUser.setPassword(userData.password);
    const savedUser = await validUser.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;
    const filePath = path.join(__dirname, "./assets/cover.jpg");
    let response = await request
      .post("/api/product")
      .field("name", productData.name)
      .field("price", productData.price)
      .field("description", productData.description)
      .attach("image", filePath)
      .set("apikey", apikey)
      .set("Accept", "multipart/form-data")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.error.message).toBeDefined();
    expect(response.status).toBe(413);
    done();
  });

  it("should respond with 400 error for upload image - Invalid format", async (done) => {
    const validUser = await new User({ ...userData, accountType: ADMIN });
    await validUser.setPassword(userData.password);
    const savedUser = await validUser.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;
    const filePath = path.join(__dirname, "./assets/favicon.ico");
    let response = await request
      .post("/api/product")
      .field("name", productData.name)
      .field("price", productData.price)
      .field("description", productData.description)
      .attach("image", filePath)
      .set("apikey", apikey)
      .set("Accept", "multipart/form-data")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.error.message).toBeDefined();
    expect(response.status).toBe(400);
    done();
  });

  it("should respond with 401 error for invalid token", async (done) => {
    let token = await request
      .post("/api/signup")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;

    let response = await request
      .post("/api/product")
      .field("name", productData.name)
      .field("price", productData.price)
      .field("description", productData.description)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token + "3"}`);
    expect(response.error.message).toBeDefined();
    expect(response.status).toBe(401);
    done();
  });

  it("should respond with 403 error for unauthorized access", async (done) => {
    let token = await request
      .post("/api/signup")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;

    let response = await request
      .post("/api/product")
      .field("name", productData.name)
      .field("price", productData.price)
      .field("description", productData.description)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeDefined();
    expect(response.status).toBe(403);
    done();
  });

  //Missing Values

  it("should respond with error message for missing value - (name)", async (done) => {
    const validUser = await new User({ ...userData, accountType: ADMIN });
    await validUser.setPassword(userData.password);
    const savedUser = await validUser.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;
    let response = await request
      .post("/api/product")
      .field("price", productData.price)
      .field("description", productData.description)
      .set("apikey", apikey)
      .set("Accept", "multipart/form-data")
      .set("Authorization", `Bearer ${token}`);
    // console.log(response.body);
    expect(response.status).toBe(422);
    done();
  });

  it("should respond with error message for missing value - (price)", async (done) => {
    const validUser = await new User({ ...userData, accountType: ADMIN });
    await validUser.setPassword(userData.password);
    const savedUser = await validUser.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;
    let response = await request
      .post("/api/product")
      .field("name", productData.name)
      .field("description", productData.description)
      .set("apikey", apikey)
      .set("Accept", "multipart/form-data")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(422);
    done();
  });

  it("should respond with error message for missing value - (description)", async (done) => {
    const validUser = await new User({ ...userData, accountType: ADMIN });
    await validUser.setPassword(userData.password);
    const savedUser = await validUser.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;
    let response = await request
      .post("/api/product")
      .field("name", productData.name)
      .field("price", productData.price)
      .set("apikey", apikey)
      .set("Accept", "multipart/form-data")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(422);
    done();
  });

  //Invalid Values
  it("should respond with error message for invalid value - (name)", async (done) => {
    const validUser = await new User({ ...userData, accountType: ADMIN });
    await validUser.setPassword(userData.password);
    const savedUser = await validUser.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;
    let response = await request
      .post("/api/product")
      .field("name", "te")
      .field("price", productData.price)
      .field("description", productData.description)
      .set("apikey", apikey)
      .set("Accept", "multipart/form-data")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(422);
    done();
  });
  it("should respond with error message for invalid value - (price)", async (done) => {
    const validUser = await new User({ ...userData, accountType: ADMIN });
    await validUser.setPassword(userData.password);
    const savedUser = await validUser.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;
    let response = await request
      .post("/api/product")
      .field("name", productData.name)
      .field("price", 99)
      .field("description", productData.description)
      .set("apikey", apikey)
      .set("Accept", "multipart/form-data")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(422);
    done();
  });
  it("should respond with error message for invalid value - (description)", async (done) => {
    const validUser = await new User({ ...userData, accountType: ADMIN });
    await validUser.setPassword(userData.password);
    const savedUser = await validUser.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;
    let response = await request
      .post("/api/product")
      .field("name", productData.name)
      .field("price", productData.price)
      .field("description", "Jellof")
      .set("apikey", apikey)
      .set("Accept", "multipart/form-data")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(422);
    done();
  });

  //order controller and test

  //then api would be done
});
