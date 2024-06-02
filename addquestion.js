const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.post('/:postId', (req, res) => {
  const post_id = req.params.postId;
  const {questioner_id, question} = req.body;

  const sql = `
    INSERT INTO qnas (post_id, questioner_id, question) 
    VALUES (?, ?, ?)
  `;
  const values = [post_id, questioner_id, question];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error querying database: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(201).send('Question added successfully')
  });
});

module.exports = router;
