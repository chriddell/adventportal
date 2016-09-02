'use strict';

var appBreakpoint = 900; // pixels to change app to vertical

var shiftedClass = 'shift';
var shiftedLeftClass = 'shift-left';
var shiftedRightClass = 'shift-right';
var globalHeader = '#global-header';

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
  var resetTransforms  = '.reset-app'; // assign reset trigger
  var flipToRightTrigger = '.choice-item__cta--flip-sides--to-right';
  var flipToLeftTrigger = '.choice-item__cta--flip-sides--to-left';

  /**
   * Horiztonal style
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
   * Vertical style
   */
  } else {

    $(document).ready(function(){

      var animateInClass = 'ani--float-in-down';
      var showActionsTrigger = '#show-ctas';
      var closeActionsTrigger = '#close-ctas';
      var shiftAppTrigger = '.title__helper'; // this is the element which moves the app backwards between states

      /**
       * Start track one.
       */
      $(startTrackOne).click(function(){

        $('#main').css({

          'transform': 'translateY(100%)' // Shift <body> down

        });

        // Add class to header (we're gonna change the bg color)
        $(globalHeader).addClass(shiftedClass);

        $('.title__helper')
          .removeClass('hidden')
          .addClass(animateInClass);

        $(shiftAppTrigger).addClass('nudge-one');

      });

      /**
       * Start track two
       */
      $(startTrackTwo).click(function(){

        $('#main').css({

          'transform': 'translateY(-100%)' // Shift <body> up

        });

        // Add class to header (we're gonna change the bg color)
        $(globalHeader).addClass(shiftedClass);

        $('.title__helper')
          .removeClass('hidden')
          .addClass(animateInClass); // Show title

        $(shiftAppTrigger).addClass('nudge-one');

      });

      /**
       * Reset to middle
       */
      $(resetTransforms).click(function(){

        $('#main').css({

          'transform': 'translateY(0)'

        });

        // Remove class from header (change bg color back)
        $(globalHeader).removeClass(shiftedClass);

        // Hide 'How can a portal'
        $('.title__helper')
          .removeClass(animateInClass)
          .addClass('hidden');

      });

      /**
       * Move app backwards through states
       *
       */
      $(document).on('click', '.nudge-two-down', function(){

        $('#main').css({

          'transform': 'translateY(100%)'

        });

        $(this)
          .removeClass('nudge-two-down')
          .addClass('nudge-one');

      });

      $(document).on('click', '.nudge-two-up', function(){

        $('#main').css({

          'transform': 'translateY(-100%)'

        });

        $(this)
          .removeClass('nudge-two-up')
          .addClass('nudge-one');

      });

      $(document).on('click', '.nudge-one', function(){

        $('#main').css({

          'transform': 'translateY(0)'

        });

        // Remove class from header (change bg color back)
        $(globalHeader).removeClass(shiftedClass);

        // Hide 'How can a portal'
        $('.title__helper')
          .removeClass(animateInClass, 'nudge-one')
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

          // Add/remove class from trigger so app knows how much to shift when clicked
          $(shiftAppTrigger)
            .addClass('nudge-two-down')
            .removeClass('nudge-one');

        } else {

          $('#main').css({

            'transform': 'translateY(-200%)'

          });

          // Add/remove class from trigger so app knows how much to shift when clicked
          $(shiftAppTrigger)
            .addClass('nudge-two-up')
            .removeClass('nudge-one');

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
        for (var i = otherButtonsArray.length - 1; i >= 0; i--) { // we minus 1 from oBA.length because .length does not account for element zero

          var newBottomPos = currentBottomPos + (heightOfButton * (otherButtonsArray.length - (i)));

          /*
          console.log('i = ' + i + '. ' + 'It\'s newBottomPos will be ' + newBottomPos);
          console.log('This was worked out with these figures.');
          console.log('currentBottomPos = ' + currentBottomPos);
          console.log('heightOfButton = ' + heightOfButton);
          console.log('otherButtonsArray.length = ' + otherButtonsArray.length);
          */

          $(otherButtonsArray[i]).css({
            'bottom': newBottomPos + 'px'
          });

        }

        /**
         * Hide content which is behind the action buttons
         */
        $(this)
          // Find content wrapper
          .siblings('.choice-item__wrapper')
          // animate opacity to 0
          .animate({
          'opacity': 0
        });

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

        /**
         * Show content which is behind the action buttons
         */
        $(this)
          // Find content wrapper
          .siblings('.choice-item__wrapper')
          // animate opacity to 0
          .animate({
          'opacity': 1
        });

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

        $('.title__helper')
          .removeClass('nudge-two-down')
          .addClass('nudge-one');

      });

      $(flipToLeftTrigger).click(function(){

        $('#main').css({

          'transform': 'translateY(100%)' // Go down

        });

         $('.title__helper')
          .removeClass('nudge-two-up')
          .addClass('nudge-one');

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

  $(window).on( "orientationchange", function() {
    showOverlay('#show-refresh-message');
  });

  // Add body class if iOS
  if( navigator.userAgent.match(/iP(hone|od|ad)/i) ) {
    $('body').addClass('ios');
  }

  //open/close primary navigation
  $('.cd-primary-nav-trigger, .close-trigger').on('click', function(){
    $('.cd-menu-icon').toggleClass('is-clicked'); 
    $('header').toggleClass('menu-is-open');
    
    //in firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
    if( $('.cd-primary-nav').hasClass('is-visible') ) {
      $('.cd-primary-nav').removeClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
        $('body').removeClass('overflow-hidden');
      });
    } else {
      $('.cd-primary-nav').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
        $('body').addClass('overflow-hidden');
      }); 
    }
  });

})();