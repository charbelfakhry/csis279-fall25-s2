const { check } = require('express-validator');
const validate = require('./validatorValidators');

const orderValidationRules = [
    check('userId').notEmpty().withMessage('User ID is required'),
    check('total').isFloat({ gt: 0 }).withMessage('Total must be greater than 0')
];

module.exports = { orderValidationRules, validate };