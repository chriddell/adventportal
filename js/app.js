'use strict';

var appBreakpoint = 900; // pixels to change app to vertical

var shiftedClass = 'shift';
var shiftedLeftClass = 'shift-left';
var shiftedRightClass = 'shift-right';

var currentBrowserWidth; // set up global var to use in our resizestart and resizeend functions
var browserWiderThanAppBreakpoint; // same as above

/**
 * Calculate browser width
 *
 */
function browserWidth() {
  return $(window).width();
}

/**
 * Match elements based on data-question and data-answer attributes, 
 * Add/remove class depending on if there's a match or not
 */
function matchQuestionAnswer(e) {

  var answerToLookFor = $(e).data('question'); // get the data-question value
  var answerElement = $(e).parent().siblings('[data-answer="' + answerToLookFor + '"]'); // find the relevant answer
  
  answerElement.addClass('visible'); // Add visible class to target
  answerElement.siblings().removeClass('visible'); // Remove visible class from its mates

}

function showOverlay(clicked) {

  var whichOverlay = $(clicked).data('overlay'); // find out which overlay to show based on data-attr
  var target = $('body').find('.overlay[data-overlay="' + whichOverlay + '"]'); // find the relevant overlay
  target.removeClass('overlay--hidden'); // remove the hidden class

}

function closeOverlay(clicked) {

  $(clicked).parent('.overlay').addClass('overlay--hidden'); // find the parent, add a hidden class

}

/**
 * Debounced Resize() jQuery Plugin
 * by Paul Irish
 *
 * Basically, mods resize event to only fire on resize end
 */
(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 500);
      };
  }
  // resizeend 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'resizeend');

/**
 * Anonymous function fired on load to get browser width
 * Then offers up relevant functions based on width
 */
