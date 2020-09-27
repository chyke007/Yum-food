// routes/auth.js
const express = require("express");

const apiRouter = express.Router();
const { CustomException } = require("../../utils");
const User = require("../../controller/User");

apiRouter
  .post("/login", User.login)
  .post("/register", User.register)
  // .post("/logout", User.logout)

  .all("*", (req, res, next) => {
    res.statusCode = 404;
    // eslint-disable-next-line no-new
    next(
      new CustomException(
        "Could not find what you are looking for please check our documentation for more details",
        404
      )
    );
  });

/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
apiRouter.use((err, req, res, next) => {
  // log(` ${err}`, category.ERROR);
  console.log(` ${err}`);
  if (res.statusCode < 400) res.statusCode = 400;
  if (err instanceof CustomException) {
    res.body = { error: err };
    res.json(res.body);
  } else if (res.body != null) {
    if (res.body.error != null) res.send(res.body);
    else {
      res.body = { error: { message: err, code: res.code } };
      res.json(res.body);
    }
  } else res.json({ error: err });
});

module.exports = apiRouter;
