(function( $ ) {

  var methods = {
    init : function( options ) {

      // Create some defaults, extending them with any options that were provided
      var settings = $.extend( {
        customMenuClassName : 'custom-select-menu' // The class name for the custom select menu div
      }, options);

      return this.each(function(){
        var selectName = $(this).attr( 'name' ), // Get the name of the menu
            newOption,
            createLabel; 

        // Set up the first selected option
        if ( $(this).find( ':selected' ) ) {
          // If there is an option that has specifically been selected...
          createLabel = $(this).find( ':selected' ).text();
        } else {
          // Otherwise just get the first option...
          createLabel = $(this).find( ':first' ).text();
        }

        // Create a hidden input field so we can keep track of which option they choose
        $(this).after( '<input type="hidden" name="' + selectName + '" id="input-' + selectName + '" value="" />' );

        // Create a div to contain the custom menu...
        var newContainer = $( '<div class="' + settings.customMenuClassName + '"></div>' );

        // Create a label to show the selected or first option...
        var newLabel = $( '<label>' + createLabel + '</label>' );

        // Append an unordered list to contain the custom menu options
        // The unordered list is hidden by default
        var newList = $( '<ul data-select-name="' + selectName + '" style="display: none;">' );

        // Add the custom select menu container to the DOM after the original select menu
        $(this).after( newContainer.append( newLabel, newList ) );

        // Loop through all the options and create li's to append to the custom menu
        $(this).find( 'option' ).each(function(){
          optionName = $(this).text();
          optionValue = $(this).val();
          markSelected = ( optionName == createLabel ) ? ' class="selected"' : '';
          newOption += '<li data-option-value="' + optionValue + '"' + markSelected + '>' + optionName + '</li>';
        });

        // Append the li's to the custom menu ul
        $('.' + settings.customMenuClassName + ' ul').append(newOption);

        // Hide the original select menu
        $(this).hide();
      });

    },
    show : function( ) { 
      // ... 
    },
    hide : function( ) {
      // ... 
    },
    update : function( content ) { 
      // ...
    }
  };

  $.fn.customSelectMenu = function( method ) {
    
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.customSelectMenu' );
    }    
  
  };

})( jQuery );