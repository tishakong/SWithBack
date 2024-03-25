const express = require('express'); 

var router = express.Router();



///////////// 로그아웃
router.get('/', function(req, res) {
    req.session.loggedin = false;
    res.send('<script type="text/javascript">alert("성공적으로 로그아웃 되었습니다."); document.location.href="/";</script>');    
    res.end();
  });

  module.exports = router;
 