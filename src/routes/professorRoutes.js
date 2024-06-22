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
    PROFESSORES_ID: "/professor/:id",
    TREINO: "/treino",
    EXERCICIOS: "/exercicios"
   };

professoresRoutes.get(ROTAS.ALUNOS,ProfessorController.ListarAlunos);
professoresRoutes.post(ROTAS.ALUNOS,ProfessorController.CadastrarAlunos);
professoresRoutes.get(ROTAS.PROFESSORES,ProfessorController.ListarProfessores);
professoresRoutes.post(ROTAS.PROFESSORES,ProfessorController.CadastrarProfessores);
professoresRoutes.post(ROTAS.TREINO,ProfessorController.CadastrarTreino);
professoresRoutes.get(ROTAS.EXERCICIOS,ProfessorController.ListarExercicios);

module.exports = professoresRoutes;
