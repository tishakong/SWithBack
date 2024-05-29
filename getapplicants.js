const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.get('/:postId', (req, res) => {
    const post_id = req.params.postId;

    const query = `
        SELECT 
            a.applicant_id,
            u.nickname,
            u.user_image,
            LEFT(u.student_id, 2) AS student_id,
            m1.major_name AS major1,
            m2.major_name AS major2,
            m3.major_name AS major3
        FROM 
            applications a
        JOIN 
            users u ON a.applicant_id = u.user_id
        LEFT JOIN 
            majors m1 ON u.major1 = m1.major_id
        LEFT JOIN 
            majors m2 ON u.major2 = m2.major_id
        LEFT JOIN 
            majors m3 ON u.major3 = m3.major_id
        WHERE 
            a.post_id = ?;
    `;

    db.query(query, [post_id], (err, results) => {
        if (err) {
            console.error('Error fetching applicants information: ' + err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.status(200).json({ data: results });
    });
});

module.exports = router;