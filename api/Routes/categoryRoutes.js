const express = require('express');
const { getCategoriesController,
    getCategoryByIdController,
    createCategoryController,
    updateCategoryController,
    deleteCategoryController } = require('../Controllers/categoryController');
const { categoryValidationRules, validate } = require('../Validators/categoryValidator');
const router = express.Router();

router.post('/createCategories', categoryValidationRules, validate, createCategoryController);
router.get('/getcategories', getCategoriesController);
router.get('/categories/:id', getCategoryByIdController);
router.put('/UpdateCategories/:id', categoryValidationRules, validate, updateCategoryController);
router.delete('/DeleteCategories/:id', deleteCategoryController);

module.exports = router;
