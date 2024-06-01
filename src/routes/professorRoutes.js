const express = require("express");
const ProfessorController = require("../controllers/professorController.js");
const professoresRoutes = express.Router();
/*pool.query("query aki",(error, results) => {
    if(error) throw error;
    res.status(200).json(results.rows);
})*/

const ROTAS = {
    ALUNOS: "/alunos",
    ALUNO_ID: "/aluno/:id"
   };

professoresRoutes.get(ROTAS.ALUNOS,ProfessorController.ListarAlunos);

module.exports = professoresRoutes;
