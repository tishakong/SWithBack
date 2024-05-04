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
        
        if (results.length === 0) {
            db.query(`INSERT INTO chat_rooms (post_id) VALUES (?)`, [post_id], (error, results) => {
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