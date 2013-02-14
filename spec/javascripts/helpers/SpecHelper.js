beforeEach(function() {
  
  // Create a select element
  $('<select name="select-menu-1"></select>').appendTo('body');
  $('<option>Choose one...</option>').appendTo('select');
  for (var i=1; i < 4; i++) {
    $('<option value="' + i + '">' + i + '</option>').appendTo('select');
  };

  // Initialize the plugin
  $('select').customSelectMenu();

});

afterEach(function () {

  $('select').remove();
  $('.custom-select-menu').remove();

});