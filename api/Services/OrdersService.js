// CRUD services for the orders table

const db = require('./database');

// Create a new order and inject it into the database
// Here, we assume order_id generation is automated
const createOrder = async (user_id, total_amount, order_address) => {
    const created_at = new Date();
    try {
        const result = await db.query('INSERT INTO orders (user_id, total_amount, order_address, created_at) VALUES ($1, $2, $3, $4)', [user_id, total_amount, order_address, created_at]);
        return result.rowCount > 0;
    } catch (error) {
        console.error('Error creating order:', error);
        throw new Error('Error creating order');
    }
};

// Read all orders from the database
const getAllOrders = async () => {
    try {
        const result = await db.query('SELECT * FROM orders');
        return result.rows;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw new Error('Error fetching orders');
    }
};

// Read orders for a specific user by their id
const getUserOrders = async (userId) => {
    try {
        const result = await db.query('SELECT * FROM orders WHERE user_id = $1', [userId]);
        return result.rows;
    } catch (error) {
        console.error('Error fetching orders for user:', userId, error);
        throw new Error('Error fetching orders');
    }
};

// Update an order attributes
const updateOrder = async (orderId, order_address) => {
    try {
        const result = await db.query('UPDATE orders SET order_address = $1 WHERE order_id = $2', [order_address, orderId]);
        return result.rowCount > 0;
    } catch (error) {
        console.error('Error updating order:', orderId, error);
        throw new Error('Error updating order');
    }
};

// Delete an order from the database
const deleteOrder = async (orderId) => {
    try {
        const result = await db.query('DELETE FROM orders WHERE order_id = $1', [orderId]);
        return result.rowCount > 0;
    } catch (error) {
        console.error('Error deleting order:', orderId, error);
        throw new Error('Error deleting order');
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getUserOrders,
    updateOrder,
    deleteOrder
};