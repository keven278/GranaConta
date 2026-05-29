const express = require('express');
const router = express.Router();
const TransacaoController = require('../controllers/TransacaoController');

router.get('/', TransacaoController.listarTransacoes);
module.exports = router;