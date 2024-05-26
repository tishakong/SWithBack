const express = require('express'); 

var router = express.Router();
var bodyParser = require('body-parser');
const connection = require('./db');

router.use(bodyParser.urlencoded({ extended: false }));


////로그인
router.post('/', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    if (email && password) {
        connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.email = email;
                // 로그인 성공 시 해당 유저의 아이디 반환
                var user_id = results[0].user_id;  // 결과에서 user_id를 가져옴
                console.log(user_id);

                // 로그인 성공 시 JSON 응답 반환
                res.status(200).json({
                     message: "Logged in successfully",
                     user_id: user_id // userId를 응답에 포함 
                    });
            } else {
                // 로그인 실패 시 JSON 응답 반환
                res.status(401).json({ message: "Invalid email or password" });
            }
        });
    } else {
        res.status(400).json({ message: "Email and password are required" });
    }
});


module.exports = router;