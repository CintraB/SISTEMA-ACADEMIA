const { query } = require("express");
const pool = require("../config/dbConnect.js");

class ProfessorController {

    static ListarAlunos = async (req, res) => {
        try {
            //console.log("Iniciando a consulta...");
            const result = await pool.query("SELECT id, nome, cpf, email, titulo, aluno, professor, ativo FROM usuario WHERE aluno = TRUE;");
            //console.log("Consulta executada com sucesso", result.rows);
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static ListarProfessores = async (req, res) => {
        try {
            const result = await pool.query("SELECT id, nome, cpf, email, titulo, aluno, professor, ativo FROM usuario WHERE professor = TRUE;");
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static CadastrarAlunos = async (req, res) => {
        try {
            //cpf,nome,senha,email,titulo,aluno,professor,ativo => campos tabela aluno // regras de negocio -> aluno sempre true, ativo sempre true, professor sempre falso.
            const valores_usuario = [req.body.cpf, req.body.nome, req.body.senha, req.body.email, req.body.titulo];

            const valida = await validar_aluno(valores_usuario);
            if (valida) {
                //verificar cadastro existente
                const cadastro = await verifica_existencia_usuario(valores_usuario);
                if (cadastro) {
                    const [cpf, nome, senha, email, titulo] = valores_usuario;
                    const query = 'INSERT INTO usuario(cpf,nome,senha,email,titulo) VALUES ($1,$2,$3,$4,$5);';
                    const values = [cpf, nome, senha, email, titulo];

                    const result = await pool.query(query,values);

                    res.status(200).json({message: "Usuario cadastrado com sucesso"});
                } else {
                    res.status(400).json({ error: 'Usuario ja cadastrado' });
                }

            } else {
                res.status(400).json({ error: 'Dados Invalidos' });
            }


        } catch (error) {
            res.status(500).json(error);
        }
    }
}

async function validar_aluno(dados_usuario) {
    //verificar se os campos estão presentes
    if (dados_usuario.every(value => value !== undefined && value !== '')) {

        //verifica se os dados são do tipo correto
        const [cpf, nome, senha, email, titulo] = dados_usuario;

        // Verificar se CPF é um número com 11 dígitos
        const cpfValido = /^\d{11}$/.test(cpf);

        // Verificar se nome é uma string
        const nomeValido = typeof nome === 'string';

        // Verificar se email é uma string e contém '@'
        const emailValido = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);

        // Verificar se título é um número com 12 dígitos
        const tituloValido = /^\d{12}$/.test(titulo);

        if (cpfValido && nomeValido && emailValido && tituloValido) {
            return true;
        }
    }
    return false;
}


async function verifica_existencia_usuario(dados_usuario) {
    const [cpf, nome, senha, email, titulo] = dados_usuario;
    const query = 'SELECT nome,cpf,titulo FROM usuario WHERE ativo = TRUE AND cpf = $1';
    const values = [cpf];
    const result = await pool.query(query, values);


    if (result.rows.length > 0) {

        return false;
    } else {

        return true;
    }
}


module.exports = ProfessorController;