//viewchatroom.js


const express = require('express'); 
const router = express.Router();
const db = require('./db');

router.post('/', (req, res) => {

    const { userId } = req.body;
    if (!userId) {
        return res.status(400).send('user_id is required');
      }

    
    const query = `
    SELECT 
        posts.study_name,
        chat_rooms.room_id
    FROM 
        chat_room_mem
    JOIN 
        chat_rooms ON chat_room_mem.room_id = chat_rooms.room_id
    JOIN 
        posts ON chat_rooms.post_id = posts.post_id
    WHERE 
        chat_room_mem.member_id = ?

    `;
    db.query(query, [userId], (error, results) => {
        if (error) {
            return res.status(500).send('Database query error');
        }

        if (results.length === 0) {
            return res.status(404).send('No records found');
        }

        res.status(200).json({ status: 200, data: results });

    });
});

module.exports = router;