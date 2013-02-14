describe('Custom Select Menu', function () {

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