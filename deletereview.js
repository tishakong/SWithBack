const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.delete('/:post_id', (req, res) => {
    const post_id = req.params.post_id;
    const sql =     'DELETE FROM reviews WHERE post_id = ?';

    db.query(sql, post_id, (error, results) => {
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