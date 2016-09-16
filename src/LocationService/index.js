var GoogleGeoCoderAPI = require('./geocoder');

var GeoCoder = {};

/**
 * Returns a location object
 */
GeoCoder.find = function (locationRequest) {

    return new Promise(function (resolve) {

        // Create a new instance of the Google GeoCoder API
        var api = new GoogleGeoCoderAPI("AIzaSyCBrJsgcagD8FeGh1Pe-NLW56fdItkVAA4");

        // An array of components to match on
        var components = ["country:US","administrative_area:NC","locality:Charlotte"];

        // An address to match on
        var address = null;

        if (locationRequest.address != null) {

            // Prefer an address if it is given
            address = locationRequest.address;

        } else if (locationRequest.neighborhood != null) {

            // Use a neighborhood component if no address is available
            components.push("neighborhood:"+locationRequest.neighborhood);

        } else {

            // If we don't have either, return no location object
            locationPromise.resolve(null);
            return;

        }

        // Find the location
        api.find({
            "address" : address,
            "components" : components.join("|")
        }, function (err, res) {

            // Log the GeoCoder response
            console.log("Google GeoCoder Response", res);

            if (err) {

                // If there's an error, resolve with null
                console.log(err);
                resolve(null);
                return;

            }

            // Use the location of the first result
            var location = res[0].location;

            if (location) {

              // Resolve with a latitude and longitude string
              resolve(location.lat+","+location.lng);

            } else {

              // Resolve with null
              resolve(null);

            }

        });

    });

}

module.exports = GeoCoder;