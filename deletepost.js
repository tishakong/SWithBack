const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.delete('/', (req, res) => {
    const sql = `
    DELETE FROM posts
    WHERE post_id = ?
  `;
    const values = [post_id];

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