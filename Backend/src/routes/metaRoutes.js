const express = require('express');
const router = express.Router();
const MetaController = require('../controllers/MetaController');

router.get('/', MetaController.listarMetas);
module.exports = router;