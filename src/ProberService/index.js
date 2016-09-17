var cache = require('memory-cache');
var montecarloService = require('../../src/MontecarloService');

var ProberService = {
  getUserSuggestions: function (request) {
    return new Promise(function (resolve, reject) {
      if (request !== null && request !== undefined && request.monteCarlo && (request.userId !== null && request.userId !== undefined)) {
        var response = isNaN(request.response) ? 0 : parseInt(request.response);
        var mcUserService = cache.get(request.userId);
        if(!mcUserService) {
          cache.put(request.userId, montecarloService.Initialize());
          mcUserService = cache.get(request.userId);
        } else { 
          mcUserService.Reply(response);
        }

        request.question = mcUserService.GetSuggestion();
        request.done = mcUserService.GetResult();
        resolve(request); 
      } else {
        request.question = "";
        request.done = false;
        reject(request);
      }
    });
  }
}

module.exports = ProberService;