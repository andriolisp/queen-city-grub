var classifier = require('../../src/ClassifierService')

classifier.classify({'message': 'I want some african food'})
.then(function (response) {
  var classify = response['classifier']
  console.log(response)
  console.log(classify['food'] === 'african food')
  console.log(classify['recommend'] === false)
  console.log(classify['location'] === null)
})
classifier.classify({'message': 'restaurants in south end'})
.then(function (response) {
  var classify = response['classifier']
  console.log(classify['food'] === null)
  console.log(classify['recommend'] === true)
  console.log(classify['location'] === 'south end')
})

