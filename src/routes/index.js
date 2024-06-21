const express = require("express");
const loginRoutes = require("./loginRoutes.js");
const professorRoutes = require("./professorRoutes");
const alunosRoutes = require("./alunoRoutes");


const routes = (app) =>{
  /*app.use( (req,res,next) => { 
    console.log("salve");
    next();
  })*/

  
  app.route("/").get((req,res) => res.status(200).send("API UP"));

  app.use(express.json(),loginRoutes,professorRoutes,alunosRoutes);

};

module.exports = routes;