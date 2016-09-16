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
		"neighborhood": ["south end"],
		"address": [...],
		"foodType": ["mexican"],
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
	"neighborhood" : ["south end"]
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

This piece will take a set of resaurant search criteria and returns an array of up to three restaurant suggestions

### Request
```
{
	"location" : "lat,lon",
	"foodType" : "pizza",
	"pricing" : "2"
}
```

### Response
```
[{
	"name" : "Papa Johns",
	"rating" : 2.0,
	"website" : "https://www.papajohns.com/",
	"googleUrl" : "https://www.google.com/maps/place/Papa+John's+Pizza/@34.3904308,-95.7067308,4z/data=!4m8!1m2!2m1!1spapa+johns!3m4!1s0x89c25c885de75af9:0xde14a07dc3c1a18c!8m2!3d40.6651176!4d-73.9225862"
},{...},{...}]
```

