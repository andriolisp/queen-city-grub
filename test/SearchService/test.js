var SearchService = require('../../src/SearchService')

var request = {
  'message': '...',
  'defaultLocation': ['35.2270869', '-80.8431267'],
  'entities': {
    'foodType': 'pizza'
  }
}

var searchPromise = SearchService.find(request)

searchPromise.then(function (restaurants) {
  console.log('Search for South End Pizza', restaurants)
})
