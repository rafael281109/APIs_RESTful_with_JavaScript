const db = require('../services/database_connection');

const getUsuarios = async (req, res) => {
    try{
        const [rows] = await db.query('SELECT * FROM usuarios');
        res.json({sucesso: true,
            dados: rows
        });
    } catch(erro) {
        console.error(erro);
        res.status(500).json({sucesso: false, mensagem: "Erro ao acessar o banco"})
    }
};
module.exports = {
    getUsuarios
}