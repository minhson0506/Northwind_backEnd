require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const filepath = process.env.DB_FILEPATH;
const fs = require("fs");

const createDbConnection = () => {
    if (fs.existsSync(`${__dirname}/northwind.db`)) {
        console.log('Database file exists');
        const db = new sqlite3.Database(filepath);
        return db;
    } else {
        console.log('Database file does not exist');
        // const db = new sqlite3.Database(filepath, (err: {message: any;}) => {
        //     if (err) {
        //         console.log('Error creating database file');
        //         return console.error(err.message);
        //     } else {
        //         console.log('Database file created');
        //     }
        // });
        // return db;
        return null;
    }
};

export default createDbConnection;