
(function( $ ) {

  $.fn.customSelectMenu = function( options ) {
  
    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
      customMenuClassName : 'custom-select-menu' // The class name for the custom select menu div
    }, options);

    // BUILD THE MENU
    this.each(function() {

      var selectName = $(this).attr('name'), /* Get the name of the menu */
          newOption = '',
          createLabel = '';

      // Create a hidden input field so we can keep track of which option they choose
      $(this).after('<input type="hidden" name="' + selectName + '" id="input-' + selectName + '" value="" />');

      // Create a div to contain the custom menu...
      var newContainer = $('<div class="' + settings.customMenuClassName + '"></div>');

      // Set up the first selected option
      if($(this).find(':selected')) {
        // If there is an option that has specifically been selected...
        createLabel = $(this).find(':selected').text();
      } else {
        // Otherwise just get the first option...
        createLabel = $(this).find(':first').text();
      }

      // Create a label to show the selected or first option...
      var newLabel = $('<label>' + createLabel + '</label>');

      // Append an unordered list to contain the custom menu options
      // The unordered list is hidden by default
      var newList = $('<ul data-select-name="' + selectName + '">').hide();

      // Add the custom select menu container to the DOM after the original select menu
      $(this).after(newContainer.append(newLabel, newList));

      // Loop through all the options and create li's to append to the custom menu
      $(this).find('option').each(function(){
        optionName = $(this).text();
        optionValue = $(this).val();
        markSelected = (optionName == createLabel) ? ' class="selected"' : '';
        newOption += '<li data-option-value="' + optionValue + '"' + markSelected + '>' + optionName + '</li>';
      });

      // Append the li's to the custom menu ul
      $('.' + settings.customMenuClassName + ' ul').append(newOption);

      // Hide the original select menu
      $(this).hide();

    });

    // CUSTOM MENU BEHAVIOR
    // Toggle the menu = open/close
    $('.' + settings.customMenuClassName + ' label').click(function(){
      $(this).toggleClass( 'opened' );
      $(this).parent().find( 'ul' ).toggle();
    });

    // Hide the menu if you click outside of it
    // Source: http://forum.jquery.com/topic/close-toggled-div-when-clicking-outside-of-it
    $('html').mousedown(function( event ) {

      var target = $(event.target);
      if ( !target.parents().andSelf().is( '.' + settings.customMenuClassName + ' ul, .' + settings.customMenuClassName + ' label' ) ) {
        // Clicked outside
        $('.' + settings.customMenuClassName + ' label').removeClass( 'opened' );
        $('.' + settings.customMenuClassName + ' ul').hide();
      }

    });

    // When they click on an li within thr custom menu...
    $('.' + settings.customMenuClassName + ' li').click(function(){
      
      // Set up some vars...
      var customMenuName    = $(this).parent().attr( 'data-select-name' ), // Get the id of the menu
          customOptionValue = $(this).attr( 'data-option-value' ), // Get the option value
          customOptionText  = $(this).text(); // Get the option text (for the label)

      // Remove 'selected' class from currently selected option
      $(this).parent().find( '.selected' ).removeClass( 'selected' );

      // Add a class of 'selected' to the option
      $(this).addClass( 'selected' );

      // Pass the value to the hidden input
      $('#input-' + customMenuName).val( customOptionValue );

      // Updated the label
      $(this).parent().parent().find( 'label' ).text( customOptionText );

      // Close the menu
      $(this).parent().hide();

      // Toggle the opened class on the label
      $(this).parent().parent().find( 'label' ).toggleClass( 'opened' );

    });

  };

})( jQuery );