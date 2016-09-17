var proberService = require('../../src/ProberService')

var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var randomIntInc = function (low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low)
}

var params = {
  response: 0,
  userId: 0,
  monteCarlo: true,
  message: "I don't know what I want to eat",
  defaultLocation: [35.007433, -80.851430]
}

params.userId = randomIntInc(1, 1000)

var validateQuestion = function (p) {
  if (p.question !== '') {
    rl.question(param.question, (answer) => {
      params.response = answer;
      rl.close();
      proberService.getUserSuggestions(params).then(validateQuestion)
    });
  } else {
    console.log(p);  
  }
}

proberService.getUserSuggestions(params).then(validateQuestion)
