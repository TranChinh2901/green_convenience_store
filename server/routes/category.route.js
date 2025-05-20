const express = require('express');
const {
    createCategory,
    getAllCategory,
    updateCategory,
    deleteCategory,
    getCategoryBySlug
} = require('../controllers/category.controller');
const { isAdmin, requireSignIn } = require('../middlewares/middleware');
const router = express.Router();

router.post('/category', requireSignIn, isAdmin, createCategory)
router.get('/categories', getAllCategory)
router.put('/category/:id', requireSignIn, isAdmin, updateCategory)
router.delete('/category/:id', requireSignIn, isAdmin, deleteCategory)
router.get('/category/:slug', getCategoryBySlug)

module.exports = router;