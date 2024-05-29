const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.post('/', (req, res) => {
    const { post_id, applicant_id } = req.body;

    const query = `
        SELECT 
            aq.aq_id,
            aq.aq_content,
            aqa.aqa_content
        FROM 
            advance_a aqa
        JOIN 
            advance_q aq ON aqa.aq_id = aq.aq_id AND aqa.post_id = aq.post_id
        WHERE 
            aqa.post_id = ? AND aqa.applicant_id = ?
        ORDER BY 
            aq.aq_id;
    `;

    db.query(query, [post_id, applicant_id], (err, results) => {
        if (err) {
            console.error('Error fetching advance answers: ' + err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.status(200).json({ data: results });
    });
});

module.exports = router;
