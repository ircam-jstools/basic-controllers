(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _styles = require('../utils/styles');

var styles = _interopRequireWildcard(_styles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// keep track of all instaciated controllers
var controllers = new Set();
// default theme
var theme = 'light';

/** @module basic-controller */

/**
 * Base class to create new controllers.
 *
 * @param {String} type - String describing the type of the controller.
 * @param {Object} defaults - Default parameters of the controller.
 * @param {Object} config - User defined configuration options.
 */

var BaseController = function () {
  function BaseController(type, defaults) {
    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, BaseController);

    this.type = type;
    this.params = Object.assign({}, defaults, config);
    // insert styles and listen window resize when the first controller is created
    if (controllers.size === 0) {
      styles.insertStyleSheet();

      window.addEventListener('resize', function () {
        controllers.forEach(function (controller) {
          return controller.onResize();
        });
      });
    }

    controllers.add(this);

    this._listeners = new Set();
  }

  /**
   * Theme of the controllers
   * @type {String}
   * @private
   */


  _createClass(BaseController, [{
    key: 'initialize',


    /**
     * Mandatory method to be called at the end of a constructor.
     * @private
     */
    value: function initialize() {
      var callback = this.params.callback;
      var $container = this.params.container;

      if ($container) {
        // css selector
        if (typeof $container === 'string') $container = document.querySelector($container);
        // group
        else if ($container instanceof BaseController && $container.$container) $container = $container.$container;

        $container.appendChild(this.render());
        this.onRender();
      }

      if (callback) this.addListener(callback);
    }

    /**
     * Add a listener to the controller.
     *
     * @param {Function} callback - Function to be applied when the controller
     *  state change.
     */

  }, {
    key: 'addListener',
    value: function addListener(callback) {
      this._listeners.add(callback);
    }

    /**
     * Remove a listener from the controller.
     *
     * @param {Function} callback - Function to remove from the listeners.
     */

  }, {
    key: 'removeListener',
    value: function removeListener(callback) {
      this._listeners.remove(callback);
    }

    /** @private */

  }, {
    key: 'executeListeners',
    value: function executeListeners() {
      for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }

      this._listeners.forEach(function (callback) {
        return callback.apply(undefined, values);
      });
    }

    /** @private */

  }, {
    key: 'render',
    value: function render() {
      this.$el = document.createElement('div');
      this.$el.classList.add(styles.ns, theme, this.type);

      return this.$el;
    }

    /** @private */

  }, {
    key: 'onRender',
    value: function onRender() {
      var _this = this;

      setTimeout(function () {
        return _this.onResize();
      }, 0);
    }

    /** @private */

  }, {
    key: 'onResize',
    value: function onResize() {
      var boundingRect = this.$el.getBoundingClientRect();
      var width = boundingRect.width;
      var method = width > 600 ? 'remove' : 'add';

      this.$el.classList[method]('small');
    }

    /** @private */

  }, {
    key: 'bindEvents',
    value: function bindEvents() {}
  }], [{
    key: 'theme',
    set: function set(value) {
      controllers.forEach(function (controller) {
        return controller.$el.classList.remove(theme);
      });
      theme = value;
      controllers.forEach(function (controller) {
        return controller.$el.classList.add(theme);
      });
    },
    get: function get() {
      return theme;
    }
  }]);

  return BaseController;
}();

exports.default = BaseController;

},{"../utils/styles":14}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseController2 = require('./BaseController');

var _BaseController3 = _interopRequireDefault(_BaseController2);

var _elements = require('../utils/elements');

var elements = _interopRequireWildcard(_elements);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module basic-controllers */

var defaults = {
  legend: '&nbsp;',
  default: 'opened',
  container: null
};

/**
 * Group of controllers.
 *
 * @param {Object} config - Override default parameters.
 * @param {String} config.label - Label of the group.
 * @param {'opened'|'closed'} [config.default='opened'] - Default state of the
 *  group.
 * @param {String|Element|basic-controller~Group} [config.container=null] -
 *  Container of the controller.
 *
 * @example
 * import * as controllers from 'basic-controllers';
 *
 * // create a group
 * const group = new controllers.Group({
 *   label: 'Group',
 *   default: 'opened',
 *   container: '#container'
 * });
 *
 * // insert controllers in the group
 * const groupSlider = new controllers.Slider({
 *   label: 'Group Slider',
 *   min: 20,
 *   max: 1000,
 *   step: 1,
 *   default: 200,
 *   unit: 'Hz',
 *   size: 'large',
 *   container: group,
 *   callback: (value) => console.log(value),
 * });
 *
 * const groupText = new controllers.Text({
 *   label: 'Group Text',
 *   default: 'text input',
 *   readonly: false,
 *   container: group,
 *   callback: (value) => console.log(value),
 * });
 */

var Group = function (_BaseController) {
  _inherits(Group, _BaseController);

  function Group(config) {
    _classCallCheck(this, Group);

    var _this = _possibleConstructorReturn(this, (Group.__proto__ || Object.getPrototypeOf(Group)).call(this, 'group', defaults, config));

    _this._states = ['opened', 'closed'];

    if (_this._states.indexOf(_this.params.default) === -1) throw new Error('Invalid state "' + value + '"');

    _this._state = _this.params.default;

    _get(Group.prototype.__proto__ || Object.getPrototypeOf(Group.prototype), 'initialize', _this).call(_this);
    return _this;
  }

  /**
   * State of the group (`'opened'` or `'closed'`).
   * @type {String}
   */


  _createClass(Group, [{
    key: 'render',


    /** @private */
    value: function render() {
      var content = '\n      <div class="group-header">\n        ' + elements.smallArrowRight + '\n        ' + elements.smallArrowBottom + '\n        <span class="label">' + this.params.label + '</span>\n      </div>\n      <div class="group-content"></div>\n    ';

      this.$el = _get(Group.prototype.__proto__ || Object.getPrototypeOf(Group.prototype), 'render', this).call(this);
      this.$el.innerHTML = content;
      this.$el.classList.add(this._state);

      this.$header = this.$el.querySelector('.group-header');
      this.$container = this.$el.querySelector('.group-content');

      this.bindEvents();

      return this.$el;
    }

    /** @private */

  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this2 = this;

      this.$header.addEventListener('click', function () {
        var state = _this2._state === 'closed' ? 'opened' : 'closed';
        _this2.state = state;
      });
    }
  }, {
    key: 'value',
    get: function get() {
      return this.state;
    },
    set: function set(state) {
      this.state = state;
    }

    /**
     * Alias for `value`.
     * @type {String}
     */

  }, {
    key: 'state',
    get: function get() {
      return this._state;
    },
    set: function set(value) {
      if (this._states.indexOf(value) === -1) throw new Error('Invalid state "' + value + '"');

      this.$el.classList.remove(this._state);
      this.$el.classList.add(value);

      this._state = value;
    }
  }]);

  return Group;
}(_BaseController3.default);

exports.default = Group;

},{"../utils/elements":12,"./BaseController":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseController2 = require('./BaseController');

var _BaseController3 = _interopRequireDefault(_BaseController2);

var _elements = require('../utils/elements');

var elements = _interopRequireWildcard(_elements);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module basic-controllers */

var defaults = {
  label: '$nbsp;',
  min: 0,
  max: 1,
  step: 0.01,
  default: 0,
  container: null,
  callback: null
};

/**
 * Number Box controller
 *
 * @param {Object} config - Override default parameters.
 * @param {String} config.label - Label of the controller.
 * @param {Number} [config.min=0] - Minimum value.
 * @param {Number} [config.max=1] - Maximum value.
 * @param {Number} [config.step=0.01] - Step between consecutive values.
 * @param {Number} [config.default=0] - Default value.
 * @param {String|Element|basic-controller~Group} [config.container=null] -
 *  Container of the controller.
 * @param {Function} [config.callback=null] - Callback to be executed when the
 *  value changes.
 *
 * @example
 * import * as controllers from 'basic-controllers';
 *
 * const numberBox = new controllers.NumberBox({
 *   label: 'My Number Box',
 *   min: 0,
 *   max: 10,
 *   step: 0.1,
 *   default: 5,
 *   container: '#container',
 *   callback: (value) => console.log(value),
 * });
 */

var NumberBox = function (_BaseController) {
  _inherits(NumberBox, _BaseController);

  // legend, min = 0, max = 1, step = 0.01, defaultValue = 0, $container = null, callback = null
  function NumberBox(config) {
    _classCallCheck(this, NumberBox);

    var _this = _possibleConstructorReturn(this, (NumberBox.__proto__ || Object.getPrototypeOf(NumberBox)).call(this, 'number-box', defaults, config));

    _this._value = _this.params.default;
    _this._isIntStep = _this.params.step % 1 === 0;

    _get(NumberBox.prototype.__proto__ || Object.getPrototypeOf(NumberBox.prototype), 'initialize', _this).call(_this);
    return _this;
  }

  /**
   * Current value of the controller.
   *
   * @type {Number}
   */


  _createClass(NumberBox, [{
    key: 'render',


    /** @private */
    value: function render() {
      var _params = this.params,
          label = _params.label,
          min = _params.min,
          max = _params.max,
          step = _params.step;

      var content = '\n      <span class="label">' + label + '</span>\n      <div class="inner-wrapper">\n        ' + elements.arrowLeft + '\n        <input class="number" type="number" min="' + min + '" max="' + max + '" step="' + step + '" value="' + this._value + '" />\n        ' + elements.arrowRight + '\n      </div>\n    ';

      this.$el = _get(NumberBox.prototype.__proto__ || Object.getPrototypeOf(NumberBox.prototype), 'render', this).call(this);
      this.$el.classList.add('align-small');
      this.$el.innerHTML = content;

      this.$prev = this.$el.querySelector('.arrow-left');
      this.$next = this.$el.querySelector('.arrow-right');
      this.$number = this.$el.querySelector('input[type="number"]');

      this.bindEvents();

      return this.$el;
    }

    /** @private */

  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this2 = this;

      this.$prev.addEventListener('click', function (e) {
        var step = _this2.params.step;
        var decimals = step.toString().split('.')[1];
        var exp = decimals ? decimals.length : 0;
        var mult = Math.pow(10, exp);

        var intValue = Math.floor(_this2._value * mult + 0.5);
        var intStep = Math.floor(step * mult + 0.5);
        var value = (intValue - intStep) / mult;

        _this2.propagate(value);
      }, false);

      this.$next.addEventListener('click', function (e) {
        var step = _this2.params.step;
        var decimals = step.toString().split('.')[1];
        var exp = decimals ? decimals.length : 0;
        var mult = Math.pow(10, exp);

        var intValue = Math.floor(_this2._value * mult + 0.5);
        var intStep = Math.floor(step * mult + 0.5);
        var value = (intValue + intStep) / mult;

        _this2.propagate(value);
      }, false);

      this.$number.addEventListener('change', function (e) {
        var value = _this2.$number.value;
        value = _this2._isIntStep ? parseInt(value, 10) : parseFloat(value);
        value = Math.min(_this2.params.max, Math.max(_this2.params.min, value));

        _this2.propagate(value);
      }, false);
    }

    /** @private */

  }, {
    key: 'propagate',
    value: function propagate(value) {
      if (value === this._value) {
        return;
      }

      this._value = value;
      this.$number.value = value;

      this.executeListeners(this._value);
    }
  }, {
    key: 'value',
    get: function get() {
      return this._value;
    },
    set: function set(value) {
      // use $number element min, max and step system
      this.$number.value = value;
      value = this.$number.value;
      value = this._isIntStep ? parseInt(value, 10) : parseFloat(value);
      this._value = value;
    }
  }]);

  return NumberBox;
}(_BaseController3.default);

exports.default = NumberBox;

},{"../utils/elements":12,"./BaseController":1}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseController2 = require('./BaseController');

var _BaseController3 = _interopRequireDefault(_BaseController2);

var _elements = require('../utils/elements');

var elements = _interopRequireWildcard(_elements);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module basic-controllers */

var defaults = {
  label: '&nbsp;',
  options: null,
  default: null,
  container: null,
  callback: null
};

/**
 * List of buttons with state.
 *
 * @param {Object} config - Override default parameters.
 * @param {String} config.label - Label of the controller.
 * @param {Array} [config.options=null] - Values of the drop down list.
 * @param {Number} [config.default=null] - Default value.
 * @param {String|Element|basic-controller~Group} [config.container=null] -
 *  Container of the controller.
 * @param {Function} [config.callback=null] - Callback to be executed when the
 *  value changes.
 *
 * @example
 * import * as controllers from 'basic-controllers';
 *
 * const selectButtons = new controllers.SelectButtons({
 *   label: 'SelectButtons',
 *   options: ['standby', 'run', 'end'],
 *   default: 'run',
 *   container: '#container',
 *   callback: (value, index) => console.log(value, index),
 * });
 */

var SelectButtons = function (_BaseController) {
  _inherits(SelectButtons, _BaseController);

  function SelectButtons(config) {
    _classCallCheck(this, SelectButtons);

    var _this = _possibleConstructorReturn(this, (SelectButtons.__proto__ || Object.getPrototypeOf(SelectButtons)).call(this, 'select-buttons', defaults, config));

    if (!Array.isArray(_this.params.options)) throw new Error('TriggerButton: Invalid option "options"');

    _this._value = _this.params.default;

    var options = _this.params.options;
    var index = options.indexOf(_this._value);
    _this._index = index === -1 ? 0 : index;
    _this._maxIndex = options.length - 1;

    _get(SelectButtons.prototype.__proto__ || Object.getPrototypeOf(SelectButtons.prototype), 'initialize', _this).call(_this);
    return _this;
  }

  /**
   * Current value.
   * @type {String}
   */


  _createClass(SelectButtons, [{
    key: 'render',


    /** @private */
    value: function render() {
      var _params = this.params,
          options = _params.options,
          label = _params.label;

      var content = '\n      <span class="label">' + label + '</span>\n      <div class="inner-wrapper">\n        ' + elements.arrowLeft + '\n        ' + options.map(function (option, index) {
        return '\n            <button class="btn" data-index="' + index + '" data-value="' + option + '">\n              ' + option + '\n            </button>';
      }).join('') + '\n        ' + elements.arrowRight + '\n      </div>\n    ';

      this.$el = _get(SelectButtons.prototype.__proto__ || Object.getPrototypeOf(SelectButtons.prototype), 'render', this).call(this, this.type);
      this.$el.innerHTML = content;

      this.$prev = this.$el.querySelector('.arrow-left');
      this.$next = this.$el.querySelector('.arrow-right');
      this.$btns = Array.from(this.$el.querySelectorAll('.btn'));

      this._highlightBtn(this._index);
      this.bindEvents();

      return this.$el;
    }

    /** @private */

  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this2 = this;

      this.$prev.addEventListener('click', function () {
        var index = _this2._index - 1;
        _this2.propagate(index);
      });

      this.$next.addEventListener('click', function () {
        var index = _this2._index + 1;
        _this2.propagate(index);
      });

      this.$btns.forEach(function ($btn, index) {
        $btn.addEventListener('click', function (e) {
          e.preventDefault();
          _this2.propagate(index);
        });
      });
    }

    /** @private */

  }, {
    key: 'propagate',
    value: function propagate(index) {
      if (index < 0 || index > this._maxIndex) return;

      this._index = index;
      this._value = this.params.options[index];
      this._highlightBtn(this._index);

      this.executeListeners(this._value, this._index);
    }

    /** @private */

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
    set: function set(value) {
      var index = this.params.options.indexOf(value);

      if (index !== -1) this.index = index;
    }

    /**
     * Current option index.
     * @type {Number}
     */

  }, {
    key: 'index',
    get: function get() {
      this._index;
    },
    set: function set(index) {
      if (index < 0 || index > this._maxIndex) return;

      this._value = this.params.options[index];
      this._index = index;
      this._highlightBtn(this._index);
    }
  }]);

  return SelectButtons;
}(_BaseController3.default);

exports.default = SelectButtons;

},{"../utils/elements":12,"./BaseController":1}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseController2 = require('./BaseController');

var _BaseController3 = _interopRequireDefault(_BaseController2);

var _elements = require('../utils/elements');

var elements = _interopRequireWildcard(_elements);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module basic-controllers */

var defaults = {
  label: '&nbsp;',
  options: null,
  default: null,
  container: null,
  callback: null
};

/**
 * Drop-down list controller.
 *
 * @param {Object} config - Override default parameters.
 * @param {String} config.label - Label of the controller.
 * @param {Array} [config.options=null] - Values of the drop down list.
 * @param {Number} [config.default=null] - Default value.
 * @param {String|Element|basic-controller~Group} [config.container=null] -
 *  Container of the controller.
 * @param {Function} [config.callback=null] - Callback to be executed when the
 *  value changes.
 *
 * @example
 * import * as controllers from 'basic-controllers';
 *
 * const selectList = new controllers.SelectList({
 *   label: 'SelectList',
 *   options: ['standby', 'run', 'end'],
 *   default: 'run',
 *   container: '#container',
 *   callback: (value, index) => console.log(value, index),
 * });
 */

var SelectList = function (_BaseController) {
  _inherits(SelectList, _BaseController);

  function SelectList(config) {
    _classCallCheck(this, SelectList);

    var _this = _possibleConstructorReturn(this, (SelectList.__proto__ || Object.getPrototypeOf(SelectList)).call(this, 'select-list', defaults, config));

    if (!Array.isArray(_this.params.options)) throw new Error('TriggerButton: Invalid option "options"');

    _this._value = _this.params.default;

    var options = _this.params.options;
    var index = options.indexOf(_this._value);
    _this._index = index === -1 ? 0 : index;
    _this._maxIndex = options.length - 1;

    _get(SelectList.prototype.__proto__ || Object.getPrototypeOf(SelectList.prototype), 'initialize', _this).call(_this);
    return _this;
  }

  /**
   * Current value.
   * @type {String}
   */


  _createClass(SelectList, [{
    key: 'render',


    /** @private */
    value: function render() {
      var _params = this.params,
          label = _params.label,
          options = _params.options;

      var content = '\n      <span class="label">' + label + '</span>\n      <div class="inner-wrapper">\n        ' + elements.arrowLeft + '\n        <select>\n        ' + options.map(function (option, index) {
        return '<option value="' + option + '">' + option + '</option>';
      }).join('') + '\n        <select>\n        ' + elements.arrowRight + '\n      </div>\n    ';

      this.$el = _get(SelectList.prototype.__proto__ || Object.getPrototypeOf(SelectList.prototype), 'render', this).call(this, this.type);
      this.$el.classList.add('align-small');
      this.$el.innerHTML = content;

      this.$prev = this.$el.querySelector('.arrow-left');
      this.$next = this.$el.querySelector('.arrow-right');
      this.$select = this.$el.querySelector('select');
      // set to default value
      this.$select.value = options[this._index];
      this.bindEvents();

      return this.$el;
    }

    /** @private */

  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this2 = this;

      this.$prev.addEventListener('click', function () {
        var index = _this2._index - 1;
        _this2.propagate(index);
      }, false);

      this.$next.addEventListener('click', function () {
        var index = _this2._index + 1;
        _this2.propagate(index);
      }, false);

      this.$select.addEventListener('change', function () {
        var value = _this2.$select.value;
        var index = _this2.params.options.indexOf(value);
        _this2.propagate(index);
      });
    }

    /** @private */

  }, {
    key: 'propagate',
    value: function propagate(index) {
      if (index < 0 || index > this._maxIndex) return;

      var value = this.params.options[index];
      this._index = index;
      this._value = value;
      this.$select.value = value;

      this.executeListeners(this._value, this._index);
    }
  }, {
    key: 'value',
    get: function get() {
      return this._value;
    },
    set: function set(value) {
      this.$select.value = value;
      this._value = value;
      this._index = this.params.options.indexOf(value);
    }

    /**
     * Current option index.
     * @type {Number}
     */

  }, {
    key: 'index',
    get: function get() {
      return this._index;
    },
    set: function set(index) {
      if (index < 0 || index > this._maxIndex) return;
      this.value = this.params.options[index];
    }
  }]);

  return SelectList;
}(_BaseController3.default);

exports.default = SelectList;

},{"../utils/elements":12,"./BaseController":1}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseController2 = require('./BaseController');

var _BaseController3 = _interopRequireDefault(_BaseController2);

var _guiComponents = require('gui-components');

var guiComponents = _interopRequireWildcard(_guiComponents);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module basic-controllers */

var defaults = {
  label: '&nbsp;',
  min: 0,
  max: 1,
  step: 0.01,
  default: 0,
  unit: '',
  size: 'medium',
  container: null,
  callback: null
};

/**
 * Slider controller.
 *
 * @param {Object} config - Override default parameters.
 * @param {String} config.label - Label of the controller.
 * @param {Number} [config.min=0] - Minimum value.
 * @param {Number} [config.max=1] - Maximum value.
 * @param {Number} [config.step=0.01] - Step between consecutive values.
 * @param {Number} [config.default=0] - Default value.
 * @param {String} [config.unit=''] - Unit of the value.
 * @param {'small'|'medium'|'large'} [config.size='medium'] - Size of the
 *  slider.
 * @param {String|Element|basic-controller~Group} [config.container=null] -
 *  Container of the controller.
 * @param {Function} [config.callback=null] - Callback to be executed when the
 *  value changes.
 *
 * @example
 * import * as controllers from 'basic-controllers';
 *
 * const slider = new controllers.Slider({
 *   label: 'My Slider',
 *   min: 20,
 *   max: 1000,
 *   step: 1,
 *   default: 537,
 *   unit: 'Hz',
 *   size: 'large',
 *   container: '#container',
 *   callback: (value) => console.log(value),
 * });
 */

var Slider = function (_BaseController) {
  _inherits(Slider, _BaseController);

  function Slider(config) {
    _classCallCheck(this, Slider);

    var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, 'slider', defaults, config));

    _this._value = _this.params.default;
    _this._onSliderChange = _this._onSliderChange.bind(_this);

    _get(Slider.prototype.__proto__ || Object.getPrototypeOf(Slider.prototype), 'initialize', _this).call(_this);
    return _this;
  }

  /**
   * Current value.
   * @type {Number}
   */


  _createClass(Slider, [{
    key: 'render',


    /** @private */
    value: function render() {
      var _params = this.params,
          label = _params.label,
          min = _params.min,
          max = _params.max,
          step = _params.step,
          unit = _params.unit,
          size = _params.size;

      var content = '\n      <span class="label">' + label + '</span>\n      <div class="inner-wrapper">\n        <div class="range"></div>\n        <div class="number-wrapper">\n          <input type="number" class="number" min="' + min + '" max="' + max + '" step="' + step + '" value="' + this._value + '" />\n          <span class="unit">' + unit + '</span>\n        </div>\n      </div>';

      this.$el = _get(Slider.prototype.__proto__ || Object.getPrototypeOf(Slider.prototype), 'render', this).call(this, this.type);
      this.$el.innerHTML = content;
      this.$el.classList.add('slider-' + size);

      this.$range = this.$el.querySelector('.range');
      this.$number = this.$el.querySelector('input[type="number"]');

      this.slider = new guiComponents.Slider({
        container: this.$range,
        callback: this._onSliderChange,
        min: min,
        max: max,
        step: step,
        default: this._value,
        foregroundColor: '#ababab'
      });

      this.bindEvents();

      return this.$el;
    }

    /** @private */

  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this2 = this;

      this.$number.addEventListener('change', function () {
        var value = parseFloat(_this2.$number.value);
        // the slider propagates the value
        _this2.slider.value = value;
        _this2._value = value;
      }, false);
    }

    /** @private */

  }, {
    key: 'onResize',
    value: function onResize() {
      _get(Slider.prototype.__proto__ || Object.getPrototypeOf(Slider.prototype), 'onResize', this).call(this);

      var _$range$getBoundingCl = this.$range.getBoundingClientRect(),
          width = _$range$getBoundingCl.width,
          height = _$range$getBoundingCl.height;

      this.slider.resize(width, height);
    }

    /** @private */

  }, {
    key: '_onSliderChange',
    value: function _onSliderChange(value) {
      this.$number.value = value;
      this._value = value;

      this.executeListeners(this._value);
    }
  }, {
    key: 'value',
    set: function set(value) {
      this._value = value;

      if (this.$number && this.$range) {
        this.$number.value = this.value;
        this.slider.value = this.value;
      }
    },
    get: function get() {
      return this._value;
    }
  }]);

  return Slider;
}(_BaseController3.default);

exports.default = Slider;

},{"./BaseController":1,"gui-components":18}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseController2 = require('./BaseController');

