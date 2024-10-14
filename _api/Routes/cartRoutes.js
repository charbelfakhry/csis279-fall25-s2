const express = require('express');
const {  getAllCartItemsController,
    getUserCartItemsController,
    createCartItemController,
    updateCartItemController,
    deleteCartItemController, } = require('../Controllers/cartitemsController');
const { cartValidationRules, validate } = require('../Validators/cartValidator');
const router = express.Router();

router.post('/Createcart-items', cartValidationRules, validate, createCartItemController);
router.get('/GetAllcart-items', getAllCartItemsController);
router.get('/Getcart-itemsBy-User-Id/:userId', getUserCartItemsController);
router.put('/UpdateCart-items/:id', cartValidationRules, validate, updateCartItemController);
router.delete('/DeleteCart-items/:id', deleteCartItemController);

module.exports = router;
