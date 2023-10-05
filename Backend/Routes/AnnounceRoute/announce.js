const express = require('express');
const router = express.Router();

const db = require('../database'); 

router.post('/announce', (req,res) =>{
    const title = req.body.title;
    const what = req.body.what;
    const where = req.body.where;
    const when = req.body.when;

  
    const insertAnnouncement = 'INSERT into announcement (title,what_announce,where_announce,when_announce) VALUES (?, ?, ? ,?)' ; 
  
    db.query(insertAnnouncement, [title,what,where,when], (insertErr, insertResult) => {
      if (insertErr) {
        console.error('Failed to insert announcement:', insertErr);
        res.send({ message: 'Server error' });
      } else {
        res.send({ message: 'Inserted' });
      }
    });
  });

  module.exports = router;