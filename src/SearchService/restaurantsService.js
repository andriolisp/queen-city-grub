var GooglePlacesAPI = require('google-places')
var _ = require('lodash')

var RestaurantsService = {}

var sortRestaurants = function (restaurant1, restaurant2) {
  var rating1 = restaurant1.rating
  var rating2 = restaurant2.rating

  if (rating1 < rating2) {
    return 1
  } else if (rating1 === rating2) {
    return 0
  } else if (rating1 > rating2) {
    return -1
  }
}

function getPlaces (api, searchCriteria) {
  return new Promise(function (resolve) {
    api.search(searchCriteria, function (err, res) {
      if (err || res.status !== 'OK') {
        // Resolve with no places
        resolve([])
      } else {
        // Resolve with the places
        resolve(res.results)
      }
    })
  })
};

function getDetails (api, placeId) {
  return new Promise(function (resolve) {
    api.details({placeid: placeId}, function (err, res) {
      if (err || res.status !== 'OK') {
        resolve(null)
        return
      } else {
        resolve({
          'name': _.get(res, 'result.name'),
          'rating': _.get(res, 'result.rating'),
          'website': _.get(res, 'result.website', null),
          'googleUrl': _.get(res, 'result.url', null),
          'location': _.get(res, 'result.geometry.location')
        })
      }
    })
  })
};

RestaurantsService.find = function (request) {
  return new Promise(function (resolve) {
    // Create a new instance of the Google Places API
    var api = new GooglePlacesAPI('AIzaSyDJxv_zb4nnlWEaOeVXZC5iXUQRKSKN5uI')

    // Get the food type
    var foodTypeEntity = _.get(request, 'classifier.foodType', _.get(request, 'entities.foodType.0'))

    // Does the customer want high end food?
    var maxPrice = _.get(request, 'classifier.highEnd', false) ? 4 : 2

    // Build the search criteria for Google Places API
    var searchCriteria = {
      'radius': 11265.4, // Look within 7 mile radius of location?
      'type': 'restaurant', // We only want restaurants
      'keyword': foodTypeEntity,
      'location': request.location || request.defaultLocation,
      'maxprice': maxPrice,
      'minprice': 0
    }

    // Get the places given search criteria
    getPlaces(api, searchCriteria).then(function (places) {
      if (places.length === 0) {
        // If there are no places, resolve the request
        resolve(request)
      }

      // Build an array of details promises
      var detailsPromises = []

      // Go through each place
      places.forEach(function (place) {
        // Create an array of promises to get restaurant details
        detailsPromises.push(getDetails(api, place.place_id))
      })

      // Wait for all place details to be fetched
      Promise.all(detailsPromises).then(function (placeDetails) {
        // Filter out the null values
        var restaurants = _.filter(placeDetails, _.isObject)

        // Sort the restaurants
        restaurants.sort(sortRestaurants)

        // Add the top three restaurants to the request
        request.restaurants = restaurants.slice(0, 3)

        // We are done looking for restaurants
        request.isDone = true

        // Resolve the request
        resolve(request)
      })
    })
  })
}

module.exports = RestaurantsService
