//newchatroom.js
const express = require('express'); 
const router = express.Router();
const db = require('./db');

router.post('/', (req,res) => {

    const { post_id } = req.body;
    
    // 게시글에 연결된 채팅방이 있는지 확인
    db.query('SELECT room_id FROM chat_rooms WHERE post_id = ?', [post_id], (error, results) => { 
        if (error) {
            console.error('Error occurred while checking chat room:', error);
            return;
          }
        
        if (results.length === 0) { //게시글에 연결된 채팅방이 없다면 
            //새로 채팅방 생성
            db.query('INSERT INTO chat_rooms (post_id) VALUES (?)', [post_id], (error, results) => { 
                if (error) {
                    console.error('Error executing MySQL query: ' + error);
                    res.status(500).send('Internal Server Error1');
                    return;
                }
                const room_id = results.insertId; //auto increment primary key
                
                // 방장 ID 불러오기
                db.query('SELECT writer_id FROM posts WHERE post_id = ?', [post_id], (error, results) => {
                    if (error) {
                        console.error('Error executing MySQL query: ' + error);
                        res.status(500).send('Internal Server Error2');
                        return;
                    }
                    const writer_id = results[0].writer_id;

                    //방장 추가
                    db.query('INSERT INTO chat_room_mem (room_id, member_id) VALUES (?, ?)', [room_id, writer_id], (error, results) => {
                        if (error) {
                            console.error('Error executing MySQL query: ' + error);
                            res.status(500).send('Internal Server Error3');
                            return;
                        }
                        // 수락된 지원자 불러오기
                        db.query('SELECT applicant_id FROM applications WHERE post_id = ? AND status = "수락"', [post_id], (error, results) => {
                            if (error) {
                                console.error('Error executing MySQL query: ' + error);
                                res.status(500).send('Internal Server Error4');
                                return;
                            }
                            const applicants = results.map(result => [room_id, result.applicant_id]);

                            //수락된 지원자 채팅방에 추가
                            db.query(`INSERT INTO chat_room_mem (room_id, member_id) VALUES ?`, [applicants], (error, results) => {
                                if (error) {
                                    console.error('Error executing MySQL query: ' + error);
                                    res.status(500).send('Internal Server Error5');
                                    return;
                                }
                                res.status(200).send('New chat room created successfully');
                            });
                        });
                    
                    });

                });
                
            });
        } else { // 이미 채팅방이 있는 경우
            console.log('Chat room already exists for post_id:', post_id);
            const room_id = results[0].room_id; // 채팅방 ID
            // 수락인 지원자들
            db.query('SELECT applicant_id FROM applications WHERE post_id = ? AND status = "수락"', [post_id], (error, results) => {
                if (error) {
                    console.error('Error executing MySQL query: ' + error);
                    res.status(500).send('Internal Server Error6');
                    return;
                }
                const applicants = results.map(result => [room_id, result.applicant_id]); 
                //새로운 지원자들만 추가
                applicants.forEach(applicant => {
                    db.query('INSERT IGNORE INTO chat_room_mem (room_id, member_id) VALUES ?', [applicants], (error, results) => {
                        if (error) {
                            console.error('Error executing MySQL query: ' + error);
                            res.status(500).send('Internal Server Error7');
                            return;
                        }
                        
    
                    }); 
                });

                res.status(200).send('Chat room updated successfully');
                


            });
        }
    });
});

module.exports = router;