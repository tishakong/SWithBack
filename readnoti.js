const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.patch('/', (req, res) => {
  const {user_id, noti_id} = req.body;

  const sql = `
    UPDATE notifications SET isread = True WHERE user_id = ? AND noti_id = ?
  `;
  const values = [user_id, noti_id];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error querying database: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(201).send('Notification updated successfully');
  });
});

module.exports = router;
