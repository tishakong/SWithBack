const express = require('express');
const db = require('./db.js');
const app = express();

app.use(express.json());

app.post('/setnoti', (req, res) => {
    const { userId, all_noti = true, chatroom_noti = true, qna_noti = true, accept_noti = true, review_noti = true } = req.body;

    const notificationSettings = all_noti ? {
        all_noti,
        chatroom_noti,
        qna_noti,
        accept_noti,
        review_noti
    } : {
        all_noti,
        chatroom_noti: false,
        qna_noti: false,
        accept_noti: false,
        review_noti: false
    };

    db.query('UPDATE users SET ? WHERE id = ?', [notificationSettings, userId], (err, results) => {
        if (err) {
            console.error('Error updating notification settings: ' + err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log('Notification settings updated for user ID: ' + userId);
        res.status(200).json({ message: 'Notification settings updated successfully' });
    });
});

module.exports = app;
