const express = require("express");
const ProfessorController = require("../controllers/professorController.js");
const autenticadorTokenJwt = require("../middlewares/autenticadorJwt.js");
const professoresRoutes = express.Router();

professoresRoutes.use(autenticadorTokenJwt);

const ROTAS = {
    ALUNOS: "/alunos",
    ALUNO_ID: "/aluno/:id",
    USUARIO_CPF_TITULO: "/usuario/cpfoutitulo",
    ALUNO_INATIVAR: "/alunos/desativar",
    ALUNO_REATIVAR: "/alunos/reativar",
    PROFESSORES: "/professores",
    ALUNO_ID: "/aluno/:id",
    PROFESSORES_ID: "/professor/:id",
    TREINO: "/treino",
    EXERCICIOS: "/exercicios"
   };

professoresRoutes.get(ROTAS.ALUNOS,ProfessorController.ListarAlunos);
professoresRoutes.post(ROTAS.ALUNOS,ProfessorController.CadastrarAlunos);
professoresRoutes.get(ROTAS.ALUNO_ID,ProfessorController.ListarAlunoPorID);
professoresRoutes.put(ROTAS.ALUNO_ID,ProfessorController.AlterarAluno);
professoresRoutes.put(ROTAS.ALUNO_INATIVAR,ProfessorController.DesativarUsuario);
professoresRoutes.put(ROTAS.ALUNO_REATIVAR,ProfessorController.ReativarUsuario);
professoresRoutes.get(ROTAS.PROFESSORES,ProfessorController.ListarProfessores);
professoresRoutes.get(ROTAS.PROFESSORES_ID,ProfessorController.ListarProfessorPorID);
professoresRoutes.post(ROTAS.PROFESSORES,ProfessorController.CadastrarProfessores);
professoresRoutes.post(ROTAS.USUARIO_CPF_TITULO,ProfessorController.ListarUsuarioPorCPFouTitulo);
professoresRoutes.post(ROTAS.TREINO,ProfessorController.CadastrarTreino);
professoresRoutes.get(ROTAS.EXERCICIOS,ProfessorController.ListarExercicios);

module.exports = professoresRoutes;
