const path = require("path");
const { request } = require("../../index");
const { User, Product } = require("../../../server/model");
const db = require("../../../server/middleware/mongo");
const {
  Constants: { ADMIN, USER, SAMPLE_MONGO_ID, DECLINED, PENDING },
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

  describe("Basic", () => {

    it("should respond with data order object for authenticated user ", async (done) => {
      let token = await request
        .post("/api/signup")
        .send(userData)
        .set("apikey", apikey);
      token = token.body.data.token;

      const response = await request
        .get("/api/order")
        .set("apikey", apikey)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(response.body.data).toBeDefined();
      expect(response.status).toBe(200);
      done();
    })
  })

  describe("Query Parameters", () => {

    it("should respond with empty data object for invalid order query paramter  - search", async (done) => {
      const validProduct = new Product(productData);
      const savedProduct = await validProduct.save();
      let token = await request
        .post("/api/signup")
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
      response = await request
        .get("/api/order?search=likz")
        .set("apikey", apikey)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(response.body.data).toBeDefined();
      expect(response.body.data[0]).toBeUndefined();
      expect(response.status).toBe(200);
      done();
    })
    it("should respond with data object for valid order query parameter  - search", async (done) => {
      const validProduct = new Product(productData);
      const savedProduct = await validProduct.save();
      let token = await request
        .post("/api/signup")
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
      response = await request
        .get("/api/order?search=jellof")
        .set("apikey", apikey)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(response.body.data).toBeDefined();
      expect(response.body.data[0]).toBeDefined();
      expect(response.status).toBe(200);
      done();
    })
    it("should respond with empty data object for invalid order query parameter  - totalPrice", async (done) => {
      const validProduct = new Product(productData);
      const savedProduct = await validProduct.save();
      let token = await request
        .post("/api/signup")
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
      response = await request
        .get("/api/order?totalPrice=1-1000")
        .set("apikey", apikey)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(response.body.data).toBeDefined();
      expect(response.body.data[0]).toBeUndefined();
      expect(response.status).toBe(200);
      done();
    })
    it("should respond with empty data object for valid order query parameter  - totalPrice", async (done) => {
      const validProduct = new Product(productData);
      const savedProduct = await validProduct.save();
      let token = await request
        .post("/api/signup")
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
      response = await request
        .get("/api/order?totalPrice=2000-*")
        .set("apikey", apikey)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(response.body.data).toBeDefined();
      expect(response.body.data[0]).toBeDefined();
      expect(response.status).toBe(200);
      done();
    })
    it("should respond with empty data object for invalid order query parameter  - status", async (done) => {
      const validProduct = new Product(productData);
      const savedProduct = await validProduct.save();
      let token = await request
        .post("/api/signup")
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
      response = await request
        .get(`/api/order?status=${DECLINED}`)
        .set("apikey", apikey)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(response.body.data).toBeDefined();
      expect(response.body.data[0]).toBeUndefined();
      expect(response.status).toBe(200);
      done();
    })
    it("should respond with empty data object for valid order query parameter  - status", async (done) => {
      const validProduct = new Product(productData);
      const savedProduct = await validProduct.save();
      let token = await request
        .post("/api/signup")
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
      response = await request
        .get(`/api/order?status=${PENDING}`)
        .set("apikey", apikey)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(response.body.data).toBeDefined();
      expect(response.body.data[0]).toBeDefined();
      expect(response.status).toBe(200);
      done();
    })
    it("should respond with empty data object for invalid order query parameter  - shipping", async (done) => {
      const validProduct = new Product(productData);
      const savedProduct = await validProduct.save();
      let token = await request
        .post("/api/signup")
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
      response = await request
        .get(`/api/order?shipping=USA`)
        .set("apikey", apikey)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(response.body.data).toBeDefined();
      expect(response.body.data[0]).toBeUndefined();
      expect(response.status).toBe(200);
      done();
    })
    it("should respond with empty data object for valid order query parameter  - shipping(city)", async (done) => {
      const validProduct = new Product(productData);
      const savedProduct = await validProduct.save();
      let token = await request
        .post("/api/signup")
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
      response = await request
        .get(`/api/order?shipping=LA`)
        .set("apikey", apikey)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(response.body.data).toBeDefined();
      expect(response.body.data[0]).toBeDefined();
      expect(response.status).toBe(200);
      done();
    })
    it("should respond with empty data object for valid order query parameter  - shipping(address)", async (done) => {
      const validProduct = new Product(productData);
      const savedProduct = await validProduct.save();
      let token = await request
        .post("/api/signup")
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
      response = await request
        .get(`/api/order?shipping=2A`)
        .set("apikey", apikey)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(response.body.data).toBeDefined();
      expect(response.body.data[0]).toBeDefined();
      expect(response.status).toBe(200);
      done();
    })
    it("should respond with empty data object for valid order query parameter  - shipping(postalCode)", async (done) => {
      const validProduct = new Product(productData);
      const savedProduct = await validProduct.save();
      let token = await request
        .post("/api/signup")
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
      response = await request
        .get(`/api/order?shipping=028293`)
        .set("apikey", apikey)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(response.body.data).toBeDefined();
      expect(response.body.data[0]).toBeDefined();
      expect(response.status).toBe(200);
      done();
    })
    it("should respond with empty data object for valid order query parameter  - shipping(country)", async (done) => {
      const validProduct = new Product(productData);
      const savedProduct = await validProduct.save();
      let token = await request
        .post("/api/signup")
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
      response = await request
        .get(`/api/order?shipping=Pluto`)
        .set("apikey", apikey)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(response.body.data).toBeDefined();
      expect(response.body.data[0]).toBeDefined();
      expect(response.status).toBe(200);
      done();
    })
  })

  describe("Authorization", () => {

    it("should respond with empty data object for valid order query but not added by user", async (done) => {
      const validProduct = new Product(productData);
      const savedProduct = await validProduct.save();

      let token = await request
        .post("/api/signup")
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

      token = await request
        .post("/api/signup")
        .send(userData2)
        .set("apikey", apikey);
      token = token.body.data.token;

      response = await request
        .get(`/api/order`)
        .set("apikey", apikey)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(response.body.data).toBeDefined();
      expect(response.body.data[0]).toBeUndefined();
      expect(response.status).toBe(200);
      done();
    })

    it("should respond with data object for order not added by admin", async (done) => {
      //Admin user
      const validUser = await new User({ ...userData2, accountType: ADMIN });
      await validUser.setPassword(userData2.password);
      await validUser.save();

      const validProduct = new Product(productData);
      const savedProduct = await validProduct.save();
      let token = await request
        .post("/api/signup")
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

      token = await request
        .post("/api/login")
        .send(userData2)
        .set("apikey", apikey);
      token = token.body.data.token;
      response = await request
        .get(`/api/order`)
        .set("apikey", apikey)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(response.body.data).toBeDefined();
      expect(response.body.data[0]).toBeDefined();
      expect(response.status).toBe(200);
      done();
    })

  })
})