var cache = require('memory-cache');
var montecarloService = require('../../src/MontecarloService');
var searchService = require('../../src/SearchService')

var ProberService = {
  getUserSuggestions: function (request) {
    return new Promise(function (resolve, reject) {
      if (request !== null && request !== undefined && request.monteCarlo && (request.userId !== null && request.userId !== undefined)) {
        var response = isNaN(request.response) ? 0 : parseInt(request.response);
        var mcUserService = cache.get(request.userId);
        if (!mcUserService) {
          cache.put(request.userId, montecarloService.Initialize());
          mcUserService = cache.get(request.userId);
        } else {
          mcUserService.Reply(response);
        }

        if (mcUserService.GetResult()) {
          request.entities.foodType = mcUserService.GetFinalSuggestion();
          searchService.find(request).then(resolve);
        } else {
          request.question = mcUserService.GetSuggestion();
          resolve(request);
        }
      } else {
        request.question = "";
        request.isDone = false;
        reject(request);
      }
    });
  }
}

module.exports = ProberService;