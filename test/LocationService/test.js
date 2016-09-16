var LocationService = require("../../src/LocationService");

var locationRequest = {
    "neighborhood" : "south end",
    "address" : null
};

var locationPromise = LocationService.find(locationRequest);

locationPromise.then(function(location){

  console.log(location);

});