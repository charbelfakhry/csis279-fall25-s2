const express = require('express');
const { createOrder, getOrderById, updateOrder, deleteOrder, getAllOrders } = require('../controllers/orderController');
const { orderValidationRules, validate } = require('../Validators/orderValidator');
const router = express.Router();

router.post('/orders', orderValidationRules, validate, createOrder);
router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);
router.put('/orders/:id', orderValidationRules, validate, updateOrder);
router.delete('/orders/:id', deleteOrder);

module.exports = router;
