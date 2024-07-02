const express = require("express");
const ProfessorController = require("../controllers/professorController.js");
const autenticadorTokenJwt = require("../middlewares/autenticadorJwt.js");
const professoresRoutes = express.Router();

professoresRoutes.use(autenticadorTokenJwt);

const ROTAS = {
    ALUNOS: "/alunos",
    ALUNOS_ID: "/alunos/:id",
    PROFESSORES: "/professores",
    ALUNO_ID: "/aluno/:id",
    PROFESSORES_ID: "/professor/:id",
    TREINO: "/treino",
    EXERCICIOS: "/exercicios"
   };

professoresRoutes.get(ROTAS.ALUNOS,ProfessorController.ListarAlunos);
professoresRoutes.get(ROTAS.ALUNOS_ID,ProfessorController.ListarAlunoPorID);
professoresRoutes.post(ROTAS.ALUNOS,ProfessorController.CadastrarAlunos);
professoresRoutes.get(ROTAS.PROFESSORES,ProfessorController.ListarProfessores);
professoresRoutes.post(ROTAS.PROFESSORES,ProfessorController.CadastrarProfessores);
professoresRoutes.post(ROTAS.TREINO,ProfessorController.CadastrarTreino);
professoresRoutes.get(ROTAS.EXERCICIOS,ProfessorController.ListarExercicios);

module.exports = professoresRoutes;
