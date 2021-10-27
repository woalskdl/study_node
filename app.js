var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// ROUTER
var router = require('./router/index');

// PASSPORT, SESSION, FLASH
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var flash = require('connect-flash');

app.listen(3000, function (){
    console.log("start!!! express server on port 3000");
});

// MODULE SETTING (ROUTER ALSO CAN USE)
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// ROUTING
app.use(router);