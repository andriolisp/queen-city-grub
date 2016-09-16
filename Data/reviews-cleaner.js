var reviews = require("./reviews.json");
var fs = require("fs");
var EntitiesService = require("../src/Entities")

var bigString = "";

reviews.forEach(function (r) {

  bigString += r.Review + ". ";

});

reviews = EntitiesService.clean(bigString);

var file = fs.createWriteStream('./Data/reviews-clean.json');
file.write(reviews);
file.end();