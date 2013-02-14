describe('Custom Select Menu', function () {

  it('hides the original select element', function () {
    var originalSelect = $('select');
    originalSelect.customSelectMenu();
    expect(originalSelect).toBeHidden();
  });

});