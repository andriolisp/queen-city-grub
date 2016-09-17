var muxService = require('../../src/MuxService')
var request = {
  'message': 'I want some mexican food',
  'defaultLocation': ['35.2270869', '-80.8431267']
}
muxService.handleRequest(request).then(console.log)
