const express = require('express');
const { createBlogController, getAllBlogController, getBlogByIdController, deleteBlogController } = require('../controllers/blog.controller');
const router = express.Router();

router.post('/blog', createBlogController)
router.get('/blog', getAllBlogController)
router.get('/blog/:id', getBlogByIdController)
router.delete('/blog/:id', deleteBlogController)

module.exports = router;