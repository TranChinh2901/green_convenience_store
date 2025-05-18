const express = require('express');
const { createProductController } = require('../controllers/product.controller');
const router = express.Router();

router.post('/product', createProductController)

module.exports = router;