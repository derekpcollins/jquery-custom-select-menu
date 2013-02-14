describe('custom-select-menu', function () {

  beforeEach( function () {
    $('<select name="select-menu-1"></select>').appendTo('body');
    for (var i=0; i < 10; i++) {
      $('<option>Choose one...</option>').append('<option value="one">One</option>').append('<option value="two">Two</option>').append('<option value="three">Three</option>').append('<td></td>').appendTo('select');
    };
  });

  beforeEach( function () {
    this.addMatchers({
      toBeHidden: function() {
        var isHidden = true;

        this.actual.find('select').each(function () {
          isHidden = $(this).is(':visible');
          if (!isHidden) {
            return;
          }
        });

        return isHidden;
      }
    });
  });

  afterEach(function () {
    $('select').remove();
  });

  it('should hide the original select', function () {
    var originalSelect = $('select');
    originalSelect.customSelectMenu();
    expect(originalSelect).toBeHidden();
  });

});