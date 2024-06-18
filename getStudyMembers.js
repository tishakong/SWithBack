//getStudyMembers.js
const express = require('express');
const router = express.Router();
const db = require('./db.js');

// 특정 유저가 속한 모든 채팅방의 멤버 정보 조회
router.post('/', (req, res) => {
    const { userId } = req.body;

    const query = `
        SELECT DISTINCT 
        u.user_id, 
        u.nickname, 
        u.user_image,
        LEFT(u.student_id, 2) AS student_id, 
        m1.major_name AS major1,
        m2.major_name AS major2,
        m3.major_name AS major3
        FROM 
            chat_room_mem cm1
        JOIN 
            chat_room_mem cm2 ON cm1.room_id = cm2.room_id
        JOIN users u ON cm2.member_id = u.user_id
        LEFT JOIN 
            majors m1 ON u.major1 = m1.major_id
        LEFT JOIN 
            majors m2 ON u.major2 = m2.major_id
        LEFT JOIN 
            majors m3 ON u.major3 = m3.major_id
        WHERE cm1.member_id = ? AND cm2.member_id != ?
    `;

    db.query(query, [userId, userId], (err, results) => {
        if (err) {
            console.error('Error fetching study members information: ' + err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.status(200).json({ data: results });
    });
});

module.exports = router;
