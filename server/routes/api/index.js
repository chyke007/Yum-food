const express = require("express");

const apiRouter = express.Router();
const { User } = require("../../controller");
const Middleware = require("../../middleware");

// all requests must pass in an api key
apiRouter.use(Middleware.ApiGuard);

apiRouter.post("/login", User.login).post("/signup", User.register);

// all requests must pass in a token
apiRouter.use(Middleware.ExtractToken);

apiRouter.use("/product", require("./product"));
// .post("/logout", User.logout)

// send all remaining request to the default router
apiRouter.use(Middleware.Four04Handler);
// handle all unhandled error
apiRouter.use(Middleware.ErrorHandler);

module.exports = apiRouter;
