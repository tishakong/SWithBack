const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.put('/:id', (req,res) => {
    const post_id = req.params.id;
    const {user_id, title, category, chat_name, content, progress } = req.body;
    const sql = 'UPDATE posts SET title = ?, category = ?, chat_name = ?, content = ?, progress = ? WHERE id = ?';
    const values = [title, category, chat_name, content, progress, post_id];
    db.query(sql, values, (error, results)=> {
        if(error) throw error;
        
        res.status(200).send('Post updated successfully');
    });

});

module.exports = router;