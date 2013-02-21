describe('Custom Select Menu', function () {

  beforeEach(function() {
    
    // Create a select element
    $('<select name="select-menu-1"></select>').appendTo('body');
    $('<option>Choose one...</option>').appendTo('select');
    for (var i=1; i < 4; i++) {
      $('<option value="' + i + '">' + i + '</option>').appendTo('select');
    };

    // Create another select element
    $('<select name="some[non-standard][id_here]"></select>').appendTo('body');
    $('<option>Choose one...</option>').appendTo('select');
    for (var i=5; i < 8; i++) {
      $('<option value="' + i + '">' + i + '</option>').appendTo('select');
    };

    // Initialize the plugin
    $('select').customSelectMenu();

  });

  afterEach(function () {

    $('select, .custom-select-menu, .foo-bar').remove();

  });

  describe('An input element', function() {

    it('is created', function () {
      var newInput = $('input');
      expect(newInput).toExist();
    });

    it('is hidden', function () {
      var hiddenInput = $('input');
      expect(hiddenInput).toBeHidden();
    });

    it('has the same name as the original select element', function () {
      var originalSelectName = $('select').attr('name'),
          hiddenInputName    = $('input:hidden').attr('name');

      expect(hiddenInputName).toEqual(originalSelectName);
    });

    it('has a value if an option is set to "selected"', function () {
      var hiddenInputValue = $('input:hidden').val(),
          originalSelectedOptionValue = $('option:selected').attr('value'),
          newSelectedOptionValue = $('li.selected').attr('data-option-value');

      if( originalSelectedOptionValue ) {
        expect(originalSelectedOptionValue).toEqual(newSelectedOptionValue);
        expect(hiddenInputValue).toEqual(newSelectedOptionValue);
      }
    });

    it('does not have a value if an option is not set to "selected"', function () {
      var hiddenInputValue = $('input:hidden').val(),
          originalSelectedOptionValue = $('option:selected').attr('value'),
          newSelectedOptionValue = $('li.selected').attr('data-option-value');

      if( !originalSelectedOptionValue ) {
        expect(originalSelectedOptionValue).toEqual(undefined);
        expect(hiddenInputValue).toEqual('');
      }
    });

  });

  describe('A wrapper div', function () {

    it('is created', function () {
      var wrapperDiv = $('div');
      expect(wrapperDiv).toExist();
    });

    it('has a default class name of custom-select-menu', function() {
      var wrapperDiv = $('div.custom-select-menu');
      expect(wrapperDiv).toExist();
    });

    it('can accept an optional class name', function() {
      $('select').customSelectMenu({
        customMenuClassName : 'foo-bar'
      });

      var wrapperDiv = $('div.foo-bar');
      expect(wrapperDiv).toExist();
    });

  });

  describe('A label', function () {

    it('is created', function () {
      var newLabel = $('label');
      expect(newLabel).toExist();
    });

    it('text is the same as the first option', function () {
      var firstOption = $('select').find(':first').text(),
          labelText   = $('div.custom-select-menu label').text();

      expect(labelText).toEqual(firstOption);
    });

  });

  describe('An unordered list', function () {

    it('is created', function () {
      var newList = $('div.custom-select-menu ul');
      expect(newList).toExist();
    });

  })

  it('hides the original select element', function () {
    expect($('select')).toBeHidden();
  });

});