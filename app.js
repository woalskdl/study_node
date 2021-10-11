let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.listen(3000, function (){
    console.log("start!!! express server on port 3000");
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

// url routing
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/public/main.html");
});

app.get('/main', function(req, res) {
    res.sendFile(__dirname + "/public/main.html");
});

app.post('/email_post', function (req, res){
    console.log(req.body.email);
    // res.send("<h1>welcome! <br/> " + req.body.email + "</h1>");
    res.render('email.ejs', {'email' : req.body.email})
});

app.post('/ajax_send_email', function (req, res){
    console.log('ajax started');
    // check validation > input value (select db)
    let resData = {'result' : 'ok', 'email' : req.body.email};
    res.json(resData);
})