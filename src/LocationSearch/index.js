var GoogleGeoCoderAPI = require('google-geocoder');

var GeoCoder = {};

/**
 * Returns a location object
 */
GeoCoder.find = function (locationRequest) {

    // Create a new instance of the Google GeoCoder API
    var api = GoogleGeoCoderAPI({
        "key" : "AIzaSyCBrJsgcagD8FeGh1Pe-NLW56fdItkVAA4",
        "region" : "us"
    });

    // Build the location string that we want to search for
    var addressString = "";

    if (locationRequest.address != null) {

        // Prefer an address if it is given
        addressString = locationRequest.address;

    } else if (locationRequest.neighborhood != null) {

        // Use a neighborhood if no address is available
        addressString = location.neighborhood;

    } else {

        // If we don't have either, return no location object
        return null;

    }

    // If any errors occur, return null
    var location = null;

    // Look for the address string, with Charlotte NC appended
    api.find(addressString + ", Charlotte NC", function (err, res) {

        // Log the GeoCoder response
        console.log("Google GeoCoder Response", res);

        if (err) {

            // If there's an error, don't change the location
            console.log(err);
            return;

        }

        if (res.status != "OK") {
         
            // Log the status if it's not OK
            console.log("Google GeoCoder Status", res.status);
            return;

        }

        // Use the location of the first result
        location = res.results[0].geometry.location;

    });

    // Return the location
    return location;

}

module.exports = GeoCoder;