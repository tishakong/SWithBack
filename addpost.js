const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.post('/', (req, res) => {
  const {user_id, title, category, chat_name, content, progress } = req.body;

  const sql = `
    INSERT INTO posts (user_id, title, category, chat_name, content, progress) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [user_id, title, category, chat_name, content, progress];

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
