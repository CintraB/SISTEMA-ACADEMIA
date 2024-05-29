const express = require("express");
//const poolConnect = require("./config/dbConnect.js"); // Importa o pool de conexões
const routes = require("./routes/index.js");

const app = express();
app.use(express.json());


routes(app);

module.exports = app;
