# Basic Controllers

> Set of simple controllers for rapid prototyping

## Install

```
npm install [--save] ircam-jstools/basic-controllers
```

## Available Components

- Slider - [example](https://cdn.rawgit.com/ircam-jstools/gui-components/master/examples/slider/index.html)

## Usage

```js
import { Slider} from 'gui-components';

const slider = new Slider({
  mode: 'jump',
  container: '#container',
  default: 0.6,
  markers: [0.5],
  callback: (value) => console.log(value),
});
```

# API

<a name="module_basic-controllers"></a>

## basic-controllers

* [basic-controllers](#module_basic-controllers)
    * _static_
        * [.setTheme(theme)](#module_basic-controllers.setTheme)
        * [.disableStyles()](#module_basic-controllers.disableStyles)
    * _inner_
        * [~BaseController](#module_basic-controllers..BaseController)
            * [.addListener(callback)](#module_basic-controllers..BaseController+addListener)
            * [.removeListener(callback)](#module_basic-controllers..BaseController+removeListener)
        * [~Group](#module_basic-controllers..Group)
            * [new Group(options, legend)](#new_module_basic-controllers..Group_new)
            * [.state](#module_basic-controllers..Group+state) : <code>String</code>
        * [~NumberBox](#module_basic-controllers..NumberBox)
            * [new NumberBox(options)](#new_module_basic-controllers..NumberBox_new)
            * [.value](#module_basic-controllers..NumberBox+value) : <code>Number</code>


-

<a name="module_basic-controllers.setTheme"></a>

### basic-controllers.setTheme(theme)
Change the theme of the controllers, currently 3 themes are available:
 - 'light' (default)
 - 'grey'
 - 'dark'

**Kind**: static method of <code>[basic-controllers](#module_basic-controllers)</code>  

| Param | Type | Description |
| --- | --- | --- |
| theme | <code>String</code> | Name of the theme. |


-

<a name="module_basic-controllers.disableStyles"></a>

### basic-controllers.disableStyles()
Disable default styling (expect a broken ui)

**Kind**: static method of <code>[basic-controllers](#module_basic-controllers)</code>  

-

<a name="module_basic-controllers..BaseController"></a>

### basic-controllers~BaseController
Base class to create new controllers

**Kind**: inner class of <code>[basic-controllers](#module_basic-controllers)</code>  

* [~BaseController](#module_basic-controllers..BaseController)
    * [.addListener(callback)](#module_basic-controllers..BaseController+addListener)
    * [.removeListener(callback)](#module_basic-controllers..BaseController+removeListener)


-

<a name="module_basic-controllers..BaseController+addListener"></a>

#### baseController.addListener(callback)
Add a listener to the controller.

**Kind**: instance method of <code>[BaseController](#module_basic-controllers..BaseController)</code>  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Function to be applied when the controller  state change. |


-

<a name="module_basic-controllers..BaseController+removeListener"></a>

#### baseController.removeListener(callback)
Remove a listener from the controller.

**Kind**: instance method of <code>[BaseController](#module_basic-controllers..BaseController)</code>  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Function to remove from the listeners. |


-

<a name="module_basic-controllers..Group"></a>

### basic-controllers~Group
Create a group of controllers.

**Kind**: inner class of <code>[basic-controllers](#module_basic-controllers)</code>  

* [~Group](#module_basic-controllers..Group)
    * [new Group(options, legend)](#new_module_basic-controllers..Group_new)
    * [.state](#module_basic-controllers..Group+state) : <code>String</code>


-

<a name="new_module_basic-controllers..Group_new"></a>

#### new Group(options, legend)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Override default parameters. |
| legend | <code>String</code> | - |


-

<a name="module_basic-controllers..Group+state"></a>

#### group.state : <code>String</code>
State of the group (`'opened'` or `'closed'`).

**Kind**: instance property of <code>[Group](#module_basic-controllers..Group)</code>  

-

<a name="module_basic-controllers..NumberBox"></a>

### basic-controllers~NumberBox
Number Box

**Kind**: inner class of <code>[basic-controllers](#module_basic-controllers)</code>  

* [~NumberBox](#module_basic-controllers..NumberBox)
    * [new NumberBox(options)](#new_module_basic-controllers..NumberBox_new)
    * [.value](#module_basic-controllers..NumberBox+value) : <code>Number</code>


-

<a name="new_module_basic-controllers..NumberBox_new"></a>

#### new NumberBox(options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | Override default options. |
| options.label | <code>String</code> |  | Label of the controller. |
| [options.min] | <code>Number</code> | <code>0</code> | Minimum value. |
| [options.max] | <code>Number</code> | <code>1</code> | Maximum value. |
| [options.step] | <code>Number</code> | <code>0.01</code> | Step between consecutive values. |
| [options.default] | <code>Number</code> | <code>0</code> | Default value. |
| [options.container] | <code>Number</code> | <code></code> | Container of the controller. |
| [options.callback] | <code>Number</code> | <code></code> | Callback to be executed when the  value changes. |

**Example**  
```js
import * as controllers from 'basic-controllers';

const numberBox = new controllers.NumberBox({
  label: 'NumberBox',
  min: 0,
  max: 10,
  step: 0.1,
  default: 5,
  container: '#container',
  callback: (value) => console.log(value),
});
```

-

<a name="module_basic-controllers..NumberBox+value"></a>

#### numberBox.value : <code>Number</code>
Value of the controller.

**Kind**: instance property of <code>[NumberBox](#module_basic-controllers..NumberBox)</code>  

-



## License

BSD-3-Clause

