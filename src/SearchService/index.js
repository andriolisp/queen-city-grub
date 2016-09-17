var LocationService = require('../LocationService');
var RestaurantsService = require('../RestaurantsService');

var SearchService = {};

SearchService.find = function (searchRequest) {

  return new Promise(function (resolve) {

    // Call location service to get a latitude and longitude
    LocationService.find({
      "address" : searchRequest.address,
      "neighborhood" : searchRequest.neighborhood
    }).then(function (location) {

      // Update the location of the search
      searchRequest.location = location || searchRequest.userLocation;

      // Get the restaurants suggestions
      RestaurantsService.find(searchRequest).then(resolve);

    });

  });

}

module.exports = SearchService;