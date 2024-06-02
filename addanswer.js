const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.post('/:questionId', (req, res) => {
  const question_id = req.params.questionId;
  const {answer} = req.body;

  const sql = `
    UPDATE qnas
    SET answer = ?
    WHERE question_id = ?
  `;
  const values = [answer, question_id];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error querying database: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(201).send('Question answered successfully')
  });
});

module.exports = router;
