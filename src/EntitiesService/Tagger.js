var spawn = require('child_process').spawn
var path = require('path')

var pythonPath = '/usr/bin/python'
var taggerPath = path.join(__dirname, '../python/tagger/run.py')
var modelPath = path.join(__dirname, '../python/tagger/models/food/')

var wainting = Promise.resolve(true)

var Tagger = {
  proc: null
}

Tagger.init = function () {
  console.log('init')
  return new Promise((resolve, reject) => {
    this.proc = spawn(pythonPath, ['-u', taggerPath, '--model', modelPath])

    this.proc.stdout.on('data', (data) => {
      if (data.toString().replace('\n', '') === 'Ready') {
        this.proc.stdout.pause()
        this.proc.stdout.removeAllListeners()
        resolve()
      } else {
        console.log(data.toString())
      }
    })
  })
}

Tagger.tag = function (sentence) {
  var before = wainting

  var p = new Promise((resolve, reject) => {
    before.then(() => {
      this.proc.stdout.on('data', (data) => {
        this.proc.stdout.pause()
        this.proc.stdout.removeAllListeners()
        resolve(this.ProcessResults(data.toString()))
      })
      this.proc.stdout.resume()
      this.proc.stdin.write(sentence + '\n')
    })
  })

  wainting = p
  return p
}

Tagger.ProcessResults = function (results) {
  var words = results.split('\n')

  var obj = {
    neighborhood: [],
    address: [],
    foodType: [],
    restauraunt: []
  }

  words.forEach((word) => {
    var parts = word.split(' ')

    if (!parts || !parts[1] || parts[1] === 'O') {
      return false
    }

    var tag = parts[1].split('-')[1]

    switch (tag) {
      case 'NAT':
      case 'FT':
        obj.foodType.push(parts[0])
        break
      case 'NBH':
        obj.neighborhood.push(parts[0].trim())
        break
    }
  })

  return obj
}

module.exports = Tagger
