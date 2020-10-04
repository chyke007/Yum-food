const { request } = require("../index");
const path = require("path");
let apikey = process.env.API_KEY;
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
 * Login test
 */
describe("Login", () => {
  it("should respond with HTTP 401 for missing apikey", async (done) => {
    const response = await request.post("/api/login");

    expect(response.status).toBe(401);
    done();
  });

  it("should respond with user object for authenticated user", async (done) => {
    const response = await request.post("/api/login").set("apikey", apikey);

    expect(response.status).toBe(200);
    done();
  });
});

/**
 * Signup routes
 */
describe("Login", () => {
  it("should respond with HTTP 401 for missing apikey", async (done) => {
    const response = await request.post("/api/register");

    expect(response.status).toBe(401);
    done();
  });

  it("should respond with user object for new user", async (done) => {
    const response = await request.post("/api/register").set("apikey", apikey);

    expect(response.status).toBe(200);
    done();
  });
});
