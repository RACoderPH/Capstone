const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors());

// Connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'mindmattersdb',
});

// Establish the database connection
db.connect((err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});

//For register user query
const bcrypt = require('bcrypt');

// ...

app.post('/register', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const checkUsernameQuery = 'SELECT * FROM user_tb WHERE user_name = ?';
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
            res.send({ message: 'Server error' });
          } else {
            const position = 'Admin';
            const status = 'Offline';
            const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const insertUserQuery = 'INSERT INTO user_tb (user_name, Email, Password, created_at,position,status) VALUES (?, ?, ?, ?,?,?)';
            db.query(insertUserQuery, [username, email, hashedPassword, createdAt,position,status], (insertErr, insertResult) => {
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


//For app Register
app.post('/register/app', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const checkUsernameQuery = 'SELECT * FROM user_tb WHERE user_name = ?';
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
            res.send({ message: 'Server error' });
          } else {
            const position = 'Student';
            const status = 'Offline';
            const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const insertUserQuery = 'INSERT INTO user_tb (user_name, Email, Password, created_at,position,status) VALUES (?, ?, ?, ?,?,?)';
            db.query(insertUserQuery, [username, email, hashedPassword, createdAt,position,status], (insertErr, insertResult) => {
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



//For login user query
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const query = "SELECT id, Password,position FROM user_tb WHERE user_name = ?";
  db.query(query, [username], (err, result) => {
    if (err) {
      console.error('Failed to fetch user:', err);
      res.send({ message: 'Server error' });
    } else {
      if (result.length > 0) {
        // User exists, compare password hash
        const storedPassword = result[0].Password;
        const Position = result[0].position;
        const userId = result[0].id; // Retrieve the user ID from the query result
        
        if (Position === 'Admin'){
          bcrypt.compare(password, storedPassword, (compareErr, isMatch) => {
            if (compareErr) {
              console.error('Failed to compare passwords:', compareErr);
              res.send({ message: 'Server error' });
            } else if (isMatch) {
                const online = 'online';
                const updateStatus = "UPDATE user_tb SET status = ? WHERE id = ?";
                db.query(updateStatus, [online,userId], (error,result) =>{
                  if (error) {
                    console.error('Failed to update status:', error);
                  } else {
                    // Passwords match, user found
                    res.send({ message: 'User found', id: userId });
                  }
                });
            } else {
              // Passwords don't match, user not found
              res.send({ message: 'User not found' });
            }
          });
        }else{
            res.send({message:'Not Admin'});
        }
      } else {
        // User does not exist
        res.send({ message: 'User not found' });
      }
    }
  });
});

app.post('/login/app', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const query = "SELECT id, Password,position FROM user_tb WHERE user_name = ?";
  db.query(query, [username], (err, result) => {
    if (err) {
      console.error('Failed to fetch user:', err);
      res.send({ message: 'Server error' });
    } else {
      if (result.length > 0) {
        // User exists, compare password hash
        const storedPassword = result[0].Password;
        const Position = result[0].position;
        const userId = result[0].id; // Retrieve the user ID from the query result
        
        if (Position === 'Student'){
          bcrypt.compare(password, storedPassword, (compareErr, isMatch) => {
            if (compareErr) {
              console.error('Failed to compare passwords:', compareErr);
              res.send({ message: 'Server error' });
            } else if (isMatch) {
                const online = 'online';
                const updateStatus = "UPDATE user_tb SET status = ? WHERE id = ?";
                db.query(updateStatus, [online,userId], (error,result) =>{
                  if (error) {
                    console.error('Failed to update status:', error);
                  } else {
                    // Passwords match, user found
                    res.send({ message: 'User found', id: userId });
                  }
                });
            } else {
              // Passwords don't match, user not found
              res.send({ message: 'User not found' });
            }
          });
        }else{
            res.send({message:'Not Admin'});
        }
      } else {
        // User does not exist
        res.send({ message: 'User not found' });
      }
    }
  });
});

app.post('/logout', (req,res) => {

  const userId = req.body.userId;
  const offline = 'offline';
  const updateStatus = "UPDATE user_tb SET status = ? WHERE id = ?";

  db.query(updateStatus, [offline,userId], (error,result) =>{
    if (error) {
      console.error('Failed to update status:', error);
      res.sendStatus(500);
    } else {
      // Passwords match, user found
      res.send({ message: 'User status Updated', id: userId });
    }
  });
});

app.get('/api/getuser', (req, res) => {
  
  const query = 'SELECT * FROM user_tb';
  db.query(query, (error, result) => {
    if (error) {
      console.error('Failed to fetch data:', error);
      res.sendStatus(500);
    } else {
      res.json(result); // Return the result in JSON format
    }
  });
});


//GEt user information when login


// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
