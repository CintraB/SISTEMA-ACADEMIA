const { query } = require("express");
const pool = require("../config/dbConnect.js");
const jwt = require('jsonwebtoken');
const { decode } = jwt;

class AlunoController {
    static ListarExercicio = async (req, res) => {
        try {
            //req.usuario ID passado pelo validador JWT 
            //mostrar quando treino foi criado.
            const query_treino_criado = "SELECT * FROM treino WHERE id_aluno = $1 AND ativo = true;";
            const valores_treino_criado = [req.usuario];
            const result = await pool.query(query_treino_criado,valores_treino_criado);

            //mostrar treino atual ativo
            const query_treino_atual = "SELECT eu.id_exercicio, eu.numero_serie, eu.carga, eu.repeticoes, eu.observacao_ex_usuario, e.nome_exercicio FROM ex_usuario eu JOIN exercicio e ON eu.id_exercicio = e.id_exercicio WHERE eu.id_user = $1 AND eu.ativo = true;";
            const valores_treino_atual = [req.usuario];
            const result_ativo = await pool.query(query_treino_atual,valores_treino_atual);
            const treino_atual = result_ativo.rows;

            res.status(200).json({treino: result.rows,treino_atual});
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static PedirNovoTreino = async (req,res) => {
        try {
            const observacao = req.body.observacao;
            const id_aluno = req.usuario;
            
            //verificar usuario existente
            const query_valida = 'SELECT id, nome, cpf, email, titulo, aluno, professor, ativo FROM usuario WHERE id = $1 AND ativo = true;';
            const result = await pool.query(query_valida,[id_aluno]);

            if(result.rows.length > 0 && result.rows[0].ativo == true){
                
                //validar pedido de treino existente aberto
                const query_treino_aberto = 'SELECT id_aluno, ativo, created_at FROM pedido_treino WHERE id_aluno = $1 AND ativo = true';
                const validador = await pool.query(query_treino_aberto,[id_aluno]);
                
                if(validador.rows.length == 0){
                    //cadastrar novo pedido de treino
                    const query_pedido = 'INSERT INTO pedido_treino(id_aluno,observacao,ativo) VALUES ($1,$2,true);';
                    await pool.query(query_pedido,[id_aluno,observacao]);
                    res.status(200).json({ message: 'Pedido realizado com sucesso' });
                }else{
                    res.status(404).json({ message: 'Já existe um pedido de treino em aberto' });
                }
                
            }else{
                res.status(404).json({ message: 'Aluno não encontrado ou inativo' });
            }
            
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = AlunoController;