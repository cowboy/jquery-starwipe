/*!
 * jQuery Star Wipe - v1.1 - 1/10/2010
 * http://benalman.com/projects/jquery-starwipe-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery Star Wipe: Why eat hamburger when you can have steak?
//
// *Version: 1.1, Last updated: 1/10/2010*
//
// Project Home - http://benalman.com/projects/jquery-starwipe-plugin/
// GitHub       - http://github.com/cowboy/jquery-starwipe/
// Source       - http://github.com/cowboy/jquery-starwipe/raw/master/jquery.ba-starwipe.js
// (Minified)   - http://github.com/cowboy/jquery-starwipe/raw/master/jquery.ba-starwipe.min.js (9.1kb)
//
// About: License
//
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
//
// About: Examples
//
// This working example, complete with fully commented code, illustrates a few
// ways in which this plugin can be used.
//
// Star Wipe - http://benalman.com/code/projects/jquery-starwipe/examples/starwipe/
//
// About: Support and Testing
//
// Information about what version or versions of jQuery this plugin has been
// tested with, and what browsers it has been tested in.
//
// jQuery Versions - 1.3.2
// Browsers Tested - Chrome 3, Safari 4
//
// About: Release History
//
// 1.1   - (1/10/2010) Transition can now be canceled by pressing the back
//         button at any point after starting it.
// 1.0   - (10/9/2009) Initial release

(function($, window) {
  '$:nomunge'; // Used by YUI compressor.

  var loc = window.location,
    hash = '#starwipe-loading',

    mask,
    prop = '-webkit-mask-size',

    supports_starwipe,

    str_starwipe = 'starwipe',
    str_click = 'click.' + str_starwipe;

  // Method: jQuery.starwipe
  //
  // Trigger an astounding star wipe page-load transition, navigating to the
  // specified url upon completion (note: only works in the latest WebKit
  // browsers).
  //
  // Usage:
  //
  // > if ( !jQuery.starwipe( url ) ) {
  // >   alert( 'error: inferior browser, star wipe not supported' );
  // >   window.location = url;
  // > }
  //
  // Arguments:
  //
  //  url - (String) Destination URL to wipe to.
  //
  // Returns:
  //
  //  (Boolean) True if the browser supports the star wipe transition, false if
  //    not.
  
  $[ str_starwipe ] = function( url ) {
    var computedProp;

    // Let's find out if the browser supports star wipe!
    if ( supports_starwipe === undefined ) {
      computedProp = $('<div/>').css( prop, '1px' ).css( prop );
      supports_starwipe = (computedProp === '1px 1px') ||
        (computedProp === '1px');
    }
    
    if ( !supports_starwipe ) {
      // Browser doesn't support star wipe. :-(
      return false;
    }
    
    // Remove any existing IFRAME.
    $('.' + str_starwipe).stop().remove();
    
    var win = $(window),
      body = $('body'),
      
      interval_id,
      overflow,
      
      // This determines the maximum mask size to animate the mask to.
      max = Math.max( win.width(), win.height() ) * 3.5,
      
      // Create the IFRAME!
      iframe = $('<iframe/>');
    
    // Setting the location.hash allows a back button press to cancel the
    // transition. If pressed, the location.hash will no longer be what we set
    // it to, so we know to cancel the transition and remove the iframe.
    loc.hash = hash;
    
    // If the user has aborted, cancel the transition and clean things up.
    function aborted() {
      if ( loc.hash !== hash ) {
        clearInterval( interval_id );
        iframe.stop().remove();
        overflow && body.css( 'overflow', overflow );
      }
    }
    
    // Actually test if the user pressed the back button.
    interval_id = setInterval( aborted, 100 );
    
    iframe
      
      // When IFRAME content loads, let's transition!
      .load(function(){
        // Save the body "overflow" property in case the user aborts.
        overflow = body.css( 'overflow' );
        body.css( 'overflow', 'hidden' );
        
        iframe
          .show()
          .animate({
            '-webkit-mask-size': max + 'px'
          }, 2000, function(){
            loc.replace( url );
          });
      })
      
      // IFRAME initial properties.
      .hide()
      .attr({
        'class': str_starwipe,
        id: str_starwipe + '-' + (+new Date),
        frameborder: 0,
        src: url
      })
      .css({
        position: 'fixed',
        zIndex: '99999',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        width: '100%',
        height: '100%',
        border: 'none',
        background: '#fff',
        
        // This is where the magic happens.
        '-webkit-mask-image': 'url(' + mask + ')',
        '-webkit-mask-repeat': 'no-repeat',
        '-webkit-mask-position': '50% 50%',
        '-webkit-mask-size': '0px'
      })
      .appendTo('body');
    
    return true;
  };
  
  // Method: jQuery.fn.starwipe
  //
  // Add an astounding star wipe page-load transition to the click event on one
  // or more elements, optionally specifying a URL to navigate to (note: only
  // works in the latest WebKit browsers).
  //
  // Usage:
  //
  // > jQuery('selector').starwipe( [ url ] );
  //
  // Arguments:
  //
  //  url - (String) Optional URL to navigate to on click. If url is not
  //    specified, the value set in the `href` attribute is used.
  //
  // Returns:
  //
  //  (jQuery) The initial jQuery collection of elements.
  
  $.fn[ str_starwipe ] = function( url ) {
    
    return this.unbind( str_click ).bind( str_click, function() {

      // Let the good times roll! Prevent the default browser action if necessary.
      return !$[ str_starwipe ]( url || this.href );

    });
  };

  // The mask image. You guessed it, it's a star.
  mask = 'data:image/png;base64,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';

})(jQuery, this);
