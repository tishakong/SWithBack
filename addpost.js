const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.post('/', (req, res) => {
  const {writer_id, title, category, study_name, content} = req.body;

  const sql = `
    INSERT INTO posts (writer_id, title, category, study_name, content) 
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [writer_id, title, category, study_name, content];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error querying database: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }
    const postId = results.insertId; // 삽입된 레코드의 post_id 값
    res.status(201).json({ postId: postId, message: 'Post added successfully' })
  });
});

module.exports = router;
