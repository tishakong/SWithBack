const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.post('/', (req, res) => {
  const {user_id, post_id} = req.body;

  const sql = `
    INSERT INTO scrap_post (user_id, post_id) 
    VALUES (?, ?)
  `;
  const values = [user_id, post_id];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error querying database: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(201).send('Scrap added successfully');
  });
});

module.exports = router;
////
