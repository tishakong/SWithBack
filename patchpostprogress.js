const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('./db.js');

router.use(bodyParser.urlencoded({ extended: false }));

router.patch('/', (req,res) => {
    const { post_id, progress } = req.body;
    const query = 'UPDATE posts SET progress = ? WHERE post_id = ?';

    db.query(query, [progress, post_id], (err, result) => {
    if (err) {
        console.error('Error updating progress:', err);
        return res.status(500).json({ error: 'Failed to update progress' });
    }
    res.status(200).json({ message: 'Progress updated successfully' });
  });
});

module.exports = router;