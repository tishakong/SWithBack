const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.get('/user/:userId/reviews', (req, res) => {
    const userId = req.params.userId;
    const sql = `SELECT * FROM reviews WHERE reviewee_id = ?`;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length === 0){
            res.status(202).send('작성된 리뷰가 없습니다.');
            return;
        }
        res.status(200).json(results);
    });
});

module.exports = router;
