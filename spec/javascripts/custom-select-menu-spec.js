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
      expect( labelClass ).toEqual( 'opened' );
    });

  });

  it('creates an unordered list', function() {
    expect( $('.custom-select-menu ul') ).toExist();
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

});