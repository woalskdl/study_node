var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

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
    let msg;
    let errMsg = req.flash('error');
    if(errMsg) msg = errMsg;
    console.log('get join url');
    res.render('join.ejs', {'message' : msg});
});

passport.serializeUser((user,done) => {
    console.log('passport session save : ', user.id);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('passport session get id : ', id);
    done(null, id);
});

passport.use('local-join', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    }, (req, email, password, done) => {
        let query = connection.query('SELECT * FROM user WHERE email = ?', [email], (err, rows) => {
            if(err) return done(err);

            if(rows.length){
                console.log('existed user');
                return done(null, false, {message : 'Your email is already using'});        // >> faliureRedirect
            }else{
                let sql = {email : email, pw : password};
                query = connection.query('INSERT INTO user SET ?', sql, (err, rows) => {
                    if(err) throw err;
                    return done(null, {'email' : email, 'id' : rows.insertId});
                })
            }
        })


        console.log('local-join callback called');
    }
));

router.post('/', passport.authenticate('local-join', {
                successRedirect : '/main',
                failureRedirect : '/join',
                failureFlash : true
            }
        )
);

// router.post('/', (req, res) => {
//     let body = req.body;
//     let email = body.email;
//     let name = body.name;
//     let password = body.password;
//
//     console.log('data get started');
//
//     let sql = {email : email, name : name, pw : password};      // ESCAPE
//     let query = connection.query('INSERT INTO user SET ?', sql, (err, rows) => {
//         if(err) throw err;
//         console.log("DB has been inserted");
//         res.render('welcome.ejs', {'name' : name, 'no' : rows.insertId});
//     });
// });

module.exports = router;