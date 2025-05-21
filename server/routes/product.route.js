const express = require('express');
const { createProductController, getAllProductsController, deleteProductController, updateProductController, productFiltersController, getProductByIdController, getProductBySlugController } = require('../controllers/product.controller');
const { requireSignIn, isAdmin } = require('../middlewares/middleware');
const formidable = require('express-formidable');
const router = express.Router();

router.post('/product', requireSignIn, isAdmin, formidable(), createProductController)
router.get('/products', getAllProductsController)
router.delete('/product/:pId', requireSignIn, isAdmin, deleteProductController)
router.put('/product/:pId', requireSignIn, isAdmin, formidable(), updateProductController)
router.post("/product-filters", productFiltersController);
router.get('/product/:pId', getProductByIdController)
router.get('/product/:slug', getProductBySlugController)
module.exports = router;