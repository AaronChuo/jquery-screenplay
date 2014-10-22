/*
jQuery Screenplay - v0.1.0
Copyright (c) 2014 Aaron Chuo
Licensed under the MIT license.
*/
'use strict';

(function($, d) {

  $.fn.getBoundingClientRect = function() {
    var elem = '#'+this.attr('id') || '.'+this.attr('class');
    return d.querySelector(elem).getBoundingClientRect();
  };


  $.fn.screenplay = function(options, d) {

    if(typeof options === 'string') {
      options = {text: options};
    }

    var settings = $.extend({
      playlist: []
    }, options);

    var listDigestor = function() {
      for(var i=0, pl=settings.playlist; i<pl.length; i++) {
        var p = pl[i],
            role = $(p.role),
            act = p.act;

        if(isEnterScreen(role) && p.done !== 1) {
          act.call(p.role);
          p.done = 1;
        }
      }
    };

    var isEnterScreen = function(role) {
      var role = $(role),
          screenWidth = $(window).width(),
          screenHeight = $(window).height(),
          rect = role.getBoundingClientRect();

      if(rect.top < screenHeight / 1.5) {
        return true;
      } else {
        return false;
      }
    };

    $(window).on('scroll', listDigestor);

  };

})(jQuery, document);