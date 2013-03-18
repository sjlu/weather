$(document).ready ->
	# Loading Classes
	# center = new Center()
	map = new Map()
	location = new Location()
	weather = new Weather()

	# Spinner related code
	opts = 
		lines: 9 
		length: 10
		width: 4
		radius: 11
		corners: 1 
		rotate: 14
		color: '#fff'
		speed: 1.2
		trail: 60
		shadow: false
		hwaccel: true
		className: 'spinner'
		zIndex: 2e9
		top: 'auto'
		left: 'auto'

	spinner = new Spinner(opts).spin()
	$('#loading').append(spinner.el)

	# Helper functions

	hash = (zip) ->
		window.location.hash = "#/" + zip

	handlebar = (id) ->
		Handlebars.compile($(id).html())

	phase = (show, hide, handler) ->
		$(hide).fadeOut 'fast', ->
			$(show).fadeIn()
			handler()

	# Callback functions

	weathered = (d) ->
		console.log(d)
		$('#weather h1').html("#{d.location.city}, #{d.location.state_abbr}")
		template = handlebar('#day')
		for day, weather of d.weather
			$('#weather div').append(template(weather))
			console.log weather
		phase('#weather', '#loading')

	located = (d) ->
		weather.retrieve(d.zipcode, weathered)
		map.setCenter(d.latitude, d.longitude)
		map.setZoom(13)
		hash(d.zipcode)

	# Binding events

	$('#track').click =>
		phase '#loading', '#location', ->
			location.track(located)

	$('#zip').keyup (e) ->
		if (e.keyCode == 13)
			zip = $(@).val()
			phase '#loading', '#location', ->
				location.locateByZipcode(zip, located)

	# Routes
	Path.map('#/:zip').to -> 
		zip = this.params.zip
		phase '#loading', '#location', ->
			location.locateByZipcode(zip, located)

	Path.listen();