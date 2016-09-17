var MuxController = require('./MuxController');
var ReplyController = require('./ReplyController');

var MessageController = function () {};

var buildMessageReply = function (sender, token, message) {
    MuxController.handleMessageRequest(sender, message).then(function (res) {
        if (res.isDone){
            buildCaroselReply(sender, token, res)
        } else {
            buildQuickReply(sender, token, res)
        }
    });
}

function buildQuckReply(sender, token, obj) {
    
    var quickReplies = [
        {
            "content_type":"text",
            "title":"Yes",
            "payload":"quickyes"
        },{
            "content_type":"text",
            "title":"No",
            "payload":"quickno"
        },{
            "content_type":"text",
            "title":"Maybe",
            "payload":"quickmaybe"
        }
    ];
    
    ReplyController.sendQuickReplies(sender, token, obj.question, quickReplies)
    
}

function buildCaroselReply(sender, token, res){
    
    var elements = [];
    
    res.restaurants.forEach(function (restaurant) {
       
        var buttons = [{
            "type" : "web_url",
            "url" : restaurant.googleUrl,
            "title" : "Google Maps"
        }];
        
        if (restaurant.website != null) {
            buttons.push({
                "type" : "web_url",
                "url" : restaurant.website,
                "title" : "Website"
            })
        }
        
        elements.push({
            "title" : restaurant.name,
            "subtitle" : "Rating: "+ restaurant.rating,
            "image_url" : "...",
            "buttons" : buttons
        });
        
    });
    
    if (elements.count > 0) {
        
        var caroselData = {
             "attachment":{  
               "type":"template",
               "payload":{  
                  "template_type":"generic",
                  "elements":elements
               }
            }
        };

        ReplyController.sendGeneric(sender, token, caroselData)
        
    } else {
        
        // No restaurants to show, send error message
        ReplyController.sendMessage(sender, token, "Sorry! It looks like we don't have that!")
        
    }    
    
}

MessageController.messageLookup = function (sender, text, token, req, res, recipient) {
    
    var textToReturn = "";
    var passThrough = "yes";
    var theData = null;
    var newtext = text.toLowerCase();
  
    switch(newtext){
        case "startbot":
            ReplyController.sendMessage(sender, token, "This should work MESSAGE...");
            break;

        default:
        
            MuxController.handleMessageRequest(sender, text).then(function (response) {
            // "question": ' .... ',
            // "location": "[lat, long]", (package as array)
            // "restaurants": "[JSON objects]", (package as array)
            // "isDone": true or false  (always true for monte carlo otherwise false )
            
            });
            
    }
    
}

module.exports = MessageController;