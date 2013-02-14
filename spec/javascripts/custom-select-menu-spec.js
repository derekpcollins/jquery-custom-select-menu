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

  });

  it('creates a wrapper div', function () {
    var wrapperDiv = $('div');
    expect(wrapperDiv).toExist();
  });

  it('hides the original select element', function () {
    expect($('select')).toBeHidden();
  });

});