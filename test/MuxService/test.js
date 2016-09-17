var muxService = require('../../src/MuxService')
var request = {
  'message': 'I want some German',
  'defaultLocation': ['35.2270869', '-80.8431267'],
  'monteCarlo': false
}
muxService.handleRequest(request).then(console.log)
