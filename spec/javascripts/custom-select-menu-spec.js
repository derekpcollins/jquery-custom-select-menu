describe('Custom Select Menu', function() {

  beforeEach(function() {
    loadFixtures('select-menu.html');
    $('select').customSelectMenu();
  });

  it('hides the original select element', function() {
    expect( $('select') ).toBeHidden();
  });

  it('removes the id from the original select element', function() {
    expect( $('select') ).not.toHaveAttr( 'id' );
  });

  it('creates a div to contain the custom menu', function() {
    expect( $('div.custom-select-menu') ).toExist();
  });

  it('creates a hidden input', function() {
    expect( $('input:hidden') ).toExist();
  });

  it('creates a label', function() {
    expect( $('.custom-select-menu label') ).toExist();
  });

  it('creates an unordered list', function() {
    expect( $('.custom-select-menu ul') ).toExist();
  });

  // CONTAINER DIV
  describe('Container div', function() {

    it('has a tabindex of 0', function() {
      expect( $('div.custom-select-menu') ).toHaveAttr( 'tabindex', 0 );
    });

    it('is given the id from the original menu', function() {
      var originalMenuId = $('select').attr( 'id' );
      expect( $('div.custom-select-menu') ).toHaveAttr( 'id', originalMenuId );
    });

  });

  // LABEL
  describe('Label', function() {

    it('text is set to the first option if no option is selected', function() {
      var selectedOption  = $('select option:selected').text(),
          firstOptionText = $('select option:first').text(),
          newLabelText    = $('.custom-select-menu label').text();

      if( !selectedOption ) {
        expect( newLabelText ).toEqual( firstOptionText );
      } else {
        expect( newLabelText ).toEqual( selectedOption );
      }
    });

    it('gets a class of opened on click', function() {
      $('.custom-select-menu label').click();
      var labelClass = $('.custom-select-menu label').attr( 'class' );
      expect( labelClass ).toContain( 'opened' );
    });

    it('has class of opened removed on second click', function() {
      // First click adds class
      $('.custom-select-menu label').click();
      var labelClass = $('.custom-select-menu label').attr( 'class' );
      expect( labelClass ).toContain( 'opened' );
      // Second click removes class
      $('.custom-select-menu label').click();
      var labelClass = $('.custom-select-menu label').attr( 'class' );
      expect( labelClass ).toContain( '' );
    });

    it('gets a class of selection made when an option is selected', function() {
      var listItem = $('.custom-select-menu li[data-option-value="red"]');
      listItem.click();
      var labelClass = $('.custom-select-menu label').attr( 'class' );
      expect( labelClass ).toContain( 'selection-made' );
    });

  });

  // UNORDERED LIST
  describe('Unordered list', function() {

    it('has items with the same text as the original options', function() {
      var listItemTexts = [],
          optionTexts = [];
      
      $('.custom-select-menu li').each( function() {
        listItemTexts.push( $(this).text() );
      });

      $('select option').each( function() {
        optionTexts.push( $(this).text() );
      });

      expect( $(listItemTexts).not(optionTexts).length ).toEqual( 0 );
      expect( $(optionTexts).not(listItemTexts).length ).toEqual( 0 );
    });

    it('has items with the same data-option-values as the original option values', function() {
      var listItemVals = [],
          optionVals = [];
      
      $('.custom-select-menu li').each( function() {
        var dataOptionValue = $(this).attr( 'data-option-value' );
        if( dataOptionValue ) {
          listItemVals.push( dataOptionValue );
        }
      });

      $('select option').each( function() {
        var optionVal = $(this).attr( 'value' );
        if( optionVal ) {
          optionVals.push( optionVal );
        }
      });

      expect( $(listItemVals).not( optionVals ).length ).toEqual( 0 );
      expect( $(optionVals).not( listItemVals ).length ).toEqual( 0 );
    });

    it('is hidden by default', function() {
      expect( $('.custom-select-menu ul') ).toBeHidden();
    });

    it('is shown on click', function() {
      $('.custom-select-menu label').click();
      expect( $('.custom-select-menu ul') ).toBeVisible();
    });

    it('is hidden on click if the menu is already being shown', function() {
      // First click opens it
      $('.custom-select-menu label').click();
      expect( $('.custom-select-menu ul') ).toBeVisible();
      // Second click closes it
      $('.custom-select-menu label').click();
      expect( $('.custom-select-menu ul') ).toBeHidden();
    });

    it('is hidden if there is a click outside the menu', function() {
      // Open the menu first
      $('.custom-select-menu label').click();
      expect( $('.custom-select-menu ul') ).toBeVisible();

      $('body').mousedown();
      expect( $('.custom-select-menu ul') ).toBeHidden();
    });

    it('is hidden if the esc key is pressed', function() {
      // Open the menu first
      $('.custom-select-menu label').click();
      expect( $('.custom-select-menu ul') ).toBeVisible();
      
      // Source: http://jsfiddle.net/wbkm8/3/
      var e = $.Event('keyup', {
        keyCode: 27
      });
    
      $('body').trigger(e);

      expect( $('.custom-select-menu ul') ).toBeHidden();
    });

    it('is hidden if the return/enter key is pressed', function() {
      // Open the menu first
      $('.custom-select-menu label').click();
      expect( $('.custom-select-menu ul') ).toBeVisible();

      // Simulate enter/return being pressed
      var e = $.Event('keyup', {
        keyCode: 13
      });

      $('.custom-select-menu').trigger(e);

      expect( $('.custom-select-menu ul') ).toBeHidden();
    });

    it('is hidden if the container loses focus', function() {
      // Open the menu first
      $('.custom-select-menu label').click();
      expect( $('.custom-select-menu ul') ).toBeVisible();

      $('.custom-select-menu').blur();
      expect( $('.custom-select-menu ul') ).toBeHidden();
    });

    it('is shown if the container has focus and the up arrow key is pressed', function() {
      $('.custom-select-menu').focus();
      expect( $('.custom-select-menu ul') ).toBeHidden();

      var e = $.Event('keyup', {
        keyCode: 38
      });
    
      $('.custom-select-menu').trigger(e);
      expect( $('.custom-select-menu ul') ).toBeVisible();
    });

    it('is shown if the container has focus and the down arrow key is pressed', function() {
      $('.custom-select-menu').focus();
      expect( $('.custom-select-menu ul') ).toBeHidden();

      var e = $.Event('keyup', {
        keyCode: 40
      });
    
      $('.custom-select-menu').trigger(e);
      expect( $('.custom-select-menu ul') ).toBeVisible();
    });

  });

  // LIST ITEM
  describe('List item', function() {

    it('gets a class of selected when clicked', function() {
      var listItem = $('.custom-select-menu li[data-option-value="red"]');
      listItem.click();

      expect( listItem ).toHaveClass( 'selected' );
    });

    it('gets a class of selected when enter/return is pressed', function() {
      // First simulate the down arrow being pressed to select the next option
      var originalSelectedItem = $('.custom-select-menu li.selected');
      var nextItem = originalSelectedItem.next();

      var e = $.Event('keyup', {
        keyCode: 40
      });
    
      $('.custom-select-menu').trigger(e);
      
      // Simulate enter/return being pressed
      var e2 = $.Event('keyup', {
        keyCode: 13
      });

      $('custom-select-menu').trigger(e2);

      expect( nextItem ).toHaveClass( 'selected' );
    });

    it('passes data-option-value to the hidden input when clicked', function() {
      var listItem = $('.custom-select-menu li[data-option-value="red"]');
      listItem.click();
      var inputValue = $('input:hidden').val();

      expect( inputValue ).toEqual( listItem.attr( 'data-option-value' ) );
    });

    it('passes data-option-value to the hidden input when enter/return is pressed', function() {
      // First simulate the down arrow being pressed to select the next option
      var originalSelectedItem = $('.custom-select-menu li.selected');
      var nextItem = originalSelectedItem.next();

      var e = $.Event('keyup', {
        keyCode: 40
      });
    
      $('.custom-select-menu').trigger(e);

      // Simulate enter/return being pressed
      var e2 = $.Event('keyup', {
        keyCode: 13
      });

      $('.custom-select-menu').trigger(e2);

      var inputValue = $('input:hidden').val();

      expect( inputValue ).toEqual( nextItem.attr( 'data-option-value' ) );
    });

    it('selects previous item when the up arrow key is pressed', function() {
      // In our test html, the first item is going to be selected, so for the purpose
      // of this test, let's select a different item:
      $('.custom-select-menu li.selected').removeClass( 'selected' );
      $('.custom-select-menu li[data-option-value="orange"]').addClass( 'selected' );
      
      var originalSelectedItem = $('.custom-select-menu li.selected'),
          prevItem             = originalSelectedItem.prev();

      var e = $.Event('keyup', {
        keyCode: 38
      });
    
      $('.custom-select-menu').trigger(e);
      expect( originalSelectedItem ).toHaveClass( '' );
      expect( prevItem ).toHaveClass( 'selected' );
      
    });

    it('selects next item when the down arrow key is pressed', function() {
      var originalSelectedItem = $('.custom-select-menu li.selected');
      var nextItem = originalSelectedItem.next();

      var e = $.Event('keyup', {
        keyCode: 40
      });
    
      $('.custom-select-menu').trigger(e);
      expect( originalSelectedItem ).toHaveClass( '' );
      expect( nextItem ).toHaveClass( 'selected' );
    });

    it('selects the last item when the up arrow is pressed and the first item is selected', function() {
      var originalSelectedItem = $('.custom-select-menu li.selected'),
          lastItem             = $('.custom-select-menu li').last();

      var e = $.Event('keyup', {
        keyCode: 38
      });

      $('.custom-select-menu').trigger(e);
      expect( originalSelectedItem ).toHaveClass( '' );
      expect( lastItem ).toHaveClass( 'selected' );
    });

    it('selects the first item when the down arrow is pressed and the last item is selected', function() {
      // Select the last item for this test
      $('.custom-select-menu li.selected').removeClass( 'selected' );
      $('.custom-select-menu li:last').addClass( 'selected' );

      var originalSelectedItem = $('.custom-select-menu li.selected'),
          firstItem            = $('.custom-select-menu li').first();

      var e = $.Event('keyup', {
        keyCode: 40
      });

      $('.custom-select-menu').trigger(e);
      expect( originalSelectedItem ).toHaveClass( '' );
      expect( firstItem ).toHaveClass( 'selected' );
    });

  });

});

describe('Custom Select Menu Options', function() {

  beforeEach(function() {
    loadFixtures('select-menu.html');
    $('select').customSelectMenu( {
      menuClass          : 'my-menu',
      openedClass        : 'shown',
      selectedClass      : 'active',
      selectionMadeClass : 'has-been-selected'
    } );
  });

  it('allows for an optional class name for the container div', function() {
    expect( $('div.my-menu') ).toExist();
  });

  it('allows for an optional class name for opened', function() {
    $('.my-menu label').click();
    expect( $('.my-menu label').attr('class') ).toEqual( 'shown' );
  });

  it('allows for an optional class name for selected', function() {
    var listItem = $('.my-menu li[data-option-value="red"]');
    listItem.click();

    expect( listItem.attr( 'class' ) ).toEqual( 'active' );
  });

  it('allows for an optional class name for selection-made', function() {
    var listItem = $('.my-menu li[data-option-value="red"]');
    listItem.click();
    var labelClass = $('.my-menu label').attr( 'class' );
    expect( labelClass ).toContain( 'has-been-selected' );
  });
});