var _ = require("lodash");

var isNotEmpty = function (value){
  return !_.isEmpty(value);
}

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

EntitiesService.clean = function(text) {

  text = text.toLowerCase();
  text = text.replace(/[a-z]'[a-z]/g, "");
  text = text.replace(/[^\s\.\?\!a-z0-9]/g, " ");
  text = text.replace(/\s+/g, " ");
  text = text.replace(/[\.\?\!]+\s+/g, ".");
  text = text.replace(/^[\.\?\!]+/, "")
  text = text.replace(/[\.\?\!]+$/, "")

  return JSON.stringify(_.filter(text.split(/\./), isNotEmpty));

}

module.exports = EntitiesService

EntitiesService.tag('hello').then(function (model) {
  console.log(model)
})
