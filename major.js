//major.js
const express = require('express'); 
const router = express.Router();
const db = require('./db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM majors', (error, results, fields) => {
      if (error) {
        res.status(500).send('Failed to fetch majors');
        return;
      }
      res.status(200).json(results);
    });
  });

  module.exports = router;