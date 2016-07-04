'use strict';

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

$(document).ready(function(){

  var startTrackOne    = '#track-one-start'; // assign trigger to var
  var startTrackTwo    = '#track-two-start'; // assign trigger to var
  var resetTransforms  = '#reset'; // assign reset trigger

  /**
   * Start track one.
   */
  $(startTrackOne).click(function(){

    $('html').css({

      'transform': 'translateX(45.76%)' // Shift <body> right

    });

  });

  /**
   * Start track two
   */
  $(startTrackTwo).click(function(){

    $('html').css({

      'transform': 'translateX(-45.76%)' // Shift <body> left

    });

  });

  /**
   * Reset to middle
   */
  $(resetTransforms).click(function(){

    $('html').css({

      'transform': 'translateX(0)'

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

      $('html').css({

        'transform': 'translateX(91.52%)'

      });

    } else {

      $('html').css({

        'transform': 'translateX(-91.52%)'

      });

    }

  });

});