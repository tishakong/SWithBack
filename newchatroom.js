//newchatroom.js
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
        
        if (results.length === 0) { //게시글에 연결된 채팅방이 없다면 
            db.query(`INSERT INTO chat_rooms (post_id) VALUES (?)`, [post_id], (error, results) => { //새로 채팅방 생성
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

//프론트엔드에서 postId를 받는다.
//postId를 post_id로 가지는 chat_rooms 레코드가 있는지 확인한다.
//없다면, chat_rooms 레코드를 생성한다. 그리고 posts 테이블에서 post_id가 postId인 레코드의 writer_id를 불러온다. 
//불러온 writer_id로 chat_mem테이블에 새로운 채팅방 ID로 member_id가 writer_id인 레코드를 만든다.
//applications 테이블로 가서 post_id가 postId이고, status가 '수락'인 applicant_id도 member_id로 추가.
//있다면, applications 테이블로 가서 post_id가 postId이고, status가 '수락'인 applicant_id가 chat_mem테이블에 있는지 확인하고, 없는 사람만 추가.
