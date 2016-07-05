'use strict';

var pxToSwitchAppAt = 900; // pixels to change app to vertical
var shiftedClass = 'shift';
var shiftedLeftClass = 'shift-left';
var shiftedRightClass = 'shift-right';

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

/**
 * Anonymous function fired on load to get browser width
 * Then offers up relevant functions based on width
 */
(function () {

  var startTrackOne    = '#track-one-start'; // assign trigger to var
  var startTrackTwo    = '#track-two-start'; // assign trigger to var
  var resetTransforms  = '#reset'; // assign reset trigger

  /**
   * Desktop
   */
  if ( browserWidth() > pxToSwitchAppAt ) {

    $(document).ready(function(){

      /**
       * Start track one.
       */
      $(startTrackOne).click(function(){

        $('#main').css({

          'transform': 'translateX(71%)' // Shift <#main> right

        }).addClass(shiftedLeftClass + ' ' + shiftedClass);

      });

      /**
       * Start track two
       */
      $(startTrackTwo).click(function(){

        $('#main').css({

          'transform': 'translateX(-71%)' // Shift <#main> left

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

            'transform': 'translateX(116.5%)'

          });

        } else {

          $('#main').css({

            'transform': 'translateX(-116.5%)'

          });

        }

      });

    });
  
  /**
   * Tablet(ish) / Mobile
   */
  } else {

    $(document).ready(function(){

      // Disable scrolling
      $(window).scroll(function(e){
        e.preventDefault();
      })

      /**
       * Start track one.
       */
      $(startTrackOne).click(function(){

        $('#main').css({

          'transform': 'translateY(100%)' // Shift <body> down

        });

      });

      /**
       * Start track two
       */
      $(startTrackTwo).click(function(){

        $('#main').css({

          'transform': 'translateY(-100%)' // Shift <body> up

        });

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

    });

  }

  /**
   * On window resize, if it breaks through our breakpoint, reset the app
   */
  $(window).resize(function(){
    $('#main').css({
      'transform': 'translate(0, 0)'
    }).removeClass(shiftedLeftClass + ' ' + shiftedRightClass + ' ' + shiftedClass);
  })

})()