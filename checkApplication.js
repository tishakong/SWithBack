const express = require('express');
const router = express.Router();
const db = require('./db.js');


router.post('/', (req, res) => {
  const { user_id, post_id } = req.body;
  const query = `
    SELECT COUNT(*) AS count 
    FROM applications 
    WHERE applicant_id = ? AND post_id = ?`;

  db.query(query, [user_id, post_id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
      return;
    }
    const count = results[0].count;
    const isApplied = count > 0;
    res.json({ isApplied });
  });
});

module.exports = router;
