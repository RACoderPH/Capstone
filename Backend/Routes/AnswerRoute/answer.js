
const express = require("express");
const router = express.Router();

const db = require('../database'); 

router.post('/submit_answer', (req, res) => {
    const answers = req.body.answers; // Assuming you are sending an array of answers from the frontend
  
    // Loop through each answer and insert it into the database
    const insertQuestion = 'INSERT INTO answer (answer_value, category, user_id, question_id) VALUES (?, ?, ?, ?)';
  
    const insertionErrors = [];
  
    answers.forEach((answer) => {
      const { answer_value, category, user_id, question_id } = answer;
  
      db.query(insertQuestion, [answer_value, category, user_id, question_id], (insertErr, insertResult) => {
        if (insertErr) {
          console.error('Failed to submit:', insertErr);
          insertionErrors.push(insertErr);
        }
      });
    });
  
    // Check if there were any insertion errors
    if (insertionErrors.length > 0) {
      res.status(500).json({ message: 'Some answers failed to submit', errors: insertionErrors });
    } else {
      res.json({ message: 'All answers submitted successfully' });
    }
  });
//For Stress Computation
router.get('/stress/:id', (req,res) => {
        const getStress = 'SELECT SUM(answer_value) AS total_stress_value FROM answer WHERE category = "Stress" AND user_id = ?';
        db.query(getStress, (error, result) => {
          if (error) {
            console.error('Failed to fetch data:', error);
            res.sendStatus(500);
          } else {
            res.send(result); // Send the JSON data as the response
          }
        });
    });

    //For Anxiety Computation
router.get('/anxiety/:id', (req,res) => {
  const getStress = 'SELECT SUM(answer_value) AS total_anxiety_value FROM answer WHERE category = "Anxiety" AND user_id = ?';
  db.query(getStress, (error, result) => {
    if (error) {
      console.error('Failed to fetch data:', error);
      res.sendStatus(500);
    } else {
      res.send(result); // Send the JSON data as the response
    }
  });
});

//For Depression Computation
router.get('/depression/:id', (req,res) => {
  const getStress = 'SELECT SUM(answer_value) AS total_depression_value FROM answer WHERE category = "Depression" AND user_id = ?';
  db.query(getStress, (error, result) => {
    if (error) {
      console.error('Failed to fetch data:', error);
      res.sendStatus(500);
    } else {
      res.send(result); // Send the JSON data as the response
    }
  });
});
  module.exports = router;