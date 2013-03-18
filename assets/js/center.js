var Center;

Center = (function() {

  function Center() {
    var _this = this;
    this.positionAll();
    $(window).resize(function() {
      return _this.positionAll();
    });
  }

  Center.prototype.positionAll = function() {
    var that;
    that = this;
    return $('.center').each(function() {
      return that.positionOne($(this));
    });
  };

  Center.prototype.positionOne = function(elem) {
    var height;
    height = elem.outerHeight();
    return elem.css('margin-top', -(height / 2));
  };

  return Center;

})();
