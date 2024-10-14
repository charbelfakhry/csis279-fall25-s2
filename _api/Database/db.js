// db.js
const { Client } = require('pg'); // Import pg library for PostgreSQL
const config = require("./config"); // Import configuration

let client; // Declare client variable

// Function to connect to the PostgreSQL database
const connect = async () => {
    try {
        client = new Client(config.db); // Create a new client with the configuration
        await client.connect(); // Connect to the database
        console.log("=================================");
        console.log(`>>>> Connection to ${process.env.DB_NAME} successful`);
        console.log("=================================");
    } catch (error) {
        console.error(`>>> Error connecting to ${process.env.DB_NAME}`, error);
        process.exit(1); // Exit with a failure code
    }
};

// Function to execute a query
const query = async (sql, params) => {
    if (!client) {
        await connect(); 
    }
    try {
        const res = await client.query(sql, params); 
        return res.rows; 
    } catch (error) {
        console.error(`Query error -> ${sql}: ${error}`);
        throw new Error(error); 
    }
};


module.exports = {
    query,
};
