
const express = require('express');
const router = express.Router();

const db = require('../database'); 


router.post('/AddQuestion', (req,res) =>{
    const question = req.body.question;
    const category = req.body.category;
    const option1 = req.body.option1;
    const option2 = req.body.option2;
    const option3 = req.body.option3;
    const option4 = req.body.option4;
  
    const insertQuestion = 'INSERT into question_tb (Question, category, `option1`,`option2`,`option3`,`option4`) VALUES (?, ?, ?, ?, ?, ?)';
  
  
    db.query(insertQuestion, [question,category,option1,option2,option3,option4], (insertErr, insertResult) => {
      if (insertErr) {
        console.error('Failed to insert question:', insertErr);
        res.send({ message: 'Server error' });
      } else {
        res.send({ message: 'Inserted' });
      }
    });
  });

// Update Assessment Question
router.put('/updateQuestion/:id', (req, res) => {
  const QuestionId = req.params.id;
  const question = req.body.question;
  const category = req.body.category;
  const option1 = req.body.option1;
  const option2 = req.body.option2;
  const option3 = req.body.option3;
  const option4 = req.body.option4;

  const editQuestion = 'UPDATE question_tb SET Question=?, category=?, `option1`=?, `option2`=?, `option3`=?, `option4`=? WHERE Question_id=?';

  db.query(
    editQuestion,
    [question, category, option1, option2, option3, option4, QuestionId],
    (updateErr, updateResult) => {
      if (updateErr) {
        console.error('Failed to update question:', updateErr);
        res.send({ message: 'Server error' });
      } else {
        res.send({ message: 'Updated' });
      }
    }
  );
});

//Delete Assessment Question 
router.delete("/deleteQuestion/:id", (req, res) => {
  const QuestionId = req.params.id;
  const Updatequery = "DELETE FROM question_tb WHERE Question_id = ?";

  db.query(Updatequery, [QuestionId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

router.get('/Questions', (req, res) => {
    const query = 'SELECT * FROM question_tb';
    db.query(query, (error, result) => {
      if (error) {
        console.error('Failed to fetch data:', error);
        res.sendStatus(500);
      } else {
        res.send(result); // Send the JSON data as the response
      }
    });
  });

  module.exports = router;