var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

// DATABASE SETTING
var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : '9325',
    database : 'study_node'
});

connection.connect();

router.post('/form', function (req, res){
    console.log(req.body.email);
    res.render('email.ejs', {'email' : req.body.email})
});

router.post('/ajax', function (req, res){
    let email = req.body.email;
    let responseData = {};

    let query = connection.query('SELECT name FROM user WHERE email = "' + email + '"', function (err, rows) {
        if(err) throw err;
        if(rows[0]) {
            console.log(rows[0].name);
            responseData.result = "ok";
            responseData.name = rows[0].name;
        }else{
            console.log('none : ' + rows[0]);
            responseData.result = "none";
            responseData.name = "";
        }

        res.json(responseData);
    })
});

module.exports = router;