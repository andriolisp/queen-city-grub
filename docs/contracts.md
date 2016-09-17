# Contracts

## Intent/Classifier
This piece will take a sentence and return json object with basic information 
about what they want. This will find location and foodType if we have it in our datasets.
If we don't have any in our datasets, the search will rely on entity tagger to find that info

message == the actual message
highEnd == true when they specifiy that they want some want highend place
recommend == true if they'd like to be recommended a place instead
foodType == will have a specific food type they might have asked for
location == location if a location was found in the message 

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
  "classifier": 
      {
        "highEnd": false,
        "recommend": false,
        "foodType": "mexican food",
        "location": "south end",
      }
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
  "classifier": 
      {
        "highEnd": false,
        "recommend": true,
        "foodType": null,
        "location": null,
      }
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

## Search Service

This piece will append the location and restaurant suggestions to the request object.
If neither address or neighborhood is known, the defaultLocation will be used as the location

### Request
```
{
  "message" : "...",
  "defaultLocation" : ["lat","lng"],
  "classifier" : {
    "highEnd" : true,
    "foodType" : "...",
    "neighborhood" : "..."
  },
  "entities" : {
    "address" : [...],
    "neighborhood" : [...],
    "foodType" : "...",
  }
}
```

### Response
```
{
  "message" : "...",
  "defaultLocation" : ["lat","lng"],
  "location" : ["lat","lng"],
  "classifier" : {
    "highEnd" : true,
    "foodType" : "...",
    "neighborhood" : "..."
  },
  "entities" : {
    "address" : [...],
    "neighborhood" : [...],
    "foodType" : "...",
  },
  "restaurants" : [{
    "name" : "...",
    "rating" : 4.1,
    "website" : "http://...",
    "googleUrl" : "http://...",
    "location" : ["lat","lng"]
  }],
  "isDone" : true
}
```