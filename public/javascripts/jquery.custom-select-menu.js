(function( $ ) {

  $.fn.customSelectMenu = function( options ) {
  
    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
      customMenuClassName : 'custom-select-menu' /* The class name for the custom select menu div */
    }, options);

    return this.each(function() {

      var selectName     = $(this).attr( 'name' ), /* Get the name of the menu */
          newOption      = '',
          labelText      = '',
          newLabel       = '';

      // Hide the original select menu
      $(this).hide();

      // Create a div to contain the custom menu...
      var newContainer = $( '<div class="' + settings.customMenuClassName + '">' );

      // Give the container div a tabindex of 0 so that it can have focus
      // (arrow key navigation, etc. won't work without this)
      // Source: http://snook.ca/archives/accessibility_and_usability/elements_focusable_with_tabindex
      newContainer.attr( 'tabindex', 0 );

      // Remove the tabindex from the original select menu
      // NOTE: This may not be necessary
      $(this).removeAttr( 'tabindex' );

      // Create a hidden input field so we can keep track of which option they choose
      var newHiddenInput = $( '<input type="hidden" name="' + selectName + '" value="" />' );

      // Add it to the DOM
      $(this).after(newHiddenInput);

      // Set up the first selected option and create the label
      if( $(this).find( ':selected' ) ) {
        // Find the selected option if one exists...
        var selectedOption      = $(this).find( ':selected' ),
            labelText           = selectedOption.text(),
            selectedOptionValue = selectedOption.attr('value');
        
        // Create a label to show the selected option
        if( !selectedOptionValue ) {
          newLabel = $( '<label>' + labelText + '</label>' );
        } else {
          newLabel = $( '<label class="selection-made">' + labelText + '</label>' );
          
          // Add the selected option value to the hidden input
          newHiddenInput.val( selectedOptionValue );
        }

      } else {
        // Otherwise just get the first option...
        // NOTE: Most browsers will set the first option as selected if no other option
        // is selected, but the behavior for this is inconsistent across browsers,
        // so we need this as a backup.
        // Source: http://www.w3.org/TR/html401/interact/forms.html#h-17.6.1
        labelText = $(this).find( ':first' ).text();
        newLabel = $( '<label>' + labelText + '</label>' );
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
      var newList = $( '<ul data-select-name="' + selectName + '">' );

      // The unordered list is hidden by default
      newList.hide();

      // Add the custom select menu container to the DOM after the original select menu
      $(this).after( newContainer.append( newLabel, newList ) );

      // Loop through all the options and create li's to append to the custom menu
      $(this).find( 'option' ).each(function(){
        optionName   = $(this).text();
        optionValue  = $(this).attr('value');
        markSelected = (optionName == labelText) ? ' class="selected"' : '';

        // Make sure we have a value before setting one on the newOption
        if( !optionValue ) {
          newOption = $( '<li' + markSelected + '>' + optionName + '</li>' );
        } else {
          newOption = $( '<li data-option-value="' + optionValue + '"' + markSelected + '>' + optionName + '</li>' );
        }

        newOption.click(function(){
          updateMenu( $(this) );
        });

        newList.append(newOption);
      });

      // Use arrows keys to navigation the menu
      newContainer.keyup(function( e ) {
        // Arrows keys open the menu
        if( e.keyCode == 38 || e.keyCode == 40 ) {
          $(this).find(newLabel).addClass( 'opened' );
          $(this).find(newList).show();
        }

        var li = $(this).find('li'),
            selectedLi = $(this).find('.selected'),
            selectedLiText = selectedLi.text(),
            nextLi = '',
            prevLi = '';

        if( e.keyCode == 40 ) {
          selectedLi.removeClass('selected');
          nextLi = selectedLi.next();
          if( nextLi.length > 0 ) {
            nextLi.addClass('selected');
          } else {
            li.first().addClass('selected');
          }
        }

        if( e.keyCode == 38 ) {
          selectedLi.removeClass('selected');
          prevLi = selectedLi.prev();
          if( prevLi.length > 0 ) {
            prevLi.addClass('selected');
          } else {
            li.last().addClass('selected');
          }
        }

        // Pressing return/enter updates and closes the menu
        if( e.keyCode == 13 ) {
          updateMenu( $(this).find('.selected') );
        }
      });

      // Pressing esc closes the menu
      $('html').keyup(function( e ) {
        if( e.keyCode == 27 ) {
          newLabel.removeClass( 'opened' );
          newList.hide();
        }
      });

      // If the container div loses focus and the menu is visible, close it
      newContainer.blur( function() {
        if( $(this).find(newList).is(':visible') ) {
          $(this).find(newLabel).removeClass( 'opened' );
          $(this).find(newList).hide();
        }
      });

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

    function updateMenu( selection ) {
      // Whenever you click on a menu item or press return/enter, we need to update a few things...
      // Set up some vars...
      var customMenuName    = selection.parent().attr( 'data-select-name' ), /* Get the id of the menu */
          customOptionValue = selection.attr( 'data-option-value' ), /* Get the option value */
          customOptionText  = selection.text(), /* Get the option text (for the label) */
          hiddenInput       = $('input[name="' + customMenuName + '"]'); /* Get the hidden input */

      // Remove 'selected' class from currently selected option
      selection.parent().find( '.selected' ).removeClass( 'selected' );

      // Add a class of 'selected' to the option
      selection.addClass( 'selected' );

      // Pass the value to the hidden input
      hiddenInput.val( customOptionValue );
      //$('#input-' + customMenuName).val( customOptionValue );

      // Update the label
      selection.parent().parent().find( 'label' ).text( customOptionText );

      // If the hidden input value isn't empty,
      // then give the label a class of selection-made
      if(hiddenInput.val() != '') {
        selection.parent().parent().find( 'label' ).addClass( 'selection-made' );
      } else {
        selection.parent().parent().find( 'label' ).removeClass( 'selection-made' );
      }

      // Close the menu
      selection.parent().hide();

      // Toggle the opened class on the label
      selection.parent().parent().find( 'label' ).toggleClass( 'opened' );
    }

  };

})( jQuery );
