var _ = require('lodash')
var natural = require('natural')
var fs = require('fs')

var Classifier = {}

var foodObject = JSON.parse(fs.readFileSync('./Data/food.json', 'utf8'))
var verbsObjects = JSON.parse(fs.readFileSync('./Data/verbs.json', 'utf8'))
var neighborhoodsObject = JSON.parse(fs.readFileSync('./Data/neighborhoods.json', 'utf8'))
var nationalitiesObject = JSON.parse(fs.readFileSync('./Data/nationalities.json', 'utf8'))
var recommend = verbsObjects['recommend']
var neighborhoods = neighborhoodsObject['neighborhoods']
var nationalities = nationalitiesObject['nationalities']
// this creates and train our classifier
Classifier.train = function () {
  var intentClassifier = new natural.BayesClassifier()
  // get all the food and add a food label in the classifier
  var food = []
  for (var key in foodObject) {
    if (foodObject.hasOwnProperty(key)) {
      food = _.concat(food, foodObject[key])
    }
  }
  // if we see a name of food or restaurant, we already know that they want some food
  // restaurant also qualify as a key location
  intentClassifier.addDocument(food, 'food')
  intentClassifier.addDocument(neighborhoods, 'location')
  // adding recommend verbs to the classifier
  intentClassifier.addDocument(recommend, 'recommend')
  intentClassifier.addDocument(nationalities, 'foodType')
  // train our classifier
  intentClassifier.train()
  return intentClassifier
}

// given a message, classify it depending on some key values
Classifier.classify = function (message) {
  var intentClassifier = Classifier.train()
  var intent = intentClassifier.getClassifications(message)
  var intentValue = intentClassifier.classify(message)
  var recommendValue = 0
  var locationValue = 0
  var foodValue = 0
  var foodTypeValue = 0
  var isRecommend = false
  // get our results
  for (var key in intent) {
    if (intent[key]['label'] === 'recommend') {
      recommendValue = intent[key]['value']
    }
    if (intent[key]['label'] === 'location') {
      locationValue = intent[key]['value']
    }
    if (intent[key]['label'] === 'food') {
      foodValue = intent[key]['value']
    }
    if (intent[key]['label'] === 'foodType') {
      foodTypeValue = intent[key]['value']
    }
  }
  // recommend is true if the recommendValue is the higher than a certain threshold
  if (recommendValue > 0.3 && intentValue === 'recommend') {
    isRecommend = true
  }
  var result = {
    'message': message,
    'cheap': false,
    'highrated': false,
    'recommend': isRecommend,
    'food': null,
    'location': Classifier.getLocation(message, neighborhoods)
  }
  return result
}

Classifier.getLocation = function (message, neighborhoods) {
  var val = null
  neighborhoods.forEach(function (el, id, arr) {
    if (message.indexOf(el.toLowerCase()) !== -1) {
      val = el
      return false
    }
  })
  return val
}

console.log(Classifier.classify('I want some to eat in south end'))
