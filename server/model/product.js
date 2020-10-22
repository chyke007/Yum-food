const mongoose = require("mongoose");

const { Schema } = mongoose;

const { CustomException, ErrorCodes, ErrorMessage } = require("../utils");

const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    rating: { type: Number, default: 0 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, default: 0, required: true },
    countInStock: { type: Number, default: 0, required: true },
    description: { type: String, required: true },
    rating: { type: Number, default: 0, required: true },
    numReviews: { type: Number, default: 0, required: true },
    reviews: [reviewSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

/* eslint-disable func-names */
ProductSchema.methods.addReview = function (review) {
  if (this.reviews.some((e) => e.user == review.user)) {
    throw new CustomException(
      ErrorMessage.DUPLICATE_USER_REVIEW,
      ErrorCodes.DUPLICATE_USER_REVIEW
    );
  }
  this.reviews = [...this.reviews, review];
  this.numReviews = this.numReviews + 1;
  this.updatedRating(this.reviews);
};

ProductSchema.methods.editReview = function (review) {
  if (!this.reviews.some((e) => e.user == review.user)) {
    throw new CustomException(
      ErrorMessage.USER_HAS_NO_REVIEW,
      ErrorCodes.USER_HAS_NO_REVIEW
    );
  }
  this.reviews = this.reviews.map((r) => (r.user == review.user ? review : r));
  this.updatedRating(this.reviews);
};

ProductSchema.methods.deleteReview = function (user) {
  if (!this.reviews.some((e) => e.user == user)) {
    throw new CustomException(
      ErrorMessage.USER_HAS_NO_REVIEW,
      ErrorCodes.USER_HAS_NO_REVIEW
    );
  }
  this.reviews = this.reviews.filter((a) => a.user != user);
  this.numReviews = this.numReviews - 1;
  this.updatedRating(this.reviews);
};

ProductSchema.methods.updatedRating = function (reviews) {
  if (reviews.length < 1) return (this.rating = 0);
  const rating =
    reviews.reduce((acc, next) => {
      return acc + next.rating;
    }, 0) / reviews.length;
  this.rating = Math.ceil(rating);
};

module.exports = mongoose.model("product", ProductSchema);