(function () {

  var startTrackOne    = '#track-one-start'; // assign trigger to var
  var startTrackTwo    = '#track-two-start'; // assign trigger to var
  var resetTransforms  = '#reset'; // assign reset trigger
  var flipToRightTrigger = '.choice-item__cta--flip-sides--to-right';
  var flipToLeftTrigger = '.choice-item__cta--flip-sides--to-left';

  /**
   * Desktop
   */
  if ( browserWidth() > appBreakpoint ) {

    $(document).ready(function(){

      /**
       * Start track one.
       */
      $(startTrackOne).click(function(){

        $('#main').css({

          'transform': 'translateX(71%)' // Go to left side

        }).addClass(shiftedLeftClass + ' ' + shiftedClass);

      });

      /**
       * Start track two
       */
      $(startTrackTwo).click(function(){

        $('#main').css({

          'transform': 'translateX(-71%)' //  Go to right side

        }).addClass(shiftedRightClass + ' ' + shiftedClass);

      });

      /**
       * Reset to middle
       */
      $(resetTransforms).click(function(){

        $('#main').css({

          'transform': 'translateX(0)'

        }).removeClass(shiftedLeftClass + ' ' + shiftedRightClass + ' ' + shiftedClass);

      });

      /**
       * Show answer
       */
      $('.step__menu__item').click(function(){

        // Match two elements based 
        matchQuestionAnswer(this);

        // Check which 'side' question is on, so we know which way to translate
        if ( $(this).data('question').indexOf('a') > -1 ) { 

          $('#main').css({

            'transform': 'translateX(116.5%)' // Go to left side

          });

        } else {

          $('#main').css({

            'transform': 'translateX(-116.5%)' // Go to right side

          });

        }

      });

      /**
       * Change sides from 'actions' button
       */
      $(flipToRightTrigger).click(function(){

        $('#main').css({

          'transform': 'translateX(-71%)' // Go to right side

        }).removeClass(shiftedLeftClass).addClass(shiftedRightClass + ' ' + shiftedClass);

      })

      $(flipToLeftTrigger).click(function(){

        $('#main').css({

          'transform': 'translateX(71%)' // Go to left side

        }).removeClass(shiftedRightClass).addClass(shiftedLeftClass + ' ' + shiftedClass);

      })

    });
  
  /**
   * Tablet(ish) / Mobile
   */
  } else {

    $(document).ready(function(){

      var animateInClass = 'ani--float-in-down';
      var showActionsTrigger = '#show-ctas';
      var closeActionsTrigger = '#close-ctas';

      /**
       * Start track one.
       */
      $(startTrackOne).click(function(){

        $('#main').css({

          'transform': 'translateY(100%)' // Shift <body> down

        });

        $('.title__helper')
          .removeClass('hidden')
          .addClass(animateInClass);

      });

      /**
       * Start track two
       */
      $(startTrackTwo).click(function(){

        $('#main').css({

          'transform': 'translateY(-100%)' // Shift <body> up

        });

        $('.title__helper')
          .removeClass('hidden')
          .addClass(animateInClass); // SHow title

      });

      /**
       * Reset to middle
       */
      $(resetTransforms).click(function(){

        $('#main').css({

          'transform': 'translateY(0)'

        });

      });

      /**
       * Reset to middle
       */
      $('.title__helper').click(function(){

        $('#main').css({

          'transform': 'translateY(0)'

        });

        $(this)
          .removeClass(animateInClass)
          .addClass('hidden');

      });

      /**
       * Show answer
       */
      $('.step__menu__item').click(function(){

        // Match two elements based 
        matchQuestionAnswer(this);

        // Check which 'side' question is on, so we know which way to translate
        if ( $(this).data('question').indexOf('a') > -1 ) { 

          $('#main').css({

            'transform': 'translateY(200%)'

          });

        } else {

          $('#main').css({

            'transform': 'translateY(-200%)'

          });

        }

      });

      /**
       * Show buttons
       */
      $(document).on('click', showActionsTrigger, function(){

        var otherButtonsArray = $(this).siblings('.choice-item__cta');
        var heightOfButton = 63.5; // height of button plus allow for margin
        var currentBottomPos = 30; // starting position of trigger

        // Loop through sibling elements and move them up (manipulate CSS 'bottom' val)
        for (var i = 0; i <= otherButtonsArray.length; i++) {

          var newBottomPos = currentBottomPos + (heightOfButton * (i + 1));

          $(otherButtonsArray[i]).css({
            'bottom': newBottomPos + 'px'
          });

        }

        // Now modify the trigger elem
        $(this)
          /*
           * Modify ID attr
           */
          .attr('id', closeActionsTrigger.replace('#', ''))
          .text('Close actions'); // Modify text
      });

      /**
       * Close buttons
       */
      $(document).on('click', closeActionsTrigger, function(){

        var otherButtonsArray = $(this).siblings('.choice-item__cta');

        // Loop through sibling elements and move them back to orig pos.
        for (var i = 0; i <= otherButtonsArray.length; i++) {

          $(otherButtonsArray[i]).css({
            'bottom': '20px'
          });

        }

        // Now modify the trigger elem
        $(this)
          /*
           * Modify ID attr
           */
          .attr('id', showActionsTrigger.replace('#', ''))
          .text('Show actions'); // Modify text

      });

      /**
       * Change sides from 'actions' buttons
       */
      $(flipToRightTrigger).click(function(){

        $('#main').css({

          'transform': 'translateY(-100%)' // Go up

        });

      });

      $(flipToLeftTrigger).click(function(){

        $('#main').css({

          'transform': 'translateY(100%)' // Go down

        });

      });

    });

  }

  /**
   * Overlays
   */
  $(document).on('click', '.overlay__open', function(){
    showOverlay(this);
  });

  $(document).on('click', '.overlay__close', function(){
    closeOverlay(this);
  })

  $(document).keyup(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode `27`
      closeOverlay('.overlay .overlay__close');
    }
  });

  $(window).resizestart(function() {

    // Grab width at start of resize
    currentBrowserWidth = browserWidth();

    // If current width is bigger than app breakpoint
    if (currentBrowserWidth > appBreakpoint) {

      // Set var true
      browserWiderThanAppBreakpoint = true;

    } else {

      // Set var false
      browserWiderThanAppBreakpoint = false;

    }
  });

  /**
   * On window resize (end) reset the app to center
   */
  $(window).resizeend(function(){

    // Set new var true/false depending by comparing new browser width with appBreakpoint
    var browserStillWiderThanAppBreakpoint = browserWidth() > appBreakpoint ? true : false;

    // If the browser was wider than the breakpoint originally
    if (browserWiderThanAppBreakpoint) {

      // And if the browser is still wider than our breakpoint
      if (browserStillWiderThanAppBreakpoint) {

        // Do nothing
        return;

      // Else it's gotten smaller
      } else {

        // So we do something about it
        showOverlay('#show-refresh-message');

      }

    // If it wasn't wider than our breakpoint, so basically do reverse of the above
    } else if (!browserWiderThanAppBreakpoint) {

      // Check whether it is still 'less wide' than our breakpoint
      if (!browserStillWiderThanAppBreakpoint) {

        // Do nothing
        return;
      
      } else {

        // So we do something about it
        showOverlay('#show-refresh-message');

      }

    }

  });

})()