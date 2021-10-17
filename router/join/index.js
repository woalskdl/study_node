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

router.get('/', (req, res) => {
    console.log('get join url');
    res.sendFile(path.join(__dirname, '../../public/join.html'));
});

router.post('/', (req, res) => {
    let body = req.body;
    let email = body.email;
    let name = body.name;
    let password = body.password;

    console.log('data get started');

    let sql = {email : email, name : name, pw : password};      // ESCAPE
    let query = connection.query('INSERT INTO user SET ?', sql, (err, rows) => {
        if(err) throw err;
        console.log("DB has been inserted");
        console.log(rows.insertId, name);
    });

    res.render('welcome.ejs', {'name' : name});
});

module.exports = router;