// getChatroomMessages.js

const express = require('express'); 
const router = express.Router();
const db = require('./db');

router.post('/', (req, res) => {

    const { roomId } = req.body;
    if (!roomId) {
        return res.status(400).send('room_id is required');
    }
    
    const query = `
    SELECT c.sender_id, c.chat_time, c.content, u.nickname 
    FROM chats c
    JOIN users u ON c.sender_id = u.user_id
    WHERE c.room_id = ?
    ORDER BY c.chat_time ASC
    `;

    db.query(query, [roomId], (error, results) => {
        if (error) {
            return res.status(500).send('Database query error');
        }

        if (results.length === 0) {
            return res.status(404).send('No records found');
        }

        res.status(200).json({ status: 200, data: results });
    })

    
})

module.exports = router;