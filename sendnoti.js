const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.post('/', (req, res) => {
  const { post_id, user_id, type } = req.body;

  const sql = `
    INSERT INTO notifications (post_id, user_id, type, message, isread)
    VALUES (?, ?, ?, ?, False)
  `;
  const message = getMessageByType(type);

  const values = [post_id, user_id, type, message];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error inserting into database: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(201).send('Notification sent successfully');
  });
});

function getMessageByType(type) {
  switch (type) {
    case 'application':
      return '새로운 지원이 있습니다.';
    case 'acceptance':
      return '스터디원으로 수락되었습니다.';
    default:
      return '새로운 알림이 있습니다.';
  }
}

module.exports = router;
