const { check } = require('express-validator');
const validate = require('./validatorValidators');

const reviewValidationRules = [
    check('userId').notEmpty().withMessage('User ID is required'),
    check('productId').notEmpty().withMessage('Product ID is required'),
    check('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    check('comment').notEmpty().withMessage('Comment is required')
];

module.exports = { reviewValidationRules, validate };