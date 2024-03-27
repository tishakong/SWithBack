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
                //res.redirect('/');///
                res.status(200);
                res.end();              
            } else {
                res.send('login failed');
                res.status(500);    
            }
        });
    } else {
        res.send('Enter your email and password');  
        res.status(501);  
        res.end();
    }
});


module.exports = router;