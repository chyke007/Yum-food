const { request, app } = require("../index");

beforeEach(() => {
  mockResponse = () => {
    const response = {};
    response.status = jest.fn().mockReturnValue(response);
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
describe("Test invalid routes", () => {
  beforeAll(async () => {
    const res = jest.fn(() => {
      status: jest.fn(() => {
        send: jest.fn();
      });
    });
    const req = {};
  });

  it("'should respond with HTTP 400 for missing route", async (done) => {
    const response = await request.get("/test");

    expect(response.status).toBe(400);
    done();
  });
  it("should return expected value undefine for missing route", async (done) => {
    const response = await request.get("/test");

    expect(response.body.message).toBe(undefined);
    done();
  });
});
