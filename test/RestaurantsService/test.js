var RestaurantsService = require("../../src/RestaurantsService")

var restaurantsRequest = {
    "location" : ["35.2270869","-80.8431267"],
    "foodType" : "pizza",
    "pricing" : 2
};

var restaurantsPromise = RestaurantsService.find(restaurantsRequest);

restaurantsPromise.then(function(restaurants){

  console.log("South End Pizza", restaurants);

});