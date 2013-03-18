var Location;

Location = (function() {

  function Location() {}

  Location.prototype.url = 'http://sjlu.cities.jit.su';

  Location.prototype.locateByZipcode = function(zip, handler) {
    var url;
    url = this.url + '/zip/' + zip;
    return $.ajax(url, {
      type: "GET",
      dataType: "json",
      success: handler
    });
  };

  Location.prototype.locateByGps = function(lat, lng, handler) {
    var url;
    url = this.url + '/gps/' + lat + '/' + lng;
    return $.ajax(url, {
      type: "GET",
      dataType: "json",
      success: handler
    });
  };

  Location.prototype.track = function(handler) {
    var errorHandler, successHandler,
      _this = this;
    successHandler = function(position) {
      var lat, lng;
      lat = position.coords.latitude;
      lng = position.coords.longitude;
      return _this.locateByGps(lat, lng, handler);
    };
    errorHandler = function() {
      return alert("Problem getting your location.");
    };
    return navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  };

  return Location;

})();
