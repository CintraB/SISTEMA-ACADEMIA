const express = require("express");
const pool = require("../config/dbConnect.js");

class LoginController {
    static Logar = async (req, res) => {
        const { nome,senha } = req.body;
        
        let usuarioEncontrado = {};
        try {

            const query = "SELECT * FROM usuario WHERE nome = $1 AND senha = $2";
            const { rows } = await pool.query(query, [nome, senha]);

            //verificando consulta nao encontrada
            if (rows.length === 0) {
                return res.status(404).json({ message: "Nenhum usuário encontrado!" });
            }

            if (rows[0].professor === true) {

                usuarioEncontrado = {
                    id: rows[0].id,
                    nome: rows[0].nome,
                    cpf: rows[0].cpf,
                    email: rows[0].email,
                    titulo: rows[0].titulo,
                    professor: rows[0].professor,
                    ativo: rows[0].ativo
                };

                return res.status(200).json(usuarioEncontrado);
            }

            usuarioEncontrado = {
                id: rows[0].id,
                nome: rows[0].nome,
                cpf: rows[0].cpf,
                email: rows[0].email,
                titulo: rows[0].titulo,
                aluno: rows[0].aluno,
                ativo: rows[0].ativo
            };
   

            res.status(200).json(usuarioEncontrado);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = LoginController;