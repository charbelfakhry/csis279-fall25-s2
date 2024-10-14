// CRUD services for the Cart_items table

const db = require('./database');

// Create a new cart item and inject it into the database
// Here, we assume Cart_item_id generation is automated
const createCartItem = async (user_id, product_id, quantity) => {
    try {
        const result = await db.query
            (
                'INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3)', [user_id, product_id, quantity]
            );
        return result.rowCount > 0;
    } catch (error) {
        console.error('Error creating cart item:', error);
        throw new Error('Error creating cart item');
    }
};

// Read all cart items from the database
const getAllCartItems = async () => {
    try {
        const result = await db.query('SELECT * FROM cart_items');
        return result.rows;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        throw new Error('Error fetching cart items');
    }
};

// Read cart items for a specific user
const getUserCartItems = async (userId) => {
    try {
        const result = await db.query('SELECT * FROM cart_items WHERE user_id = $1', [userId]);
        return result.rows;
    } catch (error) {
        console.error('Error fetching cart items for user:', userId, error);
        throw new Error('Error fetching cart items');
    }
};

// Update a cart item
const updateCartItem = async (cartItemId, quantity) => {
    try {
        const result = await db.query
            (
                'UPDATE cart_items SET quantity = $1 WHERE cart_item_id = $2', [quantity, cartItemId]
            );
        return result.rowCount > 0;
    } catch (error) {
        console.error('Error updating cart item:', cartItemId, error);
        throw new Error('Error updating cart item');
    }
};

// Delete a cart item
const deleteCartItem = async (cartItemId) => {
    try {
        const result = await db.query('DELETE FROM cart_items WHERE cart_item_id = $1', [cartItemId]);
        return result.rowCount > 0;
    } catch (error) {
        console.error('Error deleting cart item:', cartItemId, error);
        throw new Error('Error deleting cart item');
    }
};

module.exports = {
    createCartItem,
    getAllCartItems,
    getUserCartItems,
    updateCartItem,
    deleteCartItem
};