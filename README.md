# WAVESJS - BasicControllers

A set of basic controllers for rapid prototyping

### Slider

```js
const { Slider } = require('waves-basic-controllers');
const $container = document.querySelector('#container');

const slider = new Slider(legend, min, max, step, defaultValue, unit, size);
$container.appendChild(slider.render());

slider.on('change', (value) => {
  // ...do stuff
});

// ... or simply

new Slider(legend, min, max, step, defaultValue, unit, size, $container, () => {
  //do stuff
});
```

_`size` can be 'large' or 'default'_

### Buttons

```js
const { Buttons } = require('waves-basic-controllers');
const $container  = document.querySelector('#container');

const buttons = new Buttons(legend, [...ids]);
$container.appendChild(buttons.render());

buttons.on('change', (id) => {
  switch (id) {
    // ...do stuff
  }
});

// ... or simply

new Buttons(legend, [...ids], $container, (id) => {
  switch (id) {
    // ...do stuff
  }
})
```

### Toggle

```js
const { Toggle } = require('waves-basic-controllers');
const $container  = document.querySelector('#container');

const toggle = new Toggle(legend, defaultState);
$container.appendChild(toggle.render());

toggle.on('change', function(active) {
  // ...do stuff
});

// ... or simply

new Toggle(legend, defaultValue, $container, () => {
  // ...do stuff
});
```


_`$container` can be a DOMElement or a css selector_
