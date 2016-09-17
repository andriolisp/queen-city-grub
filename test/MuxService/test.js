var muxService = require('../../src/MuxService')
var request = {
  'message': 'I want some mexican food'
}
muxService.handleRequest(request).then(console.log)