var _BaseController3 = _interopRequireDefault(_BaseController2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module basic-controllers */

var defaults = {
  label: '&nbsp;',
  default: '',
  readonly: false,
  container: null,
  callback: null
};

/**
 * Text controller.
 *
 * @param {Object} config - Override default parameters.
 * @param {String} config.label - Label of the controller.
 * @param {Array} [config.default=''] - Default value of the controller.
 * @param {Array} [config.readonly=false] - Define if the controller is readonly.
 * @param {String|Element|basic-controller~Group} [config.container=null] -
 *  Container of the controller.
 * @param {Function} [config.callback=null] - Callback to be executed when the
 *  value changes.
 *
 * @example
 * import * as controllers from 'basic-contollers';
 *
 * const text = new controllers.Text({
 *   label: 'My Text',
 *   default: 'default value',
 *   readonly: false,
 *   container: '#container',
 *   callback: (value) => console.log(value),
 * });
 */

var Text = function (_BaseController) {
  _inherits(Text, _BaseController);

  function Text(config) {
    _classCallCheck(this, Text);

    var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, 'text', defaults, config));

    _this._value = _this.params.default;
    _this.initialize();
    return _this;
  }

  /**
   * Current value.
   * @type {String}
   */


  _createClass(Text, [{
    key: 'render',


    /** @private */
    value: function render() {
      var readonly = this.params.readonly ? 'readonly' : '';
      var content = '\n      <span class="label">' + this.params.label + '</span>\n      <div class="inner-wrapper">\n        <input class="text" type="text" value="' + this._value + '" ' + readonly + ' />\n      </div>\n    ';

      this.$el = _get(Text.prototype.__proto__ || Object.getPrototypeOf(Text.prototype), 'render', this).call(this);
      this.$el.innerHTML = content;
      this.$input = this.$el.querySelector('.text');

      this.bindEvents();
      return this.$el;
    }

    /** @private */

  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this2 = this;

      this.$input.addEventListener('keyup', function () {
        _this2._value = _this2.$input.value;
        _this2.executeListeners(_this2._value);
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
}(_BaseController3.default);

exports.default = Text;

},{"./BaseController":1}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseController2 = require('./BaseController');

var _BaseController3 = _interopRequireDefault(_BaseController2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module basic-controllers */

var defaults = {
  label: '&nbsp;',
  container: null
};

/**
 * Title.
 *
 * @param {Object} config - Override default parameters.
 * @param {String} config.label - Label of the controller.
 * @param {String|Element|basic-controller~Group} [config.container=null] -
 *  Container of the controller.
 *
 * @example
 * import * as controller from 'basic-controllers';
 *
 * const title = new controllers.Title({
 *   label: 'My Title',
 *   container: '#container'
 * });
 */

var Title = function (_BaseController) {
  _inherits(Title, _BaseController);

  function Title(config) {
    _classCallCheck(this, Title);

    var _this = _possibleConstructorReturn(this, (Title.__proto__ || Object.getPrototypeOf(Title)).call(this, 'title', defaults, config));

    _get(Title.prototype.__proto__ || Object.getPrototypeOf(Title.prototype), 'initialize', _this).call(_this);
    return _this;
  }

  /** @private */


  _createClass(Title, [{
    key: 'render',
    value: function render() {
      var content = '<span class="label">' + this.params.label + '</span>';

      this.$el = _get(Title.prototype.__proto__ || Object.getPrototypeOf(Title.prototype), 'render', this).call(this);
      this.$el.innerHTML = content;

      return this.$el;
    }
  }]);

  return Title;
}(_BaseController3.default);

exports.default = Title;

},{"./BaseController":1}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseController2 = require('./BaseController');

var _BaseController3 = _interopRequireDefault(_BaseController2);

var _elements = require('../utils/elements');

var elements = _interopRequireWildcard(_elements);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module basic-controllers */

var defaults = {
  label: '&bnsp;',
  active: false,
  container: null,
  callback: null
};

/**
 * On/Off controller.
 *
 * @param {Object} config - Override default parameters.
 * @param {String} config.label - Label of the controller.
 * @param {Array} [config.active=false] - Default state of the toggle.
 * @param {String|Element|basic-controller~Group} [config.container=null] -
 *  Container of the controller.
 * @param {Function} [config.callback=null] - Callback to be executed when the
 *  value changes.
 *
 * @example
 * import * as controllers from 'basic-controllers';
 *
 * const toggle = new controllers.Toggle({
 *   label: 'My Toggle',
 *   active: false,
 *   container: '#container',
 *   callback: (active) => console.log(active),
 * });
 */

var Toggle = function (_BaseController) {
  _inherits(Toggle, _BaseController);

  function Toggle(config) {
    _classCallCheck(this, Toggle);

    var _this = _possibleConstructorReturn(this, (Toggle.__proto__ || Object.getPrototypeOf(Toggle)).call(this, 'toggle', defaults, config));

    _this._active = _this.params.active;

    _get(Toggle.prototype.__proto__ || Object.getPrototypeOf(Toggle.prototype), 'initialize', _this).call(_this);
    return _this;
  }

  /**
   * Value of the toggle
   * @type {Boolean}
   */


  _createClass(Toggle, [{
    key: '_updateBtn',


    /** @private */
    value: function _updateBtn() {
      var method = this.active ? 'add' : 'remove';
      this.$toggle.classList[method]('active');
    }

    /** @private */

  }, {
    key: 'render',
    value: function render() {
      var content = '\n      <span class="label">' + this.params.label + '</span>\n      <div class="inner-wrapper">\n        ' + elements.toggle + '\n      </div>';

      this.$el = _get(Toggle.prototype.__proto__ || Object.getPrototypeOf(Toggle.prototype), 'render', this).call(this);
      this.$el.classList.add('align-small');
      this.$el.innerHTML = content;

      this.$toggle = this.$el.querySelector('.toggle-element');
      // initialize state
      this.active = this._active;
      this.bindEvents();

      return this.$el;
    }

    /** @private */

  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this2 = this;

      this.$toggle.addEventListener('click', function (e) {
        e.preventDefault();

        _this2.active = !_this2.active;
        _this2.executeListeners(_this2._active);
      });
    }
  }, {
    key: 'value',
    set: function set(bool) {
      this.active = bool;
    },
    get: function get() {
      return this._active;
    }

    /**
     * Alias for `value`.
     * @type {Boolean}
     */

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
}(_BaseController3.default);

exports.default = Toggle;

},{"../utils/elements":12,"./BaseController":1}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseController2 = require('./BaseController');

var _BaseController3 = _interopRequireDefault(_BaseController2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module basic-controllers */

var defaults = {
  label: '&nbsp;',
  options: null,
  container: null,
  callback: null
};

/**
 * List of buttons without state.
 *
 * @param {Object} config - Override default parameters.
 * @param {String} config.label - Label of the controller.
 * @param {Array} [config.options=null] - Options for each button.
 * @param {String|Element|basic-controller~Group} [config.container=null] -
 *  Container of the controller.
 * @param {Function} [config.callback=null] - Callback to be executed when the
 *  value changes.
 *
 * @example
 * import * as controllers from 'basic-controllers';
 *
 * const triggerButtons = new controllers.TriggerButtons({
 *   label: 'My Trigger Buttons',
 *   options: ['value 1', 'value 2', 'value 3'],
 *   container: '#container',
 *   callback: (value, index) => console.log(value, index),
 * });
 */

var TriggerButtons = function (_BaseController) {
  _inherits(TriggerButtons, _BaseController);

  function TriggerButtons(config) {
    _classCallCheck(this, TriggerButtons);

    var _this = _possibleConstructorReturn(this, (TriggerButtons.__proto__ || Object.getPrototypeOf(TriggerButtons)).call(this, 'trigger-buttons', defaults, config));

    if (!Array.isArray(_this.params.options)) throw new Error('TriggerButton: Invalid option "options"');

    _this._index = null;
    _this._value = null;

    _get(TriggerButtons.prototype.__proto__ || Object.getPrototypeOf(TriggerButtons.prototype), 'initialize', _this).call(_this);
    return _this;
  }

  /**
   * Last triggered button value.
   *
   * @readonly
   * @type {String}
   */


  _createClass(TriggerButtons, [{
    key: 'render',


    /** @private */
    value: function render() {
      var _params = this.params,
          label = _params.label,
          options = _params.options;


      var content = '\n      <span class="label">' + label + '</span>\n      <div class="inner-wrapper">\n        ' + options.map(function (option, index) {
        return '<a href="#" class="btn">' + option + '</a>';
      }).join('') + '\n      </div>';

      this.$el = _get(TriggerButtons.prototype.__proto__ || Object.getPrototypeOf(TriggerButtons.prototype), 'render', this).call(this);
      this.$el.innerHTML = content;

      this.$buttons = Array.from(this.$el.querySelectorAll('.btn'));
      this.bindEvents();

      return this.$el;
    }

    /** @private */

  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this2 = this;

      this.$buttons.forEach(function ($btn, index) {
        var value = _this2.params.options[index];

        $btn.addEventListener('click', function (e) {
          e.preventDefault();

          _this2._value = value;
          _this2._index = index;

          _this2.executeListeners(value, index);
        });
      });
    }
  }, {
    key: 'value',
    get: function get() {
      return this._value;
    }

    /**
     * Last triggered button index.
     *
     * @readonly
     * @type {String}
     */

  }, {
    key: 'index',
    get: function get() {
      return this._index;
    }
  }]);

  return TriggerButtons;
}(_BaseController3.default);

exports.default = TriggerButtons;

},{"./BaseController":1}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerButtons = exports.Toggle = exports.Title = exports.Text = exports.Slider = exports.SelectList = exports.SelectButtons = exports.NumberBox = exports.Group = exports.BaseController = exports.styles = undefined;

var _Group = require('./components/Group');

Object.defineProperty(exports, 'Group', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Group).default;
  }
});

var _NumberBox = require('./components/NumberBox');

Object.defineProperty(exports, 'NumberBox', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_NumberBox).default;
  }
});

var _SelectButtons = require('./components/SelectButtons');

Object.defineProperty(exports, 'SelectButtons', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SelectButtons).default;
  }
});

var _SelectList = require('./components/SelectList');

Object.defineProperty(exports, 'SelectList', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SelectList).default;
  }
});

var _Slider = require('./components/Slider');

Object.defineProperty(exports, 'Slider', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Slider).default;
  }
});

var _Text = require('./components/Text');

Object.defineProperty(exports, 'Text', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Text).default;
  }
});

var _Title = require('./components/Title');

Object.defineProperty(exports, 'Title', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Title).default;
  }
});

var _Toggle = require('./components/Toggle');

Object.defineProperty(exports, 'Toggle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Toggle).default;
  }
});

var _TriggerButtons = require('./components/TriggerButtons');

Object.defineProperty(exports, 'TriggerButtons', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_TriggerButtons).default;
  }
});
exports.setTheme = setTheme;
exports.disableStyles = disableStyles;
exports.create = create;

var _styles2 = require('./utils/styles');

var _styles = _interopRequireWildcard(_styles2);

var _BaseController2 = require('./components/BaseController');

var _BaseController3 = _interopRequireDefault(_BaseController2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = exports.styles = _styles;

/**
 * @module basic-controllers
 */

// expose for plugins
var BaseController = exports.BaseController = _BaseController3.default;

/**
 * Change the theme of the controllers, currently 3 themes are available:
 *  - 'light' (default)
 *  - 'grey'
 *  - 'dark'
 *
 * @param {String} theme - Name of the theme.
 */
function setTheme(theme) {
  _BaseController3.default.theme = theme;
};

/**
 * Disable default styling (expect a broken ui)
 */
function disableStyles() {
  _styles.disable();
};

console.log(Group);

function create(container, config) {}

},{"./components/BaseController":1,"./components/Group":2,"./components/NumberBox":3,"./components/SelectButtons":4,"./components/SelectList":5,"./components/Slider":6,"./components/Text":7,"./components/Title":8,"./components/Toggle":9,"./components/TriggerButtons":10,"./utils/styles":14}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var toggle = exports.toggle = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"toggle-element\" version=\"1.1\" viewBox=\"0 0 50 50\" preserveAspectRatio=\"none\">\n      <g class=\"x\">\n        <line x1=\"8\" y1=\"8\" x2=\"42\" y2=\"42\" stroke=\"white\" />\n        <line x1=\"8\" y1=\"42\" x2=\"42\" y2=\"8\" stroke=\"white\" />\n      </g>\n  </svg>\n";

var arrowRight = exports.arrowRight = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"arrow-right\" version=\"1.1\" viewBox=\"0 0 50 50\" preserveAspectRatio=\"none\">\n    <line x1=\"10\" y1=\"10\" x2=\"40\" y2=\"25\" />\n    <line x1=\"10\" y1=\"40\" x2=\"40\" y2=\"25\" />\n  </svg>\n";

var arrowLeft = exports.arrowLeft = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"arrow-left\" version=\"1.1\" viewBox=\"0 0 50 50\" preserveAspectRatio=\"none\">\n    <line x1=\"40\" y1=\"10\" x2=\"10\" y2=\"25\" />\n    <line x1=\"40\" y1=\"40\" x2=\"10\" y2=\"25\" />\n  </svg>\n";

var smallArrowRight = exports.smallArrowRight = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"small-arrow-right\" viewBox=\"0 0 50 50\">\n    <path d=\"M 20 15 L 35 25 L 20 35 Z\" />\n  </svg>\n";

