const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.post('/', (req, res) => {
  const { post_id, aq_id, aq_content } = req.body;

  for (let i = 0; i < aq_id.length; i++) {
    const currentAqId = aq_id[i];
    const currentAqContent = aq_content[i];

    const sql = `
      INSERT INTO advance_q (post_id, aq_id, aq_content) 
      VALUES (?, ?, ?)
    `;
    const values = [post_id, currentAqId, currentAqContent];

    db.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error querying database: ' + err.stack);
        res.status(500).send('Internal Server Error');
        return;
      }
      console.log(currentAqId, 'advance question added successfully:', currentAqContent);
    });
  }
  res.send('advance question added successfully');
});


module.exports = router;
