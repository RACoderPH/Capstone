const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const bcrypt = require('bcrypt');
function register(){
    app.post('/register', (req, res) => {
        const fullname = req.body.fullname;
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
      
        const checkUsernameQuery = 'SELECT * FROM user_info WHERE user_name = ?';
        db.query(checkUsernameQuery, [username], (err, result) => {
          if (err) {
            console.error('Failed to check username:', err);
            res.send({ message: 'Server error' });
          } else {
            if (result.length > 0) {
              // User already exists
              res.send({ message: 'Username already exists' });
            } else {
              // Username is available, proceed with registration
              bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
                if (hashErr) {
                  console.error('Failed to hash password:', hashErr);
                  res.send({ message: 'Server errorr' });
                } else {
                  const position = 'Admin';
                  const status = 'Offline';
                  const emp_id = "";
                  const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
                  const insertUserQuery = 'INSERT INTO user_info (Fullname,user_name, Email,stud_no, Password, created_at,position,status) VALUES (?, ?, ?,?, ?, ?,?,?)';
                  db.query(insertUserQuery, [fullname,username, email,emp_id, hashedPassword, createdAt,position,status], (insertErr, insertResult) => {
                    if (insertErr) {
                      console.error('Failed to register user:', insertErr);
                      res.send({ message: 'Server error' });
                    } else {
                      res.send({ message: 'User registered successfully' });
                    }
                  });
                }
              });
            }
          }
        });
      });
}
