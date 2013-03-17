class Location
	url: 'http://sjlu.cities.jit.su'

	constructor: (handler) ->
		that = this;

		$('#track').click =>
			@track(handler)

		$('#zip').keyup (e) ->
			if (e.keyCode == 13)
				zip = $(@).val()
				that.locateByZipcode(zip, handler)


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