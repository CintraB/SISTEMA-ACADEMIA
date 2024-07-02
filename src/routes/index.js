const express = require("express");
const loginRoutes = require("./loginRoutes.js");
const professorRoutes = require("./professorRoutes");
const alunosRoutes = require("./alunoRoutes");

const autenticadorTokenAlunoJwt = require("../middlewares/autenticadorAlunojwt.js");
const autenticadorTokenJwt = require("../middlewares/autenticadorJwt.js");

const routes = (app) => {
  /*app.use( (req,res,next) => { 
    console.log("salve");
    next();
  })*/


  app.route("/").get((req, res) => res.status(200).send("API UP"));

  app.use(express.json());
  app.use(loginRoutes);

  // Rotas de alunos com middleware específico
  app.use("/alunos", autenticadorTokenAlunoJwt, alunosRoutes);

  // Rotas de professores com middleware específico e prefixo "/professores"
  app.use("/professores", autenticadorTokenJwt, professorRoutes);

};

module.exports = routes;