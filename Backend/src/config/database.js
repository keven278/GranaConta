const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '866815',
    database: 'granaconta'
});

conexao.connect((erro) => {
    if (erro) {
        console.log('Erro ao conectar:', erro);
        return;
    }

    console.log('MySQL conectado!');
});

module.exports = conexao;