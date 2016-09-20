var request = require("request");
var _ = require("lodash");

var MuxController = require("./MuxController");

var MessengerController = {};

MuxController.setMessengerController(MessengerController);

var sendToApi = function (replyBody) {

    return new Promise(function (resolve, reject) {

        console.log("");
        console.log("RESPONSE BODY");
        console.log(JSON.stringify(replyBody));
        console.log("");

        request({
            'url': 'https://graph.facebook.com/v2.7/me/messages',
            'qs': {
                'access_token': 'EAAXtudRZBgpEBABXXZBxjl71DverAPhM3nWbre6VLUop2585TWjMxtNk3oJv7eVSEPivB9I39Jtp7xHZAdccLZCQv9kLfV4ZAuL2ZBzGMlUxmelPKKnTCZCFZCi87SiFciEMa5M4k1GzEyg6V7jQPJhPasEMyVLnN82sOU02axCaSQZDZD'
            },
            'method': 'POST',
            'json': replyBody
        }, (err, res) => {
            if (!err && res.statusCode == 200) {
                resolve();
            } else {
                reject(_.get(res, 'body.error', err));
            }
        });

    });

};

var sendTypingOn = function (recipientId) {
    
    return sendToApi({
        'sender_action': 'typing_on',
        'recipient': {
            'id': recipientId
        }
    });
    
}

MessengerController.sendAttachment = function (recipientId, attachment) {

    return sendTypingOn(recipientId).then(function () {

        setTimeout(function () {

            sendToApi({
                'message': {
                    'attachment': attachment
                },
                'recipient': {
                    'id': recipientId
                }
            });
            
        }, 3000);

    });
    
}

MessengerController.sendText = function (recipientId, text) {
    
    return sendTypingOn(recipientId).then(function () {

        setTimeout(function () {

            sendToApi({
                'message' : {
                    'text': text
                },
                'recipient': {
                    'id': recipientId
                }
            })
            
        }, 3000);

    });
    
}

MessengerController.sendQuickReplyText = function (recipientId, text, quickReplies) {
    
    return sendTypingOn(recipientId).then(function () {

        setTimeout(function () {

            sendToApi({
                'message' : {
                    'text': text,
                    'quick_replies': quickReplies
                },
                'recipient': {
                    'id': recipientId
                }
            });
            
        }, 3000);

    });
    
}

MessengerController.receiveMessage = function (event) {

    var senderId = event.sender.id;
    var recipientId = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;
    
    var isQuickReply = _.has(message, 'quick_reply.payload');
    var messageText = isQuickReply ? _.get(message, 'quick_reply.payload') : message.text;
    var messageAttachments = message.attachments;

    switch (messageText) {
        case 'image':  break;
        case 'button': break;
        case 'generic': break;
        case 'receipt': break;
        default:
            MuxController.handleMessageText(senderId, messageText, isQuickReply);
    }

}

MessengerController.receivePostback = function (event) {

    var senderId = event.sender.id;
    var recipientId = event.recipient.id;
    var timeOfPostback = event.timestamp;
    var payload = event.postback.payload;

    switch(payload) {

        case "MAIN_MENU":
            MuxController.handleMainMenu(senderId);
            break;

        case "HELP_MENU":
            MuxController.handleMessageText(senderId, null, true);
            break;

        default:
            MuxController.handleMessageText(senderId, payload, false);
            break;
            
    }

}

module.exports = MessengerController;