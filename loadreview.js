const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.get('/', (req, res) => {
  const {reviewee_id} = req.query;

  const sql = `
    SELECT * FROM reviews WHERE (reviewee_id=?)
  `;
  const values = [reviewee_id];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error querying database: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (results.length === 0){
      res.status(202).send('작성된 리뷰가 없습니다.');
      return;
    }
    res.status(201).json(results);
  });
});

module.exports = router;
