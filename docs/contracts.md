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
		"neighborhood": ['south end'],
		"address": [...],
		"foodType": [...],
		"resteraunt" [...]
	}
}
```


## Messenger

## Goolge Places Search

