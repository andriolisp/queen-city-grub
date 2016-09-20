var cache = require('memory-cache');
var MuxService = require('../MuxService');

var MuxController = {};

var quickReplies = [{
    "content_type":"text",
    "title":"Yes",
    "payload":"2"
},{
    "content_type":"text",
    "title":"No",
    "payload":"0"
},{
    "content_type":"text",
    "title":"Maybe",
    "payload":"1"
}];

var colors = ["blue","green","yellow"];
var labels = ["A","B","C"];

var replyMessageText = function (res) {

    var recipientId = res.userId;

    if (res.isDone) {

        var elements = [];
    
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
                "subtitle" : restaurant.rating + " Rating",
                "image_url" : "https://maps.googleapis.com/maps/api/staticmap?center="+restaurant.location.join(",")+"&zoom=16&size=500x270&maptype=roadmap&markers=color:"+colors[i]+"|label:"+labels[i]+"|"+restaurant.location.join(","),
                "buttons" : buttons
            });
            
        });

        if (elements.length > 0) {

           // Let the user know we found some suggestions 
           MessengerController.sendText(recipientId, "I have a few suggestions for you! Just a second...").then(function () {

                // Send a carosel with the suggested restaurants
                MessengerController.sendAttachment(recipientId, {  
                    'type': 'template',
                    'payload': {  
                        'template_type': 'generic',
                        'elements': elements
                    }
                }).catch(console.log);
                
           });
            
        } else {
            
            // There are no suggestions to present
            MessengerController.sendText(recipientId, "I'm sorry! I can't think of any suggestions for you!").catch(console.log);
            
        }

    } else {

        // Send the question along with some quick replies
        MessengerController.sendQuickReplyText(recipientId, res.question, quickReplies).catch(console.log);

    }

};

var MessengerController = {};

MuxController.setMessengerController = function (messengerController) {
    MessengerController = messengerController;
}

MuxController.handleLocation = function (senderId, location) {

    MessengerController.sendText(senderId, "Thank! I will make recommendations around this location!").then(function () {

        // Store the user's location
        cache.put('location-'+senderId, location);
        
    });

};

MuxController.handleMessageText = function (senderId, messageText, shortCircuitMonteCarlo) {

    var defaultLocation = cache.get('location-'+senderId) || ['35.2270869', '-80.8431267'];

    if (shortCircuitMonteCarlo) {

        MuxService.handleRequest({
            "defaultLocation" : defaultLocation,
            "response" : messageText,
            "userId" : senderId,
            "monteCarlo" : true
        }).then(replyMessageText).catch(console.log);
        
    } else {

        MuxService.handleRequest({
            "defaultLocation" : defaultLocation,
            "message" : messageText,
            "userId" : senderId,
            "monteCarlo" : false
        }).then(replyMessageText).catch(console.log);

    }

};

MuxController.handleMainMenu = function (senderId) {

    //var MessengerController = require("./MessengerController");

    // Send the main menu
    MessengerController.sendAttachment(senderId, {
        "type": "template",
        "payload": {
            "template_type": "generic",
            "elements": [{
                "title": "Welcome to Queen City Grub",
                "subtitle": "I can help you find something to eat!",
                "image_url": "https://queen-city-grub.herokuapp.com/welcome.jpg" ,
                "buttons": [{
                    "type": "web_url",
                    "title": "Our Facebook Page",
                    "url": "https://www.facebook.com/queencitygrub/",
                }]
            },{
                "title": "I don’t know",
                "subtitle": "Help me find something good",
                "image_url": "https://queen-city-grub.herokuapp.com/imnotsure.jpg",
                "buttons": [{
                    "type": "postback",
                    "title": "Help Me",
                    "payload": "HELP_MENU"
                }]
            },{
                "title": "Mexican",
                "subtitle": "Mild or Spicy you will love it",
                "image_url": "https://queen-city-grub.herokuapp.com/mexican.jpg",
                "buttons": [{
                    "type": "postback",
                    "title": "Find Mexican Food",
                    "payload": "Find Mexican Food"
                }]
            },{
                "title": "Italian",
                "subtitle": "Mamma Mia that's a spicy meatball",
                "image_url": "https://queen-city-grub.herokuapp.com/italian.jpg",
                "buttons": [{
                    "type": "postback",
                    "title": "Find Italian Food",
                    "payload": "Find Italian Food"
                }]
            },{
                "title": "American",
                "subtitle": "Get it while its hot",
                "image_url": "https://queen-city-grub.herokuapp.com/american.jpg",
                "buttons": [{
                    "type": "postback",
                    "title": "Find American Food",
                    "payload": "Find American Food"
                }]
            },{
                "title": "Chinese",
                "subtitle": "Fortune Cookie Time",
                "image_url": "https://queen-city-grub.herokuapp.com/chinese.jpg",
                "buttons": [{
                    "type": "postback",
                    "title": "Find Chinese Food",
                    "payload": "Find Chinese Food"
                }]
            }]
        }
    }).catch(console.log);

}

module.exports = MuxController;