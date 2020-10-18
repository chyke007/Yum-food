const { request } = require("../../index");
const { User } = require("../../../server/model");
const db = require("../../setup/db_setup");
const mongoose = require("mongoose");
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
 * Signup routes
 */
describe("Register", () => {
  it("should respond with HTTP 401 for missing apikey", async (done) => {
    const response = await request.post("/api/signup");

    expect(response.status).toBe(401);
    done();
  });

  it("should respond with user object for new user", async (done) => {
    const response = await request
      .post("/api/signup")
      .send({
        name: "Zell",
        email: "testing@gmail.com",
        password: "Password2@",
        phone: "09036040503",
      })
      .set("apikey", apikey);
    expect(response.body.data.name).toBeTruthy();
    expect(response.body.data.email).toBeTruthy();
    expect(response.status).toBe(200);
    done();
  });

  it("should respond with error message for duplicate email", async (done) => {
    let response = await request
      .post("/api/signup")
      .send({
        name: "Zell",
        email: "testing@gmail.com",
        password: "Password2@",
        phone: "09036040503",
      })
      .set("apikey", apikey);
    response = await request
      .post("/api/signup")
      .send({
        name: "Zell",
        email: "testing@gmail.com",
        password: "Password2@",
        phone: "09036040503",
      })
      .set("apikey", apikey);

    expect(response.status).toBe(422);
    done();
  });

  it("should respond with error message for missing password parameter", async (done) => {
    let response = await request
      .post("/api/signup")
      .send({
        name: "Zell",
        email: "testing@gmail.com",
        phone: "09036040503",
      })
      .set("apikey", apikey);
    expect(response.status).toBe(422);
    done();
  });

  it("should respond with user that was added to collection", async (done) => {
    const response = await request
      .post("/api/signup")
      .send({
        name: "Zell",
        email: "testing2@gmail.com",
        password: "Password2@",
        phone: "09036040503",
      })
      .set("apikey", apikey);

    const user = await User.findOne({ email: "testing2@gmail.com" });
    expect(user.name).toBeTruthy();
    expect(user.email).toBeTruthy();
    expect(response.status).toBe(200);
    done();
  });
});
