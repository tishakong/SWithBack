const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.delete('/', (req, res) => {
  const { user_id, post_id } = req.body;

  const sql = `
    DELETE FROM scrap_post 
    WHERE user_id = ? AND post_id = ?
  `;
  const values = [user_id, post_id];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error querying database: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Scrap deleted successfully');
  });
});

module.exports = router;
