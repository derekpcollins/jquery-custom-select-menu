(function( $ ) {

  $.fn.customSelectMenu = function( options ) {
  
    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
      customMenuClassName : 'custom-select-menu' /* The class name for the custom select menu div */
    }, options);

    // BUILD THE MENU
    return this.each(function() {

      var selectName     = $(this).attr( 'name' ), /* Get the name of the menu */
          selectTabindex = $(this).attr( 'tabindex' ), /* Get the tabindex of the menu */
          newOption      = '',
          labelText      = '',
          newLabel       = '';

      // Create a div to contain the custom menu...
      var newContainer = $( '<div class="' + settings.customMenuClassName + '"></div>' );

      // Set up the first selected option and create the label
      if( $(this).find( ':selected' ) ) {
        // Find the selected option if one exists...
        var selectedOption      = $(this).find( ':selected' ),
            labelText           = selectedOption.text(),
            selectedOptionValue = selectedOption.attr('value');
        
        // Create a label to show the selected option
        if( !selectedOptionValue ) {
          newLabel = $( '<label>' + labelText + '</label>' );

          // Create a hidden input field so we can keep track of which option they choose
          $(this).after( '<input type="hidden" name="' + selectName + '" value="" />' );
        } else {
          newLabel = $( '<label class="selection-made">' + labelText + '</label>' );

          // Create a hidden input field so we can keep track of which option they choose
          $(this).after( '<input type="hidden" name="' + selectName + '" value="' + selectedOptionValue + '" />' );
        }

      } else {
        // Otherwise just get the first option...
        // NOTE: Most browsers will set the first option as selected if no other option
        // is selected, but the behavior for this is inconsistent across browsers,
        // so we need this as a backup.
        // Source: http://www.w3.org/TR/html401/interact/forms.html#h-17.6.1
        labelText = $(this).find( ':first' ).text();
        newLabel = $( '<label>' + labelText + '</label>' );

        // Create a hidden input field so we can keep track of which option they choose
        $(this).after( '<input type="hidden" name="' + selectName + '" value="" />' );
      }

      // If a tabindex attribute exists on the select menu,
      // pass that to our container div
      if(selectTabindex) {
        // Add it to the div
        newContainer.attr( 'tabindex', selectTabindex );

        // Remove the tabindex from the original select menu
        $(this).removeAttr( 'tabindex' );
      }

      // Create a label to show the selected or first option...
      newLabel.click(function(){
        // Hide all other custom select menus
        $('.' + settings.customMenuClassName + ' ul').not( $(this).parent().find( 'ul' ) ).hide();
        $('.' + settings.customMenuClassName + ' .opened').not( $(this) ).removeClass( 'opened' );

        $(this).toggleClass( 'opened' );
        $(this).parent().find( 'ul' ).toggle();
      });

      // Append an unordered list to contain the custom menu options
      // The unordered list is hidden by default
      var newList = $( '<ul data-select-name="' + selectName + '">' );
      newList.hide();

      // Add the custom select menu container to the DOM after the original select menu
      $(this).after( newContainer.append( newLabel, newList ) );

      // Loop through all the options and create li's to append to the custom menu
      $(this).find( 'option' ).each(function(){
        optionName   = $(this).text();
        optionValue  = $(this).attr('value');
        markSelected = (optionName == labelText) ? ' class="selected"' : '';

        // Make sure we have a value before setting one on the newOption
        if(!optionValue) {
          newOption = $( '<li' + markSelected + '>' + optionName + '</li>' );
        } else {
          newOption = $( '<li data-option-value="' + optionValue + '"' + markSelected + '>' + optionName + '</li>' );
        }

        newOption.click(function(){
          // Set up some vars...
          var customMenuName    = $(this).parent().attr( 'data-select-name' ), /* Get the id of the menu */
              customOptionValue = $(this).attr( 'data-option-value' ), /* Get the option value */
              customOptionText  = $(this).text(), /* Get the option text (for the label) */
              hiddenInput       = $('input[name="' + customMenuName + '"]'); /* Get the hidden input */

          // Remove 'selected' class from currently selected option
          $(this).parent().find( '.selected' ).removeClass( 'selected' );

          // Add a class of 'selected' to the option
          $(this).addClass( 'selected' );

          // Pass the value to the hidden input
          hiddenInput.val( customOptionValue );
          //$('#input-' + customMenuName).val( customOptionValue );

          // Update the label
          $(this).parent().parent().find( 'label' ).text( customOptionText );

          // If the hidden input value isn't empty,
          // then give the label a class of selection-made
          if(hiddenInput.val() != '') {
            $(this).parent().parent().find( 'label' ).addClass( 'selection-made' );
          } else {
            $(this).parent().parent().find( 'label' ).removeClass( 'selection-made' );
          }

          // Close the menu
          $(this).parent().hide();

          // Toggle the opened class on the label
          $(this).parent().parent().find( 'label' ).toggleClass( 'opened' );
        });

        newList.append(newOption);
      });

      // Hide the original select menu
      $(this).hide();

      // Hide the menu if you click outside of it
      // Source: http://forum.jquery.com/topic/close-toggled-div-when-clicking-outside-of-it
      $('html').mousedown(function( event ) {
        var target = $(event.target);

        // NOTE: addBack() requires jQuery 1.8 and later
        // (you might be able to use andSelf() for < 1.8, but it has been deprecated)
        if ( !target.parents().addBack().is( '.' + settings.customMenuClassName + ' ul, .' + settings.customMenuClassName + ' label' ) ) {
          // Clicked outside
          $('.' + settings.customMenuClassName + ' label').removeClass( 'opened' );
          $('.' + settings.customMenuClassName + ' ul').hide();
        }
      });

    });

  };

})( jQuery );
