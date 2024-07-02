const express = require("express");
const LoginController = require("../controllers/loginController.js");
const loginRoutes = express.Router();

const ROTAS = {
    LOGAR: "/login"
   };

loginRoutes.post(ROTAS.LOGAR,LoginController.Logar);

module.exports = loginRoutes;