var Weather;

Weather = (function() {

  function Weather() {}

  Weather.prototype.url = 'http://sjlu.meteorologist.jit.su';

  Weather.prototype.retrieve = function(zip, handler) {
    var url;
    url = this.url + '/forecast/zip/' + zip;
    return $.ajax(url, {
      type: "GET",
      dataType: "json",
      success: handler
    });
  };

  return Weather;

})();
