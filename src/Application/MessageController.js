var MuxController = require('./MuxController');
var ReplyController = require('./ReplyController');

var MessageController = function () {};
var buildQuickReply = function (sender, token, obj) {
    
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

var buildCaroselReply = function (sender, token, res){
    
    var colors = ["blue","green","red"];
    var labels = ["A","B","C"];

    var elements = [];
    
    console.log("LOGIC RESPONSE");
    console.log(JSON.stringify(res));
    console.log("");

    res.restaurants.forEach(function (restaurant, i) {
       
        var buttons = [];
        
        if (restaurant.website != null) {
            buttons.push({
                "type" : "web_url",
                "url" : restaurant.website,
                "title" : "Go to Website"
            })
        }

        buttons.push({
            "type" : "web_url",
            "url" : restaurant.googleUrl,
            "title" : "Go to Google Maps"
        });
        
        elements.push({
            "title" : restaurant.name,
            "subtitle" : "Rating: "+ restaurant.rating,
            "image_url" : "https://maps.googleapis.com/maps/api/staticmap?center="+restaurant.location.join(",")+"&zoom=15&size=500x270&maptype=roadmap&markers=color:"+colors[i]+"|label:"+labels[i]+"|"+restaurant.location.join(","),
            "buttons" : buttons
        });
        
    });
    
    if (elements.length > 0) {
        
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

var buildMonteCarloReply = function (sender, token, response) {
    MuxController.handleMonteCarloRequest(sender, response).then(function (res){
        if (res.isDone){
            buildCaroselReply(sender, token, res)
        } else {
            buildQuickReply(sender, token, res)
        }
    }).catch(console.log);
}

var buildMessageReply = function (sender, token, message) {
    MuxController.handleMessageRequest(sender, message).then(function (res){
        if (res.isDone){
            buildCaroselReply(sender, token, res)
        } else {
            buildQuickReply(sender, token, res)
        }
    }).catch(console.log);
}

MessageController.messageLookup = function (sender, text, token, req, res, recipient) {
    
    // Let facebook know it was received
    ReplyController.sendReceived(sender, token);
  
    // Reply to the message
    buildMessageReply(sender, token, text);
    
}

module.exports = MessageController;