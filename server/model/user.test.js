let apikey = process.env.API_KEY;
const mongoose = require("mongoose");
const { User } = require("./index");
const userData = {
  name: "TekLoon",
  email: "Male@gmail.com",
  phone: "08032394493",
  password: "Facebook46",
};

// Connects to database power-rangers
beforeAll(async () => {
  const url = `mongodb://${process.env.DB_HOST}/test`;
  await mongoose.connect(url, { useNewUrlParser: true });
});

/**
 * User model
 */
describe("User model", () => {
  it("create & save user successfully", async (done) => {
    const validUser = new User(userData);
    await validUser.setPassword(userData.password);
    const savedUser = await validUser.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.phone).toBe(userData.phone);
    expect(savedUser.salt).toBeDefined();
    done();
  });

  // You shouldn't be able to add in any field that isn't defined in the schema
  it("insert user successfully, but the field does not defined in schema should be undefined", async () => {
    const userWithInvalidField = new User({
      ...userData,
      nickname: "Handsome TekLoon",
    });
    await userWithInvalidField.setPassword(userData.password);
    const savedUserWithInvalidField = await userWithInvalidField.save();
    expect(savedUserWithInvalidField._id).toBeDefined();
    expect(savedUserWithInvalidField.nickkname).toBeUndefined();
  });

  // It should us tell us the errors in on email field.
  it("create user without required field should failed", async () => {
    const userWithoutRequiredField = new User({ name: "TekLoon" });
    let err;
    try {
      const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.email).toBeDefined();
  });
});

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
}

afterEach(async () => {
  await removeAllCollections();
});
