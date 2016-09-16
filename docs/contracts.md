# Contracts

## Intent/Classifier
This piece will take a sentence and return json object with basic information 
about what they want. 

cheap == true when they specifiy that they want some stuff
specific == true when they specified what food they want
food == will have a specific food type they might have asked for

## Request
```
{
	"message": "I'm looking for mexican food in south end"
}
```
### Response
```
{
	"message": "I'm looking for mexican food in south end",
	"cheap": false,
    "specific": true,
    "food": "mexican food",
}

## Request
```
{
	"message": "Would you recommend a place to eat"
}
```
### Response
```
{
	"message": "Would you recommend a place to eat",
	"cheap": false,
    "specific": false,
    "food": null,
}

## Entity Tagger

This piece will take a sentance and return a list of named tags.

### Request
```
{
	"message": "I'm looking for mexican food in south end",
	"sentances": [
		"I'm looking for mexican food in south end"
	]
}
```

### Response
```
{
	"message": "I'm looking for mexican food in south end",
	"entities": {
		"neighborhood": ["south end"],
		"address": [...],
		"foodType": ["mexican"],
		"restauraunt" [...]
	}
}
```


## Messenger

## Location Search

This piece will take an address or neighborhood and return a promise that returns the corresponding latitude and longitude coordinates in string format.
If an error occurs, or it is not possible to determine the coordinates, `null` will be returned

### Request
```
{
	"neighborhood" : "south end",
	"address" : null
}
```

### Response
```
["lat","lng"]
```

### Usage

```
var LocationService = require('./LocationService');

...

var locationRequest = {...};

...

var locationPromise = LocationService.find(locationRequest)

...

locationPromise.then(function (location) {
  ...
})
```

## Restaurants Search

This piece will take a location, food type and pricing range (0, 1, 2, 3 or 4) and return up to three restaurants, sorted by rating

### Request
```
{
  "location" : ["lat","lng"],
	"foodType" : "pizza",
	"pricing" : 2
}
```

### Response
```
[{
	"name" : "Papa Johns",
	"rating" : 2.0,
	"website" : "https://www.papajohns.com/",
	"googleUrl" : "https://www.google.com/maps/place/Papa+John's+Pizza/@34.3904308,-95.7067308,4z/data=!4m8!1m2!2m1!1spapa+johns!3m4!1s0x89c25c885de75af9:0xde14a07dc3c1a18c!8m2!3d40.6651176!4d-73.9225862"
},{
	...
},{
	...
}]
```

### Usage

```
var RestaurantsService = require('./RestaurantsService')

...

var restaurantsRequest = {...}

...

var restaurantsPromise = RestaurantsService.find(restaurantsRequest)

...

restaurantsPromise.then(function (restaurants) {
  ...
})
```
