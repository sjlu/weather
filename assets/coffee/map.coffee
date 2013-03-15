class Map
	constructor: ->
		@create()

		$(window).resize =>
			@resize()

	setCenter: (lat, lng) ->
		@center = new google.maps.LatLng(lat, lng)
		@map.panTo(@center)

	setZoom: (level) ->
		@zoom = @zoom+1
		@map.setZoom(@zoom)
		if @zoom < level
			setTimeout =>
				@setZoom(level)
			, 80

	resize: ->
		$('#map').css('height', window.innerHeight).css('width', window.innerWidth)
		google.maps.event.trigger(@map, "resize")
		@map.panTo(@center)
		@map.setZoom(@zoom)

	create: ->
		@zoom = 4
		@center = new google.maps.LatLng(39.833333, -98.583333)

		opts = 
			zoom: @zoom
			center: @center
			mapTypeId: google.maps.MapTypeId.ROADMAP
			disableDefaultUI: true
			draggable: false
			disableDoubleClickZoom: true
			keyboardShortcuts: false
			zoomControl: false
			scrollwheel: false

		@map = new google.maps.Map(document.getElementById("map"), opts)
		@resize()