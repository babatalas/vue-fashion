if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development")
    require("dotenv/config");
const cors = require("cors");
const express = require("express");
const routers = require("./routers");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routers);
app.use(errorHandler);

module.exports = app;
