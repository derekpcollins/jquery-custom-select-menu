describe('Custom Select Menu', function () {

  it('hides the original select element', function () {
    expect($('select')).toBeHidden();
  });

  it('creates a hidden input', function () {
    var hiddenInput = $('input:hidden');
    expect(hiddenInput).toExist();
  });

  it('creates a wrapper div', function () {
    var wrapperDiv = $('div');
    expect(wrapperDiv).toExist();
  });

});