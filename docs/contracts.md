# Contracts

## Intent

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
		"restauraunt" [...]
	}
}
```


## Messenger

## Google Maps Search

This piece will take a neighborhood or address and return a latitude and longitude

### Request
```
{
	"neighborhood" : ['south end']
	"address" : [...]
}
```

### Response
```
{
	"location" : "lat,lon"
}
```

## Goolge Places Search

This piece will take a set of resaurant search criteria and return up to three restaurant suggestions

