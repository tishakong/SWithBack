const express = require('express');
const db = require('./db.js');
const app = express();

app.use(express.json());

app.get('/:majorId', (req, res) => {
    const majorId = req.params.majorId;
    db.query('SELECT * FROM majors WHERE major_id = ?', [majorId], (error, results, fields) => {
      if (error) {
        res.status(500).send('Failed to fetch major details');
        return;
      }
      if (results.length === 0) {
        res.status(404).send('Major not found');
        return;
      }
      res.json(results[0]);
    });
  });

module.exports = app;
