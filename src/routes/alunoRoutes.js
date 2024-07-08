const express = require("express");
const AlunosController = require("../controllers/alunoController.js");
const autenticadorTokenAlunoJwt = require("../middlewares/autenticadorAlunojwt.js");
const alunosRoutes = express.Router();

alunosRoutes.use(autenticadorTokenAlunoJwt);

const ROTAS = {
    TREINO: "/meutreino",
    PEDIDO: "/pedidotreino"
}

alunosRoutes.get(ROTAS.TREINO,AlunosController.ListarExercicio);
alunosRoutes.post(ROTAS.PEDIDO,AlunosController.PedirNovoTreino);



module.exports = alunosRoutes;