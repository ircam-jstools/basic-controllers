# WAVESJS - BasicControllers

A set of basic controllers for rapid prototyping

## Documentation

### Themes

Two themes are available: `'light'` _(default)_ and `'dark'`.
The theme can be switched via the `setTheme` method of the namespace

```js
import * as basicControllers from 'waves-basic-controller';
basicControllers.setTheme('dark');
```

### Title

```js
import { Title } from 'waves-basic-controllers';
const $container  = document.querySelector('#container');

const title = new Title(legend);
$container.appendChild(title.render());

// ... or simply

new Title(legend, $container);
```

### Buttons

```js
import { Buttons } from 'waves-basic-controllers';
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
import { Toggle } from 'waves-basic-controllers';
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

### Slider

```js
import { Slider } from 'waves-basic-controllers';
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

_`size` can be 'large', 'medium' or 'small' ('medium' is the default value)_


### Conventions

- `$container` can be a `DOMElement` or a css selector

## Contributing

This module relies on `babel` and `browserify`, these modules should be installed globally.

```
sudo npm install -g babel
sudo npm install -g browserify
```

and linked into your development folder

```
npm link babel
npm link browserify
```







