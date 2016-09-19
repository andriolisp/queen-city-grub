var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var router = express.Router();
var path = require('path');
var request = require('request');

var QuickReplyController = require('./QuickReplyController');
var PostbackController = require('./PostbackController');

var MessageController = require('./MessageController');

var ValueObjectsController = require('./ValueObjectsController');


var session = require('express-session');

var bodyParser = require('body-parser');
var token = 'EAAXtudRZBgpEBABXXZBxjl71DverAPhM3nWbre6VLUop2585TWjMxtNk3oJv7eVSEPivB9I39Jtp7xHZAdccLZCQv9kLfV4ZAuL2ZBzGMlUxmelPKKnTCZCFZCi87SiFciEMa5M4k1GzEyg6V7jQPJhPasEMyVLnN82sOU02axCaSQZDZD';

app.set('port', (process.env.PORT || 5000));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.static('./public'));

// Process application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(app.router);
app.use(express.static(path.join(__dirname, 'code')));

app.use(cookieParser());
app.use(session({
  secret: '1234567890QWERTY',
  resave: false,
  saveUninitialized: true,
  cookie: {
    path: '/',
    httpOnly: false,
    maxAge: 1000*60*60*24*30*12 
  }
}));


// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var thesession;
app.get('/',function(req,res){
  thesession = req.session;
  res.send('This is QUEENCITYGRUB Server');
});

//============================================
app.get('/hello', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.send('INDEX Hello from Express Heroku  QUEENCITYGRUB'); 
});


//================================= events or message types coming from Messenger ===========
//message_deliveries, message_echoes, message_reads, messages, messaging_account_linking, messaging_optins, messaging_postbacks

//============================================
// this allows Facebook verify that the API Webhook exists
app.get('/messengerwebhook/', function(req, res) {
    if (req.query['hub.verify_token'] === 'messenger_webhook_queencitygrub') {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Error, wrong validation token');
    }
});

//============================================
// this is the hub where all messages come in and are handled and dispensed to the rest of the app 
app.post('/messengerwebhook/', function (req, res) {
    //req.session.lastPage = '/messengerwebhook';

    console.log(JSON.stringify(req.body));
    
    messaging_events = req.body.entry[0].messaging;

    var sender = 0;
    var recipient = 0;
        
    for (i = 0; i < messaging_events.length; i++) {

        event = req.body.entry[0].messaging[i]
        sender = event.sender.id;
        recipient = event.recipient.id;

         
        if (event.message && event.message.quick_reply && !event.message.is_echo) {
            QuickReplyController.handle(sender, event.message.quick_reply.payload, token, req, res);
             continue
         }
        if (event.message && event.message.text && !event.message.is_echo) {
            
            text = event.message.text
            var newtext = text.toLowerCase();
            MessageController.messageLookup(sender, newtext, token, req, res, recipient);
            continue
            
        }
        if (event.postback) {
            
            var newtext = event.postback.payload.toLowerCase();
            PostbackController.handle(sender, newtext, token, req, res);
            
            continue
        }
    }
    res.sendStatus(200);
});


app.listen(app.get('port'), function() {
  console.log('QUEENCITYGRUB: Node app is running on port', app.get('port'));

});