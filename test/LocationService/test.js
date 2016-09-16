var LocationService = require("../../src/LocationService");

var locationRequest = {
    "neighborhood" : "south end",
    "address" : null
};

var locationPromise = LocationService.find(locationRequest);

locationPromise.then(function(location){

  console.log("South End", location);

});

var locationRequest2 = {
  "neighborhood" : null,
  "address" : "324 East Blvd"
}

var locationPromise2 = LocationService.find(locationRequest2);

locationPromise2.then(function(location) {

  console.log("Thai Taste", location);

})