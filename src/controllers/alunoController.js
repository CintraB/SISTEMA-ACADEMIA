const { query } = require("express");
const pool = require("../config/dbConnect.js");
const criarHashComSal = require("../middlewares/HashcomSal.js");

class AlunoController { 
    static ListarExercicio = async (req,res) => {
        try {
            
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = AlunoController;