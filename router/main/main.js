var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

// main page는 login 이 될 때만 (세션 정보가 있을 때만) 접근 가능
router.get('/', (req, res) => {
    console.log('router 실행됨', req.user);
    let id = req.user;
    if(!id) res.render('login.ejs');
    res.render('main.ejs', {'id' : id});
});

module.exports = router;