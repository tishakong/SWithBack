// - 방장이 게시글에서 모집 완료 버튼을 눌렀을 경우
//     - 해당 게시글 ID와 연결된 채팅방이 없다면 채팅방이 생성된다. 
// 채팅방 생성시 방장의 화면은 곧바로 채팅방 화면으로 전환된다. (채팅방 생성 알림은 따로 없음)
//     - 해당 게시글 ID와 연결된 채팅방이 이미 있다면 채팅방 생성이 되지 않는다.

const express = require('express'); 
const router = express.Router();
const db = require('./db');

router.post('/', (req,res) => {

    const { post_id } = req.body;
    
    db.query('SELECT post_id FROM chat_rooms WHERE post_id = ?', [post_id], (error, results) => {
        if (error) {
            console.error('Error occurred while checking chat room:', error);
            return;
          }
        
        if (results.length === 0) {
            db.query(`INSERT INTO chat_rooms (post_id) VALUES (?)`, [post_id], (error, results) => {
                if (error) {
                    console.error('Error occurred while creating chat room:', error);
                    return;
                }
                console.log('Chat room created successfully for post_id:', post_id);
                res.status(200).send('Chat room created successfullly.');
            });
        } else {
            console.log('Chat room already exists for post_id:', post_id);
            res.status(500).send('Chat room already exists.');
        }
    });
});

module.exports = router;