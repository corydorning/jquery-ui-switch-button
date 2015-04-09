/*! jquery-ui-switch-button.js
 *
 * URL: http://corydorning.com/projects/switch-button
 *
 * @author: Cory Dorning
 * @modified: 11/19/2014
 *
 * dependencies: jQuery 1.10+, jQuery UI 1.10+
 *
 * Switch Button is a jQuery UI widget that mimics
 * the iPhone style toggle for on and off states.
 *
 * @TODO:
 * check for checked value to set options.state
 *
 */

;(function($) {
  "use strict";

  $.widget('ui.switchbutton', {
  
    // default options
    options: {
      state: 'off'
    }, // options

    _create: function() {
      var self = this
        , o = self.options
        , $buttonset = self.$buttonset = $(self.element).addClass('ui-buttonset')
        , $radios = self.$radios = $buttonset.children(':radio').addClass('ui-helper-hidden-accessible')
        , $labels = self.$labels = $buttonset.children('label').addClass('ui-button ui-widget ui-state-default ui-button-text-only').wrapInner('<span class="ui-button-text"/>')
        , height = $labels.eq(0).height()
        , $off = self.$off =  {
            events: $._data($labels[0], 'events'),
            label: $labels.eq(0).width(height).addClass('ui-switch-button-off ui-corner-left'),
            radio: $radios.eq(0)
          }
        , $on = self.$on = {
            events: $._data($labels[1], 'events'),
            label: $labels.eq(1).width(height).addClass('ui-switch-button-on ui-corner-right').css('margin-left', -($off.label.height() / 3)),
            radio: $radios.eq(1)
          }
      ;

      // update options with initial radiobutton state and html5 data
      $.extend(o, { state: $on.radio.prop('checked') || 'off' }, $buttonset.data('options') && $buttonset.data('options').switchbutton || {});

        // hide button label text
      $labels.children('.ui-button-text').css('visibility', 'hidden');

      // perform event bindings
      self._setupEvents();

      // trigger click to set state, could be $off or $on, doesn't matter
      self.$off.label.trigger('click');
    }, // _create method


    // binds events
    _setupEvents: function() {
      var self = this;

      // toggle on/off when
      self._toggle();
    }, // _bindEvents method

    // toggle
    _toggle: function(){
      var self = this
        , o = self.options
        , $buttonset = self.$buttonset
        , $labels = self.$labels
        , fn = o.state === 'off' ? [self.toggleOff, self.toggleOn] : [self.toggleOn, self.toggleOff]
        , iteration = 0
      ;

      // set initial buttonset state
      $buttonset.addClass('ui-switch-button-' + o.state);

      return $labels.click(function(ev){
        fn[iteration].call(self);
        iteration= (iteration+1) % fn.length;
        ev.preventDefault();
      });
    },

    toggleOn: function() {
      var self = this
        , $buttonset = self.$buttonset
        , $on = self.$on
        , $off = self.$off
      ;

      $buttonset
        .toggleClass('ui-switch-button-on ui-switch-button-off')
      ;

      $on.label
        .css('z-index', 2)
        .removeClass('ui-state-active')
        .animate({
          borderTopLeftRadius: '50%',
          borderTopRightRadius: '50%',
          borderBottomRightRadius: '50%',
          borderBottomLeftRadius: '50%'
        }, 100);

      $off.label
        .css('z-index', 1)
        .addClass('ui-state-active')
        .animate({
          borderTopLeftRadius: '50%',
          borderTopRightRadius: '0%',
          borderBottomRightRadius: '0%',
          borderBottomLeftRadius: '50%'
        }, 200)
      ;

      // set radio buttons
      $off.radio.prop('checked', false);
      $on.radio.prop('checked', true);

    }, // toggleOn


    toggleOff: function() {
      var self = this
        , $buttonset = self.$buttonset
        , $on = self.$on
        , $off = self.$off
      ;

      $buttonset
        .toggleClass('ui-switch-button-on ui-switch-button-off')
      ;

      $on.label
        .css('z-index', 1)
        .addClass('ui-state-active')
        .animate({
          borderTopLeftRadius: '0%',
          borderTopRightRadius: '50%',
          borderBottomRightRadius: '50%',
          borderBottomLeftRadius: '0%'
        }, 200)
      ;

      $off.label
        .css('z-index', 2)
        .removeClass('ui-state-active')
        .animate({
          borderTopLeftRadius: '50%',
          borderTopRightRadius: '50%',
          borderBottomRightRadius: '50%',
          borderBottomLeftRadius: '50%'
        }, 100)
      ;

      // set radio buttons
      $off.radio.prop('checked', true);
      $on.radio.prop('checked', false);

    } // toggleOff

  }); // $.widget('switchbutton')
})(jQuery);
// end switchbutton