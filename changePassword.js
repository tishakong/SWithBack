// changePassword.js
const express = require('express');
const db = require('./db.js');
const app = express();
const port = 3000;

app.use(express.json());

app.put('/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const { password } = req.body;

    const query = `
        UPDATE users 
        SET 
            password = ?,
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

        res.status(200).json({ message: 'User updated successfully' });
    });
});

module.exports = router;
