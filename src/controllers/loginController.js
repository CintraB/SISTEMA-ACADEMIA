const express = require("express");
const pool = require("../config/dbConnect.js");
const validarLogin = require("../middlewares/loginVerificador.js");
const gerarToken = require("../middlewares/geradorJwt.js");

class LoginController {
    static Logar = async (req, res) => {
        const { cpf, senha } = req.body;

        if(cpf === null || senha === null || cpf === ' ' || senha === ' ' || cpf === '' || senha === ''){
            return res.status(404).json({ message: "Campos invalidos!" });
        }

        let usuarioEncontrado = {};
        try {

            const query = "SELECT * FROM usuario WHERE cpf = $1";
            const { rows } = await pool.query(query, [cpf]);

            //verificando consulta nao encontrada
            if (rows.length === 0 || rows.length === ' ') {
                return res.status(404).json({ message: "Nenhum usuário encontrado!" });
            }

            const senhaDB = rows[0].senha;
            const verificar = await validarLogin(senhaDB,senha);

            if (verificar) {
                if (rows[0].professor === true) {
                    //gerando payload do professor
                    const tokenPayload = {
                        id: rows[0].id,
                        professor: rows[0].professor,
                        ativo: rows[0].ativo
                    };

                    const token = await gerarToken(tokenPayload);

                    usuarioEncontrado = {
                        id: rows[0].id,
                        cargo: "professor",
                        ativo: rows[0].ativo
                    };

                    return res.status(200).json({usuario: usuarioEncontrado,token});
                }

                //gerando payload do aluno
                const tokenPayload = {
                    id: rows[0].id,
                    aluno: rows[0].aluno,
                    ativo: rows[0].ativo
                };

                const token = await gerarToken(tokenPayload);

                usuarioEncontrado = {
                    id: rows[0].id,
                    cargo: "aluno",
                    ativo: rows[0].ativo
                };


                res.status(200).json({usuario: usuarioEncontrado,token});
            }else{
                res.status(400).json({message: 'Usuário ou senha incorretos'});
            }

        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = LoginController;