const {
  Helper: { formatUser },
} = require("./index");
const faker = require("faker");

/**
 * Format User
 */
describe("Format User test", () => {
  it("should respond with desired object", () => {
    let fakedUser = {
      email: faker.internet.email(),
      name: faker.internet.userName(),
      phone: faker.phone.phoneNumber(),
      salt: faker.random.uuid(),
      hash: faker.random.alphaNumeric(),
    };
    let user = {
      toJSON: () => {
        return fakedUser;
      },
    };
    let token = faker.random.uuid();
    const response = formatUser(user, token);
    delete fakedUser.salt, delete fakedUser.hash;
    expect(response).toBe(fakedUser);
  });

  it("should respond with null for missing token or user", () => {
    let fakedUser = {};
    let user = {
      toJSON: () => {
        return fakedUser;
      },
    };
    const response = formatUser();
    expect(response).toBe(null);
  });

  it("should respond with null for null token or user", () => {
    let fakedUser = {};
    let user = {
      toJSON: () => {
        return fakedUser;
      },
    };
    const response = formatUser(null, null);
    expect(response).toBe(null);
  });
});
