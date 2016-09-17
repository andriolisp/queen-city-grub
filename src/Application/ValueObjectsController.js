
function ValueObjectsController() {
}

//============================================
ValueObjectsController.getWelcomeScreenData = function() {
  console.log("VALUE_CONTROLLER: QueenCityGRUB getWelcomeScreenData start ");
  return welcomeScreenData;
}

//============================================
ValueObjectsController.getWelcomeCarouselData = function() {
  console.log("VALUE_CONTROLLER: QueenCityGRUB getWelcomeCarouselData start ");
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
                    image_url: "https://www.dropbox.com/s/dg0mc8pvitiuvqa/welcome-screen.jpg?dl=0" 
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
                    "image_url": "https://www.dropbox.com/s/ms9ul7afotde3im/im-not-sure.jpg?dl=0",
                    "buttons": [{
                        "type": "postback",
                        "title": "Help me find it",
                        "payload": "admindontknow"
                    }]
                   }, {
                    "title": "Mexican",
                    "subtitle": "Mild or Spicy you will love it",
                    "image_url": "https://www.dropbox.com/s/7rpqhaawn3vn4zk/mexican-food.jpg?dl=0",
                    "buttons": [{
                        "type": "postback",
                        "title": "Get some",
                        "payload": "adminmexican"
                    }]
                   },  {
                    "title": "Italian",
                    "subtitle": "Mamma Mia that’s a spicy meatball",
                    "image_url": "https://www.dropbox.com/s/mz673aq12o9qtrp/italian-food.jpg?dl=0",
                    "buttons": [{
                        "type": "postback",
                        "title": "Get some",
                        "payload": "adminitalian"
                    }]
                   },  {
                    "title": "American",
                    "subtitle": "Y-all get it while its hot",
                    "image_url": "https://www.dropbox.com/s/v02q1fc3hn5ewfg/american-food.jpg?dl=0",
                    "buttons": [{
                        "type": "postback",
                        "title": "Get some",
                        "payload": "adminamerican"
                    }]
                   },  {
                    "title": "Chinese",
                    "subtitle": "Fortune Cookie Time",
                    "image_url": "https://www.dropbox.com/s/mzss0lab48ahhtk/chinese-food.jpg?dl=0",
                    "buttons": [{
                        "type": "postback",
                        "title": "Explore Sports",
                        "payload": "adminchinese"
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