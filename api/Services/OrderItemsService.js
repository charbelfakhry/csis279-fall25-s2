// CRUD services for the Order_items table

const db = require('./database');

// Create a new order item
// Here, we assume that order_items_id generation is automated
const createOrderItem = async (order_id, product_id, quantity, price_at_purchase) => {
    try {
        const result = await db.query
            (
                'INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES ($1, $2, $3, $4)',
                [order_id, product_id, quantity, price_at_purchase]
            );
        return result.rowCount > 0;
    } catch (error) {
        console.error('Error creating order item:', error);
        throw new Error('Error creating order item');
    }
};

// Read all order items from the database
const getAllOrderItems = async () => {
    try {
        const result = await db.query('SELECT * FROM order_items');
        return result.rows;
    } catch (error) {
        console.error('Error fetching order items:', error);
        throw new Error('Error fetching order items');
    }
};

// Read order items for a specific order
const getOrderItemsByOrderId = async (orderId) => {
    try {
        const result = await db.query('SELECT * FROM order_items WHERE order_id = $1', [orderId]);
        return result.rows;
    } catch (error) {
        console.error('Error fetching order items for order:', orderId, error);
        throw new Error('Error fetching order items');
    }
};

// Update an order item attributes
const updateOrderItem = async (orderItemId, quantity) => {
    try {
        const result = await db.query
            ('UPDATE order_items SET quantity = $1 WHERE order_item_id = $2', [quantity, orderItemId]);
        return result.rowCount > 0;
    } catch (error) {
        console.error('Error updating order item:', orderItemId, error);
        throw new Error('Error updating order item');
    }
};

// Delete an order item from the database
const deleteOrderItem = async (orderItemId) => {
    try {
        const result = await db.query('DELETE FROM order_items WHERE order_item_id = $1', [orderItemId]);
        return result.rowCount > 0;
    } catch (error) {
        console.error('Error deleting order item:', orderItemId, error);
        throw new Error('Error deleting order item');
    }
};

module.exports = {
    createOrderItem,
    getAllOrderItems,
    getOrderItemsByOrderId,
    updateOrderItem,
    deleteOrderItem
};