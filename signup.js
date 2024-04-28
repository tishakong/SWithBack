const express = require('express');
const db = require('./db.js');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/', (req, res) => {
    const { email, password, name, student_id, nickname, user_image, major1, major1_change_log, major2, major3, introduction } = req.body;

    const newUser = {
        email,
        password,
        name,
        student_id,
        nickname,
        user_image,
        major1,
        major1_change_log: major1_change_log || false,
        major2: major2 || null,
        major3: major3 || null,
        introduction: introduction || null,
    };

    db.query('INSERT INTO users SET ?', newUser, (err, results) => {
        if (err) {
            console.error('Error registering user: ' + err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log('User registered with ID: ' + results.insertId);
        res.status(201).json({ message: 'User registered successfully' });
    });
});

module.exports = app;
