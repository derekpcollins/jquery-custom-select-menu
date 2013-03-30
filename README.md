# Custom Select Menu jQuery Plugin

A jQuery Plugin that allows you to create custom select menus. To see the custom menu in action, check out the [demo](http://derekpcollins.com/jquery-custom-select-menu/).

## Usage

First, download and include `custom-select-menu.jquery.js` (or the minified version) in your HTML document:

```html
<script src="/path/to/custom-select-menu.jquery.js"></script>
```

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

## Options

The following are user-configurable options:

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Default value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>menuClass</td>
      <td>custom-select-menu</td>
      <td>The class name for the custom select menu div</td>
    </tr>
    <tr>
      <td>openedClass</td>
      <td>opened</td>
      <td>The class given to the label when the menu is visible</td>
    </tr>
    <tr>
      <td>selectedClassh</td>
      <td>selected</td>
      <td>The class given to the list item when an option has been selected</td>
    </tr>
    <tr>
      <td>selectionMadeClass</td>
      <td>selection-made></td>
      <td>The class given to the label when an option has been selected</td>
    </tr>
  </tbody>
</table>

## Requirements and Compatibility

Please note that this plugin requires jQuery version **1.8** or later.

## License

This work is licensed under a [Creative Commons Attribution-ShareAlike 3.0 Unported License](http://creativecommons.org/licenses/by-sa/3.0/).