var EntitiesService = {}

EntitiesService.tag = function (message) {
  var model = {
    message: message,
    entities: {
      neighborhood: ['south end'],
      address: [],
      foodType: ['mexican'],
      restauraunt: []
    }
  }

  var P = new Promise(function (resolve, reject) {
    resolve(model)
  })

  return P
}

module.exports = EntitiesService

EntitiesService.tag('hello').then(function (model) {
  console.log(model)
})
