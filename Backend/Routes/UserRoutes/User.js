const nodemailer = require('nodemailer');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

const db = require('../database'); 


// ...
router.post('/register', (req, res) => {
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
            const insertUserQuery = 'INSERT INTO user_info (Fullname,user_name, Email,stud_no,phone_number,address Password, created_at,position,status) VALUES (?, ?, ?,?, ?, ?,?,?,?,?)';
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

function generateVerificationToken() {
    // Generate a random token
    const token = Math.random().toString(36).substr(2);
    return token;
  }
  
  // Function to send a verification email
  function sendVerificationEmail(email, verificationLink) {
    // Create a transporter for sending emails (replace with your email service provider details)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mindmattersstdominic@gmail.com',
        pass: 'swutnhnnzxmdjytp',
      },
    });
  
    // Setup email data
    const mailOptions = {
      from: 'mindmattersstdominic@gmail.com',
      to: email,
      subject: 'Email Verification',
      html: `<p>Thank you for registering. Please click the following link to verify your email:</p>
             <a href="${verificationLink}">${verificationLink}</a>`,
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Failed to send verification email:', error);
      } else {
        console.log('Verification email sent:', info.response);
      }
    });
  }
  
router.post('/register/app', (req, res) => {
    const fullname = req.body.fullname;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const stud_no = req.body.stud_no;
  
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
              res.send({ message: 'Server error' });
            } else {
              const position = 'Student';
              const status = 'Offline';
              const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
              const insertUserQuery = 'INSERT INTO user_info (Fullname,user_name, Email, stud_no, Password, created_at, position, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
              db.query(insertUserQuery, [fullname,username, email, stud_no, hashedPassword, createdAt, position, status], (insertErr, insertResult) => {
                if (insertErr) {
                  console.error('Failed to register user:', insertErr);
                  res.send({ message: 'Server error' });
                } else {
                  // Send verification email
                  const verificationToken = generateVerificationToken(); // Generate a verification token
                  const verificationLink = `http://yourwebsite.com/verify/${verificationToken}`; // Replace with your verification link
                  sendVerificationEmail(email, verificationLink); // Send verification email
  
                  res.send({ message: 'User registered successfully' });
                }
              });
            }
          });
        }
      }
    });
  });



  router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    const query = "SELECT id, Password,position FROM user_info WHERE user_name = ?";
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
                  const updateStatus = "UPDATE user_info SET status = ? WHERE id = ?";
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

  router.post('/login/app', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    const query = "SELECT id, Password,position FROM user_info WHERE user_name = ?";
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
                  const updateStatus = "UPDATE user_info SET status = ? WHERE id = ?";
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

//Update Profile 
router.put("/profileUpdate/:id", (req, res) => {
  const UserId = req.params.id;
  const Updatequery = "UPDATE user_info SET `Fullname`= ?, `user_name`= ?, `Email`= ?, `phone_number`= ?, `address`= ? WHERE id = ?";

  const values = [
    req.body.fullname,
    req.body.username,
    req.body.email,
    req.body.phone,
    req.body.address,
  ];

  db.query(Updatequery, [...values,UserId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});


//Update User 
router.put("/userUpdate/:id", (req, res) => {
  const UserId = req.params.id;
  const Updatequery = "UPDATE user_info SET `Fullname`= ?, `user_name`= ?, `Email`= ?, `stud_no`= ? WHERE id = ?";

  const values = [
    req.body.fullname,
    req.body.username,
    req.body.email,
    req.body.stud_no,
  ];

  db.query(Updatequery, [...values,UserId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

//Delete User 
router.delete("/userDelete/:id", (req, res) => {
  const UserId = req.params.id;
  const Updatequery = "DELETE FROM user_info WHERE id = ?";

  db.query(Updatequery, [UserId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});


  router.post('/logout', (req,res) => {

    const userId = req.body.userId;
    const offline = 'offline';
    const updateStatus = "UPDATE user_info SET status = ? WHERE id = ?";
  
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

  router.get('/api/getuser', (req, res) => {
    const query = 'SELECT * FROM user_info WHERE status = "Online" AND position = "Student"';
    db.query(query, (error, result) => {
      if (error) {
        console.error('Failed to fetch data:', error);
        res.sendStatus(500);
      } else {
        res.send(result); // Send the JSON data as the response
      }
    });
  });

  router.get('/user/:id', (req, res) => {
    const userId = req.params.id; // Get the user ID from the request parameters
    const query = 'SELECT * FROM user_info WHERE id = ?'; // Query modified to include the WHERE clause
    db.query(query, [userId], (error, result) => { // Pass the user ID as a parameter to the query
      if (error) {
        console.error('Failed to fetch data:', error);
        res.sendStatus(500);
      } else {
        if (result.length > 0) {
          res.send(result[0]); // Send the first user data found (assuming the ID is unique)
        } else {
          res.sendStatus(404); // User with the specified ID not found
        }
      }
    });
  });
  
  module.exports = router;