var smallArrowBottom = exports.smallArrowBottom = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"small-arrow-bottom\" viewBox=\"0 0 50 50\">\n    <path d=\"M 15 17 L 35 17 L 25 32 Z\" />\n  </svg>\n";

},{}],13:[function(require,module,exports){
module.exports = " .basic-controllers { } .basic-controllers { width: 100%; max-width: 800px; height: 34px; padding: 3px; margin: 4px auto; background-color: #efefef; border: 1px solid #aaaaaa; box-sizing: border-box; border-radius: 2px; display: block; color: #464646; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .basic-controllers .label { font: italic normal 1.2em Quicksand, arial, sans-serif; line-height: 26px; overflow: hidden; text-align: right; padding: 0 8px 0 0; display: block; box-sizing: border-box; width: 24%; float: left; white-space: nowrap; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none; user-select: none; } .basic-controllers .inner-wrapper { display: -webkit-inline-flex; display: inline-flex; -webkit-flex-wrap: no-wrap; flex-wrap: no-wrap; width: 76%; float: left; } .basic-controllers.small { height: 48px; } .basic-controllers.small:not(.align-small) { height: auto; } .basic-controllers.small:not(.align-small) .label { width: 100%; float: none; text-align: left; line-height: 40px; } .basic-controllers.small:not(.align-small) .inner-wrapper { width: 100%; float: none; } .basic-controllers.small.align-small .label { display: block; margin-right: 20px; text-align: left; line-height: 40px; } .basic-controllers.small.align-small .inner-wrapper { display: inline-block; width: auto; } .basic-controllers .arrow-right, .basic-controllers .arrow-left { border-radius: 2px; width: 14px; height: 26px; cursor: pointer; background-color: #464646; } .basic-controllers .arrow-right line, .basic-controllers .arrow-left line { stroke-width: 3px; stroke: #ffffff; } .basic-controllers .arrow-right:hover, .basic-controllers .arrow-left:hover { background-color: #686868; } .basic-controllers .arrow-right:active, .basic-controllers .arrow-left:active { background-color: #909090; } .basic-controllers .small-arrow-right, .basic-controllers .small-arrow-bottom { width: 26px; height: 26px; cursor: pointer; } .basic-controllers .small-arrow-right path, .basic-controllers .small-arrow-bottom path { fill: #909090; } .basic-controllers .small-arrow-right:hover path, .basic-controllers .small-arrow-bottom:hover path { fill: #686868; } .basic-controllers .toggle-element { width: 26px; height: 26px; border-radius: 2px; background-color: #464646; cursor: pointer; } .basic-controllers .toggle-element:hover { background-color: #686868; } .basic-controllers .toggle-element line { stroke-width: 3px; } .basic-controllers .toggle-element .x { display: none; } .basic-controllers .toggle-element.active .x { display: block; } .basic-controllers .btn { display: block; text-align: center; font: normal normal 12px arial; text-decoration: none; height: 26px; line-height: 26px; background-color: #464646; border: none; color: #ffffff; margin: 0 4px 0 0; padding: 0; box-sizing: border-box; border-radius: 2px; cursor: pointer; -webkit-flex-grow: 1; flex-grow: 1; } .basic-controllers .btn:last-child { margin: 0; } .basic-controllers .btn:hover { background-color: #686868; } .basic-controllers .btn:active, .basic-controllers .btn.active { background-color: #909090; } .basic-controllers .btn:focus { outline: none; } .basic-controllers .number { height: 26px; display: inline-block; position: relative; font: normal normal 1.2em Quicksand, arial, sans-serif; vertical-align: top; border: none; background: none; color: #464646; padding: 0 4px; margin: 0; background-color: #f9f9f9; border-radius: 2px; box-sizing: border-box; } .basic-controllers .number:focus { outline: none; } .basic-controllers select { height: 26px; line-height: 26px; background-color: #f9f9f9; border-radius: 2px; border: none; vertical-align: top; padding: 0; margin: 0; } .basic-controllers select:focus { outline: none; } .basic-controllers input[type=text] { width: 100%; height: 26px; line-height: 26px; border: 0; padding: 0 4px; background-color: #f9f9f9; border-radius: 2px; color: #565656; } .basic-controllers.small .arrow-right, .basic-controllers.small .arrow-left { width: 24px; height: 40px; } .basic-controllers.small .toggle-element { width: 40px; height: 40px; } .basic-controllers.small .btn { height: 40px; line-height: 40px; } .basic-controllers.small .number { height: 40px; } .basic-controllers.small select { height: 40px; line-height: 40px; } .basic-controllers.small input[type=text] { height: 40px; line-height: 40px; } .basic-controllers.title { border: none !important; margin-bottom: 0; margin-top: 8px; padding-top: 8px; padding-bottom: 0; background-color: transparent !important; height: 25px; } .basic-controllers.title .label { font: normal bold 1.3em Quicksand, arial, sans-serif; height: 100%; overflow: hidden; text-align: left; padding: 0; width: 100%; box-sizing: border-box; -webkit-flex-grow: 1; flex-grow: 1; } .basic-controllers.group { height: auto; background-color: white; } .basic-controllers.group .group-header .label { font: normal bold 1.3em Quicksand, arial, sans-serif; height: 26px; line-height: 26px; overflow: hidden; text-align: left; padding: 0 0 0 36px; width: 100%; box-sizing: border-box; -webkit-flex-grow: 1; flex-grow: 1; float: none; cursor: pointer; } .basic-controllers.group .group-header .small-arrow-right { width: 26px; height: 26px; position: absolute; } .basic-controllers.group .group-header .small-arrow-bottom { width: 26px; height: 26px; position: absolute; } .basic-controllers.group .group-content { overflow: hidden; } .basic-controllers.group .group-content label:last-child { margin-bottom: 0; } .basic-controllers.group.opened .group-header .small-arrow-right { display: none; } .basic-controllers.group.opened .group-header .small-arrow-bottom { display: block; } .basic-controllers.group.opened .group-content { height: auto; } .basic-controllers.group.closed .group-header .small-arrow-right { display: block; } .basic-controllers.group.closed .group-header .small-arrow-bottom { display: none; } .basic-controllers.group.closed .group-content { height: 0; } .basic-controllers.slider .range { height: 26px; display: inline-block; margin: 0; -webkit-flex-grow: 4; flex-grow: 4; position: relative; } .basic-controllers.slider .range canvas { position: absolute; top: 0; left: 0; } .basic-controllers.slider .number-wrapper { display: inline; height: 26px; text-align: right; -webkit-flex-grow: 3; flex-grow: 3; } .basic-controllers.slider .number-wrapper .number { left: 5px; width: 54px; text-align: right; } .basic-controllers.slider .number-wrapper .unit { font: italic normal 1em Quicksand, arial, sans-serif; line-height: 26px; height: 26px; width: 30px; display: inline-block; position: relative; padding-left: 5px; padding-right: 5px; color: #565656; } .basic-controllers.slider .number-wrapper .unit sup { line-height: 7px; } .basic-controllers.slider.slider-large .range { -webkit-flex-grow: 50; flex-grow: 50; } .basic-controllers.slider.slider-large .number-wrapper { -webkit-flex-grow: 1; flex-grow: 1; } .basic-controllers.slider.slider-small .range { -webkit-flex-grow: 2; flex-grow: 2; } .basic-controllers.slider.slider-small .number-wrapper { -webkit-flex-grow: 4; flex-grow: 4; } .basic-controllers.number-box .number { width: 120px; margin: 0 10px; vertical-align: top; } .basic-controllers.select-list select { margin: 0 10px; width: 120px; font: normal normal 1.2em Quicksand, arial, sans-serif; color: #464646; } .basic-controllers.select-buttons .btn:first-of-type { margin-left: 4px; } .basic-controllers.text input[type=text] { font: normal normal 1.2em Quicksand, arial, sans-serif; color: #464646; } .basic-controllers.small.slider .range { height: 40px; } .basic-controllers.small.slider .number-wrapper { height: 40px; } .basic-controllers.small.slider .number-wrapper .unit { line-height: 40px; height: 40px; } .basic-controllers.grey { background-color: #363636; border: 1px solid #585858; color: rgba(255, 255, 255, 0.95); } .basic-controllers.grey .toggle-element { background-color: #efefef; } .basic-controllers.grey .toggle-element line { stroke: #363636; } .basic-controllers.grey .toggle-element:hover { background-color: #cdcdcd; } .basic-controllers.grey .arrow-right, .basic-controllers.grey .arrow-left { background-color: #efefef; } .basic-controllers.grey .arrow-right line, .basic-controllers.grey .arrow-left line { stroke: #363636; } .basic-controllers.grey .arrow-right:hover, .basic-controllers.grey .arrow-left:hover { background-color: #cdcdcd; } .basic-controllers.grey .arrow-right:active, .basic-controllers.grey .arrow-left:active { background-color: #ababab; } .basic-controllers.grey .small-arrow-right path, .basic-controllers.grey .small-arrow-bottom path { fill: #ababab; } .basic-controllers.grey .small-arrow-right:hover path, .basic-controllers.grey .small-arrow-bottom:hover path { fill: #cdcdcd; } .basic-controllers.grey .number, .basic-controllers.grey select, .basic-controllers.grey input[type=text] { color: rgba(255, 255, 255, 0.95); background-color: #454545; } .basic-controllers.grey .btn { background-color: #efefef; color: #363636; } .basic-controllers.grey .btn:hover { background-color: #cdcdcd; } .basic-controllers.grey .btn:active, .basic-controllers.grey .btn.active { background-color: #ababab; } .basic-controllers.grey.slider .inner-wrapper .number-wrapper .unit { color: #bcbcbc; } .basic-controllers.grey.group { background-color: #505050; } .basic-controllers.dark { background-color: #242424; border: 1px solid #282828; color: #ffffff; } .basic-controllers.dark .toggle-element { background-color: #464646; } .basic-controllers.dark .toggle-element line { stroke: #ffffff; } .basic-controllers.dark .toggle-element:hover { background-color: #686868; } .basic-controllers.dark .arrow-right, .basic-controllers.dark .arrow-left { background-color: #464646; } .basic-controllers.dark .arrow-right line, .basic-controllers.dark .arrow-left line { stroke: #ffffff; } .basic-controllers.dark .arrow-right:hover, .basic-controllers.dark .arrow-left:hover { background-color: #686868; } .basic-controllers.dark .arrow-right:active, .basic-controllers.dark .arrow-left:active { background-color: #909090; } .basic-controllers.dark .small-arrow-right path, .basic-controllers.dark .small-arrow-bottom path { fill: #909090; } .basic-controllers.dark .small-arrow-right:hover path, .basic-controllers.dark .small-arrow-bottom:hover path { fill: #686868; } .basic-controllers.dark .number, .basic-controllers.dark select, .basic-controllers.dark input[type=text] { color: #ffffff; background-color: #333333; } .basic-controllers.dark .btn { background-color: #464646; color: #ffffff; } .basic-controllers.dark .btn:hover { background-color: #686868; } .basic-controllers.dark .btn:active, .basic-controllers.dark .btn.active { background-color: #909090; } .basic-controllers.dark.slider .inner-wrapper .number-wrapper .unit { color: #cdcdcd; } .basic-controllers.dark.group { background-color: #3e3e3e; } ";
},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ns = undefined;
exports.disable = disable;
exports.insertStyleSheet = insertStyleSheet;

var _package = require('../../package.json');

var _stylesDeclarations = require('./styles-declarations.js');

var _stylesDeclarations2 = _interopRequireDefault(_stylesDeclarations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ns = exports.ns = _package.name;

var nsClass = '.' + ns;
var _disabled = false;

function disable() {
  _disabled = true;
}

function insertStyleSheet() {
  if (_disabled) return;

  var $css = document.createElement('style');
  $css.setAttribute('data-namespace', ns);
  $css.type = 'text/css';

  if ($css.styleSheet) $css.styleSheet.cssText = _stylesDeclarations2.default;else $css.appendChild(document.createTextNode(_stylesDeclarations2.default));

  // insert before link or styles if exists
  var $link = document.head.querySelector('link');
  var $style = document.head.querySelector('style');

  if ($link) document.head.insertBefore($css, $link);else if ($style) document.head.insertBefore($css, $style);else document.head.appendChild($css);
}

},{"../../package.json":16,"./styles-declarations.js":13}],15:[function(require,module,exports){
'use strict';

var _index = require('../../../dist/index');

var controllers = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// components
var title1 = new controllers.Title({
  label: 'Title',
  container: '#container'
});

var triggerButtons = new controllers.TriggerButtons({
  label: 'TriggerButtons',
  options: ['light', 'grey', 'dark'],
  container: '#container',
  callback: function callback(theme) {
    console.log('Button =>', theme);

    switch (theme) {
      case 'light':
        document.body.style.backgroundColor = '#ffffff';
        break;
      case 'grey':
        document.body.style.backgroundColor = '#000000';
        break;
      case 'dark':
        document.body.style.backgroundColor = '#000000';
        break;
    }

    controllers.setTheme(theme);
  }
});

var numberBox = new controllers.NumberBox({
  label: 'NumberBox',
  min: 0,
  max: 10,
  step: 0.1,
  default: 5,
  container: '#container',
  callback: function callback(value) {
    return console.log('Number =>', value);
  }
});

var toggle = new controllers.Toggle({
  label: 'Toggle',
  active: false,
  container: '#container',
  callback: function callback(active) {
    console.log('Toggle =>', active);

    if (active) numberBox.value = 0;
  }
});

var info = new controllers.Text({
  label: 'Info',
  default: 'read-only value',
  readonly: true,
  container: '#container'
});

var text = new controllers.Text({
  label: 'Text',
  default: 'default value',
  readonly: false,
  container: '#container',
  callback: function callback(value) {
    console.log('Text =>', value);
    info.value = value;
  }
});

var selectList = new controllers.SelectList({
  label: 'SelectList',
  options: ['standby', 'run', 'end'],
  default: 'run',
  container: '#container',
  callback: function callback(value) {
    console.log('SelectList =>', value);

    info.value = value;
    selectButtons.value = value;
  }
});

var selectButtons = new controllers.SelectButtons({
  label: 'SelectButtons',
  options: ['standby', 'run', 'end'],
  default: 'run',
  container: '#container',
  callback: function callback(value) {
    console.log('SelectButtons =>', value);

    info.value = value;
    selectList.value = value;
  }
});

// // group
var group = new controllers.Group({
  label: 'Group',
  default: 'opened',
  container: '#container'
});

var groupSlider = new controllers.Slider({
  label: 'Group Slider',
  min: 20,
  max: 1000,
  step: 1,
  default: 200,
  unit: 'Hz',
  size: 'large',
  container: group,
  callback: function callback(value) {
    return console.log('Group - Slider =>', value);
  }
});

var groupText = new controllers.Text({
  label: 'Group Text',
  default: 'text input',
  readonly: false,
  container: group,
  callback: function callback(value) {
    return console.log('Group - Text =>', value);
  }
});

// // sliders
var title2 = new controllers.Title({
  label: 'Sliders',
  container: '#container'
});

var sliderLarge = new controllers.Slider({
  label: 'Slider (large)',
  min: 20,
  max: 1000,
  step: 1,
  default: 537,
  unit: 'Hz',
  size: 'large',
  container: '#container',
  callback: function callback(value) {
    return console.log('Slider (large) =>', value);
  }
});

var sliderMedium = new controllers.Slider({
  label: 'Slider (default / medium)',
  min: 20,
  max: 1000,
  step: 1,
  default: 225,
  unit: 'm.s<sup>-1</sup>',
  size: 'medium',
  container: '#container',
  callback: function callback(value) {
    return console.log('Slider (default) =>', value);
  }
});

var sliderSmall = new controllers.Slider({
  label: 'Slider (small)',
  min: 20,
  max: 1000,
  step: 1,
  default: 660,
  size: 'small',
  container: '#container',
  callback: function callback(value) {
    return console.log('Slider (small) =>', value);
  }
});

},{"../../../dist/index":11}],16:[function(require,module,exports){
module.exports={
  "name": "basic-controllers",
  "version": "1.0.0",
  "description": "Set of simple controllers for rapid prototyping",
  "main": "dist/index.js",
  "scripts": {
    "doc": "jsdoc2md -t tmpl/README.hbs --separators src/**/*.js src/*.js > README.md",
    "transpile": "node ./bin/runner --transpile",
    "prewatch": "node ./bin/runner --transpile",
    "watch": "node ./bin/runner --watch"
  },
  "license": "BSD-3-Clause",
  "repository": {
    "type": "git",
    "url": "https://github.com/ircam-jstools/basic-controllers.git"
  },
  "dependencies": {
    "babel-runtime": "^6.18.0",
    "gui-components": "ircam-jstools/gui-components#v1.0.0"
  },
  "devDependencies": {
    "babel-core": "^6.18.2",
    "babel-plugin-transform-es2015-modules-commonjs": "^6.18.0",
    "babel-plugin-transform-runtime": "^6.15.0",
    "babel-preset-es2015": "^6.18.0",
    "colors": "^1.1.2",
    "fs-extra": "^1.0.0",
    "jsdoc-to-markdown": "^2.0.1",
    "node-sass": "^3.13.0",
    "watch": "^1.0.1"
  }
}

},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getScale(domain, range) {
  var slope = (range[1] - range[0]) / (domain[1] - domain[0]);
  var intercept = range[0] - slope * domain[0];

  function scale(val) {
    return slope * val + intercept;
  }

  scale.invert = function (val) {
    return (val - intercept) / slope;
  };

  return scale;
}

function getClipper(min, max, step) {
  return function (val) {
    var clippedValue = Math.round(val / step) * step;
    var fixed = Math.max(Math.log10(1 / step), 0);
    var fixedValue = clippedValue.toFixed(fixed); // fix floating point errors
    return Math.min(max, Math.max(min, parseFloat(fixedValue)));
  };
}

/**
 * @module gui-components
 */

/**
 * Versatile canvas based slider.
 *
 * @param {Object} options - Override default parameters.
 * @param {'jump'|'proportionnal'|'handle'} [options.mode='jump'] - Mode of the slider:
 *  - in 'jump' mode, the value is changed on 'touchstart' or 'mousedown', and
 *    on move.
 *  - in 'proportionnal' mode, the value is updated relatively to move.
 *  - in 'handle' mode, the slider can be grabbed only around its value.
 * @param {Function} [options.callback] - Callback to be executed when the value
 *  of the slider changes.
 * @param {Number} [options.width=200] - Width of the slider.
 * @param {Number} [options.height=30] - Height of the slider.
 * @param {Number} [options.min=0] - Minimum value.
 * @param {Number} [options.max=1] - Maximum value.
 * @param {Number} [options.step=0.01] - Step between each consecutive values.
 * @param {Number} [options.default=0] - Default value.
 * @param {String|Element} [options.container='body'] - CSS Selector or DOM
 *  element in which inserting the slider.
 * @param {String} [options.backgroundColor='#464646'] - Background color of the
 *  slider.
 * @param {String} [options.foregroundColor='steelblue'] - Foreground color of
 *  the slider.
 * @param {'horizontal'|'vertical'} [options.orientation='horizontal'] -
 *  Orientation of the slider.
 * @param {Array} [options.markers=[]] - List of values where markers should
 *  be displayed on the slider.
 * @param {Boolean} [options.showHandle=true] - In 'handle' mode, define if the
 *  draggable should be show or not.
 * @param {Number} [options.handleSize=20] - Size of the draggable zone.
 * @param {String} [options.handleColor='rgba(255, 255, 255, 0.7)'] - Color of the
 *  draggable zone (when `showHandle` is `true`).
 *
 * @example
 * import { Slider} from 'gui-components';
 *
 * const slider = new Slider({
 *   mode: 'jump',
 *   container: '#container',
 *   default: 0.6,
 *   markers: [0.5],
 *   callback: (value) => console.log(value),
 * });
 */

var Slider = function () {
  function Slider(options) {
    _classCallCheck(this, Slider);

    var defaults = {
      mode: 'jump',
      callback: function callback(value) {},
      width: 200,
      height: 30,
      min: 0,
      max: 1,
      step: 0.01,
      default: 0,
      container: 'body',
      backgroundColor: '#464646',
      foregroundColor: 'steelblue',
      orientation: 'horizontal',
      markers: [],

      // handle specific options
      showHandle: true,
      handleSize: 20,
      handleColor: 'rgba(255, 255, 255, 0.7)'
    };

    this.params = Object.assign({}, defaults, options);
    this._listeners = [];
    this._boundingClientRect = null;
    this._touchId = null;
    this._value = null;
    this._canvasWidth = null;
    this._canvasHeight = null;
    // for proportionnal mode
    this._currentMousePosition = { x: null, y: null };
    this._currentSliderPosition = null;

    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);

    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);

    this._onResize = this._onResize.bind(this);

    this._createElement();

    // initialize
    this._resizeElement();
    this._setScales();
    this._bindEvents();
    this._onResize();
    this._updateValue(this.params.default);

    window.addEventListener('resize', this._onResize);
  }

  /**
   * Current value of the slider.
   *
   * @type {Number}
   */


  _createClass(Slider, [{
    key: 'reset',


    /**
     * Reset the slider to its default value.
     */
    value: function reset() {
      this._updateValue(this.params.default);
    }

    /**
     * Resize the slider.
     *
     * @param {Number} width - New width of the slider.
     * @param {Number} height - New height of the slider.
     */

  }, {
    key: 'resize',
    value: function resize(width, height) {
      this.params.width = width;
      this.params.height = height;

      this._resizeElement();
      this._setScales();
      this._onResize();
      this._updateValue(this._value, true);
    }
  }, {
    key: '_updateValue',
    value: function _updateValue(value) {
      var _this = this;

      var forceRender = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var callback = this.params.callback;

      var clippedValue = this.clipper(value);

      // if resize render but don't trigger callback
      if (clippedValue === this._value && forceRender === true) requestAnimationFrame(function () {
        return _this._render(clippedValue);
      });

      // trigger callback
      if (clippedValue !== this._value) {
        this._value = clippedValue;
        callback(clippedValue);
        requestAnimationFrame(function () {
          return _this._render(clippedValue);
        });
      }
    }
  }, {
    key: '_createElement',
    value: function _createElement() {
      var container = this.params.container;

      this.$canvas = document.createElement('canvas');
      this.ctx = this.$canvas.getContext('2d');

      if (container instanceof Element) this.$container = container;else this.$container = document.querySelector(container);

      this.$container.appendChild(this.$canvas);
    }
  }, {
    key: '_resizeElement',
    value: function _resizeElement() {
      var _params = this.params,
          width = _params.width,
          height = _params.height;

      // logical and pixel size of the canvas

      this._pixelRatio = function (ctx) {
        var dPR = window.devicePixelRatio || 1;
        var bPR = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;

        return dPR / bPR;
      }(this.ctx);

      this._canvasWidth = width * this._pixelRatio;
      this._canvasHeight = height * this._pixelRatio;

      this.ctx.canvas.width = this._canvasWidth;
      this.ctx.canvas.height = this._canvasHeight;
      this.ctx.canvas.style.width = width + 'px';
      this.ctx.canvas.style.height = height + 'px';
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      this._boundingClientRect = this.$canvas.getBoundingClientRect();
    }
  }, {
    key: '_setScales',
    value: function _setScales() {
      var _params2 = this.params,
          orientation = _params2.orientation,
          width = _params2.width,
          height = _params2.height,
          min = _params2.min,
          max = _params2.max,
          step = _params2.step;
      // define transfert functions

      var screenSize = orientation === 'horizontal' ? width : height;

      var canvasSize = orientation === 'horizontal' ? this._canvasWidth : this._canvasHeight;

      var domain = orientation === 'horizontal' ? [min, max] : [max, min];
      var screenRange = [0, screenSize];
      var canvasRange = [0, canvasSize];

      this.screenScale = getScale(domain, screenRange);
      this.canvasScale = getScale(domain, canvasRange);
      this.clipper = getClipper(min, max, step);
    }
  }, {
    key: '_bindEvents',
    value: function _bindEvents() {
      this.$canvas.addEventListener('mousedown', this._onMouseDown);
      this.$canvas.addEventListener('touchstart', this._onTouchStart);
    }
  }, {
    key: '_onStart',
    value: function _onStart(x, y) {
      var started = null;

      switch (this.params.mode) {
        case 'jump':
          this._updatePosition(x, y);
          started = true;
          break;
        case 'proportionnal':
          this._currentMousePosition.x = x;
          this._currentMousePosition.y = y;
          started = true;
          break;
        case 'handle':
          var orientation = this.params.orientation;
          var position = this.screenScale(this._value);
          var compare = orientation === 'horizontal' ? x : y;
          var delta = this.params.handleSize / 2;

          if (compare < position + delta && compare > position - delta) {
            this._currentMousePosition.x = x;
            this._currentMousePosition.y = y;
            started = true;
          } else {
            started = false;
          }
          break;
      }

      return started;
    }
  }, {
    key: '_onMove',
    value: function _onMove(x, y) {
      switch (this.params.mode) {
        case 'jump':
          break;
        case 'proportionnal':
        case 'handle':
          var deltaX = x - this._currentMousePosition.x;
          var deltaY = y - this._currentMousePosition.y;
          this._currentMousePosition.x = x;
          this._currentMousePosition.y = y;

          x = this.screenScale(this._value) + deltaX;
          y = this.screenScale(this._value) + deltaY;
          break;
      }

      this._updatePosition(x, y);
    }
  }, {
    key: '_onEnd',
    value: function _onEnd() {
      switch (this.params.mode) {
        case 'jump':
          break;
        case 'proportionnal':
        case 'handle':
          this._currentMousePosition.x = null;
          this._currentMousePosition.y = null;
          break;
      }
    }

    // mouse events

  }, {
    key: '_onMouseDown',
    value: function _onMouseDown(e) {
      var pageX = e.pageX;
      var pageY = e.pageY;
      var x = pageX - this._boundingClientRect.left;
      var y = pageY - this._boundingClientRect.top;

      if (this._onStart(x, y) === true) {
        window.addEventListener('mousemove', this._onMouseMove);
        window.addEventListener('mouseup', this._onMouseUp);
      }
    }
  }, {
    key: '_onMouseMove',
    value: function _onMouseMove(e) {
      e.preventDefault(); // prevent text selection

      var pageX = e.pageX;
      var pageY = e.pageY;
      var x = pageX - this._boundingClientRect.left;;
      var y = pageY - this._boundingClientRect.top;;

      this._onMove(x, y);
    }
  }, {
    key: '_onMouseUp',
    value: function _onMouseUp(e) {
      this._onEnd();

      window.removeEventListener('mousemove', this._onMouseMove);
      window.removeEventListener('mouseup', this._onMouseUp);
    }

    // touch events

  }, {
    key: '_onTouchStart',
    value: function _onTouchStart(e) {
      if (this._touchId !== null) return;

      var touch = e.touches[0];
      this._touchId = touch.identifier;

      var pageX = touch.pageX;
      var pageY = touch.pageY;
      var x = pageX - this._boundingClientRect.left;
      var y = pageY - this._boundingClientRect.top;

      if (this._onStart(x, y) === true) {
        window.addEventListener('touchmove', this._onTouchMove);
        window.addEventListener('touchend', this._onTouchEnd);
        window.addEventListener('touchcancel', this._onTouchEnd);
      }
    }
  }, {
    key: '_onTouchMove',
    value: function _onTouchMove(e) {
      var _this2 = this;

      e.preventDefault(); // prevent text selection

      var touches = Array.from(e.touches);
      var touch = touches.filter(function (t) {
        return t.identifier === _this2._touchId;
      })[0];

      if (touch) {
        var pageX = touch.pageX;
        var pageY = touch.pageY;
        var x = pageX - this._boundingClientRect.left;
        var y = pageY - this._boundingClientRect.top;

        this._onMove(x, y);
      }
    }
  }, {
    key: '_onTouchEnd',
    value: function _onTouchEnd(e) {
      var _this3 = this;

      var touches = Array.from(e.touches);
      var touch = touches.filter(function (t) {
        return t.identifier === _this3._touchId;
      })[0];

      if (touch === undefined) {
        this._onEnd();
        this._touchId = null;

        window.removeEventListener('touchmove', this._onTouchMove);
        window.removeEventListener('touchend', this._onTouchEnd);
        window.removeEventListener('touchcancel', this._onTouchEnd);
      }
    }
  }, {
    key: '_updatePosition',
    value: function _updatePosition(x, y) {
      var _params3 = this.params,
          orientation = _params3.orientation,
          height = _params3.height;

      var position = orientation === 'horizontal' ? x : y;
      var value = this.screenScale.invert(position);

      this._updateValue(value);
    }
  }, {
    key: '_render',
    value: function _render(clippedValue) {
      var _params4 = this.params,
          backgroundColor = _params4.backgroundColor,
          foregroundColor = _params4.foregroundColor,
          orientation = _params4.orientation;

      var canvasPosition = Math.round(this.canvasScale(clippedValue));
      var width = this._canvasWidth;
      var height = this._canvasHeight;
      var ctx = this.ctx;

      ctx.save();
      ctx.clearRect(0, 0, width, height);

      // background
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // foreground
      ctx.fillStyle = foregroundColor;

      if (orientation === 'horizontal') ctx.fillRect(0, 0, canvasPosition, height);else ctx.fillRect(0, canvasPosition, width, height);

      // markers
      var markers = this.params.markers;

      for (var i = 0; i < markers.length; i++) {
        var marker = markers[i];
        var position = this.canvasScale(marker);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();

        if (orientation === 'horizontal') {
          ctx.moveTo(position - 0.5, 1);
          ctx.lineTo(position - 0.5, height - 1);
        } else {
          ctx.moveTo(1, height - position + 0.5);
          ctx.lineTo(width - 1, height - position + 0.5);
        }

        ctx.closePath();
        ctx.stroke();
      }

      // handle mode
      if (this.params.mode === 'handle' && this.params.showHandle) {
        var delta = this.params.handleSize * this._pixelRatio / 2;
        var start = canvasPosition - delta;
        var end = canvasPosition + delta;

        ctx.globalAlpha = 1;
        ctx.fillStyle = this.params.handleColor;

        if (orientation === 'horizontal') {
          ctx.fillRect(start, 0, end - start, height);
        } else {
          ctx.fillRect(0, start, width, end - start);
        }
      }

      ctx.restore();
    }
  }, {
    key: 'value',
    get: function get() {
      return this._value;
    },
    set: function set(val) {
      this._updateValue(val);
    }
  }]);

  return Slider;
}();

exports.default = Slider;

},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Slider = require('./Slider');

