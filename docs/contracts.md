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
		"resteraunt" [...]
	}
}
```


## Messenger

## Goolge Places Search

