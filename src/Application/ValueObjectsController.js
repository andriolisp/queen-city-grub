
function ValueObjectsController() {
}

ValueObjectsController.getWelcomeScreenData = function() {
  return welcomeScreenData;
}

ValueObjectsController.getWelcomeCarouselData = function() {
  return welcomeCarouselData;
}

  var welcomeScreenData = {
         "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [ {
                   "title": "Welcome to Queen City Grub",
                    image_url: "https://queen-city-grub.herokuapp.com/welcome.jpg" 
                }]
            }
        }
    };


 var welcomeCarouselData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "I don’t know",
                    "subtitle": "Surprise me…",
                    "image_url": "https://queen-city-grub.herokuapp.com/imnotsure.jpg",
                    "buttons": [{
                        "type": "postback",
                        "title": "Help Me",
                        "payload": "admindontknow"
                    }]
                   }, {
                    "title": "Mexican",
                    "subtitle": "Mild or Spicy you will love it",
                    "image_url": "https://queen-city-grub.herokuapp.com/mexican.jpg",
                    "buttons": [{
                        "type": "postback",
                        "title": "Find Mexican Food",
                        "payload": "adminmexican"
                    }]
                   },  {
                    "title": "Italian",
                    "subtitle": "Mamma Mia that's a spicy meatball",
                    "image_url": "https://queen-city-grub.herokuapp.com/italian.jpg",
                    "buttons": [{
                        "type": "postback",
                        "title": "Find Italian Food",
                        "payload": "adminitalian"
                    }]
                   },  {
                    "title": "American",
                    "subtitle": "Get it while its hot",
                    "image_url": "https://queen-city-grub.herokuapp.com/american.jpg",
                    "buttons": [{
                        "type": "postback",
                        "title": "Find American Food",
                        "payload": "adminamerican"
                    }]
                   },  {
                    "title": "Chinese",
                    "subtitle": "Fortune Cookie Time",
                    "image_url": "https://queen-city-grub.herokuapp.com/chinese.jpg",
                    "buttons": [{
                        "type": "postback",
                        "title": "Find Chinese Food",
                        "payload": "adminchinese"
                    }]
                },  {
                    "title": "Indian",
                    "subtitle": "Samosas Sound Sweet",
                    "image_url": "https://queen-city-grub.herokuapp.com/indian.jpg",
                    "buttons": [{
                        "type": "postback",
                        "title": "Find Indian Food",
                        "payload": "adminindian"
                    }]
                }]
            }
        }
    }


module.exports = ValueObjectsController;