const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const db = require('./db.js');

router.use(bodyParser.urlencoded({ extended: false }));

router.post('/', (req,res) => {

    const {reviewee_id, reviewer_id, post_id, rating, content} = req.body;
    
    const sql = 
        'INSERT INTO reviews (reviewee_id, reviewer_id, post_id, rating, content) VALUES (?, ?, ?, ?, ?)';
    const values = [reviewee_id, reviewer_id, post_id, rating, content];
    
    db.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error executing MuSQL query: ', error);
            res.status(500).send('Internal server error');
        }
        console.log('Review added successfully.');
        res.status(400).send('Review added successfully.');
    })
})

module.exports = router;