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
      self.events();
    },


    createThumbs: function() {
      var self = this;
      var frag = '';

      self.$imgs.each( function() {
        frag += '<li><img src="'+ this.src +'" width="'+ self.config.thumbWidth +'" height="'+ self.config.thumbHeight +'"></li>';
      });

      return $('<ul>', {'class': 'gallery-thumbs'}).insertAfter(self.$el).append(frag);
    },


    setCurrent: function( img_num ) {
      var self = this;

      self.$imgs.removeAttr('data-current').eq(img_num).attr('data-current', '');
      self.$thumbs.removeAttr('data-thumb-current').eq(img_num).attr('data-thumb-current', '');
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