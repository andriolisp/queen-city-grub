var GooglePlacesAPI = require('google-places');
var _ = require('lodash');

var RestaurantsService = {};

/**
 * Return a set of restraunts
 */
RestaurantsService.find = function (searchRequest) {

    // Create a new instance of the Google Places API
    var api = new GooglePlacesAPI('AIzaSyDJxv_zb4nnlWEaOeVXZC5iXUQRKSKN5uI');

    // Build the search criteria for Google Places API
    var searchCriteria = {
      "radius" : 11265.4, // Look within 10 mile radius of location?
      "type" : "restaurant", // We only want restaurants
      "keyword" : searchRequest.foodType,
      "location" : searchRequest.location,
      "minprice" : 0,
      "maxprice" : searchRequest.pricing
    };

    // Build an object of restaurant data
    var restrauntPromises = [];

    new Promise(function (outerResolve){

      // Search for restaurants
      api.search(searchCriteria, function(err, res) {
        
        if (err) {

          // Log the error, we can't do anything now
          console.log("Google Places Search Error", err);
          return;

        }

        if (res.status != "OK") {
          
            // Log the status if it's not OK
            console.log("Google Places Search Status", res.status);
            return;

        }

        // Get the array of results
        var searchResults = res.results;

        if (searchResults.length == 0) {

          // There's nothing to do now..?
          console.log("There are no Google Places results!");
          return;

        }

        // Go through each result
        for (var i = 0; i < searchResults.length; i++) {

          var restaurantPromise = new Promise(function (innerResolve) {

            // Fetch the details about this place
            api.details({placeid: searchResults[i].place_id}, function (err, res) {

              if (err) {

                // Log the error, skip this place?
                console.log("Google Places Details Error", err);
                innerResolve(null);
                return;

              }

              if (res.status != "OK") {
                
                // Log the status if it's not OK
                console.log("Google Places Details Status", res.status);
                innerResolve(null);
                return;

              }

              // Add the details to the result
              var detailsResult = res.result;

              // Resolve the restaurant information
              innerResolve({
                "name" : detailsResult.name,
                "rating" : detailsResult.rating,
                "website" : detailsResult.website,
                "googleUrl" : detailsResult.url
              });

            });

          });

          // Store the restaurant promise
          restrauntPromises.push(restaurantPromise);

        }

      });

    }).then(function (restaurants){

      // Sort the restaurants by rating
      restraunts.sort(function (restaurant1, restaurant2) {

        var rating1 = restaurant1.rating;
        var rating2 = restaurant2.rating;

        if (rating1 < rating2) {
          
          return -1;

        } else if (rating1 == rating2) {
          
          return 0;

        } else if (rating1 > rating2) {
          
          return 1;

        }

      });

      // Resolve the top three results
      resolve(restraunts.slice(0, 3));

    });

};

module.exports = RestaurantsService;