const express = require("express");
const ProfessorController = require("../controllers/professorController.js");
const autenticadorTokenJwt = require("../middlewares/autenticadorJwt.js");
const professoresRoutes = express.Router();

professoresRoutes.use(autenticadorTokenJwt);

const ROTAS = {
    ALUNOS: "/alunos",
    ALUNO_ID: "/aluno/:id",
    ALUNO_CPF_TITULO: "/aluno/cpfoutitulo",
    ALUNO_INATIVAR: "/alunos/desativar",
    ALUNO_REATIVAR: "/alunos/reativar",
    PROFESSORES: "/professores",
    ALUNO_ID: "/aluno/:id",
    PROFESSORES_ID: "/professor/:id",
    TREINO: "/treino",
    EXERCICIOS: "/exercicios"
   };

professoresRoutes.get(ROTAS.ALUNOS,ProfessorController.ListarAlunos);
professoresRoutes.get(ROTAS.ALUNO_ID,ProfessorController.ListarAlunoPorID);
professoresRoutes.post(ROTAS.ALUNO_CPF_TITULO,ProfessorController.ListarAlunoPorCPFouTitulo);
professoresRoutes.post(ROTAS.ALUNOS,ProfessorController.CadastrarAlunos);
professoresRoutes.put(ROTAS.ALUNO_INATIVAR,ProfessorController.DesativarUsuario);
professoresRoutes.put(ROTAS.ALUNO_REATIVAR,ProfessorController.ReativarUsuario);
professoresRoutes.get(ROTAS.PROFESSORES,ProfessorController.ListarProfessores);
professoresRoutes.get(ROTAS.PROFESSORES_ID,ProfessorController.ListarProfessorPorID);
professoresRoutes.post(ROTAS.PROFESSORES,ProfessorController.CadastrarProfessores);
professoresRoutes.post(ROTAS.TREINO,ProfessorController.CadastrarTreino);
professoresRoutes.get(ROTAS.EXERCICIOS,ProfessorController.ListarExercicios);

module.exports = professoresRoutes;
