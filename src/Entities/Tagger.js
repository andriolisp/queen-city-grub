var spawn = require('child_process').spawn
var path = require('path')

var pythonPath = '/usr/bin/python'
var taggerPath = path.join(__dirname, '../python/tagger/run.py')
var modelPath = path.join(__dirname, '../python/tagger/models/english/')

var wainting = Promise.resolve(true)

var Tagger = {
  proc: null
}

Tagger.init = function () {
  return new Promise((resolve, reject) => {
    this.proc = spawn(pythonPath, ['-u', taggerPath, '--model', modelPath])

    this.proc.stdout.on('data', (data) => {
      if (data.toString().replace('\n', '') === 'Ready') {
        this.proc.stdout.pause()
        this.proc.stdout.removeAllListeners()
        resolve()
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
        resolve(data.toString())
      })
      this.proc.stdout.resume()
      this.proc.stdin.write(sentence + '\n')
    })
  })

  wainting = p
  return p
}

Tagger.init().then(function (value) {
  console.log('ready')
  Tagger.tag('The Chess Olympiad concludes with the United States winning the open event and China the womens event.').then((tags) => {
    console.log(tags)
  })
  Tagger.tag('Mass protests across Hungary erupted after Prime Minister Ferenc Gyurcsanys private speech was leaked to the public, in which he admitted that the Hungarian Socialist Party had lied to win the 2006 election.').then((tags) => {
    console.log(tags)
  })
  Tagger.tag('The Chess Olympiad concludes with the United States winning the open event and China the womens event.').then((tags) => {
    console.log(tags)
  })
  Tagger.tag('The Chess concludes with the United States winning the open event and China the womens event.').then((tags) => {
    console.log(tags)
  })
})

module.exports = Tagger
