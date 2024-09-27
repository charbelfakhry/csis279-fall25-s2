const db = require('../db'); // Import the database connection

/**
 * Validates the category input.
 * @param {Object} category - The category object to validate.
 * @returns {Array} An array of error messages, if any.
 */
const validateCategory = (category) => {
  const errors = [];
  if (!category.category_name || category.category_name.length < 3 || category.category_name.length > 100) {
    errors.push('Category name must be between 3 and 100 characters long.');
  }
  return errors;
};

/**
 * Fetches all categories from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of categories.
 */
const getCategories = async () => {
  try {
    const result = await db.query('SELECT * FROM categories ORDER BY category_id ASC');
    return result.rows;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Unable to fetch categories');
  }
};

/**
 * Fetches a category by its ID.
 * @param {number} category_id - The ID of the category to fetch.
 * @returns {Promise<Object|null>} A promise that resolves to the category object, or null if not found.
 */
const getCategoryById = async (category_id) => {
  try {
    const result = await db.query('SELECT * FROM categories WHERE category_id = $1', [parseInt(category_id)]);
    return result.rows.length ? result.rows[0] : null;
  } catch (error) {
    console.error('Error fetching category:', error);
    throw new Error('Unable to fetch category');
  }
};

/**
 * Creates a new category in the database.
 * @param {string} category_name - The name of the category to create.
 * @returns {Promise<Object>} A promise that resolves to the created category object.
 */
const createCategory = async (category_name) => {
  try {
    const result = await db.query(
      'INSERT INTO categories (category_name) VALUES ($1) RETURNING *',
      [category_name]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating category:', error);
    throw new Error('Unable to create category');
  }
};

/**
 * Updates an existing category by its ID.
 * @param {number} category_id - The ID of the category to update.
 * @param {string} category_name - The new name of the category.
 * @returns {Promise<Object|null>} A promise that resolves to the updated category object, or null if not found.
 */
const updateCategory = async (category_id, category_name) => {
  try {
    const result = await db.query(
      'UPDATE categories SET category_name = $1 WHERE category_id = $2 RETURNING *',
      [category_name, parseInt(category_id)]
    );
    return result.rows.length ? result.rows[0] : null;
  } catch (error) {
    console.error('Error updating category:', error);
    throw new Error('Unable to update category');
  }
};

/**
 * Deletes a category by its ID.
 * @param {number} category_id - The ID of the category to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if deleted, false if not found.
 */
const deleteCategory = async (category_id) => {
  try {
    const result = await db.query('DELETE FROM categories WHERE category_id = $1 RETURNING *', [parseInt(category_id)]);
    return result.rowCount > 0;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw new Error('Unable to delete category');
  }
};

// Exported service methods
module.exports = {
  validateCategory,
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
