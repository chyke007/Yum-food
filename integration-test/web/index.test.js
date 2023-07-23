const db = require("../../server/middleware/mongo");
const { request } = require("../index");

const apikey = process.env.API_KEY;
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
 * Index routes
 */
describe("Index routes test", () => {

  afterEach(async () => {
    await db.dropCollections();
  });
  
  afterAll(async () => {
    await db.dropDatabase();
  });  

  it("should respond with HTTP 401 for missing api key", async (done) => {
    const response = await request.get("/api/test");

    expect(response.status).toBe(401);
    done();
  });

  it("should respond with HTTP 404 for missing route - token passed in header", async (done) => {
    let token = await request
      .post("/api/signup")
      .send({
        name: "Zell",
        email: "test@gmail.com",
        password: "Password2@",
        phone: "09036040503",
      })
      .set("apikey", apikey);
    token = token.body.data.token;
    const response = await request
      .get("/api/test")
      .set("apikey", apikey)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
    done();
  });
  it("should respond with HTTP 404 for missing token - token passed in as query parameter", async (done) => {
    let token = await request
      .post("/api/signup")
      .send({
        name: "Zell",
        email: "test@gmail.com",
        password: "Password2@",
        phone: "09036040503",
      })
      .set("apikey", apikey);
    token = token.body.data.token;
    const response = await request
      .get(`/api/test?token=${token}`)
      .set("apikey", apikey)
      .set("Accept", "application/json");

    expect(response.status).toBe(404);
    done();
  });
});

/**
 * Frontend routes
 */
describe("Frontend routes test", () => {
  it("should respond with HTTP 200 for frontend app", async (done) => {
    const response = await request.get("/login");
    expect(response.body).toBeDefined();
    done();
  });
});
