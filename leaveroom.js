// leaveroom.js
// 채팅방 나가기, 내보내기 에서 사용
// chat_room_mem의 is_left를 1로 변경

const express = require('express'); 
const router = express.Router();
const db = require('./db');

router.post('/', (req, res) => {
    const { roomId, memberId } = req.body;
  
    const query = 'UPDATE chat_room_mem SET is_left = 1 WHERE room_id = ? AND member_id = ?';
    db.query(query, [roomId, memberId], (err, results) => {
      if (err) {
        console.error('Error updating data:', err);
        return res.status(500).send('Failed to leave room');
      }
      if (results.affectedRows > 0) {
        res.status(200).send('Successfully left the room');
      } else {
        res.status(404).send('Room or member not found');
      }
    });
  });

  module.exports = router;