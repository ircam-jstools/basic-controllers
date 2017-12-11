# Basic Controllers

> Set of simple controllers for rapid prototyping

![examples](https://cdn.rawgit.com/ircam-jstools/basic-controllers/master/tmpl/examples.png)

## Install

```
npm install [--save] @ircam/basic-controllers
```

## Examples

> [components](https://cdn.rawgit.com/ircam-jstools/basic-controllers/master/examples/components/index.html)  
> [factory](https://cdn.rawgit.com/ircam-jstools/basic-controllers/master/examples/factory/index.html)

## Available components

- DragAndDrop
- Group
- NumberBox
- SelectButtons
- SelectList
- Slider
- Text
- Title
- Toggle
- TriggerButtons

## Usage

Controllers can be instanciated individually:

```js
import * as controllers from '@ircam/basic-controllers';

// instanciate individual components
const slider = new controllers.Slider({
  label: 'My Slider',
  min: 20,
  max: 1000,
  step: 1,
  default: 537,
  unit: 'Hz',
  size: 'large',
  container: '#container',
  callback: (value) => console.log(value),
});
```

Or through a factory using a `json` definition:

```js
import * as controllers from '@ircam/basic-controllers';

const definitions = [
  {
    id: 'my-slider',
    type: 'slider',
    label: 'My Slider',
    size: 'large',
    min: 0,
    max: 1000,
    step: 1,
    default: 253,
  }, {
    id: 'my-group',
    type: 'group',
    label: 'Group',
    default: 'opened',
    elements: [
      {
        id: 'my-number',
        type: 'number-box',
        default: 0.4,
        min: -1,
        max: 1,
        step: 0.01,
      }
    ],
  }
];

const controls = controllers.create('#container', definitions);
controls.addListener((id, value) => console.log(id, value));
```

## API

<a name="module_basic-controllers"></a>

## basic-controllers

* [basic-controllers](#module_basic-controllers)
    * [.create(container, definitions)](#module_basic-controllers.create) ⇒ <code>Object</code>
    * [.disableStyles()](#module_basic-controllers.disableStyles)

<a name="module_basic-controllers.create"></a>

### basic-controllers.create(container, definitions) ⇒ <code>Object</code>
Create a whole control surface from a json definition.

**Kind**: static method of [<code>basic-controllers</code>](#module_basic-controllers)  
**Returns**: <code>Object</code> - - A `Control` instance that behaves like a group without graphic.  

| Param | Type | Description |
| --- | --- | --- |
| container | <code>String</code> \| <code>Element</code> | Container of the controls. |
| definitions | <code>Object</code> | Definitions for the controls. |

**Example**  
```js
import * as controllers from 'basic-controllers';

const definitions = [
  {
    id: 'my-slider',
    type: 'slider',
    label: 'My Slider',
    size: 'large',
    min: 0,
    max: 1000,
    step: 1,
    default: 253,
  }, {
    id: 'my-group',
    type: 'group',
    label: 'Group',
    default: 'opened',
    elements: [
      {
        id: 'my-number',
        type: 'number-box',
        default: 0.4,
        min: -1,
        max: 1,
        step: 0.01,
      }
    ],
  }
];

const controls = controllers.create('#container', definitions);

// add a listener on all the component inside `my-group`
controls.addListener('my-group', (id, value) => console.log(id, value));

// retrieve the instance of `my-number`
const myNumber = controls.getComponent('my-group/my-number');
```
<a name="module_basic-controllers.disableStyles"></a>

### basic-controllers.disableStyles()
Disable default styling (expect a broken ui)

**Kind**: static method of [<code>basic-controllers</code>](#module_basic-controllers)  


## License

BSD-3-Clause

