var natural = require('natural');
var fs = require('fs');

var food = JSON.parse(fs.readFileSync('./Data/food.json', 'utf8'));
var verbs = JSON.parse(fs.readFileSync('./Data/verbs.json', 'utf8'));



classifier = new natural.BayesClassifier();  
classifier.addDocument("I want to eat Pizza.", 'wants food');  
classifier.addDocument("Best restaurant where I can eat in Charlotte.", 'wants food');  
classifier.addDocument("Could you recommend a good restaurant", 'recommend');  
classifier.addDocument("I want to go eat", 'recommend');  
classifier.train(); 


console.log(classifier.classify('I want to eat steak'));  
console.log(classifier.classify('I want to eat pizza')); 