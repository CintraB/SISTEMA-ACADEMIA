const express = require("express");
const AlunosController = require("../controllers/alunoController.js");
const autenticadorTokenAlunoJwt = require("../middlewares/autenticadorAlunojwt.js");
const alunosRoutes = express.Router();

alunosRoutes.use(autenticadorTokenAlunoJwt);

const ROTAS = {
    TREINO: "/meutreino"
}

alunosRoutes.get(ROTAS.TREINO,AlunosController.ListarExercicio);



module.exports = alunosRoutes;