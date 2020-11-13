const express = require("express");

const app = express();
const supertest = require("supertest");
const routes = require("../server/index.js");
// Link to your server file
const request = supertest(app);
app.use(routes);
module.exports = { app, request };
