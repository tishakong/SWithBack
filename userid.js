const express = require('express');
const db = require('./db.js');
const app = express();
const port = 3000;

app.use(express.json());

// 사용자 정보를 가져오는 API 엔드포인트
app.get('/:userId', (req, res) => {
    const userId = req.params.userId;

    db.query('SELECT * FROM users WHERE user_id = ?', userId, (err, results) => {
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

module.exports = app;
