const express = require('express');
const { createUser, getUserById, updateUser, deleteUser, getAllUsers } = require('../controllers/userController');
const { userValidationRules, validate } = require('../Validators/userValidator');
const router = express.Router();

router.post('/users', userValidationRules, validate, createUser);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', userValidationRules, validate, updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
