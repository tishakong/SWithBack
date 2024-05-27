const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.get('/', (req, res) => {
  const { post_id } = req.query;

  const sql = `SELECT * FROM advance_q WHERE post_id = ?`;
  const values = [post_id];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error querying database: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).json(results);
  });
});

module.exports = router;
