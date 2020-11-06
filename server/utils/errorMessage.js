module.exports = {
  ACCOUNT_NOT_FOUND: "account not found",
  INCORRECT_PASSWORD: "email or password is incorrect",
  ACCOUNT_DEACTIVATED: "oops, your account has been deactivated, contact admin",
  NO_PRIVILEGE:
    "you do not have the required privilege to perform this operation",
  UNKNOWN: "an unexpected error has occured",
  EXPIRED_TOKEN: "Expired token",
  UNAUTHORIZED: "Unauthorized",
  UNAUTHORIZED_TOKEN: "Unauthorized token",
  EXPIRED_OR_INVALID_TOKEN: "Expired or invalid token",
  FILE_TOO_LARGE: "file too large, must not be more than 1mb",
  REQUIRED_EMAIL_PASSWORD: "email, password and name are required",
  REQUIRED_NAME_PRICE: "name and price are required",
  REQUIRED_DESCRIPTION: "description is required",
  REQUIRED_ITEMS: "order items is required",
  REQUIRED_SHIPPING_DATA: "shipping data is required",
  INVALID_EMAIL: "Invalid email",
  INVALID_PASSWORD:
    "Invalid pasword: password must contain an uppercase,lowercase character and a special character",
  INVALID_NAME: "Invalid name: name must be at least 3 characters",
  INVALID_PRICE: "Invalid price: price must be more than 99",
  INVALID_DESCRIPTION:
    "Invalid description, description must be at least 10 characters",
  INVALID_PHONE: "Invalid phone number",
  INVALID_REVIEWS:
    "Invalid review: user,rating, comment is required. Rating must be 1 or 2 or 3 or 4 or 5, Comment must be at least 10 characters",
  EMAIL_IN_USE: (email) => `an account with email ${email} already exists`,
  INVALID_SHIPPING_DATA:
    "Invalid shipping data: address,city,postalCode,country is required. Address must be at least 10 characters, city at least 2, postalCode at least 4 and country at least 3",
  INVALID_ORDER_ITEMS: "Invalid order items: items must be a non-empty array",
  NO_TOKEN_FOUND: "Please provide a token",
  DUPLICATE_USER_REVIEW: "Duplicate user review",
  USER_HAS_NO_REVIEW: "User has no review",
  PRODUCT_NOT_FOUND: "Product not found",
  ORDER_NOT_FOUND: "Order not found",
  DUPLICATE_PRODUCT_IN_ORDER: "Duplicate product in a single order",
  NOT_FOUND:
    "Could not find what you are looking for please check our documentation for more details",
};
