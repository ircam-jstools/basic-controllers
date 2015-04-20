# WAVESJS - BasicControllers

A set of basic controllers for rapid prototyping

### slider

```js
const { Slider } = require('waves-basic-controllers');
const $container = document.querySelector('#container');

const slider = new wavesBasicControllers.Slider(label, min, max, step, defaultValue, unit);
$container.appendChild(slider.render());

slider.on('change', (value) => {
  // ...do stuff
});
```

### buttons

```js
const { Slider } = require('waves-basic-controllers');
const $container = document.querySelector('#container');

const buttons = new wavesBasicControllers.Buttons(label, [...ids]);
$container.appendChild(buttons.render());

buttons.on('click', (id) => {
  switch (id) {
    // ...do stuff
  }
});
