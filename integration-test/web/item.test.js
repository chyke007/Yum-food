const { request } = require("../index");
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

/*
      declare the token variable in a scope accessible
      by the entire test suite
    */
// let token;

// beforeAll((done) => {
//   request(app)
//     .post("/login")
//     .send({
//       username: "user",
//       password: "pw",
//     })
//     .end((err, response) => {
//       token = response.body.token; // save the token!
//       done();
//     });
// });

/**
 * Add test
 */
describe("Item", () => {
  it("Test", async (done) => {
    expect(3 * 3).toBe(9);
    done();
  });
});

// /**
//  * Signup routes
//  */
// describe("Login", () => {
//   it("'should respond with HTTP 200 for login route", async (done) => {
//     const response = await request.post("/api/register");

//     expect(response.status).toBe(200);
//     done();
//   });

//   it("'should respond with user object for new user", async (done) => {
//     const response = await request.post("/api/register");

//     expect(response.status).toBe(200);
//     done();
//   });
// });
