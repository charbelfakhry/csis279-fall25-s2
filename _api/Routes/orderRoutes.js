const express = require('express');
const { getAllOrdersController,
    getUserOrdersController,
    createOrderController,
    updateOrderController,
    deleteOrderController, } = require('../Controllers/ordersController');
const { orderValidationRules, validate } = require('../Validators/orderValidator');
const router = express.Router();

router.post('/Createorders', orderValidationRules, validate, createOrderController);
router.get('/getorders', getAllOrdersController);
router.get('/ordersbyId/:id', getUserOrdersController);
router.put('/Updateorders/:id', orderValidationRules, validate, updateOrderController);
router.delete('/Deleteorders/:id', deleteOrderController);

module.exports = router;
