const express = require('express');
const router = express.Router();
const TransacaoController =
require('../controllers/TransacaoController');

// LISTAR
router.get(
    '/',
    TransacaoController.listarTransacoes
);

// CRIAR
router.post(
    '/',
    TransacaoController.criarTransacao
);
module.exports = router;