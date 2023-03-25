import CustomError from "../classes/CustomError";

require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const filepath = `${__dirname}/northwind.db`;
const fs = require("fs");

// create connection to database
const createDbConnection = () => {
    // check if database file exists
    if (fs.existsSync(filepath)) {
        console.log('Database file exists');
        const db = new sqlite3.Database(filepath);
        return db;
    } else {
        throw new CustomError('Database file does not exist', 500);
    }
};

export default createDbConnection;