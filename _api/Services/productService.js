const db = require('../db');

// Utility function to validate product input
const validateProduct = (product) => {
  const errors = [];
  if (!product.product_name || product.product_name.length < 3 || product.product_name.length > 100) {
    errors.push('Product name must be between 3 and 100 characters long.');
  }
  if (typeof product.price !== 'number' || product.price <= 0) {
    errors.push('Price must be a positive number.');
  }
  if (typeof product.stock_quantity !== 'number' || product.stock_quantity < 0) {
    errors.push('Stock quantity must be a non-negative number.');
  }
  if (!product.category_id) {
    errors.push('Category ID is required.');
  }
  return errors;
};

// Service to fetch all products
const getProductsService = async () => {
  try {
    const result = await db.query('SELECT * FROM products ORDER BY product_id ASC');
    return result.rows;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error fetching products'); // Throw error so it can be handled by the calling function
  }
};

// Service to fetch a product by ID
const getProductByIdService = async (product_id) => {
  try {
    const result = await db.query('SELECT * FROM products WHERE product_id = $1', [parseInt(product_id)]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching product with ID ${product_id}:`, error);
    throw new Error('Error fetching product');
  }
};

// Service to create a new product
const createProductService = async (product) => {
  try {
    const { product_name, description, price, stock_quantity, category_id } = product;
    const result = await db.query(
      'INSERT INTO products (product_name, description, price, stock_quantity, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [product_name, description, price, stock_quantity, category_id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Error creating product');
  }
};

// Service to update a product
const updateProductService = async (product_id, product) => {
  try {
    const { product_name, description, price, stock_quantity, category_id } = product;
    const result = await db.query(
      'UPDATE products SET product_name = $1, description = $2, price = $3, stock_quantity = $4, category_id = $5 WHERE product_id = $6 RETURNING *',
      [product_name, description, price, stock_quantity, category_id, parseInt(product_id)]
    );
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating product with ID ${product_id}:`, error);
    throw new Error('Error updating product');
  }
};

// Service to delete a product
const deleteProductService = async (product_id) => {
  try {
    const result = await db.query('DELETE FROM products WHERE product_id = $1 RETURNING *', [parseInt(product_id)]);
    return result.rowCount > 0;
  } catch (error) {
    console.error(`Error deleting product with ID ${product_id}:`, error);
    throw new Error('Error deleting product');
  }
};

module.exports = {
  validateProduct,
  getProductsService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService,
};
