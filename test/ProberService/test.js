var proberService = require('../../src/ProberService');

var randomIntInc = function(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

var params = {
  response: 0,
  userId: 0,
  monteCarlo: true
};

params.userId = randomIntInc(1,1000);
console.log(params);

var validateQuestion = function(p) {
  if (params.question) {
    console.log(params.question);
  }
  params = p;
  params.response = randomIntInc(0, 2);
  proberService.getUserSuggestions(params).then(validateQuestion);
}

proberService.getUserSuggestions(params).then(validateQuestion);