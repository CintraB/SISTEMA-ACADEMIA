const jwt = require('jsonwebtoken');
const { decode } = jwt;
const pool = require('../config/dbConnect.js');

async function autenticadorTokenAlunoJwt(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    const segredo = process.env.TOKEN_SEG;

    if (!token) {
        return res.status(401).json({ message: 'Token não informado' });
    }

    try {
        jwt.verify(token, segredo);
        const { id } = decode(token);

        // Consultar o banco de dados para verificar se o usuário é aluno
        const query = "SELECT aluno FROM usuario WHERE id = $1 AND ativo = TRUE";
        const { rows } = await pool.query(query, [id]);

        if (rows.length === 0 || !rows[0].aluno) {
            return res.status(403).json({ message: 'Acesso negado. Usuário não é um aluno' });
        }

        req.usuario = rows[0].id; // Anexa o usuário encontrado ao objeto req para uso posterior
        
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Falha ao autenticar o Token' });
    }
};

module.exports = autenticadorTokenAlunoJwt;