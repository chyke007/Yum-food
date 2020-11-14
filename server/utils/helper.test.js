const faker = require("faker");
const {
  Helper: {
    checkPayload,
    checkId,
    checkRating,
    checkComment,
    checkOrderItems,
    checkShippingData,
    checkStatus,
    formatUser,
    tokenPayload,
    validateBody,
  },
  Constants: { SAMPLE_MONGO_ID, ACCEPTED, DECLINED, PENDING },
} = require("./index");

/**
 * Check Payload
 */
describe("Check Payload test", () => {
  const fakedUser = {
    email: faker.internet.email(),
    id: SAMPLE_MONGO_ID,
  };
  const next = jest.fn();
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
 * Check Rating
 */
describe("Check rating test", () => {
  let rating = 2;
  it("should respond with desired value", () => {
    const response = checkRating(rating);
    expect(response).toBe(true);
  });

  it("should respond with false for invalid rating", () => {
    rating = 6;

    const response = checkRating(rating);
    expect(response).toBe(false);
  });
});

/**
 * Check Comment
 */
describe("Check comment test", () => {
  let comment = "Yummy food";
  it("should respond with desired value", () => {
    const response = checkComment(comment);
    expect(response).toBe(true);
  });

  it("should respond with false for invalid comment", () => {
    comment = "Very good";

    const response = checkComment(comment);
    expect(response).toBe(false);
  });
});

/**
 * Check Order Items
 */
describe("Check Order Items", () => {
  let order = [{ name: "Jellof rice" }];
  const next = jest.fn();
  it("should respond with desired value", () => {
    const response = checkOrderItems(order, next);
    expect(response).toBe(true);
  });

  it("should respond with false for invalid order", () => {
    order = [];

    const response = checkOrderItems(order, next);
    expect(response).toBe(false);
  });

  it("should respond with false for invalid order", () => {
    order = "";

    const response = checkOrderItems(order, next);
    expect(response).toBe(false);
  });
});

/**
 * Check Shipping Data
 */
describe("Check Shipping Data", () => {
  let shipping = {
    address: "2A/12 Mopi drive, LA, Pluto",
    city: "LA",
    postalCode: "028293",
    country: "Pluto",
  };
  const next = jest.fn();
  it("should respond with desired value", () => {
    const response = checkShippingData(shipping, next);
    expect(response).toBe(true);
  });

  it("should respond with false for invalid shipping", () => {
    shipping = {
      address: "2A/12 Mopi drive, LA, Pluto",
      city: "LA",
      country: "Pluto",
    };

    const response = checkShippingData(shipping, next);
    expect(response).toBe(false);
  });

  it("should respond with false for invalid shipping", () => {
    shipping = {
      address: "2A/12 Mopi drive, LA, Pluto",
      city: "LA",
      postalCode: "023",
      country: "Pluto",
    };

    const response = checkShippingData(shipping, next);
    expect(response).toBe(false);
  });
});

/**
 * Check Status
 */
describe("Check Status test", () => {
  const next = jest.fn();
  it("should respond with desired value", () => {
    const response = checkStatus(ACCEPTED,next);
    expect(response).toBe(true);
  });

  it("should respond with desired value", () => {
    const response = checkStatus(DECLINED,next);
    expect(response).toBe(true);
  });

  it("should respond with false for invalid status", () => {
    const response = checkStatus(PENDING,next);
    expect(response).toBe(false);
  });
});



/**
 * Format User
 */
describe("Format User test", () => {
  it("should respond with desired object", () => {
    const fakedUser = {
      email: faker.internet.email(),
      name: faker.internet.userName(),
      phone: faker.phone.phoneNumber(),
      salt: faker.random.uuid(),
      hash: faker.random.alphaNumeric(),
    };
    const user = {
      toJSON: () => {
        return fakedUser;
      },
    };
    const token = faker.random.uuid();
    const response = formatUser(user, token);
    delete fakedUser.salt, delete fakedUser.hash;
    expect(response).toBe(fakedUser);
  });

  it("should respond with null for missing token or user", () => {
    const fakedUser = {};
    const user = {
      toJSON: () => {
        return fakedUser;
      },
    };
    const response = formatUser();
    expect(response).toBe(null);
  });

  it("should respond with null for null token or user", () => {
    const fakedUser = {};
    const user = {
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
    const user = {
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
    const user = {
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
    const user = {};
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
  // Email
  describe("Validate Body Test - Email", () => {
    it("should respond with true for valid email", () => {
      const body = { email: faker.internet.email() };
      const scope = ["email"];
      const done = jest.fn();
      const res = { status: jest.fn() };
      const response = validateBody(scope, body, res, done);
      expect(response).toBe(true);
    });
    it("should respond with false for invalid email", () => {
      const body = { email: faker.internet.userName() };
      const scope = ["email"];
      const done = jest.fn();
      const res = { status: jest.fn() };
      const response = validateBody(scope, body, res, done);
      expect(response).toBe(false);
    });
  });

  // Password
  describe("Validate Body Test - Password", () => {
    it("should respond with true for valid password", () => {
      const body = { password: "Wero12Id@$" };
      const scope = ["password"];
      const done = jest.fn();
      const res = { status: jest.fn() };
      const response = validateBody(scope, body, res, done);
      expect(response).toBe(true);
    });
    it("should respond with false for invalid password", () => {
      const body = { password: faker.internet.color() };
      const scope = ["password"];
      const done = jest.fn();
      const res = { status: jest.fn() };
      const response = validateBody(scope, body, res, done);
      expect(response).toBe(false);
    });
  });

  // Name
  describe("Validate Body Test - Name", () => {
    it("should respond with true for valid name", () => {
      const body = { name: `${faker.internet.userName()}@$` };
      const scope = ["name"];
      const done = jest.fn();
      const res = { status: jest.fn() };
      const response = validateBody(scope, body, res, done);
      expect(response).toBe(true);
    });
    it("should respond with false for invalid name", () => {
      const body = { name: faker.internet.ip() };
      const scope = ["name"];
      const done = jest.fn();
      const res = { status: jest.fn() };
      const response = validateBody(scope, body, res, done);
      expect(response).toBe(false);
    });
  });

  // Price
  describe("Validate Body Test - Price", () => {
    it("should respond with true for valid price", () => {
      const body = { price: 120 };
      const scope = ["price"];
      const done = jest.fn();
      const res = { status: jest.fn() };
      const response = validateBody(scope, body, res, done);
      expect(response).toBe(true);
    });
    it("should respond with false for invalid price", () => {
      const body = { price: 98 };
      const scope = ["price"];
      const done = jest.fn();
      const res = { status: jest.fn() };
      const response = validateBody(scope, body, res, done);
      expect(response).toBe(false);
    });
  });

  // Description
  describe("Validate Body Test - Description", () => {
    it("should respond with true for valid description", () => {
      const body = { description: "Yummy and satisfactory bean cake" };
      const scope = ["description"];
      const done = jest.fn();
      const res = { status: jest.fn() };
      const response = validateBody(scope, body, res, done);
      expect(response).toBe(true);
    });
    it("should respond with false for invalid description", () => {
      const body = { description: "bean cake" };
      const scope = ["description"];
      const done = jest.fn();
      const res = { status: jest.fn() };
      const response = validateBody(scope, body, res, done);
      expect(response).toBe(false);
    });
  });

  // Phone
  describe("Validate Body Test - Phone", () => {
    it("should respond with true for valid phone", () => {
      const body = { phone: "09066665555" };
      const scope = ["phone"];
      const done = jest.fn();
      const res = { status: jest.fn() };
      const response = validateBody(scope, body, res, done);
      expect(response).toBe(true);
    });
    it("should respond with false for invalid phone", () => {
      const body = { phone: faker.internet.userName() };
      const scope = ["phone"];
      const done = jest.fn();
      const res = { status: jest.fn() };
      const response = validateBody(scope, body, res, done);
      expect(response).toBe(false);
    });
  });
});
