var classifier = require('../../src/Classifier')

var response = classifier.classify({'message': 'I want some african food'})
var classify = response['classifier']
console.log(classify['food'] === 'african food')
console.log(classify['recommend'] === false)
console.log(classify['location'] === null)

response = classifier.classify({'message': 'restaurants in south end'})
classify = response['classifier']
console.log(classify['food'] === null)
console.log(classify['recommend'] === true)
console.log(classify['location'] === 'south end')
