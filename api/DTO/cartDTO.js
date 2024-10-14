const CartItemDTO = (cartItem) => ({
    id: cartItem.id,
    userId: cartItem.userId,
    productId: cartItem.productId,
    quantity: cartItem.quantity
});

module.exports = CartItemDTO;
