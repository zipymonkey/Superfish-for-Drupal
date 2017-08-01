/*
 * Aria v0.1 - optional ARIA enhancer for Superfish jQuery menu widget.
 * 
 * To supplement HTML with attributes that explicitly communicate the roles, states, and 
 * properties of the various parts that make up a menu system.
 * As assistive technology (AT) users interact with the menu, ARIA passes updated information 
 * to their AT, and their AT then communicates that information in meaningful ways.
 * 
 * Accessible Rich Internet Applications (WAI-ARIA): https://www.w3.org/TR/wai-aria/
 */

(function($) {
  $.fn.aria = function() {
    onHide = function() {
      var $li = this.closest('li.menuparent');
      
      $li.attr('aria-expanded', false)
        .children('ul').attr('aria-hidden', true);
    },
    onBeforeShow = function() {
      var $li = this.closest('li.menuparent');
      
      $li.attr('aria-expanded', true)
        .children('ul').attr('aria-hidden', false);
    };
    
    return this.each(function() {
      var o = $.fn.superfish.o[this.serial]; // Get this menu's options
      
      // If callbacks already set, store them
      var _onBeforeShow = o.onBeforeShow,
      _onHide = o.onHide;
      
      $.extend($.fn.superfish.o[this.serial],{
        onBeforeShow: function() {
          onBeforeShow.call(this);   // Fire our ARIA callback
          _onBeforeShow.call(this);  // Fire stored callbacks
        },
        onHide: function() {
          onHide.call(this);   // Fire our ARIA callback
          _onHide.call(this);  // Fire stored callbacks
        }
      });
    });
  };
})(jQuery);
