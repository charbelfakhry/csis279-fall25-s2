const ProductDTO = (product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    categoryId: product.categoryId
});

module.exports = ProductDTO;
