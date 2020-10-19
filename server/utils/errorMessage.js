module.exports = {
  ACCOUNT_NOT_FOUND: "account not found",
  INCORRECT_PASSWORD: "email or password is incorrect",
  ACCOUNT_DEACTIVATED: "oops, your account has been deactivated, contact admin",
  UNKNOWN: "an unexpected error has occured",
  EXPIRED_TOKEN: "Expired token",
  UNAUTHORIZED: "Unauthorized",
  UNAUTHORIZED_TOKEN: "Unauthorized token",
  REQUIRED_EMAIL_PASSWORD: "Email, password and name are required",
  INVALID_EMAIL: "Invalid email",
  INVALID_PASSWORD: "Invalid pasword",
  INVALID_NAME: "Invalid name",
  INVALID_PHONE: "Invalid phone number",
  EMAIL_IN_USE: (email) => `an account with email ${email} already exists`,
  NOT_FOUND:
    "Could not find what you are looking for please check our documentation for more details",
};
