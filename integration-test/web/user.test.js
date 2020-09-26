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
});

/**
 * Valid routes
 */
describe("Login", () => {
  it("'should respond with HTTP 200 for login route", async (done) => {
    const response = await request.post("/api/login");

    expect(response.status).toBe(200);
    done();
  });
});