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
        * [~Group](#module_basic-controllers..Group)
            * [new Group(options, label)](#new_module_basic-controllers..Group_new)
            * [.state](#module_basic-controllers..Group+state) : <code>String</code>
        * [~Toggle](#module_basic-controllers..Toggle)
            * [new Toggle(options)](#new_module_basic-controllers..Toggle_new)
            * [.value](#module_basic-controllers..Toggle+value) : <code>Boolean</code>
            * [.active](#module_basic-controllers..Toggle+active) : <code>Boolean</code>
        * [~TriggerButtons](#module_basic-controllers..TriggerButtons)
            * [new TriggerButtons(options)](#new_module_basic-controllers..TriggerButtons_new)
            * [.value](#module_basic-controllers..TriggerButtons+value) : <code>String</code>
            * [.index](#module_basic-controllers..TriggerButtons+index) : <code>String</code>


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

<a name="module_basic-controllers..Group"></a>

### basic-controllers~Group
Create a group of controllers.

**Kind**: inner class of <code>[basic-controllers](#module_basic-controllers)</code>  

* [~Group](#module_basic-controllers..Group)
    * [new Group(options, label)](#new_module_basic-controllers..Group_new)
    * [.state](#module_basic-controllers..Group+state) : <code>String</code>


-

<a name="new_module_basic-controllers..Group_new"></a>

#### new Group(options, label)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Override default parameters. |
| label | <code>String</code> | - |


-

<a name="module_basic-controllers..Group+state"></a>

#### group.state : <code>String</code>
State of the group (`'opened'` or `'closed'`).

**Kind**: instance property of <code>[Group](#module_basic-controllers..Group)</code>  

-

<a name="module_basic-controllers..Toggle"></a>

### basic-controllers~Toggle
On/Off controller.

**Kind**: inner class of <code>[basic-controllers](#module_basic-controllers)</code>  

* [~Toggle](#module_basic-controllers..Toggle)
    * [new Toggle(options)](#new_module_basic-controllers..Toggle_new)
    * [.value](#module_basic-controllers..Toggle+value) : <code>Boolean</code>
    * [.active](#module_basic-controllers..Toggle+active) : <code>Boolean</code>


-

<a name="new_module_basic-controllers..Toggle_new"></a>

#### new Toggle(options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | Override default options. |
| options.label | <code>String</code> |  | Label of the controller. |
| [options.active] | <code>Array</code> | <code>false</code> | Default state of the toggle. |
| [options.container] | <code>String</code> &#124; <code>Element</code> &#124; <code>basic-controller~Group</code> | <code></code> | Container of the controller. |
| [options.callback] | <code>function</code> | <code></code> | Callback to be executed when the  value changes. |


-

<a name="module_basic-controllers..Toggle+value"></a>

#### toggle.value : <code>Boolean</code>
Value of the toggle

**Kind**: instance property of <code>[Toggle](#module_basic-controllers..Toggle)</code>  

-

<a name="module_basic-controllers..Toggle+active"></a>

#### toggle.active : <code>Boolean</code>
Alias for `value`.

**Kind**: instance property of <code>[Toggle](#module_basic-controllers..Toggle)</code>  

-

<a name="module_basic-controllers..TriggerButtons"></a>

### basic-controllers~TriggerButtons
List of buttons without state.

**Kind**: inner class of <code>[basic-controllers](#module_basic-controllers)</code>  

* [~TriggerButtons](#module_basic-controllers..TriggerButtons)
    * [new TriggerButtons(options)](#new_module_basic-controllers..TriggerButtons_new)
    * [.value](#module_basic-controllers..TriggerButtons+value) : <code>String</code>
    * [.index](#module_basic-controllers..TriggerButtons+index) : <code>String</code>


-

<a name="new_module_basic-controllers..TriggerButtons_new"></a>

#### new TriggerButtons(options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | Override default options. |
| options.label | <code>String</code> |  | Label of the controller. |
| [options.values] | <code>Array</code> | <code></code> | Values for each button. |
| [options.container] | <code>String</code> &#124; <code>Element</code> &#124; <code>basic-controller~Group</code> | <code></code> | Container of the controller. |
| [options.callback] | <code>function</code> | <code></code> | Callback to be executed when the  value changes. |

**Example**  
```js
import * as controllers from 'basic-controllers';

const triggerButtons = new controllers.TriggerButtons({
  label: 'TriggerButtons',
  values: ['value 1', 'value 2', 'value 3'],
  container: '#container',
  callback: (value, index) => console.log(value, index),
});
```

-

<a name="module_basic-controllers..TriggerButtons+value"></a>

#### triggerButtons.value : <code>String</code>
Last triggered button value.

**Kind**: instance property of <code>[TriggerButtons](#module_basic-controllers..TriggerButtons)</code>  
**Read only**: true  

-

<a name="module_basic-controllers..TriggerButtons+index"></a>

#### triggerButtons.index : <code>String</code>
Last triggered button index.

**Kind**: instance property of <code>[TriggerButtons](#module_basic-controllers..TriggerButtons)</code>  
**Read only**: true  

-



## License

BSD-3-Clause

