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
                res.redirect('/');///
                res.end();              
            } else {
                res.send('<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); document.location.href="/login";</script>');    
            }
        });
    } else {
        res.send('<script type="text/javascript">alert("email과 password를 입력하세요!"); document.location.href="/login";</script>');    
        res.end();
    }
});


module.exports = router;