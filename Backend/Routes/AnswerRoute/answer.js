
const express = require("express");
const router = express.Router();
const moment = require('moment');
const cron = require('node-cron');


const db = require('../database');

//Scheduler to auto delete result 
cron.schedule('*/30 * * * *', () => {
  const twoWeeksAgo = moment().subtract(2, 'weeks').format('YYYY-MM-DD HH:mm:ss');

  // Update IsAnswer in user_info table and delete student results older than 10 minutes ago
  const updateIsAnswer = "UPDATE `user_info` SET `IsAnswer` = 0 WHERE `IsAnswer` = 1 AND `answer_at` < ?";
  const deleteOldResults = "DELETE FROM `student_result` WHERE `created_at` < ?";

  // Perform the update and delete operations within a transaction for consistency
  db.beginTransaction((transactionErr) => {
    if (transactionErr) {
      console.error('Failed to start a transaction:', transactionErr);
      return;
    }

    db.query(updateIsAnswer, [twoWeeksAgo], (updateErr, updateResult) => {
      if (updateErr) {
        console.error('Failed to update IsAnswer in user_info:', updateErr);
        db.rollback(() => {
          console.error('Transaction rolled back.');
        });
        return;
      }

      db.query(deleteOldResults, [twoWeeksAgo], (deleteErr, deleteResult) => {
        if (deleteErr) {
          console.error('Failed to delete old student results:', deleteErr);
          db.rollback(() => {
            console.error('Transaction rolled back.');
          });
          return;
        }

        db.commit((commitErr) => {
          if (commitErr) {
            console.error('Transaction commit failed:', commitErr);
          } else {
            console.log('Transaction committed.');
          }
        });
      });
    });
  });
});
//end


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


router.post('/result', (req, res) => {
  const user_id = req.body.user_id;
  const depression = req.body.depression;
  const anxiety = req.body.anxiety;
  const stress = req.body.stress;
  const created_at = moment().format('YYYY-MM-DD HH:mm:ss');

  // Insert the result
  const insertResult = "INSERT INTO `student_result`(`user_id`, `depression`, `anxiety`, `stress`, `created_at`) VALUES (?, ?, ?, ?, ?)";

  // Update the UpdateUser statement to insert created_at into answer_at
  const UpdateUser = "UPDATE `user_info` SET `answer_at` = ? WHERE `id` = ?";

  db.query(insertResult, [user_id, depression, anxiety, stress, created_at], (insertErr, insertResult) => {
    if (insertErr) {
      console.error('Failed to insert Result:', insertErr);
      return res.send({ message: 'Server error' });
    }

    // Once the result is successfully inserted, update the answer_at in user_info
    db.query(UpdateUser, [created_at, user_id], (updateUserErr, updateUserResult) => {
      if (updateUserErr) {
        console.error('Failed to update answer_at in user_info:', updateUserErr);
        // Handle the error
      } else {
        // Handle the update success
        // Now, proceed to delete the related answers
        const deleteAnswers = "DELETE FROM `answer` WHERE `user_id` = ?";
        db.query(deleteAnswers, [user_id], (deleteErr, deleteResult) => {
          if (deleteErr) {
            console.error('Failed to delete answers:', deleteErr);
            return res.send({ message: 'Server error' });
          }

          // Respond with success message
          res.send({ message: 'Result inserted, and related answers deleted' });
        });
      }
    });
  });
});

router.get('/student_result/:id', (req,res) => {
  const userId = req.params.id;

  const getAnxiety = 'SELECT * FROM `student_result` WHERE `user_id` = ?';

  db.query(getAnxiety, userId, (error, result) => {
    if (error) {
      console.error('Failed to fetch student data:', error);
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