var muxService = require('../../src/MuxService')

var randomIntInc = function (low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low)
}

var request = {
  'message': 'I want some recommendation in south end',
  'defaultLocation': ['35.2270869', '-80.8431267'],
  'monteCarlo': false,
  'userId': randomIntInc(1, 1000)
}
muxService.handleRequest(request).then(function (response) {
  if (response.monteCarlo) {
    validateQuestion(response)
  } else {
    console.log(response)
  }
})

var validateQuestion = function (p) {
  if (p.question) {
    console.log(p.question)
  }
  if (!p.isDone) {
    request = p
    request.response = randomIntInc(0, 2)
    muxService.handleRequest(request).then(function (response) {
      if (response.monteCarlo) {
        validateQuestion(response)
      } else {
        console.log(response)
      }
    })
  } else {
    console.log('Result')
    console.log(p)
  }
}
