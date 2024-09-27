const express = require('express');
const { createCategory, getCategoryById, updateCategory, deleteCategory, getAllCategories } = require('../controllers/categoryController');
const { categoryValidationRules, validate } = require('../Validators/categoryValidator');
const router = express.Router();

router.post('/categories', categoryValidationRules, validate, createCategory);
router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategoryById);
router.put('/categories/:id', categoryValidationRules, validate, updateCategory);
router.delete('/categories/:id', deleteCategory);

module.exports = router;
