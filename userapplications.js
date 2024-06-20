const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.get('/user/:user_id/applications', (req, res) => {
    const user_id = req.params.user_id;
    const sql = `SELECT * FROM applications WHERE applicant_id = ?`;

    db.query(sql, [user_id], (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }

        const postIds = results.map(result => result.post_id);

        if (postIds.length === 0) {
            res.status(200).json([]);
            return;
        }

        const postIdsString = postIds.join(',');

        const postSql = `SELECT * FROM posts WHERE post_id IN (${postIdsString})`;

        db.query(postSql, (postErr, postResults) => {
            if (postErr) {
                console.error('Error querying posts: ' + postErr.stack);
                res.status(500).send('Internal Server Error');
                return;
            }
            
            res.status(200).json(postResults);
        });
    });
});

module.exports = router;
