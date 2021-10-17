var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// ROUTER
var router = require('./router/index');

app.listen(3000, function (){
    console.log("start!!! express server on port 3000");
});

// MODULE SETTING (ROUTER ALSO CAN USE)
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

// ROUTING
app.use(router);