(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.wavesBasicControllers = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Set = require('babel-runtime/core-js/set')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _utilsStyles = require('../utils/styles');

var styles = _interopRequireWildcard(_utilsStyles);

// store all instance in a stack
var stack = new _Set();
var theme = 'light';

// add a single listener on window to trigger update
window.addEventListener('resize', function () {
  stack.forEach(function (controller) {
    return controller.onResize();
  });
});

var BaseController = (function (_events$EventEmitter) {
  _inherits(BaseController, _events$EventEmitter);

  function BaseController() {
    _classCallCheck(this, BaseController);

    _get(Object.getPrototypeOf(BaseController.prototype), 'constructor', this).call(this);

    if (stack.size === 0) {
      styles.insertStyleSheet();
    }

    stack.add(this);
  }

  _createClass(BaseController, [{
    key: '_applyOptionnalParameters',
    value: function _applyOptionnalParameters() {
      var $container = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
      var callback = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      if ($container) {
        if (typeof $container === 'string') {
          $container = document.querySelector($container);
        }

        $container.appendChild(this.render());
        this.onRender();
      }

      if (callback) {
        this.on('change', callback);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var type = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      this.$el = document.createElement('label');
      this.$el.classList.add(styles.ns, theme);
      if (type !== null) {
        this.$el.classList.add(type);
      }

      return this.$el;
    }
  }, {
    key: 'onRender',
    value: function onRender() {
      var _this = this;

      setTimeout(function () {
        return _this.onResize();
      }, 0);
    }
  }, {
    key: 'onResize',
    value: function onResize() {
      var boundingRect = this.$el.getBoundingClientRect();
      var width = boundingRect.width;
      var method = width > 600 ? 'remove' : 'add';

      this.$el.classList[method]('small');
    }

    /**
     *  Interface
     */
  }, {
    key: 'bindEvents',
    value: function bindEvents() {}
  }], [{
    key: 'theme',
    set: function set(value) {
      stack.forEach(function (controller) {
        return controller.$el.classList.remove(theme);
      });
      theme = value;
      stack.forEach(function (controller) {
        return controller.$el.classList.add(theme);
      });
    },
    get: function get() {
      return theme;
    }
  }]);

  return BaseController;
})(_events2['default'].EventEmitter);

exports['default'] = BaseController;
module.exports = exports['default'];

},{"../utils/styles":12,"babel-runtime/core-js/set":19,"babel-runtime/helpers/class-call-check":20,"babel-runtime/helpers/create-class":21,"babel-runtime/helpers/get":22,"babel-runtime/helpers/inherits":23,"babel-runtime/helpers/interop-require-default":24,"babel-runtime/helpers/interop-require-wildcard":25,"events":87}],2:[function(require,module,exports){
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _baseController = require('./base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

var Buttons = (function (_BaseController) {
  _inherits(Buttons, _BaseController);

  function Buttons(legend, labels) {
    var $container = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    var callback = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

    _classCallCheck(this, Buttons);

    _get(Object.getPrototypeOf(Buttons.prototype), 'constructor', this).call(this);

    this.type = 'buttons';
    this.legend = legend || '&nbsp'; // non breakable space to keep rendering consistency
    this.labels = labels;
    this._index = null;

    _get(Object.getPrototypeOf(Buttons.prototype), '_applyOptionnalParameters', this).call(this, $container, callback);
  }

  _createClass(Buttons, [{
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        ' + this.labels.map(function (label, index) {
        return '\n            <a href="#" class="btn">\n              ' + label + '\n            </a>';
      }).join('') + '\n      </div>';

      this.$el = _get(Object.getPrototypeOf(Buttons.prototype), 'render', this).call(this, this.type);
      this.$el.innerHTML = content;

      this.$buttons = _Array$from(this.$el.querySelectorAll('.btn'));
      this.bindEvents();

      return this.$el;
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this = this;

      this.$buttons.forEach(function ($btn, index) {
        var label = _this.labels[index];

        $btn.addEventListener('click', function (e) {
          _this.emit('change', label);
          e.preventDefault();
        });
      });
    }
  }, {
    key: 'value',
    set: function set(value) {},
    get: function get() {}
  }]);

  return Buttons;
})(_baseController2['default']);

exports['default'] = Buttons;
module.exports = exports['default'];

},{"./base-controller":1,"babel-runtime/core-js/array/from":14,"babel-runtime/helpers/class-call-check":20,"babel-runtime/helpers/create-class":21,"babel-runtime/helpers/get":22,"babel-runtime/helpers/inherits":23,"babel-runtime/helpers/interop-require-default":24}],3:[function(require,module,exports){
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _baseController = require('./base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

var _utilsElements = require('../utils/elements');

var elements = _interopRequireWildcard(_utilsElements);

var NumberBox = (function (_BaseController) {
  _inherits(NumberBox, _BaseController);

  function NumberBox(legend) {
    var min = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    var max = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
    var step = arguments.length <= 3 || arguments[3] === undefined ? 0.01 : arguments[3];
    var defaultValue = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
    var $container = arguments.length <= 5 || arguments[5] === undefined ? null : arguments[5];
    var callback = arguments.length <= 6 || arguments[6] === undefined ? null : arguments[6];

    _classCallCheck(this, NumberBox);

    _get(Object.getPrototypeOf(NumberBox.prototype), 'constructor', this).call(this);

    this.type = 'number-box';
    this.legend = legend;
    this.min = 0;
    this.max = max;
    this.step = step;
    this._value = defaultValue;
    this._isIntStep = step % 1 === 0;

    _get(Object.getPrototypeOf(NumberBox.prototype), '_applyOptionnalParameters', this).call(this, $container, callback);
  }

  _createClass(NumberBox, [{
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        ' + elements.arrowLeft + '\n        <input class="number" type="number" min="' + this.min + '" max="' + this.max + '" step="' + this.step + '" value="' + this._value + '" />\n        ' + elements.arrowRight + '\n      </div>\n    ';

      this.$el = _get(Object.getPrototypeOf(NumberBox.prototype), 'render', this).call(this, this.type);
      this.$el.classList.add('align-small');
      this.$el.innerHTML = content;

      this.$prev = this.$el.querySelector('.arrow-left');
      this.$next = this.$el.querySelector('.arrow-right');
      this.$number = this.$el.querySelector('input[type="number"]');

      this.bindEvents();

      return this.$el;
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this = this;

      this.$prev.addEventListener('click', function (e) {
        var decimals = _this.step.toString().split('.')[1];
        var exp = decimals ? decimals.length : 0;
        var mult = Math.pow(10, exp);

        var intValue = Math.floor(_this.value * mult + 0.5);
        var intStep = Math.floor(_this.step * mult + 0.5);
        var value = (intValue - intStep) / mult;

        _this.propagate(value);
      }, false);

      this.$next.addEventListener('click', function (e) {
        var decimals = _this.step.toString().split('.')[1];
        var exp = decimals ? decimals.length : 0;
        var mult = Math.pow(10, exp);

        var intValue = Math.floor(_this.value * mult + 0.5);
        var intStep = Math.floor(_this.step * mult + 0.5);
        var value = (intValue + intStep) / mult;

        _this.propagate(value);
      }, false);

      this.$number.addEventListener('change', function (e) {
        var value = _this.$number.value;
        value = _this._isIntStep ? parseInt(value, 10) : parseFloat(value);
        value = Math.min(_this.max, Math.max(_this.min, value));

        _this.propagate(value);
      }, false);
    }
  }, {
    key: 'propagate',
    value: function propagate(value) {
      if (value === this._value) {
        return;
      }

      this._value = value;
      this.$number.value = value;

      this.emit('change', this._value);
    }
  }, {
    key: 'value',
    get: function get() {
      return this._value;
    },
    set: function set(value) {
      value = this._isIntStep ? parseInt(value, 10) : parseFloat(value);
      value = Math.min(this.max, Math.max(this.min, value));
      this.$number.value = value;

      this._value = value;
    }
  }]);

  return NumberBox;
})(_baseController2['default']);

exports['default'] = NumberBox;
module.exports = exports['default'];

},{"../utils/elements":11,"./base-controller":1,"babel-runtime/helpers/class-call-check":20,"babel-runtime/helpers/create-class":21,"babel-runtime/helpers/get":22,"babel-runtime/helpers/inherits":23,"babel-runtime/helpers/interop-require-default":24,"babel-runtime/helpers/interop-require-wildcard":25}],4:[function(require,module,exports){
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _baseController = require('./base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

var _utilsElements = require('../utils/elements');

var elements = _interopRequireWildcard(_utilsElements);

var SelectButtons = (function (_BaseController) {
  _inherits(SelectButtons, _BaseController);

  function SelectButtons(legend, options, defaultValue) {
    var $container = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
    var callback = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];

    _classCallCheck(this, SelectButtons);

    _get(Object.getPrototypeOf(SelectButtons.prototype), 'constructor', this).call(this);

    this.type = 'select-buttons';
    this.legend = legend; // non breakable space to keep rendering consistency
    this.options = options;
    this._value = defaultValue;
    var currentIndex = this.options.indexOf(this._value);
    this._currentIndex = currentIndex === -1 ? 0 : currentIndex;
    this._maxIndex = this.options.length - 1;

    _get(Object.getPrototypeOf(SelectButtons.prototype), '_applyOptionnalParameters', this).call(this, $container, callback);
  }

  _createClass(SelectButtons, [{
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        ' + elements.arrowLeft + '\n        ' + this.options.map(function (option, index) {
        return '\n            <a href="#" class="btn" data-index="' + index + '" data-value="' + option + '">\n              ' + option + '\n            </a>';
      }).join('') + '\n        ' + elements.arrowRight + '\n      </div>\n    ';

      this.$el = _get(Object.getPrototypeOf(SelectButtons.prototype), 'render', this).call(this, this.type);
      this.$el.innerHTML = content;

      this.$prev = this.$el.querySelector('.arrow-left');
      this.$next = this.$el.querySelector('.arrow-right');
      this.$btns = _Array$from(this.$el.querySelectorAll('.btn'));
      this._highlightBtn(this._currentIndex);

      this.bindEvents();
      return this.$el;
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this = this;

      this.$prev.addEventListener('click', function () {
        var index = _this._currentIndex - 1;
        _this.propagate(index);
      });

      this.$next.addEventListener('click', function () {
        var index = _this._currentIndex + 1;
        _this.propagate(index);
      });

      this.$btns.forEach(function ($btn, index) {
        $btn.addEventListener('click', function (e) {
          e.preventDefault();
          _this.propagate(index);
        });
      });
    }
  }, {
    key: 'propagate',
    value: function propagate(index) {
      if (index < 0 || index > this._maxIndex) {
        return;
      }

      this._currentIndex = index;
      this._value = this.options[index];
      this._highlightBtn(this._currentIndex);

      this.emit('change', this._value);
    }
  }, {
    key: '_highlightBtn',
    value: function _highlightBtn(activeIndex) {
      this.$btns.forEach(function ($btn, index) {
        $btn.classList.remove('active');

        if (activeIndex === index) {
          $btn.classList.add('active');
        }
      });
    }
  }, {
    key: 'value',
    get: function get() {
      return this._value;
    },
    set: function set(value) {}
  }]);

  return SelectButtons;
})(_baseController2['default']);

exports['default'] = SelectButtons;
module.exports = exports['default'];

},{"../utils/elements":11,"./base-controller":1,"babel-runtime/core-js/array/from":14,"babel-runtime/helpers/class-call-check":20,"babel-runtime/helpers/create-class":21,"babel-runtime/helpers/get":22,"babel-runtime/helpers/inherits":23,"babel-runtime/helpers/interop-require-default":24,"babel-runtime/helpers/interop-require-wildcard":25}],5:[function(require,module,exports){
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _baseController = require('./base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

var _utilsElements = require('../utils/elements');

var elements = _interopRequireWildcard(_utilsElements);

var SelectList = (function (_BaseController) {
  _inherits(SelectList, _BaseController);

  function SelectList(legend, options, defaultValue) {
    var $container = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
    var callback = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];

    _classCallCheck(this, SelectList);

    _get(Object.getPrototypeOf(SelectList.prototype), 'constructor', this).call(this);

    this.type = 'select-list';
    this.legend = legend;
    this.options = options;
    this._value = defaultValue;
    var currentIndex = this.options.indexOf(this._value);
    this._currentIndex = currentIndex === -1 ? 0 : currentIndex;
    this._maxIndex = this.options.length - 1;

    _get(Object.getPrototypeOf(SelectList.prototype), '_applyOptionnalParameters', this).call(this, $container, callback);
  }

  _createClass(SelectList, [{
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        ' + elements.arrowLeft + '\n        <select>\n        ' + this.options.map(function (option, index) {
        return '<option value="' + option + '">' + option + '</option>';
      }).join('') + '\n        <select>\n        ' + elements.arrowRight + '\n      </div>\n    ';

      this.$el = _get(Object.getPrototypeOf(SelectList.prototype), 'render', this).call(this, this.type);
      this.$el.classList.add('align-small');
      this.$el.innerHTML = content;

      this.$prev = this.$el.querySelector('.arrow-left');
      this.$next = this.$el.querySelector('.arrow-right');
      this.$select = this.$el.querySelector('select');
      // set to default value
      this.$select.value = this.options[this._currentIndex];
      this.bindEvents();

      return this.$el;
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this = this;

      this.$prev.addEventListener('click', function () {
        var index = _this._currentIndex - 1;
        _this.propagate(index);
      }, false);

      this.$next.addEventListener('click', function () {
        var index = _this._currentIndex + 1;
        _this.propagate(index);
      }, false);

      this.$select.addEventListener('change', function () {
        var value = _this.$select.value;
        var index = _this.options.indexOf(value);
        _this.propagate(index);
      });
    }
  }, {
    key: 'propagate',
    value: function propagate(index) {
      if (index < 0 || index > this._maxIndex) {
        return;
      }

      var value = this.options[index];
      this._currentIndex = index;
      this.$select.value = value;

      this.emit('change', value);
    }
  }, {
    key: 'value',
    get: function get() {
      return this._value;
    },
    set: function set(value) {
      this.$select.value = value;
      this._value = value;
      this._currentIndex = this.options.indexOf(value);
    }
  }]);

  return SelectList;
})(_baseController2['default']);

