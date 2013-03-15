class Location
	url: 'http://sjlu.cities.jit.su'

	constructor: ->

	locateByZipcode: (zip, handler) ->
		url = @url+'/zip/'+zip
		$.ajax url, 
			type: "GET"
			dataType: "json"
			success: handler

	locateByGps: (lat, lng, handler) ->
		url = @url+'/gps/'+lat+'/'+lng
		$.ajax url, 
			type: "GET"
			dataType: "json"
			success: handler

	track: (handler) ->
		successHandler = (position) => 
			lat = position.coords.latitude
			lng = position.coords.longitude

			@locateByGps(lat, lng, handler)

		errorHandler = =>
			alert "Problem getting your location."

		navigator.geolocation.getCurrentPosition(successHandler, errorHandler)