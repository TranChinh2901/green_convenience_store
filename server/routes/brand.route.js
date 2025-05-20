const express = require('express');
const {
    createBrandController,
    getALlBrandController,
    getBrandBySlugController,
    updateBrandController,
    deleteBrandController
} = require('../controllers/brand.controller');
const { isAdmin, requireSignIn } = require('../middlewares/middleware');
const router = express.Router();

router.post('/brand', requireSignIn, isAdmin, createBrandController)
router.get('/brands', getALlBrandController)
router.get('/brand/:slug', getBrandBySlugController)
router.put('/brand/:id', requireSignIn, isAdmin, updateBrandController)
router.delete('/brand/:id', requireSignIn, isAdmin, deleteBrandController)
module.exports = router;