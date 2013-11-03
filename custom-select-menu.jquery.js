(function( $ ) {

  "use strict";
  $.fn.customSelectMenu = function( options ) {

    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
      menuClass : 'custom-select-menu', /* The class name for the custom select menu div */
      openedClass : 'opened', /* The class given to the label when the menu is visible */
      selectedClass : 'selected', /* The class given to the list item when an option has been selected */
      selectionMadeClass : 'selection-made' /* The class given to the label when an option has been selected */
    }, options);

    function updateMenu( selection ) {
      // Whenever you click on a menu item or press return/enter, we need to update a few things...
      // Set up some vars...
      var customMenuName = selection.parent().attr( 'data-select-name' ), /* Get the name of the menu */
          customOptionValue = selection.attr( 'data-option-value' ), /* Get the option value */
          customOptionText = selection.text(), /* Get the option text (for the label) */
          hiddenInput = $('input[name="' + customMenuName + '"]'); /* Get the hidden input */

      // Remove 'selected' class from currently selected option
      selection.parent().find( '.' + settings.selectedClass ).removeClass( settings.selectedClass );

      // Add a class of 'selected' to the option
      selection.addClass( settings.selectedClass );

      // Pass the value to the hidden input
      hiddenInput.val( customOptionValue );

      // Update the label
      selection.parent().parent().find( 'label' ).text( customOptionText );

      // If the hidden input value isn't empty give the label a class to show it was selected
      if(hiddenInput.val() !== '') {
        selection.parent().parent().find( 'label' ).addClass( settings.selectionMadeClass );
      } else {
        selection.parent().parent().find( 'label' ).removeClass( settings.selectionMadeClass );
      }

      // Close the menu
      selection.parent().hide();

      // Toggle the opened class on the label
      if( selection.parent().css('display') !== 'none' ) {
        selection.parent().parent().find( 'label' ).toggleClass( settings.openedClass );
      } else {
        selection.parent().parent().find( 'label' ).removeClass( settings.openedClass );
      }
      
    }

    return this.each(function() {

      var $this = $(this),
          selectName = $this.attr( 'name' ), /* Get the name of the original menu */
          selectId = $this.attr( 'id' ), /* Get the id of the original menu */
          newHiddenInput,
          newContainer,
          newLabel,
          labelText,
          newList,
          newOption,
          selectedOption,
          selectedOptionValue;
          

      // Hide the original select menu
      $this.hide();

      // Create a div to contain the custom menu.
      // Give the container div a tabindex of 0 so that it can have focus (arrow key navigation, etc. won't work without this)
      // Source: http://snook.ca/archives/accessibility_and_usability/elements_focusable_with_tabindex
      newContainer = $( '<div class="' + settings.menuClass + '">' ).attr( 'tabindex', 0 );

      // If the original select menu has an id, then give that id to the container div
      if( selectId ) {
        newContainer.attr( 'id', selectId );
        $this.removeAttr('id');
      }

      // Create a hidden input field so we can keep track of which option they choose
      newHiddenInput = $( '<input type="hidden" name="' + selectName + '" value="" />' );

      // Set up the first selected option and create the label
      if( $this.find( ':selected' ) ) {
        // Find the selected option if one exists...
        selectedOption = $this.find( ':selected' );
        selectedOptionValue = selectedOption.attr( 'value' );

        // Set the label text to the selected option text
        labelText = selectedOption.text();
        
        // Create a label to show the selected option
        if( !selectedOptionValue ) {
          newLabel = $( '<label>' + labelText + '</label>' );
        } else {
          newLabel = $( '<label class="' + settings.selectionMadeClass + '">' + labelText + '</label>' );
          
          // Add the selected option value to the hidden input
          newHiddenInput.val( selectedOptionValue );
        }

      } else {
        // Otherwise just get the first option...
        // NOTE: Most browsers will set the first option as selected if no other option
        // is selected, but the behavior for this is inconsistent across browsers,
        // so we need this as a backup.
        // Source: http://www.w3.org/TR/html401/interact/forms.html#h-17.6.1
        labelText = $this.find( ':first' ).text();
        newLabel = $( '<label>' + labelText + '</label>' );
      }

      // Append an unordered list to contain the custom menu options and hide it
      newList = $( '<ul data-select-name="' + selectName + '">' ).hide();

      // Add the custom select menu container to the DOM after the original select menu
      // and append the label, list and hidden input to it
      $this.after( newContainer.append( newLabel, newList, newHiddenInput ) );

      // Loop through all the options and create li's to append to the custom menu
      $this.find( 'option' ).each(function(){
        var optionName = $(this).text(),
            optionValue = $(this).attr( 'value' ),
            markSelected = (optionName === labelText) ? ' class="' + settings.selectedClass + '"' : '';

        // Make sure we have a value before setting one on the newOption
        if( !optionValue ) {
          newOption = $( '<li' + markSelected + '>' + optionName + '</li>' );
        } else {
          newOption = $( '<li data-option-value="' + optionValue + '"' + markSelected + '>' + optionName + '</li>' );
        }

        newList.append( newOption );
      });

      // Listen for click events on the custom select menu container
      newContainer.on( 'click', function( event ){
        var target = $(event.target);

        // When the label is clicked, toggle the menu
        if( target.is( 'label' ) ){
          newLabel.toggleClass( settings.openedClass );
          newLabel.parent().find( 'ul' ).toggle();
        }

        // When an option is clicked, update the menu with that option
        if( target.is( 'li' ) ){
          updateMenu( target );
        }
      });

      // Use arrows keys to navigation the menu
      newContainer.on( 'keyup', function( e ) {
        // Arrows keys open the menu
        if( e.keyCode === 38 || e.keyCode === 40 ) {
          $(this).find( newLabel ).addClass( settings.openedClass );
          $(this).find( newList ).show();
        }

        var li = $(this).find( 'li' ),
            selectedLi = $(this).find( '.' + settings.selectedClass ),
            nextLi = '',
            prevLi = '';

        if( e.keyCode === 40 ) {
          selectedLi.removeClass( settings.selectedClass );
          nextLi = selectedLi.next();
          if( nextLi.length > 0 ) {
            nextLi.addClass( settings.selectedClass );
          } else {
            li.first().addClass( settings.selectedClass );
          }
        }

        if( e.keyCode === 38 ) {
          selectedLi.removeClass( settings.selectedClass );
          prevLi = selectedLi.prev();
          if( prevLi.length > 0 ) {
            prevLi.addClass( settings.selectedClass );
          } else {
            li.last().addClass( settings.selectedClass );
          }
        }

        // Pressing return/enter updates and closes the menu
        if( e.keyCode === 13 ) {
          updateMenu( $(this).find( '.' + settings.selectedClass ) );
        }
      });

      // If the container div loses focus and the menu is visible, close it
      newContainer.on( 'blur', function() {
        if( $(this).find( newList ).is( ':visible' ) ) {
          $(this).find( newLabel ).removeClass( settings.openedClass );
          $(this).find( newList ).hide();
        }
      });

      // Pressing esc closes the menu
      $('html').on( 'keyup', function( e ) {
        if( e.keyCode === 27 ) {
          newLabel.removeClass( settings.openedClass );
          newList.hide();
        }
      });

      // Hide the menu if you click outside of it
      // Source: http://forum.jquery.com/topic/close-toggled-div-when-clicking-outside-of-it
      $('html').on( 'mousedown', function( event ) {
        var target = $(event.target);

        // NOTE: addBack() requires jQuery 1.8 and later
        // (you might be able to use andSelf() for < 1.8, but it has been deprecated)
        if ( !target.parents().addBack().is( '.' + settings.menuClass + ' ul, .' + settings.menuClass + ' label' ) ) {
          // Clicked outside
          $('.' + settings.menuClass + ' label').removeClass( settings.openedClass );
          $('.' + settings.menuClass + ' ul').hide();
        }
      });

    });

  };

})( jQuery );