exports['default'] = SelectList;
module.exports = exports['default'];

},{"../utils/elements":11,"./base-controller":1,"babel-runtime/helpers/class-call-check":20,"babel-runtime/helpers/create-class":21,"babel-runtime/helpers/get":22,"babel-runtime/helpers/inherits":23,"babel-runtime/helpers/interop-require-default":24,"babel-runtime/helpers/interop-require-wildcard":25}],6:[function(require,module,exports){
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _baseController = require('./base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

var Slider = (function (_BaseController) {
  _inherits(Slider, _BaseController);

  function Slider(legend) {
    var min = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    var max = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
    var step = arguments.length <= 3 || arguments[3] === undefined ? 0.01 : arguments[3];
    var defaultValue = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
    var unit = arguments.length <= 5 || arguments[5] === undefined ? '' : arguments[5];
    var size = arguments.length <= 6 || arguments[6] === undefined ? 'default' : arguments[6];
    var $container = arguments.length <= 7 || arguments[7] === undefined ? null : arguments[7];
    var callback = arguments.length <= 8 || arguments[8] === undefined ? null : arguments[8];

    _classCallCheck(this, Slider);

    _get(Object.getPrototypeOf(Slider.prototype), 'constructor', this).call(this);

    this.type = 'slider';
    this.legend = legend;
    this.min = min;
    this.max = max;
    this.step = step;
    this.unit = unit;
    this.size = size;
    this._value = defaultValue;

    _get(Object.getPrototypeOf(Slider.prototype), '_applyOptionnalParameters', this).call(this, $container, callback);
  }

  _createClass(Slider, [{
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        <input class="range" type="range" min="' + this.min + '" max="' + this.max + '" step="' + this.step + '" value="' + this.value + '" />\n        <div class="number-wrapper">\n          <input type="number" class="number" min="' + this.min + '" max="' + this.max + '" step="' + this.step + '" value="' + this.value + '" />\n          <span class="unit">' + this.unit + '</span>\n        </div>\n      </div>';

      this.$el = _get(Object.getPrototypeOf(Slider.prototype), 'render', this).call(this, this.type);
      this.$el.innerHTML = content;
      this.$el.classList.add('slider-' + this.size);

      this.$range = this.$el.querySelector('input[type="range"]');
      this.$number = this.$el.querySelector('input[type="number"]');

      this.bindEvents();

      return this.$el;
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this = this;

      this.$range.addEventListener('input', function () {
        var value = parseFloat(_this.$range.value);
        _this.$number.value = value;
        _this.value = value;

        _this.emit('change', value);
      }, false);

      this.$number.addEventListener('change', function () {
        // @todo - should handle min and max
        var value = parseFloat(_this.$number.value);
        _this.$range.value = value;
        _this.value = value;

        _this.emit('change', value);
      }, false);
    }
  }, {
    key: 'value',
    set: function set(value) {
      this._value = value;

      if (this.$number && this.$range) {
        this.$number.value = this.value;
        this.$range.value = this.value;
      }
    },
    get: function get() {
      return this._value;
    }
  }]);

  return Slider;
})(_baseController2['default']);

exports['default'] = Slider;
module.exports = exports['default'];

},{"./base-controller":1,"babel-runtime/helpers/class-call-check":20,"babel-runtime/helpers/create-class":21,"babel-runtime/helpers/get":22,"babel-runtime/helpers/inherits":23,"babel-runtime/helpers/interop-require-default":24}],7:[function(require,module,exports){
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _baseController = require('./base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

/**
 * Display a value, Read-only.
 */

var Text = (function (_BaseController) {
  _inherits(Text, _BaseController);

  function Text(legend, defaultValue) {
    var readonly = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
    var $container = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
    var callback = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];

    _classCallCheck(this, Text);

    _get(Object.getPrototypeOf(Text.prototype), 'constructor', this).call(this);

    this.type = 'text';
    this.legend = legend;
    this._readonly = readonly;
    this._value = defaultValue;

    this._applyOptionnalParameters($container, callback);
  }

  _createClass(Text, [{
    key: 'render',
    value: function render() {
      var readonly = this._readonly ? 'readonly' : '';
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        <input class="text" type="text" value="' + this._value + '" ' + readonly + ' />\n      </div>\n    ';

      this.$el = _get(Object.getPrototypeOf(Text.prototype), 'render', this).call(this, this.type);
      this.$el.innerHTML = content;

      this.$input = this.$el.querySelector('.text');

      this.bindEvents();

      return this.$el;
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this = this;

      this.$input.addEventListener('keyup', function () {
        _this._value = _this.$input.value;
        _this.emit('change', _this._value);
      }, false);
    }
  }, {
    key: 'value',
    get: function get() {
      return this._value;
    },
    set: function set(value) {
      this.$input.value = value;
      this._value = value;
    }
  }]);

  return Text;
})(_baseController2['default']);

exports['default'] = Text;
module.exports = exports['default'];

},{"./base-controller":1,"babel-runtime/helpers/class-call-check":20,"babel-runtime/helpers/create-class":21,"babel-runtime/helpers/get":22,"babel-runtime/helpers/inherits":23,"babel-runtime/helpers/interop-require-default":24}],8:[function(require,module,exports){
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _baseController = require('./base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

var _utilsStyles = require('../utils/styles');

var _utilsStyles2 = _interopRequireDefault(_utilsStyles);

var Title = (function (_BaseController) {
  _inherits(Title, _BaseController);

  function Title(legend) {
    var $container = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    _classCallCheck(this, Title);

    _get(Object.getPrototypeOf(Title.prototype), 'constructor', this).call(this);

    this.type = 'title';
    this.legend = legend;

    _get(Object.getPrototypeOf(Title.prototype), '_applyOptionnalParameters', this).call(this, $container);
  }

  _createClass(Title, [{
    key: 'render',
    value: function render() {
      var content = '<span class="legend">' + this.legend + '</span>';

      this.$el = _get(Object.getPrototypeOf(Title.prototype), 'render', this).call(this, this.type);
      this.$el.innerHTML = content;

      return this.$el;
    }
  }]);

  return Title;
})(_baseController2['default']);

exports['default'] = Title;
module.exports = exports['default'];

},{"../utils/styles":12,"./base-controller":1,"babel-runtime/helpers/class-call-check":20,"babel-runtime/helpers/create-class":21,"babel-runtime/helpers/get":22,"babel-runtime/helpers/inherits":23,"babel-runtime/helpers/interop-require-default":24}],9:[function(require,module,exports){
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _baseController = require('./base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

var _utilsElements = require('../utils/elements');

var elements = _interopRequireWildcard(_utilsElements);

var Toggle = (function (_BaseController) {
  _inherits(Toggle, _BaseController);

  function Toggle(legend) {
    var active = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
    var $container = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
    var callback = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

    _classCallCheck(this, Toggle);

    _get(Object.getPrototypeOf(Toggle.prototype), 'constructor', this).call(this);

    this.type = 'toggle';
    this.legend = legend;
    this._active = active;

    _get(Object.getPrototypeOf(Toggle.prototype), '_applyOptionnalParameters', this).call(this, $container, callback);
  }

  _createClass(Toggle, [{
    key: '_updateBtn',
    value: function _updateBtn() {
      var method = this.active ? 'add' : 'remove';
      this.$toggle.classList[method]('active');
    }
  }, {
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        ' + elements.toggle + '\n      </div>';

      this.$el = _get(Object.getPrototypeOf(Toggle.prototype), 'render', this).call(this, this.type);
      this.$el.classList.add('align-small');
      this.$el.innerHTML = content;

      this.$toggle = this.$el.querySelector('.toggle-element');
      this.bindEvents();
      this.active = this._active; // initialize state

      return this.$el;
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this = this;

      this.$toggle.addEventListener('click', function (e) {
        e.preventDefault();
        _this.active = !_this.active;
        _this.emit('change', _this.active);
      });
    }
  }, {
    key: 'active',
    set: function set(bool) {
      this._active = bool;
      this._updateBtn();
    },
    get: function get() {
      return this._active;
    }
  }]);

  return Toggle;
})(_baseController2['default']);

exports['default'] = Toggle;
module.exports = exports['default'];

},{"../utils/elements":11,"./base-controller":1,"babel-runtime/helpers/class-call-check":20,"babel-runtime/helpers/create-class":21,"babel-runtime/helpers/get":22,"babel-runtime/helpers/inherits":23,"babel-runtime/helpers/interop-require-default":24,"babel-runtime/helpers/interop-require-wildcard":25}],10:[function(require,module,exports){
module.exports = " .waves-basic-controllers { width: 100%; max-width: 800px; height: 30px; padding: 3px; margin: 4px 0; background-color: #efefef; border: 1px solid #aaaaaa; box-sizing: border-box; border-radius: 2px; display: block; color: #464646; } .waves-basic-controllers .legend { font: italic bold 12px arial; line-height: 22px; overflow: hidden; text-align: right; padding: 0 8px 0 0; display: block; box-sizing: border-box; width: 24%; float: left; white-space: nowrap; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none; user-select: none; } .waves-basic-controllers .inner-wrapper { display: -webkit-inline-flex; display: inline-flex; -webkit-flex-wrap: no-wrap; flex-wrap: no-wrap; width: 76%; float: left; } .waves-basic-controllers.small:not(.align-small) { height: auto; } .waves-basic-controllers.small:not(.align-small) .legend { width: 100%; float: none; text-align: left; } .waves-basic-controllers.small:not(.align-small) .inner-wrapper { width: 100%; float: none; } .waves-basic-controllers.small.align-small .legend { display: block; margin-right: 20px; text-align: left; } .waves-basic-controllers.small.align-small .inner-wrapper { display: inline-block; width: auto; } .waves-basic-controllers .arrow-right, .waves-basic-controllers .arrow-left { border-radius: 2px; width: 14px; height: 22px; cursor: pointer; background-color: #464646; } .waves-basic-controllers .arrow-right line, .waves-basic-controllers .arrow-left line { stroke-width: 3px; stroke: #ffffff; } .waves-basic-controllers .arrow-right:hover, .waves-basic-controllers .arrow-left:hover { background-color: #686868; } .waves-basic-controllers .arrow-right:active, .waves-basic-controllers .arrow-left:active { background-color: #909090; } .waves-basic-controllers .toggle-element { width: 22px; height: 22px; border-radius: 2px; background-color: #464646; cursor: pointer; } .waves-basic-controllers .toggle-element:hover { background-color: #686868; } .waves-basic-controllers .toggle-element line { stroke-width: 3px; } .waves-basic-controllers .toggle-element .x { display: none; } .waves-basic-controllers .toggle-element.active .x { display: block; } .waves-basic-controllers .btn { display: block; text-align: center; font: normal normal 12px arial; text-decoration: none; height: 22px; line-height: 22px; background-color: #464646; border: none; color: #ffffff; margin: 0 4px 0 0; padding: 0; box-sizing: border-box; border-radius: 2px; cursor: pointer; -webkit-flex-grow: 1; flex-grow: 1; } .waves-basic-controllers .btn:last-child { margin: 0; } .waves-basic-controllers .btn:hover { background-color: #686868; } .waves-basic-controllers .btn:active, .waves-basic-controllers .btn.active { background-color: #909090; } .waves-basic-controllers .btn:focus { outline: none; } .waves-basic-controllers .number { height: 22px; display: inline-block; position: relative; font: normal normal 12px arial; vertical-align: top; border: none; background: none; color: #464646; padding: 0 4px; margin: 0; background-color: #f9f9f9; border-radius: 2px; box-sizing: border-box; } .waves-basic-controllers .number:focus { outline: none; } .waves-basic-controllers select { height: 22px; line-height: 22px; background-color: #f9f9f9; border-radius: 2px; border: none; vertical-align: top; padding: 0; margin: 0; } .waves-basic-controllers select:focus { outline: none; } .waves-basic-controllers input[type=text] { width: 100%; height: 22px; line-height: 22px; border: 0; padding: 0 4px; background-color: #f9f9f9; border-radius: 2px; color: #565656; } .waves-basic-controllers.title { border: none !important; margin-bottom: 0; margin-top: 8px; padding-top: 8px; padding-bottom: 0; background-color: transparent !important; height: 25px; } .waves-basic-controllers.title .legend { font: normal bold 13px arial; height: 100%; overflow: hidden; text-align: left; padding: 0; width: 100%; box-sizing: border-box; -webkit-flex-grow: 1; flex-grow: 1; } .waves-basic-controllers.slider .range { height: 22px; display: inline-block; margin: 0; -webkit-flex-grow: 4; flex-grow: 4; } .waves-basic-controllers.slider .number-wrapper { display: inline; height: 22px; text-align: right; -webkit-flex-grow: 3; flex-grow: 3; } .waves-basic-controllers.slider .number-wrapper .number { left: 5px; width: 54px; text-align: right; } .waves-basic-controllers.slider .number-wrapper .unit { font: italic normal 12px arial; line-height: 22px; height: 22px; width: 30px; display: inline-block; position: relative; padding-left: 5px; padding-right: 5px; color: #565656; } .waves-basic-controllers.slider .number-wrapper .unit sup { line-height: 7px; } .waves-basic-controllers.slider.slider-large .range { -webkit-flex-grow: 50; flex-grow: 50; } .waves-basic-controllers.slider.slider-large .number-wrapper { -webkit-flex-grow: 1; flex-grow: 1; } .waves-basic-controllers.slider.slider-small .range { -webkit-flex-grow: 1; flex-grow: 1; } .waves-basic-controllers.slider.slider-small .number-wrapper { -webkit-flex-grow: 7; flex-grow: 7; } .waves-basic-controllers.number-box .number { width: 120px; margin: 0 10px; vertical-align: top; } .waves-basic-controllers.select-list select { margin: 0 10px; width: 120px; font: normal normal 12px arial; color: #464646; } .waves-basic-controllers.select-buttons .btn:first-of-type { margin-left: 4px; } .waves-basic-controllers.info input[type=text] { font: normal normal 12px arial; color: #464646; } .waves-basic-controllers.dark { background-color: #363636; border: 1px solid #585858; color: rgba(255, 255, 255, 0.95); } .waves-basic-controllers.dark .toggle-element { background-color: #efefef; } .waves-basic-controllers.dark .toggle-element line { stroke: #363636; } .waves-basic-controllers.dark .toggle-element:hover { background-color: #cdcdcd; } .waves-basic-controllers.dark .arrow-right, .waves-basic-controllers.dark .arrow-left { height: 22px; background-color: #efefef; } .waves-basic-controllers.dark .arrow-right line, .waves-basic-controllers.dark .arrow-left line { stroke: #363636; } .waves-basic-controllers.dark .arrow-right:hover, .waves-basic-controllers.dark .arrow-left:hover { background-color: #cdcdcd; } .waves-basic-controllers.dark .arrow-right:active, .waves-basic-controllers.dark .arrow-left:active { background-color: #ababab; } .waves-basic-controllers.dark .number, .waves-basic-controllers.dark select, .waves-basic-controllers.dark input[type=text] { color: rgba(255, 255, 255, 0.95); background-color: #454545; } .waves-basic-controllers.dark .btn { background-color: #efefef; color: #363636; } .waves-basic-controllers.dark .btn:hover { background-color: #cdcdcd; } .waves-basic-controllers.dark .btn:active, .waves-basic-controllers.dark .btn.active { background-color: #ababab; } .waves-basic-controllers.dark.slider .inner-wrapper .number-wrapper .unit { color: #bcbcbc; } ";
},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var toggle = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"toggle-element\" version=\"1.1\" viewBox=\"0 0 50 50\" preserveAspectRatio=\"none\">\n      <g class=\"x\">\n        <line x1=\"8\" y1=\"8\" x2=\"42\" y2=\"42\" stroke=\"white\" />\n        <line x1=\"8\" y1=\"42\" x2=\"42\" y2=\"8\" stroke=\"white\" />\n      </g>\n  </svg>\n";

exports.toggle = toggle;
var arrowRight = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"arrow-right\" version=\"1.1\" viewBox=\"0 0 50 50\" preserveAspectRatio=\"none\">\n    <line x1=\"10\" y1=\"10\" x2=\"40\" y2=\"25\" />\n    <line x1=\"10\" y1=\"40\" x2=\"40\" y2=\"25\" />\n  </svg>\n";

exports.arrowRight = arrowRight;
var arrowLeft = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"arrow-left\" version=\"1.1\" viewBox=\"0 0 50 50\" preserveAspectRatio=\"none\">\n    <line x1=\"40\" y1=\"10\" x2=\"10\" y2=\"25\" />\n    <line x1=\"40\" y1=\"40\" x2=\"10\" y2=\"25\" />\n  </svg>\n";
exports.arrowLeft = arrowLeft;

},{}],12:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.disable = disable;
exports.insertStyleSheet = insertStyleSheet;

var _packageJson = require('../../package.json');

var _packageJson2 = _interopRequireDefault(_packageJson);

var _cssStylesJs = require('../css/styles.js');

var _cssStylesJs2 = _interopRequireDefault(_cssStylesJs);

var ns = _packageJson2['default'].name;

exports.ns = ns;
var nsClass = '.' + ns;
var _disable = false;

function disable() {
  _disable = true;
}

function insertStyleSheet() {
  if (_disable) {
    return;
  }
  var $style = document.createElement('style');

  $style.setAttribute('data-namespace', ns);
  $style.innerHTML = _cssStylesJs2['default'];

  document.body.appendChild($style);
}

},{"../../package.json":88,"../css/styles.js":10,"babel-runtime/helpers/interop-require-default":24}],13:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _utilsStyles = require('./utils/styles');

var styles = _interopRequireWildcard(_utilsStyles);

// expose for plugins

var _componentsBaseController = require('./components/base-controller');

var _componentsBaseController2 = _interopRequireDefault(_componentsBaseController);

var _componentsButtons = require('./components/buttons');

var _componentsButtons2 = _interopRequireDefault(_componentsButtons);

var _componentsText = require('./components/text');

var _componentsText2 = _interopRequireDefault(_componentsText);

var _componentsNumberBox = require('./components/number-box');

var _componentsNumberBox2 = _interopRequireDefault(_componentsNumberBox);

var _componentsSelectButtons = require('./components/select-buttons');

var _componentsSelectButtons2 = _interopRequireDefault(_componentsSelectButtons);

var _componentsSelectList = require('./components/select-list');

var _componentsSelectList2 = _interopRequireDefault(_componentsSelectList);

var _componentsSlider = require('./components/slider');

var _componentsSlider2 = _interopRequireDefault(_componentsSlider);

var _componentsTitle = require('./components/title');

var _componentsTitle2 = _interopRequireDefault(_componentsTitle);

var _componentsToggle = require('./components/toggle');

var _componentsToggle2 = _interopRequireDefault(_componentsToggle);

// Breakpoint: require('./dist/breakpoint'),

exports['default'] = {
  BaseController: _componentsBaseController2['default'],
  Buttons: _componentsButtons2['default'],
  Text: _componentsText2['default'],
  NumberBox: _componentsNumberBox2['default'],
  SelectButtons: _componentsSelectButtons2['default'],
  SelectList: _componentsSelectList2['default'],
  Slider: _componentsSlider2['default'],
  Title: _componentsTitle2['default'],
  Toggle: _componentsToggle2['default'],

  // global configuration
  setTheme: function setTheme(theme) {
    _componentsBaseController2['default'].theme = theme;
  },
  disableStyles: function disableStyles() {
    styles.disable();
  }
};
module.exports = exports['default'];

},{"./components/base-controller":1,"./components/buttons":2,"./components/number-box":3,"./components/select-buttons":4,"./components/select-list":5,"./components/slider":6,"./components/text":7,"./components/title":8,"./components/toggle":9,"./utils/styles":12,"babel-runtime/helpers/interop-require-default":24,"babel-runtime/helpers/interop-require-wildcard":25}],14:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":26}],15:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":27}],16:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":28}],17:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-own-property-descriptor"), __esModule: true };
},{"core-js/library/fn/object/get-own-property-descriptor":29}],18:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":30}],19:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/set"), __esModule: true };
},{"core-js/library/fn/set":31}],20:[function(require,module,exports){
"use strict";

exports["default"] = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

exports.__esModule = true;
},{}],21:[function(require,module,exports){
"use strict";

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

exports["default"] = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;

      _Object$defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

exports.__esModule = true;
},{"babel-runtime/core-js/object/define-property":16}],22:[function(require,module,exports){
"use strict";

var _Object$getOwnPropertyDescriptor = require("babel-runtime/core-js/object/get-own-property-descriptor")["default"];

exports["default"] = function get(_x, _x2, _x3) {
  var _again = true;

  _function: while (_again) {
    var object = _x,
        property = _x2,
        receiver = _x3;
    _again = false;
    if (object === null) object = Function.prototype;

    var desc = _Object$getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        _x = parent;
        _x2 = property;
        _x3 = receiver;
        _again = true;
        desc = parent = undefined;
        continue _function;
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  }
};

exports.__esModule = true;
},{"babel-runtime/core-js/object/get-own-property-descriptor":17}],23:[function(require,module,exports){
"use strict";

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

var _Object$setPrototypeOf = require("babel-runtime/core-js/object/set-prototype-of")["default"];

exports["default"] = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = _Object$create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

exports.__esModule = true;
},{"babel-runtime/core-js/object/create":15,"babel-runtime/core-js/object/set-prototype-of":18}],24:[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
};

exports.__esModule = true;
},{}],25:[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }

    newObj["default"] = obj;
    return newObj;
  }
};

