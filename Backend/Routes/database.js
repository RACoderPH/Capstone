const mysql = require("mysql2");
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });
  
  // Establish the database connection
  db.connect((err) => {
    if (err) {
      console.error('Failed to connect to the database:', err);
    } else {
      console.log('Connected to the database');
    }
  });

  module.exports = db;