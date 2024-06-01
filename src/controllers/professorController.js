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
}


module.exports = ProfessorController;