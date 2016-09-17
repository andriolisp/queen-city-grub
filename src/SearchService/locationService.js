var GoogleGeoCoderAPI = require('./geocoder');

var LocationService = {};

/**
 * Returns a location object
 */
LocationService.find = function (request) {

    return new Promise(function (resolve, reject) {

        // Create a new instance of the Google GeoCoder API
        var api = new GoogleGeoCoderAPI("AIzaSyCBrJsgcagD8FeGh1Pe-NLW56fdItkVAA4");

        // An array of components to match on
        var components = ["country:US","administrative_area:NC","locality:Charlotte"];

        // An address to match on
        var address = null;

        if ("address" in request.entities && _.count(request.entities.address) > 0) {

            // Prefer an address if it is given
            address = request.entities.address[0];

        } else if ("neighborhood" in request.entities && _.count(request.entities.neighborhood) > 0) {

            // Use a neighborhood component if no address is available
            components.push("neighborhood:"+request.entities.neighborhood[0]);

        } else {

            // If we don't have either, resolve the request
            resolve(request);
            return;

        }

        // Find the location
        api.find({
            "address" : address,
            "components" : components.join("|")
        }, function (err, res) {

            if (err) {

                // If there's an error, resolve the request
                resolve(request);
                return;

            }

            // Use the location of the first result
            var location = res[0].location;

            if (location) {

              // Set the latitude and longitude
              request.location = [location.lat, location.lng];

            }

            // Resolve the request
            resolve(request);

        });

    });

}

module.exports = LocationService;