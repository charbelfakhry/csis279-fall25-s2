const express = require('express');
const { addCartItem, getCartItemsByUserId, updateCartItem, deleteCartItem, getAllCartItems } = require('../controllers/cartController');
const { cartValidationRules, validate } = require('../Validators/cartValidator');
const router = express.Router();

router.post('/cart-items', cartValidationRules, validate, addCartItem);
router.get('/cart-items', getAllCartItems);
router.get('/cart-items/:userId', getCartItemsByUserId);
router.put('/cart-items/:id', cartValidationRules, validate, updateCartItem);
router.delete('/cart-items/:id', deleteCartItem);

module.exports = router;
