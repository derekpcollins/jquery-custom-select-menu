# Custom Select Menu jQuery Plugin

A jQuery Plugin that allows you to create custom select menus.

## Overview

*Coming sooner or later*

## Usage

First, download and include `custom-select-menu.jquery.js` (or the minified version) in your HTML document.

Next, call the `customSelectMenu()` method on any select element in order to start customzing it. Note that you can pass the `customSelectMenu()` method an id, a class, or even just the `select` element itself.

```javascript
$('select').customSelectMenu();
```

This will take a regular select menu such as this:

```html
<select name="color-menu" id="my-color-menu">
  <option>Choose a color...</option>
  <option value="red">Red</option>
  <option value="green">Green</option>
  <option value="blue">Blue</option>
</select>
```

And turn it into this:

```html
<div class="custom-select-menu" tabindex="0" id="my-color-menu">
  <label>Choose a color...</label>
  <ul style="display: none;">
    <li data-option-value="" class="selected">Choose a color...</li>
    <li data-option-value="red">Red</li>
    <li data-option-value="green">Green</li>
    <li data-option-value="blue">Blue</li>
  </ul>
</div>
<input type="hidden" name="color-menu" value="" />
```

## Requirements and Compatibility

Please note that this plugin requires jQuery version >=1.8.0. 

## License

This work is licensed under a [Creative Commons Attribution-ShareAlike 3.0 Unported License](http://creativecommons.org/licenses/by-sa/3.0/).