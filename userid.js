const express = require('express');
const db = require('./db.js');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    
    db.query('SELECT * FROM users WHERE user_id = ?', user_id, (err, results) => {
        if (err) {
            console.error('Error fetching user information: ' + err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const user = results[0];
        res.status(200).json(user);
    });
});


// 유저 정보 업데이트
app.put('/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const { nickname, major1, major2, major3, major1_change_log, introduction, all_noti, chatroom_noti, qna_noti, accept_noti, review_noti, user_image } = req.body;

    const query = `
        UPDATE users 
        SET 
            nickname = ?, 
            major1 = ?, 
            major2 = ?, 
            major3 = ?, 
            major1_change_log = ?, 
            introduction = ?, 
            all_noti = ?, 
            chatroom_noti = ?, 
            qna_noti = ?, 
            accept_noti = ?, 
            review_noti = ?,
            user_image = ?
        WHERE user_id = ?
    `;

    const values = [nickname, major1, major2, major3, major1_change_log, introduction, all_noti, chatroom_noti, qna_noti, accept_noti, review_noti, user_image, user_id];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating user information: ' + err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.status(200).json({ message: 'User updated successfully' });
    });
});

// 비밀번호 재설정
app.put('/reset-password/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const { password } = req.body;

    const query = `
        UPDATE users 
        SET 
            password = ?
        WHERE user_id = ?
    `;

    const values = [password, user_id];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating password: ' + err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.status(200).json({ message: 'Password updated successfully' });
    });
});



module.exports = app;
