const express = require('express');
const router = express.Router();
const db = require('./db.js');


router.get('/:revieweeId/:reviewerId', (req, res) => {
    const { revieweeId, reviewerId } = req.params;
    const query = 'SELECT * FROM reviews WHERE reviewee_id = ? AND reviewer_id = ?';
  
    db.query(query, [revieweeId, reviewerId], (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Database query error' });
        return;
      }
  
      res.status(200).json(results);
    });
  });

module.exports = router;
