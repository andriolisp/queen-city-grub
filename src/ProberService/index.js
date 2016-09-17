var cache = require('memory-cache');
var montecarloService = require('../../src/MontecarloService');
var searchService = require('../../src/SearchService');
var _ = require('lodash');

var randomIntInc = function(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

var replaceAll = function(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

var ProberService = {
  getQuestion: function(oldSuggestion, suggestion, answer) {
    var yesPrefix = ["Awesome! ", "Sweet! ", "Cool! ", "Great! I love it too! "];
    var noPrefix = ["Too bad! ", "Good! %oldSuggestion% is gross. ", "Really? Oh well... ", "Well, that happens... "];
    var maybePrefix = ["Hmm... ", "Well... ", "Life goes on... ", "Being difficult, hah? "];
    var phrases = ["Do you like %suggestion%?", "Would you like to have %suggestion%?", "Does %suggestion% sounds good?", "Are you a %suggestion% person?", "Would you like %suggestion%, %suggestion% or %suggestion%?"];
    var message = '';
    var randomNumber = 0
    if(oldSuggestion && oldSuggestion.length > 0) {
      var response = isNaN(answer) ? 0 : parseInt(answer);
      switch(response) {
        case 0:
          randomNumber = randomIntInc(0, noPrefix.length - 1);
          message = noPrefix[randomNumber];
          break;
        case 1:
          randomNumber = randomIntInc(0, maybePrefix.length - 1);
          message = maybePrefix[randomNumber];
          break;
        case 2:
          randomNumber = randomIntInc(0, yesPrefix.length - 1);
          message = yesPrefix[randomNumber];
          break
      }

      message = replaceAll(message, "%oldSuggestion%", oldSuggestion);
      message = replaceAll(message, "%suggestion%", suggestion);
    }

    var randomNumber = randomIntInc(0, phrases.length - 1);
    message += phrases[randomNumber];

    message = replaceAll(message, "%oldSuggestion%", oldSuggestion);
    message = replaceAll(message, "%suggestion%", suggestion);

    return message;
  },
  getUserSuggestions: function (request) {
    return new Promise(function (resolve, reject) {
      if (request !== null && request !== undefined && request.monteCarlo && (request.userId !== null && request.userId !== undefined)) {
        var response = isNaN(request.response) ? 0 : parseInt(request.response);
        var mcUserService = cache.get(request.userId);
        var question = '';
        if (!mcUserService) {
          cache.put(request.userId, montecarloService.Initialize());
          mcUserService = cache.get(request.userId);
          question = ProberService.getQuestion(null, mcUserService.GetSuggestion(), 0);
        } else {
          var oldSuggestion = mcUserService.GetSuggestion();
          mcUserService.Reply(response);
          question = ProberService.getQuestion(oldSuggestion, mcUserService.GetSuggestion(), response);
        }

        var isDone = mcUserService.GetResult();
        if (isDone) {
          request.question = null;
          _.set(request, 'entities.foodType', mcUserService.GetFinalSuggestion());
          searchService.find(request).then(resolve);
        } else {
          request.question = question;
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