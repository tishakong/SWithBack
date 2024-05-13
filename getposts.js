const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.get('/:postId?', (req, res) => {
    const postId = req.params.postId;
    let sql = `
        SELECT * 
        FROM posts
    `;

    if (postId) {
        sql += ` WHERE post_id = ?`;
    }

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
            // 포스트 데이터를 JSON 형식으로 응답
            res.status(200).json(results);
        }
    });
});

module.exports = router;
