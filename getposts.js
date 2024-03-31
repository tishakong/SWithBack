const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.get('/', (req, res) => {
    const sql = `
    SELECT * 
    FROM posts
  `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(200).json(results);
    });
});

module.exports = router;
