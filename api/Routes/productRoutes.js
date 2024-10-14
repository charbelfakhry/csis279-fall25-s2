const express = require('express');
const { getProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController} = require('../Controllers/productController');
const { productValidationRules, validate } = require('../Validators/productValidator');
const router = express.Router();

router.post('/Createproducts', productValidationRules, validate, createProductController);
router.get('/products', getProductsController);
router.get('/productsbyId/:id', getProductByIdController);
router.put('/Updateproducts/:id', productValidationRules, validate, updateProductController);
router.delete('/DeleteProducts/:id', deleteProductController);

module.exports = router;
