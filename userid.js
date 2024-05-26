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

module.exports = app;
