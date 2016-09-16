var EntitiesService = {}

EntitiesService.prototype.tag = function (message) {
  var model = {
    message: message,
    entities: {
      neighborhood: ['south end'],
      address: [],
      foodType: ['mexican'],
      restauraunt: []
    }
  }

  var P = new Promise()
  P.resolve(model)

  return P
}

module.exports = EntitiesService
