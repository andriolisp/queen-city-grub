var proberService = require('../../src/ProberService')
var mergerService = require('../../src/MergerService')

var MuxService = {}

MuxService.handleRequest = function (request) {
  return new Promise(function (resolve) {
    if (request['monteCarlo']) {
      proberService.getUserSuggestions(request).then(resolve)
    } else {
      mergerService.handleRequest(request).then(resolve)
    }
  })
}

module.exports = MuxService
