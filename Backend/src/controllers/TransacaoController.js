const conexao = require('../config/database');
exports.listarTransacoes = (req, res) => {
    const sql = 'SELECT * FROM transacoes';
    conexao.query(sql, (erro, resultados) => {
        if (erro) {
            return res.status(500).json({
                erro: erro.message
            });

        }
        res.json(resultados);
    });

};

// CRIAR TRANSAÇÃO
exports.criarTransacao = (req, res) => {
    const {
        descricao,
        valor,
        tipo,
        data,
        usuario_id
    } = req.body;
    const sql = `
        INSERT INTO transacoes
        (descricao, valor, tipo, data, usuario_id)
        VALUES (?, ?, ?, ?, ?)
    `;
    conexao.query(
        sql,
        [
            descricao,
            valor,
            tipo,
            data,
            usuario_id
        ],
        (erro, resultado) => {
            if (erro) {
                return res.status(500).json({
                    erro: erro.message
                });

            }
            res.json({
                mensagem: 'Transação criada',
                id: resultado.insertId
            });
        }
    );
};