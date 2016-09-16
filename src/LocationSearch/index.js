var GoogleGeoCoderAPI = require('google-geocoder');

var GeoCoder = {};

/**
 * Returns a location object
 */
GeoCoder.find = function (locationRequest) {

    // Create a new instance of the Google GeoCoder API
    var api = GoogleGeoCoderAPI({
        "key" : "AIzaSyCBrJsgcagD8FeGh1Pe-NLW56fdItkVAA4"
    });

    // Build the location string that we want to search for
    var locationString = "";

    if (locationRequest.address != null) {

        // Prefer an address if it is given
        locationString = locationRequest.address;

    } else if (locationRequest.neighborhood != null) {

        // Use a neighborhood if no address is available
        locationString = location.neighborhood;

    } else {

        // If we don't have either, return no location object
        return null;

    }

    var location = null;

    api.find(locationString, function (err, res) {

        if (err) {

            // If there's an error, don't change the location
            console.log(err);
            return;

        }



    });

    // Return the location
    return location;

}

module.exports = GeoCoder;