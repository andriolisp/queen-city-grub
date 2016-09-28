var cache = require('memory-cache');
var MuxService = require('../MuxService');

var MuxController = {};

var quickReplies = [{
    "content_type":"text",
    "title":"Sim",
    "payload":"2"
},{
    "content_type":"text",
    "title":"Não",
    "payload":"0"
},{
    "content_type":"text",
    "title":"Talvez",
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
            
            if (restaurant.phoneNumber != null) {
                buttons.push({
                    "type": "phone_number",
                    "payload": restaurant.phoneNumber.replace(/\s/g, ''),
                    "title": "Ligar"
                })
            }

            if (restaurant.websiteLink != null) {
                buttons.push({
                    "type" : "web_url",
                    "url" : restaurant.websiteLink,
                    "title" : "Ir para o site"
                })
            }
            
            var elementData = {
                "title": restaurant.name,
                "subtitle": "",
                "item_url": restaurant.bubbleLink,
                "image_url": "https://maps.googleapis.com/maps/api/staticmap?center="+restaurant.location.join(",")+"&zoom=16&size=500x270&maptype=roadmap&markers=color:"+colors[i]+"|label:"+labels[i]+"|"+restaurant.location.join(","),
                "buttons": buttons
            }

            if(restaurant.rating) {
              elementData.subtitle = restaurant.rating + " pontos"
            }

            elements.push(elementData);
            
        });

        if (elements.length > 0) {

           // Let the user know we found some suggestions 
           MessengerController.sendText(recipientId, "Calma ai, acho que eu tenho algumas idéias para você...").then(function () {

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
            MessengerController.sendText(recipientId, "Putzzz! Não consegui achar nada que eu ache que você vai gostar!").catch(console.log);
            
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

    MessengerController.sendText(senderId, "Pronto! Vou procurar algo aqui perto pra você... Espera só um pouco!").then(function () {

        // Store the user's location
        cache.put('location-'+senderId, location);
        
    });

};

MuxController.handleMessageText = function (senderId, messageText, shortCircuitMonteCarlo) {

    var defaultLocation = cache.get('location-'+senderId) || ['-23.598088', '-46.683349'];

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

    // Send the main menu
    MessengerController.sendAttachment(senderId, {
        "type": "template",
        "payload": {
            "template_type": "generic",
            "elements": [{
                "title": "Bem vindo ao Sampa Grub",
                "subtitle": "Eu posso te ajudar a encontrar aonde comer!",
                "image_url": "https://sampa-grub.herokuapp.com/bemvindo.jpg" ,
                "buttons": [{
                    "type": "web_url",
                    "title": "Pagina no Facebook",
                    "url": "https://www.facebook.com/sampagrub/",
                }]
            },{
                "title": "Não sei",
                "subtitle": "Me ajuda a achar algum lugar legal?",
                "image_url": "https://sampa-grub.herokuapp.com/nao-sei.jpg",
                "buttons": [{
                    "type": "postback",
                    "title": "Me ajuda",
                    "payload": "HELP_MENU"
                }]
            },{
                "title": "Mexicana",
                "subtitle": "Ai ai ai!!! Nada como tacos!",
                "image_url": "https://sampa-grub.herokuapp.com/mexicana.jpg",
                "buttons": [{
                    "type": "postback",
                    "title": "Comer mexicana!",
                    "payload": "mexicana"
                }]
            },{
                "title": "Italiano",
                "subtitle": "Mamma Mia! Uma Lasanha!",
                "image_url": "https://sampa-grub.herokuapp.com/italiana.jpg",
                "buttons": [{
                    "type": "postback",
                    "title": "Comida italiana!",
                    "payload": "italiana"
                }]
            },{
                "title": "Americana",
                "subtitle": "Hmmm... Buffalo wings!",
                "image_url": "https://sampa-grub.herokuapp.com/americana.jpg",
                "buttons": [{
                    "type": "postback",
                    "title": "Comida americana!",
                    "payload": "americana"
                }]
            },{
                "title": "Chinesa",
                "subtitle": "Nada como yakisoba agora!",
                "image_url": "https://sampa-grub.herokuapp.com/chinesa.jpg",
                "buttons": [{
                    "type": "postback",
                    "title": "Comida chinesa!",
                    "payload": "chinesa"
                }]
            }]
        }
    }).catch(console.log);

}

module.exports = MuxController;