var SearchService = require('../../src/SearchService')

var request = {
  'message': '...',
  'defaultLocation': ['-23.598088', '-46.683349'],
  'location': ['-23.598088', '-46.683349'],
  'entities': {
    'foodType': ['restaurente italiano']
  }
}

var searchPromise = SearchService.find(request)

searchPromise.then(function (restaurants) {
  console.log('Search for japanese', restaurants)
})
