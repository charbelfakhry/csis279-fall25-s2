const express = require('express');
const { createProduct, getProductById, updateProduct, deleteProduct, getAllProducts } = require('../controllers/productController');
const { productValidationRules, validate } = require('../Validators/productValidator');
const router = express.Router();

router.post('/products', productValidationRules, validate, createProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', productValidationRules, validate, updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;
