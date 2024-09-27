const { check } = require('express-validator');
const validate = require('./validatorValidators');

const categoryValidationRules = [
    check('name').notEmpty().withMessage('Category name is required')
];

module.exports = { categoryValidationRules, validate };
