const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const db = require('../database'); 


function generateVerificationToken() {
  // Generate a random 6-digit number
  const min = 100000; // Minimum value (inclusive)
  const max = 999999; // Maximum value (inclusive)
  const randomSixDigitNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  
  // Convert it to a string
  const token = randomSixDigitNumber.toString();
  
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
    subject: 'Forgot Password',
    html: `
      <html>
        <head>
          <style>
            /* Add CSS styles here */
            body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 5px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333;
            }
            p {
              color: #555;
              font-size: 16px;
              line-height: 1.5;
            }
            .code-container {
              background-color: #007BFF;
              color: #fff;
              text-align: center;
              font-size: 24px;
              padding: 10px;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Forgot Password</h1>
            <p><strong>Do not share this code with anyone:</strong></p>
            <div class="code-container">
            <h2 class="code">${verificationLink}</h2>
            </div>
          </div>
        </body>
      </html>
    `,
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



router.post('/forgot', (req, res) => {
    const email = req.body.email; // Assuming email is sent in the request body
    const verificationToken = generateVerificationToken();
    const checkEmailQuery = 'SELECT * FROM `user_info` WHERE Email = ?';
   

    db.query(checkEmailQuery, [email], (error, results) => {
      if (error) {
        console.error('Failed to fetch data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
      } else {
        if (results.length > 0) {
          // If there are results, the email exists
          res.send({ message: 'exists' });
          const verificationLink = verificationToken; // Replace with your verification link
          sendVerificationEmail(email, verificationLink);

          const userId = results[0].user_id; // Assuming user_id is the primary key
          const updateOTPQuery = 'UPDATE `user_info` SET otp = ? WHERE user_id = ?';
  
          db.query(updateOTPQuery, [verificationToken, userId], (error) => {
            if (error) {
              console.error('Failed to update OTP:', error);
              res.status(500).json({ error: 'Failed to update OTP' });
            } else {
              res.send({ message: 'Updated OTP'});
            }
          });
        
        } else {
          // If there are no results, the email does not exist
          res.send({ message: 'not exists' });
        }
      }
    });
  });
  

module.exports = router;