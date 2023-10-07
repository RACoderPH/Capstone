const express = require("express");
const router = express.Router();

const db = require('../database'); 


router.post('/forgot', (req, res) => {
  const email = (req.body.email || '').trim().toLowerCase(); // Trim and convert to lowercase

  if (!email) {
    // Handle the case where the email is missing or empty
    return res.status(400).json({ error: 'Email is missing or empty' });
  }

  const checkEmailQuery = 'SELECT * FROM `user_info` WHERE LOWER(Email) = ?'; // Use LOWER for case-insensitive comparison

  db.query(checkEmailQuery, [email], (error, results) => {
    if (error) {
      console.error('Failed to fetch data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    } else {
      if (results.length > 0) {
        // If there are results, the email exists
        res.json({ message: 'exists' });
      } else {
        // If there are no results, the email does not exist
        res.json({ message: 'not exists' });
      }
    }
  });
});


  

module.exports = router;