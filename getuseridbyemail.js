const express = require('express');
const db = require('./db.js');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/user/:email', (req, res) => {
    const email = req.params.email;

    db.query('SELECT user_id FROM users WHERE email = ?', [email], (err, results) => { 
        if (err) {
            console.error('Error fetching user id:', err.stack);
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
