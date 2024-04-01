const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const db = require('./db.js');

router.use(bodyParser.urlencoded({ extended: false }));

router.delete('/', (req, res) => {
    const {reviewer_id, reviewee_id, post_id} = req.body;
    const sql =     'DELETE FROM reviews WHERE reviewer_id = ? AND reviewee_id = ? AND post_id = ?';
    const values = [reviewer_id, reviewee_id, post_id];
    db.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error executing MySQL query: ',error);
            res.status(500).send('Internal server error');
            return;
        }

        console.log('Review with post_id ${postId} deleted successfully');
        res.status(200).send('Review with post_id ${postId} deleted successfully'); 
    });

});

module.exports = router;