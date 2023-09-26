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

  module.exports = router;