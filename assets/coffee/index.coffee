$(document).ready ->
	# center = new Center()
	map = new Map()
	locate = (d) ->
		map.setCenter(d.latitude, d.longitude)
		map.setZoom(13)
	location = new Location(locate)