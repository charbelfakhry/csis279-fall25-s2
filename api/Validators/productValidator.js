const { check } = require('express-validator');
const validate = require('./validatorValidators');

const productValidationRules = [
    check('name').notEmpty().withMessage('Product name is required'),
    check('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    check('categoryId').notEmpty().withMessage('Category ID is required')
];

module.exports = { productValidationRules, validate };