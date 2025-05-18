const express = require('express');
const { createCategory } = require('../controllers/category.controller');
const { isAdmin, requireSignIn } = require('../middlewares/middleware');
const router = express.Router();

router.post('category', requireSignIn, isAdmin, createCategory)

module.exports = router;