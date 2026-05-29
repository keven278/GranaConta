const usuarioRoutes = require('./routes/usuarioRoutes');
const transacaoRoutes = require('./routes/transacaoRoutes');
const metaRoutes = require('./routes/metaRoutes');
const express = require('express');
require('./config/database');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/transacoes', transacaoRoutes);
app.use('/metas', metaRoutes);

app.get('/', (req, res) => {
    res.json({
        mensagem: "API funcionando"
    });
});

module.exports = app;