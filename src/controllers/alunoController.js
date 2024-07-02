const { query } = require("express");
const pool = require("../config/dbConnect.js");
const jwt = require('jsonwebtoken');
const { decode } = jwt;

class AlunoController {
    static ListarExercicio = async (req, res) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            const segredo = process.env.TOKEN_SEG;
            jwt.verify(token, segredo);
            const { cpf, nome, titulo, aluno, professor } = decode(token);
            //pegar o ID
            const query = "SELECT id FROM usuario WHERE cpf = $1";
            const {rows} = await pool.query(query,[cpf]);
            const id_usuario = rows[0].id;

            const querytreino = "SELECT * FROM treino WHERE id = $1";

        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = AlunoController;