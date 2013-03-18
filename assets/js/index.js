
$(document).ready(function() {
  var handlebar, hash, located, location, map, opts, phase, spinner, weather, weathered,
    _this = this;
  map = new Map();
  location = new Location();
  weather = new Weather();
  opts = {
    lines: 9,
    length: 10,
    width: 4,
    radius: 11,
    corners: 1,
    rotate: 14,
    color: '#fff',
    speed: 1.2,
    trail: 60,
    shadow: false,
    hwaccel: true,
    className: 'spinner',
    zIndex: 2e9,
    top: 'auto',
    left: 'auto'
  };
  spinner = new Spinner(opts).spin();
  $('#loading').append(spinner.el);
  hash = function(zip) {
    return window.location.hash = "#/" + zip;
  };
  handlebar = function(id) {
    return Handlebars.compile($(id).html());
  };
  phase = function(show, hide, handler) {
    return $(hide).fadeOut('fast', function() {
      $(show).fadeIn();
      return handler();
    });
  };
  weathered = function(d) {
    var day, template, _ref;
    console.log(d);
    $('#weather h1').html("" + d.location.city + ", " + d.location.state_abbr);
    template = handlebar('#day');
    _ref = d.weather;
    for (day in _ref) {
      weather = _ref[day];
      $('#weather div').append(template(weather));
      console.log(weather);
    }
    return phase('#weather', '#loading');
  };
  located = function(d) {
    weather.retrieve(d.zipcode, weathered);
    map.setCenter(d.latitude, d.longitude);
    map.setZoom(13);
    return hash(d.zipcode);
  };
  $('#track').click(function() {
    return phase('#loading', '#location', function() {
      return location.track(located);
    });
  });
  $('#zip').keyup(function(e) {
    var zip;
    if (e.keyCode === 13) {
      zip = $(this).val();
      return phase('#loading', '#location', function() {
        return location.locateByZipcode(zip, located);
      });
    }
  });
  Path.map('#/:zip').to(function() {
    var zip;
    zip = this.params.zip;
    return phase('#loading', '#location', function() {
      return location.locateByZipcode(zip, located);
    });
  });
  return Path.listen();
});
