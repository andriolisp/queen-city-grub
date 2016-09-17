var fs = require('fs');
var foods = JSON.parse(fs.readFileSync('../../Data/food.json', 'utf8'));
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function setAnswer(o, keyword, answer) {
  answer = isNaN(answer) ? 0 : parseInt(answer);
  if (o == null || !o) {
    o = {
      keywords: {},
      hasKeywords: false,
      suggestion: getRandomSuggestion(),
      result: false,
      productData: getFoodObject(),
      restaurantSuggestion: null,
      total: 1
    };
  } else {
    if (keyword && keyword.trim().length > 0) {
      o.hasKeywords = true;
      switch (answer) {
        case 1:
          o.keywords[keyword] = 1;
          break;
        case 2:
          o.keywords[keyword] = 4;
          break;
        case 0:
          o.keywords[keyword] = 0;
          break;
        default:
          o.keywords[keyword] = 1;
          break;
      }
    }

    o.productData = feedResults(o, keyword, o.keywords[keyword])

    restaurantSuggestion = '';
    restaurantPoints = 0;
    o.productData.forEach(function (p, i) {
      if (p.points > restaurantPoints) {
        restaurantPoints = p.points;
        restaurantSuggestion = p.name;
      }
    }, this);

    if (o.productData.length > 1 && o.total < 5 && restaurantPoints <= 15) {
      o.suggestion = getRandomSuggestion(o);
    } else {
      o.hasKeywords = false;
      o.suggestion = '';
      o.result = true;
      o.restaurantSuggestion = restaurantSuggestion;
      o.productData = null;
    }

    if (answer === 1 || answer == 2) {
      o.total++;
    }
  }

  return o;
}

function getRandomSuggestion(o) {
  if (o !== null && o !== undefined && o.productData !== null && o.productData !== undefined && o.productData.length > 0) {
    var words = getWords(o.productData);
  } else {
    var words = getWords();
  }
  var randomNumber = Math.floor(Math.random() * words.length);
  var word = words[randomNumber]

  if (o !== null && o !== undefined && o.productData !== null && o.productData !== undefined && o.productData.length > 0) {
    for (var propertyName in o.keywords) {
      if (word === propertyName) {
        randomNumber = Math.floor(Math.random() * words.length);
        word = words[randomNumber];
      }
    }
  }
  return word;
}

function feedResults(o, keyword, value) {
  if (o.productData !== null && o.productData !== undefined && value > 0) {
    o.productData.forEach(function (f, i) {
      o.productData[i].childs.forEach(function (c, i2) {
        if (o.productData[i].childs[i2].name == keyword) {
          o.productData[i].childs[i2].points += value;
          if (value !== 0) {
            o.productData[i].points += value;
          } else {
            o.productData[i].points = o.productData[i].points - 1;
          }
        }
      }, this);

      var words = keyword
        .replace(/[.,?!;()"'-]/g, " ")
        .replace(/\s+/g, " ")
        .replace(" and ", " ")
        .replace(" or ", " ")
        .replace("'", " ")
        .toLowerCase()
        .trim()
        .split(" ");

      words.forEach(function (w) {
        if (o.productData[i].words[w] !== null && o.productData[i].words[w] !== undefined) {
          switch (value) {
            case 1:
              o.productData[i].points += 1;
              break;
            case 4:
              o.productData[i].points += 2;
              break;
            case 0:
              o.productData[i].points = o.productData[i].points - 1;
              break;
          }
        }
      }, this);
    }, this);
  }

  return o.productData;
}

function getFoodObject() {
  var food = [];
  var hasInfo = false //);
  var foodList = foods;

  for (var propertyName in foodList) {
    f = {
      name: "",
      points: 0,
      childs: [],
      words: []
    };

    f.name = propertyName;
    var list = foodList[propertyName];
    list.forEach(function (sentence) {
      words = sentence
        .replace(/[.,?!;()"'-]/g, " ")
        .replace(/\s+/g, " ")
        .replace(" and ", " ")
        .replace(" or ", " ")
        .replace("'", " ")
        .toLowerCase()
        .trim()
        .split(" ");

      words.forEach(function (word) {
        if (!(f.words.hasOwnProperty(word))) {
          f.words[word] = 0;
        }
        f.words[word]++;
      });

      foodChild = {
        name: sentence,
        points: 0
      }

      f.childs.push(foodChild);
    }, this);

    food.push(f);
  }

  return food;
}

function getWords(categories) {
  var validateCategories = (categories !== null && categories !== undefined && categories.length > 0);
  var index = [];
  for (var propertyName in foods) {
    if (!validateCategories) {
      var list = foods[propertyName];
      list.forEach(function (sentence) {
        index.push(sentence);
      }, this);
    } else {
      categories.forEach(function (c) {
        if (c.name === propertyName) {
          var list = foods[propertyName];
          list.forEach(function (sentence) {
            index.push(sentence);
          }, this);
        }
      }, this);
    }
  }
  return index;
}


var suggestion = setAnswer(null, "", 0);
var questionUser = function (suggestion) {
  rl.question('Do you like ' + suggestion.suggestion + '? :', function (answer, callback) {
    if (answer === null || answer === undefined || answer === '') {
      questionUser(suggestion);
    } else {
      suggestion = setAnswer(suggestion, suggestion.suggestion, answer);
      if (!suggestion.result) {
        questionUser(suggestion);
      } else {
        console.log('You want ' + suggestion.restaurantSuggestion);
        process.exit();
      }
    }
  });
}
questionUser(suggestion);

module.exports = setAnswer;
