// config.js
require("dotenv").config(); // Load environment variables from .env file

const config = {
    db: {
        host: process.env.DB_HOST || 'localhost', // Default to 'localhost' if DB_HOST is not set
        user: process.env.DB_USER,                 // User from .env
        port: process.env.DB_PORT || 5432,         // Default port is 5432 for PostgreSQL
        password: process.env.DB_PASS,             // Password from .env
        database: process.env.DB_NAME,             // Database name from .env
    }
};

module.exports = config; // Export the config object for use in other modules
