const { query } = require("express");
const pool = require("../config/dbConnect.js");
const criarHashComSal = require("../middlewares/HashcomSal.js");

class ProfessorController {

    static ListarAlunos = async (req, res) => {
        try {
            //mostrar alunos ativos
            const result = await pool.query("SELECT id, nome, cpf, email, titulo, aluno, professor, ativo FROM usuario WHERE aluno = TRUE AND ativo = true;");
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static ListarAlunoPorID = async (req, res) => {
        try {
            const id = req.params.id;
            const query_verifica = 'SELECT id, nome, cpf, email, titulo, aluno, professor, ativo FROM usuario WHERE id = $1;'
            const valores = [id];
            const result = await pool.query(query_verifica, valores);

            if (result.rows.length > 0 && result.rows[0].ativo == true && result.rows[0].aluno == true) {
                res.status(200).json(result.rows[0]);
            } else {
                res.status(404).json({ message: 'Aluno não encontrado ou inativo' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static ListarUsuarioPorCPFouTitulo = async (req, res) => {
        try {
            const cpf = req.body.cpf;
            const titulo = req.body.titulo;
            if (cpf.length > 0 || titulo.length > 0) {
                const verifica = await verifica_existencia_usuario([cpf, titulo]);
                if (verifica == false) {
                    const query = 'SELECT id, nome, cpf, email, titulo, aluno, professor FROM usuario WHERE ativo = TRUE AND (cpf = $1 OR titulo = $2);';
                    const valores = [cpf, titulo];
                    const result = await pool.query(query, valores);

                    res.status(200).json(result.rows[0]);
                } else {
                    res.status(404).json({ message: 'Aluno não encontrado ou inexistente' });
                }
            } else {
                res.status(400).json({ error: 'Dados Invalidos' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static DesativarUsuario = async (req, res) => {
        try {
            const valores_usuario = [req.body.cpf];
            const verifica = await verifica_existencia_usuario(valores_usuario); //se existe retorna falso
            const [cpf] = valores_usuario;
            if (verifica == false) {
                const query = 'UPDATE usuario SET ativo = false WHERE cpf = $1;';
                const valores = [cpf];
                await pool.query(query, valores);
                const query_dados = 'SELECT id, nome, cpf, email, titulo, aluno, professor, ativo FROM usuario WHERE cpf = $1;'
                const dados = await pool.query(query_dados, valores);

                res.status(200).json({ message: 'Usuário alterado para inativo', dados: dados.rows });
            } else {
                res.status(400).json({ message: "Usuario inativo ou inexistente" });
            }

        } catch (error) {
            res.status(500).json(error);
        }
    }

    static ReativarUsuario = async (req, res) => {
        try {
            const valores_usuario = [req.body.cpf];
            const verifica = await verifica_existencia_usuario_inativo(valores_usuario);
            const [cpf] = valores_usuario;
            if (verifica) {
                const query = 'UPDATE usuario SET ativo = true WHERE cpf = $1;';
                const valores = [cpf];
                await pool.query(query, valores);
                const query_dados = 'SELECT id, nome, cpf, email, titulo, aluno, professor, ativo FROM usuario WHERE cpf = $1;'
                const dados = await pool.query(query_dados, valores);

                res.status(200).json({ message: 'Usuário alterado para ativo', dados: dados.rows });
            } else {
                res.status(400).json({ message: "Usuario não encontrado" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static ListarProfessorPorID = async (req, res) => {
        try {
            const id = req.params.id;
            const query_verifica = 'SELECT id, nome, cpf, email, titulo, aluno, professor, ativo FROM usuario WHERE id = $1;'
            const valores = [id];
            const result = await pool.query(query_verifica, valores);

            if (result.rows.length > 0 && result.rows[0].ativo == true && result.rows[0].professor == true) {
                res.status(200).json(result.rows[0]);
            } else {
                res.status(404).json({ message: 'Professor não encontrado ou inativo' });
            }
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

            const valida = await validar_usuario(valores_usuario);
            if (valida) {
                //verificar cadastro existente
                const cadastro = await verifica_existencia_usuario(valores_usuario);
                if (cadastro) {
                    const [cpf, nome, senha, email, titulo] = valores_usuario;
                    const hashSenha = await criarHashComSal(senha);
                    const query = 'INSERT INTO usuario(cpf,nome,senha,email,titulo) VALUES ($1,$2,$3,$4,$5);';
                    const values = [cpf, nome, hashSenha, email, titulo];

                    const result = await pool.query(query, values);

                    res.status(200).json({ message: "Usuario cadastrado com sucesso" });
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

    static AlterarAluno = async (req, res) => {
        try {
            const id = req.params.id;
            const { cpf, nome, email, titulo } = req.body;

            // Verificar se os valores estão presentes e não são nulos ou vazios
            let updates = [];
            let valores = [];
            let index = 1;

            if (cpf) {
                updates.push(`cpf = $${index}`);
                valores.push(cpf);
                index++;
            }
            if (nome) {
                updates.push(`nome = $${index}`);
                valores.push(nome);
                index++;
            }
            if (email) {
                updates.push(`email = $${index}`);
                valores.push(email);
                index++;
            }
            if (titulo) {
                updates.push(`titulo = $${index}`);
                valores.push(titulo);
                index++;
            }

            // Se não houver campos para atualizar, retorne um erro
            if (updates.length === 0) {
                return res.status(400).json({ error: 'Nenhum dado para atualizar' });
            }

            // Adicionar o ID ao final dos valores
            valores.push(id);

            // Construir a consulta SQL dinamicamente
            const query = `
                UPDATE usuario
                SET ${updates.join(', ')}
                WHERE id = $${index} AND ativo = true AND aluno = true
                RETURNING id, nome, cpf, email, titulo, aluno, professor;
            `;
            console.log(query,valores);
            // Executar a consulta no banco de dados
            const result = await pool.query(query, valores);

            // Verificar se o usuário foi encontrado e atualizado
            if (result.rows.length > 0) {
                res.status(200).json({ message: 'Dados do aluno alterados com sucesso', dados: result.rows[0] });
            } else {
                res.status(404).json({ message: 'Aluno não encontrado' });
            }

        } catch (error) {
            res.status(500).json(error);
        }
    }

    static CadastrarProfessores = async (req, res) => {
        try {
            //INSERT INTO usuario(cpf,nome,senha,email,titulo,aluno,professor,ativo)
            const valores_professor = [req.body.cpf, req.body.nome, req.body.senha, req.body.email, req.body.titulo];
            const valida = await validar_usuario(valores_professor);

            if (valida) {
                //verificar cadastro existente
                const cadastro = await verifica_existencia_usuario(valores_professor);
                if (cadastro) {
                    const aln = false, prof = true, atv = true;
                    const [cpf, nome, senha, email, titulo] = valores_professor;
                    const hashSenha = await criarHashComSal(senha);
                    const query = 'INSERT INTO usuario(cpf,nome,senha,email,titulo,aluno,professor,ativo) VALUES ($1,$2,$3,$4,$5,$6,$7,$8);';
                    const values = [cpf, nome, hashSenha, email, titulo, aln, prof, atv];

                    const result = await pool.query(query, values);

                    res.status(200).json({ message: "Professor cadastrado com sucesso" });
                } else {
                    res.status(400).json({ error: 'Professor ja cadastrado' });
                }

            } else {
                res.status(400).json({ error: 'Dados Invalidos' });
            }



        } catch (error) {
            res.status(500).json(error);
        }
    }


    static ListarExercicios = async (req, res) => {
        try {
            //mostrar todos exercicios cadastrados no sistema
            const result = await pool.query("SELECT * FROM exercicio;");

            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static CadastrarTreino = async (req, res) => {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const { id_user, id_professor, exercicios } = req.body;

            // Verificar se os dados estão presentes
            if (![id_user, id_professor].every(value => value !== undefined && value !== '') ||
                !Array.isArray(exercicios) ||
                exercicios.length === 0 ||
                !exercicios.every(exercicio =>
                    [exercicio.id_exercicio, exercicio.numero_serie, exercicio.repeticoes, exercicio.carga].every(value => value !== undefined && value !== '')
                )) {
                return res.status(400).json({ error: 'Dados inválidos' });
            }

            // Verifica se o usuário existe
            const qry = 'SELECT nome, cpf, titulo FROM usuario WHERE ativo = TRUE AND id = $1';
            const dados = [id_user];
            const resposta = await client.query(qry, dados);

            // Verifica se o professor existe
            const query_professor = 'SELECT nome, cpf, titulo FROM usuario WHERE professor = TRUE AND ativo = TRUE AND id = $1';
            const dados_professor = [id_professor];
            const resposta_professor = await client.query(query_professor, dados_professor);

            if (resposta.rows.length > 0 && resposta_professor.rows.length > 0) {
                // Adicionar o início do treino na tabela de treino
                const consulta = 'INSERT INTO treino(id_aluno, id_professor) VALUES ($1, $2) RETURNING id_treino';
                const valores_treino = [id_user, id_professor];
                const result_treino = await client.query(consulta, valores_treino);

                // ID do treino recém-inserido
                const id_treino = result_treino.rows[0].id_treino;

                // Construir a query dinamicamente para os exercícios
                let query_exercicios = 'INSERT INTO ex_usuario(id_user, id_exercicio, numero_serie, repeticoes, carga, observacao_ex_usuario) VALUES ';
                const valores_exercicios = [];
                let placeholderIndex = 1;

                exercicios.forEach((exercicio) => {
                    const { id_exercicio, numero_serie, repeticoes, carga, observacao_ex_usuario } = exercicio;
                    query_exercicios += `($${placeholderIndex++}, $${placeholderIndex++}, $${placeholderIndex++}, $${placeholderIndex++}, $${placeholderIndex++}, $${placeholderIndex++}),`;
                    valores_exercicios.push(id_user, id_exercicio, numero_serie, repeticoes, carga, observacao_ex_usuario);
                });

                // Remover a última vírgula
                query_exercicios = query_exercicios.slice(0, -1);

                // Executar a query para os exercícios
                await client.query(query_exercicios, valores_exercicios);

                await client.query('COMMIT');
                res.status(200).json({ message: "Treino cadastrado com sucesso" });
            } else {
                await client.query('ROLLBACK');
                if (resposta.rows.length === 0) {
                    res.status(400).json({ error: 'Usuário não encontrado' });
                } else {
                    res.status(400).json({ error: 'Professor não encontrado ou não ativo' });
                }
            }

        } catch (error) {
            await client.query('ROLLBACK');
            res.status(500).json(error);
        } finally {
            client.release();
        }
    }
}

async function validar_usuario(dados_usuario) {
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
    const [cpf, titulo] = dados_usuario;
    const query = 'SELECT nome,cpf,titulo FROM usuario WHERE ativo = TRUE AND (cpf = $1 OR titulo = $2);';
    const values = [cpf, titulo];
    const result = await pool.query(query, values);


    if (result.rows.length > 0) {

        return false;
    } else {

        return true;
    }
}

async function verifica_existencia_usuario_inativo(dados_usuario) {
    const [cpf] = dados_usuario;
    const query = 'SELECT nome,cpf,titulo FROM usuario WHERE ativo = FALSE AND cpf = $1;';
    const values = [cpf];
    const result = await pool.query(query, values);

    if (result.rows.length == 0) {

        return false;
    } else {

        return true;
    }
}


module.exports = ProfessorController;