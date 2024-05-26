const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.get('/user/:userId/posts', (req, res) => {
    const userId = req.params.userId;
    const sql = `SELECT * FROM posts WHERE writer_id = ?`;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(200).json(results);
    });
});

module.exports = router;
