var _ = require('lodash')
var natural = require('natural')
var fs = require('fs')

var Classifier = {}

var foodObject = JSON.parse(fs.readFileSync('./Data/food.json', 'utf8'))
var verbsObjects = JSON.parse(fs.readFileSync('./Data/verbs.json', 'utf8'))
var neighborhoodsObject = JSON.parse(fs.readFileSync('./Data/neighborhoods.json', 'utf8'))
var nationalitiesObject = JSON.parse(fs.readFileSync('./Data/nationalities.json', 'utf8'))
var adjectivesObject = JSON.parse(fs.readFileSync('./Data/adjectives.json', 'utf8'))
var recommend = verbsObjects['recommend']
var neighborhoods = neighborhoodsObject['neighborhoods']
var nationalities = nationalitiesObject['nationalities']
var adjectives = adjectivesObject['highend']
var food = []
// get all the food
for (var key in foodObject) {
  if (foodObject.hasOwnProperty(key)) {
    food = _.concat(food, foodObject[key])
  }
}
// this creates and train our classifier
Classifier.train = function () {
  var intentClassifier = new natural.BayesClassifier()
  intentClassifier.addDocument(food, 'food')
  intentClassifier.addDocument(neighborhoods, 'location')
  // adding recommend verbs to the classifier
  intentClassifier.addDocument(recommend, 'recommend')
  intentClassifier.addDocument(adjectives, 'highend')
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
  var highendValue = 0
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
    if (intent[key]['label'] === 'highend') {
      highendValue = intent[key]['value']
    }
  }
  // recommend is true if the recommendValue is the higher than a certain threshold
  if ((recommendValue > 0.3 && intentValue === 'recommend') ||
  recommendValue === locationValue && foodValue === highendValue) {
    isRecommend = true
  }
  var foundFood = getValue(message, food)

  if (foundFood == null) {
    var foodType = getValue(message, nationalities)
    if (foodType != null) {
      foundFood = foodType + ' food'
    }
  }

  if (foundFood != null) {
    isRecommend = false
  }

  var result = {
    'classifier': {
      'message': message,
      'highend': getValue(message, adjectives) != null || intentValue === 'highend',
      'recommend': isRecommend,
      'food': foundFood,
      'location': getValue(message, neighborhoods),
      'monteCarlo': null
    }
  }
  return result
}

function getValue (message, data) {
  var val = null
  data.forEach(function (el, id, arr) {
    if (message.indexOf(el.toLowerCase()) !== -1) {
      val = el
      return false
    }
  })
  return val
}
module.exports = Classifier
