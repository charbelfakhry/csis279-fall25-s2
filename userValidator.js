const { check } = require('express-validator');
const validate = require('./validatorValidators');

const userValidationRules = [
    check('email').isEmail().withMessage('Must be a valid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('name').notEmpty().withMessage('Name is required')
];

module.exports = { userValidationRules, validate };
