const apikey = process.env.API_KEY;
const mongoose = require("mongoose");
const { Product, User } = require("./index");
const db = require("../../server/middleware/mongo");

const { CustomException } = require("../utils");

const productData = {
  name: "Jellof rice",
  image: "/uploads/jellof.png",
  price: 2000,
  countInStock: 2,
  description: "Jellof rice as you like it",
};

const userData = {
  name: "TekLoon",
  email: "Male@gmail.com",
  phone: "08032394493",
  password: "Facebook46",
};

const userData2 = {
  name: "Kilop",
  email: "Female@yahoo.com",
  phone: "09032394493",
  password: "Twitter64",
};

const userData3 = {
  name: "Zanie",
  email: "boy@yandex.com",
  phone: "01937433",
  password: "Snapchat23",
};

// Connects to test database
beforeAll(async () => {
  await db.setUp();
});

afterEach(async () => {
  await db.dropCollections();
});

afterAll(async () => {
  await db.dropDatabase();
});  

/**
 * Product model
 */
describe("Product model", () => {
  it("create & save product successfully", async (done) => {
    const validProduct = new Product(productData);
    const savedProduct = await validProduct.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedProduct._id).toBeDefined();
    expect(savedProduct.price).toBe(productData.price);
    expect(savedProduct.countInStock).toBe(productData.countInStock);
    expect(savedProduct.description).toBe(productData.description);
    expect(savedProduct.rating).toBeDefined();
    expect(savedProduct.numReviews).toBeDefined();
    done();
  });

  // You shouldn't be able to add in any field that isn't defined in the schema
  it("insert product successfully, but the field does not defined in schema should be undefined", async () => {
    const productWithInvalidField = new Product({
      ...productData,
      cook: "Mc Donald",
    });
    const savedProductWithInvalidField = await productWithInvalidField.save();
    expect(savedProductWithInvalidField._id).toBeDefined();
    expect(savedProductWithInvalidField.cook).toBeUndefined();
  });

  // It should us tell us the errors is on price field.
  it("create product without required field should failed", async () => {
    const productWithoutRequiredField = new Product({
      name: "TekLoon",
      image: "/uploads/moi-moi.png",
    });
    let err;
    try {
      const savedProductWithoutRequiredField = await productWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.description).toBeDefined();
  });

  // Add user review
  describe("Add user review", () => {
    it("should create and add review to product successfully", async (done) => {
      const validUser = new User(userData);
      await validUser.setPassword(userData.password);
      const savedUser = await validUser.save();

      const validProduct = new Product(productData);
      const review = {
        user: savedUser._id,
        rating: 3,
        comment: "Great food",
      };

      await validProduct.addReview(review);
      const savedProduct = await validProduct.save();
      expect(savedProduct.numReviews).toBe(1);
      expect(savedProduct.rating).toBe(review.rating);

      done();
    });

    it("should create, add review and get right rating of product successfully", async (done) => {
      const validUser = new User(userData);
      await validUser.setPassword(userData.password);
      const savedUser = await validUser.save();

      const validUser2 = new User(userData2);
      await validUser2.setPassword(userData2.password);
      const savedUser2 = await validUser2.save();

      const validUser3 = new User(userData3);
      await validUser3.setPassword(userData3.password);
      const savedUser3 = await validUser3.save();

      const validProduct = new Product(productData);
      let review = {
        user: savedUser._id,
        rating: 3,
        comment: "Great food",
      };

      await validProduct.addReview(review);
      review = {
        user: savedUser2._id,
        rating: 2,
        comment: "Too much salt",
      };

      await validProduct.addReview(review);
      review = {
        user: savedUser3._id,
        rating: 5,
        comment: "Sharwarma on point",
      };

      await validProduct.addReview(review);

      const savedProduct = await validProduct.save();
      expect(savedProduct.numReviews).toBe(3);
      expect(savedProduct.rating).toBe(4);

      done();
    });

    it("should return error for duplicate user in product review", async (done) => {
      const validUser = new User(userData);
      await validUser.setPassword(userData.password);
      const savedUser = await validUser.save();

      const validUser2 = new User(userData2);
      await validUser2.setPassword(userData2.password);
      const savedUser2 = await validUser2.save();

      const validProduct = new Product(productData);
      let review = {
        user: savedUser._id,
        rating: 3,
        comment: "Great food",
      };

      await validProduct.addReview(review);
      review = {
        user: savedUser._id,
        rating: 2,
        comment: "Too much salt",
      };

      let err;
      try {
        await validProduct.addReview(review);
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(CustomException);
      expect(err.message).toBeDefined();

      done();
    });
  });

  // Edit user review
  describe("Edit product review", () => {
    it("should edit product review successfully", async (done) => {
      const validUser = new User(userData);
      await validUser.setPassword(userData.password);
      const savedUser = await validUser.save();

      const validProduct = new Product(productData);
      let review = {
        user: savedUser._id,
        rating: 3,
        comment: "Great food",
      };

      await validProduct.addReview(review);
      review = {
        user: savedUser._id,
        rating: 4,
        comment: "Very yummy",
      };

      await validProduct.editReview(review);
      const savedProduct = await validProduct.save();
      expect(savedProduct.rating).toBe(review.rating);
      expect(savedProduct.reviews[0].rating).toBe(review.rating);

      done();
    });

    it("should find and edit product review in array of reviews successfully", async (done) => {
      const validUser = new User(userData);
      await validUser.setPassword(userData.password);
      const savedUser = await validUser.save();

      const validUser2 = new User(userData2);
      await validUser2.setPassword(userData2.password);
      const savedUser2 = await validUser2.save();

      const validProduct = new Product(productData);
      let review = {
        user: savedUser._id,
        rating: 3,
        comment: "Great food",
      };

      await validProduct.addReview(review);
      review = {
        user: savedUser2._id,
        rating: 3,
        comment: "Very yummy",
      };

      await validProduct.addReview(review);
      await validProduct.editReview({ ...review, rating: 5 });
      const savedProduct = await validProduct.save();
      expect(savedProduct.rating).toBe(4);

      done();
    });

    it("should throw an error for user not found when editing review", async (done) => {
      const validUser = new User(userData);
      await validUser.setPassword(userData.password);
      const savedUser = await validUser.save();

      const validUser2 = new User(userData2);
      await validUser2.setPassword(userData2.password);
      const savedUser2 = await validUser2.save();

      const validProduct = new Product(productData);
      const oldReview = {
        user: savedUser._id,
        rating: 3,
        comment: "Great food",
      };

      await validProduct.addReview(oldReview);
      const newReview = {
        user: savedUser2._id,
        rating: 4,
        comment: "Very yummy",
      };

      let err;
      try {
        await validProduct.editReview(newReview);
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(CustomException);
      expect(err.message).toBeDefined();

      const savedProduct = await validProduct.save();
      expect(savedProduct.rating).toBe(oldReview.rating);
      expect(savedProduct.reviews[0].rating).toBe(oldReview.rating);

      done();
    });
  });

  // Delete user review
  describe("Delete user review", () => {
    it("should delete product review successfully", async (done) => {
      const validUser = new User(userData);
      await validUser.setPassword(userData.password);
      const savedUser = await validUser.save();

      const validUser2 = new User(userData2);
      await validUser2.setPassword(userData2.password);
      const savedUser2 = await validUser2.save();

      const validProduct = new Product(productData);
      const oldReview = {
        user: savedUser._id,
        rating: 3,
        comment: "Great food",
      };

      await validProduct.addReview(oldReview);
      const newReview = {
        user: savedUser2._id,
        rating: 4,
        comment: "Very yummy",
      };
      await validProduct.addReview(newReview);

      await validProduct.deleteReview(newReview.user);

      const savedProduct = await validProduct.save();

      expect(savedProduct.numReviews).toBe(1);
      expect(savedProduct.rating).toBe(3);
      expect(savedProduct.reviews[0].user).toBe(oldReview.user);
      expect(savedProduct.reviews[0].rating).toBe(oldReview.rating);

      done();
    });

    it("should delete product review, then return right value for rating and numReview", async (done) => {
      const validUser = new User(userData);
      await validUser.setPassword(userData.password);
      const savedUser = await validUser.save();

      const validProduct = new Product(productData);

      const review = {
        user: savedUser._id,
        rating: 4,
        comment: "Very yummy",
      };
      await validProduct.addReview(review);

      await validProduct.deleteReview(review.user);

      const savedProduct = await validProduct.save();

      expect(savedProduct.numReviews).toBe(0);
      expect(savedProduct.rating).toBe(0);
      expect(savedProduct.reviews.length).toBe(0);

      done();
    });
    it("should throw an error", async (done) => {
      const validUser = new User(userData);
      await validUser.setPassword(userData.password);
      const savedUser = await validUser.save();

      const validUser2 = new User(userData2);
      await validUser2.setPassword(userData2.password);
      const savedUser2 = await validUser2.save();

      const validProduct = new Product(productData);

      const review = {
        user: savedUser._id,
        rating: 4,
        comment: "Very yummy",
      };

      await validProduct.addReview(review);
      let err;
      try {
        await validProduct.deleteReview(savedUser2._id);
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(CustomException);
      expect(err.message).toBeDefined();

      const savedProduct = await validProduct.save();

      expect(savedProduct.numReviews).toBe(1);
      expect(savedProduct.rating).toBe(review.rating);
      expect(savedProduct.reviews.length).toBe(1);

      done();
    });
  });
});
