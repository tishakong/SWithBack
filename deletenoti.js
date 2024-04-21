const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const db = require('./db.js');

router.use(bodyParser.urlencoded({ extended: false }));

router.delete('/', (req, res) => {
    const {user_id, noti_id} = req.body;
    const sql =     'DELETE FROM notifications WHERE user_id = ? AND noti_id = ?';
    const values = [user_id, noti_id];
    db.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error executing MySQL query: ',error);
            res.status(500).send('Internal server error');
            return;
        }

        console.log('${user_id} Noti ${noti_id} deleted successfully');
        res.status(200).send('${user_id} Noti ${noti_id} deleted successfully'); 
    });

});

module.exports = router;