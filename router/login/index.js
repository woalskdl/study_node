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
    console.log('get login url');
    res.render('login.ejs', {'message' : msg});
});

// SESSION save // session 이 여기 있는 session 저장이 실행되지 않고 join 의 index.js 의 session 저장이 실행됨. 왜그럴까.
passport.serializeUser((user, done) => {
    console.log('passport session save : ', user.id);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('passport session get id : ', id);
    done(null, id);
});

passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    }, (req, email, password, done) => {
        console.log('local-login is now processing')
        let query = connection.query('SELECT * FROM user WHERE email = ?', [email], (err, rows) => {
            if(err) return done(err);

            if(rows.length){
                return done(null, {'email' : email, 'id' : rows[0].UID});
            }else{
                return done(null, false, {'message' : 'Your login info has not been found'});
            }
        });

        console.log('local-login callback called');
    }
));

router.post('/', (req, res, next) => {
        console.log('login post function  실행');
        passport.authenticate('local-login', (err, user, info) => {
            if(err) res.status(500).json(err);
            if(!user) return res.status(401).json(info.message);

            req.logIn(user, (err) => {
                if(err) return next(err);
                return res.json(user);
            });
        }) (req, res, next);
    }
);

module.exports = router;
