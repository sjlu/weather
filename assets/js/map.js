var Map;

Map = (function() {

  function Map() {
    var resize,
      _this = this;
    this.create();
    resize = _.debounce(function() {
      return _this.resize();
    }, 300);
    $(window).resize(function() {
      return resize();
    });
  }

  Map.prototype.setCenter = function(lat, lng) {
    this.center = new google.maps.LatLng(lat, lng);
    this.mark(lat, lng);
    return this.map.panTo(this.center);
  };

  Map.prototype.setZoom = function(level) {
    var _this = this;
    this.zoom = this.zoom + 1;
    this.map.setZoom(this.zoom);
    if (this.zoom < level) {
      return setTimeout(function() {
        return _this.setZoom(level);
      }, 80);
    }
  };

  Map.prototype.resize = function() {
    $('#map').css('height', window.innerHeight).css('width', window.innerWidth);
    google.maps.event.trigger(this.map, "resize");
    this.map.panTo(this.center);
    return this.map.setZoom(this.zoom);
  };

  Map.prototype.create = function() {
    var opts;
    this.zoom = 4;
    this.center = new google.maps.LatLng(39.833333, -98.583333);
    opts = {
      zoom: this.zoom,
      center: this.center,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      draggable: false,
      disableDoubleClickZoom: true,
      keyboardShortcuts: false,
      zoomControl: false,
      scrollwheel: false
    };
    this.map = new google.maps.Map(document.getElementById("map"), opts);
    return this.resize();
  };

  Map.prototype.mark = function(lat, lng) {
    return new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: this.map
    });
  };

  return Map;

})();
