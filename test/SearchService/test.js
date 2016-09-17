var SearchService = require("../../src/SearchService")

var searchRequest = {
    "userLocation" : ["35.2270869","-80.8431267"],
    "foodType" : "pizza",
    "pricing" : 2
};

var searchPromise = SearchService.find(searchRequest);

searchPromise.then(function (restaurants) {

  console.log("Search for South End Pizza", restaurants);

});