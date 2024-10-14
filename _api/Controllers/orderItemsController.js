const {
    createOrderItem,
    getAllOrderItems,
    getOrderItemsByOrderId,
    updateOrderItem,
    deleteOrderItem
} = require('../Services/OrderItemsService');

// Get all order items
const getAllOrderItemsController = async (req, res) => {
    try {
        const orderItems = await getAllOrderItems();
        res.status(200).json({ orderItems });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

// Get order items by order ID
const getOrderItemsByOrderIdController = async (req, res) => {
    try {
        const { order_id } = req.params; // Extract order_id from the URL parameters
        const orderItems = await getOrderItemsByOrderId(order_id);

        if (orderItems.length) {
            res.status(200).json({ orderItems });
        } else {
            res.status(404).json({ message: 'No order items found for this order' });
        }
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

// Create a new order item
const createOrderItemController = async (req, res) => {
    try {
        const { order_id, product_id, quantity, price_at_purchase } = req.body; // Extract data from request body
        const newOrderItem = await createOrderItem(order_id, product_id, quantity, price_at_purchase);

        if (newOrderItem) {
            res.status(201).json({ message: 'Order item created successfully' });
        } else {
            res.status(400).json({ message: 'Failed to create order item' });
        }
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

// Update an existing order item
const updateOrderItemController = async (req, res) => {
    try {
        const { order_item_id } = req.params; // Extract order_item_id from URL parameters
        const { quantity } = req.body; // Extract updated quantity from request body

        const updatedOrderItem = await updateOrderItem(order_item_id, quantity);

        if (updatedOrderItem) {
            res.status(200).json({ message: 'Order item updated successfully' });
        } else {
            res.status(404).json({ message: 'Order item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

// Delete an order item
const deleteOrderItemController = async (req, res) => {
    try {
        const { order_item_id } = req.params; // Extract order_item_id from URL parameters

        const deleted = await deleteOrderItem(order_item_id);

        if (deleted) {
            res.status(200).json({ message: 'Order item deleted successfully' });
        } else {
            res.status(404).json({ message: 'Order item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

module.exports = {
    getAllOrderItemsController,
    getOrderItemsByOrderIdController,
    createOrderItemController,
    updateOrderItemController,
    deleteOrderItemController,
};
