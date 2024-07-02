const { query } = require("express");
const pool = require("../config/dbConnect.js");
const jwt = require('jsonwebtoken');
const { decode } = jwt;

class AlunoController {
    static ListarExercicio = async (req, res) => {
        try {
            //req.usuario ID passado pelo validador JWT 
            //mostrar quando treino foi criado.
            const query_treino_criado = "SELECT * FROM treino WHERE id_aluno = $1 AND ativo = true;";
            const valores_treino_criado = [req.usuario];
            const result = await pool.query(query_treino_criado,valores_treino_criado);

            //mostrar treino atual ativo
            const query_treino_atual = "SELECT eu.id_exercicio, eu.numero_serie, eu.carga, eu.repeticoes, eu.observacao_ex_usuario, e.nome_exercicio FROM ex_usuario eu JOIN exercicio e ON eu.id_exercicio = e.id_exercicio WHERE eu.id_user = $1 AND eu.ativo = true;";
            const valores_treino_atual = [req.usuario];
            const result_ativo = await pool.query(query_treino_atual,valores_treino_atual);
            const treino_atual = result_ativo.rows;

            res.status(200).json({treino: result.rows,treino_atual});
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = AlunoController;