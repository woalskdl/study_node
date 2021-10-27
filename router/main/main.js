var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

router.get('/', (req, res) => {
    console.log('router 실행됨', req.user);
    let id = req.user;
    res.sendFile(path.join(__dirname, "../../public/main.html"));
});

module.exports = router;