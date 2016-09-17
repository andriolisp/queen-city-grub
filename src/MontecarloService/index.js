var fs = require('fs')
var foods = JSON.parse(fs.readFileSync('./Data/food.json', 'utf8'))

var MonteCarloObject = function (params) {
  this.params = params
}

MonteCarloObject.prototype.Reply = function (answer) {
  MonteCarloService.SetAnswer(this.params, this.params.suggestion, answer)
}

MonteCarloObject.prototype.GetSuggestion = function () {
  return this.params.suggestion
}

MonteCarloObject.prototype.GetResult = function () {
  return this.params.result
}

MonteCarloObject.prototype.GetFinalSuggestion = function () {
  return this.params.finalSuggestion
}

var MonteCarloService = {
  Initialize: function () {
    return MonteCarloService.SetAnswer(null, '', 0)
  },
  SetAnswer: function (o, keyword, answer) {
    answer = isNaN(answer) ? 0 : parseInt(answer)
    if (o == null || !o) {
      o = new MonteCarloObject({
        keywords: {},
        hasKeywords: false,
        suggestion: MonteCarloService.GetRandomSuggestion(),
        result: false,
        productData: MonteCarloService.GetFoodObject(),
        finalSuggestion: null,
        total: 1,
        input: 0
      })
    } else {
      if (keyword && keyword.trim().length > 0) {
        o.hasKeywords = true
        switch (answer) {
          case 1:
            o.keywords[keyword] = 1
            break
          case 2:
            o.keywords[keyword] = 4
            break
          case 0:
            o.keywords[keyword] = 0
            break
          default:
            o.keywords[keyword] = 1
            break
        }
      }

      o.productData = MonteCarloService.FeedResults(o, keyword, o.keywords[keyword])
      var finalSuggestion = ''
      var restaurantPoints = 0
      o.productData.forEach(function (p, i) {
        if (p.points > restaurantPoints) {
          restaurantPoints = p.points
          finalSuggestion = p.name
        }
      }, this)

      if (o.productData.length > 1 && o.total < 5 && restaurantPoints <= 15) {
        o.suggestion = MonteCarloService.GetRandomSuggestion(o)
      } else {
        o.hasKeywords = false
        o.suggestion = ''
        o.result = true
        o.finalSuggestion = finalSuggestion
        o.productData = null
      }

      if (answer === 1 || answer === 2) {
        o.total++
      }
    }

    return o
  },
  GetWords: function (categories) {
    var validateCategories = (categories !== null && categories !== undefined && categories.length > 0)
    var index = []
    for (var propertyName in foods) {
      if (!validateCategories) {
        var list = foods[propertyName]
        list.forEach(function (sentence) {
          index.push(sentence)
        }, this)
      } else {
        categories.forEach(function (c) {
          if (c.name === propertyName) {
            var list = foods[propertyName]
            list.forEach(function (sentence) {
              index.push(sentence)
            }, this)
          }
        }, this)
      }
    }
    return index
  },
  GetFoodObject: function () {
    var food = []
    var hasInfo = false // );
    var foodList = foods

    for (var propertyName in foodList) {
      var f = {
        name: '',
        points: 0,
        childs: [],
        words: []
      }

      f.name = propertyName
      var list = foodList[propertyName]
      list.forEach(function (sentence) {
        var words = sentence
          .replace(/[.,?!;()"'-]/g, ' ')
          .replace(/\s+/g, ' ')
          .replace(' and ', ' ')
          .replace(' or ', ' ')
          .replace("'", ' ')
          .toLowerCase()
          .trim()
          .split(' ')

        words.forEach(function (word) {
          if (!(f.words.hasOwnProperty(word))) {
            f.words[word] = 0
          }
          f.words[word]++
        })

        var foodChild = {
          name: sentence,
          points: 0
        }

        f.childs.push(foodChild)
      }, this)

      food.push(f)
    }

    return food
  },
  FeedResults: function (o, keyword, value) {
    if (o.productData !== null && o.productData !== undefined && value > 0) {
      o.productData.forEach(function (f, i) {
        o.productData[i].childs.forEach(function (c, i2) {
          if (o.productData[i].childs[i2].name === keyword) {
            o.productData[i].childs[i2].points += value
            if (value !== 0) {
              o.productData[i].points += value
            } else {
              o.productData[i].points = o.productData[i].points - 1
            }
          }
        }, this)

        var words = keyword
          .replace(/[.,?!;()"'-]/g, ' ')
          .replace(/\s+/g, ' ')
          .replace(' and ', ' ')
          .replace(' or ', ' ')
          .replace("'", ' ')
          .toLowerCase()
          .trim()
          .split(' ')

        words.forEach(function (w) {
          if (o.productData[i].words[w] !== null && o.productData[i].words[w] !== undefined) {
            switch (value) {
              case 1:
                o.productData[i].points += 1
                break
              case 4:
                o.productData[i].points += 2
                break
              case 0:
                o.productData[i].points = o.productData[i].points - 1
                break
            }
          }
        }, this)
      }, this)
    }

    return o.productData
  },
  GetRandomSuggestion: function (o) {
    var words
    if (o !== null && o !== undefined && o.productData !== null && o.productData !== undefined && o.productData.length > 0) {
      words = MonteCarloService.GetWords(o.productData)
    } else {
      words = MonteCarloService.GetWords()
    }
    var randomNumber = Math.floor(Math.random() * words.length)
    var word = words[randomNumber]

    if (o !== null && o !== undefined && o.productData !== null && o.productData !== undefined && o.productData.length > 0) {
      for (var propertyName in o.keywords) {
        if (word === propertyName) {
          randomNumber = Math.floor(Math.random() * words.length)
          word = words[randomNumber]
        }
      }
    }
    return word
  }
}

module.exports = MonteCarloService
