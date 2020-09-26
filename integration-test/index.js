const express = require("express");
const app = express();
const routes = require("../server/index.js"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
app.use(routes);
module.exports = { app, request };
