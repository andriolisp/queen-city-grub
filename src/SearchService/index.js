var LocationService = require('../LocationService');
var RestaurantsService = require('../RestaurantsService');

var SearchService = {};

var getRestaurants = function (restaurantsRequest, resolve) {


};

SearchService.find = function (searchRequest) {

  return new Promise(function (resolve) {

    if (searchRequest.location == null) {

      // Call location service to get a latitude and longitude
      LocationService.find({
        "address" : searchRequest.address,
        "neighborhood" : searchRequest.neighborhood
      }).then(function (location) {

        // Update the location of the search
        searchRequest.location = location || searchRequest.userLocation;

        // Get the restaurants suggestions
        getRestaurants(searchRequest, resolve);

      });

    } else {

      // We have a location, so go get the restaurants
      getRestaurants(searchRequest, resolve);

    }

  });

}

module.exposts = SearchService;