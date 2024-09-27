const bcrypt = require('bcrypt');
const db = require('../db');

// Utility function to validate user input
const validateUser = (user) => {
  const errors = [];
  if (!user.username || user.username.length < 3 || user.username.length > 30) {
    errors.push('Username must be between 3 and 30 characters long.');
  }
  if (!user.user_email || !/\S+@\S+\.\S+/.test(user.user_email)) {
    errors.push('Invalid email format.');
  }
  if (!user.user_password || user.user_password.length < 6) {
    errors.push('Password must be at least 6 characters long.');
  }
  return errors;
};

// Service to fetch all users
const getAllUsersService = async () => {
  try {
    const result = await db.query(
      'SELECT user_id, username, user_email, user_address, user_phone_number, created_at FROM users ORDER BY user_id ASC'
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw new Error('Error fetching users');
  }
};

// Service to fetch a user by ID
const getUserByIdService = async (user_id) => {
  try {
    const result = await db.query('SELECT * FROM users WHERE user_id = $1', [parseInt(user_id)]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching user with ID ${user_id}:`, error);
    throw new Error('Error fetching user');
  }
};

// Service to create a new user
const createUserService = async (user) => {
  try {
    const hashedPassword = await bcrypt.hash(user.user_password, 10); // Hash the password
    const result = await db.query(
      'INSERT INTO users (username, user_email, user_password, user_address, user_phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [user.username, user.user_email, hashedPassword, user.user_address, user.user_phone_number]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Error creating user');
  }
};

// Service to update a user
const updateUserService = async (user_id, user) => {
  try {
    const result = await db.query(
      'UPDATE users SET username = $1, user_email = $2, user_address = $3, user_phone_number = $4 WHERE user_id = $5 RETURNING *',
      [user.username, user.user_email, user.user_address, user.user_phone_number, parseInt(user_id)]
    );
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating user with ID ${user_id}:`, error);
    throw new Error('Error updating user');
  }
};

// Service to delete a user
const deleteUserService = async (user_id) => {
  try {
    const result = await db.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [parseInt(user_id)]);
    return result.rowCount > 0; // Return true if a user was deleted, false otherwise
  } catch (error) {
    console.error(`Error deleting user with ID ${user_id}:`, error);
    throw new Error('Error deleting user');
  }
};

module.exports = {
  validateUser,
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService,
};
