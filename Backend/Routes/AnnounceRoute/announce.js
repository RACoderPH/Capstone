const express = require('express');
const router = express.Router();

router.post('/announce', (req,res) =>{
    const title = req.body.title;
    const message = req.body.message;
  
    const insertAnnouncement = 'INSERT into announce_tb (title,message) VALUES (?, ?)' ; 
  
    db.query(insertAnnouncement, [title,message], (insertErr, insertResult) => {
      if (insertErr) {
        console.error('Failed to insert announcement:', insertErr);
        res.send({ message: 'Server error' });
      } else {
        res.send({ message: 'Inserted' });
      }
    });
  });

  module.exports = router;