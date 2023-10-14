
const express = require("express");
const router = express.Router();

const db = require('../database'); 

router.post('/submit_answer', (req, res) => {
  const answers = req.body.answers; // Assuming you are sending an array of answers from the frontend

  // Loop through each answer and insert it into the database
  const insertAnswer = 'INSERT INTO answer (answer_value, category, user_id, question_id) VALUES (?, ?, ?, ?)';

  const insertionErrors = [];

  answers.forEach((answer) => {
    const { answer_value, category, user_id, question_id } = answer;

    db.query(insertAnswer, [answer_value, category, user_id, question_id], (insertErr, insertResult) => {
      if (insertErr) {
        console.error('Failed to submit:', insertErr);
        insertionErrors.push(insertErr);
      } else {
        // Successfully inserted an answer, now update user_info
        const updateUserInfo = 'UPDATE user_info SET IsAnswer = 1 WHERE id = ?';
        db.query(updateUserInfo, [user_id], (updateErr, updateResult) => {
          if (updateErr) {
            console.error('Failed to update user_info:', updateErr);
            insertionErrors.push(updateErr);
          }
        });
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

// for bar chart data
router.get('/student_result', (req, res) => {
  // SQL query to calculate the average of stress, anxiety, and depression for all students
  const getAverages = `
    SELECT
      AVG(stress) AS avg_stress,
      AVG(anxiety) AS avg_anxiety,
      AVG(depression) AS avg_depression
    FROM student_result
  `;

  db.query(getAverages, (error, result) => {
    if (error) {
      console.error('Failed to fetch average data:', error);
      res.status(500).json({ error: 'Failed to fetch average data' });
    } else {
      res.json(result[0]); // Send the JSON data as the response (assuming you expect a single row result)
    }
  });
});

// for piechart
router.get('/count', (req, res) => {
  const query = 'SELECT SUM(CASE WHEN IsAnswer = 0 THEN 1 ELSE 0 END) AS notTaken, SUM(CASE WHEN IsAnswer = 1 THEN 1 ELSE 0 END) AS taken FROM user_info WHERE position = "Student"';

  db.query(query, (error, results) => {
    if (error) {
      console.error('Failed to fetch assessment status:', error);
      res.status(500).json({ error: 'Failed to fetch assessment status' });
    } else {
      const assessmentStatus = {
        notTaken: results[0].notTaken,
        taken: results[0].taken,
      };
      res.json(assessmentStatus);
    }
  });
});
  module.exports = router;