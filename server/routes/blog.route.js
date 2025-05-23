const express = require('express');
const { createBlogController } = require('../controllers/blog.controller');
const router = express.Router();

router.post('/blog', createBlogController)

module.exports = router;