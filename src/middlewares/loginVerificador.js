const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');

async function validarLogin(hash,senhaReq){
    const [sal,hashSenhaDB] = hash.split(':');
    const novaHash = scryptSync(senhaReq,sal,64).toString('hex');
    const math = timingSafeEqual(Buffer.from(novaHash),Buffer.from(hashSenhaDB));

    return math;
}

module.exports = validarLogin;