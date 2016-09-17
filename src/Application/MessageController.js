var request = require("request");
var PostbackController = require('./PostbackController');
var ValueObjectsController = require('./ValueObjectsController');
var express = require('express');
var app = express();
var router = express.Router();

function MessageController() {
}

// package object to send to MOX
// "defaultLocation": "[lat, lng]", (package as array)
// "message": "words go here",
// "response": "0, 1, 2" (numeric)
// "userId": ' ' (Facebook User ID)
// "monteCarlo": true or false

// response of monte carlo
// "question": ' .... ',


// response of NOT monte carlo
// "location": "[lat, long]", (package as array)
// "restaurants": "[JSON objects]", (package as array)

// use for both
// "isDone": true or false  (always true for monte carlo otherwise false )



//==========================================
MessageController.messageLookup = function (sender, text, token, req, res, recipient) {
    
 // console.log("MESSAGE_CONTROLLER QueenCityGrub messageLookup text = "+text);

    var textToReturn = "";
    var passThrough = "yes";
    var theData = null;
    var newtext = text.toLowerCase();
  
  switch(newtext){
      case "startbot":
        console.log("MESSAGE_CONTROLLER QueenCityGrub checkOneWord startbot ... ");
        passThrough = "no";
        //MasterController.sendMainMenu(sender, token);
        //sendSearchSummaryPostback(sender, token, "casual", "30.01-50.00");
        textToReturn = "This should work MESSAGE...";
        sendTextMessageMessage(sender, textToReturn, token, recipient);
        break;
        
    case "start_queencitygrub":
        console.log("MESSAGE_CONTROLLER QueenCityGrub checkOneWord start_queencitygrub ... ");
        passThrough = "no";
        //MasterController.sendMainMenu(sender, token);
        //sendSearchSummaryPostback(sender, token, "casual", "30.01-50.00");
        textToReturn = "This should work for start_queencitygrub...";
        sendTextMessageMessage(sender, textToReturn, token, recipient);
        break;

        
    default:
     // "defaultlocation": "[lat, lng]", (package as array)
    // "message": "words go here",
    // "response": "0, 1, 2" (numeric)
    // "userid": ' ' (Facebook User ID)
    // "montecarlo": true or false
    var request = {};
    
    MuxService.handleRequest(request).then(function (response) {
        
        // "question": ' .... ',
        // "location": "[lat, long]", (package as array)
        // "restaurants": "[JSON objects]", (package as array)
        // "isDone": true or false  (always true for monte carlo otherwise false )
        
        });
        
  }
    
    //=====================
    

    
}



//============================================
function doErrorMessage(sender, text, token, recipient) {
    textToReturn = "Sorry, can't find that information, but I will pass along your question to the Bot Master..."+text;
    sendTextMessageMessage(sender, textToReturn, token, recipient);
}


//============================================
function sendTextMessageMessage(sender, text, token, recipient) {
    messageData = {
        text:text
    }
    
    console.log("MESSAGE_CONTROLLER QueenCityGrub sendTextMessageMessage sender = "+sender);
    console.log("MESSAGE_CONTROLLER QueenCityGrub sendTextMessageMessage text = "+text);
    console.log("MESSAGE_CONTROLLER QueenCityGrub sendTextMessageMessage recipient = "+recipient);
    console.log("MESSAGE_CONTROLLER QueenCityGrub sendTextMessageMessage token = "+token);
    request({
        url: 'https://graph.facebook.com/v2.7/me/messages',
        qs: {access_token: token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('MESSAGE_CONTROLLER QueenCityGrub sendTextMessageMessage Error : ', error)
        } else if (response.body.error) {
            console.log('MESSAGE_CONTROLLER QueenCityGrub sendTextMessageMessage Error: ', response.body.error)
        }
    })
}

//============================================
function sendGenericMessageMessage(sender, text, token, data, recipient) {
  request({
        url: 'https://graph.facebook.com/v2.7/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: data,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}


//============================================
function sendReceived(sender, thetoken, recipient) {
  console.log("MESSAGE_CONTROLLER: QueenCityGrub sendReceived ...");
    request({
        url: "https://graph.facebook.com/v2.7/me/messages",
        qs: {access_token:thetoken},
        method: "POST",
        json: {
            recipient: {id:recipient},
            sender_action: "typing_on",
        }
    }, function(error, response, body) {
        if (error) {
            console.log("MESSAGE_CONTROLLER: QueenCityGrub sendReceived Error sending messages: ", error)
        } else if (response.body.error) {
            console.log("MESSAGE_CONTROLLER: QueenCityGrub sendReceived Error: ", response.body.error)
        }
    })
};



//============================================
MessageController.quickReplyLookup = function(sender, text, token, req, res) {
     console.log("MESSAGE_CONTROLLER: QueenCityGrub quickReplyLookup text = "+text);
  var textToReturn = "";
  //var passThrough = "yes";
 // var theData = null;
  var newtext = text.toLowerCase();
  console.log("MESSAGE_CONTROLLER: quickReplyLookup newtext = "+newtext);
  switch(newtext) {
    case "quickyes":
        console.log("MESSAGE_CONTROLLER: QueenCityGrub ********* quickyes");

        break;
          case "quickno":
        console.log("MESSAGE_CONTROLLER: QueenCityGrub ********* quickno");
     
        break;
          case "quickmaybe":
        console.log("MESSAGE_CONTROLLER: QueenCityGrub ********* quickmaybe");
    console.log("MESSAGE_CONTROLLER: quickReplyLookup theEntities = "+JSON.stringify(theEntities));

        break;
 

    default:
        console.log("*************MESSAGE_CONTROLLER QueenCityGrub quickReplyLookup DEFAULT = ");

    }
}

//MessageController.quickReplyLookup(sender, event.message.quick_reply.payload, token, req, res);

module.exports = MessageController;