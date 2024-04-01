const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.get('/', (req, res) => {
  const {email} = req.query;

  const sql = `
    SELECT * FROM users WHERE (email=?)
  `;
  const values = [email];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error querying database: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (results.length === 0){
      res.status(202).send('중복이 아닙니다. 이메일 생성 가능');
      return;
    }
    res.status(200).json(results);
  });
});

module.exports = router;
