class Weather
	url: 'http://sjlu.meteorologist.jit.su'

	# constructor: ->

	retrieve: (zip, handler) ->
		url = @url+'/forecast/zip/'+zip
		$.ajax url, 
			type: "GET"
			dataType: "json"
			success: handler