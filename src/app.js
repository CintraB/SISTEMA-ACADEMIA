require("dotenv").config();
const express = require("express");
const routes = require("./routes/index.js");
const cors = require ("cors");

const app = express();
app.use(cors({
    origin: process.env.ENABLE_CORS?.split(';') || []
}));
app.use(express.json());


routes(app);

module.exports = app;
