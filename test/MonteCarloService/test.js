var montecarloService = require('../../src/MontecarloService');

var randomIntInc = function(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}


var result = montecarloService.Initialize();
console.log(result.GetSuggestion());
result.Reply(0)
while (!result.GetResult()) {
  console.log(result.GetSuggestion());
  result.Reply(randomIntInc(0,2));
}
console.log('Final Suggestion: ' + result.GetFinalSuggestion());