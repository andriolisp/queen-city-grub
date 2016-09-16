# Contracts

## Intent/Classifier
Messenger will hit The classifier. The Classifier expects
a sentence and return a json object indicating whether 
they want cheap, good, and whether they know what they want or not. 


### example 1
request: {
    "message" : "I want some good mexican food"
}
response: {
    "message": "I want  some good mexican food",
    "cheap": null,
    "ratedhigh": true,
    "knows": true
}


### example 2
request: {
    "message": "I want some cheap mexican food"
}
response: {
    "message": "I want  some cheap mexican food",
    "cheap": true,
    "ratedhigh": null,
    "knows": true
}

### example 3
request: {
    "message": "Could you recommend a good place to eat in Charlotte"
}
response: {
    "message": "Could you recommend a good place to eat in Charlotte",
    "cheap": null,
    "ratedhigh": true,
    "knows": false
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

