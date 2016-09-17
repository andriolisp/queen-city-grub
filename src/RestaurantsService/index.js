var GooglePlacesAPI = require('google-places');
var _ = require('lodash');

var RestaurantsService = {};

var sortRestaurants = function (restaurant1, restaurant2) {

  var rating1 = restaurant1.rating;
  var rating2 = restaurant2.rating;

  if (rating1 < rating2) {
    return 1;
  } else if (rating1 == rating2) {
    return 0;
  } else if (rating1 > rating2) {
    return -1;
  }

};

function getPlaces(api, searchCriteria, reject) {
  
  return new Promise(function (resolve) {

    api.search(searchCriteria, function(err, res) {

      if (err) {
        reject(err);
      } else if (res.status != "OK") {
        reject(res.status);
      } else {
        resolve(res)
      }

    });

  });

};

function getDetails(api, placeId){
  
  return new Promise(function (resolve) {

    api.details({placeid: placeId}, function (err, res) {

      if (err) {
        
        resolve(null);
        return;

      } else if (res.status != "OK") {
        
        resolve(null);
        return;

      } else {
        
        resolve({
          "name" : res.result.name,
          "rating" : res.result.rating,
          "website" : res.result.website || null,
          "googleUrl" : res.result.url || null
        });

      }

    });

  });

};

/**
 * Return a set of restraunts
 */
RestaurantsService.find = function (restaurantsRequest) {

  return new Promise(function (resolve, reject) {
    
    // Create a new instance of the Google Places API
    var api = new GooglePlacesAPI('AIzaSyDJxv_zb4nnlWEaOeVXZC5iXUQRKSKN5uI');

    // Build the search criteria for Google Places API
    var searchCriteria = {
      "radius" : 11265.4, // Look within 10 mile radius of location?
      "type" : "restaurant", // We only want restaurants
      "keyword" : restaurantsRequest.foodType,
      "location" : restaurantsRequest.location,
      "maxprice" : restaurantsRequest.pricing,
      "minprice" : 0
    };

    // Get the places given search criteria
    getPlaces(api, searchCriteria, reject).then(function (res){

      // Build an array of details promises
      var detailsPromises = [];

      // Go through each place
      res.results.forEach(function (place) {
        
        // Create an array of promises to get restaurant details
        detailsPromises.push(getDetails(api, place.place_id));

      });

      // Wait for all place details to be fetched
      Promise.all(detailsPromises).then(function (restaurants) {

        // Filter out the null values
        var actualRestaurants = _.filter(restaurants, _.isObject);

        // Sort the restaurants
        actualRestaurants.sort(sortRestaurants);

        // Resolve the top three results
        resolve(actualRestaurants.slice(0, 3));

      });

    });

  });

};

module.exports = RestaurantsService;