Object.defineProperty(exports, 'Slider', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Slider).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./Slider":17}]},{},[15])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLi9kaXN0L2NvbXBvbmVudHMvQmFzZUNvbnRyb2xsZXIuanMiLCIuLi8uLi9kaXN0L2NvbXBvbmVudHMvR3JvdXAuanMiLCIuLi8uLi9kaXN0L2NvbXBvbmVudHMvTnVtYmVyQm94LmpzIiwiLi4vLi4vZGlzdC9jb21wb25lbnRzL1NlbGVjdEJ1dHRvbnMuanMiLCIuLi8uLi9kaXN0L2NvbXBvbmVudHMvU2VsZWN0TGlzdC5qcyIsIi4uLy4uL2Rpc3QvY29tcG9uZW50cy9TbGlkZXIuanMiLCIuLi8uLi9kaXN0L2NvbXBvbmVudHMvVGV4dC5qcyIsIi4uLy4uL2Rpc3QvY29tcG9uZW50cy9UaXRsZS5qcyIsIi4uLy4uL2Rpc3QvY29tcG9uZW50cy9Ub2dnbGUuanMiLCIuLi8uLi9kaXN0L2NvbXBvbmVudHMvVHJpZ2dlckJ1dHRvbnMuanMiLCIuLi8uLi9kaXN0L2luZGV4LmpzIiwiLi4vLi4vZGlzdC91dGlscy9lbGVtZW50cy5qcyIsIi4uLy4uL2Rpc3QvdXRpbHMvc3R5bGVzLWRlY2xhcmF0aW9ucy5qcyIsIi4uLy4uL2Rpc3QvdXRpbHMvc3R5bGVzLmpzIiwiZGlzdC9pbmRleC5qcyIsIi4uLy4uL3BhY2thZ2UuanNvbiIsIi4uLy4uLy4uL2d1aS1jb21wb25lbnRzL2Rpc3QvU2xpZGVyLmpzIiwiLi4vLi4vLi4vZ3VpLWNvbXBvbmVudHMvZGlzdC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7O0lBQVksTTs7Ozs7O0FBRVo7QUFDQSxJQUFNLGNBQWMsSUFBSSxHQUFKLEVBQXBCO0FBQ0E7QUFDQSxJQUFJLFFBQVEsT0FBWjs7QUFFQTs7QUFFQTs7Ozs7Ozs7SUFPTSxjO0FBQ0osMEJBQVksSUFBWixFQUFrQixRQUFsQixFQUF5QztBQUFBLFFBQWIsTUFBYSx1RUFBSixFQUFJOztB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RUFBZ0IsS0FBaEIsRUFBdUIsS0FBdkIsRUFBOEIsTUFBTSxLQUFwQztBQUNEO0FBQ0Y7O0FBRUQsVUFBSSxPQUFKO0FBQ0Q7Ozt3QkFuVVc7QUFDVixhQUFPLEtBQUssTUFBWjtBQUNELEs7c0JBRVMsRyxFQUFLO0FBQ2IsV0FBSyxZQUFMLENBQWtCLEdBQWxCO0FBQ0Q7Ozs7OztrQkFnVVksTTs7Ozs7Ozs7Ozs7Ozs7MkNDemNOLE8iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4uL3V0aWxzL3N0eWxlcyc7XG5cbi8vIGtlZXAgdHJhY2sgb2YgYWxsIGluc3RhY2lhdGVkIGNvbnRyb2xsZXJzXG5jb25zdCBjb250cm9sbGVycyA9IG5ldyBTZXQoKTtcbi8vIGRlZmF1bHQgdGhlbWVcbmxldCB0aGVtZSA9ICdsaWdodCc7XG5cbi8qKiBAbW9kdWxlIGJhc2ljLWNvbnRyb2xsZXIgKi9cblxuLyoqXG4gKiBCYXNlIGNsYXNzIHRvIGNyZWF0ZSBuZXcgY29udHJvbGxlcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBTdHJpbmcgZGVzY3JpYmluZyB0aGUgdHlwZSBvZiB0aGUgY29udHJvbGxlci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0cyAtIERlZmF1bHQgcGFyYW1ldGVycyBvZiB0aGUgY29udHJvbGxlci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgLSBVc2VyIGRlZmluZWQgY29uZmlndXJhdGlvbiBvcHRpb25zLlxuICovXG5jbGFzcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKHR5cGUsIGRlZmF1bHRzLCBjb25maWcgPSB7fSkge1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgY29uZmlnKTtcbiAgICAvLyBpbnNlcnQgc3R5bGVzIGFuZCBsaXN0ZW4gd2luZG93IHJlc2l6ZSB3aGVuIHRoZSBmaXJzdCBjb250cm9sbGVyIGlzIGNyZWF0ZWRcbiAgICBpZiAoY29udHJvbGxlcnMuc2l6ZSA9PT0gMCkge1xuICAgICAgc3R5bGVzLmluc2VydFN0eWxlU2hlZXQoKTtcblxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250cm9sbGVycy5mb3JFYWNoKChjb250cm9sbGVyKSA9PiBjb250cm9sbGVyLm9uUmVzaXplKCkpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29udHJvbGxlcnMuYWRkKHRoaXMpO1xuXG4gICAgdGhpcy5fbGlzdGVuZXJzID0gbmV3IFNldCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZW1lIG9mIHRoZSBjb250cm9sbGVyc1xuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc3RhdGljIHNldCB0aGVtZSh2YWx1ZSkge1xuICAgIGNvbnRyb2xsZXJzLmZvckVhY2goKGNvbnRyb2xsZXIpID0+IGNvbnRyb2xsZXIuJGVsLmNsYXNzTGlzdC5yZW1vdmUodGhlbWUpKTtcbiAgICB0aGVtZSA9IHZhbHVlO1xuICAgIGNvbnRyb2xsZXJzLmZvckVhY2goKGNvbnRyb2xsZXIpID0+IGNvbnRyb2xsZXIuJGVsLmNsYXNzTGlzdC5hZGQodGhlbWUpKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgdGhlbWUoKSB7XG4gICAgcmV0dXJuIHRoZW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hbmRhdG9yeSBtZXRob2QgdG8gYmUgY2FsbGVkIGF0IHRoZSBlbmQgb2YgYSBjb25zdHJ1Y3Rvci5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGluaXRpYWxpemUoKSB7XG4gICAgY29uc3QgY2FsbGJhY2sgPSB0aGlzLnBhcmFtcy5jYWxsYmFjaztcbiAgICBsZXQgJGNvbnRhaW5lciA9IHRoaXMucGFyYW1zLmNvbnRhaW5lcjtcblxuICAgIGlmICgkY29udGFpbmVyKSB7XG4gICAgICAvLyBjc3Mgc2VsZWN0b3JcbiAgICAgIGlmICh0eXBlb2YgJGNvbnRhaW5lciA9PT0gJ3N0cmluZycpXG4gICAgICAgICRjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCRjb250YWluZXIpO1xuICAgICAgLy8gZ3JvdXBcbiAgICAgIGVsc2UgaWYgKCRjb250YWluZXIgaW5zdGFuY2VvZiBCYXNlQ29udHJvbGxlciAmJiAkY29udGFpbmVyLiRjb250YWluZXIpXG4gICAgICAgICRjb250YWluZXIgPSAkY29udGFpbmVyLiRjb250YWluZXI7XG5cbiAgICAgICRjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXIoKSk7XG4gICAgICB0aGlzLm9uUmVuZGVyKCk7XG4gICAgfVxuXG4gICAgaWYgKGNhbGxiYWNrKVxuICAgICAgdGhpcy5hZGRMaXN0ZW5lcihjYWxsYmFjayk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgbGlzdGVuZXIgdG8gdGhlIGNvbnRyb2xsZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gRnVuY3Rpb24gdG8gYmUgYXBwbGllZCB3aGVuIHRoZSBjb250cm9sbGVyXG4gICAqICBzdGF0ZSBjaGFuZ2UuXG4gICAqL1xuICBhZGRMaXN0ZW5lcihjYWxsYmFjaykge1xuICAgIHRoaXMuX2xpc3RlbmVycy5hZGQoY2FsbGJhY2spO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIGxpc3RlbmVyIGZyb20gdGhlIGNvbnRyb2xsZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gRnVuY3Rpb24gdG8gcmVtb3ZlIGZyb20gdGhlIGxpc3RlbmVycy5cbiAgICovXG4gIHJlbW92ZUxpc3RlbmVyKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fbGlzdGVuZXJzLnJlbW92ZShjYWxsYmFjayk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZXhlY3V0ZUxpc3RlbmVycyguLi52YWx1ZXMpIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMuZm9yRWFjaCgoY2FsbGJhY2spID0+IGNhbGxiYWNrKC4uLnZhbHVlcykpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLiRlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoc3R5bGVzLm5zLCB0aGVtZSwgdGhpcy50eXBlKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBvblJlbmRlcigpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMub25SZXNpemUoKSwgMCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgb25SZXNpemUoKSB7XG4gICAgY29uc3QgYm91bmRpbmdSZWN0ID0gdGhpcy4kZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3Qgd2lkdGggPSBib3VuZGluZ1JlY3Qud2lkdGg7XG4gICAgY29uc3QgbWV0aG9kID0gd2lkdGggPiA2MDAgPyAncmVtb3ZlJyA6ICdhZGQnO1xuXG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0W21ldGhvZF0oJ3NtYWxsJyk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgYmluZEV2ZW50cygpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VDb250cm9sbGVyO1xuIiwiaW1wb3J0IEJhc2VDb250cm9sbGVyIGZyb20gJy4vQmFzZUNvbnRyb2xsZXInO1xuaW1wb3J0ICogYXMgZWxlbWVudHMgZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuXG4vKiogQG1vZHVsZSBiYXNpYy1jb250cm9sbGVycyAqL1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgbGVnZW5kOiAnJm5ic3A7JyxcbiAgZGVmYXVsdDogJ29wZW5lZCcsXG4gIGNvbnRhaW5lcjogbnVsbCxcbn07XG5cbi8qKlxuICogR3JvdXAgb2YgY29udHJvbGxlcnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBjb25maWcubGFiZWwgLSBMYWJlbCBvZiB0aGUgZ3JvdXAuXG4gKiBAcGFyYW0geydvcGVuZWQnfCdjbG9zZWQnfSBbY29uZmlnLmRlZmF1bHQ9J29wZW5lZCddIC0gRGVmYXVsdCBzdGF0ZSBvZiB0aGVcbiAqICBncm91cC5cbiAqIEBwYXJhbSB7U3RyaW5nfEVsZW1lbnR8YmFzaWMtY29udHJvbGxlcn5Hcm91cH0gW2NvbmZpZy5jb250YWluZXI9bnVsbF0gLVxuICogIENvbnRhaW5lciBvZiB0aGUgY29udHJvbGxlci5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgY29udHJvbGxlcnMgZnJvbSAnYmFzaWMtY29udHJvbGxlcnMnO1xuICpcbiAqIC8vIGNyZWF0ZSBhIGdyb3VwXG4gKiBjb25zdCBncm91cCA9IG5ldyBjb250cm9sbGVycy5Hcm91cCh7XG4gKiAgIGxhYmVsOiAnR3JvdXAnLFxuICogICBkZWZhdWx0OiAnb3BlbmVkJyxcbiAqICAgY29udGFpbmVyOiAnI2NvbnRhaW5lcidcbiAqIH0pO1xuICpcbiAqIC8vIGluc2VydCBjb250cm9sbGVycyBpbiB0aGUgZ3JvdXBcbiAqIGNvbnN0IGdyb3VwU2xpZGVyID0gbmV3IGNvbnRyb2xsZXJzLlNsaWRlcih7XG4gKiAgIGxhYmVsOiAnR3JvdXAgU2xpZGVyJyxcbiAqICAgbWluOiAyMCxcbiAqICAgbWF4OiAxMDAwLFxuICogICBzdGVwOiAxLFxuICogICBkZWZhdWx0OiAyMDAsXG4gKiAgIHVuaXQ6ICdIeicsXG4gKiAgIHNpemU6ICdsYXJnZScsXG4gKiAgIGNvbnRhaW5lcjogZ3JvdXAsXG4gKiAgIGNhbGxiYWNrOiAodmFsdWUpID0+IGNvbnNvbGUubG9nKHZhbHVlKSxcbiAqIH0pO1xuICpcbiAqIGNvbnN0IGdyb3VwVGV4dCA9IG5ldyBjb250cm9sbGVycy5UZXh0KHtcbiAqICAgbGFiZWw6ICdHcm91cCBUZXh0JyxcbiAqICAgZGVmYXVsdDogJ3RleHQgaW5wdXQnLFxuICogICByZWFkb25seTogZmFsc2UsXG4gKiAgIGNvbnRhaW5lcjogZ3JvdXAsXG4gKiAgIGNhbGxiYWNrOiAodmFsdWUpID0+IGNvbnNvbGUubG9nKHZhbHVlKSxcbiAqIH0pO1xuICovXG5jbGFzcyBHcm91cCBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoJ2dyb3VwJywgZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICB0aGlzLl9zdGF0ZXMgPSBbJ29wZW5lZCcsICdjbG9zZWQnXTtcblxuICAgIGlmICh0aGlzLl9zdGF0ZXMuaW5kZXhPZih0aGlzLnBhcmFtcy5kZWZhdWx0KSA9PT0gLTEpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgc3RhdGUgXCIke3ZhbHVlfVwiYCk7XG5cbiAgICB0aGlzLl9zdGF0ZSA9IHRoaXMucGFyYW1zLmRlZmF1bHQ7XG5cbiAgICBzdXBlci5pbml0aWFsaXplKCk7XG4gIH1cblxuICAvKipcbiAgICogU3RhdGUgb2YgdGhlIGdyb3VwIChgJ29wZW5lZCdgIG9yIGAnY2xvc2VkJ2ApLlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHN0YXRlKSB7XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsaWFzIGZvciBgdmFsdWVgLlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgZ2V0IHN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcbiAgfVxuXG4gIHNldCBzdGF0ZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLl9zdGF0ZXMuaW5kZXhPZih2YWx1ZSkgPT09IC0xKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHN0YXRlIFwiJHt2YWx1ZX1cImApO1xuXG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9zdGF0ZSk7XG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZCh2YWx1ZSk7XG5cbiAgICB0aGlzLl9zdGF0ZSA9IHZhbHVlO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgY29udGVudCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJncm91cC1oZWFkZXJcIj5cbiAgICAgICAgJHtlbGVtZW50cy5zbWFsbEFycm93UmlnaHR9XG4gICAgICAgICR7ZWxlbWVudHMuc21hbGxBcnJvd0JvdHRvbX1cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJsYWJlbFwiPiR7dGhpcy5wYXJhbXMubGFiZWx9PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ3JvdXAtY29udGVudFwiPjwvZGl2PlxuICAgIGA7XG5cbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcigpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9zdGF0ZSk7XG5cbiAgICB0aGlzLiRoZWFkZXIgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuZ3JvdXAtaGVhZGVyJyk7XG4gICAgdGhpcy4kY29udGFpbmVyID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmdyb3VwLWNvbnRlbnQnKTtcblxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLl9zdGF0ZSA9PT0gJ2Nsb3NlZCcgPyAnb3BlbmVkJyA6ICdjbG9zZWQnO1xuICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdyb3VwO1xuIiwiaW1wb3J0IEJhc2VDb250cm9sbGVyIGZyb20gJy4vQmFzZUNvbnRyb2xsZXInO1xuaW1wb3J0ICogYXMgZWxlbWVudHMgZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuXG4vKiogQG1vZHVsZSBiYXNpYy1jb250cm9sbGVycyAqL1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgbGFiZWw6ICckbmJzcDsnLFxuICBtaW46IDAsXG4gIG1heDogMSxcbiAgc3RlcDogMC4wMSxcbiAgZGVmYXVsdDogMCxcbiAgY29udGFpbmVyOiBudWxsLFxuICBjYWxsYmFjazogbnVsbCxcbn07XG5cbi8qKlxuICogTnVtYmVyIEJveCBjb250cm9sbGVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBjb25maWcubGFiZWwgLSBMYWJlbCBvZiB0aGUgY29udHJvbGxlci5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLm1pbj0wXSAtIE1pbmltdW0gdmFsdWUuXG4gKiBAcGFyYW0ge051bWJlcn0gW2NvbmZpZy5tYXg9MV0gLSBNYXhpbXVtIHZhbHVlLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtjb25maWcuc3RlcD0wLjAxXSAtIFN0ZXAgYmV0d2VlbiBjb25zZWN1dGl2ZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge051bWJlcn0gW2NvbmZpZy5kZWZhdWx0PTBdIC0gRGVmYXVsdCB2YWx1ZS5cbiAqIEBwYXJhbSB7U3RyaW5nfEVsZW1lbnR8YmFzaWMtY29udHJvbGxlcn5Hcm91cH0gW2NvbmZpZy5jb250YWluZXI9bnVsbF0gLVxuICogIENvbnRhaW5lciBvZiB0aGUgY29udHJvbGxlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb25maWcuY2FsbGJhY2s9bnVsbF0gLSBDYWxsYmFjayB0byBiZSBleGVjdXRlZCB3aGVuIHRoZVxuICogIHZhbHVlIGNoYW5nZXMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGNvbnRyb2xsZXJzIGZyb20gJ2Jhc2ljLWNvbnRyb2xsZXJzJztcbiAqXG4gKiBjb25zdCBudW1iZXJCb3ggPSBuZXcgY29udHJvbGxlcnMuTnVtYmVyQm94KHtcbiAqICAgbGFiZWw6ICdNeSBOdW1iZXIgQm94JyxcbiAqICAgbWluOiAwLFxuICogICBtYXg6IDEwLFxuICogICBzdGVwOiAwLjEsXG4gKiAgIGRlZmF1bHQ6IDUsXG4gKiAgIGNvbnRhaW5lcjogJyNjb250YWluZXInLFxuICogICBjYWxsYmFjazogKHZhbHVlKSA9PiBjb25zb2xlLmxvZyh2YWx1ZSksXG4gKiB9KTtcbiAqL1xuY2xhc3MgTnVtYmVyQm94IGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xuICAvLyBsZWdlbmQsIG1pbiA9IDAsIG1heCA9IDEsIHN0ZXAgPSAwLjAxLCBkZWZhdWx0VmFsdWUgPSAwLCAkY29udGFpbmVyID0gbnVsbCwgY2FsbGJhY2sgPSBudWxsXG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKCdudW1iZXItYm94JywgZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICB0aGlzLl92YWx1ZSA9IHRoaXMucGFyYW1zLmRlZmF1bHQ7XG4gICAgdGhpcy5faXNJbnRTdGVwID0gKHRoaXMucGFyYW1zLnN0ZXAgJSAxID09PSAwKTtcblxuICAgIHN1cGVyLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDdXJyZW50IHZhbHVlIG9mIHRoZSBjb250cm9sbGVyLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIC8vIHVzZSAkbnVtYmVyIGVsZW1lbnQgbWluLCBtYXggYW5kIHN0ZXAgc3lzdGVtXG4gICAgdGhpcy4kbnVtYmVyLnZhbHVlID0gdmFsdWU7XG4gICAgdmFsdWUgPSB0aGlzLiRudW1iZXIudmFsdWU7XG4gICAgdmFsdWUgPSB0aGlzLl9pc0ludFN0ZXAgPyBwYXJzZUludCh2YWx1ZSwgMTApIDogcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBsYWJlbCwgbWluLCBtYXgsIHN0ZXAgfSA9IHRoaXMucGFyYW1zO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBgXG4gICAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+JHtsYWJlbH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlclwiPlxuICAgICAgICAke2VsZW1lbnRzLmFycm93TGVmdH1cbiAgICAgICAgPGlucHV0IGNsYXNzPVwibnVtYmVyXCIgdHlwZT1cIm51bWJlclwiIG1pbj1cIiR7bWlufVwiIG1heD1cIiR7bWF4fVwiIHN0ZXA9XCIke3N0ZXB9XCIgdmFsdWU9XCIke3RoaXMuX3ZhbHVlfVwiIC8+XG4gICAgICAgICR7ZWxlbWVudHMuYXJyb3dSaWdodH1cbiAgICAgIDwvZGl2PlxuICAgIGA7XG5cbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcigpO1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoJ2FsaWduLXNtYWxsJyk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuJHByZXYgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuYXJyb3ctbGVmdCcpO1xuICAgIHRoaXMuJG5leHQgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuYXJyb3ctcmlnaHQnKTtcbiAgICB0aGlzLiRudW1iZXIgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwibnVtYmVyXCJdJyk7XG5cbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJHByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgY29uc3Qgc3RlcCA9IHRoaXMucGFyYW1zLnN0ZXA7XG4gICAgICBjb25zdCBkZWNpbWFscyA9IHN0ZXAudG9TdHJpbmcoKS5zcGxpdCgnLicpWzFdO1xuICAgICAgY29uc3QgZXhwID0gZGVjaW1hbHMgPyBkZWNpbWFscy5sZW5ndGggOiAwO1xuICAgICAgY29uc3QgbXVsdCA9IE1hdGgucG93KDEwLCBleHApO1xuXG4gICAgICBjb25zdCBpbnRWYWx1ZSA9IE1hdGguZmxvb3IodGhpcy5fdmFsdWUgKiBtdWx0ICsgMC41KTtcbiAgICAgIGNvbnN0IGludFN0ZXAgPSBNYXRoLmZsb29yKHN0ZXAgKiBtdWx0ICsgMC41KTtcbiAgICAgIGNvbnN0IHZhbHVlID0gKGludFZhbHVlIC0gaW50U3RlcCkgLyBtdWx0O1xuXG4gICAgICB0aGlzLnByb3BhZ2F0ZSh2YWx1ZSk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgdGhpcy4kbmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBjb25zdCBzdGVwID0gdGhpcy5wYXJhbXMuc3RlcDtcbiAgICAgIGNvbnN0IGRlY2ltYWxzID0gc3RlcC50b1N0cmluZygpLnNwbGl0KCcuJylbMV07XG4gICAgICBjb25zdCBleHAgPSBkZWNpbWFscyA/IGRlY2ltYWxzLmxlbmd0aCA6IDA7XG4gICAgICBjb25zdCBtdWx0ID0gTWF0aC5wb3coMTAsIGV4cCk7XG5cbiAgICAgIGNvbnN0IGludFZhbHVlID0gTWF0aC5mbG9vcih0aGlzLl92YWx1ZSAqIG11bHQgKyAwLjUpO1xuICAgICAgY29uc3QgaW50U3RlcCA9IE1hdGguZmxvb3Ioc3RlcCAqIG11bHQgKyAwLjUpO1xuICAgICAgY29uc3QgdmFsdWUgPSAoaW50VmFsdWUgKyBpbnRTdGVwKSAvIG11bHQ7XG5cbiAgICAgIHRoaXMucHJvcGFnYXRlKHZhbHVlKTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICB0aGlzLiRudW1iZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IHRoaXMuJG51bWJlci52YWx1ZTtcbiAgICAgIHZhbHVlID0gdGhpcy5faXNJbnRTdGVwID8gcGFyc2VJbnQodmFsdWUsIDEwKSA6IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgdmFsdWUgPSBNYXRoLm1pbih0aGlzLnBhcmFtcy5tYXgsIE1hdGgubWF4KHRoaXMucGFyYW1zLm1pbiwgdmFsdWUpKTtcblxuICAgICAgdGhpcy5wcm9wYWdhdGUodmFsdWUpO1xuICAgIH0sIGZhbHNlKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9wYWdhdGUodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IHRoaXMuX3ZhbHVlKSB7IHJldHVybjsgfVxuXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLiRudW1iZXIudmFsdWUgPSB2YWx1ZTtcblxuICAgIHRoaXMuZXhlY3V0ZUxpc3RlbmVycyh0aGlzLl92YWx1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTnVtYmVyQm94O1xuIiwiaW1wb3J0IEJhc2VDb250cm9sbGVyIGZyb20gJy4vQmFzZUNvbnRyb2xsZXInO1xuaW1wb3J0ICogYXMgZWxlbWVudHMgZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuXG4vKiogQG1vZHVsZSBiYXNpYy1jb250cm9sbGVycyAqL1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgbGFiZWw6ICcmbmJzcDsnLFxuICBvcHRpb25zOiBudWxsLFxuICBkZWZhdWx0OiBudWxsLFxuICBjb250YWluZXI6IG51bGwsXG4gIGNhbGxiYWNrOiBudWxsLFxufTtcblxuLyoqXG4gKiBMaXN0IG9mIGJ1dHRvbnMgd2l0aCBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZy5sYWJlbCAtIExhYmVsIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtBcnJheX0gW2NvbmZpZy5vcHRpb25zPW51bGxdIC0gVmFsdWVzIG9mIHRoZSBkcm9wIGRvd24gbGlzdC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLmRlZmF1bHQ9bnVsbF0gLSBEZWZhdWx0IHZhbHVlLlxuICogQHBhcmFtIHtTdHJpbmd8RWxlbWVudHxiYXNpYy1jb250cm9sbGVyfkdyb3VwfSBbY29uZmlnLmNvbnRhaW5lcj1udWxsXSAtXG4gKiAgQ29udGFpbmVyIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbmZpZy5jYWxsYmFjaz1udWxsXSAtIENhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIHdoZW4gdGhlXG4gKiAgdmFsdWUgY2hhbmdlcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgY29udHJvbGxlcnMgZnJvbSAnYmFzaWMtY29udHJvbGxlcnMnO1xuICpcbiAqIGNvbnN0IHNlbGVjdEJ1dHRvbnMgPSBuZXcgY29udHJvbGxlcnMuU2VsZWN0QnV0dG9ucyh7XG4gKiAgIGxhYmVsOiAnU2VsZWN0QnV0dG9ucycsXG4gKiAgIG9wdGlvbnM6IFsnc3RhbmRieScsICdydW4nLCAnZW5kJ10sXG4gKiAgIGRlZmF1bHQ6ICdydW4nLFxuICogICBjb250YWluZXI6ICcjY29udGFpbmVyJyxcbiAqICAgY2FsbGJhY2s6ICh2YWx1ZSwgaW5kZXgpID0+IGNvbnNvbGUubG9nKHZhbHVlLCBpbmRleCksXG4gKiB9KTtcbiAqL1xuY2xhc3MgU2VsZWN0QnV0dG9ucyBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoJ3NlbGVjdC1idXR0b25zJywgZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5wYXJhbXMub3B0aW9ucykpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyaWdnZXJCdXR0b246IEludmFsaWQgb3B0aW9uIFwib3B0aW9uc1wiJyk7XG5cbiAgICB0aGlzLl92YWx1ZSA9IHRoaXMucGFyYW1zLmRlZmF1bHQ7XG5cbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5wYXJhbXMub3B0aW9ucztcbiAgICBjb25zdCBpbmRleCA9IG9wdGlvbnMuaW5kZXhPZih0aGlzLl92YWx1ZSk7XG4gICAgdGhpcy5faW5kZXggPSBpbmRleCA9PT0gLTEgP8KgMCA6IGluZGV4O1xuICAgIHRoaXMuX21heEluZGV4ID0gb3B0aW9ucy5sZW5ndGggLSAxO1xuXG4gICAgc3VwZXIuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgdmFsdWUuXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnBhcmFtcy5vcHRpb25zLmluZGV4T2YodmFsdWUpO1xuXG4gICAgaWYgKGluZGV4ICE9PSAtMSlcbiAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDdXJyZW50IG9wdGlvbiBpbmRleC5cbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIGdldCBpbmRleCgpIHtcbiAgICB0aGlzLl9pbmRleDtcbiAgfVxuXG4gIHNldCBpbmRleChpbmRleCkge1xuICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiB0aGlzLl9tYXhJbmRleCkgcmV0dXJuO1xuXG4gICAgdGhpcy5fdmFsdWUgPSB0aGlzLnBhcmFtcy5vcHRpb25zW2luZGV4XTtcbiAgICB0aGlzLl9pbmRleCA9IGluZGV4O1xuICAgIHRoaXMuX2hpZ2hsaWdodEJ0bih0aGlzLl9pbmRleCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgb3B0aW9ucywgbGFiZWwgfSA9IHRoaXMucGFyYW1zO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBgXG4gICAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+JHtsYWJlbH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlclwiPlxuICAgICAgICAke2VsZW1lbnRzLmFycm93TGVmdH1cbiAgICAgICAgJHtvcHRpb25zLm1hcCgob3B0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuXCIgZGF0YS1pbmRleD1cIiR7aW5kZXh9XCIgZGF0YS12YWx1ZT1cIiR7b3B0aW9ufVwiPlxuICAgICAgICAgICAgICAke29wdGlvbn1cbiAgICAgICAgICAgIDwvYnV0dG9uPmA7XG4gICAgICAgIH0pLmpvaW4oJycpfVxuICAgICAgICAke2VsZW1lbnRzLmFycm93UmlnaHR9XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIodGhpcy50eXBlKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gICAgdGhpcy4kcHJldiA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy1sZWZ0Jyk7XG4gICAgdGhpcy4kbmV4dCA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy1yaWdodCcpO1xuICAgIHRoaXMuJGJ0bnMgPSBBcnJheS5mcm9tKHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4nKSk7XG5cbiAgICB0aGlzLl9oaWdobGlnaHRCdG4odGhpcy5faW5kZXgpO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kcHJldi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5faW5kZXggLSAxO1xuICAgICAgdGhpcy5wcm9wYWdhdGUoaW5kZXgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy4kbmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5faW5kZXggKyAxO1xuICAgICAgdGhpcy5wcm9wYWdhdGUoaW5kZXgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy4kYnRucy5mb3JFYWNoKCgkYnRuLCBpbmRleCkgPT4ge1xuICAgICAgJGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5wcm9wYWdhdGUoaW5kZXgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvcGFnYXRlKGluZGV4KSB7XG4gICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+IHRoaXMuX21heEluZGV4KSByZXR1cm47XG5cbiAgICB0aGlzLl9pbmRleCA9IGluZGV4O1xuICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5wYXJhbXMub3B0aW9uc1tpbmRleF07XG4gICAgdGhpcy5faGlnaGxpZ2h0QnRuKHRoaXMuX2luZGV4KTtcblxuICAgIHRoaXMuZXhlY3V0ZUxpc3RlbmVycyh0aGlzLl92YWx1ZSwgdGhpcy5faW5kZXgpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIF9oaWdobGlnaHRCdG4oYWN0aXZlSW5kZXgpIHtcbiAgICB0aGlzLiRidG5zLmZvckVhY2goKCRidG4sIGluZGV4KSA9PiB7XG4gICAgICAkYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXG4gICAgICBpZiAoYWN0aXZlSW5kZXggPT09IGluZGV4KSB7XG4gICAgICAgICRidG4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0QnV0dG9ucztcbiIsImltcG9ydCBCYXNlQ29udHJvbGxlciBmcm9tICcuL0Jhc2VDb250cm9sbGVyJztcbmltcG9ydCAqIGFzIGVsZW1lbnRzIGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcblxuLyoqIEBtb2R1bGUgYmFzaWMtY29udHJvbGxlcnMgKi9cblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIGxhYmVsOiAnJm5ic3A7JyxcbiAgb3B0aW9uczogbnVsbCxcbiAgZGVmYXVsdDogbnVsbCxcbiAgY29udGFpbmVyOiBudWxsLFxuICBjYWxsYmFjazogbnVsbCxcbn1cblxuLyoqXG4gKiBEcm9wLWRvd24gbGlzdCBjb250cm9sbGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge1N0cmluZ30gY29uZmlnLmxhYmVsIC0gTGFiZWwgb2YgdGhlIGNvbnRyb2xsZXIuXG4gKiBAcGFyYW0ge0FycmF5fSBbY29uZmlnLm9wdGlvbnM9bnVsbF0gLSBWYWx1ZXMgb2YgdGhlIGRyb3AgZG93biBsaXN0LlxuICogQHBhcmFtIHtOdW1iZXJ9IFtjb25maWcuZGVmYXVsdD1udWxsXSAtIERlZmF1bHQgdmFsdWUuXG4gKiBAcGFyYW0ge1N0cmluZ3xFbGVtZW50fGJhc2ljLWNvbnRyb2xsZXJ+R3JvdXB9IFtjb25maWcuY29udGFpbmVyPW51bGxdIC1cbiAqICBDb250YWluZXIgb2YgdGhlIGNvbnRyb2xsZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29uZmlnLmNhbGxiYWNrPW51bGxdIC0gQ2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWQgd2hlbiB0aGVcbiAqICB2YWx1ZSBjaGFuZ2VzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBjb250cm9sbGVycyBmcm9tICdiYXNpYy1jb250cm9sbGVycyc7XG4gKlxuICogY29uc3Qgc2VsZWN0TGlzdCA9IG5ldyBjb250cm9sbGVycy5TZWxlY3RMaXN0KHtcbiAqICAgbGFiZWw6ICdTZWxlY3RMaXN0JyxcbiAqICAgb3B0aW9uczogWydzdGFuZGJ5JywgJ3J1bicsICdlbmQnXSxcbiAqICAgZGVmYXVsdDogJ3J1bicsXG4gKiAgIGNvbnRhaW5lcjogJyNjb250YWluZXInLFxuICogICBjYWxsYmFjazogKHZhbHVlLCBpbmRleCkgPT4gY29uc29sZS5sb2codmFsdWUsIGluZGV4KSxcbiAqIH0pO1xuICovXG5jbGFzcyBTZWxlY3RMaXN0IGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcignc2VsZWN0LWxpc3QnLCBkZWZhdWx0cywgY29uZmlnKTtcblxuICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLnBhcmFtcy5vcHRpb25zKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcignVHJpZ2dlckJ1dHRvbjogSW52YWxpZCBvcHRpb24gXCJvcHRpb25zXCInKTtcblxuICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5wYXJhbXMuZGVmYXVsdDtcblxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLnBhcmFtcy5vcHRpb25zO1xuICAgIGNvbnN0IGluZGV4ID0gb3B0aW9ucy5pbmRleE9mKHRoaXMuX3ZhbHVlKTtcbiAgICB0aGlzLl9pbmRleCA9IGluZGV4ID09PSAtMSA/wqAwIDogaW5kZXg7XG4gICAgdGhpcy5fbWF4SW5kZXggPSBvcHRpb25zLmxlbmd0aCAtIDE7XG5cbiAgICBzdXBlci5pbml0aWFsaXplKCk7XG4gIH1cblxuICAvKipcbiAgICogQ3VycmVudCB2YWx1ZS5cbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLiRzZWxlY3QudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX2luZGV4ID0gdGhpcy5wYXJhbXMub3B0aW9ucy5pbmRleE9mKHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDdXJyZW50IG9wdGlvbiBpbmRleC5cbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIGdldCBpbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5faW5kZXg7XG4gIH1cblxuICBzZXQgaW5kZXgoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gdGhpcy5fbWF4SW5kZXgpIHJldHVybjtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5wYXJhbXMub3B0aW9uc1tpbmRleF07XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgbGFiZWwsIG9wdGlvbnPCoH0gPSB0aGlzLnBhcmFtcztcbiAgICBjb25zdCBjb250ZW50ID0gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJsYWJlbFwiPiR7bGFiZWx9PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImlubmVyLXdyYXBwZXJcIj5cbiAgICAgICAgJHtlbGVtZW50cy5hcnJvd0xlZnR9XG4gICAgICAgIDxzZWxlY3Q+XG4gICAgICAgICR7b3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICByZXR1cm4gYDxvcHRpb24gdmFsdWU9XCIke29wdGlvbn1cIj4ke29wdGlvbn08L29wdGlvbj5gO1xuICAgICAgICB9KS5qb2luKCcnKX1cbiAgICAgICAgPHNlbGVjdD5cbiAgICAgICAgJHtlbGVtZW50cy5hcnJvd1JpZ2h0fVxuICAgICAgPC9kaXY+XG4gICAgYDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKHRoaXMudHlwZSk7XG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZCgnYWxpZ24tc21hbGwnKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gICAgdGhpcy4kcHJldiA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy1sZWZ0Jyk7XG4gICAgdGhpcy4kbmV4dCA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy1yaWdodCcpO1xuICAgIHRoaXMuJHNlbGVjdCA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdCcpO1xuICAgIC8vIHNldCB0byBkZWZhdWx0IHZhbHVlXG4gICAgdGhpcy4kc2VsZWN0LnZhbHVlID0gb3B0aW9uc1t0aGlzLl9pbmRleF07XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLiRwcmV2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9pbmRleCAtIDE7XG4gICAgICB0aGlzLnByb3BhZ2F0ZShpbmRleCk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgdGhpcy4kbmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5faW5kZXggKyAxO1xuICAgICAgdGhpcy5wcm9wYWdhdGUoaW5kZXgpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIHRoaXMuJHNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuJHNlbGVjdC52YWx1ZTtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wYXJhbXMub3B0aW9ucy5pbmRleE9mKHZhbHVlKTtcbiAgICAgIHRoaXMucHJvcGFnYXRlKGluZGV4KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9wYWdhdGUoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPCAwIHx8wqBpbmRleCA+IHRoaXMuX21heEluZGV4KSByZXR1cm47XG5cbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMucGFyYW1zLm9wdGlvbnNbaW5kZXhdO1xuICAgIHRoaXMuX2luZGV4ID0gaW5kZXg7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLiRzZWxlY3QudmFsdWUgPSB2YWx1ZTtcblxuICAgIHRoaXMuZXhlY3V0ZUxpc3RlbmVycyh0aGlzLl92YWx1ZSwgdGhpcy5faW5kZXgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdExpc3Q7XG4iLCJpbXBvcnQgQmFzZUNvbnRyb2xsZXIgZnJvbSAnLi9CYXNlQ29udHJvbGxlcic7XG5pbXBvcnQgKiBhcyBndWlDb21wb25lbnRzIGZyb20gJ2d1aS1jb21wb25lbnRzJztcblxuLyoqIEBtb2R1bGUgYmFzaWMtY29udHJvbGxlcnMgKi9cblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIGxhYmVsOiAnJm5ic3A7JyxcbiAgbWluOiAwLFxuICBtYXg6IDEsXG4gIHN0ZXA6IDAuMDEsXG4gIGRlZmF1bHQ6IDAsXG4gIHVuaXQ6ICcnLFxuICBzaXplOiAnbWVkaXVtJyxcbiAgY29udGFpbmVyOiBudWxsLFxuICBjYWxsYmFjazogbnVsbCxcbn1cblxuLyoqXG4gKiBTbGlkZXIgY29udHJvbGxlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZy5sYWJlbCAtIExhYmVsIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtjb25maWcubWluPTBdIC0gTWluaW11bSB2YWx1ZS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLm1heD0xXSAtIE1heGltdW0gdmFsdWUuXG4gKiBAcGFyYW0ge051bWJlcn0gW2NvbmZpZy5zdGVwPTAuMDFdIC0gU3RlcCBiZXR3ZWVuIGNvbnNlY3V0aXZlIHZhbHVlcy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLmRlZmF1bHQ9MF0gLSBEZWZhdWx0IHZhbHVlLlxuICogQHBhcmFtIHtTdHJpbmd9IFtjb25maWcudW5pdD0nJ10gLSBVbml0IG9mIHRoZSB2YWx1ZS5cbiAqIEBwYXJhbSB7J3NtYWxsJ3wnbWVkaXVtJ3wnbGFyZ2UnfSBbY29uZmlnLnNpemU9J21lZGl1bSddIC0gU2l6ZSBvZiB0aGVcbiAqICBzbGlkZXIuXG4gKiBAcGFyYW0ge1N0cmluZ3xFbGVtZW50fGJhc2ljLWNvbnRyb2xsZXJ+R3JvdXB9IFtjb25maWcuY29udGFpbmVyPW51bGxdIC1cbiAqICBDb250YWluZXIgb2YgdGhlIGNvbnRyb2xsZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29uZmlnLmNhbGxiYWNrPW51bGxdIC0gQ2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWQgd2hlbiB0aGVcbiAqICB2YWx1ZSBjaGFuZ2VzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBjb250cm9sbGVycyBmcm9tICdiYXNpYy1jb250cm9sbGVycyc7XG4gKlxuICogY29uc3Qgc2xpZGVyID0gbmV3IGNvbnRyb2xsZXJzLlNsaWRlcih7XG4gKiAgIGxhYmVsOiAnTXkgU2xpZGVyJyxcbiAqICAgbWluOiAyMCxcbiAqICAgbWF4OiAxMDAwLFxuICogICBzdGVwOiAxLFxuICogICBkZWZhdWx0OiA1MzcsXG4gKiAgIHVuaXQ6ICdIeicsXG4gKiAgIHNpemU6ICdsYXJnZScsXG4gKiAgIGNvbnRhaW5lcjogJyNjb250YWluZXInLFxuICogICBjYWxsYmFjazogKHZhbHVlKSA9PiBjb25zb2xlLmxvZyh2YWx1ZSksXG4gKiB9KTtcbiAqL1xuY2xhc3MgU2xpZGVyIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcignc2xpZGVyJywgZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICB0aGlzLl92YWx1ZSA9IHRoaXMucGFyYW1zLmRlZmF1bHQ7XG4gICAgdGhpcy5fb25TbGlkZXJDaGFuZ2UgPSB0aGlzLl9vblNsaWRlckNoYW5nZS5iaW5kKHRoaXMpO1xuXG4gICAgc3VwZXIuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgdmFsdWUuXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuXG4gICAgaWYgKHRoaXMuJG51bWJlciAmJiB0aGlzLiRyYW5nZSkge1xuICAgICAgdGhpcy4kbnVtYmVyLnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgIHRoaXMuc2xpZGVyLnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICB9XG4gIH1cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGxhYmVsLCBtaW4sIG1heCwgc3RlcCwgdW5pdCwgc2l6ZSB9ID0gdGhpcy5wYXJhbXM7XG4gICAgY29uc3QgY29udGVudCA9IGBcbiAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWxcIj4ke2xhYmVsfTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbm5lci13cmFwcGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyYW5nZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibnVtYmVyLXdyYXBwZXJcIj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwibnVtYmVyXCIgbWluPVwiJHttaW59XCIgbWF4PVwiJHttYXh9XCIgc3RlcD1cIiR7c3RlcH1cIiB2YWx1ZT1cIiR7dGhpcy5fdmFsdWV9XCIgLz5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInVuaXRcIj4ke3VuaXR9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PmA7XG5cbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcih0aGlzLnR5cGUpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZChgc2xpZGVyLSR7c2l6ZX1gKTtcblxuICAgIHRoaXMuJHJhbmdlID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLnJhbmdlJyk7XG4gICAgdGhpcy4kbnVtYmVyID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcihgaW5wdXRbdHlwZT1cIm51bWJlclwiXWApO1xuXG4gICAgdGhpcy5zbGlkZXIgPSBuZXcgZ3VpQ29tcG9uZW50cy5TbGlkZXIoe1xuICAgICAgY29udGFpbmVyOiB0aGlzLiRyYW5nZSxcbiAgICAgIGNhbGxiYWNrOiB0aGlzLl9vblNsaWRlckNoYW5nZSxcbiAgICAgIG1pbjogbWluLFxuICAgICAgbWF4OiBtYXgsXG4gICAgICBzdGVwOiBzdGVwLFxuICAgICAgZGVmYXVsdDogdGhpcy5fdmFsdWUsXG4gICAgICBmb3JlZ3JvdW5kQ29sb3I6ICcjYWJhYmFiJyxcbiAgICB9KTtcblxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kbnVtYmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcGFyc2VGbG9hdCh0aGlzLiRudW1iZXIudmFsdWUpO1xuICAgICAgLy8gdGhlIHNsaWRlciBwcm9wYWdhdGVzIHRoZSB2YWx1ZVxuICAgICAgdGhpcy5zbGlkZXIudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgfSwgZmFsc2UpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIG9uUmVzaXplKCkge1xuICAgIHN1cGVyLm9uUmVzaXplKCk7XG5cbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHTCoH0gPSB0aGlzLiRyYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0aGlzLnNsaWRlci5yZXNpemUod2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgX29uU2xpZGVyQ2hhbmdlKHZhbHVlKSB7XG4gICAgdGhpcy4kbnVtYmVyLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcblxuICAgIHRoaXMuZXhlY3V0ZUxpc3RlbmVycyh0aGlzLl92YWx1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2xpZGVyO1xuIiwiaW1wb3J0IEJhc2VDb250cm9sbGVyIGZyb20gJy4vQmFzZUNvbnRyb2xsZXInO1xuXG4vKiogQG1vZHVsZSBiYXNpYy1jb250cm9sbGVycyAqL1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgbGFiZWw6ICcmbmJzcDsnLFxuICBkZWZhdWx0OiAnJyxcbiAgcmVhZG9ubHk6IGZhbHNlLFxuICBjb250YWluZXI6IG51bGwsXG4gIGNhbGxiYWNrOiBudWxsLFxufVxuXG4vKipcbiAqIFRleHQgY29udHJvbGxlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZy5sYWJlbCAtIExhYmVsIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtBcnJheX0gW2NvbmZpZy5kZWZhdWx0PScnXSAtIERlZmF1bHQgdmFsdWUgb2YgdGhlIGNvbnRyb2xsZXIuXG4gKiBAcGFyYW0ge0FycmF5fSBbY29uZmlnLnJlYWRvbmx5PWZhbHNlXSAtIERlZmluZSBpZiB0aGUgY29udHJvbGxlciBpcyByZWFkb25seS5cbiAqIEBwYXJhbSB7U3RyaW5nfEVsZW1lbnR8YmFzaWMtY29udHJvbGxlcn5Hcm91cH0gW2NvbmZpZy5jb250YWluZXI9bnVsbF0gLVxuICogIENvbnRhaW5lciBvZiB0aGUgY29udHJvbGxlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb25maWcuY2FsbGJhY2s9bnVsbF0gLSBDYWxsYmFjayB0byBiZSBleGVjdXRlZCB3aGVuIHRoZVxuICogIHZhbHVlIGNoYW5nZXMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGNvbnRyb2xsZXJzIGZyb20gJ2Jhc2ljLWNvbnRvbGxlcnMnO1xuICpcbiAqIGNvbnN0IHRleHQgPSBuZXcgY29udHJvbGxlcnMuVGV4dCh7XG4gKiAgIGxhYmVsOiAnTXkgVGV4dCcsXG4gKiAgIGRlZmF1bHQ6ICdkZWZhdWx0IHZhbHVlJyxcbiAqICAgcmVhZG9ubHk6IGZhbHNlLFxuICogICBjb250YWluZXI6ICcjY29udGFpbmVyJyxcbiAqICAgY2FsbGJhY2s6ICh2YWx1ZSkgPT4gY29uc29sZS5sb2codmFsdWUpLFxuICogfSk7XG4gKi9cbmNsYXNzIFRleHQgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKCd0ZXh0JywgZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICB0aGlzLl92YWx1ZSA9IHRoaXMucGFyYW1zLmRlZmF1bHQ7XG4gICAgdGhpcy5pbml0aWFsaXplKCk7XG4gIH1cblxuICAvKipcbiAgICogQ3VycmVudCB2YWx1ZS5cbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLiRpbnB1dC52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHJlYWRvbmx5ID0gdGhpcy5wYXJhbXMucmVhZG9ubHkgPyAncmVhZG9ubHknIDogJyc7XG4gICAgY29uc3QgY29udGVudCA9IGBcbiAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWxcIj4ke3RoaXMucGFyYW1zLmxhYmVsfTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbm5lci13cmFwcGVyXCI+XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cInRleHRcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiJHt0aGlzLl92YWx1ZX1cIiAke3JlYWRvbmx5fSAvPlxuICAgICAgPC9kaXY+XG4gICAgYDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKCk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcbiAgICB0aGlzLiRpbnB1dCA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy50ZXh0Jyk7XG5cbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLiRpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsICgpID0+IHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdGhpcy4kaW5wdXQudmFsdWU7XG4gICAgICB0aGlzLmV4ZWN1dGVMaXN0ZW5lcnModGhpcy5fdmFsdWUpO1xuICAgIH0sIGZhbHNlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUZXh0O1xuIiwiaW1wb3J0IEJhc2VDb250cm9sbGVyIGZyb20gJy4vQmFzZUNvbnRyb2xsZXInO1xuXG4vKiogQG1vZHVsZSBiYXNpYy1jb250cm9sbGVycyAqL1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgbGFiZWw6ICcmbmJzcDsnLFxuICBjb250YWluZXI6IG51bGwsXG59O1xuXG4vKipcbiAqIFRpdGxlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge1N0cmluZ30gY29uZmlnLmxhYmVsIC0gTGFiZWwgb2YgdGhlIGNvbnRyb2xsZXIuXG4gKiBAcGFyYW0ge1N0cmluZ3xFbGVtZW50fGJhc2ljLWNvbnRyb2xsZXJ+R3JvdXB9IFtjb25maWcuY29udGFpbmVyPW51bGxdIC1cbiAqICBDb250YWluZXIgb2YgdGhlIGNvbnRyb2xsZXIuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGNvbnRyb2xsZXIgZnJvbSAnYmFzaWMtY29udHJvbGxlcnMnO1xuICpcbiAqIGNvbnN0IHRpdGxlID0gbmV3IGNvbnRyb2xsZXJzLlRpdGxlKHtcbiAqICAgbGFiZWw6ICdNeSBUaXRsZScsXG4gKiAgIGNvbnRhaW5lcjogJyNjb250YWluZXInXG4gKiB9KTtcbiAqL1xuY2xhc3MgVGl0bGUgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKCd0aXRsZScsIGRlZmF1bHRzLCBjb25maWcpO1xuICAgIHN1cGVyLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgY29udGVudCA9IGA8c3BhbiBjbGFzcz1cImxhYmVsXCI+JHt0aGlzLnBhcmFtcy5sYWJlbH08L3NwYW4+YDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKCk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUaXRsZTtcbiIsImltcG9ydCBCYXNlQ29udHJvbGxlciBmcm9tICcuL0Jhc2VDb250cm9sbGVyJztcbmltcG9ydCAqIGFzIGVsZW1lbnRzIGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcblxuLyoqIEBtb2R1bGUgYmFzaWMtY29udHJvbGxlcnMgKi9cblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIGxhYmVsOiAnJmJuc3A7JyxcbiAgYWN0aXZlOiBmYWxzZSxcbiAgY29udGFpbmVyOiBudWxsLFxuICBjYWxsYmFjazogbnVsbCxcbn07XG5cbi8qKlxuICogT24vT2ZmIGNvbnRyb2xsZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBjb25maWcubGFiZWwgLSBMYWJlbCBvZiB0aGUgY29udHJvbGxlci5cbiAqIEBwYXJhbSB7QXJyYXl9IFtjb25maWcuYWN0aXZlPWZhbHNlXSAtIERlZmF1bHQgc3RhdGUgb2YgdGhlIHRvZ2dsZS5cbiAqIEBwYXJhbSB7U3RyaW5nfEVsZW1lbnR8YmFzaWMtY29udHJvbGxlcn5Hcm91cH0gW2NvbmZpZy5jb250YWluZXI9bnVsbF0gLVxuICogIENvbnRhaW5lciBvZiB0aGUgY29udHJvbGxlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb25maWcuY2FsbGJhY2s9bnVsbF0gLSBDYWxsYmFjayB0byBiZSBleGVjdXRlZCB3aGVuIHRoZVxuICogIHZhbHVlIGNoYW5nZXMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGNvbnRyb2xsZXJzIGZyb20gJ2Jhc2ljLWNvbnRyb2xsZXJzJztcbiAqXG4gKiBjb25zdCB0b2dnbGUgPSBuZXcgY29udHJvbGxlcnMuVG9nZ2xlKHtcbiAqICAgbGFiZWw6ICdNeSBUb2dnbGUnLFxuICogICBhY3RpdmU6IGZhbHNlLFxuICogICBjb250YWluZXI6ICcjY29udGFpbmVyJyxcbiAqICAgY2FsbGJhY2s6IChhY3RpdmUpID0+IGNvbnNvbGUubG9nKGFjdGl2ZSksXG4gKiB9KTtcbiAqL1xuY2xhc3MgVG9nZ2xlIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcigndG9nZ2xlJywgZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICB0aGlzLl9hY3RpdmUgPSB0aGlzLnBhcmFtcy5hY3RpdmU7XG5cbiAgICBzdXBlci5pbml0aWFsaXplKCk7XG4gIH1cblxuICAvKipcbiAgICogVmFsdWUgb2YgdGhlIHRvZ2dsZVxuICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICovXG4gIHNldCB2YWx1ZShib29sKSB7XG4gICAgdGhpcy5hY3RpdmUgPSBib29sO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmU7XG4gIH1cblxuICAvKipcbiAgICogQWxpYXMgZm9yIGB2YWx1ZWAuXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAgc2V0IGFjdGl2ZShib29sKSB7XG4gICAgdGhpcy5fYWN0aXZlID0gYm9vbDtcbiAgICB0aGlzLl91cGRhdGVCdG4oKTtcbiAgfVxuXG4gIGdldCBhY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBfdXBkYXRlQnRuKCkge1xuICAgIHZhciBtZXRob2QgPSB0aGlzLmFjdGl2ZSA/ICdhZGQnIDogJ3JlbW92ZSc7XG4gICAgdGhpcy4kdG9nZ2xlLmNsYXNzTGlzdFttZXRob2RdKCdhY3RpdmUnKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZW5kZXIoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBgXG4gICAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+JHt0aGlzLnBhcmFtcy5sYWJlbH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlclwiPlxuICAgICAgICAke2VsZW1lbnRzLnRvZ2dsZX1cbiAgICAgIDwvZGl2PmA7XG5cbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcigpO1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoJ2FsaWduLXNtYWxsJyk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuJHRvZ2dsZSA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy50b2dnbGUtZWxlbWVudCcpO1xuICAgIC8vIGluaXRpYWxpemUgc3RhdGVcbiAgICB0aGlzLmFjdGl2ZSA9IHRoaXMuX2FjdGl2ZTtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHRoaXMuYWN0aXZlID0gIXRoaXMuYWN0aXZlO1xuICAgICAgdGhpcy5leGVjdXRlTGlzdGVuZXJzKHRoaXMuX2FjdGl2ZSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9nZ2xlO1xuIiwiaW1wb3J0IEJhc2VDb250cm9sbGVyIGZyb20gJy4vQmFzZUNvbnRyb2xsZXInO1xuXG4vKiogQG1vZHVsZSBiYXNpYy1jb250cm9sbGVycyAqL1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgbGFiZWw6ICcmbmJzcDsnLFxuICBvcHRpb25zOiBudWxsLFxuICBjb250YWluZXI6IG51bGwsXG4gIGNhbGxiYWNrOiBudWxsLFxufTtcblxuLyoqXG4gKiBMaXN0IG9mIGJ1dHRvbnMgd2l0aG91dCBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZy5sYWJlbCAtIExhYmVsIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtBcnJheX0gW2NvbmZpZy5vcHRpb25zPW51bGxdIC0gT3B0aW9ucyBmb3IgZWFjaCBidXR0b24uXG4gKiBAcGFyYW0ge1N0cmluZ3xFbGVtZW50fGJhc2ljLWNvbnRyb2xsZXJ+R3JvdXB9IFtjb25maWcuY29udGFpbmVyPW51bGxdIC1cbiAqICBDb250YWluZXIgb2YgdGhlIGNvbnRyb2xsZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29uZmlnLmNhbGxiYWNrPW51bGxdIC0gQ2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWQgd2hlbiB0aGVcbiAqICB2YWx1ZSBjaGFuZ2VzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBjb250cm9sbGVycyBmcm9tICdiYXNpYy1jb250cm9sbGVycyc7XG4gKlxuICogY29uc3QgdHJpZ2dlckJ1dHRvbnMgPSBuZXcgY29udHJvbGxlcnMuVHJpZ2dlckJ1dHRvbnMoe1xuICogICBsYWJlbDogJ015IFRyaWdnZXIgQnV0dG9ucycsXG4gKiAgIG9wdGlvbnM6IFsndmFsdWUgMScsICd2YWx1ZSAyJywgJ3ZhbHVlIDMnXSxcbiAqICAgY29udGFpbmVyOiAnI2NvbnRhaW5lcicsXG4gKiAgIGNhbGxiYWNrOiAodmFsdWUsIGluZGV4KSA9PiBjb25zb2xlLmxvZyh2YWx1ZSwgaW5kZXgpLFxuICogfSk7XG4gKi9cbmNsYXNzIFRyaWdnZXJCdXR0b25zIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcigndHJpZ2dlci1idXR0b25zJywgZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5wYXJhbXMub3B0aW9ucykpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyaWdnZXJCdXR0b246IEludmFsaWQgb3B0aW9uIFwib3B0aW9uc1wiJyk7XG5cbiAgICB0aGlzLl9pbmRleCA9IG51bGw7XG4gICAgdGhpcy5fdmFsdWUgPSBudWxsO1xuXG4gICAgc3VwZXIuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIExhc3QgdHJpZ2dlcmVkIGJ1dHRvbiB2YWx1ZS5cbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBnZXQgdmFsdWUoKSB7IHJldHVybiB0aGlzLl92YWx1ZTsgfVxuXG4gIC8qKlxuICAgKiBMYXN0IHRyaWdnZXJlZCBidXR0b24gaW5kZXguXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgZ2V0IGluZGV4KCkgeyByZXR1cm4gdGhpcy5faW5kZXg7IH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgbGFiZWwsIG9wdGlvbnMgfSA9IHRoaXMucGFyYW1zO1xuXG4gICAgY29uc3QgY29udGVudCA9IGBcbiAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWxcIj4ke2xhYmVsfTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbm5lci13cmFwcGVyXCI+XG4gICAgICAgICR7b3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICByZXR1cm4gYDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidG5cIj4ke29wdGlvbn08L2E+YDtcbiAgICAgICAgfSkuam9pbignJyl9XG4gICAgICA8L2Rpdj5gO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIoKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gICAgdGhpcy4kYnV0dG9ucyA9IEFycmF5LmZyb20odGhpcy4kZWwucXVlcnlTZWxlY3RvckFsbCgnLmJ0bicpKTtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJGJ1dHRvbnMuZm9yRWFjaCgoJGJ0biwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5wYXJhbXMub3B0aW9uc1tpbmRleF07XG5cbiAgICAgICRidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5faW5kZXggPSBpbmRleDtcblxuICAgICAgICB0aGlzLmV4ZWN1dGVMaXN0ZW5lcnModmFsdWUsIGluZGV4KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyaWdnZXJCdXR0b25zO1xuIiwiaW1wb3J0ICogYXMgX3N0eWxlcyBmcm9tICcuL3V0aWxzL3N0eWxlcyc7XG5leHBvcnQgY29uc3Qgc3R5bGVzID0gX3N0eWxlcztcblxuLyoqXG4gKiBAbW9kdWxlIGJhc2ljLWNvbnRyb2xsZXJzXG4gKi9cblxuLy8gZXhwb3NlIGZvciBwbHVnaW5zXG5pbXBvcnQgX0Jhc2VDb250cm9sbGVyIGZyb20gJy4vY29tcG9uZW50cy9CYXNlQ29udHJvbGxlcic7XG5leHBvcnQgY29uc3QgQmFzZUNvbnRyb2xsZXIgPSBfQmFzZUNvbnRyb2xsZXI7XG5cbmV4cG9ydCB7IGRlZmF1bHQgYXMgR3JvdXAgfSBmcm9tICcuL2NvbXBvbmVudHMvR3JvdXAnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBOdW1iZXJCb3ggfSBmcm9tICcuL2NvbXBvbmVudHMvTnVtYmVyQm94JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU2VsZWN0QnV0dG9ucyB9IGZyb20gJy4vY29tcG9uZW50cy9TZWxlY3RCdXR0b25zJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU2VsZWN0TGlzdCB9IGZyb20gJy4vY29tcG9uZW50cy9TZWxlY3RMaXN0JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU2xpZGVyIH0gZnJvbSAnLi9jb21wb25lbnRzL1NsaWRlcic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFRleHQgfSBmcm9tICcuL2NvbXBvbmVudHMvVGV4dCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFRpdGxlIH0gZnJvbSAnLi9jb21wb25lbnRzL1RpdGxlJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVG9nZ2xlIH0gZnJvbSAnLi9jb21wb25lbnRzL1RvZ2dsZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFRyaWdnZXJCdXR0b25zIH0gZnJvbSAnLi9jb21wb25lbnRzL1RyaWdnZXJCdXR0b25zJztcblxuLyoqXG4gKiBDaGFuZ2UgdGhlIHRoZW1lIG9mIHRoZSBjb250cm9sbGVycywgY3VycmVudGx5IDMgdGhlbWVzIGFyZSBhdmFpbGFibGU6XG4gKiAgLSAnbGlnaHQnIChkZWZhdWx0KVxuICogIC0gJ2dyZXknXG4gKiAgLSAnZGFyaydcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdGhlbWUgLSBOYW1lIG9mIHRoZSB0aGVtZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFRoZW1lKHRoZW1lKSB7XG4gIF9CYXNlQ29udHJvbGxlci50aGVtZSA9IHRoZW1lO1xufTtcblxuLyoqXG4gKiBEaXNhYmxlIGRlZmF1bHQgc3R5bGluZyAoZXhwZWN0IGEgYnJva2VuIHVpKVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZVN0eWxlcygpIHtcbiAgX3N0eWxlcy5kaXNhYmxlKCk7XG59O1xuXG5jb25zb2xlLmxvZyhHcm91cCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUoY29udGFpbmVyLCBjb25maWcpIHtcblxufVxuIiwiXG5leHBvcnQgY29uc3QgdG9nZ2xlID0gYFxuICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzcz1cInRvZ2dsZS1lbGVtZW50XCIgdmVyc2lvbj1cIjEuMVwiIHZpZXdCb3g9XCIwIDAgNTAgNTBcIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwibm9uZVwiPlxuICAgICAgPGcgY2xhc3M9XCJ4XCI+XG4gICAgICAgIDxsaW5lIHgxPVwiOFwiIHkxPVwiOFwiIHgyPVwiNDJcIiB5Mj1cIjQyXCIgc3Ryb2tlPVwid2hpdGVcIiAvPlxuICAgICAgICA8bGluZSB4MT1cIjhcIiB5MT1cIjQyXCIgeDI9XCI0MlwiIHkyPVwiOFwiIHN0cm9rZT1cIndoaXRlXCIgLz5cbiAgICAgIDwvZz5cbiAgPC9zdmc+XG5gO1xuXG5leHBvcnQgY29uc3QgYXJyb3dSaWdodCA9IGBcbiAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3M9XCJhcnJvdy1yaWdodFwiIHZlcnNpb249XCIxLjFcIiB2aWV3Qm94PVwiMCAwIDUwIDUwXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cIm5vbmVcIj5cbiAgICA8bGluZSB4MT1cIjEwXCIgeTE9XCIxMFwiIHgyPVwiNDBcIiB5Mj1cIjI1XCIgLz5cbiAgICA8bGluZSB4MT1cIjEwXCIgeTE9XCI0MFwiIHgyPVwiNDBcIiB5Mj1cIjI1XCIgLz5cbiAgPC9zdmc+XG5gO1xuXG5leHBvcnQgY29uc3QgYXJyb3dMZWZ0ID0gYFxuICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzcz1cImFycm93LWxlZnRcIiB2ZXJzaW9uPVwiMS4xXCIgdmlld0JveD1cIjAgMCA1MCA1MFwiIHByZXNlcnZlQXNwZWN0UmF0aW89XCJub25lXCI+XG4gICAgPGxpbmUgeDE9XCI0MFwiIHkxPVwiMTBcIiB4Mj1cIjEwXCIgeTI9XCIyNVwiIC8+XG4gICAgPGxpbmUgeDE9XCI0MFwiIHkxPVwiNDBcIiB4Mj1cIjEwXCIgeTI9XCIyNVwiIC8+XG4gIDwvc3ZnPlxuYDtcblxuZXhwb3J0IGNvbnN0IHNtYWxsQXJyb3dSaWdodCA9IGBcbiAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3M9XCJzbWFsbC1hcnJvdy1yaWdodFwiIHZpZXdCb3g9XCIwIDAgNTAgNTBcIj5cbiAgICA8cGF0aCBkPVwiTSAyMCAxNSBMIDM1IDI1IEwgMjAgMzUgWlwiIC8+XG4gIDwvc3ZnPlxuYDtcblxuZXhwb3J0IGNvbnN0IHNtYWxsQXJyb3dCb3R0b20gPSBgXG4gIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzPVwic21hbGwtYXJyb3ctYm90dG9tXCIgdmlld0JveD1cIjAgMCA1MCA1MFwiPlxuICAgIDxwYXRoIGQ9XCJNIDE1IDE3IEwgMzUgMTcgTCAyNSAzMiBaXCIgLz5cbiAgPC9zdmc+XG5gO1xuXG5cblxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIiAuYmFzaWMtY29udHJvbGxlcnMgeyB9IC5iYXNpYy1jb250cm9sbGVycyB7IHdpZHRoOiAxMDAlOyBtYXgtd2lkdGg6IDgwMHB4OyBoZWlnaHQ6IDM0cHg7IHBhZGRpbmc6IDNweDsgbWFyZ2luOiA0cHggYXV0bzsgYmFja2dyb3VuZC1jb2xvcjogI2VmZWZlZjsgYm9yZGVyOiAxcHggc29saWQgI2FhYWFhYTsgYm94LXNpemluZzogYm9yZGVyLWJveDsgYm9yZGVyLXJhZGl1czogMnB4OyBkaXNwbGF5OiBibG9jazsgY29sb3I6ICM0NjQ2NDY7IC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTsgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTsgLWtodG1sLXVzZXItc2VsZWN0OiBub25lOyAtbW96LXVzZXItc2VsZWN0OiBub25lOyAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7IHVzZXItc2VsZWN0OiBub25lOyB9IC5iYXNpYy1jb250cm9sbGVycyAubGFiZWwgeyBmb250OiBpdGFsaWMgbm9ybWFsIDEuMmVtIFF1aWNrc2FuZCwgYXJpYWwsIHNhbnMtc2VyaWY7IGxpbmUtaGVpZ2h0OiAyNnB4OyBvdmVyZmxvdzogaGlkZGVuOyB0ZXh0LWFsaWduOiByaWdodDsgcGFkZGluZzogMCA4cHggMCAwOyBkaXNwbGF5OiBibG9jazsgYm94LXNpemluZzogYm9yZGVyLWJveDsgd2lkdGg6IDI0JTsgZmxvYXQ6IGxlZnQ7IHdoaXRlLXNwYWNlOiBub3dyYXA7IC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7IC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7IC1tcy11c2VyLXNlbGVjdDogbm9uZTsgLW8tdXNlci1zZWxlY3Q6IG5vbmU7IHVzZXItc2VsZWN0OiBub25lOyB9IC5iYXNpYy1jb250cm9sbGVycyAuaW5uZXItd3JhcHBlciB7IGRpc3BsYXk6IC13ZWJraXQtaW5saW5lLWZsZXg7IGRpc3BsYXk6IGlubGluZS1mbGV4OyAtd2Via2l0LWZsZXgtd3JhcDogbm8td3JhcDsgZmxleC13cmFwOiBuby13cmFwOyB3aWR0aDogNzYlOyBmbG9hdDogbGVmdDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGwgeyBoZWlnaHQ6IDQ4cHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsOm5vdCguYWxpZ24tc21hbGwpIHsgaGVpZ2h0OiBhdXRvOyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbDpub3QoLmFsaWduLXNtYWxsKSAubGFiZWwgeyB3aWR0aDogMTAwJTsgZmxvYXQ6IG5vbmU7IHRleHQtYWxpZ246IGxlZnQ7IGxpbmUtaGVpZ2h0OiA0MHB4OyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbDpub3QoLmFsaWduLXNtYWxsKSAuaW5uZXItd3JhcHBlciB7IHdpZHRoOiAxMDAlOyBmbG9hdDogbm9uZTsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGwuYWxpZ24tc21hbGwgLmxhYmVsIHsgZGlzcGxheTogYmxvY2s7IG1hcmdpbi1yaWdodDogMjBweDsgdGV4dC1hbGlnbjogbGVmdDsgbGluZS1oZWlnaHQ6IDQwcHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsLmFsaWduLXNtYWxsIC5pbm5lci13cmFwcGVyIHsgZGlzcGxheTogaW5saW5lLWJsb2NrOyB3aWR0aDogYXV0bzsgfSAuYmFzaWMtY29udHJvbGxlcnMgLmFycm93LXJpZ2h0LCAuYmFzaWMtY29udHJvbGxlcnMgLmFycm93LWxlZnQgeyBib3JkZXItcmFkaXVzOiAycHg7IHdpZHRoOiAxNHB4OyBoZWlnaHQ6IDI2cHg7IGN1cnNvcjogcG9pbnRlcjsgYmFja2dyb3VuZC1jb2xvcjogIzQ2NDY0NjsgfSAuYmFzaWMtY29udHJvbGxlcnMgLmFycm93LXJpZ2h0IGxpbmUsIC5iYXNpYy1jb250cm9sbGVycyAuYXJyb3ctbGVmdCBsaW5lIHsgc3Ryb2tlLXdpZHRoOiAzcHg7IHN0cm9rZTogI2ZmZmZmZjsgfSAuYmFzaWMtY29udHJvbGxlcnMgLmFycm93LXJpZ2h0OmhvdmVyLCAuYmFzaWMtY29udHJvbGxlcnMgLmFycm93LWxlZnQ6aG92ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjNjg2ODY4OyB9IC5iYXNpYy1jb250cm9sbGVycyAuYXJyb3ctcmlnaHQ6YWN0aXZlLCAuYmFzaWMtY29udHJvbGxlcnMgLmFycm93LWxlZnQ6YWN0aXZlIHsgYmFja2dyb3VuZC1jb2xvcjogIzkwOTA5MDsgfSAuYmFzaWMtY29udHJvbGxlcnMgLnNtYWxsLWFycm93LXJpZ2h0LCAuYmFzaWMtY29udHJvbGxlcnMgLnNtYWxsLWFycm93LWJvdHRvbSB7IHdpZHRoOiAyNnB4OyBoZWlnaHQ6IDI2cHg7IGN1cnNvcjogcG9pbnRlcjsgfSAuYmFzaWMtY29udHJvbGxlcnMgLnNtYWxsLWFycm93LXJpZ2h0IHBhdGgsIC5iYXNpYy1jb250cm9sbGVycyAuc21hbGwtYXJyb3ctYm90dG9tIHBhdGggeyBmaWxsOiAjOTA5MDkwOyB9IC5iYXNpYy1jb250cm9sbGVycyAuc21hbGwtYXJyb3ctcmlnaHQ6aG92ZXIgcGF0aCwgLmJhc2ljLWNvbnRyb2xsZXJzIC5zbWFsbC1hcnJvdy1ib3R0b206aG92ZXIgcGF0aCB7IGZpbGw6ICM2ODY4Njg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC50b2dnbGUtZWxlbWVudCB7IHdpZHRoOiAyNnB4OyBoZWlnaHQ6IDI2cHg7IGJvcmRlci1yYWRpdXM6IDJweDsgYmFja2dyb3VuZC1jb2xvcjogIzQ2NDY0NjsgY3Vyc29yOiBwb2ludGVyOyB9IC5iYXNpYy1jb250cm9sbGVycyAudG9nZ2xlLWVsZW1lbnQ6aG92ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjNjg2ODY4OyB9IC5iYXNpYy1jb250cm9sbGVycyAudG9nZ2xlLWVsZW1lbnQgbGluZSB7IHN0cm9rZS13aWR0aDogM3B4OyB9IC5iYXNpYy1jb250cm9sbGVycyAudG9nZ2xlLWVsZW1lbnQgLnggeyBkaXNwbGF5OiBub25lOyB9IC5iYXNpYy1jb250cm9sbGVycyAudG9nZ2xlLWVsZW1lbnQuYWN0aXZlIC54IHsgZGlzcGxheTogYmxvY2s7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC5idG4geyBkaXNwbGF5OiBibG9jazsgdGV4dC1hbGlnbjogY2VudGVyOyBmb250OiBub3JtYWwgbm9ybWFsIDEycHggYXJpYWw7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgaGVpZ2h0OiAyNnB4OyBsaW5lLWhlaWdodDogMjZweDsgYmFja2dyb3VuZC1jb2xvcjogIzQ2NDY0NjsgYm9yZGVyOiBub25lOyBjb2xvcjogI2ZmZmZmZjsgbWFyZ2luOiAwIDRweCAwIDA7IHBhZGRpbmc6IDA7IGJveC1zaXppbmc6IGJvcmRlci1ib3g7IGJvcmRlci1yYWRpdXM6IDJweDsgY3Vyc29yOiBwb2ludGVyOyAtd2Via2l0LWZsZXgtZ3JvdzogMTsgZmxleC1ncm93OiAxOyB9IC5iYXNpYy1jb250cm9sbGVycyAuYnRuOmxhc3QtY2hpbGQgeyBtYXJnaW46IDA7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC5idG46aG92ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjNjg2ODY4OyB9IC5iYXNpYy1jb250cm9sbGVycyAuYnRuOmFjdGl2ZSwgLmJhc2ljLWNvbnRyb2xsZXJzIC5idG4uYWN0aXZlIHsgYmFja2dyb3VuZC1jb2xvcjogIzkwOTA5MDsgfSAuYmFzaWMtY29udHJvbGxlcnMgLmJ0bjpmb2N1cyB7IG91dGxpbmU6IG5vbmU7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC5udW1iZXIgeyBoZWlnaHQ6IDI2cHg7IGRpc3BsYXk6IGlubGluZS1ibG9jazsgcG9zaXRpb246IHJlbGF0aXZlOyBmb250OiBub3JtYWwgbm9ybWFsIDEuMmVtIFF1aWNrc2FuZCwgYXJpYWwsIHNhbnMtc2VyaWY7IHZlcnRpY2FsLWFsaWduOiB0b3A7IGJvcmRlcjogbm9uZTsgYmFja2dyb3VuZDogbm9uZTsgY29sb3I6ICM0NjQ2NDY7IHBhZGRpbmc6IDAgNHB4OyBtYXJnaW46IDA7IGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7IGJvcmRlci1yYWRpdXM6IDJweDsgYm94LXNpemluZzogYm9yZGVyLWJveDsgfSAuYmFzaWMtY29udHJvbGxlcnMgLm51bWJlcjpmb2N1cyB7IG91dGxpbmU6IG5vbmU7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIHNlbGVjdCB7IGhlaWdodDogMjZweDsgbGluZS1oZWlnaHQ6IDI2cHg7IGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7IGJvcmRlci1yYWRpdXM6IDJweDsgYm9yZGVyOiBub25lOyB2ZXJ0aWNhbC1hbGlnbjogdG9wOyBwYWRkaW5nOiAwOyBtYXJnaW46IDA7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIHNlbGVjdDpmb2N1cyB7IG91dGxpbmU6IG5vbmU7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIGlucHV0W3R5cGU9dGV4dF0geyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAyNnB4OyBsaW5lLWhlaWdodDogMjZweDsgYm9yZGVyOiAwOyBwYWRkaW5nOiAwIDRweDsgYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTsgYm9yZGVyLXJhZGl1czogMnB4OyBjb2xvcjogIzU2NTY1NjsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGwgLmFycm93LXJpZ2h0LCAuYmFzaWMtY29udHJvbGxlcnMuc21hbGwgLmFycm93LWxlZnQgeyB3aWR0aDogMjRweDsgaGVpZ2h0OiA0MHB4OyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbCAudG9nZ2xlLWVsZW1lbnQgeyB3aWR0aDogNDBweDsgaGVpZ2h0OiA0MHB4OyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbCAuYnRuIHsgaGVpZ2h0OiA0MHB4OyBsaW5lLWhlaWdodDogNDBweDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGwgLm51bWJlciB7IGhlaWdodDogNDBweDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGwgc2VsZWN0IHsgaGVpZ2h0OiA0MHB4OyBsaW5lLWhlaWdodDogNDBweDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGwgaW5wdXRbdHlwZT10ZXh0XSB7IGhlaWdodDogNDBweDsgbGluZS1oZWlnaHQ6IDQwcHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnRpdGxlIHsgYm9yZGVyOiBub25lICFpbXBvcnRhbnQ7IG1hcmdpbi1ib3R0b206IDA7IG1hcmdpbi10b3A6IDhweDsgcGFkZGluZy10b3A6IDhweDsgcGFkZGluZy1ib3R0b206IDA7IGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7IGhlaWdodDogMjVweDsgfSAuYmFzaWMtY29udHJvbGxlcnMudGl0bGUgLmxhYmVsIHsgZm9udDogbm9ybWFsIGJvbGQgMS4zZW0gUXVpY2tzYW5kLCBhcmlhbCwgc2Fucy1zZXJpZjsgaGVpZ2h0OiAxMDAlOyBvdmVyZmxvdzogaGlkZGVuOyB0ZXh0LWFsaWduOiBsZWZ0OyBwYWRkaW5nOiAwOyB3aWR0aDogMTAwJTsgYm94LXNpemluZzogYm9yZGVyLWJveDsgLXdlYmtpdC1mbGV4LWdyb3c6IDE7IGZsZXgtZ3JvdzogMTsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JvdXAgeyBoZWlnaHQ6IGF1dG87IGJhY2tncm91bmQtY29sb3I6IHdoaXRlOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncm91cCAuZ3JvdXAtaGVhZGVyIC5sYWJlbCB7IGZvbnQ6IG5vcm1hbCBib2xkIDEuM2VtIFF1aWNrc2FuZCwgYXJpYWwsIHNhbnMtc2VyaWY7IGhlaWdodDogMjZweDsgbGluZS1oZWlnaHQ6IDI2cHg7IG92ZXJmbG93OiBoaWRkZW47IHRleHQtYWxpZ246IGxlZnQ7IHBhZGRpbmc6IDAgMCAwIDM2cHg7IHdpZHRoOiAxMDAlOyBib3gtc2l6aW5nOiBib3JkZXItYm94OyAtd2Via2l0LWZsZXgtZ3JvdzogMTsgZmxleC1ncm93OiAxOyBmbG9hdDogbm9uZTsgY3Vyc29yOiBwb2ludGVyOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncm91cCAuZ3JvdXAtaGVhZGVyIC5zbWFsbC1hcnJvdy1yaWdodCB7IHdpZHRoOiAyNnB4OyBoZWlnaHQ6IDI2cHg7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JvdXAgLmdyb3VwLWhlYWRlciAuc21hbGwtYXJyb3ctYm90dG9tIHsgd2lkdGg6IDI2cHg7IGhlaWdodDogMjZweDsgcG9zaXRpb246IGFic29sdXRlOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncm91cCAuZ3JvdXAtY29udGVudCB7IG92ZXJmbG93OiBoaWRkZW47IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyb3VwIC5ncm91cC1jb250ZW50IGxhYmVsOmxhc3QtY2hpbGQgeyBtYXJnaW4tYm90dG9tOiAwOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncm91cC5vcGVuZWQgLmdyb3VwLWhlYWRlciAuc21hbGwtYXJyb3ctcmlnaHQgeyBkaXNwbGF5OiBub25lOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncm91cC5vcGVuZWQgLmdyb3VwLWhlYWRlciAuc21hbGwtYXJyb3ctYm90dG9tIHsgZGlzcGxheTogYmxvY2s7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyb3VwLm9wZW5lZCAuZ3JvdXAtY29udGVudCB7IGhlaWdodDogYXV0bzsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JvdXAuY2xvc2VkIC5ncm91cC1oZWFkZXIgLnNtYWxsLWFycm93LXJpZ2h0IHsgZGlzcGxheTogYmxvY2s7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyb3VwLmNsb3NlZCAuZ3JvdXAtaGVhZGVyIC5zbWFsbC1hcnJvdy1ib3R0b20geyBkaXNwbGF5OiBub25lOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncm91cC5jbG9zZWQgLmdyb3VwLWNvbnRlbnQgeyBoZWlnaHQ6IDA7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNsaWRlciAucmFuZ2UgeyBoZWlnaHQ6IDI2cHg7IGRpc3BsYXk6IGlubGluZS1ibG9jazsgbWFyZ2luOiAwOyAtd2Via2l0LWZsZXgtZ3JvdzogNDsgZmxleC1ncm93OiA0OyBwb3NpdGlvbjogcmVsYXRpdmU7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNsaWRlciAucmFuZ2UgY2FudmFzIHsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IDA7IGxlZnQ6IDA7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNsaWRlciAubnVtYmVyLXdyYXBwZXIgeyBkaXNwbGF5OiBpbmxpbmU7IGhlaWdodDogMjZweDsgdGV4dC1hbGlnbjogcmlnaHQ7IC13ZWJraXQtZmxleC1ncm93OiAzOyBmbGV4LWdyb3c6IDM7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNsaWRlciAubnVtYmVyLXdyYXBwZXIgLm51bWJlciB7IGxlZnQ6IDVweDsgd2lkdGg6IDU0cHg7IHRleHQtYWxpZ246IHJpZ2h0OyB9IC5iYXNpYy1jb250cm9sbGVycy5zbGlkZXIgLm51bWJlci13cmFwcGVyIC51bml0IHsgZm9udDogaXRhbGljIG5vcm1hbCAxZW0gUXVpY2tzYW5kLCBhcmlhbCwgc2Fucy1zZXJpZjsgbGluZS1oZWlnaHQ6IDI2cHg7IGhlaWdodDogMjZweDsgd2lkdGg6IDMwcHg7IGRpc3BsYXk6IGlubGluZS1ibG9jazsgcG9zaXRpb246IHJlbGF0aXZlOyBwYWRkaW5nLWxlZnQ6IDVweDsgcGFkZGluZy1yaWdodDogNXB4OyBjb2xvcjogIzU2NTY1NjsgfSAuYmFzaWMtY29udHJvbGxlcnMuc2xpZGVyIC5udW1iZXItd3JhcHBlciAudW5pdCBzdXAgeyBsaW5lLWhlaWdodDogN3B4OyB9IC5iYXNpYy1jb250cm9sbGVycy5zbGlkZXIuc2xpZGVyLWxhcmdlIC5yYW5nZSB7IC13ZWJraXQtZmxleC1ncm93OiA1MDsgZmxleC1ncm93OiA1MDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc2xpZGVyLnNsaWRlci1sYXJnZSAubnVtYmVyLXdyYXBwZXIgeyAtd2Via2l0LWZsZXgtZ3JvdzogMTsgZmxleC1ncm93OiAxOyB9IC5iYXNpYy1jb250cm9sbGVycy5zbGlkZXIuc2xpZGVyLXNtYWxsIC5yYW5nZSB7IC13ZWJraXQtZmxleC1ncm93OiAyOyBmbGV4LWdyb3c6IDI7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNsaWRlci5zbGlkZXItc21hbGwgLm51bWJlci13cmFwcGVyIHsgLXdlYmtpdC1mbGV4LWdyb3c6IDQ7IGZsZXgtZ3JvdzogNDsgfSAuYmFzaWMtY29udHJvbGxlcnMubnVtYmVyLWJveCAubnVtYmVyIHsgd2lkdGg6IDEyMHB4OyBtYXJnaW46IDAgMTBweDsgdmVydGljYWwtYWxpZ246IHRvcDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc2VsZWN0LWxpc3Qgc2VsZWN0IHsgbWFyZ2luOiAwIDEwcHg7IHdpZHRoOiAxMjBweDsgZm9udDogbm9ybWFsIG5vcm1hbCAxLjJlbSBRdWlja3NhbmQsIGFyaWFsLCBzYW5zLXNlcmlmOyBjb2xvcjogIzQ2NDY0NjsgfSAuYmFzaWMtY29udHJvbGxlcnMuc2VsZWN0LWJ1dHRvbnMgLmJ0bjpmaXJzdC1vZi10eXBlIHsgbWFyZ2luLWxlZnQ6IDRweDsgfSAuYmFzaWMtY29udHJvbGxlcnMudGV4dCBpbnB1dFt0eXBlPXRleHRdIHsgZm9udDogbm9ybWFsIG5vcm1hbCAxLjJlbSBRdWlja3NhbmQsIGFyaWFsLCBzYW5zLXNlcmlmOyBjb2xvcjogIzQ2NDY0NjsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGwuc2xpZGVyIC5yYW5nZSB7IGhlaWdodDogNDBweDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGwuc2xpZGVyIC5udW1iZXItd3JhcHBlciB7IGhlaWdodDogNDBweDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGwuc2xpZGVyIC5udW1iZXItd3JhcHBlciAudW5pdCB7IGxpbmUtaGVpZ2h0OiA0MHB4OyBoZWlnaHQ6IDQwcHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjMzYzNjM2OyBib3JkZXI6IDFweCBzb2xpZCAjNTg1ODU4OyBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjk1KTsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAudG9nZ2xlLWVsZW1lbnQgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC50b2dnbGUtZWxlbWVudCBsaW5lIHsgc3Ryb2tlOiAjMzYzNjM2OyB9IC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC50b2dnbGUtZWxlbWVudDpob3ZlciB7IGJhY2tncm91bmQtY29sb3I6ICNjZGNkY2Q7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLmFycm93LXJpZ2h0LCAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAuYXJyb3ctbGVmdCB7IGJhY2tncm91bmQtY29sb3I6ICNlZmVmZWY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLmFycm93LXJpZ2h0IGxpbmUsIC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC5hcnJvdy1sZWZ0IGxpbmUgeyBzdHJva2U6ICMzNjM2MzY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLmFycm93LXJpZ2h0OmhvdmVyLCAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAuYXJyb3ctbGVmdDpob3ZlciB7IGJhY2tncm91bmQtY29sb3I6ICNjZGNkY2Q7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLmFycm93LXJpZ2h0OmFjdGl2ZSwgLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLmFycm93LWxlZnQ6YWN0aXZlIHsgYmFja2dyb3VuZC1jb2xvcjogI2FiYWJhYjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAuc21hbGwtYXJyb3ctcmlnaHQgcGF0aCwgLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLnNtYWxsLWFycm93LWJvdHRvbSBwYXRoIHsgZmlsbDogI2FiYWJhYjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAuc21hbGwtYXJyb3ctcmlnaHQ6aG92ZXIgcGF0aCwgLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLnNtYWxsLWFycm93LWJvdHRvbTpob3ZlciBwYXRoIHsgZmlsbDogI2NkY2RjZDsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAubnVtYmVyLCAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSBzZWxlY3QsIC5iYXNpYy1jb250cm9sbGVycy5ncmV5IGlucHV0W3R5cGU9dGV4dF0geyBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjk1KTsgYmFja2dyb3VuZC1jb2xvcjogIzQ1NDU0NTsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAuYnRuIHsgYmFja2dyb3VuZC1jb2xvcjogI2VmZWZlZjsgY29sb3I6ICMzNjM2MzY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLmJ0bjpob3ZlciB7IGJhY2tncm91bmQtY29sb3I6ICNjZGNkY2Q7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLmJ0bjphY3RpdmUsIC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC5idG4uYWN0aXZlIHsgYmFja2dyb3VuZC1jb2xvcjogI2FiYWJhYjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JleS5zbGlkZXIgLmlubmVyLXdyYXBwZXIgLm51bWJlci13cmFwcGVyIC51bml0IHsgY29sb3I6ICNiY2JjYmM7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkuZ3JvdXAgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjNTA1MDUwOyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrIHsgYmFja2dyb3VuZC1jb2xvcjogIzI0MjQyNDsgYm9yZGVyOiAxcHggc29saWQgIzI4MjgyODsgY29sb3I6ICNmZmZmZmY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLnRvZ2dsZS1lbGVtZW50IHsgYmFja2dyb3VuZC1jb2xvcjogIzQ2NDY0NjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAudG9nZ2xlLWVsZW1lbnQgbGluZSB7IHN0cm9rZTogI2ZmZmZmZjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAudG9nZ2xlLWVsZW1lbnQ6aG92ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjNjg2ODY4OyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5hcnJvdy1yaWdodCwgLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLmFycm93LWxlZnQgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjNDY0NjQ2OyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5hcnJvdy1yaWdodCBsaW5lLCAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYXJyb3ctbGVmdCBsaW5lIHsgc3Ryb2tlOiAjZmZmZmZmOyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5hcnJvdy1yaWdodDpob3ZlciwgLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLmFycm93LWxlZnQ6aG92ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjNjg2ODY4OyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5hcnJvdy1yaWdodDphY3RpdmUsIC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5hcnJvdy1sZWZ0OmFjdGl2ZSB7IGJhY2tncm91bmQtY29sb3I6ICM5MDkwOTA7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLnNtYWxsLWFycm93LXJpZ2h0IHBhdGgsIC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5zbWFsbC1hcnJvdy1ib3R0b20gcGF0aCB7IGZpbGw6ICM5MDkwOTA7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLnNtYWxsLWFycm93LXJpZ2h0OmhvdmVyIHBhdGgsIC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5zbWFsbC1hcnJvdy1ib3R0b206aG92ZXIgcGF0aCB7IGZpbGw6ICM2ODY4Njg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLm51bWJlciwgLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgc2VsZWN0LCAuYmFzaWMtY29udHJvbGxlcnMuZGFyayBpbnB1dFt0eXBlPXRleHRdIHsgY29sb3I6ICNmZmZmZmY7IGJhY2tncm91bmQtY29sb3I6ICMzMzMzMzM7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLmJ0biB7IGJhY2tncm91bmQtY29sb3I6ICM0NjQ2NDY7IGNvbG9yOiAjZmZmZmZmOyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5idG46aG92ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjNjg2ODY4OyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5idG46YWN0aXZlLCAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYnRuLmFjdGl2ZSB7IGJhY2tncm91bmQtY29sb3I6ICM5MDkwOTA7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsuc2xpZGVyIC5pbm5lci13cmFwcGVyIC5udW1iZXItd3JhcHBlciAudW5pdCB7IGNvbG9yOiAjY2RjZGNkOyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrLmdyb3VwIHsgYmFja2dyb3VuZC1jb2xvcjogIzNlM2UzZTsgfSBcIjsiLCJpbXBvcnQgeyBuYW1lIH0gZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJztcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9zdHlsZXMtZGVjbGFyYXRpb25zLmpzJztcblxuZXhwb3J0IGNvbnN0IG5zID0gbmFtZTtcblxuY29uc3QgbnNDbGFzcyA9IGAuJHtuc31gO1xubGV0IF9kaXNhYmxlZCA9IGZhbHNlO1xuXG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgX2Rpc2FibGVkID0gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydFN0eWxlU2hlZXQoKSB7XG4gIGlmIChfZGlzYWJsZWQpIHJldHVybjtcblxuICBjb25zdCAkY3NzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgJGNzcy5zZXRBdHRyaWJ1dGUoJ2RhdGEtbmFtZXNwYWNlJywgbnMpO1xuICAkY3NzLnR5cGUgPSAndGV4dC9jc3MnO1xuXG4gIGlmICgkY3NzLnN0eWxlU2hlZXQpXG4gICAgJGNzcy5zdHlsZVNoZWV0LmNzc1RleHQgPSBzdHlsZXM7XG4gIGVsc2VcbiAgICAkY3NzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHN0eWxlcykpO1xuXG4gIC8vIGluc2VydCBiZWZvcmUgbGluayBvciBzdHlsZXMgaWYgZXhpc3RzXG4gIGNvbnN0ICRsaW5rID0gZG9jdW1lbnQuaGVhZC5xdWVyeVNlbGVjdG9yKCdsaW5rJyk7XG4gIGNvbnN0ICRzdHlsZSA9IGRvY3VtZW50LmhlYWQucXVlcnlTZWxlY3Rvcignc3R5bGUnKTtcblxuICBpZiAoJGxpbmspXG4gICAgZG9jdW1lbnQuaGVhZC5pbnNlcnRCZWZvcmUoJGNzcywgJGxpbmspO1xuICBlbHNlIGlmICgkc3R5bGUpXG4gICAgZG9jdW1lbnQuaGVhZC5pbnNlcnRCZWZvcmUoJGNzcywgJHN0eWxlKTtcbiAgZWxzZVxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoJGNzcyk7XG59XG5cbiIsImltcG9ydCAqIGFzIGNvbnRyb2xsZXJzIGZyb20gJy4uLy4uLy4uL2Rpc3QvaW5kZXgnO1xuXG4vLyBjb21wb25lbnRzXG5jb25zdCB0aXRsZTEgPSBuZXcgY29udHJvbGxlcnMuVGl0bGUoe1xuICBsYWJlbDogJ1RpdGxlJyxcbiAgY29udGFpbmVyOiAnI2NvbnRhaW5lcidcbn0pO1xuXG5jb25zdCB0cmlnZ2VyQnV0dG9ucyA9IG5ldyBjb250cm9sbGVycy5UcmlnZ2VyQnV0dG9ucyh7XG4gIGxhYmVsOiAnVHJpZ2dlckJ1dHRvbnMnLFxuICBvcHRpb25zOiBbJ2xpZ2h0JywgJ2dyZXknLCAnZGFyayddLFxuICBjb250YWluZXI6ICcjY29udGFpbmVyJyxcbiAgY2FsbGJhY2s6ICh0aGVtZSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdCdXR0b24gPT4nLCB0aGVtZSk7XG5cbiAgICBzd2l0Y2ggKHRoZW1lKSB7XG4gICAgICBjYXNlICdsaWdodCc6XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmZmZmZmYnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2dyZXknOlxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjMDAwMDAwJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkYXJrJzpcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMDAwMCc7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnRyb2xsZXJzLnNldFRoZW1lKHRoZW1lKTtcbiAgfSxcbn0pO1xuXG5jb25zdCBudW1iZXJCb3ggPSBuZXcgY29udHJvbGxlcnMuTnVtYmVyQm94KHtcbiAgbGFiZWw6ICdOdW1iZXJCb3gnLFxuICBtaW46IDAsXG4gIG1heDogMTAsXG4gIHN0ZXA6IDAuMSxcbiAgZGVmYXVsdDogNSxcbiAgY29udGFpbmVyOiAnI2NvbnRhaW5lcicsXG4gIGNhbGxiYWNrOiAodmFsdWUpID0+IGNvbnNvbGUubG9nKCdOdW1iZXIgPT4nLCB2YWx1ZSksXG59KTtcblxuY29uc3QgdG9nZ2xlID0gbmV3IGNvbnRyb2xsZXJzLlRvZ2dsZSh7XG4gIGxhYmVsOiAnVG9nZ2xlJyxcbiAgYWN0aXZlOiBmYWxzZSxcbiAgY29udGFpbmVyOiAnI2NvbnRhaW5lcicsXG4gIGNhbGxiYWNrOiAoYWN0aXZlKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ1RvZ2dsZSA9PicsIGFjdGl2ZSk7XG5cbiAgICBpZiAoYWN0aXZlKVxuICAgICAgbnVtYmVyQm94LnZhbHVlID0gMDtcbiAgfVxufSk7XG5cbmNvbnN0IGluZm8gPSBuZXcgY29udHJvbGxlcnMuVGV4dCh7XG4gIGxhYmVsOiAnSW5mbycsXG4gIGRlZmF1bHQ6ICdyZWFkLW9ubHkgdmFsdWUnLFxuICByZWFkb25seTogdHJ1ZSxcbiAgY29udGFpbmVyOiAnI2NvbnRhaW5lcicsXG59KTtcblxuY29uc3QgdGV4dCA9IG5ldyBjb250cm9sbGVycy5UZXh0KHtcbiAgbGFiZWw6ICdUZXh0JyxcbiAgZGVmYXVsdDogJ2RlZmF1bHQgdmFsdWUnLFxuICByZWFkb25seTogZmFsc2UsXG4gIGNvbnRhaW5lcjogJyNjb250YWluZXInLFxuICBjYWxsYmFjazogKHZhbHVlKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ1RleHQgPT4nLCB2YWx1ZSk7XG4gICAgaW5mby52YWx1ZSA9IHZhbHVlO1xuICB9LFxufSk7XG5cbmNvbnN0IHNlbGVjdExpc3QgPSBuZXcgY29udHJvbGxlcnMuU2VsZWN0TGlzdCh7XG4gIGxhYmVsOiAnU2VsZWN0TGlzdCcsXG4gIG9wdGlvbnM6IFsnc3RhbmRieScsICdydW4nLCAnZW5kJ10sXG4gIGRlZmF1bHQ6ICdydW4nLFxuICBjb250YWluZXI6ICcjY29udGFpbmVyJyxcbiAgY2FsbGJhY2s6ICh2YWx1ZSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdTZWxlY3RMaXN0ID0+JywgdmFsdWUpO1xuXG4gICAgaW5mby52YWx1ZSA9IHZhbHVlO1xuICAgIHNlbGVjdEJ1dHRvbnMudmFsdWUgPSB2YWx1ZTtcbiAgfSxcbn0pO1xuXG5jb25zdCBzZWxlY3RCdXR0b25zID0gbmV3IGNvbnRyb2xsZXJzLlNlbGVjdEJ1dHRvbnMoe1xuICBsYWJlbDogJ1NlbGVjdEJ1dHRvbnMnLFxuICBvcHRpb25zOiBbJ3N0YW5kYnknLCAncnVuJywgJ2VuZCddLFxuICBkZWZhdWx0OiAncnVuJyxcbiAgY29udGFpbmVyOiAnI2NvbnRhaW5lcicsXG4gIGNhbGxiYWNrOiAodmFsdWUpID0+IHtcbiAgICBjb25zb2xlLmxvZygnU2VsZWN0QnV0dG9ucyA9PicsIHZhbHVlKTtcblxuICAgIGluZm8udmFsdWUgPSB2YWx1ZTtcbiAgICBzZWxlY3RMaXN0LnZhbHVlID0gdmFsdWU7XG4gIH1cbn0pO1xuXG4vLyAvLyBncm91cFxuY29uc3QgZ3JvdXAgPSBuZXcgY29udHJvbGxlcnMuR3JvdXAoe1xuICBsYWJlbDogJ0dyb3VwJyxcbiAgZGVmYXVsdDogJ29wZW5lZCcsXG4gIGNvbnRhaW5lcjogJyNjb250YWluZXInXG59KTtcblxuY29uc3QgZ3JvdXBTbGlkZXIgPSBuZXcgY29udHJvbGxlcnMuU2xpZGVyKHtcbiAgbGFiZWw6ICdHcm91cCBTbGlkZXInLFxuICBtaW46IDIwLFxuICBtYXg6IDEwMDAsXG4gIHN0ZXA6IDEsXG4gIGRlZmF1bHQ6IDIwMCxcbiAgdW5pdDogJ0h6JyxcbiAgc2l6ZTogJ2xhcmdlJyxcbiAgY29udGFpbmVyOiBncm91cCxcbiAgY2FsbGJhY2s6ICh2YWx1ZSkgPT4gY29uc29sZS5sb2coJ0dyb3VwIC0gU2xpZGVyID0+JywgdmFsdWUpLFxufSk7XG5cbmNvbnN0IGdyb3VwVGV4dCA9IG5ldyBjb250cm9sbGVycy5UZXh0KHtcbiAgbGFiZWw6ICdHcm91cCBUZXh0JyxcbiAgZGVmYXVsdDogJ3RleHQgaW5wdXQnLFxuICByZWFkb25seTogZmFsc2UsXG4gIGNvbnRhaW5lcjogZ3JvdXAsXG4gIGNhbGxiYWNrOiAodmFsdWUpID0+IGNvbnNvbGUubG9nKCdHcm91cCAtIFRleHQgPT4nLCB2YWx1ZSksXG59KTtcblxuLy8gLy8gc2xpZGVyc1xuY29uc3QgdGl0bGUyID0gbmV3IGNvbnRyb2xsZXJzLlRpdGxlKHtcbiAgbGFiZWw6ICdTbGlkZXJzJyxcbiAgY29udGFpbmVyOiAnI2NvbnRhaW5lcicsXG59KTtcblxuY29uc3Qgc2xpZGVyTGFyZ2UgPSBuZXcgY29udHJvbGxlcnMuU2xpZGVyKHtcbiAgbGFiZWw6ICdTbGlkZXIgKGxhcmdlKScsXG4gIG1pbjogMjAsXG4gIG1heDogMTAwMCxcbiAgc3RlcDogMSxcbiAgZGVmYXVsdDogNTM3LFxuICB1bml0OiAnSHonLFxuICBzaXplOiAnbGFyZ2UnLFxuICBjb250YWluZXI6ICcjY29udGFpbmVyJyxcbiAgY2FsbGJhY2s6ICh2YWx1ZSkgPT4gY29uc29sZS5sb2coJ1NsaWRlciAobGFyZ2UpID0+JywgdmFsdWUpLFxufSk7XG5cbmNvbnN0IHNsaWRlck1lZGl1bSA9IG5ldyBjb250cm9sbGVycy5TbGlkZXIoe1xuICBsYWJlbDogJ1NsaWRlciAoZGVmYXVsdCAvIG1lZGl1bSknLFxuICBtaW46IDIwLFxuICBtYXg6IDEwMDAsXG4gIHN0ZXA6IDEsXG4gIGRlZmF1bHQ6IDIyNSxcbiAgdW5pdDogJ20uczxzdXA+LTE8L3N1cD4nLFxuICBzaXplOiAnbWVkaXVtJyxcbiAgY29udGFpbmVyOiAnI2NvbnRhaW5lcicsXG4gIGNhbGxiYWNrOiAodmFsdWUpID0+IGNvbnNvbGUubG9nKCdTbGlkZXIgKGRlZmF1bHQpID0+JywgdmFsdWUpLFxufSk7XG5cbmNvbnN0IHNsaWRlclNtYWxsID0gbmV3IGNvbnRyb2xsZXJzLlNsaWRlcih7XG4gIGxhYmVsOiAnU2xpZGVyIChzbWFsbCknLFxuICBtaW46IDIwLFxuICBtYXg6IDEwMDAsXG4gIHN0ZXA6IDEsXG4gIGRlZmF1bHQ6IDY2MCxcbiAgc2l6ZTogJ3NtYWxsJyxcbiAgY29udGFpbmVyOiAnI2NvbnRhaW5lcicsXG4gIGNhbGxiYWNrOiAodmFsdWUpID0+IGNvbnNvbGUubG9nKCdTbGlkZXIgKHNtYWxsKSA9PicsIHZhbHVlKSxcbn0pO1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIm5hbWVcIjogXCJiYXNpYy1jb250cm9sbGVyc1wiLFxuICBcInZlcnNpb25cIjogXCIxLjAuMFwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiU2V0IG9mIHNpbXBsZSBjb250cm9sbGVycyBmb3IgcmFwaWQgcHJvdG90eXBpbmdcIixcbiAgXCJtYWluXCI6IFwiZGlzdC9pbmRleC5qc1wiLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiZG9jXCI6IFwianNkb2MybWQgLXQgdG1wbC9SRUFETUUuaGJzIC0tc2VwYXJhdG9ycyBzcmMvKiovKi5qcyBzcmMvKi5qcyA+IFJFQURNRS5tZFwiLFxuICAgIFwidHJhbnNwaWxlXCI6IFwibm9kZSAuL2Jpbi9ydW5uZXIgLS10cmFuc3BpbGVcIixcbiAgICBcInByZXdhdGNoXCI6IFwibm9kZSAuL2Jpbi9ydW5uZXIgLS10cmFuc3BpbGVcIixcbiAgICBcIndhdGNoXCI6IFwibm9kZSAuL2Jpbi9ydW5uZXIgLS13YXRjaFwiXG4gIH0sXG4gIFwibGljZW5zZVwiOiBcIkJTRC0zLUNsYXVzZVwiLFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2lyY2FtLWpzdG9vbHMvYmFzaWMtY29udHJvbGxlcnMuZ2l0XCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiYmFiZWwtcnVudGltZVwiOiBcIl42LjE4LjBcIixcbiAgICBcImd1aS1jb21wb25lbnRzXCI6IFwiaXJjYW0tanN0b29scy9ndWktY29tcG9uZW50cyN2MS4wLjBcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJiYWJlbC1jb3JlXCI6IFwiXjYuMTguMlwiLFxuICAgIFwiYmFiZWwtcGx1Z2luLXRyYW5zZm9ybS1lczIwMTUtbW9kdWxlcy1jb21tb25qc1wiOiBcIl42LjE4LjBcIixcbiAgICBcImJhYmVsLXBsdWdpbi10cmFuc2Zvcm0tcnVudGltZVwiOiBcIl42LjE1LjBcIixcbiAgICBcImJhYmVsLXByZXNldC1lczIwMTVcIjogXCJeNi4xOC4wXCIsXG4gICAgXCJjb2xvcnNcIjogXCJeMS4xLjJcIixcbiAgICBcImZzLWV4dHJhXCI6IFwiXjEuMC4wXCIsXG4gICAgXCJqc2RvYy10by1tYXJrZG93blwiOiBcIl4yLjAuMVwiLFxuICAgIFwibm9kZS1zYXNzXCI6IFwiXjMuMTMuMFwiLFxuICAgIFwid2F0Y2hcIjogXCJeMS4wLjFcIlxuICB9XG59XG4iLCJmdW5jdGlvbiBnZXRTY2FsZShkb21haW4sIHJhbmdlKSB7XG4gIGNvbnN0IHNsb3BlID0gKHJhbmdlWzFdIC0gcmFuZ2VbMF0pIC8gKGRvbWFpblsxXSAtIGRvbWFpblswXSk7XG4gIGNvbnN0IGludGVyY2VwdCA9IHJhbmdlWzBdIC0gc2xvcGUgKiBkb21haW5bMF07XG5cbiAgZnVuY3Rpb24gc2NhbGUodmFsKSB7XG4gICAgcmV0dXJuIHNsb3BlICogdmFsICsgaW50ZXJjZXB0O1xuICB9XG5cbiAgc2NhbGUuaW52ZXJ0ID0gZnVuY3Rpb24odmFsKSB7XG4gICAgcmV0dXJuICh2YWwgLSBpbnRlcmNlcHQpIC8gc2xvcGU7XG4gIH1cblxuICByZXR1cm4gc2NhbGU7XG59XG5cbmZ1bmN0aW9uIGdldENsaXBwZXIobWluLCBtYXgsIHN0ZXApIHtcbiAgcmV0dXJuICh2YWwpID0+IHtcbiAgICBjb25zdCBjbGlwcGVkVmFsdWUgPSBNYXRoLnJvdW5kKHZhbCAvIHN0ZXApICogc3RlcDtcbiAgICBjb25zdCBmaXhlZCA9IE1hdGgubWF4KE1hdGgubG9nMTAoMSAvIHN0ZXApLCAwKTtcbiAgICBjb25zdCBmaXhlZFZhbHVlID0gY2xpcHBlZFZhbHVlLnRvRml4ZWQoZml4ZWQpOyAvLyBmaXggZmxvYXRpbmcgcG9pbnQgZXJyb3JzXG4gICAgcmV0dXJuIE1hdGgubWluKG1heCwgTWF0aC5tYXgobWluLCBwYXJzZUZsb2F0KGZpeGVkVmFsdWUpKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBAbW9kdWxlIGd1aS1jb21wb25lbnRzXG4gKi9cblxuLyoqXG4gKiBWZXJzYXRpbGUgY2FudmFzIGJhc2VkIHNsaWRlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7J2p1bXAnfCdwcm9wb3J0aW9ubmFsJ3wnaGFuZGxlJ30gW29wdGlvbnMubW9kZT0nanVtcCddIC0gTW9kZSBvZiB0aGUgc2xpZGVyOlxuICogIC0gaW4gJ2p1bXAnIG1vZGUsIHRoZSB2YWx1ZSBpcyBjaGFuZ2VkIG9uICd0b3VjaHN0YXJ0JyBvciAnbW91c2Vkb3duJywgYW5kXG4gKiAgICBvbiBtb3ZlLlxuICogIC0gaW4gJ3Byb3BvcnRpb25uYWwnIG1vZGUsIHRoZSB2YWx1ZSBpcyB1cGRhdGVkIHJlbGF0aXZlbHkgdG8gbW92ZS5cbiAqICAtIGluICdoYW5kbGUnIG1vZGUsIHRoZSBzbGlkZXIgY2FuIGJlIGdyYWJiZWQgb25seSBhcm91bmQgaXRzIHZhbHVlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuY2FsbGJhY2tdIC0gQ2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWQgd2hlbiB0aGUgdmFsdWVcbiAqICBvZiB0aGUgc2xpZGVyIGNoYW5nZXMuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMud2lkdGg9MjAwXSAtIFdpZHRoIG9mIHRoZSBzbGlkZXIuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuaGVpZ2h0PTMwXSAtIEhlaWdodCBvZiB0aGUgc2xpZGVyLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1pbj0wXSAtIE1pbmltdW0gdmFsdWUuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWF4PTFdIC0gTWF4aW11bSB2YWx1ZS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5zdGVwPTAuMDFdIC0gU3RlcCBiZXR3ZWVuIGVhY2ggY29uc2VjdXRpdmUgdmFsdWVzLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmRlZmF1bHQ9MF0gLSBEZWZhdWx0IHZhbHVlLlxuICogQHBhcmFtIHtTdHJpbmd8RWxlbWVudH0gW29wdGlvbnMuY29udGFpbmVyPSdib2R5J10gLSBDU1MgU2VsZWN0b3Igb3IgRE9NXG4gKiAgZWxlbWVudCBpbiB3aGljaCBpbnNlcnRpbmcgdGhlIHNsaWRlci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3I9JyM0NjQ2NDYnXSAtIEJhY2tncm91bmQgY29sb3Igb2YgdGhlXG4gKiAgc2xpZGVyLlxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmZvcmVncm91bmRDb2xvcj0nc3RlZWxibHVlJ10gLSBGb3JlZ3JvdW5kIGNvbG9yIG9mXG4gKiAgdGhlIHNsaWRlci5cbiAqIEBwYXJhbSB7J2hvcml6b250YWwnfCd2ZXJ0aWNhbCd9IFtvcHRpb25zLm9yaWVudGF0aW9uPSdob3Jpem9udGFsJ10gLVxuICogIE9yaWVudGF0aW9uIG9mIHRoZSBzbGlkZXIuXG4gKiBAcGFyYW0ge0FycmF5fSBbb3B0aW9ucy5tYXJrZXJzPVtdXSAtIExpc3Qgb2YgdmFsdWVzIHdoZXJlIG1hcmtlcnMgc2hvdWxkXG4gKiAgYmUgZGlzcGxheWVkIG9uIHRoZSBzbGlkZXIuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnNob3dIYW5kbGU9dHJ1ZV0gLSBJbiAnaGFuZGxlJyBtb2RlLCBkZWZpbmUgaWYgdGhlXG4gKiAgZHJhZ2dhYmxlIHNob3VsZCBiZSBzaG93IG9yIG5vdC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5oYW5kbGVTaXplPTIwXSAtIFNpemUgb2YgdGhlIGRyYWdnYWJsZSB6b25lLlxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmhhbmRsZUNvbG9yPSdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNyknXSAtIENvbG9yIG9mIHRoZVxuICogIGRyYWdnYWJsZSB6b25lICh3aGVuIGBzaG93SGFuZGxlYCBpcyBgdHJ1ZWApLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgeyBTbGlkZXJ9IGZyb20gJ2d1aS1jb21wb25lbnRzJztcbiAqXG4gKiBjb25zdCBzbGlkZXIgPSBuZXcgU2xpZGVyKHtcbiAqICAgbW9kZTogJ2p1bXAnLFxuICogICBjb250YWluZXI6ICcjY29udGFpbmVyJyxcbiAqICAgZGVmYXVsdDogMC42LFxuICogICBtYXJrZXJzOiBbMC41XSxcbiAqICAgY2FsbGJhY2s6ICh2YWx1ZSkgPT4gY29uc29sZS5sb2codmFsdWUpLFxuICogfSk7XG4gKi9cbmNsYXNzIFNsaWRlciB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICAgIG1vZGU6ICdqdW1wJyxcbiAgICAgIGNhbGxiYWNrOiB2YWx1ZSA9PiB7fSxcbiAgICAgIHdpZHRoOiAyMDAsXG4gICAgICBoZWlnaHQ6IDMwLFxuICAgICAgbWluOiAwLFxuICAgICAgbWF4OiAxLFxuICAgICAgc3RlcDogMC4wMSxcbiAgICAgIGRlZmF1bHQ6IDAsXG4gICAgICBjb250YWluZXI6ICdib2R5JyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyM0NjQ2NDYnLFxuICAgICAgZm9yZWdyb3VuZENvbG9yOiAnc3RlZWxibHVlJyxcbiAgICAgIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgICBtYXJrZXJzOiBbXSxcblxuICAgICAgLy8gaGFuZGxlIHNwZWNpZmljIG9wdGlvbnNcbiAgICAgIHNob3dIYW5kbGU6IHRydWUsXG4gICAgICBoYW5kbGVTaXplOiAyMCxcbiAgICAgIGhhbmRsZUNvbG9yOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpJyxcbiAgICB9O1xuXG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgdGhpcy5fbGlzdGVuZXJzID0gW107XG4gICAgdGhpcy5fYm91bmRpbmdDbGllbnRSZWN0ID0gbnVsbDtcbiAgICB0aGlzLl90b3VjaElkID0gbnVsbDtcbiAgICB0aGlzLl92YWx1ZSA9IG51bGw7XG4gICAgdGhpcy5fY2FudmFzV2lkdGggPSBudWxsO1xuICAgIHRoaXMuX2NhbnZhc0hlaWdodCA9IG51bGw7XG4gICAgLy8gZm9yIHByb3BvcnRpb25uYWwgbW9kZVxuICAgIHRoaXMuX2N1cnJlbnRNb3VzZVBvc2l0aW9uID0geyB4OiBudWxsLCB5OiBudWxsIH07XG4gICAgdGhpcy5fY3VycmVudFNsaWRlclBvc2l0aW9uID0gbnVsbDtcblxuICAgIHRoaXMuX29uTW91c2VEb3duID0gdGhpcy5fb25Nb3VzZURvd24uYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbk1vdXNlTW92ZSA9IHRoaXMuX29uTW91c2VNb3ZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25Nb3VzZVVwID0gdGhpcy5fb25Nb3VzZVVwLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLl9vblRvdWNoU3RhcnQgPSB0aGlzLl9vblRvdWNoU3RhcnQuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vblRvdWNoTW92ZSA9IHRoaXMuX29uVG91Y2hNb3ZlIC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uVG91Y2hFbmQgPSB0aGlzLl9vblRvdWNoRW5kLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLl9vblJlc2l6ZSA9IHRoaXMuX29uUmVzaXplLmJpbmQodGhpcyk7XG5cblxuICAgIHRoaXMuX2NyZWF0ZUVsZW1lbnQoKTtcblxuICAgIC8vIGluaXRpYWxpemVcbiAgICB0aGlzLl9yZXNpemVFbGVtZW50KCk7XG4gICAgdGhpcy5fc2V0U2NhbGVzKCk7XG4gICAgdGhpcy5fYmluZEV2ZW50cygpO1xuICAgIHRoaXMuX29uUmVzaXplKCk7XG4gICAgdGhpcy5fdXBkYXRlVmFsdWUodGhpcy5wYXJhbXMuZGVmYXVsdCk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fb25SZXNpemUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgdmFsdWUgb2YgdGhlIHNsaWRlci5cbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsKSB7XG4gICAgdGhpcy5fdXBkYXRlVmFsdWUodmFsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgc2xpZGVyIHRvIGl0cyBkZWZhdWx0IHZhbHVlLlxuICAgKi9cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5fdXBkYXRlVmFsdWUodGhpcy5wYXJhbXMuZGVmYXVsdCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzaXplIHRoZSBzbGlkZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB3aWR0aCAtIE5ldyB3aWR0aCBvZiB0aGUgc2xpZGVyLlxuICAgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0IC0gTmV3IGhlaWdodCBvZiB0aGUgc2xpZGVyLlxuICAgKi9cbiAgcmVzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLnBhcmFtcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMucGFyYW1zLmhlaWdodCA9IGhlaWdodDtcblxuICAgIHRoaXMuX3Jlc2l6ZUVsZW1lbnQoKTtcbiAgICB0aGlzLl9zZXRTY2FsZXMoKTtcbiAgICB0aGlzLl9vblJlc2l6ZSgpO1xuICAgIHRoaXMuX3VwZGF0ZVZhbHVlKHRoaXMuX3ZhbHVlLCB0cnVlKTtcbiAgfVxuXG4gIF91cGRhdGVWYWx1ZSh2YWx1ZSwgZm9yY2VSZW5kZXIgPSBmYWxzZSkge1xuICAgIGNvbnN0IHsgY2FsbGJhY2sgfSA9IHRoaXMucGFyYW1zO1xuICAgIGNvbnN0IGNsaXBwZWRWYWx1ZSA9IHRoaXMuY2xpcHBlcih2YWx1ZSk7XG5cbiAgICAvLyBpZiByZXNpemUgcmVuZGVyIGJ1dCBkb24ndCB0cmlnZ2VyIGNhbGxiYWNrXG4gICAgaWYgKGNsaXBwZWRWYWx1ZSA9PT0gdGhpcy5fdmFsdWUgJiYgZm9yY2VSZW5kZXIgPT09IHRydWUpXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5fcmVuZGVyKGNsaXBwZWRWYWx1ZSkpO1xuXG4gICAgLy8gdHJpZ2dlciBjYWxsYmFja1xuICAgIGlmIChjbGlwcGVkVmFsdWUgIT09IHRoaXMuX3ZhbHVlKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IGNsaXBwZWRWYWx1ZTtcbiAgICAgIGNhbGxiYWNrKGNsaXBwZWRWYWx1ZSk7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5fcmVuZGVyKGNsaXBwZWRWYWx1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIF9jcmVhdGVFbGVtZW50KCkge1xuICAgIGNvbnN0IHsgY29udGFpbmVyIH0gPSB0aGlzLnBhcmFtcztcbiAgICB0aGlzLiRjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICB0aGlzLmN0eCA9IHRoaXMuJGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgaWYgKGNvbnRhaW5lciBpbnN0YW5jZW9mIEVsZW1lbnQpXG4gICAgICB0aGlzLiRjb250YWluZXIgPSBjb250YWluZXI7XG4gICAgZWxzZVxuICAgICAgdGhpcy4kY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXIpO1xuXG4gICAgdGhpcy4kY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuJGNhbnZhcyk7XG4gIH1cblxuICBfcmVzaXplRWxlbWVudCgpIHtcbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHRoaXMucGFyYW1zO1xuXG4gICAgLy8gbG9naWNhbCBhbmQgcGl4ZWwgc2l6ZSBvZiB0aGUgY2FudmFzXG4gICAgdGhpcy5fcGl4ZWxSYXRpbyA9IChmdW5jdGlvbihjdHgpIHtcbiAgICBjb25zdCBkUFIgPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuICAgIGNvbnN0IGJQUiA9IGN0eC53ZWJraXRCYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XG4gICAgICBjdHgubW96QmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fFxuICAgICAgY3R4Lm1zQmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fFxuICAgICAgY3R4Lm9CYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XG4gICAgICBjdHguYmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fCAxO1xuXG4gICAgICByZXR1cm4gZFBSIC8gYlBSO1xuICAgIH0odGhpcy5jdHgpKTtcblxuICAgIHRoaXMuX2NhbnZhc1dpZHRoID0gd2lkdGggKiB0aGlzLl9waXhlbFJhdGlvO1xuICAgIHRoaXMuX2NhbnZhc0hlaWdodCA9IGhlaWdodCAqIHRoaXMuX3BpeGVsUmF0aW87XG5cbiAgICB0aGlzLmN0eC5jYW52YXMud2lkdGggPSB0aGlzLl9jYW52YXNXaWR0aDtcbiAgICB0aGlzLmN0eC5jYW52YXMuaGVpZ2h0ID0gdGhpcy5fY2FudmFzSGVpZ2h0O1xuICAgIHRoaXMuY3R4LmNhbnZhcy5zdHlsZS53aWR0aCA9IGAke3dpZHRofXB4YDtcbiAgICB0aGlzLmN0eC5jYW52YXMuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcbiAgfVxuXG4gIF9vblJlc2l6ZSgpIHtcbiAgICB0aGlzLl9ib3VuZGluZ0NsaWVudFJlY3QgPSB0aGlzLiRjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIH1cblxuICBfc2V0U2NhbGVzKCkge1xuICAgIGNvbnN0IHsgb3JpZW50YXRpb24sIHdpZHRoLCBoZWlnaHQsIG1pbiwgbWF4LCBzdGVwIH0gPSB0aGlzLnBhcmFtcztcbiAgICAvLyBkZWZpbmUgdHJhbnNmZXJ0IGZ1bmN0aW9uc1xuICAgIGNvbnN0IHNjcmVlblNpemUgPSBvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnID9cbiAgICAgIHdpZHRoIDogaGVpZ2h0O1xuXG4gICAgY29uc3QgY2FudmFzU2l6ZSA9IG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcgP1xuICAgICAgdGhpcy5fY2FudmFzV2lkdGggOiB0aGlzLl9jYW52YXNIZWlnaHQ7XG5cbiAgICBjb25zdCBkb21haW4gPSBvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnID8gW21pbiwgbWF4XSA6IFttYXgsIG1pbl07XG4gICAgY29uc3Qgc2NyZWVuUmFuZ2UgPSBbMCwgc2NyZWVuU2l6ZV07XG4gICAgY29uc3QgY2FudmFzUmFuZ2UgPSBbMCwgY2FudmFzU2l6ZV07XG5cbiAgICB0aGlzLnNjcmVlblNjYWxlID0gZ2V0U2NhbGUoZG9tYWluLCBzY3JlZW5SYW5nZSk7XG4gICAgdGhpcy5jYW52YXNTY2FsZSA9IGdldFNjYWxlKGRvbWFpbiwgY2FudmFzUmFuZ2UpO1xuICAgIHRoaXMuY2xpcHBlciA9IGdldENsaXBwZXIobWluLCBtYXgsIHN0ZXApO1xuICB9XG5cbiAgX2JpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX29uTW91c2VEb3duKTtcbiAgICB0aGlzLiRjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuX29uVG91Y2hTdGFydCk7XG4gIH1cblxuICBfb25TdGFydCh4LCB5KSB7XG4gICAgbGV0IHN0YXJ0ZWQgPSBudWxsO1xuXG4gICAgc3dpdGNoICh0aGlzLnBhcmFtcy5tb2RlKSB7XG4gICAgICBjYXNlICdqdW1wJzpcbiAgICAgICAgdGhpcy5fdXBkYXRlUG9zaXRpb24oeCwgeSk7XG4gICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3Byb3BvcnRpb25uYWwnOlxuICAgICAgICB0aGlzLl9jdXJyZW50TW91c2VQb3NpdGlvbi54ID0geDtcbiAgICAgICAgdGhpcy5fY3VycmVudE1vdXNlUG9zaXRpb24ueSA9IHk7XG4gICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2hhbmRsZSc6XG4gICAgICAgIGNvbnN0IG9yaWVudGF0aW9uID0gdGhpcy5wYXJhbXMub3JpZW50YXRpb247XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5zY3JlZW5TY2FsZSh0aGlzLl92YWx1ZSk7XG4gICAgICAgIGNvbnN0IGNvbXBhcmUgPSBvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnID8geCA6IHk7XG4gICAgICAgIGNvbnN0IGRlbHRhID0gdGhpcy5wYXJhbXMuaGFuZGxlU2l6ZSAvIDI7XG5cbiAgICAgICAgaWYgKGNvbXBhcmUgPCBwb3NpdGlvbiArIGRlbHRhICYmIGNvbXBhcmUgPiBwb3NpdGlvbiAtIGRlbHRhKSB7XG4gICAgICAgICAgdGhpcy5fY3VycmVudE1vdXNlUG9zaXRpb24ueCA9IHg7XG4gICAgICAgICAgdGhpcy5fY3VycmVudE1vdXNlUG9zaXRpb24ueSA9IHk7XG4gICAgICAgICAgc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBzdGFydGVkO1xuICB9XG5cbiAgX29uTW92ZSh4LCB5KSB7XG4gICAgc3dpdGNoICh0aGlzLnBhcmFtcy5tb2RlKSB7XG4gICAgICBjYXNlICdqdW1wJzpcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdwcm9wb3J0aW9ubmFsJzpcbiAgICAgIGNhc2UgJ2hhbmRsZSc6XG4gICAgICAgIGNvbnN0IGRlbHRhWCA9IHggLSB0aGlzLl9jdXJyZW50TW91c2VQb3NpdGlvbi54O1xuICAgICAgICBjb25zdCBkZWx0YVkgPSB5IC0gdGhpcy5fY3VycmVudE1vdXNlUG9zaXRpb24ueTtcbiAgICAgICAgdGhpcy5fY3VycmVudE1vdXNlUG9zaXRpb24ueCA9IHg7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRNb3VzZVBvc2l0aW9uLnkgPSB5O1xuXG4gICAgICAgIHggPSB0aGlzLnNjcmVlblNjYWxlKHRoaXMuX3ZhbHVlKSArIGRlbHRhWDtcbiAgICAgICAgeSA9IHRoaXMuc2NyZWVuU2NhbGUodGhpcy5fdmFsdWUpICsgZGVsdGFZO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGVQb3NpdGlvbih4LCB5KTtcbiAgfVxuXG4gIF9vbkVuZCgpIHtcbiAgICBzd2l0Y2ggKHRoaXMucGFyYW1zLm1vZGUpIHtcbiAgICAgIGNhc2UgJ2p1bXAnOlxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3Byb3BvcnRpb25uYWwnOlxuICAgICAgY2FzZSAnaGFuZGxlJzpcbiAgICAgICAgdGhpcy5fY3VycmVudE1vdXNlUG9zaXRpb24ueCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRNb3VzZVBvc2l0aW9uLnkgPSBudWxsO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvLyBtb3VzZSBldmVudHNcbiAgX29uTW91c2VEb3duKGUpIHtcbiAgICBjb25zdCBwYWdlWCA9IGUucGFnZVg7XG4gICAgY29uc3QgcGFnZVkgPSBlLnBhZ2VZO1xuICAgIGNvbnN0IHggPSBwYWdlWCAtIHRoaXMuX2JvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0O1xuICAgIGNvbnN0IHkgPSBwYWdlWSAtIHRoaXMuX2JvdW5kaW5nQ2xpZW50UmVjdC50b3A7XG5cbiAgICBpZiAodGhpcy5fb25TdGFydCh4LCB5KSA9PT0gdHJ1ZSkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX29uTW91c2VNb3ZlKTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5fb25Nb3VzZVVwKTtcbiAgICB9XG4gIH1cblxuICBfb25Nb3VzZU1vdmUoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudCB0ZXh0IHNlbGVjdGlvblxuXG4gICAgY29uc3QgcGFnZVggPSBlLnBhZ2VYO1xuICAgIGNvbnN0IHBhZ2VZID0gZS5wYWdlWTtcbiAgICBsZXQgeCA9IHBhZ2VYIC0gdGhpcy5fYm91bmRpbmdDbGllbnRSZWN0LmxlZnQ7O1xuICAgIGxldCB5ID0gcGFnZVkgLSB0aGlzLl9ib3VuZGluZ0NsaWVudFJlY3QudG9wOztcblxuICAgIHRoaXMuX29uTW92ZSh4LCB5KTtcbiAgfVxuXG4gIF9vbk1vdXNlVXAoZSkge1xuICAgIHRoaXMuX29uRW5kKCk7XG5cbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5fb25Nb3VzZU1vdmUpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5fb25Nb3VzZVVwKTtcbiAgfVxuXG4gIC8vIHRvdWNoIGV2ZW50c1xuICBfb25Ub3VjaFN0YXJ0KGUpIHtcbiAgICBpZiAodGhpcy5fdG91Y2hJZCAhPT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgY29uc3QgdG91Y2ggPSBlLnRvdWNoZXNbMF07XG4gICAgdGhpcy5fdG91Y2hJZCA9IHRvdWNoLmlkZW50aWZpZXI7XG5cbiAgICBjb25zdCBwYWdlWCA9IHRvdWNoLnBhZ2VYO1xuICAgIGNvbnN0IHBhZ2VZID0gdG91Y2gucGFnZVk7XG4gICAgY29uc3QgeCA9IHBhZ2VYIC0gdGhpcy5fYm91bmRpbmdDbGllbnRSZWN0LmxlZnQ7XG4gICAgY29uc3QgeSA9IHBhZ2VZIC0gdGhpcy5fYm91bmRpbmdDbGllbnRSZWN0LnRvcDtcblxuICAgIGlmICh0aGlzLl9vblN0YXJ0KHgsIHkpID09PSB0cnVlKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5fb25Ub3VjaE1vdmUpO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5fb25Ub3VjaEVuZCk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0aGlzLl9vblRvdWNoRW5kKTtcbiAgICB9XG4gIH1cblxuICBfb25Ub3VjaE1vdmUoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudCB0ZXh0IHNlbGVjdGlvblxuXG4gICAgY29uc3QgdG91Y2hlcyA9IEFycmF5LmZyb20oZS50b3VjaGVzKTtcbiAgICBjb25zdCB0b3VjaCA9IHRvdWNoZXMuZmlsdGVyKCh0KSA9PiB0LmlkZW50aWZpZXIgPT09IHRoaXMuX3RvdWNoSWQpWzBdO1xuXG4gICAgaWYgKHRvdWNoKSB7XG4gICAgICBjb25zdCBwYWdlWCA9IHRvdWNoLnBhZ2VYO1xuICAgICAgY29uc3QgcGFnZVkgPSB0b3VjaC5wYWdlWTtcbiAgICAgIGNvbnN0IHggPSBwYWdlWCAtIHRoaXMuX2JvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0O1xuICAgICAgY29uc3QgeSA9IHBhZ2VZIC0gdGhpcy5fYm91bmRpbmdDbGllbnRSZWN0LnRvcDtcblxuICAgICAgdGhpcy5fb25Nb3ZlKHgsIHkpO1xuICAgIH1cbiAgfVxuXG4gIF9vblRvdWNoRW5kKGUpIHtcbiAgICBjb25zdCB0b3VjaGVzID0gQXJyYXkuZnJvbShlLnRvdWNoZXMpO1xuICAgIGNvbnN0IHRvdWNoID0gdG91Y2hlcy5maWx0ZXIoKHQpID0+IHQuaWRlbnRpZmllciA9PT0gdGhpcy5fdG91Y2hJZClbMF07XG5cbiAgICBpZiAodG91Y2ggPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fb25FbmQoKTtcbiAgICAgIHRoaXMuX3RvdWNoSWQgPSBudWxsO1xuXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5fb25Ub3VjaE1vdmUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5fb25Ub3VjaEVuZCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0aGlzLl9vblRvdWNoRW5kKTtcblxuICAgIH1cbiAgfVxuXG4gIF91cGRhdGVQb3NpdGlvbih4LCB5KSB7XG4gICAgY29uc3Qge8Kgb3JpZW50YXRpb24sIGhlaWdodCB9ID0gdGhpcy5wYXJhbXM7XG4gICAgY29uc3QgcG9zaXRpb24gPSBvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnID8geCA6IHk7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnNjcmVlblNjYWxlLmludmVydChwb3NpdGlvbik7XG5cbiAgICB0aGlzLl91cGRhdGVWYWx1ZSh2YWx1ZSk7XG4gIH1cblxuICBfcmVuZGVyKGNsaXBwZWRWYWx1ZSkge1xuICAgIGNvbnN0IHsgYmFja2dyb3VuZENvbG9yLCBmb3JlZ3JvdW5kQ29sb3IsIG9yaWVudGF0aW9uIH0gPSB0aGlzLnBhcmFtcztcbiAgICBjb25zdCBjYW52YXNQb3NpdGlvbiA9IE1hdGgucm91bmQodGhpcy5jYW52YXNTY2FsZShjbGlwcGVkVmFsdWUpKTtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuX2NhbnZhc1dpZHRoO1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuX2NhbnZhc0hlaWdodDtcbiAgICBjb25zdCBjdHggPSB0aGlzLmN0eDtcblxuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIC8vIGJhY2tncm91bmRcbiAgICBjdHguZmlsbFN0eWxlID0gYmFja2dyb3VuZENvbG9yO1xuICAgIGN0eC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIC8vIGZvcmVncm91bmRcbiAgICBjdHguZmlsbFN0eWxlID0gZm9yZWdyb3VuZENvbG9yO1xuXG4gICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpXG4gICAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzUG9zaXRpb24sIGhlaWdodCk7XG4gICAgZWxzZVxuICAgICAgY3R4LmZpbGxSZWN0KDAsIGNhbnZhc1Bvc2l0aW9uLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIC8vIG1hcmtlcnNcbiAgICBjb25zdCBtYXJrZXJzID0gdGhpcy5wYXJhbXMubWFya2VycztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFya2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbWFya2VyID0gbWFya2Vyc1tpXTtcbiAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5jYW52YXNTY2FsZShtYXJrZXIpO1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC43KSc7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG5cbiAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgIGN0eC5tb3ZlVG8ocG9zaXRpb24gLSAwLjUsIDEpO1xuICAgICAgICBjdHgubGluZVRvKHBvc2l0aW9uIC0gMC41LCBoZWlnaHQgLSAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN0eC5tb3ZlVG8oMSwgaGVpZ2h0IC0gcG9zaXRpb24gKyAwLjUpO1xuICAgICAgICBjdHgubGluZVRvKHdpZHRoIC0gMSwgaGVpZ2h0IC0gcG9zaXRpb24gKyAwLjUpO1xuICAgICAgfVxuXG4gICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgLy8gaGFuZGxlIG1vZGVcbiAgICBpZiAodGhpcy5wYXJhbXMubW9kZSA9PT0gJ2hhbmRsZScgJiYgdGhpcy5wYXJhbXMuc2hvd0hhbmRsZSkge1xuICAgICAgY29uc3QgZGVsdGEgPSB0aGlzLnBhcmFtcy5oYW5kbGVTaXplICogdGhpcy5fcGl4ZWxSYXRpbyAvIDI7XG4gICAgICBjb25zdCBzdGFydCA9IGNhbnZhc1Bvc2l0aW9uIC0gZGVsdGE7XG4gICAgICBjb25zdCBlbmQgPSBjYW52YXNQb3NpdGlvbiArIGRlbHRhO1xuXG4gICAgICBjdHguZ2xvYmFsQWxwaGEgPSAxO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMucGFyYW1zLmhhbmRsZUNvbG9yO1xuXG4gICAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICBjdHguZmlsbFJlY3Qoc3RhcnQsIDAsIGVuZCAtIHN0YXJ0LCBoZWlnaHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsIHN0YXJ0LCB3aWR0aCwgZW5kIC0gc3RhcnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGN0eC5yZXN0b3JlKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2xpZGVyO1xuIiwiLyoqXG4gKiBAbW9kdWxlIGd1aS1jb21wb25lbnRzXG4gKi9cbmV4cG9ydCB7IGRlZmF1bHQgYXMgU2xpZGVyIH0gZnJvbSAnLi9TbGlkZXInO1xuIl19
