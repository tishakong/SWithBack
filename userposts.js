const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.get('/posts/:postId', (req, res) => {
    const postId = req.params.postId;
    const sql = `SELECT * FROM posts WHERE post_id = ?`;

    db.query(sql, [postId], (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length > 0) {
            res.status(200).json(results[0]); // 단일 객체 반환
        } else {
            res.status(404).send('Post not found');
        }
    });
});

module.exports = router;
