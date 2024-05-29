const express = require("express");
//const teamsRoutes = require("./teamRoutes.js");
//const statsRoutes = require("./statsRoutes.js");


const routes = (app) =>{
  app.route("/").get((req,res) => res.status(200).send("API UP"));

  //app.use(express.json(),teamsRoutes,statsRoutes);

};

module.exports = routes;