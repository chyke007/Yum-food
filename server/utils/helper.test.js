const {
  Helper: { checkPayload, checkId, formatUser, tokenPayload, validateBody },
  Constants: { SAMPLE_MONGO_ID },
} = require("./index");
const faker = require("faker");

/**
 * Check Payload
 */
describe("Check Payload test", () => {
  let fakedUser = {
    email: faker.internet.email(),
    id: SAMPLE_MONGO_ID,
  };
  let next = () => {};
  it("should respond with desired value", () => {
    const response = checkPayload(fakedUser, next);
    expect(response).toBe(true);
  });

  it("should respond with false for missing email or id", () => {
    delete fakedUser.email;

    const response = checkPayload(fakedUser, next);
    expect(response).toBe(false);
  });

  it("should respond with false for missing email or id", () => {
    delete fakedUser.id;

    const response = checkPayload(fakedUser, next);
    expect(response).toBe(false);
  });

  it("should respond with false for invalid mongo id", () => {
    fakedUser.id = "123";

    const response = checkPayload(fakedUser, next);
    expect(response).toBe(false);
  });
});

/**
 * Check Id
 */
describe("Check Id test", () => {
  let id = SAMPLE_MONGO_ID;
  it("should respond with desired value", () => {
    const response = checkId(id);
    expect(response).toBe(true);
  });

  it("should respond with false for invalid mongo id", () => {
    id = "123";

    const response = checkId(id);
    expect(response).toBe(false);
  });
});

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

/**
 * Token Payload
 */
describe("Token Payload test", () => {
  it("should respond with desired object", () => {
    let user = {
      id: faker.random.uuid(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      name: faker.internet.userName(),
      salt: faker.random.uuid(),
      hash: faker.random.alphaNumeric(),
      accountType: faker.internet.userName(),
    };

    const response = tokenPayload(user);
    delete user.phone, delete user.name, delete user.salt, delete user.hash;
    expect(response).toStrictEqual(user);
  });

  it("should respond with null for missing parameters", () => {
    let user = {
      id: faker.random.uuid(),
      email: null,
      phone: faker.phone.phoneNumber(),
      name: faker.internet.userName(),
      salt: faker.random.uuid(),
      hash: faker.random.alphaNumeric(),
      accountType: faker.internet.userName(),
    };

    const response = tokenPayload(user);
    delete user.phone, delete user.name, delete user.salt, delete user.hash;
    expect(response).toStrictEqual({ ...user, email: null });
  });

  it("should respond with null for null user", () => {
    let user = {};
    const response = tokenPayload(user);
    expect(response).toStrictEqual({
      accountType: null,
      email: null,
      id: null,
    });
  });
});

/**
 * Validate Body Test
 */

describe("Validate Body Test", () => {
  //Email
  describe("Validate Body Test - Email", () => {
    it("should respond with true for valid email", () => {
      let body = { email: faker.internet.email() };
      let scope = ["email"];
      let done = () => {};
      let res = { status: () => {} };
      const response = validateBody(scope, body, res, done);
      expect(response).toBe(true);
    });
    it("should respond with false for invalid email", () => {
      let body = { email: faker.internet.userName() };
      let scope = ["email"];
      let done = () => {};
      let res = { status: () => {} };
      const response = validateBody(scope, body, res, done);
      expect(response).toBe(false);
    });
  });

  //Password
  describe("Validate Body Test - Password", () => {
    it("should respond with true for valid password", () => {
      let body = { password: "Wero12Id@$" };
      let scope = ["password"];
      let done = () => {};
      let res = { status: () => {} };
      const response = validateBody(scope, body, res, done);
      expect(response).toBe(true);
    });
    it("should respond with false for invalid password", () => {
      let body = { password: faker.internet.color() };
      let scope = ["password"];
      let done = () => {};
      let res = { status: () => {} };
      const response = validateBody(scope, body, res, done);
      expect(response).toBe(false);
    });
  });

  //Name
  describe("Validate Body Test - Name", () => {
    it("should respond with true for valid name", () => {
      let body = { name: faker.internet.userName() + "@$" };
      let scope = ["name"];
      let done = () => {};
      let res = { status: () => {} };
      const response = validateBody(scope, body, res, done);
      expect(response).toBe(true);
    });
    it("should respond with false for invalid name", () => {
      let body = { name: faker.internet.ip() };
      let scope = ["name"];
      let done = () => {};
      let res = { status: () => {} };
      const response = validateBody(scope, body, res, done);
      expect(response).toBe(false);
    });
  });

  //Price
  describe("Validate Body Test - Price", () => {
    it("should respond with true for valid price", () => {
      let body = { price: 120 };
      let scope = ["price"];
      let done = () => {};
      let res = { status: () => {} };
      const response = validateBody(scope, body, res, done);
      expect(response).toBe(true);
    });
    it("should respond with false for invalid price", () => {
      let body = { price: 98 };
      let scope = ["price"];
      let done = () => {};
      let res = { status: () => {} };
      const response = validateBody(scope, body, res, done);
      expect(response).toBe(false);
    });
  });

  //Description
  describe("Validate Body Test - Description", () => {
    it("should respond with true for valid description", () => {
      let body = { description: "Yummy and satisfactory bean cake" };
      let scope = ["description"];
      let done = () => {};
      let res = { status: () => {} };
      const response = validateBody(scope, body, res, done);
      expect(response).toBe(true);
    });
    it("should respond with false for invalid description", () => {
      let body = { description: "bean cake" };
      let scope = ["description"];
      let done = () => {};
      let res = { status: () => {} };
      const response = validateBody(scope, body, res, done);
      expect(response).toBe(false);
    });
  });

  //Phone
  describe("Validate Body Test - Phone", () => {
    it("should respond with true for valid phone", () => {
      let body = { phone: "09066665555" };
      let scope = ["phone"];
      let done = () => {};
      let res = { status: () => {} };
      const response = validateBody(scope, body, res, done);
      expect(response).toBe(true);
    });
    it("should respond with false for invalid phone", () => {
      let body = { phone: faker.internet.userName() };
      let scope = ["phone"];
      let done = () => {};
      let res = { status: () => {} };
      const response = validateBody(scope, body, res, done);
      expect(response).toBe(false);
    });
  });
});
