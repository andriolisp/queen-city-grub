var GoogleGeoCoderAPI = require('./geocoder')
var _ = require('lodash')

var LocationService = {}

LocationService.find = function (request) {
  return new Promise(function (resolve, reject) {
    // Create a new instance of the Google GeoCoder API
    var api = new GoogleGeoCoderAPI('AIzaSyCKynz61ZWAZwl5eyclLQaIjtcOdg1aAk0')

    // An array of components to match on
    var components = ['country:BR', 'administrative_area:SP']

    // An address to match on
    var address = null

    // Get the address entity
    var addressEntity = _.get(request, 'entities.address.0', null)

    // Get the neighborhood entity
    var neighborhoodEntity = _.get(request, 'classifier.neighborhood', _.get(request, 'entities.neighborhood.0'))

    if (addressEntity != null) {
      // Prefer an address if it is given
      console.log('addressEntity != null', address)
    } else if (neighborhoodEntity) {
      // Use a neighborhood component if no address is available
      components.push('neighborhood:' + neighborhoodEntity)
    } else {
      // If we don't have either, resolve the request
      resolve(request)
      return
    }

    // Find the location
    api.find({
      'address': address,
      'components': components.join('|')
    }, function (err, res) {
      if (err) {
        // If there's an error, resolve the request
        resolve(request)
        return
      }

      // Use the location of the first result
      var location = res[0].location

      if (location) {
        // Set the latitude and longitude
        request.location = [location.lat, location.lng]
      }

      // Resolve the request
      resolve(request)
    })
  })
}

module.exports = LocationService
