const express = require('express');
const { getAllUsersController,
    getUserByIdController,
    createUserController,
    updateUserController,
    deleteUserController } = require('../Controllers/usersController');
const { userValidationRules, validate } = require('../Validators/userValidator');
const router = express.Router();

router.post('/CreateUsers', userValidationRules, validate, createUserController);
router.get('/Getusers', getAllUsersController);
router.get('/userById/:id', getUserByIdController);
router.put('/Updateusers/:id', userValidationRules, validate, updateUserController);
router.delete('/Deleteusers/:id', deleteUserController);

module.exports = router;
