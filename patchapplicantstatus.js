const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.post('/', (req, res) => {
    const { applicant_id, status, post_id } = req.body;

    const query = `
        UPDATE applications
        SET status = ?
        WHERE applicant_id = ? AND post_id = ?;
    `;

    db.query(query, [status, applicant_id, post_id], (err, results) => {
        if (err) {
            console.error('Error updating application status: ' + err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.status(200).send('Application status updated successfully');
    });
});

module.exports = router;
