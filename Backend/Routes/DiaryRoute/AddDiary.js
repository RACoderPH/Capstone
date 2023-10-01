const express = require('express');
const router = express.Router();

const db = require('../database'); 

router.post('/AddDiary', (req, res) => {
  const title = req.body.title;
    const description = req.body.description;
    const user_id = req.body.user_id;

  insertDiary = "INSERT INTO `Diary`( `title`, `description`, `user_id`) VALUES (?, ? ,?)"
  
  db.query(insertDiary, [title,description,user_id], (insertErr, insertResult) => {
    if (insertErr) {
      console.error('Failed to insert Diary:', insertErr);
      res.send({ message: 'Server error' });
    } else {
      res.send({ message: 'Inserted' });
    }
  });
  });

router.get('/quotes', (req,res) => {
  const query = 'SELECT * FROM motivation_tb';
  db.query(query, (error, result) => {
    if (error) {
      console.error('Failed to fetch data:', error);
      res.sendStatus(500);
    } else {
      res.send(result); // Send the JSON data as the response
    }
  });
})

  module.exports = router;