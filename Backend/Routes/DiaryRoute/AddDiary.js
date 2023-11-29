const express = require('express');
const router = express.Router();
const db = require('../database'); 
const crypto = require("crypto");

const algorithm = "aes-256-cbc"; 

// generate 16 bytes of random data
const initVector = crypto.randomBytes(16);

// secret key generate 32 bytes of random data
const Securitykey = crypto.randomBytes(32);


router.post('/AddDiary', (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const user_id = req.body.user_id;
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  insertDiary = "INSERT INTO `Diary`( `title`, `description`, `user_id`, `date`) VALUES (?, ? ,?,?)";
  insertEncrypted = "INSERT INTO `EncryptedData`(`title`, `description`) VALUES (?,?)";

  const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
  let encryptedData = cipher.update(description, "utf-8", "hex");
  encryptedData += cipher.final("hex");

  let responseSent = false;

  // Insert into EncryptedData table
  db.query(insertEncrypted, [title, encryptedData], (insertErr, insertResult) => {
    if (insertErr) {
      console.error('Failed to insert EncryptedData:', insertErr);
      if (!responseSent) {
        res.status(500).send({ message: 'Server error' });
        responseSent = true;
      }
    } else {
      // Insert into Diary table
      db.query(insertDiary, [title, description, user_id, formattedDate], (diaryInsertErr, diaryInsertResult) => {
        if (diaryInsertErr) {
          console.error('Failed to insert Diary:', diaryInsertErr);
          if (!responseSent) {
            res.status(500).send({ message: 'Server error' });
            responseSent = true;
          }
        } else {
          if (!responseSent) {
            res.send({ message: 'Inserted' });
            responseSent = true;
          }
        }
      });
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

 router.put('/EditDiary/:id', (req, res) => {
  const diary_id = req.params.id; // Use req.params.id to get the diary ID from the URL
  const { title, description } = req.body; // Get title and description from the request body

  const UpdateQuery = 'UPDATE Diary SET title = ?, description = ? WHERE diary_id = ?';

  db.query(UpdateQuery, [title, description, diary_id], (err, result) => {
    if (err) {
      // Handle the error, e.g., send an error response
      res.status(500).json({ error: 'Failed to update diary entry.' });
    } else {
      // Update was successful, send a success response or perform other actions
      res.status(200).json({ message: 'Diary entry updated successfully.' });
    }
  });
});


router.delete('/DeleteDiary/:diary_id', (req, res) => {
  const diaryId = req.params.diary_id;

  const deleteQuery = 'DELETE FROM Diary WHERE diary_id = ?';

  db.query(deleteQuery, diaryId, (err, result) => {
    if (err) {
      console.error('Error deleting diary entry: ' + err);
      res.status(500).json({ message: 'Error deleting diary entry' });
    } else if (result.affectedRows === 0) {
      console.log('Diary entry not found.');
      res.status(404).json({ message: 'Diary entry not found' });
    } else {
      console.log('Diary entry deleted successfully');
      res.status(200).json({ message: 'Diary entry deleted successfully' });
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