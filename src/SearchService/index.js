var LocationService = require('./locationService')
var RestaurantsService = require('./restaurantsService')

var SearchService = {}

SearchService.find = function (request) {
  return new Promise(function (resolve) {
    // Call location service to get a latitude and longitude
    LocationService.find(request).then(function (request) {
      // Get the restaurants suggestions
      RestaurantsService.find(request).then(resolve)
    })
  })
}

module.exports = SearchService
