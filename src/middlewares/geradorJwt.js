const jwt = require('jsonwebtoken');

const gerarToken = (payload) => {
    let segredo = process.env.TOKEN_SEG;
    const token = jwt.sign(payload,segredo, {expiresIn: 7776000 }); //token para 90 dias, mudar para 3 horas

    return token;
}

module.exports = gerarToken;