const db = require("../setup/db_setup");
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

// Connects to test database
db.setupDB();

/**
 * Index routes
 */
describe("Index routes test", () => {
  it("should respond with HTTP 401 for missing api key", async (done) => {
    const response = await request.get("/api/test");

    expect(response.status).toBe(401);
    done();
  });

  it("should respond with HTTP 404 for missing route", async (done) => {
    const response = await request.get("/api/test").set("apikey", apikey);

    expect(response.status).toBe(404);
    done();
  });
});

/**
 * Frontend routes
 */
describe("Frontend routes test", () => {
  it("should respond with HTTP 200 for frontend app", async (done) => {
    const response = await request.get("/");

    expect(response.status).toBe(200);
    done();
  });
});
