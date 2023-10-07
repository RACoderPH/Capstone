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
    html: `<p>Don't Share this Code</p>
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
          const verificationLink = `This is your Forgot Password OTP:${verificationToken}`; // Replace with your verification link
          sendVerificationEmail(email, verificationLink);
        } else {
          // If there are no results, the email does not exist
          res.send({ message: 'not exists' });
        }
      }
    });
  });
  

module.exports = router;