describe('Custom Select Menu', function() {

  beforeEach(function() {
    loadFixtures('select-menu.html');
    $('select').customSelectMenu();
  });

  it('hides the original select element', function() {
    expect( $('select') ).toBeHidden();
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

    it('gets a class of selection made when an option is selected', function() {
      var listItem = $('.custom-select-menu li[data-option-value="red"]');
      listItem.click();
      var labelClass = $('.custom-select-menu label').attr( 'class' );
      console.log( labelClass );
      expect( labelClass ).toContain( 'selection-made' );
    });

  });

  // UNORDERED LIST
  describe('Unordered list', function() {

    /*it('has the same number of items as original options', function() {
      var originalOptions = $('select option').length,
          newListItems = $('.custom-select-menu li').length;

      expect( newListItems ).toEqual( originalOptions );
    });*/

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

  // LIST ITEMS
  describe('List items', function() {

    it('gets a class of selected when clicked', function() {
      var listItem = $('.custom-select-menu li[data-option-value="red"]');
      listItem.click();

      expect( listItem.attr( 'class' ) ).toEqual( 'selected' );
    });

    it('pass data-option-value to the hidden input when clicked', function() {
      var listItem = $('.custom-select-menu li[data-option-value="red"]');
      listItem.click();
      var inputValue = $('input:hidden').val();

      expect( inputValue ).toEqual( listItem.attr( 'data-option-value' ) );
    });

  });

  /*
   * TODO:
   * Test that arrow keys select the li's
   * Test for selection on return/enter
   * Test that menu closes when selection is made
   */

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
    console.log( labelClass );
    expect( labelClass ).toContain( 'has-been-selected' );
  });
});