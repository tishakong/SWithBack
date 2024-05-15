const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.patch('/:post_id', (req, res) => {
  const { post_id } = req.params;

  const sql = `
    UPDATE posts
    SET view_count = view_count + 1
    WHERE post_id = ?
  `;
  
  const values = [post_id];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('데이터베이스 쿼리 중 에러 발생: ' + err.stack);
      return res.status(500).send('내부 서버 오류');
    }

    if (results.affectedRows === 0) {
      return res.status(404).send('해당 post_id를 가진 포스트를 찾을 수 없습니다.');
    }

    return res.status(200).send('조회수 증가 완료.');
  });
});

module.exports = router;
