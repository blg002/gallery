// Utility
if ( typeof Object.create !== 'function' ) {
  Object.create = function( obj ) {
    function F() {};
    F.prototype = obj;
    return new F();
  };
}


(function($) {
  var Modernizr = window.Modernizr;
  var transformProp = Modernizr.prefixed('transform');
  var transitionProp = Modernizr.prefixed('transition');

  var Gallery = {
    init: function( el, config ) {
      var self = this;
      
      self.config = $.extend( {}, $.fn.gallery.defaults, config );
      
      self.el         = el;
      self.$el        = $(el);
      self.$wrapper   = self.$el.wrap('<div class="gallery-wrap">');
      self.$imgs      = self.$el.find('img');
      self.$thumbs    = self.createThumbs().find('img');


      self.setCurrent( self.config.initialImg );
      self.setup();
      self.events();
    },


    setup: function() {
      var self = this;

      $.each( self.$imgs, function(i) {
        $(this).attr({
          'id': 'gallery-img-'+ i +'',
          'role': 'tabpanel',
          'aria-labelledby': 'gallery-control-'+ i +''
        })
      });
    },

    createThumbs: function() {
      var self = this;
      var frag = '';

      $.each( self.$imgs, function(i) {
        frag += '<li><img src="'+ this.src +'" width="'+ self.config.thumbWidth +'" height="'+ self.config.thumbHeight +'" id="gallery-control-'+ i +'" aria-controls="gallery-img-'+ i +'" role="tab"></li>';
      });

      return $('<ul>', {'class': 'gallery-thumbs'}).insertAfter(self.$el).append(frag);
    },


    setCurrent: function( img_num ) {
      var self = this;

      self.$imgs.attr({
        'aria-hidden': 'true'
      }).eq(img_num).attr({
        'aria-hidden': 'false'
      });

      self.$thumbs.attr({
        'tabindex': '-1',
        'aria-selected': 'false'
      }).eq(img_num).attr({
        'tabindex': '0',
        'aria-selected': 'true'
      });
    },


    events: function() {
      var self = this;

      self.$thumbs.on('click', function() {
        var img_num = self.$thumbs.index(this);

        self.setCurrent( img_num );
      })
    }
  };


  $.fn.gallery = function( config ) {
    return this.each(function() {
      var obj = Object.create( Gallery );
      obj.init( this, config );
    });
  };

  $.fn.gallery.defaults = {
    thumbWidth: 92,
    thumbHeight: 60,
    initialImg: 0
  };

})( jQuery );