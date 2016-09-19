
function ValueObjectsController() {
}

//============================================
ValueObjectsController.getWelcomeScreenData = function() {
  return welcomeScreenData;
}

//============================================
ValueObjectsController.getWelcomeCarouselData = function() {
  return welcomeCarouselData;
}


//============================================
ValueObjectsController.getShareHelp = function() {
  return shareHelpData;
}

//============================================
ValueObjectsController.getStarted = function() {
  return getStartedData;
}





//================================= Welcome Graphic
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


//=================================
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












// share and help
var shareHelpData = {
    "attachment":{  
      "type":"template",
      "payload":{  
         "template_type":"generic",
         "elements":[  
            {  
               "title":"Get Help or Tell a friend",
               "subtitle":"Feature coming soon...",
               "image_url":"http://vdex.com/shopby/images/helpshare.png",
               "buttons":[  
                  {  
                     "type":"web_url",
                     "url":"http://www.vdex.com/shopby/help.html",
                     "title":"Get Help!"
                  },
                  {  
                     "type":"web_url",
                     "url":"http://www.vdex.com/shopby/share.html",
                     "title":"Tell a friend"
                  }
               ]
            }
         ]
      }
   }
    };


// this is a basic example code to use as a template
var exampleData = {
 "attachment":{  
   "type":"template",
   "payload":{  
      "template_type":"generic",
      "elements":[  
         {  
            "title":"Clothes",
            "subtitle":"-------------",
            "image_url":"http://vdex.com/shopby/images/fashion.png",
            "buttons":[  
               {  
                  "type":"web_url",
                  "url":"http://www.shop.com/Clothes-a.xhtml",
                  "title":"web url"
               },
               {  
                  "type":"postback",
                  "title":"Clothes Postback",
                  "payload":"adminclothes"
               }
            ]
         },
         {  
            "title":"Shoes",
            "subtitle":"-------------",
            "image_url":"http://vdex.com/shopby/images/business.png",
            "buttons":[  
               {  
                  "type":"postback",
                  "title":"Shoes Postback",
                  "payload":"adminshoes"
               }
            ]
         },
         {  
            "title":"Beauty",
            "subtitle":"-------------",
            "image_url":"http://vdex.com/shopby/images/sports.png",
            "buttons":[  
               {  
                  "type":"postback",
                  "title":"Beauty Postback",
                  "payload":"adminbeauty"
               }
            ]
         },
         {  
            "title":"Jewelry",
            "subtitle":"-------------",
            "image_url":"http://vdex.com/shopby/images/deals.png",
            "buttons":[  
               {  
                  "type":"postback",
                  "title":"Jewelry Postback",
                  "payload":"adminjewelry"
               }
            ]
         }
      ]
   }
}
};



module.exports = ValueObjectsController;