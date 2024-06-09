const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.put('/', (req, res) => {
    const { post_id, tags } = req.body;

    if (!post_id || !Array.isArray(tags)) {
        return res.status(400).send('Invalid request');
    }

    // Fetch existing tags
    db.query('SELECT tag FROM post_tags WHERE post_id = ?', [post_id], (err, results) => {
        if (err) {
            console.error('Error fetching existing tags: ' + err.stack);
            return res.status(500).send('Internal Server Error');
        }

        const existingTags = results.map(row => row.tag);
        const newTagsSet = new Set(tags);
        const existingTagsSet = new Set(existingTags);

        const tagsToDelete = existingTags.filter(tag => !newTagsSet.has(tag));
        const tagsToAdd = tags.filter(tag => !existingTagsSet.has(tag));

        // Delete tags that are no longer present
        if (tagsToDelete.length > 0) {
            db.query('DELETE FROM post_tags WHERE post_id = ? AND tag IN (?)', [post_id, tagsToDelete], (err, results) => {
                if (err) {
                    console.error('Error deleting tags: ' + err.stack);
                    return res.status(500).send('Internal Server Error');
                }

                // Insert new tags after deleting old ones
                if (tagsToAdd.length > 0) {
                    const values = tagsToAdd.map(tag => [post_id, tag]);
                    db.query('INSERT INTO post_tags (post_id, tag) VALUES ?', [values], (err, results) => {
                        if (err) {
                            console.error('Error inserting tags: ' + err.stack);
                            return res.status(500).send('Internal Server Error');
                        }
                        res.status(200).send('Tags updated successfully');
                    });
                } else {
                    res.status(200).send('Tags updated successfully');
                }
            });
        } else {
            // Insert new tags if no tags to delete
            if (tagsToAdd.length > 0) {
                const values = tagsToAdd.map(tag => [post_id, tag]);
                db.query('INSERT INTO post_tags (post_id, tag) VALUES ?', [values], (err, results) => {
                    if (err) {
                        console.error('Error inserting tags: ' + err.stack);
                        return res.status(500).send('Internal Server Error');
                    }
                    res.status(200).send('Tags updated successfully');
                });
            } else {
                res.status(200).send('Tags updated successfully');
            }
        }
    });
});

module.exports = router;
