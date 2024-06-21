const express = require("express");
const ProfessorController = require("../controllers/professorController.js");
const professoresRoutes = express.Router();
/*pool.query("query aki",(error, results) => {
    if(error) throw error;
    res.status(200).json(results.rows);
})*/

const ROTAS = {
    ALUNOS: "/alunos",
    PROFESSORES: "/professores",
    ALUNO_ID: "/aluno/:id",
    PROFESSORES_ID: "/professor/:id"
   };

professoresRoutes.get(ROTAS.ALUNOS,ProfessorController.ListarAlunos);
professoresRoutes.get(ROTAS.PROFESSORES,ProfessorController.ListarProfessores);
professoresRoutes.post(ROTAS.ALUNOS,ProfessorController.CadastrarAlunos);

module.exports = professoresRoutes;
