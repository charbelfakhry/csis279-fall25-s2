const OrderDTO = (order) => ({
    id: order.id,
    userId: order.userId,
    total: order.total,
    orderItems: order.orderItems
});

module.exports = OrderDTO;
