const express = require("express");

const apiRouter = express.Router();
const { User } = require("../../controller");
const Middleware = require("../../middleware");

apiRouter.post("/login", User.login).post("/register", User.register);
// .post("/logout", User.logout)

// send all remaining request to the default router
apiRouter.use(Middleware.Four04Handler);
// handle all unhandled error
apiRouter.use(Middleware.ErrorHandler);

module.exports = apiRouter;
