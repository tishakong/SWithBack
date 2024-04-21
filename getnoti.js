const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.get('/', (req, res) => {
  const {user_id} = req.query;

  const sql = `
    SELECT * FROM notifications WHERE (user_id=?)
  `;
  const values = [user_id];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error querying database: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (results.length === 0){
      res.status(202).send('수신한 알림이 없습니다.');
      return;
    }
    res.status(201).json(results);
  });
});

module.exports = router;