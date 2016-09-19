var request = require("request");

var ReplyController = function(){};

ReplyController.sendGeneric = function (sender, token, genericMessage) {

    var replyBody = {
        url: 'https://graph.facebook.com/v2.7/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: genericMessage,
        }
    };

    console.log(JSON.stringify(replyBody));

  request(replyBody, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })

}

ReplyController.sendMessage = function (sender, token, message) {
    
    var replyBody = {
        url: 'https://graph.facebook.com/v2.7/me/messages',
        qs: {access_token: token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: {
                text:message
            }
        }
    };

    console.log(JSON.stringify(replyBody));

    request(replyBody, function(error, response, body) {
        if (error) {
            console.log('RESPONSE_CONTROLLER QueenCityGrub sendTextMessageMessage Error : ', error)
        } else if (response.body.error) {
            console.log('RESPONSE_CONTROLLER QueenCityGrub sendTextMessageMessage Error: ', response.body.error)
        }
    })
    
}

ReplyController.sendReceived = function (sender, token) {
    
    var replyBody = {
        url: "https://graph.facebook.com/v2.7/me/messages",
        qs: {access_token:token},
        method: "POST",
        json: {
            recipient: {id:sender},
            sender_action: "typing_on",
        }
    };

    console.log(JSON.stringify(replyBody));

    request(replyBody, function(error, response, body) {
        if (error) {
            console.log("MESSAGE_CONTROLLER: QueenCityGrub sendReceived Error sending messages: ", error)
        } else if (response.body.error) {
            console.log("MESSAGE_CONTROLLER: QueenCityGrub sendReceived Error: ", response.body.error)
        }
    })
    
}

ReplyController.sendQuickReplies = function (sender, token, question, quickReplies) {
    
    
    request({
        url: 'https://graph.facebook.com/v2.7/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message:   {
                "text":question,
                "quick_replies":quickReplies
            }
        }
    }, function(error, response, body) {
        if (error) {
            console.log('RESPONSE_CONTROLLER: quickReply Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('RESPONSE_CONTROLLER: quickReply Error: ', response.body.error)
        }
    })
    
}

module.exports = ReplyController;