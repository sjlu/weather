$(document).ready ->
	map = new Map()
	location = new Location()
	location.track (loc) ->
		console.log(loc)
		map.setCenter(loc.latitude, loc.longitude)
		map.setZoom(13)
