const jwt = require('jsonwebtoken');
const { decode } = jwt;
const pool = require('../config/dbConnect.js');

async function autenticadorTokenJwt(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    const segredo = process.env.TOKEN_SEG;

    if (!token) {
        return res.status(401).json({ message: 'Token não informado' });
    }

    try {
        jwt.verify(token, segredo);
        const { cpf, nome, titulo, aluno, professor } = decode(token);

        // Consultar o banco de dados para verificar se o usuário é professor
        const query = "SELECT professor FROM usuario WHERE cpf = $1 AND nome = $2";
        const { rows } = await pool.query(query, [cpf, nome]);

        if (rows.length === 0 || !rows[0].professor) {
            return res.status(403).json({ message: 'Acesso negado. Usuário não é um professor' });
        }

        req.usuario = rows[0]; // Anexa o usuário encontrado ao objeto req para uso posterior
        
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Falha ao autenticar o Token' });
    }
};

module.exports = autenticadorTokenJwt;