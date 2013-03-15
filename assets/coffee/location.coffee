class Location
	constructor: ->

	track: ->
		navigator.geolocation.getCurrentPosition()