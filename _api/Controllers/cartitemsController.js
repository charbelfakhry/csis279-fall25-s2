const {
    createCartItem,
    getAllCartItems,
    getUserCartItems,
    updateCartItem,
    deleteCartItem
} = require('../Services/CartItemsService');

// Get all cart items
const getAllCartItemsController = async (req, res) => {
    try {
        const cartItems = await getAllCartItems();
        res.status(200).json({ cartItems });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

// Get cart items by user ID
const getUserCartItemsController = async (req, res) => {
    try {
        const { user_id } = req.params; 
        const cartItems = await getUserCartItems(user_id);

        if (cartItems.length) {
            res.status(200).json({ cartItems });
        } else {
            res.status(404).json({ message: 'No cart items found for this user' });
        }
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

// Create a new cart item
const createCartItemController = async (req, res) => {
    try {
        const { user_id, product_id, quantity } = req.body; // Extract data from request body
        const newCartItem = await createCartItem(user_id, product_id, quantity);

        if (newCartItem) {
            res.status(201).json({ message: 'Cart item created successfully' });
        } else {
            res.status(400).json({ message: 'Failed to create cart item' });
        }
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

// Update an existing cart item
const updateCartItemController = async (req, res) => {
    try {
        const { cart_item_id } = req.params; // Extract cart_item_id from URL parameters
        const { quantity } = req.body; // Extract updated quantity from request body

        const updatedCartItem = await updateCartItem(cart_item_id, quantity);

        if (updatedCartItem) {
            res.status(200).json({ message: 'Cart item updated successfully' });
        } else {
            res.status(404).json({ message: 'Cart item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

// Delete a cart item
const deleteCartItemController = async (req, res) => {
    try {
        const { cart_item_id } = req.params; // Extract cart_item_id from URL parameters

        const deleted = await deleteCartItem(cart_item_id);

        if (deleted) {
            res.status(200).json({ message: 'Cart item deleted successfully' });
        } else {
            res.status(404).json({ message: 'Cart item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

module.exports = {
    getAllCartItemsController,
    getUserCartItemsController,
    createCartItemController,
    updateCartItemController,
    deleteCartItemController,
};
