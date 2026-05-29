const conexao = require('../config/database');

// LISTAR USUÁRIOS
exports.listarUsuarios = (req, res) => {

    const sql = 'SELECT * FROM usuarios';

    conexao.query(sql, (erro, resultados) => {

        if (erro) {
            return res.status(500).json({
                erro: erro.message
            });
        }

        res.json(resultados);

    });

};

// CRIAR USUÁRIO
exports.criarUsuario = (req, res) => {

    const { nome, email, senha, rendaMensal } = req.body;

    const sql = `
        INSERT INTO usuarios
        (nome, email, senha, rendaMensal)
        VALUES (?, ?, ?, ?)
    `;

    conexao.query(
        sql,
        [nome, email, senha, rendaMensal],
        (erro, resultado) => {

            if (erro) {
                return res.status(500).json({
                    erro: erro.message
                });
            }

            res.json({
                mensagem: 'Usuário criado',
                id: resultado.insertId
            });

        }
    );

};

// LOGIN
exports.login = (req, res) => {

    const { email, senha } = req.body;

    const sql =
        'SELECT * FROM usuarios WHERE email = ? AND senha = ?';

    conexao.query(
        sql,
        [email, senha],
        (erro, resultado) => {

            if (erro) {
                return res.status(500).json({
                    erro: erro.message
                });
            }

            if (resultado.length === 0) {
                return res.status(401).json({
                    mensagem: 'Email ou senha inválidos'
                });
            }

            res.json(resultado[0]);

        }
    );

};