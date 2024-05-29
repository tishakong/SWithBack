const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.get('/user/:user_id/applications', (req, res) => {
    const user_id = req.params.user_id;
    const sql = `SELECT * FROM applications WHERE applicant_id = ?`;

    db.query(sql, [user_id], (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        // 결과에서 각각의 포스트 ID만 추출하여 배열로 만듭니다.
        const postIds = results.map(result => result.post_id);
        // 포스트 ID 배열을 쉼표로 구분하여 문자열로 변환합니다.
        const postIdsString = postIds.join(',');
        // 포스트 ID 배열에 해당하는 포스트들을 불러오는 SQL 쿼리를 생성합니다.
        const postSql = `SELECT * FROM posts WHERE post_id IN (${postIdsString})`;

        // 생성한 SQL 쿼리를 실행하여 해당 포스트들을 가져옵니다.
        db.query(postSql, (postErr, postResults) => {
            if (postErr) {
                console.error('Error querying posts: ' + postErr.stack);
                res.status(500).send('Internal Server Error');
                return;
            }
            // 결과를 클라이언트에게 반환합니다.
            res.status(200).json(postResults);
        });
    });
});

module.exports = router;
