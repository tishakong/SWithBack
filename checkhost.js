//checkhost.js
//방장인지 여부 보내기

const express = require('express'); 
const router = express.Router();
const db = require('./db');

router.post('/', (req, res) => {
    const { memberId, roomId } = req.body;
  
    if (!memberId || !roomId) {
      return res.status(400).json({ error: 'memberId and roomId are required' });
    }
  
    const getPostIdQuery = 'SELECT post_id FROM chat_rooms WHERE room_id = ?';
    db.query(getPostIdQuery, [roomId], (error, results) => {
      if (error) {
        console.error('Error fetching post_id:', error);
        return res.status(500).json({ error: 'Error fetching post_id' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'Room not found' });
      }
  
      const postId = results[0].post_id;
      const checkOwnerQuery = 'SELECT writer_id FROM posts WHERE post_id = ?';
      db.query(checkOwnerQuery, [postId], (error, results) => {
        if (error) {
          console.error('Error fetching writer_id:', error);
          return res.status(500).json({ error: 'Error fetching writer_id' });
        }
  
        if (results.length === 0) {
          return res.status(404).json({ error: 'Post not found' });
        }
  
        const writerId = results[0].writer_id;
        if (writerId === memberId) {
          return res.status(200).json({ isOwner: true });
        } else {
          return res.status(200).json({ isOwner: false });
        }
      });
    });
  });

  module.exports = router;