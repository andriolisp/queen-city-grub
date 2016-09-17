var MuxService = require('../MuxService');

var MuxController = function(){};

MuxController.handleMessageRequest = function (sender, message) {
   return MuxService.handleRequest({
       "defaultLocation" : ['35.2270869', '-80.8431267'],
       "message" : message,
       "userId" : sender,
       "monteCarlo" : false
   });
}

MuxController.handleMonteCarloRequest = function (sender, response) {
   return MuxService.handleRequest({
       "defaultLocation" : ['35.2270869', '-80.8431267'],
       "response" : response,
       "userId" : sender,
       "monteCarlo" : true
   });
}

module.exports = MuxController;