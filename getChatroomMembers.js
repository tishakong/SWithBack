// getChatroomMembers.js
// 채팅방 내부 메뉴에서 멤버 목록 표시

const express = require('express'); 
const router = express.Router();
const db = require('./db');

router.get('/:roomId', (req, res) => {
    const roomId = req.params.roomId;

    const query = `
    SELECT crm.member_id, u.nickname
    FROM chat_room_mem crm
    JOIN users u ON crm.member_id = u.user_id
    WHERE crm.room_id = ? AND crm.is_left != 1;
     `;

    db.query(query, [roomId], (err, results) => {   
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(200).json(results);
    });

});

module.exports = router;