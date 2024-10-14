const {
    createOrder,
    getAllOrders,
    getUserOrders,
    updateOrder,
    deleteOrder
} = require('../Services/OrdersService');

// Get all orders
const getAllOrdersController = async (req, res) => {
    try {
        const orders = await getAllOrders();
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

// Get orders by user ID
const getUserOrdersController = async (req, res) => {
    try {
        const { user_id } = req.params; // Extract user_id from the URL parameters
        const orders = await getUserOrders(user_id);

        if (orders.length) {
            res.status(200).json({ orders });
        } else {
            res.status(404).json({ message: 'No orders found for this user' });
        }
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

// Create a new order
const createOrderController = async (req, res) => {
    try {
        const { user_id, total_amount, order_address } = req.body; // Extract data from request body
        const newOrder = await createOrder(user_id, total_amount, order_address);

        if (newOrder) {
            res.status(201).json({ message: 'Order created successfully' });
        } else {
            res.status(400).json({ message: 'Failed to create order' });
        }
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

// Update an existing order
const updateOrderController = async (req, res) => {
    try {
        const { order_id } = req.params; // Extract order_id from URL parameters
        const { order_address } = req.body; // Extract updated address from request body

        const updatedOrder = await updateOrder(order_id, order_address);

        if (updatedOrder) {
            res.status(200).json({ message: 'Order updated successfully' });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

// Delete an order
const deleteOrderController = async (req, res) => {
    try {
        const { order_id } = req.params; // Extract order_id from URL parameters

        const deleted = await deleteOrder(order_id);

        if (deleted) {
            res.status(200).json({ message: 'Order deleted successfully' });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

module.exports = {
    getAllOrdersController,
    getUserOrdersController,
    createOrderController,
    updateOrderController,
    deleteOrderController,
};