exports.__esModule = true;
},{}],26:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/$.core').Array.from;
},{"../../modules/$.core":40,"../../modules/es6.array.from":78,"../../modules/es6.string.iterator":84}],27:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function create(P, D){
  return $.create(P, D);
};
},{"../../modules/$":59}],28:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":59}],29:[function(require,module,exports){
var $ = require('../../modules/$');
require('../../modules/es6.object.get-own-property-descriptor');
module.exports = function getOwnPropertyDescriptor(it, key){
  return $.getDesc(it, key);
};
},{"../../modules/$":59,"../../modules/es6.object.get-own-property-descriptor":80}],30:[function(require,module,exports){
require('../../modules/es6.object.set-prototype-of');
module.exports = require('../../modules/$.core').Object.setPrototypeOf;
},{"../../modules/$.core":40,"../../modules/es6.object.set-prototype-of":81}],31:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.set');
require('../modules/es7.set.to-json');
module.exports = require('../modules/$.core').Set;
},{"../modules/$.core":40,"../modules/es6.object.to-string":82,"../modules/es6.set":83,"../modules/es6.string.iterator":84,"../modules/es7.set.to-json":85,"../modules/web.dom.iterable":86}],32:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],33:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],34:[function(require,module,exports){
var isObject = require('./$.is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./$.is-object":52}],35:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./$.cof')
  , TAG = require('./$.wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./$.cof":36,"./$.wks":76}],36:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],37:[function(require,module,exports){
'use strict';
var $            = require('./$')
  , hide         = require('./$.hide')
  , redefineAll  = require('./$.redefine-all')
  , ctx          = require('./$.ctx')
  , strictNew    = require('./$.strict-new')
  , defined      = require('./$.defined')
  , forOf        = require('./$.for-of')
  , $iterDefine  = require('./$.iter-define')
  , step         = require('./$.iter-step')
  , ID           = require('./$.uid')('id')
  , $has         = require('./$.has')
  , isObject     = require('./$.is-object')
  , setSpecies   = require('./$.set-species')
  , DESCRIPTORS  = require('./$.descriptors')
  , isExtensible = Object.isExtensible || isObject
  , SIZE         = DESCRIPTORS ? '_s' : 'size'
  , id           = 0;

var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!$has(it, ID)){
    // can't set id to frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add id
    if(!create)return 'E';
    // add missing object id
    hide(it, ID, ++id);
  // return object id with prefix
  } return 'O' + it[ID];
};

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      strictNew(that, C, NAME);
      that._i = $.create(null); // index
      that._f = undefined;      // first entry
      that._l = undefined;      // last entry
      that[SIZE] = 0;           // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)$.setDesc(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};
},{"./$":59,"./$.ctx":41,"./$.defined":42,"./$.descriptors":43,"./$.for-of":46,"./$.has":48,"./$.hide":49,"./$.is-object":52,"./$.iter-define":55,"./$.iter-step":57,"./$.redefine-all":63,"./$.set-species":66,"./$.strict-new":69,"./$.uid":75}],38:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var forOf   = require('./$.for-of')
  , classof = require('./$.classof');
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    var arr = [];
    forOf(this, false, arr.push, arr);
    return arr;
  };
};
},{"./$.classof":35,"./$.for-of":46}],39:[function(require,module,exports){
'use strict';
var $              = require('./$')
  , global         = require('./$.global')
  , $export        = require('./$.export')
  , fails          = require('./$.fails')
  , hide           = require('./$.hide')
  , redefineAll    = require('./$.redefine-all')
  , forOf          = require('./$.for-of')
  , strictNew      = require('./$.strict-new')
  , isObject       = require('./$.is-object')
  , setToStringTag = require('./$.set-to-string-tag')
  , DESCRIPTORS    = require('./$.descriptors');

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
  } else {
    C = wrapper(function(target, iterable){
      strictNew(target, C, NAME);
      target._c = new Base;
      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
    });
    $.each.call('add,clear,delete,forEach,get,has,set,keys,values,entries'.split(','),function(KEY){
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    if('size' in proto)$.setDesc(C.prototype, 'size', {
      get: function(){
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};
},{"./$":59,"./$.descriptors":43,"./$.export":44,"./$.fails":45,"./$.for-of":46,"./$.global":47,"./$.hide":49,"./$.is-object":52,"./$.redefine-all":63,"./$.set-to-string-tag":67,"./$.strict-new":69}],40:[function(require,module,exports){
var core = module.exports = {version: '1.2.6'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],41:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./$.a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./$.a-function":32}],42:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],43:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./$.fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./$.fails":45}],44:[function(require,module,exports){
var global    = require('./$.global')
  , core      = require('./$.core')
  , ctx       = require('./$.ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
};
// type bitmap
$export.F = 1;  // forced
$export.G = 2;  // global
$export.S = 4;  // static
$export.P = 8;  // proto
$export.B = 16; // bind
$export.W = 32; // wrap
module.exports = $export;
},{"./$.core":40,"./$.ctx":41,"./$.global":47}],45:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],46:[function(require,module,exports){
var ctx         = require('./$.ctx')
  , call        = require('./$.iter-call')
  , isArrayIter = require('./$.is-array-iter')
  , anObject    = require('./$.an-object')
  , toLength    = require('./$.to-length')
  , getIterFn   = require('./core.get-iterator-method');
module.exports = function(iterable, entries, fn, that){
  var iterFn = getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    call(iterator, f, step.value, entries);
  }
};
},{"./$.an-object":34,"./$.ctx":41,"./$.is-array-iter":51,"./$.iter-call":53,"./$.to-length":73,"./core.get-iterator-method":77}],47:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],48:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],49:[function(require,module,exports){
var $          = require('./$')
  , createDesc = require('./$.property-desc');
module.exports = require('./$.descriptors') ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./$":59,"./$.descriptors":43,"./$.property-desc":62}],50:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./$.cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./$.cof":36}],51:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./$.iterators')
  , ITERATOR   = require('./$.wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./$.iterators":58,"./$.wks":76}],52:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],53:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./$.an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./$.an-object":34}],54:[function(require,module,exports){
'use strict';
var $              = require('./$')
  , descriptor     = require('./$.property-desc')
  , setToStringTag = require('./$.set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./$.hide')(IteratorPrototype, require('./$.wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./$":59,"./$.hide":49,"./$.property-desc":62,"./$.set-to-string-tag":67,"./$.wks":76}],55:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./$.library')
  , $export        = require('./$.export')
  , redefine       = require('./$.redefine')
  , hide           = require('./$.hide')
  , has            = require('./$.has')
  , Iterators      = require('./$.iterators')
  , $iterCreate    = require('./$.iter-create')
  , setToStringTag = require('./$.set-to-string-tag')
  , getProto       = require('./$').getProto
  , ITERATOR       = require('./$.wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , methods, key;
  // Fix native
  if($native){
    var IteratorPrototype = getProto($default.call(new Base));
    // Set @@toStringTag to native iterators
    setToStringTag(IteratorPrototype, TAG, true);
    // FF fix
    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    // fix Array#{values, @@iterator}.name in V8 / FF
    if(DEF_VALUES && $native.name !== VALUES){
      VALUES_BUG = true;
      $default = function values(){ return $native.call(this); };
    }
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES  ? $default : getMethod(VALUES),
      keys:    IS_SET      ? $default : getMethod(KEYS),
      entries: !DEF_VALUES ? $default : getMethod('entries')
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./$":59,"./$.export":44,"./$.has":48,"./$.hide":49,"./$.iter-create":54,"./$.iterators":58,"./$.library":60,"./$.redefine":64,"./$.set-to-string-tag":67,"./$.wks":76}],56:[function(require,module,exports){
var ITERATOR     = require('./$.wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ safe = true; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./$.wks":76}],57:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],58:[function(require,module,exports){
module.exports = {};
},{}],59:[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],60:[function(require,module,exports){
module.exports = true;
},{}],61:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./$.export')
  , core    = require('./$.core')
  , fails   = require('./$.fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./$.core":40,"./$.export":44,"./$.fails":45}],62:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],63:[function(require,module,exports){
var redefine = require('./$.redefine');
module.exports = function(target, src){
  for(var key in src)redefine(target, key, src[key]);
  return target;
};
},{"./$.redefine":64}],64:[function(require,module,exports){
module.exports = require('./$.hide');
},{"./$.hide":49}],65:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var getDesc  = require('./$').getDesc
  , isObject = require('./$.is-object')
  , anObject = require('./$.an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./$.ctx')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./$":59,"./$.an-object":34,"./$.ctx":41,"./$.is-object":52}],66:[function(require,module,exports){
'use strict';
var core        = require('./$.core')
  , $           = require('./$')
  , DESCRIPTORS = require('./$.descriptors')
  , SPECIES     = require('./$.wks')('species');

module.exports = function(KEY){
  var C = core[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./$":59,"./$.core":40,"./$.descriptors":43,"./$.wks":76}],67:[function(require,module,exports){
var def = require('./$').setDesc
  , has = require('./$.has')
  , TAG = require('./$.wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./$":59,"./$.has":48,"./$.wks":76}],68:[function(require,module,exports){
var global = require('./$.global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$.global":47}],69:[function(require,module,exports){
module.exports = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
},{}],70:[function(require,module,exports){
var toInteger = require('./$.to-integer')
  , defined   = require('./$.defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./$.defined":42,"./$.to-integer":71}],71:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],72:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./$.iobject')
  , defined = require('./$.defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./$.defined":42,"./$.iobject":50}],73:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./$.to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./$.to-integer":71}],74:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./$.defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./$.defined":42}],75:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],76:[function(require,module,exports){
var store  = require('./$.shared')('wks')
  , uid    = require('./$.uid')
  , Symbol = require('./$.global').Symbol;
module.exports = function(name){
  return store[name] || (store[name] =
    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
};
},{"./$.global":47,"./$.shared":68,"./$.uid":75}],77:[function(require,module,exports){
var classof   = require('./$.classof')
  , ITERATOR  = require('./$.wks')('iterator')
  , Iterators = require('./$.iterators');
module.exports = require('./$.core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./$.classof":35,"./$.core":40,"./$.iterators":58,"./$.wks":76}],78:[function(require,module,exports){
'use strict';
var ctx         = require('./$.ctx')
  , $export     = require('./$.export')
  , toObject    = require('./$.to-object')
  , call        = require('./$.iter-call')
  , isArrayIter = require('./$.is-array-iter')
  , toLength    = require('./$.to-length')
  , getIterFn   = require('./core.get-iterator-method');
$export($export.S + $export.F * !require('./$.iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , $$      = arguments
      , $$len   = $$.length
      , mapfn   = $$len > 1 ? $$[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        result[index] = mapping ? mapfn(O[index], index) : O[index];
      }
    }
    result.length = index;
    return result;
  }
});

},{"./$.ctx":41,"./$.export":44,"./$.is-array-iter":51,"./$.iter-call":53,"./$.iter-detect":56,"./$.to-length":73,"./$.to-object":74,"./core.get-iterator-method":77}],79:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./$.add-to-unscopables')
  , step             = require('./$.iter-step')
  , Iterators        = require('./$.iterators')
  , toIObject        = require('./$.to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./$.iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./$.add-to-unscopables":33,"./$.iter-define":55,"./$.iter-step":57,"./$.iterators":58,"./$.to-iobject":72}],80:[function(require,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = require('./$.to-iobject');

require('./$.object-sap')('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
},{"./$.object-sap":61,"./$.to-iobject":72}],81:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./$.export');
$export($export.S, 'Object', {setPrototypeOf: require('./$.set-proto').set});
},{"./$.export":44,"./$.set-proto":65}],82:[function(require,module,exports){

},{}],83:[function(require,module,exports){
'use strict';
var strong = require('./$.collection-strong');

// 23.2 Set Objects
require('./$.collection')('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);
},{"./$.collection":39,"./$.collection-strong":37}],84:[function(require,module,exports){
'use strict';
var $at  = require('./$.string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./$.iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./$.iter-define":55,"./$.string-at":70}],85:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = require('./$.export');

$export($export.P, 'Set', {toJSON: require('./$.collection-to-json')('Set')});
},{"./$.collection-to-json":38,"./$.export":44}],86:[function(require,module,exports){
require('./es6.array.iterator');
var Iterators = require('./$.iterators');
Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
},{"./$.iterators":58,"./es6.array.iterator":79}],87:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],88:[function(require,module,exports){
module.exports={
  "name": "waves-basic-controllers",
  "version": "0.5.1",
  "description": "basic-controllers for rapid prototyping",
  "main": "dist/waves-basic-controllers.js",
  "standalone": "wavesBasicControllers",
  "scripts": {
    "transpile": "./bin/scripts --transpile",
    "prebundle": "npm run hint && npm run transpile",
    "bundle": "./bin/scripts --bundle",
    "postbundle": "npm run uglify",
    "uglify": "./bin/scripts --uglify",
    "watch": "./bin/scripts --watch",
    "test": "tac6",
    "pretest": "npm run hint",
    "hint": "jshint ./es6; true",
    "pretag": "branch=$(git symbolic-ref -q HEAD); if [ $branch != 'refs/heads/master' ]; then echo '=> You must be in master branch to run this command'; exit 1; fi && npm run bundle && git commit -am 'rebundled'",
    "tag": "npm version $1",
    "posttag": "git push origin master && git push origin --tags"
  },
  "license": "BSD-3",
  "repository": {
    "type": "git",
    "url": "https://github.com/wavesjs/basic-controllers.git"
  },
  "jshintConfig": {
    "esnext": true,
    "browser": true,
    "node": true,
    "devel": true
  },
  "dependencies": {
    "babel-runtime": "^5.8.34"
  },
  "devDependencies": {
    "babel": "^5.8.34",
    "browserify": "^12.0.1",
    "fs-extra": "^0.16.3",
    "jshint": "^2.6.0",
    "node-sass": "^3.4.2",
    "node-watch": "^0.3.4",
    "uglify-js": "^2.4.16"
  }
}

},{}]},{},[13])(13)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L2NvbXBvbmVudHMvZXM2L2NvbXBvbmVudHMvYmFzZS1jb250cm9sbGVyLmpzIiwiZGlzdC9jb21wb25lbnRzL2VzNi9jb21wb25lbnRzL2J1dHRvbnMuanMiLCJkaXN0L2NvbXBvbmVudHMvZXM2L2NvbXBvbmVudHMvbnVtYmVyLWJveC5qcyIsImRpc3QvY29tcG9uZW50cy9lczYvY29tcG9uZW50cy9zZWxlY3QtYnV0dG9ucy5qcyIsImRpc3QvY29tcG9uZW50cy9lczYvY29tcG9uZW50cy9zZWxlY3QtbGlzdC5qcyIsImRpc3QvY29tcG9uZW50cy9lczYvY29tcG9uZW50cy9zbGlkZXIuanMiLCJkaXN0L2NvbXBvbmVudHMvZXM2L2NvbXBvbmVudHMvdGV4dC5qcyIsImRpc3QvY29tcG9uZW50cy9lczYvY29tcG9uZW50cy90aXRsZS5qcyIsImRpc3QvY29tcG9uZW50cy9lczYvY29tcG9uZW50cy90b2dnbGUuanMiLCJkaXN0L2Nzcy9zdHlsZXMuanMiLCJkaXN0L3V0aWxzL2VzNi91dGlscy9lbGVtZW50cy5qcyIsImRpc3QvdXRpbHMvZXM2L3V0aWxzL3N0eWxlcy5qcyIsImRpc3QvZXM2L3dhdmVzLWJhc2ljLWNvbnRyb2xsZXJzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvc2V0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzcy1jYWxsLWNoZWNrLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGUtY2xhc3MuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2dldC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS1kZWZhdWx0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtd2lsZGNhcmQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb20uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9zZXQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5hLWZ1bmN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuYW4tb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY2xhc3NvZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmNvZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmNvbGxlY3Rpb24tc3Ryb25nLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29sbGVjdGlvbi10by1qc29uLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29sbGVjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmNvcmUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jdHguanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5kZWZpbmVkLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZGVzY3JpcHRvcnMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5leHBvcnQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5mYWlscy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmZvci1vZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmdsb2JhbC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmhhcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmhpZGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXMtYXJyYXktaXRlci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmlzLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItY2FsbC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1kZWZpbmUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWRldGVjdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItc3RlcC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXJhdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQubGlicmFyeS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLm9iamVjdC1zYXAuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5wcm9wZXJ0eS1kZXNjLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQucmVkZWZpbmUtYWxsLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQucmVkZWZpbmUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zZXQtcHJvdG8uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zZXQtc3BlY2llcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnNldC10by1zdHJpbmctdGFnLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc2hhcmVkLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3RyaWN0LW5ldy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnN0cmluZy1hdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLWludGVnZXIuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50by1pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudG8tbGVuZ3RoLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudG8tb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudWlkLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQud2tzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zZXQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc2V0LnRvLWpzb24uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwicGFja2FnZS5qc29uIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7c0JDQW1CLFFBQVE7Ozs7MkJBQ0gsaUJBQWlCOztJQUE3QixNQUFNOzs7QUFFbEIsSUFBTSxLQUFLLEdBQUcsVUFBUyxDQUFDO0FBQ3hCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQzs7O0FBR3BCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsWUFBVztBQUMzQyxPQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsVUFBVTtXQUFLLFVBQVUsQ0FBQyxRQUFRLEVBQUU7R0FBQSxDQUFDLENBQUM7Q0FDdEQsQ0FBQyxDQUFDOztJQUVrQixjQUFjO1lBQWQsY0FBYzs7QUFDdEIsV0FEUSxjQUFjLEdBQ25COzBCQURLLGNBQWM7O0FBRS9CLCtCQUZpQixjQUFjLDZDQUV2Qjs7QUFFUixRQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFO0FBQ3BCLFlBQU0sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0tBQzNCOztBQUVELFNBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDakI7O2VBVGtCLGNBQWM7O1dBcUJSLHFDQUFxQztVQUFwQyxVQUFVLHlEQUFHLElBQUk7VUFBRSxRQUFRLHlEQUFHLElBQUk7O0FBQzFELFVBQUksVUFBVSxFQUFFO0FBQ2QsWUFBSSxPQUFPLFVBQVUsS0FBSyxRQUFRLEVBQUU7QUFDbEMsb0JBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ2pEOztBQUVELGtCQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBQ3RDLFlBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztPQUNqQjs7QUFFRCxVQUFJLFFBQVEsRUFB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UkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBOztBQ0ZBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTs7QUNGQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgZXZlbnRzIGZyb20gJ2V2ZW50cyc7XG5pbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi4vdXRpbHMvc3R5bGVzJztcbi8vIHN0b3JlIGFsbCBpbnN0YW5jZSBpbiBhIHN0YWNrXG5jb25zdCBzdGFjayA9IG5ldyBTZXQoKTtcbmxldCB0aGVtZSA9ICdsaWdodCc7XG5cbi8vIGFkZCBhIHNpbmdsZSBsaXN0ZW5lciBvbiB3aW5kb3cgdG8gdHJpZ2dlciB1cGRhdGVcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgc3RhY2suZm9yRWFjaCgoY29udHJvbGxlcikgPT4gY29udHJvbGxlci5vblJlc2l6ZSgpKTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlQ29udHJvbGxlciBleHRlbmRzIGV2ZW50cy5FdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKHN0YWNrLnNpemUgPT09IDApIHtcbiAgICAgIHN0eWxlcy5pbnNlcnRTdHlsZVNoZWV0KCk7XG4gICAgfVxuXG4gICAgc3RhY2suYWRkKHRoaXMpO1xuICB9XG5cbiAgc3RhdGljIHNldCB0aGVtZSh2YWx1ZSkge1xuICAgIHN0YWNrLmZvckVhY2goKGNvbnRyb2xsZXIpID0+IGNvbnRyb2xsZXIuJGVsLmNsYXNzTGlzdC5yZW1vdmUodGhlbWUpKTtcbiAgICB0aGVtZSA9IHZhbHVlO1xuICAgIHN0YWNrLmZvckVhY2goKGNvbnRyb2xsZXIpID0+IGNvbnRyb2xsZXIuJGVsLmNsYXNzTGlzdC5hZGQodGhlbWUpKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgdGhlbWUoKSB7XG4gICAgcmV0dXJuIHRoZW1lO1xuICB9XG5cbiAgX2FwcGx5T3B0aW9ubmFsUGFyYW1ldGVycygkY29udGFpbmVyID0gbnVsbCwgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgaWYgKCRjb250YWluZXIpIHtcbiAgICAgIGlmICh0eXBlb2YgJGNvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgJGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJGNvbnRhaW5lcik7XG4gICAgICB9XG5cbiAgICAgICRjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXIoKSk7XG4gICAgICB0aGlzLm9uUmVuZGVyKCk7XG4gICAgfVxuXG4gICAgaWYgKGNhbGxiYWNrKSB7IHRoaXMub24oJ2NoYW5nZScsIGNhbGxiYWNrKTsgfVxuICB9XG5cbiAgcmVuZGVyKHR5cGUgPSBudWxsKSB7XG4gICAgdGhpcy4kZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoc3R5bGVzLm5zLCB0aGVtZSk7XG4gICAgaWYgKHR5cGUgIT09IG51bGwpIHsgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZCh0eXBlKTsgfVxuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgb25SZW5kZXIoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLm9uUmVzaXplKCksIDApO1xuICB9XG5cbiAgb25SZXNpemUoKSB7XG4gICAgY29uc3QgYm91bmRpbmdSZWN0ID0gdGhpcy4kZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3Qgd2lkdGggPSBib3VuZGluZ1JlY3Qud2lkdGg7XG4gICAgY29uc3QgbWV0aG9kID0gd2lkdGggPiA2MDAgPyAncmVtb3ZlJyA6ICdhZGQnO1xuXG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0W21ldGhvZF0oJ3NtYWxsJyk7XG4gIH1cblxuICAvKipcbiAgICogIEludGVyZmFjZVxuICAgKi9cbiAgYmluZEV2ZW50cygpIHt9XG59XG5cbiIsImltcG9ydCBCYXNlQ29udHJvbGxlciBmcm9tICcuL2Jhc2UtY29udHJvbGxlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1dHRvbnMgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgbGFiZWxzLCAkY29udGFpbmVyID0gbnVsbCwgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudHlwZSA9ICdidXR0b25zJztcbiAgICB0aGlzLmxlZ2VuZCA9IGxlZ2VuZCB8fMKgJyZuYnNwJzsgLy8gbm9uIGJyZWFrYWJsZSBzcGFjZSB0byBrZWVwIHJlbmRlcmluZyBjb25zaXN0ZW5jeVxuICAgIHRoaXMubGFiZWxzID0gbGFiZWxzO1xuICAgIHRoaXMuX2luZGV4ID0gbnVsbDtcblxuICAgIHN1cGVyLl9hcHBseU9wdGlvbm5hbFBhcmFtZXRlcnMoJGNvbnRhaW5lciwgY2FsbGJhY2spO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCBjb250ZW50ID0gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJsZWdlbmRcIj4ke3RoaXMubGVnZW5kfTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbm5lci13cmFwcGVyXCI+XG4gICAgICAgICR7dGhpcy5sYWJlbHMubWFwKChsYWJlbCwgaW5kZXgpID0+IHtcbiAgICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cImJ0blwiPlxuICAgICAgICAgICAgICAke2xhYmVsfVxuICAgICAgICAgICAgPC9hPmA7XG4gICAgICAgIH0pLmpvaW4oJycpfVxuICAgICAgPC9kaXY+YDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKHRoaXMudHlwZSk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuJGJ1dHRvbnMgPSBBcnJheS5mcm9tKHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4nKSk7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWUpIHtcblxuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuXG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJGJ1dHRvbnMuZm9yRWFjaCgoJGJ0biwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5sYWJlbHNbaW5kZXhdO1xuXG4gICAgICAkYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCBsYWJlbCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgQmFzZUNvbnRyb2xsZXIgZnJvbSAnLi9iYXNlLWNvbnRyb2xsZXInO1xuaW1wb3J0ICogYXMgZWxlbWVudHMgZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOdW1iZXJCb3ggZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgbWluID0gMCwgbWF4ID0gMSwgc3RlcCA9IDAuMDEsIGRlZmF1bHRWYWx1ZSA9IDAsICRjb250YWluZXIgPSBudWxsLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy50eXBlID0gJ251bWJlci1ib3gnO1xuICAgIHRoaXMubGVnZW5kID0gbGVnZW5kO1xuICAgIHRoaXMubWluID0gMDtcbiAgICB0aGlzLm1heCA9IG1heDtcbiAgICB0aGlzLnN0ZXAgPSBzdGVwO1xuICAgIHRoaXMuX3ZhbHVlID0gZGVmYXVsdFZhbHVlO1xuICAgIHRoaXMuX2lzSW50U3RlcCA9IChzdGVwICUgMSA9PT0gMCk7XG5cbiAgICBzdXBlci5fYXBwbHlPcHRpb25uYWxQYXJhbWV0ZXJzKCRjb250YWluZXIsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICB2YWx1ZSA9IHRoaXMuX2lzSW50U3RlcCA/IHBhcnNlSW50KHZhbHVlLCAxMCkgOiBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICB2YWx1ZSA9IE1hdGgubWluKHRoaXMubWF4LCBNYXRoLm1heCh0aGlzLm1pbiwgdmFsdWUpKTtcbiAgICB0aGlzLiRudW1iZXIudmFsdWUgPSB2YWx1ZTtcblxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgY29udGVudCA9IGBcbiAgICAgIDxzcGFuIGNsYXNzPVwibGVnZW5kXCI+JHt0aGlzLmxlZ2VuZH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlclwiPlxuICAgICAgICAke2VsZW1lbnRzLmFycm93TGVmdH1cbiAgICAgICAgPGlucHV0IGNsYXNzPVwibnVtYmVyXCIgdHlwZT1cIm51bWJlclwiIG1pbj1cIiR7dGhpcy5taW59XCIgbWF4PVwiJHt0aGlzLm1heH1cIiBzdGVwPVwiJHt0aGlzLnN0ZXB9XCIgdmFsdWU9XCIke3RoaXMuX3ZhbHVlfVwiIC8+XG4gICAgICAgICR7ZWxlbWVudHMuYXJyb3dSaWdodH1cbiAgICAgIDwvZGl2PlxuICAgIGA7XG5cbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcih0aGlzLnR5cGUpO1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoJ2FsaWduLXNtYWxsJyk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuJHByZXYgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuYXJyb3ctbGVmdCcpO1xuICAgIHRoaXMuJG5leHQgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuYXJyb3ctcmlnaHQnKTtcbiAgICB0aGlzLiRudW1iZXIgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwibnVtYmVyXCJdJyk7XG5cbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kcHJldi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBjb25zdCBkZWNpbWFscyA9IHRoaXMuc3RlcC50b1N0cmluZygpLnNwbGl0KCcuJylbMV07XG4gICAgICBjb25zdCBleHAgPSBkZWNpbWFscyA/IGRlY2ltYWxzLmxlbmd0aCA6IDA7XG4gICAgICBjb25zdCBtdWx0ID0gTWF0aC5wb3coMTAsIGV4cCk7XG5cbiAgICAgIGNvbnN0IGludFZhbHVlID0gTWF0aC5mbG9vcih0aGlzLnZhbHVlICogbXVsdCArIDAuNSk7XG4gICAgICBjb25zdCBpbnRTdGVwID0gTWF0aC5mbG9vcih0aGlzLnN0ZXAgKiBtdWx0ICsgMC41KTtcbiAgICAgIGNvbnN0IHZhbHVlID0gKGludFZhbHVlIC0gaW50U3RlcCkgLyBtdWx0O1xuXG4gICAgICB0aGlzLnByb3BhZ2F0ZSh2YWx1ZSk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgdGhpcy4kbmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBjb25zdCBkZWNpbWFscyA9IHRoaXMuc3RlcC50b1N0cmluZygpLnNwbGl0KCcuJylbMV07XG4gICAgICBjb25zdCBleHAgPSBkZWNpbWFscyA/IGRlY2ltYWxzLmxlbmd0aCA6IDA7XG4gICAgICBjb25zdCBtdWx0ID0gTWF0aC5wb3coMTAsIGV4cCk7XG5cbiAgICAgIGNvbnN0IGludFZhbHVlID0gTWF0aC5mbG9vcih0aGlzLnZhbHVlICogbXVsdCArIDAuNSk7XG4gICAgICBjb25zdCBpbnRTdGVwID0gTWF0aC5mbG9vcih0aGlzLnN0ZXAgKiBtdWx0ICsgMC41KTtcbiAgICAgIGNvbnN0IHZhbHVlID0gKGludFZhbHVlICsgaW50U3RlcCkgLyBtdWx0O1xuXG4gICAgICB0aGlzLnByb3BhZ2F0ZSh2YWx1ZSk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgdGhpcy4kbnVtYmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XG4gICAgICBsZXQgdmFsdWUgPSB0aGlzLiRudW1iZXIudmFsdWU7XG4gICAgICB2YWx1ZSA9IHRoaXMuX2lzSW50U3RlcCA/IHBhcnNlSW50KHZhbHVlLCAxMCkgOiBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICAgIHZhbHVlID0gTWF0aC5taW4odGhpcy5tYXgsIE1hdGgubWF4KHRoaXMubWluLCB2YWx1ZSkpO1xuXG4gICAgICB0aGlzLnByb3BhZ2F0ZSh2YWx1ZSk7XG4gICAgfSwgZmFsc2UpO1xuICB9XG5cbiAgcHJvcGFnYXRlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSB0aGlzLl92YWx1ZSkgeyByZXR1cm47IH1cblxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy4kbnVtYmVyLnZhbHVlID0gdmFsdWU7XG5cbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIHRoaXMuX3ZhbHVlKTtcbiAgfVxufVxuIiwiaW1wb3J0IEJhc2VDb250cm9sbGVyIGZyb20gJy4vYmFzZS1jb250cm9sbGVyJztcbmltcG9ydCAqIGFzIGVsZW1lbnRzIGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0QnV0dG9ucyBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IobGVnZW5kLCBvcHRpb25zLCBkZWZhdWx0VmFsdWUsICRjb250YWluZXIgPSBudWxsLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy50eXBlID0gJ3NlbGVjdC1idXR0b25zJztcbiAgICB0aGlzLmxlZ2VuZCA9IGxlZ2VuZDsgLy8gbm9uIGJyZWFrYWJsZSBzcGFjZSB0byBrZWVwIHJlbmRlcmluZyBjb25zaXN0ZW5jeVxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5fdmFsdWUgPSBkZWZhdWx0VmFsdWU7XG4gICAgY29uc3QgY3VycmVudEluZGV4ID0gdGhpcy5vcHRpb25zLmluZGV4T2YodGhpcy5fdmFsdWUpO1xuICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IGN1cnJlbnRJbmRleCA9PT0gLTEgP8KgMCA6IGN1cnJlbnRJbmRleDtcbiAgICB0aGlzLl9tYXhJbmRleCA9IHRoaXMub3B0aW9ucy5sZW5ndGggLSAxO1xuXG4gICAgc3VwZXIuX2FwcGx5T3B0aW9ubmFsUGFyYW1ldGVycygkY29udGFpbmVyLCBjYWxsYmFjayk7XG4gIH1cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG5cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjb250ZW50ID0gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJsZWdlbmRcIj4ke3RoaXMubGVnZW5kfTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbm5lci13cmFwcGVyXCI+XG4gICAgICAgICR7ZWxlbWVudHMuYXJyb3dMZWZ0fVxuICAgICAgICAke3RoaXMub3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cImJ0blwiIGRhdGEtaW5kZXg9XCIke2luZGV4fVwiIGRhdGEtdmFsdWU9XCIke29wdGlvbn1cIj5cbiAgICAgICAgICAgICAgJHtvcHRpb259XG4gICAgICAgICAgICA8L2E+YDtcbiAgICAgICAgfSkuam9pbignJyl9XG4gICAgICAgICR7ZWxlbWVudHMuYXJyb3dSaWdodH1cbiAgICAgIDwvZGl2PlxuICAgIGA7XG5cbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcih0aGlzLnR5cGUpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiRwcmV2ID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmFycm93LWxlZnQnKTtcbiAgICB0aGlzLiRuZXh0ID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmFycm93LXJpZ2h0Jyk7XG4gICAgdGhpcy4kYnRucyA9IEFycmF5LmZyb20odGhpcy4kZWwucXVlcnlTZWxlY3RvckFsbCgnLmJ0bicpKTtcbiAgICB0aGlzLl9oaWdobGlnaHRCdG4odGhpcy5fY3VycmVudEluZGV4KTtcblxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kcHJldi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fY3VycmVudEluZGV4IC0gMTtcbiAgICAgIHRoaXMucHJvcGFnYXRlKGluZGV4KTtcbiAgICB9KTtcblxuICAgIHRoaXMuJG5leHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2N1cnJlbnRJbmRleCArIDE7XG4gICAgICB0aGlzLnByb3BhZ2F0ZShpbmRleCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLiRidG5zLmZvckVhY2goKCRidG4sIGluZGV4KSA9PiB7XG4gICAgICAkYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnByb3BhZ2F0ZShpbmRleCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByb3BhZ2F0ZShpbmRleCkge1xuICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiB0aGlzLl9tYXhJbmRleCkgeyByZXR1cm47IH1cblxuICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IGluZGV4O1xuICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5vcHRpb25zW2luZGV4XTtcbiAgICB0aGlzLl9oaWdobGlnaHRCdG4odGhpcy5fY3VycmVudEluZGV4KTtcblxuICAgIHRoaXMuZW1pdCgnY2hhbmdlJywgdGhpcy5fdmFsdWUpO1xuICB9XG5cbiAgX2hpZ2hsaWdodEJ0bihhY3RpdmVJbmRleCkge1xuICAgIHRoaXMuJGJ0bnMuZm9yRWFjaCgoJGJ0biwgaW5kZXgpID0+IHtcbiAgICAgICRidG4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cbiAgICAgIGlmIChhY3RpdmVJbmRleCA9PT0gaW5kZXgpIHtcbiAgICAgICAgJGJ0bi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufSIsImltcG9ydCBCYXNlQ29udHJvbGxlciBmcm9tICcuL2Jhc2UtY29udHJvbGxlcic7XG5pbXBvcnQgKiBhcyBlbGVtZW50cyBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlbGVjdExpc3QgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgb3B0aW9ucywgZGVmYXVsdFZhbHVlLCAkY29udGFpbmVyID0gbnVsbCwgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudHlwZSA9ICdzZWxlY3QtbGlzdCc7XG4gICAgdGhpcy5sZWdlbmQgPSBsZWdlbmQ7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLl92YWx1ZSA9IGRlZmF1bHRWYWx1ZTtcbiAgICBjb25zdCBjdXJyZW50SW5kZXggPSB0aGlzLm9wdGlvbnMuaW5kZXhPZih0aGlzLl92YWx1ZSk7XG4gICAgdGhpcy5fY3VycmVudEluZGV4ID0gY3VycmVudEluZGV4ID09PSAtMSA/wqAwIDogY3VycmVudEluZGV4O1xuICAgIHRoaXMuX21heEluZGV4ID0gdGhpcy5vcHRpb25zLmxlbmd0aCAtIDE7XG5cbiAgICBzdXBlci5fYXBwbHlPcHRpb25uYWxQYXJhbWV0ZXJzKCRjb250YWluZXIsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLiRzZWxlY3QudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IHRoaXMub3B0aW9ucy5pbmRleE9mKHZhbHVlKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjb250ZW50ID0gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJsZWdlbmRcIj4ke3RoaXMubGVnZW5kfTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbm5lci13cmFwcGVyXCI+XG4gICAgICAgICR7ZWxlbWVudHMuYXJyb3dMZWZ0fVxuICAgICAgICA8c2VsZWN0PlxuICAgICAgICAke3RoaXMub3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICByZXR1cm4gYDxvcHRpb24gdmFsdWU9XCIke29wdGlvbn1cIj4ke29wdGlvbn08L29wdGlvbj5gO1xuICAgICAgICB9KS5qb2luKCcnKX1cbiAgICAgICAgPHNlbGVjdD5cbiAgICAgICAgJHtlbGVtZW50cy5hcnJvd1JpZ2h0fVxuICAgICAgPC9kaXY+XG4gICAgYDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKHRoaXMudHlwZSk7XG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZCgnYWxpZ24tc21hbGwnKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gICAgdGhpcy4kcHJldiA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy1sZWZ0Jyk7XG4gICAgdGhpcy4kbmV4dCA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy1yaWdodCcpO1xuICAgIHRoaXMuJHNlbGVjdCA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdCcpO1xuICAgIC8vIHNldCB0byBkZWZhdWx0IHZhbHVlXG4gICAgdGhpcy4kc2VsZWN0LnZhbHVlID0gdGhpcy5vcHRpb25zW3RoaXMuX2N1cnJlbnRJbmRleF07XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJHByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2N1cnJlbnRJbmRleCAtIDE7XG4gICAgICB0aGlzLnByb3BhZ2F0ZShpbmRleCk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgdGhpcy4kbmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fY3VycmVudEluZGV4ICsgMTtcbiAgICAgIHRoaXMucHJvcGFnYXRlKGluZGV4KTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICB0aGlzLiRzZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLiRzZWxlY3QudmFsdWU7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMub3B0aW9ucy5pbmRleE9mKHZhbHVlKTtcbiAgICAgIHRoaXMucHJvcGFnYXRlKGluZGV4KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByb3BhZ2F0ZShpbmRleCkge1xuICAgIGlmIChpbmRleCA8IDAgfHzCoGluZGV4ID4gdGhpcy5fbWF4SW5kZXgpIHsgcmV0dXJuOyB9XG5cbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMub3B0aW9uc1tpbmRleF07XG4gICAgdGhpcy5fY3VycmVudEluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy4kc2VsZWN0LnZhbHVlID0gdmFsdWU7XG5cbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIHZhbHVlKTtcbiAgfVxufVxuXG5cblxuXG5cbiIsImltcG9ydCBCYXNlQ29udHJvbGxlciBmcm9tICcuL2Jhc2UtY29udHJvbGxlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlciBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IobGVnZW5kLCBtaW4gPSAwLCBtYXggPSAxLCBzdGVwID0gMC4wMSwgZGVmYXVsdFZhbHVlID0gMCwgdW5pdCA9ICcnLCBzaXplID0gJ2RlZmF1bHQnLCAkY29udGFpbmVyID0gbnVsbCwgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudHlwZSA9ICdzbGlkZXInO1xuICAgIHRoaXMubGVnZW5kID0gbGVnZW5kO1xuICAgIHRoaXMubWluID0gbWluO1xuICAgIHRoaXMubWF4ID0gbWF4O1xuICAgIHRoaXMuc3RlcCA9IHN0ZXA7XG4gICAgdGhpcy51bml0ID0gdW5pdDtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgIHRoaXMuX3ZhbHVlID0gZGVmYXVsdFZhbHVlO1xuXG4gICAgc3VwZXIuX2FwcGx5T3B0aW9ubmFsUGFyYW1ldGVycygkY29udGFpbmVyLCBjYWxsYmFjayk7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuXG4gICAgaWYgKHRoaXMuJG51bWJlciAmJiB0aGlzLiRyYW5nZSkge1xuICAgICAgdGhpcy4kbnVtYmVyLnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgIHRoaXMuJHJhbmdlLnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICB9XG4gIH1cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBgXG4gICAgICA8c3BhbiBjbGFzcz1cImxlZ2VuZFwiPiR7dGhpcy5sZWdlbmR9PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImlubmVyLXdyYXBwZXJcIj5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwicmFuZ2VcIiB0eXBlPVwicmFuZ2VcIiBtaW49XCIke3RoaXMubWlufVwiIG1heD1cIiR7dGhpcy5tYXh9XCIgc3RlcD1cIiR7dGhpcy5zdGVwfVwiIHZhbHVlPVwiJHt0aGlzLnZhbHVlfVwiIC8+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJudW1iZXItd3JhcHBlclwiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgY2xhc3M9XCJudW1iZXJcIiBtaW49XCIke3RoaXMubWlufVwiIG1heD1cIiR7dGhpcy5tYXh9XCIgc3RlcD1cIiR7dGhpcy5zdGVwfVwiIHZhbHVlPVwiJHt0aGlzLnZhbHVlfVwiIC8+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1bml0XCI+JHt0aGlzLnVuaXR9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PmA7XG5cbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcih0aGlzLnR5cGUpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZChgc2xpZGVyLSR7dGhpcy5zaXplfWApO1xuXG4gICAgdGhpcy4kcmFuZ2UgID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcihgaW5wdXRbdHlwZT1cInJhbmdlXCJdYCk7XG4gICAgdGhpcy4kbnVtYmVyID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcihgaW5wdXRbdHlwZT1cIm51bWJlclwiXWApO1xuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJHJhbmdlLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBwYXJzZUZsb2F0KHRoaXMuJHJhbmdlLnZhbHVlKTtcbiAgICAgIHRoaXMuJG51bWJlci52YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIHZhbHVlKTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICB0aGlzLiRudW1iZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgLy8gQHRvZG8gLSBzaG91bGQgaGFuZGxlIG1pbiBhbmQgbWF4XG4gICAgICBjb25zdCB2YWx1ZSA9IHBhcnNlRmxvYXQodGhpcy4kbnVtYmVyLnZhbHVlKTtcbiAgICAgIHRoaXMuJHJhbmdlLnZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG5cbiAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJywgdmFsdWUpO1xuICAgIH0sIGZhbHNlKTtcbiAgfVxufVxuXG4iLCJpbXBvcnQgQmFzZUNvbnRyb2xsZXIgZnJvbSAnLi9iYXNlLWNvbnRyb2xsZXInO1xuXG5cbi8qKlxuICogRGlzcGxheSBhIHZhbHVlLCBSZWFkLW9ubHkuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHQgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgZGVmYXVsdFZhbHVlLCByZWFkb25seSA9IHRydWUsICRjb250YWluZXIgPSBudWxsLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy50eXBlID0gJ3RleHQnO1xuICAgIHRoaXMubGVnZW5kID0gbGVnZW5kO1xuICAgIHRoaXMuX3JlYWRvbmx5ID0gcmVhZG9ubHk7XG4gICAgdGhpcy5fdmFsdWUgPSBkZWZhdWx0VmFsdWU7XG5cbiAgICB0aGlzLl9hcHBseU9wdGlvbm5hbFBhcmFtZXRlcnMoJGNvbnRhaW5lciwgY2FsbGJhY2spO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuJGlucHV0LnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCByZWFkb25seSA9IHRoaXMuX3JlYWRvbmx5ID8gJ3JlYWRvbmx5JyA6ICcnXG4gICAgY29uc3QgY29udGVudCA9IGBcbiAgICAgIDxzcGFuIGNsYXNzPVwibGVnZW5kXCI+JHt0aGlzLmxlZ2VuZH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlclwiPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJ0ZXh0XCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIiR7dGhpcy5fdmFsdWV9XCIgJHtyZWFkb25seX0gLz5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG5cbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcih0aGlzLnR5cGUpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiRpbnB1dCA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy50ZXh0Jyk7XG5cbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoKSA9PiB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHRoaXMuJGlucHV0LnZhbHVlO1xuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCB0aGlzLl92YWx1ZSk7XG4gICAgfSwgZmFsc2UpO1xuICB9XG59XG4iLCJpbXBvcnQgQmFzZUNvbnRyb2xsZXIgZnJvbSAnLi9iYXNlLWNvbnRyb2xsZXInO1xuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi91dGlscy9zdHlsZXMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpdGxlIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihsZWdlbmQsICRjb250YWluZXIgPSBudWxsKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudHlwZSA9ICd0aXRsZSc7XG4gICAgdGhpcy5sZWdlbmQgPSBsZWdlbmQ7XG5cbiAgICBzdXBlci5fYXBwbHlPcHRpb25uYWxQYXJhbWV0ZXJzKCRjb250YWluZXIpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCBjb250ZW50ID0gYDxzcGFuIGNsYXNzPVwibGVnZW5kXCI+JHt0aGlzLmxlZ2VuZH08L3NwYW4+YDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKHRoaXMudHlwZSk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxufVxuXG4iLCJpbXBvcnQgQmFzZUNvbnRyb2xsZXIgZnJvbSAnLi9iYXNlLWNvbnRyb2xsZXInO1xuaW1wb3J0ICogYXMgZWxlbWVudHMgZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2dnbGUgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgYWN0aXZlID0gZmFsc2UsICRjb250YWluZXIgPSBmYWxzZSwgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudHlwZSA9ICd0b2dnbGUnO1xuICAgIHRoaXMubGVnZW5kID0gbGVnZW5kO1xuICAgIHRoaXMuX2FjdGl2ZSA9IGFjdGl2ZTtcblxuICAgIHN1cGVyLl9hcHBseU9wdGlvbm5hbFBhcmFtZXRlcnMoJGNvbnRhaW5lciwgY2FsbGJhY2spO1xuICB9XG5cbiAgc2V0IGFjdGl2ZShib29sKSB7XG4gICAgdGhpcy5fYWN0aXZlID0gYm9vbDtcbiAgICB0aGlzLl91cGRhdGVCdG4oKTtcbiAgfVxuXG4gIGdldCBhY3RpdmUoKSB7IHJldHVybiB0aGlzLl9hY3RpdmU7IH1cblxuICBfdXBkYXRlQnRuKCkge1xuICAgIHZhciBtZXRob2QgPSB0aGlzLmFjdGl2ZSA/ICdhZGQnIDogJ3JlbW92ZSc7XG4gICAgdGhpcy4kdG9nZ2xlLmNsYXNzTGlzdFttZXRob2RdKCdhY3RpdmUnKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgY29udGVudCA9IGBcbiAgICAgIDxzcGFuIGNsYXNzPVwibGVnZW5kXCI+JHt0aGlzLmxlZ2VuZH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlclwiPlxuICAgICAgICAke2VsZW1lbnRzLnRvZ2dsZX1cbiAgICAgIDwvZGl2PmA7XG5cbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcih0aGlzLnR5cGUpO1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoJ2FsaWduLXNtYWxsJyk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuJHRvZ2dsZSA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy50b2dnbGUtZWxlbWVudCcpO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIHRoaXMuYWN0aXZlID0gdGhpcy5fYWN0aXZlOyAvLyBpbml0aWFsaXplIHN0YXRlXG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmFjdGl2ZSA9ICF0aGlzLmFjdGl2ZTtcbiAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJywgdGhpcy5hY3RpdmUpO1xuICAgIH0pO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiIC53YXZlcy1iYXNpYy1jb250cm9sbGVycyB7IHdpZHRoOiAxMDAlOyBtYXgtd2lkdGg6IDgwMHB4OyBoZWlnaHQ6IDMwcHg7IHBhZGRpbmc6IDNweDsgbWFyZ2luOiA0cHggMDsgYmFja2dyb3VuZC1jb2xvcjogI2VmZWZlZjsgYm9yZGVyOiAxcHggc29saWQgI2FhYWFhYTsgYm94LXNpemluZzogYm9yZGVyLWJveDsgYm9yZGVyLXJhZGl1czogMnB4OyBkaXNwbGF5OiBibG9jazsgY29sb3I6ICM0NjQ2NDY7IH0gLndhdmVzLWJhc2ljLWNvbnRyb2xsZXJzIC5sZWdlbmQgeyBmb250OiBpdGFsaWMgYm9sZCAxMnB4IGFyaWFsOyBsaW5lLWhlaWdodDogMjJweDsgb3ZlcmZsb3c6IGhpZGRlbjsgdGV4dC1hbGlnbjogcmlnaHQ7IHBhZGRpbmc6IDAgOHB4IDAgMDsgZGlzcGxheTogYmxvY2s7IGJveC1zaXppbmc6IGJvcmRlci1ib3g7IHdpZHRoOiAyNCU7IGZsb2F0OiBsZWZ0OyB3aGl0ZS1zcGFjZTogbm93cmFwOyAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lOyAtbW96LXVzZXItc2VsZWN0OiBub25lOyAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7IC1vLXVzZXItc2VsZWN0OiBub25lOyB1c2VyLXNlbGVjdDogbm9uZTsgfSAud2F2ZXMtYmFzaWMtY29udHJvbGxlcnMgLmlubmVyLXdyYXBwZXIgeyBkaXNwbGF5OiAtd2Via2l0LWlubGluZS1mbGV4OyBkaXNwbGF5OiBpbmxpbmUtZmxleDsgLXdlYmtpdC1mbGV4LXdyYXA6IG5vLXdyYXA7IGZsZXgtd3JhcDogbm8td3JhcDsgd2lkdGg6IDc2JTsgZmxvYXQ6IGxlZnQ7IH0gLndhdmVzLWJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsOm5vdCguYWxpZ24tc21hbGwpIHsgaGVpZ2h0OiBhdXRvOyB9IC53YXZlcy1iYXNpYy1jb250cm9sbGVycy5zbWFsbDpub3QoLmFsaWduLXNtYWxsKSAubGVnZW5kIHsgd2lkdGg6IDEwMCU7IGZsb2F0OiBub25lOyB0ZXh0LWFsaWduOiBsZWZ0OyB9IC53YXZlcy1iYXNpYy1jb250cm9sbGVycy5zbWFsbDpub3QoLmFsaWduLXNtYWxsKSAuaW5uZXItd3JhcHBlciB7IHdpZHRoOiAxMDAlOyBmbG9hdDogbm9uZTsgfSAud2F2ZXMtYmFzaWMtY29udHJvbGxlcnMuc21hbGwuYWxpZ24tc21hbGwgLmxlZ2VuZCB7IGRpc3BsYXk6IGJsb2NrOyBtYXJnaW4tcmlnaHQ6IDIwcHg7IHRleHQtYWxpZ246IGxlZnQ7IH0gLndhdmVzLWJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsLmFsaWduLXNtYWxsIC5pbm5lci13cmFwcGVyIHsgZGlzcGxheTogaW5saW5lLWJsb2NrOyB3aWR0aDogYXV0bzsgfSAud2F2ZXMtYmFzaWMtY29udHJvbGxlcnMgLmFycm93LXJpZ2h0LCAud2F2ZXMtYmFzaWMtY29udHJvbGxlcnMgLmFycm93LWxlZnQgeyBib3JkZXItcmFkaXVzOiAycHg7IHdpZHRoOiAxNHB4OyBoZWlnaHQ6IDIycHg7IGN1cnNvcjogcG9pbnRlcjsgYmFja2dyb3VuZC1jb2xvcjogIzQ2NDY0NjsgfSAud2F2ZXMtYmFzaWMtY29udHJvbGxlcnMgLmFycm93LXJpZ2h0IGxpbmUsIC53YXZlcy1iYXNpYy1jb250cm9sbGVycyAuYXJyb3ctbGVmdCBsaW5lIHsgc3Ryb2tlLXdpZHRoOiAzcHg7IHN0cm9rZTogI2ZmZmZmZjsgfSAud2F2ZXMtYmFzaWMtY29udHJvbGxlcnMgLmFycm93LXJpZ2h0OmhvdmVyLCAud2F2ZXMtYmFzaWMtY29udHJvbGxlcnMgLmFycm93LWxlZnQ6aG92ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjNjg2ODY4OyB9IC53YXZlcy1iYXNpYy1jb250cm9sbGVycyAuYXJyb3ctcmlnaHQ6YWN0aXZlLCAud2F2ZXMtYmFzaWMtY29udHJvbGxlcnMgLmFycm93LWxlZnQ6YWN0aXZlIHsgYmFja2dyb3VuZC1jb2xvcjogIzkwOTA5MDsgfSAud2F2ZXMtYmFzaWMtY29udHJvbGxlcnMgLnRvZ2dsZS1lbGVtZW50IHsgd2lkdGg6IDIycHg7IGhlaWdodDogMjJweDsgYm9yZGVyLXJhZGl1czogMnB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjNDY0NjQ2OyBjdXJzb3I6IHBvaW50ZXI7IH0gLndhdmVzLWJhc2ljLWNvbnRyb2xsZXJzIC50b2dnbGUtZWxlbWVudDpob3ZlciB7IGJhY2tncm91bmQtY29sb3I6ICM2ODY4Njg7IH0gLndhdmVzLWJhc2ljLWNvbnRyb2xsZXJzIC50b2dnbGUtZWxlbWVudCBsaW5lIHsgc3Ryb2tlLXdpZHRoOiAzcHg7IH0gLndhdmVzLWJhc2ljLWNvbnRyb2xsZXJzIC50b2dnbGUtZWxlbWVudCAueCB7IGRpc3BsYXk6IG5vbmU7IH0gLndhdmVzLWJhc2ljLWNvbnRyb2xsZXJzIC50b2dnbGUtZWxlbWVudC5hY3RpdmUgLnggeyBkaXNwbGF5OiBibG9jazsgfSAud2F2ZXMtYmFzaWMtY29udHJvbGxlcnMgLmJ0biB7IGRpc3BsYXk6IGJsb2NrOyB0ZXh0LWFsaWduOiBjZW50ZXI7IGZvbnQ6IG5vcm1hbCBub3JtYWwgMTJweCBhcmlhbDsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyBoZWlnaHQ6IDIycHg7IGxpbmUtaGVpZ2h0OiAyMnB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjNDY0NjQ2OyBib3JkZXI6IG5vbmU7IGNvbG9yOiAjZmZmZmZmOyBtYXJnaW46IDAgNHB4IDAgMDsgcGFkZGluZzogMDsgYm94LXNpemluZzogYm9yZGVyLWJveDsgYm9yZGVyLXJhZGl1czogMnB4OyBjdXJzb3I6IHBvaW50ZXI7IC13ZWJraXQtZmxleC1ncm93OiAxOyBmbGV4LWdyb3c6IDE7IH0gLndhdmVzLWJhc2ljLWNvbnRyb2xsZXJzIC5idG46bGFzdC1jaGlsZCB7IG1hcmdpbjogMDsgfSAud2F2ZXMtYmFzaWMtY29udHJvbGxlcnMgLmJ0bjpob3ZlciB7IGJhY2tncm91bmQtY29sb3I6ICM2ODY4Njg7IH0gLndhdmVzLWJhc2ljLWNvbnRyb2xsZXJzIC5idG46YWN0aXZlLCAud2F2ZXMtYmFzaWMtY29udHJvbGxlcnMgLmJ0bi5hY3RpdmUgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjOTA5MDkwOyB9IC53YXZlcy1iYXNpYy1jb250cm9sbGVycyAuYnRuOmZvY3VzIHsgb3V0bGluZTogbm9uZTsgfSAud2F2ZXMtYmFzaWMtY29udHJvbGxlcnMgLm51bWJlciB7IGhlaWdodDogMjJweDsgZGlzcGxheTogaW5saW5lLWJsb2NrOyBwb3NpdGlvbjogcmVsYXRpdmU7IGZvbnQ6IG5vcm1hbCBub3JtYWwgMTJweCBhcmlhbDsgdmVydGljYWwtYWxpZ246IHRvcDsgYm9yZGVyOiBub25lOyBiYWNrZ3JvdW5kOiBub25lOyBjb2xvcjogIzQ2NDY0NjsgcGFkZGluZzogMCA0cHg7IG1hcmdpbjogMDsgYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTsgYm9yZGVyLXJhZGl1czogMnB4OyBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9IC53YXZlcy1iYXNpYy1jb250cm9sbGVycyAubnVtYmVyOmZvY3VzIHsgb3V0bGluZTogbm9uZTsgfSAud2F2ZXMtYmFzaWMtY29udHJvbGxlcnMgc2VsZWN0IHsgaGVpZ2h0OiAyMnB4OyBsaW5lLWhlaWdodDogMjJweDsgYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTsgYm9yZGVyLXJhZGl1czogMnB4OyBib3JkZXI6IG5vbmU7IHZlcnRpY2FsLWFsaWduOiB0b3A7IHBhZGRpbmc6IDA7IG1hcmdpbjogMDsgfSAud2F2ZXMtYmFzaWMtY29udHJvbGxlcnMgc2VsZWN0OmZvY3VzIHsgb3V0bGluZTogbm9uZTsgfSAud2F2ZXMtYmFzaWMtY29udHJvbGxlcnMgaW5wdXRbdHlwZT10ZXh0XSB7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDIycHg7IGxpbmUtaGVpZ2h0OiAyMnB4OyBib3JkZXI6IDA7IHBhZGRpbmc6IDAgNHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5OyBib3JkZXItcmFkaXVzOiAycHg7IGNvbG9yOiAjNTY1NjU2OyB9IC53YXZlcy1iYXNpYy1jb250cm9sbGVycy50aXRsZSB7IGJvcmRlcjogbm9uZSAhaW1wb3J0YW50OyBtYXJnaW4tYm90dG9tOiAwOyBtYXJnaW4tdG9wOiA4cHg7IHBhZGRpbmctdG9wOiA4cHg7IHBhZGRpbmctYm90dG9tOiAwOyBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50OyBoZWlnaHQ6IDI1cHg7IH0gLndhdmVzLWJhc2ljLWNvbnRyb2xsZXJzLnRpdGxlIC5sZWdlbmQgeyBmb250OiBub3JtYWwgYm9sZCAxM3B4IGFyaWFsOyBoZWlnaHQ6IDEwMCU7IG92ZXJmbG93OiBoaWRkZW47IHRleHQtYWxpZ246IGxlZnQ7IHBhZGRpbmc6IDA7IHdpZHRoOiAxMDAlOyBib3gtc2l6aW5nOiBib3JkZXItYm94OyAtd2Via2l0LWZsZXgtZ3JvdzogMTsgZmxleC1ncm93OiAxOyB9IC53YXZlcy1iYXNpYy1jb250cm9sbGVycy5zbGlkZXIgLnJhbmdlIHsgaGVpZ2h0OiAyMnB4OyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IG1hcmdpbjogMDsgLXdlYmtpdC1mbGV4LWdyb3c6IDQ7IGZsZXgtZ3JvdzogNDsgfSAud2F2ZXMtYmFzaWMtY29udHJvbGxlcnMuc2xpZGVyIC5udW1iZXItd3JhcHBlciB7IGRpc3BsYXk6IGlubGluZTsgaGVpZ2h0OiAyMnB4OyB0ZXh0LWFsaWduOiByaWdodDsgLXdlYmtpdC1mbGV4LWdyb3c6IDM7IGZsZXgtZ3JvdzogMzsgfSAud2F2ZXMtYmFzaWMtY29udHJvbGxlcnMuc2xpZGVyIC5udW1iZXItd3JhcHBlciAubnVtYmVyIHsgbGVmdDogNXB4OyB3aWR0aDogNTRweDsgdGV4dC1hbGlnbjogcmlnaHQ7IH0gLndhdmVzLWJhc2ljLWNvbnRyb2xsZXJzLnNsaWRlciAubnVtYmVyLXdyYXBwZXIgLnVuaXQgeyBmb250OiBpdGFsaWMgbm9ybWFsIDEycHggYXJpYWw7IGxpbmUtaGVpZ2h0OiAyMnB4OyBoZWlnaHQ6IDIycHg7IHdpZHRoOiAzMHB4OyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHBvc2l0aW9uOiByZWxhdGl2ZTsgcGFkZGluZy1sZWZ0OiA1cHg7IHBhZGRpbmctcmlnaHQ6IDVweDsgY29sb3I6ICM1NjU2NTY7IH0gLndhdmVzLWJhc2ljLWNvbnRyb2xsZXJzLnNsaWRlciAubnVtYmVyLXdyYXBwZXIgLnVuaXQgc3VwIHsgbGluZS1oZWlnaHQ6IDdweDsgfSAud2F2ZXMtYmFzaWMtY29udHJvbGxlcnMuc2xpZGVyLnNsaWRlci1sYXJnZSAucmFuZ2UgeyAtd2Via2l0LWZsZXgtZ3JvdzogNTA7IGZsZXgtZ3JvdzogNTA7IH0gLndhdmVzLWJhc2ljLWNvbnRyb2xsZXJzLnNsaWRlci5zbGlkZXItbGFyZ2UgLm51bWJlci13cmFwcGVyIHsgLXdlYmtpdC1mbGV4LWdyb3c6IDE7IGZsZXgtZ3JvdzogMTsgfSAud2F2ZXMtYmFzaWMtY29udHJvbGxlcnMuc2xpZGVyLnNsaWRlci1zbWFsbCAucmFuZ2UgeyAtd2Via2l0LWZsZXgtZ3JvdzogMTsgZmxleC1ncm93OiAxOyB9IC53YXZlcy1iYXNpYy1jb250cm9sbGVycy5zbGlkZXIuc2xpZGVyLXNtYWxsIC5udW1iZXItd3JhcHBlciB7IC13ZWJraXQtZmxleC1ncm93OiA3OyBmbGV4LWdyb3c6IDc7IH0gLndhdmVzLWJhc2ljLWNvbnRyb2xsZXJzLm51bWJlci1ib3ggLm51bWJlciB7IHdpZHRoOiAxMjBweDsgbWFyZ2luOiAwIDEwcHg7IHZlcnRpY2FsLWFsaWduOiB0b3A7IH0gLndhdmVzLWJhc2ljLWNvbnRyb2xsZXJzLnNlbGVjdC1saXN0IHNlbGVjdCB7IG1hcmdpbjogMCAxMHB4OyB3aWR0aDogMTIwcHg7IGZvbnQ6IG5vcm1hbCBub3JtYWwgMTJweCBhcmlhbDsgY29sb3I6ICM0NjQ2NDY7IH0gLndhdmVzLWJhc2ljLWNvbnRyb2xsZXJzLnNlbGVjdC1idXR0b25zIC5idG46Zmlyc3Qtb2YtdHlwZSB7IG1hcmdpbi1sZWZ0OiA0cHg7IH0gLndhdmVzLWJhc2ljLWNvbnRyb2xsZXJzLmluZm8gaW5wdXRbdHlwZT10ZXh0XSB7IGZvbnQ6IG5vcm1hbCBub3JtYWwgMTJweCBhcmlhbDsgY29sb3I6ICM0NjQ2NDY7IH0gLndhdmVzLWJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjMzYzNjM2OyBib3JkZXI6IDFweCBzb2xpZCAjNTg1ODU4OyBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjk1KTsgfSAud2F2ZXMtYmFzaWMtY29udHJvbGxlcnMuZGFyayAudG9nZ2xlLWVsZW1lbnQgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmOyB9IC53YXZlcy1iYXNpYy1jb250cm9sbGVycy5kYXJrIC50b2dnbGUtZWxlbWVudCBsaW5lIHsgc3Ryb2tlOiAjMzYzNjM2OyB9IC53YXZlcy1iYXNpYy1jb250cm9sbGVycy5kYXJrIC50b2dnbGUtZWxlbWVudDpob3ZlciB7IGJhY2tncm91bmQtY29sb3I6ICNjZGNkY2Q7IH0gLndhdmVzLWJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLmFycm93LXJpZ2h0LCAud2F2ZXMtYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYXJyb3ctbGVmdCB7IGhlaWdodDogMjJweDsgYmFja2dyb3VuZC1jb2xvcjogI2VmZWZlZjsgfSAud2F2ZXMtYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYXJyb3ctcmlnaHQgbGluZSwgLndhdmVzLWJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLmFycm93LWxlZnQgbGluZSB7IHN0cm9rZTogIzM2MzYzNjsgfSAud2F2ZXMtYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYXJyb3ctcmlnaHQ6aG92ZXIsIC53YXZlcy1iYXNpYy1jb250cm9sbGVycy5kYXJrIC5hcnJvdy1sZWZ0OmhvdmVyIHsgYmFja2dyb3VuZC1jb2xvcjogI2NkY2RjZDsgfSAud2F2ZXMtYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYXJyb3ctcmlnaHQ6YWN0aXZlLCAud2F2ZXMtYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYXJyb3ctbGVmdDphY3RpdmUgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjYWJhYmFiOyB9IC53YXZlcy1iYXNpYy1jb250cm9sbGVycy5kYXJrIC5udW1iZXIsIC53YXZlcy1iYXNpYy1jb250cm9sbGVycy5kYXJrIHNlbGVjdCwgLndhdmVzLWJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgaW5wdXRbdHlwZT10ZXh0XSB7IGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOTUpOyBiYWNrZ3JvdW5kLWNvbG9yOiAjNDU0NTQ1OyB9IC53YXZlcy1iYXNpYy1jb250cm9sbGVycy5kYXJrIC5idG4geyBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmOyBjb2xvcjogIzM2MzYzNjsgfSAud2F2ZXMtYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYnRuOmhvdmVyIHsgYmFja2dyb3VuZC1jb2xvcjogI2NkY2RjZDsgfSAud2F2ZXMtYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYnRuOmFjdGl2ZSwgLndhdmVzLWJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLmJ0bi5hY3RpdmUgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjYWJhYmFiOyB9IC53YXZlcy1iYXNpYy1jb250cm9sbGVycy5kYXJrLnNsaWRlciAuaW5uZXItd3JhcHBlciAubnVtYmVyLXdyYXBwZXIgLnVuaXQgeyBjb2xvcjogI2JjYmNiYzsgfSBcIjsiLCJcbmV4cG9ydCBjb25zdCB0b2dnbGUgPSBgXG4gIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzPVwidG9nZ2xlLWVsZW1lbnRcIiB2ZXJzaW9uPVwiMS4xXCIgdmlld0JveD1cIjAgMCA1MCA1MFwiIHByZXNlcnZlQXNwZWN0UmF0aW89XCJub25lXCI+XG4gICAgICA8ZyBjbGFzcz1cInhcIj5cbiAgICAgICAgPGxpbmUgeDE9XCI4XCIgeTE9XCI4XCIgeDI9XCI0MlwiIHkyPVwiNDJcIiBzdHJva2U9XCJ3aGl0ZVwiIC8+XG4gICAgICAgIDxsaW5lIHgxPVwiOFwiIHkxPVwiNDJcIiB4Mj1cIjQyXCIgeTI9XCI4XCIgc3Ryb2tlPVwid2hpdGVcIiAvPlxuICAgICAgPC9nPlxuICA8L3N2Zz5cbmA7XG5cbmV4cG9ydCBjb25zdCBhcnJvd1JpZ2h0ID0gYFxuICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzcz1cImFycm93LXJpZ2h0XCIgdmVyc2lvbj1cIjEuMVwiIHZpZXdCb3g9XCIwIDAgNTAgNTBcIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwibm9uZVwiPlxuICAgIDxsaW5lIHgxPVwiMTBcIiB5MT1cIjEwXCIgeDI9XCI0MFwiIHkyPVwiMjVcIiAvPlxuICAgIDxsaW5lIHgxPVwiMTBcIiB5MT1cIjQwXCIgeDI9XCI0MFwiIHkyPVwiMjVcIiAvPlxuICA8L3N2Zz5cbmA7XG5cbmV4cG9ydCBjb25zdCBhcnJvd0xlZnQgPSBgXG4gIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzPVwiYXJyb3ctbGVmdFwiIHZlcnNpb249XCIxLjFcIiB2aWV3Qm94PVwiMCAwIDUwIDUwXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cIm5vbmVcIj5cbiAgICA8bGluZSB4MT1cIjQwXCIgeTE9XCIxMFwiIHgyPVwiMTBcIiB5Mj1cIjI1XCIgLz5cbiAgICA8bGluZSB4MT1cIjQwXCIgeTE9XCI0MFwiIHgyPVwiMTBcIiB5Mj1cIjI1XCIgLz5cbiAgPC9zdmc+XG5gOyIsImltcG9ydCBwa2cgZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJztcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi4vY3NzL3N0eWxlcy5qcyc7XG5cbmV4cG9ydCBjb25zdCBucyA9IHBrZy5uYW1lO1xuXG5jb25zdCBuc0NsYXNzID0gYC4ke25zfWA7XG5sZXQgX2Rpc2FibGUgPSBmYWxzZTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gIF9kaXNhYmxlID0gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydFN0eWxlU2hlZXQoKSB7XG4gIGlmIChfZGlzYWJsZSkgeyByZXR1cm47IH1cbiAgY29uc3QgJHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICAkc3R5bGUuc2V0QXR0cmlidXRlKCdkYXRhLW5hbWVzcGFjZScsIG5zKTtcbiAgJHN0eWxlLmlubmVySFRNTCA9IHN0eWxlcztcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCRzdHlsZSk7XG59XG5cbiIsImltcG9ydCAqIGFzIHN0eWxlcyBmcm9tICcuL3V0aWxzL3N0eWxlcyc7XG5cbi8vIGV4cG9zZSBmb3IgcGx1Z2luc1xuaW1wb3J0IEJhc2VDb250cm9sbGVyIGZyb20gJy4vY29tcG9uZW50cy9iYXNlLWNvbnRyb2xsZXInO1xuaW1wb3J0IEJ1dHRvbnMgZnJvbSAnLi9jb21wb25lbnRzL2J1dHRvbnMnO1xuaW1wb3J0IFRleHQgZnJvbSAnLi9jb21wb25lbnRzL3RleHQnO1xuaW1wb3J0IE51bWJlckJveCBmcm9tICcuL2NvbXBvbmVudHMvbnVtYmVyLWJveCc7XG5pbXBvcnQgU2VsZWN0QnV0dG9ucyBmcm9tICcuL2NvbXBvbmVudHMvc2VsZWN0LWJ1dHRvbnMnO1xuaW1wb3J0IFNlbGVjdExpc3QgZnJvbSAnLi9jb21wb25lbnRzL3NlbGVjdC1saXN0JztcbmltcG9ydCBTbGlkZXIgZnJvbSAnLi9jb21wb25lbnRzL3NsaWRlcic7XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi9jb21wb25lbnRzL3RpdGxlJztcbmltcG9ydCBUb2dnbGUgZnJvbSAnLi9jb21wb25lbnRzL3RvZ2dsZSc7XG4vLyBCcmVha3BvaW50OiByZXF1aXJlKCcuL2Rpc3QvYnJlYWtwb2ludCcpLFxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIEJhc2VDb250cm9sbGVyLFxuICBCdXR0b25zLFxuICBUZXh0LFxuICBOdW1iZXJCb3gsXG4gIFNlbGVjdEJ1dHRvbnMsXG4gIFNlbGVjdExpc3QsXG4gIFNsaWRlcixcbiAgVGl0bGUsXG4gIFRvZ2dsZSxcblxuICAvLyBnbG9iYWwgY29uZmlndXJhdGlvblxuICBzZXRUaGVtZSh0aGVtZSkge1xuICAgIEJhc2VDb250cm9sbGVyLnRoZW1lID0gdGhlbWU7XG4gIH0sXG4gIGRpc2FibGVTdHlsZXMoKSB7XG4gICAgc3R5bGVzLmRpc2FibGUoKTtcbiAgfSxcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZlwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9zZXRcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9PYmplY3QkZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIilbXCJkZWZhdWx0XCJdO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuXG4gICAgICBfT2JqZWN0JGRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KSgpO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX09iamVjdCRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3JcIilbXCJkZWZhdWx0XCJdO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHtcbiAgdmFyIF9hZ2FpbiA9IHRydWU7XG5cbiAgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7XG4gICAgdmFyIG9iamVjdCA9IF94LFxuICAgICAgICBwcm9wZXJ0eSA9IF94MixcbiAgICAgICAgcmVjZWl2ZXIgPSBfeDM7XG4gICAgX2FnYWluID0gZmFsc2U7XG4gICAgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG4gICAgdmFyIGRlc2MgPSBfT2JqZWN0JGdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTtcblxuICAgIGlmIChkZXNjID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTtcblxuICAgICAgaWYgKHBhcmVudCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3ggPSBwYXJlbnQ7XG4gICAgICAgIF94MiA9IHByb3BlcnR5O1xuICAgICAgICBfeDMgPSByZWNlaXZlcjtcbiAgICAgICAgX2FnYWluID0gdHJ1ZTtcbiAgICAgICAgZGVzYyA9IHBhcmVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgY29udGludWUgX2Z1bmN0aW9uO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoXCJ2YWx1ZVwiIGluIGRlc2MpIHtcbiAgICAgIHJldHVybiBkZXNjLnZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7XG5cbiAgICAgIGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9PYmplY3QkY3JlYXRlID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvY3JlYXRlXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9PYmplY3Qkc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpW1wiZGVmYXVsdFwiXTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmdW5jdGlvbiAoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gX09iamVjdCRjcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIF9PYmplY3Qkc2V0UHJvdG90eXBlT2YgPyBfT2JqZWN0JHNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59O1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICBcImRlZmF1bHRcIjogb2JqXG4gIH07XG59O1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkge1xuICAgIHJldHVybiBvYmo7XG4gIH0gZWxzZSB7XG4gICAgdmFyIG5ld09iaiA9IHt9O1xuXG4gICAgaWYgKG9iaiAhPSBudWxsKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldO1xuICAgICAgfVxuICAgIH1cblxuICAgIG5ld09ialtcImRlZmF1bHRcIl0gPSBvYmo7XG4gICAgcmV0dXJuIG5ld09iajtcbiAgfVxufTtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LmFycmF5LmZyb20nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kLmNvcmUnKS5BcnJheS5mcm9tOyIsInZhciAkID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZShQLCBEKXtcbiAgcmV0dXJuICQuY3JlYXRlKFAsIEQpO1xufTsiLCJ2YXIgJCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvJCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKXtcbiAgcmV0dXJuICQuc2V0RGVzYyhpdCwga2V5LCBkZXNjKTtcbn07IiwidmFyICQgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpe1xuICByZXR1cm4gJC5nZXREZXNjKGl0LCBrZXkpO1xufTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQuY29yZScpLk9iamVjdC5zZXRQcm90b3R5cGVPZjsiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc2V0Jyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5zZXQudG8tanNvbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzLyQuY29yZScpLlNldDsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH07IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKCFpc09iamVjdChpdCkpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59OyIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi8kLmNvZicpXG4gICwgVEFHID0gcmVxdWlyZSgnLi8kLndrcycpKCd0b1N0cmluZ1RhZycpXG4gIC8vIEVTMyB3cm9uZyBoZXJlXG4gICwgQVJHID0gY29mKGZ1bmN0aW9uKCl7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgTywgVCwgQjtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKFQgPSAoTyA9IE9iamVjdChpdCkpW1RBR10pID09ICdzdHJpbmcnID8gVFxuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQVJHID8gY29mKE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKEIgPSBjb2YoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiBCO1xufTsiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciAkICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGhpZGUgICAgICAgICA9IHJlcXVpcmUoJy4vJC5oaWRlJylcbiAgLCByZWRlZmluZUFsbCAgPSByZXF1aXJlKCcuLyQucmVkZWZpbmUtYWxsJylcbiAgLCBjdHggICAgICAgICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCBzdHJpY3ROZXcgICAgPSByZXF1aXJlKCcuLyQuc3RyaWN0LW5ldycpXG4gICwgZGVmaW5lZCAgICAgID0gcmVxdWlyZSgnLi8kLmRlZmluZWQnKVxuICAsIGZvck9mICAgICAgICA9IHJlcXVpcmUoJy4vJC5mb3Itb2YnKVxuICAsICRpdGVyRGVmaW5lICA9IHJlcXVpcmUoJy4vJC5pdGVyLWRlZmluZScpXG4gICwgc3RlcCAgICAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXItc3RlcCcpXG4gICwgSUQgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLnVpZCcpKCdpZCcpXG4gICwgJGhhcyAgICAgICAgID0gcmVxdWlyZSgnLi8kLmhhcycpXG4gICwgaXNPYmplY3QgICAgID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpXG4gICwgc2V0U3BlY2llcyAgID0gcmVxdWlyZSgnLi8kLnNldC1zcGVjaWVzJylcbiAgLCBERVNDUklQVE9SUyAgPSByZXF1aXJlKCcuLyQuZGVzY3JpcHRvcnMnKVxuICAsIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgaXNPYmplY3RcbiAgLCBTSVpFICAgICAgICAgPSBERVNDUklQVE9SUyA/ICdfcycgOiAnc2l6ZSdcbiAgLCBpZCAgICAgICAgICAgPSAwO1xuXG52YXIgZmFzdEtleSA9IGZ1bmN0aW9uKGl0LCBjcmVhdGUpe1xuICAvLyByZXR1cm4gcHJpbWl0aXZlIHdpdGggcHJlZml4XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJyA/IGl0IDogKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyA/ICdTJyA6ICdQJykgKyBpdDtcbiAgaWYoISRoYXMoaXQsIElEKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IGlkIHRvIGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIGlkXG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG9iamVjdCBpZFxuICAgIGhpZGUoaXQsIElELCArK2lkKTtcbiAgLy8gcmV0dXJuIG9iamVjdCBpZCB3aXRoIHByZWZpeFxuICB9IHJldHVybiAnTycgKyBpdFtJRF07XG59O1xuXG52YXIgZ2V0RW50cnkgPSBmdW5jdGlvbih0aGF0LCBrZXkpe1xuICAvLyBmYXN0IGNhc2VcbiAgdmFyIGluZGV4ID0gZmFzdEtleShrZXkpLCBlbnRyeTtcbiAgaWYoaW5kZXggIT09ICdGJylyZXR1cm4gdGhhdC5faVtpbmRleF07XG4gIC8vIGZyb3plbiBvYmplY3QgY2FzZVxuICBmb3IoZW50cnkgPSB0aGF0Ll9mOyBlbnRyeTsgZW50cnkgPSBlbnRyeS5uKXtcbiAgICBpZihlbnRyeS5rID09IGtleSlyZXR1cm4gZW50cnk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDb25zdHJ1Y3RvcjogZnVuY3Rpb24od3JhcHBlciwgTkFNRSwgSVNfTUFQLCBBRERFUil7XG4gICAgdmFyIEMgPSB3cmFwcGVyKGZ1bmN0aW9uKHRoYXQsIGl0ZXJhYmxlKXtcbiAgICAgIHN0cmljdE5ldyh0aGF0LCBDLCBOQU1FKTtcbiAgICAgIHRoYXQuX2kgPSAkLmNyZWF0ZShudWxsKTsgLy8gaW5kZXhcbiAgICAgIHRoYXQuX2YgPSB1bmRlZmluZWQ7ICAgICAgLy8gZmlyc3QgZW50cnlcbiAgICAgIHRoYXQuX2wgPSB1bmRlZmluZWQ7ICAgICAgLy8gbGFzdCBlbnRyeVxuICAgICAgdGhhdFtTSVpFXSA9IDA7ICAgICAgICAgICAvLyBzaXplXG4gICAgICBpZihpdGVyYWJsZSAhPSB1bmRlZmluZWQpZm9yT2YoaXRlcmFibGUsIElTX01BUCwgdGhhdFtBRERFUl0sIHRoYXQpO1xuICAgIH0pO1xuICAgIHJlZGVmaW5lQWxsKEMucHJvdG90eXBlLCB7XG4gICAgICAvLyAyMy4xLjMuMSBNYXAucHJvdG90eXBlLmNsZWFyKClcbiAgICAgIC8vIDIzLjIuMy4yIFNldC5wcm90b3R5cGUuY2xlYXIoKVxuICAgICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCl7XG4gICAgICAgIGZvcih2YXIgdGhhdCA9IHRoaXMsIGRhdGEgPSB0aGF0Ll9pLCBlbnRyeSA9IHRoYXQuX2Y7IGVudHJ5OyBlbnRyeSA9IGVudHJ5Lm4pe1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmKGVudHJ5LnApZW50cnkucCA9IGVudHJ5LnAubiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBkZWxldGUgZGF0YVtlbnRyeS5pXTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0Ll9mID0gdGhhdC5fbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhhdFtTSVpFXSA9IDA7XG4gICAgICB9LFxuICAgICAgLy8gMjMuMS4zLjMgTWFwLnByb3RvdHlwZS5kZWxldGUoa2V5KVxuICAgICAgLy8gMjMuMi4zLjQgU2V0LnByb3RvdHlwZS5kZWxldGUodmFsdWUpXG4gICAgICAnZGVsZXRlJzogZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgdmFyIHRoYXQgID0gdGhpc1xuICAgICAgICAgICwgZW50cnkgPSBnZXRFbnRyeSh0aGF0LCBrZXkpO1xuICAgICAgICBpZihlbnRyeSl7XG4gICAgICAgICAgdmFyIG5leHQgPSBlbnRyeS5uXG4gICAgICAgICAgICAsIHByZXYgPSBlbnRyeS5wO1xuICAgICAgICAgIGRlbGV0ZSB0aGF0Ll9pW2VudHJ5LmldO1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmKHByZXYpcHJldi5uID0gbmV4dDtcbiAgICAgICAgICBpZihuZXh0KW5leHQucCA9IHByZXY7XG4gICAgICAgICAgaWYodGhhdC5fZiA9PSBlbnRyeSl0aGF0Ll9mID0gbmV4dDtcbiAgICAgICAgICBpZih0aGF0Ll9sID09IGVudHJ5KXRoYXQuX2wgPSBwcmV2O1xuICAgICAgICAgIHRoYXRbU0laRV0tLTtcbiAgICAgICAgfSByZXR1cm4gISFlbnRyeTtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4yLjMuNiBTZXQucHJvdG90eXBlLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgICAgIC8vIDIzLjEuMy41IE1hcC5wcm90b3R5cGUuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICAgICAgZm9yRWFjaDogZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuIC8qLCB0aGF0ID0gdW5kZWZpbmVkICovKXtcbiAgICAgICAgdmFyIGYgPSBjdHgoY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQsIDMpXG4gICAgICAgICAgLCBlbnRyeTtcbiAgICAgICAgd2hpbGUoZW50cnkgPSBlbnRyeSA/IGVudHJ5Lm4gOiB0aGlzLl9mKXtcbiAgICAgICAgICBmKGVudHJ5LnYsIGVudHJ5LmssIHRoaXMpO1xuICAgICAgICAgIC8vIHJldmVydCB0byB0aGUgbGFzdCBleGlzdGluZyBlbnRyeVxuICAgICAgICAgIHdoaWxlKGVudHJ5ICYmIGVudHJ5LnIpZW50cnkgPSBlbnRyeS5wO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLy8gMjMuMS4zLjcgTWFwLnByb3RvdHlwZS5oYXMoa2V5KVxuICAgICAgLy8gMjMuMi4zLjcgU2V0LnByb3RvdHlwZS5oYXModmFsdWUpXG4gICAgICBoYXM6IGZ1bmN0aW9uIGhhcyhrZXkpe1xuICAgICAgICByZXR1cm4gISFnZXRFbnRyeSh0aGlzLCBrZXkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmKERFU0NSSVBUT1JTKSQuc2V0RGVzYyhDLnByb3RvdHlwZSwgJ3NpemUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBkZWZpbmVkKHRoaXNbU0laRV0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBDO1xuICB9LFxuICBkZWY6IGZ1bmN0aW9uKHRoYXQsIGtleSwgdmFsdWUpe1xuICAgIHZhciBlbnRyeSA9IGdldEVudHJ5KHRoYXQsIGtleSlcbiAgICAgICwgcHJldiwgaW5kZXg7XG4gICAgLy8gY2hhbmdlIGV4aXN0aW5nIGVudHJ5XG4gICAgaWYoZW50cnkpe1xuICAgICAgZW50cnkudiA9IHZhbHVlO1xuICAgIC8vIGNyZWF0ZSBuZXcgZW50cnlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhhdC5fbCA9IGVudHJ5ID0ge1xuICAgICAgICBpOiBpbmRleCA9IGZhc3RLZXkoa2V5LCB0cnVlKSwgLy8gPC0gaW5kZXhcbiAgICAgICAgazoga2V5LCAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGtleVxuICAgICAgICB2OiB2YWx1ZSwgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gdmFsdWVcbiAgICAgICAgcDogcHJldiA9IHRoYXQuX2wsICAgICAgICAgICAgIC8vIDwtIHByZXZpb3VzIGVudHJ5XG4gICAgICAgIG46IHVuZGVmaW5lZCwgICAgICAgICAgICAgICAgICAvLyA8LSBuZXh0IGVudHJ5XG4gICAgICAgIHI6IGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSByZW1vdmVkXG4gICAgICB9O1xuICAgICAgaWYoIXRoYXQuX2YpdGhhdC5fZiA9IGVudHJ5O1xuICAgICAgaWYocHJldilwcmV2Lm4gPSBlbnRyeTtcbiAgICAgIHRoYXRbU0laRV0rKztcbiAgICAgIC8vIGFkZCB0byBpbmRleFxuICAgICAgaWYoaW5kZXggIT09ICdGJyl0aGF0Ll9pW2luZGV4XSA9IGVudHJ5O1xuICAgIH0gcmV0dXJuIHRoYXQ7XG4gIH0sXG4gIGdldEVudHJ5OiBnZXRFbnRyeSxcbiAgc2V0U3Ryb25nOiBmdW5jdGlvbihDLCBOQU1FLCBJU19NQVApe1xuICAgIC8vIGFkZCAua2V5cywgLnZhbHVlcywgLmVudHJpZXMsIFtAQGl0ZXJhdG9yXVxuICAgIC8vIDIzLjEuMy40LCAyMy4xLjMuOCwgMjMuMS4zLjExLCAyMy4xLjMuMTIsIDIzLjIuMy41LCAyMy4yLjMuOCwgMjMuMi4zLjEwLCAyMy4yLjMuMTFcbiAgICAkaXRlckRlZmluZShDLCBOQU1FLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gICAgICB0aGlzLl90ID0gaXRlcmF0ZWQ7ICAvLyB0YXJnZXRcbiAgICAgIHRoaXMuX2sgPSBraW5kOyAgICAgIC8vIGtpbmRcbiAgICAgIHRoaXMuX2wgPSB1bmRlZmluZWQ7IC8vIHByZXZpb3VzXG4gICAgfSwgZnVuY3Rpb24oKXtcbiAgICAgIHZhciB0aGF0ICA9IHRoaXNcbiAgICAgICAgLCBraW5kICA9IHRoYXQuX2tcbiAgICAgICAgLCBlbnRyeSA9IHRoYXQuX2w7XG4gICAgICAvLyByZXZlcnQgdG8gdGhlIGxhc3QgZXhpc3RpbmcgZW50cnlcbiAgICAgIHdoaWxlKGVudHJ5ICYmIGVudHJ5LnIpZW50cnkgPSBlbnRyeS5wO1xuICAgICAgLy8gZ2V0IG5leHQgZW50cnlcbiAgICAgIGlmKCF0aGF0Ll90IHx8ICEodGhhdC5fbCA9IGVudHJ5ID0gZW50cnkgPyBlbnRyeS5uIDogdGhhdC5fdC5fZikpe1xuICAgICAgICAvLyBvciBmaW5pc2ggdGhlIGl0ZXJhdGlvblxuICAgICAgICB0aGF0Ll90ID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gc3RlcCgxKTtcbiAgICAgIH1cbiAgICAgIC8vIHJldHVybiBzdGVwIGJ5IGtpbmRcbiAgICAgIGlmKGtpbmQgPT0gJ2tleXMnICApcmV0dXJuIHN0ZXAoMCwgZW50cnkuayk7XG4gICAgICBpZihraW5kID09ICd2YWx1ZXMnKXJldHVybiBzdGVwKDAsIGVudHJ5LnYpO1xuICAgICAgcmV0dXJuIHN0ZXAoMCwgW2VudHJ5LmssIGVudHJ5LnZdKTtcbiAgICB9LCBJU19NQVAgPyAnZW50cmllcycgOiAndmFsdWVzJyAsICFJU19NQVAsIHRydWUpO1xuXG4gICAgLy8gYWRkIFtAQHNwZWNpZXNdLCAyMy4xLjIuMiwgMjMuMi4yLjJcbiAgICBzZXRTcGVjaWVzKE5BTUUpO1xuICB9XG59OyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXZpZEJydWFudC9NYXAtU2V0LnByb3RvdHlwZS50b0pTT05cbnZhciBmb3JPZiAgID0gcmVxdWlyZSgnLi8kLmZvci1vZicpXG4gICwgY2xhc3NvZiA9IHJlcXVpcmUoJy4vJC5jbGFzc29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE5BTUUpe1xuICByZXR1cm4gZnVuY3Rpb24gdG9KU09OKCl7XG4gICAgaWYoY2xhc3NvZih0aGlzKSAhPSBOQU1FKXRocm93IFR5cGVFcnJvcihOQU1FICsgXCIjdG9KU09OIGlzbid0IGdlbmVyaWNcIik7XG4gICAgdmFyIGFyciA9IFtdO1xuICAgIGZvck9mKHRoaXMsIGZhbHNlLCBhcnIucHVzaCwgYXJyKTtcbiAgICByZXR1cm4gYXJyO1xuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGdsb2JhbCAgICAgICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCBmYWlscyAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5mYWlscycpXG4gICwgaGlkZSAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaGlkZScpXG4gICwgcmVkZWZpbmVBbGwgICAgPSByZXF1aXJlKCcuLyQucmVkZWZpbmUtYWxsJylcbiAgLCBmb3JPZiAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5mb3Itb2YnKVxuICAsIHN0cmljdE5ldyAgICAgID0gcmVxdWlyZSgnLi8kLnN0cmljdC1uZXcnKVxuICAsIGlzT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLyQuc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIERFU0NSSVBUT1JTICAgID0gcmVxdWlyZSgnLi8kLmRlc2NyaXB0b3JzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTkFNRSwgd3JhcHBlciwgbWV0aG9kcywgY29tbW9uLCBJU19NQVAsIElTX1dFQUspe1xuICB2YXIgQmFzZSAgPSBnbG9iYWxbTkFNRV1cbiAgICAsIEMgICAgID0gQmFzZVxuICAgICwgQURERVIgPSBJU19NQVAgPyAnc2V0JyA6ICdhZGQnXG4gICAgLCBwcm90byA9IEMgJiYgQy5wcm90b3R5cGVcbiAgICAsIE8gICAgID0ge307XG4gIGlmKCFERVNDUklQVE9SUyB8fCB0eXBlb2YgQyAhPSAnZnVuY3Rpb24nIHx8ICEoSVNfV0VBSyB8fCBwcm90by5mb3JFYWNoICYmICFmYWlscyhmdW5jdGlvbigpe1xuICAgIG5ldyBDKCkuZW50cmllcygpLm5leHQoKTtcbiAgfSkpKXtcbiAgICAvLyBjcmVhdGUgY29sbGVjdGlvbiBjb25zdHJ1Y3RvclxuICAgIEMgPSBjb21tb24uZ2V0Q29uc3RydWN0b3Iod3JhcHBlciwgTkFNRSwgSVNfTUFQLCBBRERFUik7XG4gICAgcmVkZWZpbmVBbGwoQy5wcm90b3R5cGUsIG1ldGhvZHMpO1xuICB9IGVsc2Uge1xuICAgIEMgPSB3cmFwcGVyKGZ1bmN0aW9uKHRhcmdldCwgaXRlcmFibGUpe1xuICAgICAgc3RyaWN0TmV3KHRhcmdldCwgQywgTkFNRSk7XG4gICAgICB0YXJnZXQuX2MgPSBuZXcgQmFzZTtcbiAgICAgIGlmKGl0ZXJhYmxlICE9IHVuZGVmaW5lZClmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0YXJnZXRbQURERVJdLCB0YXJnZXQpO1xuICAgIH0pO1xuICAgICQuZWFjaC5jYWxsKCdhZGQsY2xlYXIsZGVsZXRlLGZvckVhY2gsZ2V0LGhhcyxzZXQsa2V5cyx2YWx1ZXMsZW50cmllcycuc3BsaXQoJywnKSxmdW5jdGlvbihLRVkpe1xuICAgICAgdmFyIElTX0FEREVSID0gS0VZID09ICdhZGQnIHx8IEtFWSA9PSAnc2V0JztcbiAgICAgIGlmKEtFWSBpbiBwcm90byAmJiAhKElTX1dFQUsgJiYgS0VZID09ICdjbGVhcicpKWhpZGUoQy5wcm90b3R5cGUsIEtFWSwgZnVuY3Rpb24oYSwgYil7XG4gICAgICAgIGlmKCFJU19BRERFUiAmJiBJU19XRUFLICYmICFpc09iamVjdChhKSlyZXR1cm4gS0VZID09ICdnZXQnID8gdW5kZWZpbmVkIDogZmFsc2U7XG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9jW0tFWV0oYSA9PT0gMCA/IDAgOiBhLCBiKTtcbiAgICAgICAgcmV0dXJuIElTX0FEREVSID8gdGhpcyA6IHJlc3VsdDtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmKCdzaXplJyBpbiBwcm90bykkLnNldERlc2MoQy5wcm90b3R5cGUsICdzaXplJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5fYy5zaXplO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2V0VG9TdHJpbmdUYWcoQywgTkFNRSk7XG5cbiAgT1tOQU1FXSA9IEM7XG4gICRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GLCBPKTtcblxuICBpZighSVNfV0VBSyljb21tb24uc2V0U3Ryb25nKEMsIE5BTUUsIElTX01BUCk7XG5cbiAgcmV0dXJuIEM7XG59OyIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7dmVyc2lvbjogJzEuMi42J307XG5pZih0eXBlb2YgX19lID09ICdudW1iZXInKV9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLyQuYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYodGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTsiLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07IiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi8kLmZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pOyIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgPSByZXF1aXJlKCcuLyQuY29yZScpXG4gICwgY3R4ICAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24odHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkZcbiAgICAsIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0LkdcbiAgICAsIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlNcbiAgICAsIElTX1BST1RPICA9IHR5cGUgJiAkZXhwb3J0LlBcbiAgICAsIElTX0JJTkQgICA9IHR5cGUgJiAkZXhwb3J0LkJcbiAgICAsIElTX1dSQVAgICA9IHR5cGUgJiAkZXhwb3J0LldcbiAgICAsIGV4cG9ydHMgICA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pXG4gICAgLCB0YXJnZXQgICAgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBrZXksIG93biwgb3V0O1xuICBpZihJU19HTE9CQUwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIGtleSBpbiB0YXJnZXQ7XG4gICAgaWYob3duICYmIGtleSBpbiBleHBvcnRzKWNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24oQyl7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uKHBhcmFtKXtcbiAgICAgICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBDID8gbmV3IEMocGFyYW0pIDogQyhwYXJhbSk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIGlmKElTX1BST1RPKShleHBvcnRzW1BST1RPVFlQRV0gfHwgKGV4cG9ydHNbUFJPVE9UWVBFXSA9IHt9KSlba2V5XSA9IG91dDtcbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgLy8gd3JhcFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59OyIsInZhciBjdHggICAgICAgICA9IHJlcXVpcmUoJy4vJC5jdHgnKVxuICAsIGNhbGwgICAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXItY2FsbCcpXG4gICwgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuLyQuaXMtYXJyYXktaXRlcicpXG4gICwgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuLyQuYW4tb2JqZWN0JylcbiAgLCB0b0xlbmd0aCAgICA9IHJlcXVpcmUoJy4vJC50by1sZW5ndGgnKVxuICAsIGdldEl0ZXJGbiAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlcmFibGUsIGVudHJpZXMsIGZuLCB0aGF0KXtcbiAgdmFyIGl0ZXJGbiA9IGdldEl0ZXJGbihpdGVyYWJsZSlcbiAgICAsIGYgICAgICA9IGN0eChmbiwgdGhhdCwgZW50cmllcyA/IDIgOiAxKVxuICAgICwgaW5kZXggID0gMFxuICAgICwgbGVuZ3RoLCBzdGVwLCBpdGVyYXRvcjtcbiAgaWYodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdGVyYWJsZSArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICAvLyBmYXN0IGNhc2UgZm9yIGFycmF5cyB3aXRoIGRlZmF1bHQgaXRlcmF0b3JcbiAgaWYoaXNBcnJheUl0ZXIoaXRlckZuKSlmb3IobGVuZ3RoID0gdG9MZW5ndGgoaXRlcmFibGUubGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4Kyspe1xuICAgIGVudHJpZXMgPyBmKGFuT2JqZWN0KHN0ZXAgPSBpdGVyYWJsZVtpbmRleF0pWzBdLCBzdGVwWzFdKSA6IGYoaXRlcmFibGVbaW5kZXhdKTtcbiAgfSBlbHNlIGZvcihpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKGl0ZXJhYmxlKTsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyApe1xuICAgIGNhbGwoaXRlcmF0b3IsIGYsIHN0ZXAudmFsdWUsIGVudHJpZXMpO1xuICB9XG59OyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTsiLCJ2YXIgJCAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vJC5wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgcmV0dXJuICQuc2V0RGVzYyhvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59OyIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi8kLmNvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTsiLCIvLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG52YXIgSXRlcmF0b3JzICA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKVxuICAsIElURVJBVE9SICAgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ICE9PSB1bmRlZmluZWQgJiYgKEl0ZXJhdG9ycy5BcnJheSA9PT0gaXQgfHwgQXJyYXlQcm90b1tJVEVSQVRPUl0gPT09IGl0KTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59OyIsIi8vIGNhbGwgc29tZXRoaW5nIG9uIGl0ZXJhdG9yIHN0ZXAgd2l0aCBzYWZlIGNsb3Npbmcgb24gZXJyb3JcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVudHJpZXMgPyBmbihhbk9iamVjdCh2YWx1ZSlbMF0sIHZhbHVlWzFdKSA6IGZuKHZhbHVlKTtcbiAgLy8gNy40LjYgSXRlcmF0b3JDbG9zZShpdGVyYXRvciwgY29tcGxldGlvbilcbiAgfSBjYXRjaChlKXtcbiAgICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICAgIGlmKHJldCAhPT0gdW5kZWZpbmVkKWFuT2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGRlc2NyaXB0b3IgICAgID0gcmVxdWlyZSgnLi8kLnByb3BlcnR5LWRlc2MnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi8kLnNldC10by1zdHJpbmctdGFnJylcbiAgLCBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi8kLmhpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpLCBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpe1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSAkLmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwge25leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCl9KTtcbiAgc2V0VG9TdHJpbmdUYWcoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZICAgICAgICA9IHJlcXVpcmUoJy4vJC5saWJyYXJ5JylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKVxuICAsIHJlZGVmaW5lICAgICAgID0gcmVxdWlyZSgnLi8kLnJlZGVmaW5lJylcbiAgLCBoaWRlICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5oaWRlJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5oYXMnKVxuICAsIEl0ZXJhdG9ycyAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXJhdG9ycycpXG4gICwgJGl0ZXJDcmVhdGUgICAgPSByZXF1aXJlKCcuLyQuaXRlci1jcmVhdGUnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi8kLnNldC10by1zdHJpbmctdGFnJylcbiAgLCBnZXRQcm90byAgICAgICA9IHJlcXVpcmUoJy4vJCcpLmdldFByb3RvXG4gICwgSVRFUkFUT1IgICAgICAgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBCVUdHWSAgICAgICAgICA9ICEoW10ua2V5cyAmJiAnbmV4dCcgaW4gW10ua2V5cygpKSAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG4gICwgRkZfSVRFUkFUT1IgICAgPSAnQEBpdGVyYXRvcidcbiAgLCBLRVlTICAgICAgICAgICA9ICdrZXlzJ1xuICAsIFZBTFVFUyAgICAgICAgID0gJ3ZhbHVlcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKXtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24oa2luZCl7XG4gICAgaWYoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaChraW5kKXtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHICAgICAgICA9IE5BTUUgKyAnIEl0ZXJhdG9yJ1xuICAgICwgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTXG4gICAgLCBWQUxVRVNfQlVHID0gZmFsc2VcbiAgICAsIHByb3RvICAgICAgPSBCYXNlLnByb3RvdHlwZVxuICAgICwgJG5hdGl2ZSAgICA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXVxuICAgICwgJGRlZmF1bHQgICA9ICRuYXRpdmUgfHwgZ2V0TWV0aG9kKERFRkFVTFQpXG4gICAgLCBtZXRob2RzLCBrZXk7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYoJG5hdGl2ZSl7XG4gICAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8oJGRlZmF1bHQuY2FsbChuZXcgQmFzZSkpO1xuICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAvLyBGRiBmaXhcbiAgICBpZighTElCUkFSWSAmJiBoYXMocHJvdG8sIEZGX0lURVJBVE9SKSloaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICAgIGlmKERFRl9WQUxVRVMgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpe1xuICAgICAgVkFMVUVTX0JVRyA9IHRydWU7XG4gICAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICAgIH1cbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpe1xuICAgIGhpZGUocHJvdG8sIElURVJBVE9SLCAkZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSAkZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gID0gcmV0dXJuVGhpcztcbiAgaWYoREVGQVVMVCl7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogIERFRl9WQUxVRVMgID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6ICAgIElTX1NFVCAgICAgID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJylcbiAgICB9O1xuICAgIGlmKEZPUkNFRClmb3Ioa2V5IGluIG1ldGhvZHMpe1xuICAgICAgaWYoIShrZXkgaW4gcHJvdG8pKXJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07IiwidmFyIElURVJBVE9SICAgICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bSVRFUkFUT1JdKCk7XG4gIHJpdGVyWydyZXR1cm4nXSA9IGZ1bmN0aW9uKCl7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uKCl7IHRocm93IDI7IH0pO1xufSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMsIHNraXBDbG9zaW5nKXtcbiAgaWYoIXNraXBDbG9zaW5nICYmICFTQUZFX0NMT1NJTkcpcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgID0gWzddXG4gICAgICAsIGl0ZXIgPSBhcnJbSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24oKXsgc2FmZSA9IHRydWU7IH07XG4gICAgYXJyW0lURVJBVE9SXSA9IGZ1bmN0aW9uKCl7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gc2FmZTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb25lLCB2YWx1ZSl7XG4gIHJldHVybiB7dmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmV9O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHt9OyIsInZhciAkT2JqZWN0ID0gT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZTogICAgICRPYmplY3QuY3JlYXRlLFxuICBnZXRQcm90bzogICAkT2JqZWN0LmdldFByb3RvdHlwZU9mLFxuICBpc0VudW06ICAgICB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZSxcbiAgZ2V0RGVzYzogICAgJE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gIHNldERlc2M6ICAgICRPYmplY3QuZGVmaW5lUHJvcGVydHksXG4gIHNldERlc2NzOiAgICRPYmplY3QuZGVmaW5lUHJvcGVydGllcyxcbiAgZ2V0S2V5czogICAgJE9iamVjdC5rZXlzLFxuICBnZXROYW1lczogICAkT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMsXG4gIGdldFN5bWJvbHM6ICRPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzLFxuICBlYWNoOiAgICAgICBbXS5mb3JFYWNoXG59OyIsIm1vZHVsZS5leHBvcnRzID0gdHJ1ZTsiLCIvLyBtb3N0IE9iamVjdCBtZXRob2RzIGJ5IEVTNiBzaG91bGQgYWNjZXB0IHByaW1pdGl2ZXNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpXG4gICwgY29yZSAgICA9IHJlcXVpcmUoJy4vJC5jb3JlJylcbiAgLCBmYWlscyAgID0gcmVxdWlyZSgnLi8kLmZhaWxzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEtFWSwgZXhlYyl7XG4gIHZhciBmbiAgPSAoY29yZS5PYmplY3QgfHwge30pW0tFWV0gfHwgT2JqZWN0W0tFWV1cbiAgICAsIGV4cCA9IHt9O1xuICBleHBbS0VZXSA9IGV4ZWMoZm4pO1xuICAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uKCl7IGZuKDEpOyB9KSwgJ09iamVjdCcsIGV4cCk7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYml0bWFwLCB2YWx1ZSl7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZSAgOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZSAgICA6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWUgICAgICAgOiB2YWx1ZVxuICB9O1xufTsiLCJ2YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLyQucmVkZWZpbmUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGFyZ2V0LCBzcmMpe1xuICBmb3IodmFyIGtleSBpbiBzcmMpcmVkZWZpbmUodGFyZ2V0LCBrZXksIHNyY1trZXldKTtcbiAgcmV0dXJuIHRhcmdldDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuaGlkZScpOyIsIi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbnZhciBnZXREZXNjICA9IHJlcXVpcmUoJy4vJCcpLmdldERlc2NcbiAgLCBpc09iamVjdCA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24oTywgcHJvdG8pe1xuICBhbk9iamVjdChPKTtcbiAgaWYoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCl0aHJvdyBUeXBlRXJyb3IocHJvdG8gKyBcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIik7XG59O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSA/IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBmdW5jdGlvbih0ZXN0LCBidWdneSwgc2V0KXtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldCA9IHJlcXVpcmUoJy4vJC5jdHgnKShGdW5jdGlvbi5jYWxsLCBnZXREZXNjKE9iamVjdC5wcm90b3R5cGUsICdfX3Byb3RvX18nKS5zZXQsIDIpO1xuICAgICAgICBzZXQodGVzdCwgW10pO1xuICAgICAgICBidWdneSA9ICEodGVzdCBpbnN0YW5jZW9mIEFycmF5KTtcbiAgICAgIH0gY2F0Y2goZSl7IGJ1Z2d5ID0gdHJ1ZTsgfVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKXtcbiAgICAgICAgY2hlY2soTywgcHJvdG8pO1xuICAgICAgICBpZihidWdneSlPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgICAgICBlbHNlIHNldChPLCBwcm90byk7XG4gICAgICAgIHJldHVybiBPO1xuICAgICAgfTtcbiAgICB9KHt9LCBmYWxzZSkgOiB1bmRlZmluZWQpLFxuICBjaGVjazogY2hlY2tcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNvcmUgICAgICAgID0gcmVxdWlyZSgnLi8kLmNvcmUnKVxuICAsICQgICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vJC5kZXNjcmlwdG9ycycpXG4gICwgU1BFQ0lFUyAgICAgPSByZXF1aXJlKCcuLyQud2tzJykoJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVkpe1xuICB2YXIgQyA9IGNvcmVbS0VZXTtcbiAgaWYoREVTQ1JJUFRPUlMgJiYgQyAmJiAhQ1tTUEVDSUVTXSkkLnNldERlc2MoQywgU1BFQ0lFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9XG4gIH0pO1xufTsiLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi8kJykuc2V0RGVzY1xuICAsIGhhcyA9IHJlcXVpcmUoJy4vJC5oYXMnKVxuICAsIFRBRyA9IHJlcXVpcmUoJy4vJC53a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgdGFnLCBzdGF0KXtcbiAgaWYoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSlkZWYoaXQsIFRBRywge2NvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZ30pO1xufTsiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXydcbiAgLCBzdG9yZSAgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSl7XG4gIGlmKCEoaXQgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpdGhyb3cgVHlwZUVycm9yKG5hbWUgKyBcIjogdXNlIHRoZSAnbmV3JyBvcGVyYXRvciFcIik7XG4gIHJldHVybiBpdDtcbn07IiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vJC50by1pbnRlZ2VyJylcbiAgLCBkZWZpbmVkICAgPSByZXF1aXJlKCcuLyQuZGVmaW5lZCcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVE9fU1RSSU5HKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKHRoYXQsIHBvcyl7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSlcbiAgICAgICwgaSA9IHRvSW50ZWdlcihwb3MpXG4gICAgICAsIGwgPSBzLmxlbmd0aFxuICAgICAgLCBhLCBiO1xuICAgIGlmKGkgPCAwIHx8IGkgPj0gbClyZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTsiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07IiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vJC5pb2JqZWN0JylcbiAgLCBkZWZpbmVkID0gcmVxdWlyZSgnLi8kLmRlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59OyIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vJC50by1pbnRlZ2VyJylcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTsiLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vJC5kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59OyIsInZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59OyIsInZhciBzdG9yZSAgPSByZXF1aXJlKCcuLyQuc2hhcmVkJykoJ3drcycpXG4gICwgdWlkICAgID0gcmVxdWlyZSgnLi8kLnVpZCcpXG4gICwgU3ltYm9sID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpLlN5bWJvbDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFN5bWJvbCAmJiBTeW1ib2xbbmFtZV0gfHwgKFN5bWJvbCB8fCB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07IiwidmFyIGNsYXNzb2YgICA9IHJlcXVpcmUoJy4vJC5jbGFzc29mJylcbiAgLCBJVEVSQVRPUiAgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLyQuaXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5jb3JlJykuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ICE9IHVuZGVmaW5lZClyZXR1cm4gaXRbSVRFUkFUT1JdXG4gICAgfHwgaXRbJ0BAaXRlcmF0b3InXVxuICAgIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBjdHggICAgICAgICA9IHJlcXVpcmUoJy4vJC5jdHgnKVxuICAsICRleHBvcnQgICAgID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpXG4gICwgdG9PYmplY3QgICAgPSByZXF1aXJlKCcuLyQudG8tb2JqZWN0JylcbiAgLCBjYWxsICAgICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyLWNhbGwnKVxuICAsIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi8kLmlzLWFycmF5LWl0ZXInKVxuICAsIHRvTGVuZ3RoICAgID0gcmVxdWlyZSgnLi8kLnRvLWxlbmd0aCcpXG4gICwgZ2V0SXRlckZuICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi8kLml0ZXItZGV0ZWN0JykoZnVuY3Rpb24oaXRlcil7IEFycmF5LmZyb20oaXRlcik7IH0pLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMi4xIEFycmF5LmZyb20oYXJyYXlMaWtlLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgZnJvbTogZnVuY3Rpb24gZnJvbShhcnJheUxpa2UvKiwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQqLyl7XG4gICAgdmFyIE8gICAgICAgPSB0b09iamVjdChhcnJheUxpa2UpXG4gICAgICAsIEMgICAgICAgPSB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5XG4gICAgICAsICQkICAgICAgPSBhcmd1bWVudHNcbiAgICAgICwgJCRsZW4gICA9ICQkLmxlbmd0aFxuICAgICAgLCBtYXBmbiAgID0gJCRsZW4gPiAxID8gJCRbMV0gOiB1bmRlZmluZWRcbiAgICAgICwgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWRcbiAgICAgICwgaW5kZXggICA9IDBcbiAgICAgICwgaXRlckZuICA9IGdldEl0ZXJGbihPKVxuICAgICAgLCBsZW5ndGgsIHJlc3VsdCwgc3RlcCwgaXRlcmF0b3I7XG4gICAgaWYobWFwcGluZyltYXBmbiA9IGN0eChtYXBmbiwgJCRsZW4gPiAyID8gJCRbMl0gOiB1bmRlZmluZWQsIDIpO1xuICAgIC8vIGlmIG9iamVjdCBpc24ndCBpdGVyYWJsZSBvciBpdCdzIGFycmF5IHdpdGggZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBzaW1wbGUgY2FzZVxuICAgIGlmKGl0ZXJGbiAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyKGl0ZXJGbikpKXtcbiAgICAgIGZvcihpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKE8pLCByZXN1bHQgPSBuZXcgQzsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyBpbmRleCsrKXtcbiAgICAgICAgcmVzdWx0W2luZGV4XSA9IG1hcHBpbmcgPyBjYWxsKGl0ZXJhdG9yLCBtYXBmbiwgW3N0ZXAudmFsdWUsIGluZGV4XSwgdHJ1ZSkgOiBzdGVwLnZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgICBmb3IocmVzdWx0ID0gbmV3IEMobGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4Kyspe1xuICAgICAgICByZXN1bHRbaW5kZXhdID0gbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0Lmxlbmd0aCA9IGluZGV4O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuLyQuYWRkLXRvLXVuc2NvcGFibGVzJylcbiAgLCBzdGVwICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXItc3RlcCcpXG4gICwgSXRlcmF0b3JzICAgICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKVxuICAsIHRvSU9iamVjdCAgICAgICAgPSByZXF1aXJlKCcuLyQudG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwga2luZCAgPSB0aGlzLl9rXG4gICAgLCBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpe1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYoa2luZCA9PSAna2V5cycgIClyZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmKGtpbmQgPT0gJ3ZhbHVlcycpcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpOyIsIi8vIDE5LjEuMi42IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUClcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuLyQudG8taW9iamVjdCcpO1xuXG5yZXF1aXJlKCcuLyQub2JqZWN0LXNhcCcpKCdnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3InLCBmdW5jdGlvbigkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KXtcbiAgICByZXR1cm4gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0b0lPYmplY3QoaXQpLCBrZXkpO1xuICB9O1xufSk7IiwiLy8gMTkuMS4zLjE5IE9iamVjdC5zZXRQcm90b3R5cGVPZihPLCBwcm90bylcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpO1xuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7c2V0UHJvdG90eXBlT2Y6IHJlcXVpcmUoJy4vJC5zZXQtcHJvdG8nKS5zZXR9KTsiLCIiLCIndXNlIHN0cmljdCc7XG52YXIgc3Ryb25nID0gcmVxdWlyZSgnLi8kLmNvbGxlY3Rpb24tc3Ryb25nJyk7XG5cbi8vIDIzLjIgU2V0IE9iamVjdHNcbnJlcXVpcmUoJy4vJC5jb2xsZWN0aW9uJykoJ1NldCcsIGZ1bmN0aW9uKGdldCl7XG4gIHJldHVybiBmdW5jdGlvbiBTZXQoKXsgcmV0dXJuIGdldCh0aGlzLCBhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7IH07XG59LCB7XG4gIC8vIDIzLjIuMy4xIFNldC5wcm90b3R5cGUuYWRkKHZhbHVlKVxuICBhZGQ6IGZ1bmN0aW9uIGFkZCh2YWx1ZSl7XG4gICAgcmV0dXJuIHN0cm9uZy5kZWYodGhpcywgdmFsdWUgPSB2YWx1ZSA9PT0gMCA/IDAgOiB2YWx1ZSwgdmFsdWUpO1xuICB9XG59LCBzdHJvbmcpOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkYXQgID0gcmVxdWlyZSgnLi8kLnN0cmluZy1hdCcpKHRydWUpO1xuXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuLyQuaXRlci1kZWZpbmUnKShTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbihpdGVyYXRlZCl7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGluZGV4ID0gdGhpcy5faVxuICAgICwgcG9pbnQ7XG4gIGlmKGluZGV4ID49IE8ubGVuZ3RoKXJldHVybiB7dmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZX07XG4gIHBvaW50ID0gJGF0KE8sIGluZGV4KTtcbiAgdGhpcy5faSArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7dmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZX07XG59KTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vRGF2aWRCcnVhbnQvTWFwLVNldC5wcm90b3R5cGUudG9KU09OXG52YXIgJGV4cG9ydCAgPSByZXF1aXJlKCcuLyQuZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QLCAnU2V0Jywge3RvSlNPTjogcmVxdWlyZSgnLi8kLmNvbGxlY3Rpb24tdG8tanNvbicpKCdTZXQnKX0pOyIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi8kLml0ZXJhdG9ycycpO1xuSXRlcmF0b3JzLk5vZGVMaXN0ID0gSXRlcmF0b3JzLkhUTUxDb2xsZWN0aW9uID0gSXRlcmF0b3JzLkFycmF5OyIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24obikge1xuICBpZiAoIWlzTnVtYmVyKG4pIHx8IG4gPCAwIHx8IGlzTmFOKG4pKVxuICAgIHRocm93IFR5cGVFcnJvcignbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cy5lcnJvciB8fFxuICAgICAgICAoaXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSAmJiAhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpIHtcbiAgICAgIGVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgICB9XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuJyk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNVbmRlZmluZWQoaGFuZGxlcikpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBmYXN0IGNhc2VzXG4gICAgICBjYXNlIDE6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBzbG93ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc09iamVjdChoYW5kbGVyKSkge1xuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBtO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gIGlmICh0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpXG4gICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgIGlzRnVuY3Rpb24obGlzdGVuZXIubGlzdGVuZXIpID9cbiAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gIGVsc2UgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZVxuICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcblxuICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSAmJiAhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCkge1xuICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5fbWF4TGlzdGVuZXJzKSkge1xuICAgICAgbSA9IHRoaXMuX21heExpc3RlbmVycztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICAgIH1cblxuICAgIGlmIChtICYmIG0gPiAwICYmIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGggPiBtKSB7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnRyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQgaW4gSUUgMTBcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICB2YXIgZmlyZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBnKCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG5cbiAgICBpZiAoIWZpcmVkKSB7XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGcubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgdGhpcy5vbih0eXBlLCBnKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZmYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGxpc3QsIHBvc2l0aW9uLCBsZW5ndGgsIGk7XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgbGlzdCA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHBvc2l0aW9uID0gLTE7XG5cbiAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8XG4gICAgICAoaXNGdW5jdGlvbihsaXN0Lmxpc3RlbmVyKSAmJiBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QobGlzdCkpIHtcbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgICAobGlzdFtpXS5saXN0ZW5lciAmJiBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBrZXksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICByZXR1cm4gdGhpcztcblxuICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gIGlmICghdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICBlbHNlIGlmICh0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgZm9yIChrZXkgaW4gdGhpcy5fZXZlbnRzKSB7XG4gICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGxpc3RlbmVycykpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gIH0gZWxzZSBpZiAobGlzdGVuZXJzKSB7XG4gICAgLy8gTElGTyBvcmRlclxuICAgIHdoaWxlIChsaXN0ZW5lcnMubGVuZ3RoKVxuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gW107XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgZWxzZVxuICAgIHJldCA9IHRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgpO1xuICByZXR1cm4gcmV0O1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24odHlwZSkge1xuICBpZiAodGhpcy5fZXZlbnRzKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgICBpZiAoaXNGdW5jdGlvbihldmxpc3RlbmVyKSlcbiAgICAgIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKGV2bGlzdGVuZXIpXG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIDA7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbn07XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJuYW1lXCI6IFwid2F2ZXMtYmFzaWMtY29udHJvbGxlcnNcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC41LjFcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcImJhc2ljLWNvbnRyb2xsZXJzIGZvciByYXBpZCBwcm90b3R5cGluZ1wiLFxuICBcIm1haW5cIjogXCJkaXN0L3dhdmVzLWJhc2ljLWNvbnRyb2xsZXJzLmpzXCIsXG4gIFwic3RhbmRhbG9uZVwiOiBcIndhdmVzQmFzaWNDb250cm9sbGVyc1wiLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwidHJhbnNwaWxlXCI6IFwiLi9iaW4vc2NyaXB0cyAtLXRyYW5zcGlsZVwiLFxuICAgIFwicHJlYnVuZGxlXCI6IFwibnBtIHJ1biBoaW50ICYmIG5wbSBydW4gdHJhbnNwaWxlXCIsXG4gICAgXCJidW5kbGVcIjogXCIuL2Jpbi9zY3JpcHRzIC0tYnVuZGxlXCIsXG4gICAgXCJwb3N0YnVuZGxlXCI6IFwibnBtIHJ1biB1Z2xpZnlcIixcbiAgICBcInVnbGlmeVwiOiBcIi4vYmluL3NjcmlwdHMgLS11Z2xpZnlcIixcbiAgICBcIndhdGNoXCI6IFwiLi9iaW4vc2NyaXB0cyAtLXdhdGNoXCIsXG4gICAgXCJ0ZXN0XCI6IFwidGFjNlwiLFxuICAgIFwicHJldGVzdFwiOiBcIm5wbSBydW4gaGludFwiLFxuICAgIFwiaGludFwiOiBcImpzaGludCAuL2VzNjsgdHJ1ZVwiLFxuICAgIFwicHJldGFnXCI6IFwiYnJhbmNoPSQoZ2l0IHN5bWJvbGljLXJlZiAtcSBIRUFEKTsgaWYgWyAkYnJhbmNoICE9ICdyZWZzL2hlYWRzL21hc3RlcicgXTsgdGhlbiBlY2hvICc9PiBZb3UgbXVzdCBiZSBpbiBtYXN0ZXIgYnJhbmNoIHRvIHJ1biB0aGlzIGNvbW1hbmQnOyBleGl0IDE7IGZpICYmIG5wbSBydW4gYnVuZGxlICYmIGdpdCBjb21taXQgLWFtICdyZWJ1bmRsZWQnXCIsXG4gICAgXCJ0YWdcIjogXCJucG0gdmVyc2lvbiAkMVwiLFxuICAgIFwicG9zdHRhZ1wiOiBcImdpdCBwdXNoIG9yaWdpbiBtYXN0ZXIgJiYgZ2l0IHB1c2ggb3JpZ2luIC0tdGFnc1wiXG4gIH0sXG4gIFwibGljZW5zZVwiOiBcIkJTRC0zXCIsXG4gIFwicmVwb3NpdG9yeVwiOiB7XG4gICAgXCJ0eXBlXCI6IFwiZ2l0XCIsXG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vd2F2ZXNqcy9iYXNpYy1jb250cm9sbGVycy5naXRcIlxuICB9LFxuICBcImpzaGludENvbmZpZ1wiOiB7XG4gICAgXCJlc25leHRcIjogdHJ1ZSxcbiAgICBcImJyb3dzZXJcIjogdHJ1ZSxcbiAgICBcIm5vZGVcIjogdHJ1ZSxcbiAgICBcImRldmVsXCI6IHRydWVcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiYmFiZWwtcnVudGltZVwiOiBcIl41LjguMzRcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJiYWJlbFwiOiBcIl41LjguMzRcIixcbiAgICBcImJyb3dzZXJpZnlcIjogXCJeMTIuMC4xXCIsXG4gICAgXCJmcy1leHRyYVwiOiBcIl4wLjE2LjNcIixcbiAgICBcImpzaGludFwiOiBcIl4yLjYuMFwiLFxuICAgIFwibm9kZS1zYXNzXCI6IFwiXjMuNC4yXCIsXG4gICAgXCJub2RlLXdhdGNoXCI6IFwiXjAuMy40XCIsXG4gICAgXCJ1Z2xpZnktanNcIjogXCJeMi40LjE2XCJcbiAgfVxufVxuIl19
