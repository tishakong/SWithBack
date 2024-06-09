const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.put('/', (req, res) => {
    const { post_id, title, category, study_name, content} = req.body;

    const selectSql = 'SELECT * FROM posts WHERE post_id = ?';
    db.query(selectSql, [post_id], (selectError, selectResults) => {
        if (selectError) {
            console.error('Error selecting post:', selectError);
            res.status(500).send('Internal server error');
            return;
        }

        if (selectResults.length === 0) {
            console.error('No post found with the given ID:', post_id);
            res.status(404).send('No post found with the given ID');
            return;
        }

        const updateSql = 'UPDATE posts SET title = ?, category = ?, study_name = ?, content = ? WHERE post_id = ?';
        const values = [title, category, study_name, content, post_id];

        db.query(updateSql, values, (updateError, updateResults) => {
            if (updateError) {
                console.error('Error updating post: ', updateError);
                res.status(500).send('Internal server error');
                return;
            }

            console.log('Post updated successfully');
            res.status(200).send('Post updated successfully');
        });
    });
});

module.exports = router;
