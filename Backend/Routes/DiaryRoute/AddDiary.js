const express = require('express');
const router = express.Router();

const db = require('../database'); 

router.post('/AddDiary', (req, res) => {
  const title = req.body.title;
    const description = req.body.description;
    const user_id = req.body.user_id;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Zero-padding the month
    const day = String(currentDate.getDate()).padStart(2, '0'); // Zero-padding the day
    const formattedDate = `${year}-${month}-${day}`;

  insertDiary = "INSERT INTO `Diary`( `title`, `description`, `user_id`, `date`) VALUES (?, ? ,?,?)"
  
  db.query(insertDiary, [title,description,user_id,formattedDate], (insertErr, insertResult) => {
    if (insertErr) {
      console.error('Failed to insert Diary:', insertErr);
      res.send({ message: 'Server error' });
    } else {
      res.send({ message: 'Inserted' });
    }
  });
  });

 router.get('/MyDiary/:id', (req,res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM Diary WHERE user_id = ?';
  db.query(query,userId, (error, result) => {
    if (error) {
      console.error('Failed to fetch data:', error);
      res.sendStatus(500);
    } else {
      res.send(result); // Send the JSON data as the response
    }
  });
 }) ;


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