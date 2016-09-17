var proberService = require('../../src/ProberService')
var classifierService = require('../../src/ClassifierService')
var entitiesService = require('../../src/EntitiesService')
var searchService = require('../../src/SearchService')
var MuxService = {}

// this calls the classifier and determines if we should call the prober
// or if we have enough information to search for restaurants
MuxService.handleRequest = function (request) {
  return new Promise(function (resolve) {
    if (request['monteCarlo']) {
      proberService.getUserSuggestions(request).then(resolve)
    } else {
      classifierService.classify(request).then(function (request) {
        if (request.classifier.recommend) {
          request.monteCarlo = true
          proberService.getUserSuggestions(request).then(resolve)
        } else {
          entitiesService.tag(request).then(function (request) {
            searchService.find(request).then(resolve)
          })
        }
      })
    }
  })
}
module.exports = MuxService
