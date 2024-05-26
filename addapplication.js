const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.post('/', (req, res) => {
  const { applicant_id, post_id } = req.body;

  const sql = `INSERT INTO applications (applicant_id, post_id) VALUES (?, ?)`;
  const values = [applicant_id, post_id];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error inserting into database: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(201).send('Application added successfully');
  });
});

module.exports = router;
