var express = require('express');
var bodyParser = require('body-parser');

var MessengerController = require('./Messengercontroller');


var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Process application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve public files
app.use(express.static('./public'));

app.get('/',function(req,res){
  res.send('This is QUEENCITYGRUB Server');
});

app.get('/messengerwebhook/', function(req, res) {
    if (req.query['hub.verify_token'] === 'messenger_webhook_queencitygrub') {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Error, wrong validation token');
    }
});

app.post('/messengerwebhook/', function (req, res) {

    console.log("");
    console.log("REQUEST BODY");
    console.log(JSON.stringify(req.body));
    console.log("");

    req.body.entry.forEach(function (entry) {

        var entryId = entry.id;
        var timeOfEntry = entry.time;

        entry.messaging.forEach(function (event) {

            if (event.optin) {
                
                //receivedAuthentication(event);

            } else if (event.message) {
                
                MessengerController.receiveMessage(event);

            } else if (event.delivery) {
                
                //receivedDeliveryConfirmation(event);

            } else if (event.postback) {
                
                MessengerController.receivePostback(event);

            } else {
                
                console.log("Webhook received unknown event: ", event);

            }

        });

    });

    res.sendStatus(200);
    
});


app.listen(app.get('port'), function() {
  console.log('QUEENCITYGRUB: Node app is running on port', app.get('port'));
});