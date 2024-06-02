const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.get('/:postId', (req, res) => {
    const post_id = req.params.postId;

    const query = `SELECT * FROM qnas WHERE post_id = ? ORDER BY q_created_at DESC`;

    db.query(query, [post_id], (err, results) => {
        if (err) {
            console.error('Error fetching qna ' + err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(200).json(results);
    });
});

module.exports = router;