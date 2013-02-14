beforeEach(function() {
  
  $('<select name="select-menu-1"></select>').appendTo('body');
  $('<option>Choose one...</option>').appendTo('select');
  for (var i=1; i < 4; i++) {
    $('<option value="' + i + '">' + i + '</option>').appendTo('select');
  };

});