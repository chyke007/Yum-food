const { request, app } = require("../index");
const path = require("path");
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

  it("should respond with HTTP 404 for missing route", async (done) => {
    const response = await request.get("/api/test");

    expect(response.status).toBe(404);
    done();
  });
});
