const { request } = require("../../index");
const { User, Product } = require("../../../server/model");
const db = require("../../setup/db_setup");
const path = require("path");
const {
  Constants: { ADMIN, SAMPLE_MONGO_ID },
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
const productData2 = {
  name: "Bean cake",
  price: 800,
  countInStock: 4,
  description: "Bean cake as you like it",
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

    const validProduct = new Product(productData);
    const savedProduct = await validProduct.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;

    let response = await request
      .put(`/api/product/${savedProduct._id}`)
      .field("name", productData2.name)
      .field("price", productData.price)
      .field("description", productData.description)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.name).toBe(productData2.name);
    expect(response.status).toBe(200);
    done();
  });
  it("should respond with single product object for authenticated user - With image", async (done) => {
    const validUser = await new User({ ...userData, accountType: ADMIN });
    await validUser.setPassword(userData.password);
    const savedUser = await validUser.save();

    const validProduct = new Product(productData);
    const savedProduct = await validProduct.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;
    const filePath = path.join(__dirname, "./assets/logo192.png");

    let response = await request
      .put(`/api/product/${savedProduct._id}`)
      .field("name", productData2.name)
      .field("price", productData.price)
      .field("description", productData.description)
      .attach("image", filePath)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.image).toBeDefined();
    expect(response.body.data.name).toBe(productData2.name);
    expect(response.status).toBe(200);
    done();
  });

  it("should add then update and respond with single product object for authenticated user - With image", async (done) => {
    const validUser = await new User({ ...userData, accountType: ADMIN });
    await validUser.setPassword(userData.password);
    const savedUser = await validUser.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;
    const filePath = path.join(__dirname, "./assets/logo192.png");
    //Add product
    let response = await request
      .post("/api/product")
      .field("name", productData.name)
      .field("price", productData.price)
      .field("description", productData.description)
      .attach("image", filePath)
      .set("apikey", apikey)
      .set("Accept", "multipart/form-data")
      .set("Authorization", `Bearer ${token}`);
    //Update product
    response = await request
      .put(`/api/product/${response.body.data._id}`)
      .field("name", productData.name)
      .field("price", productData2.price)
      .field("description", productData.description)
      .attach("image", filePath)
      .set("apikey", apikey)
      .set("Accept", "multipart/form-data")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.data.image).toBeDefined();
    expect(response.body.data.price).toBe(productData2.price);
    expect(response.status).toBe(200);
    done();
  });
  //Invalid values
  it("should respond with 422 error for invalid value - Name", async (done) => {
    const validUser = await new User({ ...userData, accountType: ADMIN });
    await validUser.setPassword(userData.password);
    const savedUser = await validUser.save();

    const validProduct = new Product(productData);
    const savedProduct = await validProduct.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;

    let response = await request
      .put(`/api/product/${savedProduct._id}`)
      .field("name", "se")
      .field("price", productData.price)
      .field("description", productData.description)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.error.message).toBeDefined();
    expect(response.status).toBe(422);
    done();
  });
  it("should respond with 422 error for invalid value - Price", async (done) => {
    const validUser = await new User({ ...userData, accountType: ADMIN });
    await validUser.setPassword(userData.password);
    const savedUser = await validUser.save();

    const validProduct = new Product(productData);
    const savedProduct = await validProduct.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;

    let response = await request
      .put(`/api/product/${savedProduct._id}`)
      .field("name", productData.name)
      .field("price", 20)
      .field("description", productData.description)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.error.message).toBeDefined();
    expect(response.status).toBe(422);
    done();
  });

  it("should respond with 422 error for invalid value - Description", async (done) => {
    const validUser = await new User({ ...userData, accountType: ADMIN });
    await validUser.setPassword(userData.password);
    const savedUser = await validUser.save();

    const validProduct = new Product(productData);
    const savedProduct = await validProduct.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;

    let response = await request
      .put(`/api/product/${savedProduct._id}`)
      .field("name", productData.name)
      .field("price", productData.price)
      .field("description", "Jellof")
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.error.message).toBeDefined();
    expect(response.status).toBe(422);
    done();
  });

  //Removes protected values
  it("should delete protected values provided before updating product", async (done) => {
    const validUser = await new User({ ...userData, accountType: ADMIN });
    await validUser.setPassword(userData.password);
    const savedUser = await validUser.save();

    const validProduct = new Product(productData);
    const savedProduct = await validProduct.save();

    let token = await request
      .post("/api/login")
      .send(userData)
      .set("apikey", apikey);
    token = token.body.data.token;

    let response = await request
      .put(`/api/product/${savedProduct._id}`)
      .field("name", productData2.name)
      .field("price", productData2.price)
      .field("description", productData2.description)
      .field("_id", SAMPLE_MONGO_ID)
      .field("created_at", Date.now())
      .field("updated_at", Date.now())
      .field("numReviews", 2)
      .field("reviews", 12)
      .field("rating", 2)
      .field("image", "/uploads/ffff.png")
      .field("public_id", 12345)
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.rating).toBe(0);
    expect(response.body.data.price).toBe(productData2.price);
    expect(response.status).toBe(200);
    done();
  });
});
