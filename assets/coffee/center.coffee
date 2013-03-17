class Center
	constructor: ->
		@positionAll()
		$(window).resize =>
			@positionAll()

	positionAll: ->
		that = this
		$('.center').each ->
			that.positionOne($(this))

	positionOne: (elem) ->
		height = elem.outerHeight()
		elem.css('margin-top', -(height/2))