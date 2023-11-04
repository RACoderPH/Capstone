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
router.get('/announcement',(req,res) =>{

  const announce = 'SELECT * FROM `announcement`';

  db.query(announce,(error, result) => {
    if (error) {
      console.error('Failed to fetch announcement data:', error);
      res.status(500).json({ error: 'Failed to result data' });
    } else {
      
        res.json(result); // Send the JSON data as the response
    }
  })
})

// for adding note
router.post("/addNote", (req, res) => {
  const insertNote = "INSERT INTO notes (notes, user_id) VALUES (?, ?)"; // Corrected SQL query

  const values = [
    req.body.notes,
    req.body.user_id, // Assuming user_id is in the request body
  ];

  db.query(insertNote, values, (insertErr, data) => {
    if (insertErr) {
      console.error('Failed to insert note:', insertErr);
      res.status(500).json({ message: 'Server error' });
    } else {
      res.status(200).json({ message: 'Note inserted' });
    }
  });
});

// for fetching note 
router.get('/getNotes/:userId', (req, res) => {
  const userId = req.params.userId;

  const query = 'SELECT notes_id, notes FROM notes WHERE user_id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Failed to fetch notes:', err);
      res.status(500).json({ message: 'Server error' });
    } else {
      // Send the notes as a JSON response
      res.status(200).json(results);
    }
  });
});

// for delete note
router.delete('/deleteNote/:noteId', (req, res) => {
  const noteId = req.params.noteId;

  const query = 'DELETE FROM notes WHERE notes_id = ?';

  db.query(query, [noteId], (err, results) => {
    if (err) {
      console.error('Failed to delete the note:', err);
      res.status(500).json({ message: 'Server error' });
    } else {
      if (results.affectedRows > 0) {
        // Note was successfully deleted
        res.status(200).json({ message: 'Note deleted' });
      } else {
        // Note with the specified ID was not found
        res.status(404).json({ message: 'Note not found' });
      }
    }
  });
});

// for Mental Health Status
router.put('/updateMoodStatus/:userId', (req, res) => {
  const userId = req.params.userId; // Use req.params to get userId from the route parameters
  const newMood = req.body.mood;

  // Determine the mh_status based on the selected mood
  let mhStatus;
  if (newMood === 'stressed') {
    mhStatus = 'Stressed';
  } else if (newMood === 'anxious') {
    mhStatus = 'Anxious';
  } else if (newMood === 'depressed') {
    mhStatus = 'Depressed';
  } else {
    mhStatus = 'Normal';
  }

  // Update the mh_status in the database for the specific user
  console.log('mhStatus Before Update:', mhStatus); 
  const updateStatusQuery = 'UPDATE user_info SET mh_status = ? WHERE id = ?';
console.log('Received Mood:', mhStatus); // Add this line
console.log('User ID:', userId); // Add this line
console.log('SQL Query:', updateStatusQuery); // Add this line
  db.query(updateStatusQuery, [mhStatus, userId], (err, result) => {
    if (err) {
      console.error('Failed to update mh_status:', err);
      res.status(500).json({ message: 'Server error' });
    } else {
      res.status(200).json({ message: 'Mood status updated successfully' });
    }
  });
});

// for counting mh_status
router.get('/countAssessmentStatus', (req, res) => {
  const query = `
    SELECT mh_status, COUNT(*) as count
    FROM user_info
    GROUP BY mh_status;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Failed to fetch assessment status:', err);
      res.status(500).json({ message: 'Server error' });
    } else {
      // Send the assessment status as a JSON response
      res.status(200).json(results);
    }
  });
});


  module.exports = router;