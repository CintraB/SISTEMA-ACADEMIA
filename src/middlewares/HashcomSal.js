const { scryptSync, randomBytes } = require('crypto');

async function criarHashComSal(senha){
    const sal = randomBytes(32).toString('hex');
    const Hashsenha = scryptSync(senha,sal,64).toString('hex');

    return `${sal}:${Hashsenha}`;
}

module.exports = criarHashComSal;