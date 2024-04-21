const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.post('/', (req, res) => {
  const {writer_id, title, category, study_name, content, progress } = req.body;

  const sql = `
    INSERT INTO posts (writer_id, title, category, study_name, content, progress) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [writer_id, title, category, study_name, content, progress];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error querying database: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(201).send('Post added successfully');
  });
});

module.exports = router;
