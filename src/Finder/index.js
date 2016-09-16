var GooglePlacesAPI = require('google-places');
var _ = require('lodash');

var Finder = {};

var locationRequest = {
  "neighborhood" : [""],
  "address" : [""]
};

/**
 * Return a latitude and longitude
 */
Finder.findLocation = function (locationRequest) {



};

var searchRequest = {
  "foodType" : "pizza",
  "location" : "lat,lon",
  "maxprice" : 4,
  "rating" : 4
};

var sortRestaurants = function (restaurant1, restaurant2) {



};

/**
 * Return a set of restraunts
 */
Finder.findRestaurants = function (searchRequest) {

  // Create a new instance of the Google Places API
  var api = new GooglePlacesAPI('AIzaSyDJxv_zb4nnlWEaOeVXZC5iXUQRKSKN5uI');

  // Build the search criteria for Google Places API
  var searchCriteria = {
    "radius" : 5, // Look within 10 mile radius of location?
    "type" : "restaurant", // We only want restaurants
    "keyword" : searchRequest.foodType,
    "location" : searchRequest.location,
    "minprice" : searchRequest.minPrice,
    "maxprice" : searchRequest.maxPrice
  };

  // Log the search criteria
  console.log(searchCriteria);

  // Build an object of restaurant data
  var restraunts = [];

  // Search for restaurants
  api.search(searchCriteria, function(err, res) {

    if (err) {

      // Log the error, we can't do anything now
      console.log("Google Places Search Error", err);
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

      // Get the individual result so we don't have to access the index over and over
      var searchResult = searchResults[i];

      // Fetch the details about this place
      api.details({reference: searchResult.reference}, function (err, res) {

        if (err) {

          // Log the error, skip this place?
          console.log("Google Places Details Error", err);
          return;

        }

        // Add the details to the result
        var detailsResult = res.result;

        // Store the place by reference
        restraunts.push({
          "name" : searchResult.name,
          "rating" : detailsResult.rating,
          "website" : detailsResult.website,
          "googleUrl" : detailsResult.url
        });

      });

    }

  });

  // Sort the restaurants 
  restraunts.sort(sortRestaurants);

  // Return the top three results
  return restraunts.slice(0, 3);

};

export default Finder;