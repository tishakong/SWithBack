const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.get('/', (req, res) => {
  const { user_id, post_id } = req.query;
  
  if (!user_id) {
    return res.status(400).send('user_id is required');
  }

  let sql = '';
  let values = [];

  if (post_id) {
    sql = `
      SELECT CASE WHEN EXISTS (
        SELECT 1 
        FROM scrap_posts 
        WHERE user_id = ? AND post_id = ?
      ) THEN TRUE ELSE FALSE END AS isScrapped
    `;
    values = [user_id, post_id];
  } else {
    sql = `
      SELECT * 
      FROM scrap_posts
      WHERE user_id = ?
    `;
    values = [user_id];
  }

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error querying database: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (post_id) {
      res.status(200).json({ isScrapped: results[0].isScrapped });
    } else {
      if (results.length === 0) {
        res.status(204).send('No scraps found for this user');
      } else {
        res.status(200).json(results);
      }
    }
  });
});

module.exports = router;
