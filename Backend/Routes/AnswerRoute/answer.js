
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
router.get('/stress/:id', (req, res) => {
  const userId = req.params.id;

  const getStress = 'SELECT SUM(answer_value) AS total_stress_value FROM answer WHERE category = "Stress" AND user_id = ?';

  db.query(getStress, userId, (error, result) => {
    if (error) {
      console.error('Failed to fetch stress data:', error);
      res.status(500).json({ error: 'Failed to fetch stress data' });
    } else {
      
        res.json(result); // Send the JSON data as the response
    }
  });
});


    //For Anxiety Computation
router.get('/anxiety/:id', (req, res) => {
      const userId = req.params.id;

      const getAnxiety = 'SELECT SUM(answer_value) AS total_anxiety_value FROM answer WHERE category = "Anxiety" AND user_id = ?';
    
      db.query(getAnxiety, userId, (error, result) => {
        if (error) {
          console.error('Failed to fetch anxiety data:', error);
          res.status(500).json({ error: 'Failed to fetch anxiety data' });
        } else {
          
            res.json(result); // Send the JSON data as the response
        }
      });
    });

//For Depression Computation
router.get('/depression/:id', (req, res) => {
  const userId = req.params.id;

  const getDepression = 'SELECT SUM(answer_value) AS total_depress_value FROM answer WHERE category = "Depression" AND user_id = ?';

  db.query(getDepression, userId, (error, result) => {
    if (error) {
      console.error('Failed to fetch depress data:', error);
      res.status(500).json({ error: 'Failed to fetch depress data' });
    } else {
      
        res.json(result); // Send the JSON data as the response
    }
  });
});

router.post('/result', (req,res) =>{
  const user_id = req.body.user_id;
  const depression = req.body.depression;
  const anxiety = req.body.anxiety;
  const stress = req.body.stress;

    insertResult = "INSERT INTO `student_result`( `user_id`, `depression`, `anxiety`, `stress`) VALUES (?, ?, ?, ?)";

    db.query(insertResult, [user_id,depression,anxiety,stress], (insertErr, insertResult) => {
      if (insertErr) {
        console.error('Failed to insert Result:', insertErr);
        res.send({ message: 'Server error' });
      } 
      else {
        res.send({ message: 'Inserted' });
      }
    });
})

router.get('/student_result/:id', (req,res) => {
  const userId = req.params.id;

  const getAnxiety = 'SELECT * FROM `student_result` WHERE `user_id` = ?';

  db.query(getAnxiety, userId, (error, result) => {
    if (error) {
      console.error('Failed to fetch anxiety data:', error);
      res.status(500).json({ error: 'Failed to result data' });
    } else {
      
        res.json(result); // Send the JSON data as the response
    }
  })
});
  module.exports = router;