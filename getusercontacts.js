const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.get('/:user_id', async (req, res) => {
    const user_id = req.params.user_id;

    try {
        // Find all room_ids where the user is a member
        const [rooms] = await db.query(
            `SELECT DISTINCT room_id FROM chat_room_mem WHERE member_id = ?`, [user_id]
        );

        // Check if any rooms were found
        if (rooms.length === 0) {
            return res.json([]);
        }

        // Extract room_ids
        const room_ids = rooms.map(room => room.room_id);

        // Find distinct member_ids from chat_room_mem where room_id is in the list of room_ids
        const [contacts] = await db.query(
            `SELECT DISTINCT member_id FROM chat_room_mem WHERE room_id IN (?) AND member_id != ?`, [room_ids, user_id]
        );

        // Extract member_ids of other users in the same rooms
        const other_user_ids = contacts.map(contact => contact.member_id);

        res.json(other_user_ids);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
