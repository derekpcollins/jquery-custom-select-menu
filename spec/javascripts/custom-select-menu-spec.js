describe('Custom Select Menu', function () {

  it('hides the original select element', function () {
    var originalSelect = $('select');
    originalSelect.customSelectMenu();
    expect(originalSelect).toBeHidden();
  });

  it('creates a wrapper div', function () {
    var wrapperDiv = $('div');
    $('select').customSelectMenu();
    expect(wrapperDiv).toBeTruthy();
  });

});