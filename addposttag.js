const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.post('/', (req, res) => {
  const { post_id, tags } = req.body;

  // tags를 배열로 받아 forEach로 반복 수행. front에서 배열로 보내줘야함!
  tags.forEach(tag => {
    const sql = `
      INSERT INTO post_tags (post_id, tag) 
      VALUES (?, ?)
    `;
    const values = [post_id, tag];

    db.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error querying database: ' + err.stack);
        res.status(500).send('Internal Server Error');
        return;
      }
      console.log('Tag added successfully:', tag);
    });
  });

  res.status(201).send('Tags added successfully');
});


module.exports = router;
