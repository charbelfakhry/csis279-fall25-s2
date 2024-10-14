const { check } = require('express-validator');
const validate = require('./validatorValidators');

const cartValidationRules = [
    check('userId').notEmpty().withMessage('User ID is required'),
    check('productId').notEmpty().withMessage('Product ID is required'),
    check('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
];

module.exports = { cartValidationRules, validate };
