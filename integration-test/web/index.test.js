const { request, app } = require("../index");
const path = require("path");
beforeEach(() => {
  mockResponse = () => {
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
  app.set("views", path.join(__dirname, "../../views"));
  app.set("view engine", "ejs");
  app.engine("ejs", (path, options, callback) => {
    const details = Object.assign({ path }, options);
    callback(null, JSON.stringify(details));
  });
});

/**
 * Valid routes
 */
describe("Index Page test", () => {
  it("'should respond with HTTP 200 for home page route", async (done) => {
    const response = await request.get("/");

    expect(response.status).toBe(200);
    done();
  });
  it("should return expected value for home page route", async (done) => {
    const response = await request.get("/");

    expect(JSON.parse(response.text).title).toBe("Home page");
    done();
  });
});

/**
 * Invalid routes
 */
describe("Invalid routes test", () => {
  beforeAll(async () => {
    const res = jest.fn(() => {
      status: jest.fn(() => {
        send: jest.fn();
      });
    });
    const req = {};
  });

  it("'should respond with HTTP 200 for missing route", async (done) => {
    const response = await request.get("/test");

    expect(response.status).toBe(200);
    done();
  });
  it("should return expected value undefine for missing route", async (done) => {
    const response = await request.get("/test");

    expect(JSON.parse(response.text).title).toBe("404 Page");
    done();
  });
});
