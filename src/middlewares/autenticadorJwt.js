const jwt = require('jsonwebtoken');
const { decode } = jwt;

function autenticadorTokenJwt(req,res,next){
    const token = req.headers.authorization?.split(" ")[1];
    const segredo = process.env.TOKEN_SEG;

    if(!token){
        return res.status(401).json({message: 'Token não informado'});
    }

    try {
        jwt.verify(token,segredo);
        const {cpf,nome,titulo,aluno,professor} = decode(token);
        req.cpf = cpf;
        req.nome = nome;
        req.titulo = titulo;
        req.aluno = aluno;
        req.professor = professor;

        return next();
    } catch (error) {
        return res.status(401).json({message: 'Falha ao autenticar o Token'});
    }
};

module.exports = autenticadorTokenJwt;