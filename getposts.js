const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.get('/:postId?', (req, res) => {
    const postId = req.params.postId;
    let sql = `
        SELECT p.*, u.nickname, u.student_id, u.user_image, 
               m1.major_name AS major1,
               m2.major_name AS major2,
               m3.major_name AS major3,
               GROUP_CONCAT(pt.tag) AS tags
        FROM posts p
        LEFT JOIN users u ON p.writer_id = u.user_id
        LEFT JOIN majors m1 ON u.major1 = m1.major_id
        LEFT JOIN majors m2 ON u.major2 = m2.major_id
        LEFT JOIN majors m3 ON u.major3 = m3.major_id
        LEFT JOIN post_tags pt ON p.post_id = pt.post_id
    `;

    if (postId) {
        sql += ` WHERE p.post_id = ?`;
    }

    sql += ` GROUP BY p.post_id`;

    db.query(sql, [postId], (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length === 0) {
            // postId가 있을 때 해당 포스트가 없는 경우
            if (postId) {
                res.status(404).send('Post not found');
            } else {
                // postId가 없을 때 모든 포스트를 반환
                res.status(200).json(results);
            }
        } else {
            // 태그 데이터를 리스트로 변환
            results.forEach(result => {
                result.tags = result.tags ? result.tags.split(',') : [];
            });
            // 포스트 데이터를 JSON 형식으로 응답
            res.status(200).json(results);
        }
    });
});

module.exports = router;
