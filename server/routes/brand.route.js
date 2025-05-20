const express = require('express');
const {
    createBrandController,
    getALlBrandController,
    getBrandBySlugController,
    updateBrandController
} = require('../controllers/brand.controller');
const { isAdmin, requireSignIn } = require('../middlewares/middleware');
const router = express.Router();

router.post('/brand', requireSignIn, isAdmin, createBrandController)
router.get('/brands', getALlBrandController)
router.get('/brand/:slug', getBrandBySlugController)
router.put('/brand/:id', requireSignIn, isAdmin, updateBrandController)

module.exports = router;