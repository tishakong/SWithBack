const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db.js');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const { email, password, name, studentnum, nickname, profile_image, major1, major2, major3, introduction } = req.body;

    const newUser = {
        email,
        password,
        name,
        studentnum,
        nickname,
        profile_image,
        major1,
        major2: major2 || null,
        major3: major3 || null,
        introduction: introduction || null
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
