const nodemailer = require('nodemailer');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const db = require('../database'); 


const storage = multer.diskStorage({
  destination:(req, file, cb)=>{
    cb(null,'public/images')
  },
  filename:(req, file, cb)=>{
    cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
  }
})
const upload = multer({
  storage:storage
})

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
            const insertUserQuery = 'INSERT INTO user_info (Fullname,user_name, Email,stud_no,Password, created_at,position,status) VALUES (?, ?, ?,?, ?, ?, ?, ?)';
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
      html: `<html>
      <head>
        <style>
          /* Add CSS styles here */
          body {
            font-family: Times New Roman, sans-serif;
            background-color: #f5f5f5;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 35px;
            background-color: #ffffe0;
            border-radius: 25px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #000000;
          }
          p {
            color: #555;
            font-size: 16px;
            line-height: 1.5;
          }
          .code-container {
            background-color: #63e5ff;
            color: #000000;
            text-align: center;
            font-size: 50px;
            padding: 1px;
            border-radius: 0px;
          }
          .code {
            color: '#00000';
            font-size: 25px;
            letter-spacing:1;
            font-style:bold;
            text-align: center;
          }
    .ImageLogo{
    height: 110px;
    width: 100px;
    margin-left:510px;
    }
        </style>
      </head>
      <body>
        <div class="container">
          <h1><b>Email Verification</b></h1>
          <p>Thank you for registering. Please input the code to verify your account.</br> </br> This is your Verification Code:</p>
          <div class="code-container">
          <h2 class="code">${verificationLink}</h2>
    
    
          </div>
    <p>After verifying your email, you can set up your profile, add a profile picture, and start exploring MindMatters App.</br></br>If you didn't sign up for MindMatters App, please disregard this email. </br></br> If you need any assistance, feel free to reach out to our support team at <a href>mindmattersdominic@gmail.com</a>. We're here to help! </br> </br> Best regards,  </br> The MindMatters Team</p>
        <img src="Logo.png" class="ImageLogo">
    </div>
      </body>
    </html>`,
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
  //Registration for Application
  router.post('/register/app', (req, res) => {
    const fullname = req.body.fullname;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const stud_no = req.body.stud_no;

    // Check if the username already exists
    const checkUsernameQuery = 'SELECT * FROM user_info WHERE user_name = ?';
    db.query(checkUsernameQuery, [username], (err, usernameResult) => {
        if (err) {
            console.error('Failed to check username:', err);
            res.send({ message: 'Server error' });
        } else {
            if (usernameResult.length > 0) {
                // Username already exists
                res.send({ message: 'Username already exists' });
            } else {
                // Username is available, now check if the email exists
                const checkEmailQuery = 'SELECT * FROM user_info WHERE Email = ?';
                db.query(checkEmailQuery, [email], (err, emailResult) => {
                    if (err) {
                        console.error('Failed to check email:', err);
                        res.send({ message: 'Server error' });
                    } else {
                        if (emailResult.length > 0) {
                            // Email already exists
                            res.send({ message: 'Email already exists' });
                        } else {
                            // Both username and email are available, proceed with registration
                            bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
                                if (hashErr) {
                                    console.error('Failed to hash password:', hashErr);
                                    res.send({ message: 'Server error' });
                                } else {
                                    const verificationToken = generateVerificationToken();
                                    const position = 'Student';
                                    const status = 'Offline';
                                    const room_id = Math.floor(10000 + Math.random() * 90000);
                                    const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
                                    const insertUserQuery = 'INSERT INTO user_info (Fullname,user_name, Email, stud_no, Password, created_at, position, status, verification_code,room_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                                    db.query(insertUserQuery, [fullname, username, email, stud_no, hashedPassword, createdAt, position, status, verificationToken, room_id], (insertErr, insertResult) => {
                                        if (insertErr) {
                                            console.error('Failed to register user:', insertErr);
                                            res.send({ message: 'Server error' });
                                        } else {
                                            // Send verification email
                                            // Generate a verification token
                                            const verificationLink = `${verificationToken}`; // Replace with your verification link
                                            sendVerificationEmail(email, verificationLink); // Send verification email

                                            res.send({ message: 'User registered successfully' });
                                        }
                                    });
                                }
                            });
                        }
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
//Login for Mobile APP
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
//Upload Image
router.put("/Upload/:id",upload.single('image_file'), (req, res) => {
  const UserId = req.params.id;
  const Updatequery = "UPDATE user_info SET `image_file`= ? WHERE id = ?";

  const values = [
    req.file.filename
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
//Update User 
router.put("/userUpdate/:id", (req, res) => {
  const UserId = req.params.id;
  const Updatequery = "UPDATE user_info SET `Fullname`= ?, `user_name`= ?, `Email`= ?, `stud_no`= ? , `phone_number`= ? , `address`= ? WHERE id = ?";

  const values = [
    req.body.fullname,
    req.body.username,
    req.body.email,
    req.body.stud_no,
    req.body.phone,
    req.body.address,
  ];

  db.query(Updatequery, [...values,UserId], (err, data) => {
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
//Show all the Student Taken the assessment 
  router.get('/api/getuser', (req, res) => {
    const query = 'SELECT * FROM user_info WHERE IsAnswer = 1 AND position = "Student"';
    db.query(query, (error, result) => {
      if (error) {
        console.error('Failed to fetch data:', error);
        res.sendStatus(500);
      } else {
        res.send(result); // Send the JSON data as the response
      }
    });
  });

  //Show all the Student Not yet taken the assessment
  router.get('/api/getuserNot', (req, res) => {
    const query = 'SELECT * FROM user_info WHERE IsAnswer = 0 AND position = "Student"';
    db.query(query, (error, result) => {
      if (error) {
        console.error('Failed to fetch data:', error);
        res.sendStatus(500);
      } else {
        res.send(result); // Send the JSON data as the response
      }
    });
  });

  router.get('/getonline', (req, res) => {
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

  //Show All Student List
  router.get('/Student', (req, res) => {
    const query = 'SELECT * FROM user_info WHERE position = "Student"';
    db.query(query, (error, result) => {
      if (error) {
        console.error('Failed to fetch data:', error);
        res.sendStatus(500);
      } else {
        res.send(result); // Send the JSON data as the response
      }
    });
  });

  //Get Admin Info
  router.get('/admin', (req, res) => {
    const query = 'SELECT * FROM user_info WHERE position = "Admin"';
    db.query(query, (error, result) => {
      if (error) {
        console.error('Failed to fetch data:', error);
        res.sendStatus(500);
      } else {
        res.send(result); // Send the JSON data as the response
      }
    });
  });
//Get one user Info
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
  
  //Count the Student
  router.get('/student_count', (req, res) => {
    const query = 'SELECT COUNT(*) AS student_count FROM user_info WHERE position = "student"';
    db.query(query, (error, result) => {
      if (error) {
        console.error('Failed to fetch data:', error);
        res.sendStatus(500);
      } else {
        res.send(result); // Send the JSON data as the response
      }
    });
  });
  //Verification_code
  router.post('/verification', (req, res) => {
    const userProvidedVerification = req.body.verificationCodes;
  
    // Query the database to check if the provided OTP exists in the user_info table
    const verifyQuery = 'SELECT * FROM user_info WHERE verification_code = ?';
  
    db.query(verifyQuery, [userProvidedVerification], (error, results) => {
      if (error) {
        console.error('Failed to verify code:', error);
        res.status(500).json({ error: 'Failed to verify OTP' });
      } else {
        if (results.length > 0) {
    
          res.send({ message: 'match' });
        } else {
          // If no results are returned, the provided OTP does not exist in the table
          res.send({ message: 'not match' });
        }
      }
    });
  });
  
  module.exports = router;