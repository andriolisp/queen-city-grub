var request = require("request")
var ValueObjectsController = require('./ValueObjectsController');
var MessageController = require('./MessageController');
var MuxController = require('./MuxController')
var ReplyController = require('./ReplyController');

function PostbackController() {
}


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
            "image_url" : "https://maps.googleapis.com/maps/api/staticmap?center="+restaurant.location.join(",").join(",")+"&zoom=15&size=500x270&maptype=roadmap&markers=color:"+colors[i]+"|label:"+labels[i]+"|"+restaurant.location.join(","),
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

PostbackController.handle = function(sender, text, token, req, res) {

    var newtext = text.toLowerCase();

    // Let facebook know it was received
    ReplyController.sendReceived(sender, token);
    
    switch(newtext) {
   
        case "admindontknow":
            buildMonteCarloReply(sender, token, null);
            break;

        case "adminmexican":
            buildMessageReply(sender, token, "I want Mexican or Latin food")
            break;

        case "adminitalian":
            buildMessageReply(sender, token, "I want Italian food")
            break;

        case "adminamerican":
            buildMessageReply(sender, token, "I want American food")
            break;

        case "adminchinese":
            buildMessageReply(sender, token, "I want Chinese food")
            break;
            
        case "adminfrench":
            buildMessageReply(sender, token, "I want French food")
            break;
            
        case "adminindian":
            buildMessageReply(sender, token, "I want Indian food")
            break;

        case "adminmainmenu":
            var data = ValueObjectsController.getWelcomeScreenData();
            ReplyController.sendGeneric(sender, token, data);

            var data2 = ValueObjectsController.getWelcomeCarouselData();
            ReplyController.sendGeneric(sender, token, data2);

        default:
            // Error
    }
}

module.exports = PostbackController;