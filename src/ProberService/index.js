var cache = require('memory-cache')
var rand = require('random-seed').create()
var montecarloService = require('../../src/MontecarloService')
var searchService = require('../../src/SearchService')
var _ = require('lodash')

var replaceAll = function (str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace)
}

var ProberService = {
  getQuestion: function (oldSuggestion, suggestion, answer) {
    var yesPrefix = ['Awesome! ', 'Sweet! ', 'Cool! ', 'Great! I love it too! ']
    var noPrefix = ['Too bad! ', 'Good! %oldSuggestion% is gross. ', 'Really? Oh well... ', 'Well, that happens... ']
    var maybePrefix = ['Hmm... ', 'Well... ', 'Life goes on... ', 'Being difficult, hah? ']
    var phrases = ['Do you like %suggestion%?', 'Would you like to have %suggestion%?', 'Does %suggestion% sounds good?', 'Are you a %suggestion% person?', 'Would you like %suggestion% or %suggestion%?']
    var message = ''
    if (oldSuggestion && oldSuggestion.length > 0) {
      var response = isNaN(answer) ? 0 : parseInt(answer)
      switch (response) {
        case 0:
          message = noPrefix[rand.intBetween(0, noPrefix.length - 1)]
          break
        case 1:
          message = maybePrefix[rand.intBetween(0, maybePrefix.length - 1)]
          break
        case 2:
          message = yesPrefix[rand.intBetween(0, yesPrefix.length - 1)]
          break
      }

      message = replaceAll(message, '%oldSuggestion%', oldSuggestion)
      message = replaceAll(message, '%suggestion%', suggestion)
    }

    message += phrases[rand.intBetween(0, phrases.length - 1)]

    message = replaceAll(message, '%oldSuggestion%', oldSuggestion)
    message = replaceAll(message, '%suggestion%', suggestion)

    return message
  },
  getUserSuggestions: function (request) {
    return new Promise(function (resolve, reject) {
      if (request !== null && request !== undefined && request.monteCarlo && (request.userId !== null && request.userId !== undefined)) {
        var response = isNaN(request.response) ? 0 : parseInt(request.response)
        var mcUserService = cache.get(request.userId)
        var question = ''
        if (!mcUserService) {
          cache.put(request.userId, montecarloService.Initialize())
          mcUserService = cache.get(request.userId)
          question = ProberService.getQuestion(null, mcUserService.GetSuggestion(), 0)
        } else {
          var oldSuggestion = mcUserService.GetSuggestion()
          mcUserService.Reply(response)
          question = ProberService.getQuestion(oldSuggestion, mcUserService.GetSuggestion(), response)
          cache.delete(request.userId);
        }

        var isDone = mcUserService.GetResult()
        if (isDone) {
          request.question = null
          _.set(request, 'entities.foodType', mcUserService.GetFinalSuggestion() + " food")
          searchService.find(request).then(resolve)
        } else {
          request.question = question
          resolve(request)
        }
      } else {
        request.question = ''
        request.isDone = false
        reject(request)
      }
    })
  }
}

module.exports = ProberService
