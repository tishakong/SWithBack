const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.post('/', (req, res) => {
  const { post_id, aq_id, applicant_id, aqa_content } = req.body;

  for (let i = 0; i < aq_id.length; i++) {
    const currentAqId = aq_id[i];
    const currentAqaContent = aqa_content[i];

    const sql = `
      INSERT INTO advance_a (post_id, aq_id, applicant_id, aqa_content) 
      VALUES (?, ?, ?, ?)
    `;
    const values = [post_id, currentAqId, applicant_id, currentAqaContent];

    db.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error querying database: ' + err.stack);
        res.status(500).send('Internal Server Error');
        return;
      }
      console.log(currentAqId, 'advance answer added successfully:', currentAqaContent);
    });
  }

  res.status(201).send('all advance answer added successfully');
});

module.exports = router;
