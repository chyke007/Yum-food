const mongoose = require("mongoose");
const crypto = require("crypto");

const { Schema } = mongoose;
const {
  Constants: { USER, ADMIN },
} = require("../utils");

const UserSchema = new Schema({
  email: {
    type: "String",
    required: true,
  },
  hash: String,
  salt: String,
  accountType: {
    type: String,
    default: USER,
    enum: [USER, ADMIN],
  },
  imageUrl: String,
  name: {
    type: "String",
    required: true,
  },
  phone: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  updatedAt: {
    type: Number,
    default: Date.now(),
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
});

/* eslint-disable func-names */
const updateDate = function (next) {
  this.updatedAt = Date.now();
  next();
};
// update date for bellow 4 methods
UserSchema.pre("save", updateDate)
  .pre("update", updateDate)
  .pre("findOneAndUpdate", updateDate)
  .pre("findByIdAndUpdate", updateDate);

const keyLength = 512;
const iterations = 10000;
const digest = "sha512";
const encoding = "hex";

/* eslint-disable func-names */
UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, iterations, keyLength, digest)
    .toString(encoding);
};

UserSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, iterations, keyLength, digest)
    .toString(encoding);
  return this.hash === hash;
};

module.exports = mongoose.model("user", UserSchema);
