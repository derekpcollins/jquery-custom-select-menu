# Custom Select Menu jQuery Plugin

A jQuery Plugin that allows you to create custom select menus.

## Overview

*Coming sooner or later*

## Usage

```javascript
$('select').customSelectMenu();
```

This will take a regular select menu such as this...

```html
<select name="color-menu">
  <option value="red">Red</option>
  <option value="green">Green</option>
  <option value="blue">Blue</option>
</select>
```

...and turn it into this...

```html
<div class="custom-select-menu" tabindex="0">
  <label class="selection-made">Red</label>
  <ul>
    <li data-option-value="red" class="selected">Red</li>
    <li data-option-value="green">Green</li>
    <li data-option-value="blue">Blue</li>
  </ul>
</div>
<input type="hidden" name="color-menu" value="red" />
```

## License

This work is licensed under a [Creative Commons Attribution-ShareAlike 3.0 Unported License](http://creativecommons.org/licenses/by-sa/3.0/).