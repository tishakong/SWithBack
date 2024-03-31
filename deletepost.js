const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.delete('/:post_id', (req, res) => {
    const postId = req.params.post_id;

    const sql = `
    DELETE FROM posts
    WHERE post_id = ?
  `;
    const values = [postId];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Post not found');
            return;
        }
        res.status(200).send('Post deleted successfully');
    });
});

module.exports = router;
