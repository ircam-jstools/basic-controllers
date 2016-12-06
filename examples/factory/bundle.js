(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** @module basic-controller */

var typeCounters = {};

/**
 * Base class to create new controllers.
 *
 * @param {String} type - String describing the type of the controller.
 * @param {Object} defaults - Default parameters of the controller.
 * @param {Object} config - User defined configuration options.
 */

var BaseComponent = function () {
  function BaseComponent(type, defaults) {
    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, BaseComponent);

    this.type = type;
    this.params = Object.assign({}, defaults, config);

    // handle id
    if (!typeCounters[type]) typeCounters[type] = 0;

    if (!this.params.id) {
      this.id = type + "-" + typeCounters[type];
      typeCounters[type] += 1;
    } else {
      this.id = this.params.id;
    }

    this._listeners = new Set();
    this._groupListeners = new Set();

    // register callback if given
    if (this.params.callback) this.addListener(this.params.callback);
  }

  /**
   * Add a listener to the controller.
   *
   * @param {Function} callback - Function to be applied when the controller
   *  state change.
   */


  _createClass(BaseComponent, [{
    key: "addListener",
    value: function addListener(callback) {
      this._listeners.add(callback);
    }

    /**
     * Called when a listener is added from a containing group.
     * @private
     */

  }, {
    key: "_addGroupListener",
    value: function _addGroupListener(id, callId, callback) {
      if (!callId) this.addListener(callback);else {
        this._groupListeners.add({ callId: callId, callback: callback });
      }
    }

    /**
     * Remove a listener from the controller.
     *
     * @param {Function} callback - Function to remove from the listeners.
     * @private
     * @todo - reexpose when `container` can override this method...
     */
    // removeListener(callback) {
    //   this._listeners.remove(callback);
    // }

    /** @private */

  }, {
    key: "executeListeners",
    value: function executeListeners() {
      for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }

      this._listeners.forEach(function (callback) {
        return callback.apply(undefined, values);
      });

      this._groupListeners.forEach(function (payload) {
        var callback = payload.callback,
            callId = payload.callId;

        callback.apply(undefined, [callId].concat(values));
      });
    }
  }]);

  return BaseComponent;
}();

exports.default = BaseComponent;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseComponent = require('./BaseComponent');

var _BaseComponent2 = _interopRequireDefault(_BaseComponent);

var _display = require('../mixins/display');

var _display2 = _interopRequireDefault(_display);

var _container2 = require('../mixins/container');

var _container3 = _interopRequireDefault(_container2);

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

var Group = function (_container) {
  _inherits(Group, _container);

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

      this._bindEvents();

      return this.$el;
    }

    /** @private */

  }, {
    key: '_bindEvents',
    value: function _bindEvents() {
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
}((0, _container3.default)((0, _display2.default)(_BaseComponent2.default)));

exports.default = Group;

},{"../mixins/container":13,"../mixins/display":14,"../utils/elements":15,"./BaseComponent":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseComponent = require('./BaseComponent');

var _BaseComponent2 = _interopRequireDefault(_BaseComponent);

var _display2 = require('../mixins/display');

var _display3 = _interopRequireDefault(_display2);

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

var NumberBox = function (_display) {
  _inherits(NumberBox, _display);

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

      this._bindEvents();

      return this.$el;
    }

    /** @private */

  }, {
    key: '_bindEvents',
    value: function _bindEvents() {
      var _this2 = this;

      this.$prev.addEventListener('click', function (e) {
        var step = _this2.params.step;
        var decimals = step.toString().split('.')[1];
        var exp = decimals ? decimals.length : 0;
        var mult = Math.pow(10, exp);

        var intValue = Math.floor(_this2._value * mult + 0.5);
        var intStep = Math.floor(step * mult + 0.5);
        var value = (intValue - intStep) / mult;

        _this2._propagate(value);
      }, false);

      this.$next.addEventListener('click', function (e) {
        var step = _this2.params.step;
        var decimals = step.toString().split('.')[1];
        var exp = decimals ? decimals.length : 0;
        var mult = Math.pow(10, exp);

        var intValue = Math.floor(_this2._value * mult + 0.5);
        var intStep = Math.floor(step * mult + 0.5);
        var value = (intValue + intStep) / mult;

        _this2._propagate(value);
      }, false);

      this.$number.addEventListener('change', function (e) {
        var value = _this2.$number.value;
        value = _this2._isIntStep ? parseInt(value, 10) : parseFloat(value);
        value = Math.min(_this2.params.max, Math.max(_this2.params.min, value));

        _this2._propagate(value);
      }, false);
    }

    /** @private */

  }, {
    key: '_propagate',
    value: function _propagate(value) {
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
}((0, _display3.default)(_BaseComponent2.default));

exports.default = NumberBox;

},{"../mixins/display":14,"../utils/elements":15,"./BaseComponent":1}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseComponent = require('./BaseComponent');

var _BaseComponent2 = _interopRequireDefault(_BaseComponent);

var _display2 = require('../mixins/display');

var _display3 = _interopRequireDefault(_display2);

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

var SelectButtons = function (_display) {
  _inherits(SelectButtons, _display);

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
      this._bindEvents();

      return this.$el;
    }

    /** @private */

  }, {
    key: '_bindEvents',
    value: function _bindEvents() {
      var _this2 = this;

      this.$prev.addEventListener('click', function () {
        var index = _this2._index - 1;
        _this2._propagate(index);
      });

      this.$next.addEventListener('click', function () {
        var index = _this2._index + 1;
        _this2._propagate(index);
      });

      this.$btns.forEach(function ($btn, index) {
        $btn.addEventListener('click', function (e) {
          e.preventDefault();
          _this2._propagate(index);
        });
      });
    }

    /** @private */

  }, {
    key: '_propagate',
    value: function _propagate(index) {
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
}((0, _display3.default)(_BaseComponent2.default));

exports.default = SelectButtons;

},{"../mixins/display":14,"../utils/elements":15,"./BaseComponent":1}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseComponent = require('./BaseComponent');

var _BaseComponent2 = _interopRequireDefault(_BaseComponent);

var _display2 = require('../mixins/display');

var _display3 = _interopRequireDefault(_display2);

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

var SelectList = function (_display) {
  _inherits(SelectList, _display);

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
      this._bindEvents();

      return this.$el;
    }

    /** @private */

  }, {
    key: '_bindEvents',
    value: function _bindEvents() {
      var _this2 = this;

      this.$prev.addEventListener('click', function () {
        var index = _this2._index - 1;
        _this2._propagate(index);
      }, false);

      this.$next.addEventListener('click', function () {
        var index = _this2._index + 1;
        _this2._propagate(index);
      }, false);

      this.$select.addEventListener('change', function () {
        var value = _this2.$select.value;
        var index = _this2.params.options.indexOf(value);
        _this2._propagate(index);
      });
    }

    /** @private */

  }, {
    key: '_propagate',
    value: function _propagate(index) {
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
}((0, _display3.default)(_BaseComponent2.default));

exports.default = SelectList;

},{"../mixins/display":14,"../utils/elements":15,"./BaseComponent":1}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseComponent = require('./BaseComponent');

var _BaseComponent2 = _interopRequireDefault(_BaseComponent);

var _display2 = require('../mixins/display');

var _display3 = _interopRequireDefault(_display2);

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

var Slider = function (_display) {
  _inherits(Slider, _display);

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

      this._bindEvents();

      return this.$el;
    }

    /** @private */

  }, {
    key: 'resize',
    value: function resize() {
      _get(Slider.prototype.__proto__ || Object.getPrototypeOf(Slider.prototype), 'resize', this).call(this);

      var _$range$getBoundingCl = this.$range.getBoundingClientRect(),
          width = _$range$getBoundingCl.width,
          height = _$range$getBoundingCl.height;

      this.slider.resize(width, height);
    }

    /** @private */

  }, {
    key: '_bindEvents',
    value: function _bindEvents() {
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
}((0, _display3.default)(_BaseComponent2.default));

exports.default = Slider;

},{"../mixins/display":14,"./BaseComponent":1,"gui-components":21}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseComponent = require('./BaseComponent');

var _BaseComponent2 = _interopRequireDefault(_BaseComponent);

var _display2 = require('../mixins/display');

var _display3 = _interopRequireDefault(_display2);

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

var Text = function (_display) {
  _inherits(Text, _display);

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
}((0, _display3.default)(_BaseComponent2.default));

exports.default = Text;

},{"../mixins/display":14,"./BaseComponent":1}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseComponent = require('./BaseComponent');

var _BaseComponent2 = _interopRequireDefault(_BaseComponent);

var _display2 = require('../mixins/display');

var _display3 = _interopRequireDefault(_display2);

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

var Title = function (_display) {
  _inherits(Title, _display);

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
}((0, _display3.default)(_BaseComponent2.default));

exports.default = Title;

},{"../mixins/display":14,"./BaseComponent":1}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseComponent = require('./BaseComponent');

var _BaseComponent2 = _interopRequireDefault(_BaseComponent);

var _display2 = require('../mixins/display');

var _display3 = _interopRequireDefault(_display2);

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

var Toggle = function (_display) {
  _inherits(Toggle, _display);

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
}((0, _display3.default)(_BaseComponent2.default));

exports.default = Toggle;

},{"../mixins/display":14,"../utils/elements":15,"./BaseComponent":1}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseComponent = require('./BaseComponent');

var _BaseComponent2 = _interopRequireDefault(_BaseComponent);

var _display2 = require('../mixins/display');

var _display3 = _interopRequireDefault(_display2);

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

var TriggerButtons = function (_display) {
  _inherits(TriggerButtons, _display);

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
      this._bindEvents();

      return this.$el;
    }

    /** @private */

  }, {
    key: '_bindEvents',
    value: function _bindEvents() {
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
}((0, _display3.default)(_BaseComponent2.default));

exports.default = TriggerButtons;

},{"../mixins/display":14,"./BaseComponent":1}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BaseComponent = require('./components/BaseComponent');

var _BaseComponent2 = _interopRequireDefault(_BaseComponent);

var _Group = require('./components/Group');

var _Group2 = _interopRequireDefault(_Group);

var _NumberBox = require('./components/NumberBox');

var _NumberBox2 = _interopRequireDefault(_NumberBox);

var _SelectButtons = require('./components/SelectButtons');

var _SelectButtons2 = _interopRequireDefault(_SelectButtons);

var _SelectList = require('./components/SelectList');

var _SelectList2 = _interopRequireDefault(_SelectList);

var _Slider = require('./components/Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _Text = require('./components/Text');

var _Text2 = _interopRequireDefault(_Text);

var _Title = require('./components/Title');

var _Title2 = _interopRequireDefault(_Title);

var _Toggle = require('./components/Toggle');

var _Toggle2 = _interopRequireDefault(_Toggle);

var _TriggerButtons = require('./components/TriggerButtons');

var _TriggerButtons2 = _interopRequireDefault(_TriggerButtons);

var _container2 = require('./mixins/container');

var _container3 = _interopRequireDefault(_container2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaults = {
  container: 'body'
};

var Root = function (_container) {
  _inherits(Root, _container);

  function Root(config) {
    _classCallCheck(this, Root);

    var _this = _possibleConstructorReturn(this, (Root.__proto__ || Object.getPrototypeOf(Root)).call(this, 'root', defaults, config));

    var $container = _this.params.container;

    if (typeof $container === 'string') $container = document.querySelector($container);

    _this.$container = $container;
    return _this;
  }

  return Root;
}((0, _container3.default)(_BaseComponent2.default));

var typeCtorMap = {
  'group': _Group2.default,
  'number-box': _NumberBox2.default,
  'select-buttons': _SelectButtons2.default,
  'select-list': _SelectList2.default,
  'slider': _Slider2.default,
  'text': _Text2.default,
  'title': _Title2.default,
  'toggle': _Toggle2.default,
  'trigger-buttons': _TriggerButtons2.default
};

function create(container, definitions) {

  function _parse(container, definitions) {
    definitions.forEach(function (def, index) {
      var type = def.type;
      var ctor = typeCtorMap[type];
      var config = Object.assign({}, def);

      //
      config.container = container;
      delete config.type;

      var component = new ctor(config);

      if (type === 'group') _parse(component, config.elements);
    });
  };

  var _root = new Root({ container: container });
  _parse(_root, definitions);

  return _root;
}

exports.default = create;

},{"./components/BaseComponent":1,"./components/Group":2,"./components/NumberBox":3,"./components/SelectButtons":4,"./components/SelectList":5,"./components/Slider":6,"./components/Text":7,"./components/Title":8,"./components/Toggle":9,"./components/TriggerButtons":10,"./mixins/container":13}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTheme = exports.create = exports.TriggerButtons = exports.Toggle = exports.Title = exports.Text = exports.Slider = exports.SelectList = exports.SelectButtons = exports.NumberBox = exports.Group = exports.BaseComponent = exports.styles = undefined;

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

var _factory = require('./factory');

Object.defineProperty(exports, 'create', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_factory).default;
  }
});

var _display = require('./mixins/display');

Object.defineProperty(exports, 'setTheme', {
  enumerable: true,
  get: function get() {
    return _display.setTheme;
  }
});
exports.disableStyles = disableStyles;

var _styles2 = require('./utils/styles');

var _styles = _interopRequireWildcard(_styles2);

var _BaseComponent2 = require('./components/BaseComponent');

var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = exports.styles = _styles;

/** @module basic-controllers */

// expose for plugins
var BaseComponent = exports.BaseComponent = _BaseComponent3.default;

// components


/**
 * Disable default styling (expect a broken ui)
 */
function disableStyles() {
  _styles.disable();
};

},{"./components/BaseComponent":1,"./components/Group":2,"./components/NumberBox":3,"./components/SelectButtons":4,"./components/SelectList":5,"./components/Slider":6,"./components/Text":7,"./components/Title":8,"./components/Toggle":9,"./components/TriggerButtons":10,"./factory":11,"./mixins/display":14,"./utils/styles":17}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var separator = '/';

function getHead(path) {
  return path.split(separator)[0];
}

function getTail(path) {
  var parts = path.split(separator);
  parts.shift();
  return parts.join(separator);
}

var container = function container(superclass) {
  return function (_superclass) {
    _inherits(_class, _superclass);

    function _class() {
      var _ref;

      _classCallCheck(this, _class);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

      _this.elements = new Set();

      // sure of that ?
      delete _this._listeners;
      delete _this._groupListeners;
      return _this;
    }

    /**
     * Return one of the group children according to its `id`, `null` otherwise.
     * @private
     */


    _createClass(_class, [{
      key: '_getHead',
      value: function _getHead(id) {}
    }, {
      key: '_getTail',
      value: function _getTail(id) {}

      /**
       * Return a chile of the group recursively according to the given `id`,
       * `null` otherwise.
       * @private
       */

    }, {
      key: 'getComponent',
      value: function getComponent(id) {
        var head = getHead(id);

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var component = _step.value;

            if (head === component.id) {
              if (head === id) return component;else if (component.type = 'group') return component.getComponent(getTail(id));else throw new Error('Undefined component ' + id);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        throw new Error('Undefined component ' + id);
      }

      /**
       * Add Listener on each components of the group.
       *
       * @param {String} id - Path to component id.
       * @param {Function} callback - Function to execute.
       */

    }, {
      key: 'addListener',
      value: function addListener(id, callback) {
        if (arguments.length === 1) {
          callback = id;
          this._addGroupListener('', '', callback);
        } else {
          this._addGroupListener(id, '', callback);
        }
      }

      /** @private */

    }, {
      key: '_addGroupListener',
      value: function _addGroupListener(id, callId, callback) {
        if (id) {
          var componentId = getHead(id);
          var component = this.getComponent(componentId);

          if (component) {
            id = getTail(id);
            component._addGroupListener(id, callId, callback);
          } else {
            throw new Error('Undefined component ' + this.rootId + '/' + componentId);
          }
        } else {
          this.elements.forEach(function (component) {
            var _callId = callId; // create a new branche
            _callId += callId === '' ? component.id : separator + component.id;
            component._addGroupListener(id, _callId, callback);
          });
        }
      }
    }]);

    return _class;
  }(superclass);
};

exports.default = container;

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.setTheme = setTheme;

var _styles = require('../utils/styles');

var styles = _interopRequireWildcard(_styles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module basic-controllers */

// default theme
var theme = 'light';
// set of the instanciated controllers
var controllers = new Set();

/**
 * Change the theme of the controllers, currently 3 themes are available:
 *  - 'light' (default)
 *  - 'grey'
 *  - 'dark'
 *
 * @param {String} theme - Name of the theme.
 */
function setTheme(value) {
  controllers.forEach(function (controller) {
    return controller.$el.classList.remove(theme);
  });
  theme = value;
  controllers.forEach(function (controller) {
    return controller.$el.classList.add(theme);
  });
}

/**
 * display mixin - components with DOM
 * @private
 */
var display = function display(superclass) {
  return function (_superclass) {
    _inherits(_class, _superclass);

    function _class() {
      var _ref;

      _classCallCheck(this, _class);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // insert styles and listen window resize when the first controller is created
      var _this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

      if (controllers.size === 0) {
        styles.insertStyleSheet();

        window.addEventListener('resize', function () {
          controllers.forEach(function (controller) {
            return controller.resize();
          });
        });
      }

      controllers.add(_this);
      return _this;
    }

    _createClass(_class, [{
      key: 'initialize',
      value: function initialize() {
        var _this2 = this;

        var $container = this.params.container;

        if ($container) {
          // css selector
          if (typeof $container === 'string') {
            $container = document.querySelector($container);
            // group
          } else if ($container.$container) {
            // this.group = $container;
            $container.elements.add(this);
            $container = $container.$container;
          }

          $container.appendChild(this.render());
          setTimeout(function () {
            return _this2.resize();
          }, 0);
        }
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
      key: 'resize',
      value: function resize() {
        var boundingRect = this.$el.getBoundingClientRect();
        var width = boundingRect.width;
        var method = width > 600 ? 'remove' : 'add';

        this.$el.classList[method]('small');
      }
    }]);

    return _class;
  }(superclass);
};

exports.default = display;

},{"../utils/styles":17}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var toggle = exports.toggle = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"toggle-element\" version=\"1.1\" viewBox=\"0 0 50 50\" preserveAspectRatio=\"none\">\n      <g class=\"x\">\n        <line x1=\"8\" y1=\"8\" x2=\"42\" y2=\"42\" stroke=\"white\" />\n        <line x1=\"8\" y1=\"42\" x2=\"42\" y2=\"8\" stroke=\"white\" />\n      </g>\n  </svg>\n";

var arrowRight = exports.arrowRight = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"arrow-right\" version=\"1.1\" viewBox=\"0 0 50 50\" preserveAspectRatio=\"none\">\n    <line x1=\"10\" y1=\"10\" x2=\"40\" y2=\"25\" />\n    <line x1=\"10\" y1=\"40\" x2=\"40\" y2=\"25\" />\n  </svg>\n";

var arrowLeft = exports.arrowLeft = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"arrow-left\" version=\"1.1\" viewBox=\"0 0 50 50\" preserveAspectRatio=\"none\">\n    <line x1=\"40\" y1=\"10\" x2=\"10\" y2=\"25\" />\n    <line x1=\"40\" y1=\"40\" x2=\"10\" y2=\"25\" />\n  </svg>\n";

var smallArrowRight = exports.smallArrowRight = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"small-arrow-right\" viewBox=\"0 0 50 50\">\n    <path d=\"M 20 15 L 35 25 L 20 35 Z\" />\n  </svg>\n";

var smallArrowBottom = exports.smallArrowBottom = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"small-arrow-bottom\" viewBox=\"0 0 50 50\">\n    <path d=\"M 15 17 L 35 17 L 25 32 Z\" />\n  </svg>\n";

},{}],16:[function(require,module,exports){
module.exports = " .basic-controllers { } .basic-controllers { width: 100%; max-width: 800px; height: 34px; padding: 3px; margin: 4px auto; background-color: #efefef; border: 1px solid #aaaaaa; box-sizing: border-box; border-radius: 2px; display: block; color: #464646; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .basic-controllers .label { font: italic normal 1.2em Quicksand, arial, sans-serif; line-height: 26px; overflow: hidden; text-align: right; padding: 0 8px 0 0; display: block; box-sizing: border-box; width: 24%; float: left; white-space: nowrap; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none; user-select: none; } .basic-controllers .inner-wrapper { display: -webkit-inline-flex; display: inline-flex; -webkit-flex-wrap: no-wrap; flex-wrap: no-wrap; width: 76%; float: left; } .basic-controllers.small { height: 48px; } .basic-controllers.small:not(.align-small) { height: auto; } .basic-controllers.small:not(.align-small) .label { width: 100%; float: none; text-align: left; line-height: 40px; } .basic-controllers.small:not(.align-small) .inner-wrapper { width: 100%; float: none; } .basic-controllers.small.align-small .label { display: block; margin-right: 20px; text-align: left; line-height: 40px; } .basic-controllers.small.align-small .inner-wrapper { display: inline-block; width: auto; } .basic-controllers .arrow-right, .basic-controllers .arrow-left { border-radius: 2px; width: 14px; height: 26px; cursor: pointer; background-color: #464646; } .basic-controllers .arrow-right line, .basic-controllers .arrow-left line { stroke-width: 3px; stroke: #ffffff; } .basic-controllers .arrow-right:hover, .basic-controllers .arrow-left:hover { background-color: #686868; } .basic-controllers .arrow-right:active, .basic-controllers .arrow-left:active { background-color: #909090; } .basic-controllers .small-arrow-right, .basic-controllers .small-arrow-bottom { width: 26px; height: 26px; cursor: pointer; } .basic-controllers .small-arrow-right path, .basic-controllers .small-arrow-bottom path { fill: #909090; } .basic-controllers .small-arrow-right:hover path, .basic-controllers .small-arrow-bottom:hover path { fill: #686868; } .basic-controllers .toggle-element { width: 26px; height: 26px; border-radius: 2px; background-color: #464646; cursor: pointer; } .basic-controllers .toggle-element:hover { background-color: #686868; } .basic-controllers .toggle-element line { stroke-width: 3px; } .basic-controllers .toggle-element .x { display: none; } .basic-controllers .toggle-element.active .x { display: block; } .basic-controllers .btn { display: block; text-align: center; font: normal normal 12px arial; text-decoration: none; height: 26px; line-height: 26px; background-color: #464646; border: none; color: #ffffff; margin: 0 4px 0 0; padding: 0; box-sizing: border-box; border-radius: 2px; cursor: pointer; -webkit-flex-grow: 1; flex-grow: 1; } .basic-controllers .btn:last-child { margin: 0; } .basic-controllers .btn:hover { background-color: #686868; } .basic-controllers .btn:active, .basic-controllers .btn.active { background-color: #909090; } .basic-controllers .btn:focus { outline: none; } .basic-controllers .number { height: 26px; display: inline-block; position: relative; font: normal normal 1.2em Quicksand, arial, sans-serif; vertical-align: top; border: none; background: none; color: #464646; padding: 0 4px; margin: 0; background-color: #f9f9f9; border-radius: 2px; box-sizing: border-box; } .basic-controllers .number:focus { outline: none; } .basic-controllers select { height: 26px; line-height: 26px; background-color: #f9f9f9; border-radius: 2px; border: none; vertical-align: top; padding: 0; margin: 0; } .basic-controllers select:focus { outline: none; } .basic-controllers input[type=text] { width: 100%; height: 26px; line-height: 26px; border: 0; padding: 0 4px; background-color: #f9f9f9; border-radius: 2px; color: #565656; } .basic-controllers.small .arrow-right, .basic-controllers.small .arrow-left { width: 24px; height: 40px; } .basic-controllers.small .toggle-element { width: 40px; height: 40px; } .basic-controllers.small .btn { height: 40px; line-height: 40px; } .basic-controllers.small .number { height: 40px; } .basic-controllers.small select { height: 40px; line-height: 40px; } .basic-controllers.small input[type=text] { height: 40px; line-height: 40px; } .basic-controllers.title { border: none !important; margin-bottom: 0; margin-top: 8px; padding-top: 8px; padding-bottom: 0; background-color: transparent !important; height: 25px; } .basic-controllers.title .label { font: normal bold 1.3em Quicksand, arial, sans-serif; height: 100%; overflow: hidden; text-align: left; padding: 0; width: 100%; box-sizing: border-box; -webkit-flex-grow: 1; flex-grow: 1; } .basic-controllers.group { height: auto; background-color: white; } .basic-controllers.group .group-header .label { font: normal bold 1.3em Quicksand, arial, sans-serif; height: 26px; line-height: 26px; overflow: hidden; text-align: left; padding: 0 0 0 36px; width: 100%; box-sizing: border-box; -webkit-flex-grow: 1; flex-grow: 1; float: none; cursor: pointer; } .basic-controllers.group .group-header .small-arrow-right { width: 26px; height: 26px; position: absolute; } .basic-controllers.group .group-header .small-arrow-bottom { width: 26px; height: 26px; position: absolute; } .basic-controllers.group .group-content { overflow: hidden; } .basic-controllers.group .group-content label:last-child { margin-bottom: 0; } .basic-controllers.group.opened .group-header .small-arrow-right { display: none; } .basic-controllers.group.opened .group-header .small-arrow-bottom { display: block; } .basic-controllers.group.opened .group-content { display: block; } .basic-controllers.group.closed .group-header .small-arrow-right { display: block; } .basic-controllers.group.closed .group-header .small-arrow-bottom { display: none; } .basic-controllers.group.closed .group-content { display: none; } .basic-controllers.slider .range { height: 26px; display: inline-block; margin: 0; -webkit-flex-grow: 4; flex-grow: 4; position: relative; } .basic-controllers.slider .range canvas { position: absolute; top: 0; left: 0; } .basic-controllers.slider .number-wrapper { display: inline; height: 26px; text-align: right; -webkit-flex-grow: 3; flex-grow: 3; } .basic-controllers.slider .number-wrapper .number { left: 5px; width: 54px; text-align: right; } .basic-controllers.slider .number-wrapper .unit { font: italic normal 1em Quicksand, arial, sans-serif; line-height: 26px; height: 26px; width: 30px; display: inline-block; position: relative; padding-left: 5px; padding-right: 5px; color: #565656; } .basic-controllers.slider .number-wrapper .unit sup { line-height: 7px; } .basic-controllers.slider.slider-large .range { -webkit-flex-grow: 50; flex-grow: 50; } .basic-controllers.slider.slider-large .number-wrapper { -webkit-flex-grow: 1; flex-grow: 1; } .basic-controllers.slider.slider-small .range { -webkit-flex-grow: 2; flex-grow: 2; } .basic-controllers.slider.slider-small .number-wrapper { -webkit-flex-grow: 4; flex-grow: 4; } .basic-controllers.number-box .number { width: 120px; margin: 0 10px; vertical-align: top; } .basic-controllers.select-list select { margin: 0 10px; width: 120px; font: normal normal 1.2em Quicksand, arial, sans-serif; color: #464646; } .basic-controllers.select-buttons .btn:first-of-type { margin-left: 4px; } .basic-controllers.text input[type=text] { font: normal normal 1.2em Quicksand, arial, sans-serif; color: #464646; } .basic-controllers.small.slider .range { height: 40px; } .basic-controllers.small.slider .number-wrapper { height: 40px; } .basic-controllers.small.slider .number-wrapper .unit { line-height: 40px; height: 40px; } .basic-controllers.grey { background-color: #363636; border: 1px solid #585858; color: rgba(255, 255, 255, 0.95); } .basic-controllers.grey .toggle-element { background-color: #efefef; } .basic-controllers.grey .toggle-element line { stroke: #363636; } .basic-controllers.grey .toggle-element:hover { background-color: #cdcdcd; } .basic-controllers.grey .arrow-right, .basic-controllers.grey .arrow-left { background-color: #efefef; } .basic-controllers.grey .arrow-right line, .basic-controllers.grey .arrow-left line { stroke: #363636; } .basic-controllers.grey .arrow-right:hover, .basic-controllers.grey .arrow-left:hover { background-color: #cdcdcd; } .basic-controllers.grey .arrow-right:active, .basic-controllers.grey .arrow-left:active { background-color: #ababab; } .basic-controllers.grey .small-arrow-right path, .basic-controllers.grey .small-arrow-bottom path { fill: #ababab; } .basic-controllers.grey .small-arrow-right:hover path, .basic-controllers.grey .small-arrow-bottom:hover path { fill: #cdcdcd; } .basic-controllers.grey .number, .basic-controllers.grey select, .basic-controllers.grey input[type=text] { color: rgba(255, 255, 255, 0.95); background-color: #454545; } .basic-controllers.grey .btn { background-color: #efefef; color: #363636; } .basic-controllers.grey .btn:hover { background-color: #cdcdcd; } .basic-controllers.grey .btn:active, .basic-controllers.grey .btn.active { background-color: #ababab; } .basic-controllers.grey.slider .inner-wrapper .number-wrapper .unit { color: #bcbcbc; } .basic-controllers.grey.group { background-color: #505050; } .basic-controllers.dark { background-color: #242424; border: 1px solid #282828; color: #ffffff; } .basic-controllers.dark .toggle-element { background-color: #464646; } .basic-controllers.dark .toggle-element line { stroke: #ffffff; } .basic-controllers.dark .toggle-element:hover { background-color: #686868; } .basic-controllers.dark .arrow-right, .basic-controllers.dark .arrow-left { background-color: #464646; } .basic-controllers.dark .arrow-right line, .basic-controllers.dark .arrow-left line { stroke: #ffffff; } .basic-controllers.dark .arrow-right:hover, .basic-controllers.dark .arrow-left:hover { background-color: #686868; } .basic-controllers.dark .arrow-right:active, .basic-controllers.dark .arrow-left:active { background-color: #909090; } .basic-controllers.dark .small-arrow-right path, .basic-controllers.dark .small-arrow-bottom path { fill: #909090; } .basic-controllers.dark .small-arrow-right:hover path, .basic-controllers.dark .small-arrow-bottom:hover path { fill: #686868; } .basic-controllers.dark .number, .basic-controllers.dark select, .basic-controllers.dark input[type=text] { color: #ffffff; background-color: #333333; } .basic-controllers.dark .btn { background-color: #464646; color: #ffffff; } .basic-controllers.dark .btn:hover { background-color: #686868; } .basic-controllers.dark .btn:active, .basic-controllers.dark .btn.active { background-color: #909090; } .basic-controllers.dark.slider .inner-wrapper .number-wrapper .unit { color: #cdcdcd; } .basic-controllers.dark.group { background-color: #3e3e3e; } ";
},{}],17:[function(require,module,exports){
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

},{"../../package.json":19,"./styles-declarations.js":16}],18:[function(require,module,exports){
'use strict';

var _index = require('../../../dist/index');

var controllers = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var definitions = [{
  id: 'title-0',
  type: 'title',
  label: 'Title'
}, {
  id: 'slider-0',
  type: 'slider',
  label: 'My Slider',
  size: 'large',
  min: 0,
  max: 1000,
  step: 1,
  default: 253
}, {
  id: 'group-0',
  type: 'group',
  label: 'Group',
  default: 'opened',
  elements: [{
    id: 'number-1',
    type: 'number-box',
    default: 0.4,
    min: -1,
    max: 1,
    step: 0.01
  }, {
    id: 'text-1',
    type: 'text',
    label: 'My Text',
    readonly: false,
    default: 'default text'
  }, {
    id: 'group-1',
    type: 'group',
    label: 'Group',
    default: 'opened',
    elements: [{
      id: 'number-2',
      type: 'number-box',
      default: 0.4,
      min: -1,
      max: 1,
      step: 0.01
    }]
  }]
}, {
  id: 'select-0',
  type: 'select-list',
  options: ['1', '2', '3'],
  default: '2'
}];

var controls = controllers.create('#container', definitions);

// get components
var group0 = controls.getComponent('group-0');
var number1 = controls.getComponent('group-0/number-1');
var number2 = controls.getComponent('group-0/group-1/number-2');

// console.log(group0);
// console.log(number1);
// console.log(number2);

// add listeners
// controls.addListener('slider-0', (value) => console.log(value));
// controls.addListener('group-0/number-1', (value) => console.log(value));

// controls.addListener('group-0', (id, value) => console.log(id, value));
// controls.addListener('group-0/group-1', (id, value) => console.log(id, value));

// controls.addListener((id, value) => console.log(id, value));

// group0.addListener('number-1', (value) => console.log(value));
// group0.addListener('group-1', (id, value) => console.log(id, value));
group0.addListener(function (id, value) {
  return console.log(id, value);
});

},{"../../../dist/index":12}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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
    this._updateValue(this.params.default, false, true);

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
      this._updateValue(this._value, true, true);
    }
  }, {
    key: '_updateValue',
    value: function _updateValue(value) {
      var _this = this;

      var forceRender = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var silent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var callback = this.params.callback;

      var clippedValue = this.clipper(value);

      // if resize render but don't trigger callback
      if (clippedValue === this._value && forceRender === true) requestAnimationFrame(function () {
        return _this._render(clippedValue);
      });

      // trigger callback
      if (clippedValue !== this._value) {
        this._value = clippedValue;

        if (!silent) callback(clippedValue);

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

},{}],21:[function(require,module,exports){
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

},{"./Slider":20}]},{},[18])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLi9kaXN0L2NvbXBvbmVudHMvQmFzZUNvbXBvbmVudC5qcyIsIi4uLy4uL2Rpc3QvY29tcG9uZW50cy9Hcm91cC5qcyIsIi4uLy4uL2Rpc3QvY29tcG9uZW50cy9OdW1iZXJCb3guanMiLCIuLi8uLi9kaXN0L2NvbXBvbmVudHMvU2xpZGVyLmpzIiwiLi4vLi4vZGlzdC9jb21wb25lbnRzL1RvZ2dsZS5qcyIsIi4uLy4uL2Rpc3QvY29tcG9uZW50cy9UcmlnZ2VyQnV0dG9ucy5qcyIsIi4uLy4uL2Rpc3QvZmFjdG9yeS5qcyIsIi4uLy4uL2Rpc3QvaW5kZXguanMiLCIuLi8uLi9kaXN0L21peGlucy9jb250YWluZXIuanMiLCIuLi8uLi9kaXN0L21peGlucy9kaXNwbGF5LmpzIiwiLi4vLi4vZGlzdC91dGlscy9lbGVtZW50cy5qcyIsIi4uLy4uL2Rpc3QvdXRpbHMvc3R5bGVzLWRlY2xhcmF0aW9ucy5qcyIsIi4uLy4uL2Rpc3QvdXRpbHMvc3R5bGVzLmpzIiwiZGlzdC9pbmRleC5qcyIsIi4uLy4uL3BhY2thZ2UuanNvbiIsIi4uLy4uLy4uL2d1aS1jb21wb25lbnRzL2Rpc3QvU2xpZGVyLmpzIiwiLi4vLi4vLi4vZ3VpLWNvbXBvbmVudHMvZGlzdC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUNBQTs7QUFFQSxJQUFNLGVBQWUsRUFBckI7O0FBRUE7Ozs7Ozs7O0lBT00sYTtBQUNKLHlCQUFZLElBQVosRUFBa0IsUUFBbEIsRUFBeUM7QUFBQSxRQUFiLE1BQWEsdUVBQUosRUFBSTs7QUFBQTs7QUFDdkMsU0FBSyxJQUFMLEdBQVksSUFBWjtBQUNBLFNBQUssTUFBTCxHQUFjLE9BQU8sTUFBUCxDQUFjLEVBQWQsRUFBa0IsUUFBbEIsRUFBNEIsTUFBNUIsQ0FBZDs7QUFFQTtBQUNBLFFB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ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKiBAbW9kdWxlIGJhc2ljLWNvbnRyb2xsZXIgKi9cblxuY29uc3QgdHlwZUNvdW50ZXJzID0ge307XG5cbi8qKlxuICogQmFzZSBjbGFzcyB0byBjcmVhdGUgbmV3IGNvbnRyb2xsZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gU3RyaW5nIGRlc2NyaWJpbmcgdGhlIHR5cGUgb2YgdGhlIGNvbnRyb2xsZXIuXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdHMgLSBEZWZhdWx0IHBhcmFtZXRlcnMgb2YgdGhlIGNvbnRyb2xsZXIuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gVXNlciBkZWZpbmVkIGNvbmZpZ3VyYXRpb24gb3B0aW9ucy5cbiAqL1xuY2xhc3MgQmFzZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHR5cGUsIGRlZmF1bHRzLCBjb25maWcgPSB7fSkge1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgY29uZmlnKTtcblxuICAgIC8vIGhhbmRsZSBpZFxuICAgIGlmICghdHlwZUNvdW50ZXJzW3R5cGVdKVxuICAgICAgdHlwZUNvdW50ZXJzW3R5cGVdID0gMDtcblxuICAgIGlmICghdGhpcy5wYXJhbXMuaWQpIHtcbiAgICAgIHRoaXMuaWQgPSBgJHt0eXBlfS0ke3R5cGVDb3VudGVyc1t0eXBlXX1gO1xuICAgICAgdHlwZUNvdW50ZXJzW3R5cGVdICs9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaWQgPSB0aGlzLnBhcmFtcy5pZDtcbiAgICB9XG5cbiAgICB0aGlzLl9saXN0ZW5lcnMgPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5fZ3JvdXBMaXN0ZW5lcnMgPSBuZXcgU2V0KCk7XG5cbiAgICAvLyByZWdpc3RlciBjYWxsYmFjayBpZiBnaXZlblxuICAgIGlmICh0aGlzLnBhcmFtcy5jYWxsYmFjaylcbiAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy5wYXJhbXMuY2FsbGJhY2spO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIGxpc3RlbmVyIHRvIHRoZSBjb250cm9sbGVyLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIEZ1bmN0aW9uIHRvIGJlIGFwcGxpZWQgd2hlbiB0aGUgY29udHJvbGxlclxuICAgKiAgc3RhdGUgY2hhbmdlLlxuICAgKi9cbiAgYWRkTGlzdGVuZXIoY2FsbGJhY2spIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMuYWRkKGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhIGxpc3RlbmVyIGlzIGFkZGVkIGZyb20gYSBjb250YWluaW5nIGdyb3VwLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2FkZEdyb3VwTGlzdGVuZXIoaWQsIGNhbGxJZCwgY2FsbGJhY2spIHtcbiAgICBpZiAoIWNhbGxJZClcbiAgICAgIHRoaXMuYWRkTGlzdGVuZXIoY2FsbGJhY2spO1xuICAgIGVsc2Uge1xuICAgICAgdGhpcy5fZ3JvdXBMaXN0ZW5lcnMuYWRkKHsgY2FsbElkLCBjYWxsYmFjayB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEgbGlzdGVuZXIgZnJvbSB0aGUgY29udHJvbGxlci5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBGdW5jdGlvbiB0byByZW1vdmUgZnJvbSB0aGUgbGlzdGVuZXJzLlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAdG9kbyAtIHJlZXhwb3NlIHdoZW4gYGNvbnRhaW5lcmAgY2FuIG92ZXJyaWRlIHRoaXMgbWV0aG9kLi4uXG4gICAqL1xuICAvLyByZW1vdmVMaXN0ZW5lcihjYWxsYmFjaykge1xuICAvLyAgIHRoaXMuX2xpc3RlbmVycy5yZW1vdmUoY2FsbGJhY2spO1xuICAvLyB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGV4ZWN1dGVMaXN0ZW5lcnMoLi4udmFsdWVzKSB7XG4gICAgdGhpcy5fbGlzdGVuZXJzLmZvckVhY2goKGNhbGxiYWNrKSA9PiBjYWxsYmFjayguLi52YWx1ZXMpKTtcblxuICAgIHRoaXMuX2dyb3VwTGlzdGVuZXJzLmZvckVhY2goKHBheWxvYWQpID0+IHtcbiAgICAgIGNvbnN0IHsgY2FsbGJhY2ssIGNhbGxJZCB9ID0gcGF5bG9hZDtcbiAgICAgIGNhbGxiYWNrKGNhbGxJZCwgLi4udmFsdWVzKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlQ29tcG9uZW50O1xuIiwiaW1wb3J0IEJhc2VDb21wb25lbnQgZnJvbSAnLi9CYXNlQ29tcG9uZW50JztcbmltcG9ydCBkaXNwbGF5IGZyb20gJy4uL21peGlucy9kaXNwbGF5JztcbmltcG9ydCBjb250YWluZXIgZnJvbSAnLi4vbWl4aW5zL2NvbnRhaW5lcic7XG5pbXBvcnQgKiBhcyBlbGVtZW50cyBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5cbi8qKiBAbW9kdWxlIGJhc2ljLWNvbnRyb2xsZXJzICovXG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICBsZWdlbmQ6ICcmbmJzcDsnLFxuICBkZWZhdWx0OiAnb3BlbmVkJyxcbiAgY29udGFpbmVyOiBudWxsLFxufTtcblxuLyoqXG4gKiBHcm91cCBvZiBjb250cm9sbGVycy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZy5sYWJlbCAtIExhYmVsIG9mIHRoZSBncm91cC5cbiAqIEBwYXJhbSB7J29wZW5lZCd8J2Nsb3NlZCd9IFtjb25maWcuZGVmYXVsdD0nb3BlbmVkJ10gLSBEZWZhdWx0IHN0YXRlIG9mIHRoZVxuICogIGdyb3VwLlxuICogQHBhcmFtIHtTdHJpbmd8RWxlbWVudHxiYXNpYy1jb250cm9sbGVyfkdyb3VwfSBbY29uZmlnLmNvbnRhaW5lcj1udWxsXSAtXG4gKiAgQ29udGFpbmVyIG9mIHRoZSBjb250cm9sbGVyLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBjb250cm9sbGVycyBmcm9tICdiYXNpYy1jb250cm9sbGVycyc7XG4gKlxuICogLy8gY3JlYXRlIGEgZ3JvdXBcbiAqIGNvbnN0IGdyb3VwID0gbmV3IGNvbnRyb2xsZXJzLkdyb3VwKHtcbiAqICAgbGFiZWw6ICdHcm91cCcsXG4gKiAgIGRlZmF1bHQ6ICdvcGVuZWQnLFxuICogICBjb250YWluZXI6ICcjY29udGFpbmVyJ1xuICogfSk7XG4gKlxuICogLy8gaW5zZXJ0IGNvbnRyb2xsZXJzIGluIHRoZSBncm91cFxuICogY29uc3QgZ3JvdXBTbGlkZXIgPSBuZXcgY29udHJvbGxlcnMuU2xpZGVyKHtcbiAqICAgbGFiZWw6ICdHcm91cCBTbGlkZXInLFxuICogICBtaW46IDIwLFxuICogICBtYXg6IDEwMDAsXG4gKiAgIHN0ZXA6IDEsXG4gKiAgIGRlZmF1bHQ6IDIwMCxcbiAqICAgdW5pdDogJ0h6JyxcbiAqICAgc2l6ZTogJ2xhcmdlJyxcbiAqICAgY29udGFpbmVyOiBncm91cCxcbiAqICAgY2FsbGJhY2s6ICh2YWx1ZSkgPT4gY29uc29sZS5sb2codmFsdWUpLFxuICogfSk7XG4gKlxuICogY29uc3QgZ3JvdXBUZXh0ID0gbmV3IGNvbnRyb2xsZXJzLlRleHQoe1xuICogICBsYWJlbDogJ0dyb3VwIFRleHQnLFxuICogICBkZWZhdWx0OiAndGV4dCBpbnB1dCcsXG4gKiAgIHJlYWRvbmx5OiBmYWxzZSxcbiAqICAgY29udGFpbmVyOiBncm91cCxcbiAqICAgY2FsbGJhY2s6ICh2YWx1ZSkgPT4gY29uc29sZS5sb2codmFsdWUpLFxuICogfSk7XG4gKi9cbmNsYXNzIEdyb3VwIGV4dGVuZHMgY29udGFpbmVyKGRpc3BsYXkoQmFzZUNvbXBvbmVudCkpIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoJ2dyb3VwJywgZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICB0aGlzLl9zdGF0ZXMgPSBbJ29wZW5lZCcsICdjbG9zZWQnXTtcblxuICAgIGlmICh0aGlzLl9zdGF0ZXMuaW5kZXhPZih0aGlzLnBhcmFtcy5kZWZhdWx0KSA9PT0gLTEpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgc3RhdGUgXCIke3ZhbHVlfVwiYCk7XG5cbiAgICB0aGlzLl9zdGF0ZSA9IHRoaXMucGFyYW1zLmRlZmF1bHQ7XG5cbiAgICBzdXBlci5pbml0aWFsaXplKCk7XG4gIH1cblxuICAvKipcbiAgICogU3RhdGUgb2YgdGhlIGdyb3VwIChgJ29wZW5lZCdgIG9yIGAnY2xvc2VkJ2ApLlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHN0YXRlKSB7XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsaWFzIGZvciBgdmFsdWVgLlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgZ2V0IHN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcbiAgfVxuXG4gIHNldCBzdGF0ZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLl9zdGF0ZXMuaW5kZXhPZih2YWx1ZSkgPT09IC0xKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHN0YXRlIFwiJHt2YWx1ZX1cImApO1xuXG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9zdGF0ZSk7XG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZCh2YWx1ZSk7XG5cbiAgICB0aGlzLl9zdGF0ZSA9IHZhbHVlO1xuICB9XG5cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVuZGVyKCkge1xuICAgIGxldCBjb250ZW50ID0gYFxuICAgICAgPGRpdiBjbGFzcz1cImdyb3VwLWhlYWRlclwiPlxuICAgICAgICAke2VsZW1lbnRzLnNtYWxsQXJyb3dSaWdodH1cbiAgICAgICAgJHtlbGVtZW50cy5zbWFsbEFycm93Qm90dG9tfVxuICAgICAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+JHt0aGlzLnBhcmFtcy5sYWJlbH08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJncm91cC1jb250ZW50XCI+PC9kaXY+XG4gICAgYDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKCk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKHRoaXMuX3N0YXRlKTtcblxuICAgIHRoaXMuJGhlYWRlciA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5ncm91cC1oZWFkZXInKTtcbiAgICB0aGlzLiRjb250YWluZXIgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuZ3JvdXAtY29udGVudCcpO1xuXG4gICAgdGhpcy5fYmluZEV2ZW50cygpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIF9iaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJGhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5fc3RhdGUgPT09ICdjbG9zZWQnID8gJ29wZW5lZCcgOiAnY2xvc2VkJztcbiAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHcm91cDtcbiIsImltcG9ydCBCYXNlQ29tcG9uZW50IGZyb20gJy4vQmFzZUNvbXBvbmVudCc7XG5pbXBvcnQgZGlzcGxheSBmcm9tICcuLi9taXhpbnMvZGlzcGxheSc7XG5pbXBvcnQgKiBhcyBlbGVtZW50cyBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5cbi8qKiBAbW9kdWxlIGJhc2ljLWNvbnRyb2xsZXJzICovXG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICBsYWJlbDogJyZuYnNwOycsXG4gIG9wdGlvbnM6IG51bGwsXG4gIGRlZmF1bHQ6IG51bGwsXG4gIGNvbnRhaW5lcjogbnVsbCxcbiAgY2FsbGJhY2s6IG51bGwsXG59XG5cbi8qKlxuICogRHJvcC1kb3duIGxpc3QgY29udHJvbGxlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZy5sYWJlbCAtIExhYmVsIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtBcnJheX0gW2NvbmZpZy5vcHRpb25zPW51bGxdIC0gVmFsdWVzIG9mIHRoZSBkcm9wIGRvd24gbGlzdC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLmRlZmF1bHQ9bnVsbF0gLSBEZWZhdWx0IHZhbHVlLlxuICogQHBhcmFtIHtTdHJpbmd8RWxlbWVudHxiYXNpYy1jb250cm9sbGVyfkdyb3VwfSBbY29uZmlnLmNvbnRhaW5lcj1udWxsXSAtXG4gKiAgQ29udGFpbmVyIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbmZpZy5jYWxsYmFjaz1udWxsXSAtIENhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIHdoZW4gdGhlXG4gKiAgdmFsdWUgY2hhbmdlcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgY29udHJvbGxlcnMgZnJvbSAnYmFzaWMtY29udHJvbGxlcnMnO1xuICpcbiAqIGNvbnN0IHNlbGVjdExpc3QgPSBuZXcgY29udHJvbGxlcnMuU2VsZWN0TGlzdCh7XG4gKiAgIGxhYmVsOiAnU2VsZWN0TGlzdCcsXG4gKiAgIG9wdGlvbnM6IFsnc3RhbmRieScsICdydW4nLCAnZW5kJ10sXG4gKiAgIGRlZmF1bHQ6ICdydW4nLFxuICogICBjb250YWluZXI6ICcjY29udGFpbmVyJyxcbiAqICAgY2FsbGJhY2s6ICh2YWx1ZSwgaW5kZXgpID0+IGNvbnNvbGUubG9nKHZhbHVlLCBpbmRleCksXG4gKiB9KTtcbiAqL1xuY2xhc3MgU2VsZWN0TGlzdCBleHRlbmRzIGRpc3BsYXkoQmFzZUNvbXBvbmVudCkge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcignc2VsZWN0LWxpc3QnLCBkZWZhdWx0cywgY29uZmlnKTtcblxuICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLnBhcmFtcy5vcHRpb25zKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcignVHJpZ2dlckJ1dHRvbjogSW52YWxpZCBvcHRpb24gXCJvcHRpb25zXCInKTtcblxuICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5wYXJhbXMuZGVmYXVsdDtcblxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLnBhcmFtcy5vcHRpb25zO1xuICAgIGNvbnN0IGluZGV4ID0gb3B0aW9ucy5pbmRleE9mKHRoaXMuX3ZhbHVlKTtcbiAgICB0aGlzLl9pbmRleCA9IGluZGV4ID09PSAtMSA/wqAwIDogaW5kZXg7XG4gICAgdGhpcy5fbWF4SW5kZXggPSBvcHRpb25zLmxlbmd0aCAtIDE7XG5cbiAgICBzdXBlci5pbml0aWFsaXplKCk7XG4gIH1cblxuICAvKipcbiAgICogQ3VycmVudCB2YWx1ZS5cbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLiRzZWxlY3QudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX2luZGV4ID0gdGhpcy5wYXJhbXMub3B0aW9ucy5pbmRleE9mKHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDdXJyZW50IG9wdGlvbiBpbmRleC5cbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIGdldCBpbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5faW5kZXg7XG4gIH1cblxuICBzZXQgaW5kZXgoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gdGhpcy5fbWF4SW5kZXgpIHJldHVybjtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5wYXJhbXMub3B0aW9uc1tpbmRleF07XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgbGFiZWwsIG9wdGlvbnPCoH0gPSB0aGlzLnBhcmFtcztcbiAgICBjb25zdCBjb250ZW50ID0gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJsYWJlbFwiPiR7bGFiZWx9PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImlubmVyLXdyYXBwZXJcIj5cbiAgICAgICAgJHtlbGVtZW50cy5hcnJvd0xlZnR9XG4gICAgICAgIDxzZWxlY3Q+XG4gICAgICAgICR7b3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICByZXR1cm4gYDxvcHRpb24gdmFsdWU9XCIke29wdGlvbn1cIj4ke29wdGlvbn08L29wdGlvbj5gO1xuICAgICAgICB9KS5qb2luKCcnKX1cbiAgICAgICAgPHNlbGVjdD5cbiAgICAgICAgJHtlbGVtZW50cy5hcnJvd1JpZ2h0fVxuICAgICAgPC9kaXY+XG4gICAgYDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKHRoaXMudHlwZSk7XG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZCgnYWxpZ24tc21hbGwnKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gICAgdGhpcy4kcHJldiA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy1sZWZ0Jyk7XG4gICAgdGhpcy4kbmV4dCA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy1yaWdodCcpO1xuICAgIHRoaXMuJHNlbGVjdCA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdCcpO1xuICAgIC8vIHNldCB0byBkZWZhdWx0IHZhbHVlXG4gICAgdGhpcy4kc2VsZWN0LnZhbHVlID0gb3B0aW9uc1t0aGlzLl9pbmRleF07XG4gICAgdGhpcy5fYmluZEV2ZW50cygpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIF9iaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJHByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2luZGV4IC0gMTtcbiAgICAgIHRoaXMuX3Byb3BhZ2F0ZShpbmRleCk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgdGhpcy4kbmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5faW5kZXggKyAxO1xuICAgICAgdGhpcy5fcHJvcGFnYXRlKGluZGV4KTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICB0aGlzLiRzZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLiRzZWxlY3QudmFsdWU7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMucGFyYW1zLm9wdGlvbnMuaW5kZXhPZih2YWx1ZSk7XG4gICAgICB0aGlzLl9wcm9wYWdhdGUoaW5kZXgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIF9wcm9wYWdhdGUoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPCAwIHx8wqBpbmRleCA+IHRoaXMuX21heEluZGV4KSByZXR1cm47XG5cbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMucGFyYW1zLm9wdGlvbnNbaW5kZXhdO1xuICAgIHRoaXMuX2luZGV4ID0gaW5kZXg7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLiRzZWxlY3QudmFsdWUgPSB2YWx1ZTtcblxuICAgIHRoaXMuZXhlY3V0ZUxpc3RlbmVycyh0aGlzLl92YWx1ZSwgdGhpcy5faW5kZXgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdExpc3Q7XG4iLCJpbXBvcnQgQmFzZUNvbXBvbmVudCBmcm9tICcuL0Jhc2VDb21wb25lbnQnO1xuaW1wb3J0IGRpc3BsYXkgZnJvbSAnLi4vbWl4aW5zL2Rpc3BsYXknO1xuaW1wb3J0ICogYXMgZ3VpQ29tcG9uZW50cyBmcm9tICdndWktY29tcG9uZW50cyc7XG5cbi8qKiBAbW9kdWxlIGJhc2ljLWNvbnRyb2xsZXJzICovXG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICBsYWJlbDogJyZuYnNwOycsXG4gIG1pbjogMCxcbiAgbWF4OiAxLFxuICBzdGVwOiAwLjAxLFxuICBkZWZhdWx0OiAwLFxuICB1bml0OiAnJyxcbiAgc2l6ZTogJ21lZGl1bScsXG4gIGNvbnRhaW5lcjogbnVsbCxcbiAgY2FsbGJhY2s6IG51bGwsXG59XG5cbi8qKlxuICogU2xpZGVyIGNvbnRyb2xsZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBjb25maWcubGFiZWwgLSBMYWJlbCBvZiB0aGUgY29udHJvbGxlci5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLm1pbj0wXSAtIE1pbmltdW0gdmFsdWUuXG4gKiBAcGFyYW0ge051bWJlcn0gW2NvbmZpZy5tYXg9MV0gLSBNYXhpbXVtIHZhbHVlLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtjb25maWcuc3RlcD0wLjAxXSAtIFN0ZXAgYmV0d2VlbiBjb25zZWN1dGl2ZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge051bWJlcn0gW2NvbmZpZy5kZWZhdWx0PTBdIC0gRGVmYXVsdCB2YWx1ZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBbY29uZmlnLnVuaXQ9JyddIC0gVW5pdCBvZiB0aGUgdmFsdWUuXG4gKiBAcGFyYW0geydzbWFsbCd8J21lZGl1bSd8J2xhcmdlJ30gW2NvbmZpZy5zaXplPSdtZWRpdW0nXSAtIFNpemUgb2YgdGhlXG4gKiAgc2xpZGVyLlxuICogQHBhcmFtIHtTdHJpbmd8RWxlbWVudHxiYXNpYy1jb250cm9sbGVyfkdyb3VwfSBbY29uZmlnLmNvbnRhaW5lcj1udWxsXSAtXG4gKiAgQ29udGFpbmVyIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbmZpZy5jYWxsYmFjaz1udWxsXSAtIENhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIHdoZW4gdGhlXG4gKiAgdmFsdWUgY2hhbmdlcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgY29udHJvbGxlcnMgZnJvbSAnYmFzaWMtY29udHJvbGxlcnMnO1xuICpcbiAqIGNvbnN0IHNsaWRlciA9IG5ldyBjb250cm9sbGVycy5TbGlkZXIoe1xuICogICBsYWJlbDogJ015IFNsaWRlcicsXG4gKiAgIG1pbjogMjAsXG4gKiAgIG1heDogMTAwMCxcbiAqICAgc3RlcDogMSxcbiAqICAgZGVmYXVsdDogNTM3LFxuICogICB1bml0OiAnSHonLFxuICogICBzaXplOiAnbGFyZ2UnLFxuICogICBjb250YWluZXI6ICcjY29udGFpbmVyJyxcbiAqICAgY2FsbGJhY2s6ICh2YWx1ZSkgPT4gY29uc29sZS5sb2codmFsdWUpLFxuICogfSk7XG4gKi9cbmNsYXNzIFNsaWRlciBleHRlbmRzIGRpc3BsYXkoQmFzZUNvbXBvbmVudCkge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcignc2xpZGVyJywgZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICB0aGlzLl92YWx1ZSA9IHRoaXMucGFyYW1zLmRlZmF1bHQ7XG4gICAgdGhpcy5fb25TbGlkZXJDaGFuZ2UgPSB0aGlzLl9vblNsaWRlckNoYW5nZS5iaW5kKHRoaXMpO1xuXG4gICAgc3VwZXIuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgdmFsdWUuXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuXG4gICAgaWYgKHRoaXMuJG51bWJlciAmJiB0aGlzLiRyYW5nZSkge1xuICAgICAgdGhpcy4kbnVtYmVyLnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgIHRoaXMuc2xpZGVyLnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICB9XG4gIH1cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGxhYmVsLCBtaW4sIG1heCwgc3RlcCwgdW5pdCwgc2l6ZSB9ID0gdGhpcy5wYXJhbXM7XG4gICAgY29uc3QgY29udGVudCA9IGBcbiAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWxcIj4ke2xhYmVsfTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbm5lci13cmFwcGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyYW5nZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibnVtYmVyLXdyYXBwZXJcIj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwibnVtYmVyXCIgbWluPVwiJHttaW59XCIgbWF4PVwiJHttYXh9XCIgc3RlcD1cIiR7c3RlcH1cIiB2YWx1ZT1cIiR7dGhpcy5fdmFsdWV9XCIgLz5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInVuaXRcIj4ke3VuaXR9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PmA7XG5cbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcih0aGlzLnR5cGUpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZChgc2xpZGVyLSR7c2l6ZX1gKTtcblxuICAgIHRoaXMuJHJhbmdlID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLnJhbmdlJyk7XG4gICAgdGhpcy4kbnVtYmVyID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcihgaW5wdXRbdHlwZT1cIm51bWJlclwiXWApO1xuXG4gICAgdGhpcy5zbGlkZXIgPSBuZXcgZ3VpQ29tcG9uZW50cy5TbGlkZXIoe1xuICAgICAgY29udGFpbmVyOiB0aGlzLiRyYW5nZSxcbiAgICAgIGNhbGxiYWNrOiB0aGlzLl9vblNsaWRlckNoYW5nZSxcbiAgICAgIG1pbjogbWluLFxuICAgICAgbWF4OiBtYXgsXG4gICAgICBzdGVwOiBzdGVwLFxuICAgICAgZGVmYXVsdDogdGhpcy5fdmFsdWUsXG4gICAgICBmb3JlZ3JvdW5kQ29sb3I6ICcjYWJhYmFiJyxcbiAgICB9KTtcblxuICAgIHRoaXMuX2JpbmRFdmVudHMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZXNpemUoKSB7XG4gICAgc3VwZXIucmVzaXplKCk7XG5cbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHTCoH0gPSB0aGlzLiRyYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0aGlzLnNsaWRlci5yZXNpemUod2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgX2JpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kbnVtYmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcGFyc2VGbG9hdCh0aGlzLiRudW1iZXIudmFsdWUpO1xuICAgICAgLy8gdGhlIHNsaWRlciBwcm9wYWdhdGVzIHRoZSB2YWx1ZVxuICAgICAgdGhpcy5zbGlkZXIudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgfSwgZmFsc2UpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIF9vblNsaWRlckNoYW5nZSh2YWx1ZSkge1xuICAgIHRoaXMuJG51bWJlci52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG5cbiAgICB0aGlzLmV4ZWN1dGVMaXN0ZW5lcnModGhpcy5fdmFsdWUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNsaWRlcjtcbiIsImltcG9ydCBCYXNlQ29tcG9uZW50IGZyb20gJy4vQmFzZUNvbXBvbmVudCc7XG5pbXBvcnQgZGlzcGxheSBmcm9tICcuLi9taXhpbnMvZGlzcGxheSc7XG5pbXBvcnQgKiBhcyBlbGVtZW50cyBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5cbi8qKiBAbW9kdWxlIGJhc2ljLWNvbnRyb2xsZXJzICovXG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICBsYWJlbDogJyZibnNwOycsXG4gIGFjdGl2ZTogZmFsc2UsXG4gIGNvbnRhaW5lcjogbnVsbCxcbiAgY2FsbGJhY2s6IG51bGwsXG59O1xuXG4vKipcbiAqIE9uL09mZiBjb250cm9sbGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge1N0cmluZ30gY29uZmlnLmxhYmVsIC0gTGFiZWwgb2YgdGhlIGNvbnRyb2xsZXIuXG4gKiBAcGFyYW0ge0FycmF5fSBbY29uZmlnLmFjdGl2ZT1mYWxzZV0gLSBEZWZhdWx0IHN0YXRlIG9mIHRoZSB0b2dnbGUuXG4gKiBAcGFyYW0ge1N0cmluZ3xFbGVtZW50fGJhc2ljLWNvbnRyb2xsZXJ+R3JvdXB9IFtjb25maWcuY29udGFpbmVyPW51bGxdIC1cbiAqICBDb250YWluZXIgb2YgdGhlIGNvbnRyb2xsZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29uZmlnLmNhbGxiYWNrPW51bGxdIC0gQ2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWQgd2hlbiB0aGVcbiAqICB2YWx1ZSBjaGFuZ2VzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBjb250cm9sbGVycyBmcm9tICdiYXNpYy1jb250cm9sbGVycyc7XG4gKlxuICogY29uc3QgdG9nZ2xlID0gbmV3IGNvbnRyb2xsZXJzLlRvZ2dsZSh7XG4gKiAgIGxhYmVsOiAnTXkgVG9nZ2xlJyxcbiAqICAgYWN0aXZlOiBmYWxzZSxcbiAqICAgY29udGFpbmVyOiAnI2NvbnRhaW5lcicsXG4gKiAgIGNhbGxiYWNrOiAoYWN0aXZlKSA9PiBjb25zb2xlLmxvZyhhY3RpdmUpLFxuICogfSk7XG4gKi9cbmNsYXNzIFRvZ2dsZSBleHRlbmRzIGRpc3BsYXkoQmFzZUNvbXBvbmVudCkge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcigndG9nZ2xlJywgZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICB0aGlzLl9hY3RpdmUgPSB0aGlzLnBhcmFtcy5hY3RpdmU7XG5cbiAgICBzdXBlci5pbml0aWFsaXplKCk7XG4gIH1cblxuICAvKipcbiAgICogVmFsdWUgb2YgdGhlIHRvZ2dsZVxuICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICovXG4gIHNldCB2YWx1ZShib29sKSB7XG4gICAgdGhpcy5hY3RpdmUgPSBib29sO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmU7XG4gIH1cblxuICAvKipcbiAgICogQWxpYXMgZm9yIGB2YWx1ZWAuXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAgc2V0IGFjdGl2ZShib29sKSB7XG4gICAgdGhpcy5fYWN0aXZlID0gYm9vbDtcbiAgICB0aGlzLl91cGRhdGVCdG4oKTtcbiAgfVxuXG4gIGdldCBhY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBfdXBkYXRlQnRuKCkge1xuICAgIHZhciBtZXRob2QgPSB0aGlzLmFjdGl2ZSA/ICdhZGQnIDogJ3JlbW92ZSc7XG4gICAgdGhpcy4kdG9nZ2xlLmNsYXNzTGlzdFttZXRob2RdKCdhY3RpdmUnKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZW5kZXIoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBgXG4gICAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+JHt0aGlzLnBhcmFtcy5sYWJlbH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlclwiPlxuICAgICAgICAke2VsZW1lbnRzLnRvZ2dsZX1cbiAgICAgIDwvZGl2PmA7XG5cbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcigpO1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoJ2FsaWduLXNtYWxsJyk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuJHRvZ2dsZSA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy50b2dnbGUtZWxlbWVudCcpO1xuICAgIC8vIGluaXRpYWxpemUgc3RhdGVcbiAgICB0aGlzLmFjdGl2ZSA9IHRoaXMuX2FjdGl2ZTtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHRoaXMuYWN0aXZlID0gIXRoaXMuYWN0aXZlO1xuICAgICAgdGhpcy5leGVjdXRlTGlzdGVuZXJzKHRoaXMuX2FjdGl2ZSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9nZ2xlO1xuIiwiaW1wb3J0IEJhc2VDb21wb25lbnQgZnJvbSAnLi9CYXNlQ29tcG9uZW50JztcbmltcG9ydCBkaXNwbGF5IGZyb20gJy4uL21peGlucy9kaXNwbGF5JztcblxuLyoqIEBtb2R1bGUgYmFzaWMtY29udHJvbGxlcnMgKi9cblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIGxhYmVsOiAnJm5ic3A7JyxcbiAgb3B0aW9uczogbnVsbCxcbiAgY29udGFpbmVyOiBudWxsLFxuICBjYWxsYmFjazogbnVsbCxcbn07XG5cbi8qKlxuICogTGlzdCBvZiBidXR0b25zIHdpdGhvdXQgc3RhdGUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBjb25maWcubGFiZWwgLSBMYWJlbCBvZiB0aGUgY29udHJvbGxlci5cbiAqIEBwYXJhbSB7QXJyYXl9IFtjb25maWcub3B0aW9ucz1udWxsXSAtIE9wdGlvbnMgZm9yIGVhY2ggYnV0dG9uLlxuICogQHBhcmFtIHtTdHJpbmd8RWxlbWVudHxiYXNpYy1jb250cm9sbGVyfkdyb3VwfSBbY29uZmlnLmNvbnRhaW5lcj1udWxsXSAtXG4gKiAgQ29udGFpbmVyIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbmZpZy5jYWxsYmFjaz1udWxsXSAtIENhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIHdoZW4gdGhlXG4gKiAgdmFsdWUgY2hhbmdlcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgY29udHJvbGxlcnMgZnJvbSAnYmFzaWMtY29udHJvbGxlcnMnO1xuICpcbiAqIGNvbnN0IHRyaWdnZXJCdXR0b25zID0gbmV3IGNvbnRyb2xsZXJzLlRyaWdnZXJCdXR0b25zKHtcbiAqICAgbGFiZWw6ICdNeSBUcmlnZ2VyIEJ1dHRvbnMnLFxuICogICBvcHRpb25zOiBbJ3ZhbHVlIDEnLCAndmFsdWUgMicsICd2YWx1ZSAzJ10sXG4gKiAgIGNvbnRhaW5lcjogJyNjb250YWluZXInLFxuICogICBjYWxsYmFjazogKHZhbHVlLCBpbmRleCkgPT4gY29uc29sZS5sb2codmFsdWUsIGluZGV4KSxcbiAqIH0pO1xuICovXG5jbGFzcyBUcmlnZ2VyQnV0dG9ucyBleHRlbmRzIGRpc3BsYXkoQmFzZUNvbXBvbmVudCkge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcigndHJpZ2dlci1idXR0b25zJywgZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5wYXJhbXMub3B0aW9ucykpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyaWdnZXJCdXR0b246IEludmFsaWQgb3B0aW9uIFwib3B0aW9uc1wiJyk7XG5cbiAgICB0aGlzLl9pbmRleCA9IG51bGw7XG4gICAgdGhpcy5fdmFsdWUgPSBudWxsO1xuXG4gICAgc3VwZXIuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIExhc3QgdHJpZ2dlcmVkIGJ1dHRvbiB2YWx1ZS5cbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBnZXQgdmFsdWUoKSB7IHJldHVybiB0aGlzLl92YWx1ZTsgfVxuXG4gIC8qKlxuICAgKiBMYXN0IHRyaWdnZXJlZCBidXR0b24gaW5kZXguXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgZ2V0IGluZGV4KCkgeyByZXR1cm4gdGhpcy5faW5kZXg7IH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgbGFiZWwsIG9wdGlvbnMgfSA9IHRoaXMucGFyYW1zO1xuXG4gICAgY29uc3QgY29udGVudCA9IGBcbiAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWxcIj4ke2xhYmVsfTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbm5lci13cmFwcGVyXCI+XG4gICAgICAgICR7b3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICByZXR1cm4gYDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidG5cIj4ke29wdGlvbn08L2E+YDtcbiAgICAgICAgfSkuam9pbignJyl9XG4gICAgICA8L2Rpdj5gO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIoKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gICAgdGhpcy4kYnV0dG9ucyA9IEFycmF5LmZyb20odGhpcy4kZWwucXVlcnlTZWxlY3RvckFsbCgnLmJ0bicpKTtcbiAgICB0aGlzLl9iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgX2JpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kYnV0dG9ucy5mb3JFYWNoKCgkYnRuLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnBhcmFtcy5vcHRpb25zW2luZGV4XTtcblxuICAgICAgJGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9pbmRleCA9IGluZGV4O1xuXG4gICAgICAgIHRoaXMuZXhlY3V0ZUxpc3RlbmVycyh2YWx1ZSwgaW5kZXgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHJpZ2dlckJ1dHRvbnM7XG4iLCJpbXBvcnQgQmFzZUNvbXBvbmVudCBmcm9tICcuL2NvbXBvbmVudHMvQmFzZUNvbXBvbmVudCc7XG5pbXBvcnQgR3JvdXAgZnJvbSAnLi9jb21wb25lbnRzL0dyb3VwJztcbmltcG9ydCBOdW1iZXJCb3ggZnJvbSAnLi9jb21wb25lbnRzL051bWJlckJveCc7XG5pbXBvcnQgU2VsZWN0QnV0dG9ucyBmcm9tICcuL2NvbXBvbmVudHMvU2VsZWN0QnV0dG9ucyc7XG5pbXBvcnQgU2VsZWN0TGlzdCBmcm9tICcuL2NvbXBvbmVudHMvU2VsZWN0TGlzdCc7XG5pbXBvcnQgU2xpZGVyIGZyb20gJy4vY29tcG9uZW50cy9TbGlkZXInO1xuaW1wb3J0IFRleHQgZnJvbSAnLi9jb21wb25lbnRzL1RleHQnO1xuaW1wb3J0IFRpdGxlIGZyb20gJy4vY29tcG9uZW50cy9UaXRsZSc7XG5pbXBvcnQgVG9nZ2xlIGZyb20gJy4vY29tcG9uZW50cy9Ub2dnbGUnO1xuaW1wb3J0IFRyaWdnZXJCdXR0b25zIGZyb20gJy4vY29tcG9uZW50cy9UcmlnZ2VyQnV0dG9ucyc7XG5cbmltcG9ydCBjb250YWluZXIgZnJvbSAnLi9taXhpbnMvY29udGFpbmVyJztcblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIGNvbnRhaW5lcjogJ2JvZHknLFxufTtcblxuY2xhc3MgUm9vdCBleHRlbmRzIGNvbnRhaW5lcihCYXNlQ29tcG9uZW50KSB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKCdyb290JywgZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICBsZXQgJGNvbnRhaW5lciA9IHRoaXMucGFyYW1zLmNvbnRhaW5lcjtcblxuICAgIGlmICh0eXBlb2YgJGNvbnRhaW5lciA9PT0gJ3N0cmluZycpXG4gICAgICAkY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigkY29udGFpbmVyKTtcblxuICAgIHRoaXMuJGNvbnRhaW5lciA9ICRjb250YWluZXI7XG4gIH1cbn1cblxuY29uc3QgdHlwZUN0b3JNYXAgPSB7XG4gICdncm91cCc6IEdyb3VwLFxuICAnbnVtYmVyLWJveCc6IE51bWJlckJveCxcbiAgJ3NlbGVjdC1idXR0b25zJzogU2VsZWN0QnV0dG9ucyxcbiAgJ3NlbGVjdC1saXN0JzogU2VsZWN0TGlzdCxcbiAgJ3NsaWRlcic6IFNsaWRlcixcbiAgJ3RleHQnOiBUZXh0LFxuICAndGl0bGUnOiBUaXRsZSxcbiAgJ3RvZ2dsZSc6IFRvZ2dsZSxcbiAgJ3RyaWdnZXItYnV0dG9ucyc6IFRyaWdnZXJCdXR0b25zLFxufTtcblxuZnVuY3Rpb24gY3JlYXRlKGNvbnRhaW5lciwgZGVmaW5pdGlvbnMpIHtcblxuICBmdW5jdGlvbiBfcGFyc2UoY29udGFpbmVyLCBkZWZpbml0aW9ucykge1xuICAgIGRlZmluaXRpb25zLmZvckVhY2goKGRlZiwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHR5cGUgPSBkZWYudHlwZTtcbiAgICAgIGNvbnN0IGN0b3IgPSB0eXBlQ3Rvck1hcFt0eXBlXTtcbiAgICAgIGNvbnN0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZik7XG5cbiAgICAgIC8vXG4gICAgICBjb25maWcuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgZGVsZXRlIGNvbmZpZy50eXBlO1xuXG4gICAgICBjb25zdCBjb21wb25lbnQgPSBuZXcgY3Rvcihjb25maWcpO1xuXG4gICAgICBpZiAodHlwZSA9PT0gJ2dyb3VwJylcbiAgICAgICAgX3BhcnNlKGNvbXBvbmVudCwgY29uZmlnLmVsZW1lbnRzKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBfcm9vdCA9IG5ldyBSb290KHsgY29udGFpbmVyOiBjb250YWluZXIgfSk7XG4gIF9wYXJzZShfcm9vdCwgZGVmaW5pdGlvbnMpO1xuXG4gIHJldHVybiBfcm9vdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlO1xuIiwiaW1wb3J0ICogYXMgX3N0eWxlcyBmcm9tICcuL3V0aWxzL3N0eWxlcyc7XG5leHBvcnQgY29uc3Qgc3R5bGVzID0gX3N0eWxlcztcblxuLyoqIEBtb2R1bGUgYmFzaWMtY29udHJvbGxlcnMgKi9cblxuLy8gZXhwb3NlIGZvciBwbHVnaW5zXG5pbXBvcnQgX0Jhc2VDb21wb25lbnQgZnJvbSAnLi9jb21wb25lbnRzL0Jhc2VDb21wb25lbnQnO1xuZXhwb3J0IGNvbnN0IEJhc2VDb21wb25lbnQgPSBfQmFzZUNvbXBvbmVudDtcblxuLy8gY29tcG9uZW50c1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBHcm91cCB9IGZyb20gJy4vY29tcG9uZW50cy9Hcm91cCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE51bWJlckJveCB9IGZyb20gJy4vY29tcG9uZW50cy9OdW1iZXJCb3gnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTZWxlY3RCdXR0b25zIH0gZnJvbSAnLi9jb21wb25lbnRzL1NlbGVjdEJ1dHRvbnMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTZWxlY3RMaXN0IH0gZnJvbSAnLi9jb21wb25lbnRzL1NlbGVjdExpc3QnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTbGlkZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvU2xpZGVyJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVGV4dCB9IGZyb20gJy4vY29tcG9uZW50cy9UZXh0JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVGl0bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvVGl0bGUnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBUb2dnbGUgfSBmcm9tICcuL2NvbXBvbmVudHMvVG9nZ2xlJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVHJpZ2dlckJ1dHRvbnMgfSBmcm9tICcuL2NvbXBvbmVudHMvVHJpZ2dlckJ1dHRvbnMnO1xuXG4vLyBmYWN0b3J5XG5leHBvcnQgeyBkZWZhdWx0IGFzIGNyZWF0ZSB9IGZyb20gJy4vZmFjdG9yeSc7XG4vLyBkaXNwbGF5XG5leHBvcnQgeyBzZXRUaGVtZSAgfSBmcm9tICcuL21peGlucy9kaXNwbGF5JztcblxuLyoqXG4gKiBEaXNhYmxlIGRlZmF1bHQgc3R5bGluZyAoZXhwZWN0IGEgYnJva2VuIHVpKVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZVN0eWxlcygpIHtcbiAgX3N0eWxlcy5kaXNhYmxlKCk7XG59O1xuIiwiXG5jb25zdCBzZXBhcmF0b3IgPSAnLyc7XG5cbmZ1bmN0aW9uIGdldEhlYWQocGF0aCkge1xuICByZXR1cm4gcGF0aC5zcGxpdChzZXBhcmF0b3IpWzBdO1xufVxuXG5mdW5jdGlvbiBnZXRUYWlsKHBhdGgpIHtcbiAgY29uc3QgcGFydHMgPSBwYXRoLnNwbGl0KHNlcGFyYXRvcik7XG4gIHBhcnRzLnNoaWZ0KCk7XG4gIHJldHVybiBwYXJ0cy5qb2luKHNlcGFyYXRvcik7XG59XG5cbmNvbnN0IGNvbnRhaW5lciA9IChzdXBlcmNsYXNzKSA9PiBjbGFzcyBleHRlbmRzIHN1cGVyY2xhc3Mge1xuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICB0aGlzLmVsZW1lbnRzID0gbmV3IFNldCgpO1xuXG4gICAgLy8gc3VyZSBvZiB0aGF0ID9cbiAgICBkZWxldGUgdGhpcy5fbGlzdGVuZXJzO1xuICAgIGRlbGV0ZSB0aGlzLl9ncm91cExpc3RlbmVycztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gb25lIG9mIHRoZSBncm91cCBjaGlsZHJlbiBhY2NvcmRpbmcgdG8gaXRzIGBpZGAsIGBudWxsYCBvdGhlcndpc2UuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZ2V0SGVhZChpZCkge1xuXG4gIH1cblxuICBfZ2V0VGFpbChpZCkge1xuXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgY2hpbGUgb2YgdGhlIGdyb3VwIHJlY3Vyc2l2ZWx5IGFjY29yZGluZyB0byB0aGUgZ2l2ZW4gYGlkYCxcbiAgICogYG51bGxgIG90aGVyd2lzZS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldENvbXBvbmVudChpZCkge1xuICAgIGNvbnN0IGhlYWQgPSBnZXRIZWFkKGlkKTtcblxuICAgIGZvciAobGV0IGNvbXBvbmVudCBvZiB0aGlzLmVsZW1lbnRzKSB7XG4gICAgICBpZiAoaGVhZCA9PT0gY29tcG9uZW50LmlkKSB7XG4gICAgICAgIGlmIChoZWFkID09PSBpZClcbiAgICAgICAgICByZXR1cm4gY29tcG9uZW50O1xuICAgICAgICBlbHNlIGlmIChjb21wb25lbnQudHlwZSA9ICdncm91cCcpXG4gICAgICAgICAgcmV0dXJuIGNvbXBvbmVudC5nZXRDb21wb25lbnQoZ2V0VGFpbChpZCkpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmRlZmluZWQgY29tcG9uZW50ICR7aWR9YCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbmRlZmluZWQgY29tcG9uZW50ICR7aWR9YCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIExpc3RlbmVyIG9uIGVhY2ggY29tcG9uZW50cyBvZiB0aGUgZ3JvdXAuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBpZCAtIFBhdGggdG8gY29tcG9uZW50IGlkLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIEZ1bmN0aW9uIHRvIGV4ZWN1dGUuXG4gICAqL1xuICBhZGRMaXN0ZW5lcihpZCwgY2FsbGJhY2spIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgY2FsbGJhY2sgPSBpZDtcbiAgICAgIHRoaXMuX2FkZEdyb3VwTGlzdGVuZXIoJycsICcnLCBjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2FkZEdyb3VwTGlzdGVuZXIoaWQsICcnLCBjYWxsYmFjayk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIF9hZGRHcm91cExpc3RlbmVyKGlkLCBjYWxsSWQsIGNhbGxiYWNrKSB7XG4gICAgaWYgKGlkKSB7XG4gICAgICBjb25zdCBjb21wb25lbnRJZCA9IGdldEhlYWQoaWQpO1xuICAgICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5nZXRDb21wb25lbnQoY29tcG9uZW50SWQpO1xuXG4gICAgICBpZiAoY29tcG9uZW50KSB7XG4gICAgICAgIGlkID0gZ2V0VGFpbChpZCk7XG4gICAgICAgIGNvbXBvbmVudC5fYWRkR3JvdXBMaXN0ZW5lcihpZCwgY2FsbElkLCBjYWxsYmFjayk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZGVmaW5lZCBjb21wb25lbnQgJHt0aGlzLnJvb3RJZH0vJHtjb21wb25lbnRJZH1gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbGVtZW50cy5mb3JFYWNoKChjb21wb25lbnQpID0+IHtcbiAgICAgICAgbGV0IF9jYWxsSWQgPSBjYWxsSWQ7IC8vIGNyZWF0ZSBhIG5ldyBicmFuY2hlXG4gICAgICAgIF9jYWxsSWQgKz0gKGNhbGxJZCA9PT0gJycpID8gY29tcG9uZW50LmlkIDogc2VwYXJhdG9yICsgY29tcG9uZW50LmlkO1xuICAgICAgICBjb21wb25lbnQuX2FkZEdyb3VwTGlzdGVuZXIoaWQsIF9jYWxsSWQsIGNhbGxiYWNrKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb250YWluZXI7XG4iLCJpbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi4vdXRpbHMvc3R5bGVzJztcblxuLyoqIEBtb2R1bGUgYmFzaWMtY29udHJvbGxlcnMgKi9cblxuLy8gZGVmYXVsdCB0aGVtZVxubGV0IHRoZW1lID0gJ2xpZ2h0Jztcbi8vIHNldCBvZiB0aGUgaW5zdGFuY2lhdGVkIGNvbnRyb2xsZXJzXG5jb25zdCBjb250cm9sbGVycyA9IG5ldyBTZXQoKTtcblxuXG4vKipcbiAqIENoYW5nZSB0aGUgdGhlbWUgb2YgdGhlIGNvbnRyb2xsZXJzLCBjdXJyZW50bHkgMyB0aGVtZXMgYXJlIGF2YWlsYWJsZTpcbiAqICAtICdsaWdodCcgKGRlZmF1bHQpXG4gKiAgLSAnZ3JleSdcbiAqICAtICdkYXJrJ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0aGVtZSAtIE5hbWUgb2YgdGhlIHRoZW1lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0VGhlbWUodmFsdWUpIHtcbiAgY29udHJvbGxlcnMuZm9yRWFjaCgoY29udHJvbGxlcikgPT4gY29udHJvbGxlci4kZWwuY2xhc3NMaXN0LnJlbW92ZSh0aGVtZSkpO1xuICB0aGVtZSA9IHZhbHVlO1xuICBjb250cm9sbGVycy5mb3JFYWNoKChjb250cm9sbGVyKSA9PiBjb250cm9sbGVyLiRlbC5jbGFzc0xpc3QuYWRkKHRoZW1lKSk7XG59XG5cbi8qKlxuICogZGlzcGxheSBtaXhpbiAtIGNvbXBvbmVudHMgd2l0aCBET01cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGRpc3BsYXkgPSAoc3VwZXJjbGFzcykgPT4gY2xhc3MgZXh0ZW5kcyBzdXBlcmNsYXNzIHtcbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgLy8gaW5zZXJ0IHN0eWxlcyBhbmQgbGlzdGVuIHdpbmRvdyByZXNpemUgd2hlbiB0aGUgZmlyc3QgY29udHJvbGxlciBpcyBjcmVhdGVkXG4gICAgaWYgKGNvbnRyb2xsZXJzLnNpemUgPT09IDApIHtcbiAgICAgIHN0eWxlcy5pbnNlcnRTdHlsZVNoZWV0KCk7XG5cbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udHJvbGxlcnMuZm9yRWFjaCgoY29udHJvbGxlcikgPT4gY29udHJvbGxlci5yZXNpemUoKSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb250cm9sbGVycy5hZGQodGhpcyk7XG4gIH1cblxuICBpbml0aWFsaXplKCkge1xuICAgIGxldCAkY29udGFpbmVyID0gdGhpcy5wYXJhbXMuY29udGFpbmVyO1xuXG4gICAgaWYgKCRjb250YWluZXIpIHtcbiAgICAgIC8vIGNzcyBzZWxlY3RvclxuICAgICAgaWYgKHR5cGVvZiAkY29udGFpbmVyID09PSAnc3RyaW5nJykge1xuICAgICAgICAkY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigkY29udGFpbmVyKTtcbiAgICAgIC8vIGdyb3VwXG4gICAgICB9IGVsc2UgaWYgKCRjb250YWluZXIuJGNvbnRhaW5lcikge1xuICAgICAgICAvLyB0aGlzLmdyb3VwID0gJGNvbnRhaW5lcjtcbiAgICAgICAgJGNvbnRhaW5lci5lbGVtZW50cy5hZGQodGhpcyk7XG4gICAgICAgICRjb250YWluZXIgPSAkY29udGFpbmVyLiRjb250YWluZXI7XG4gICAgICB9XG5cbiAgICAgICRjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXIoKSk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucmVzaXplKCksIDApO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZW5kZXIoKSB7XG4gICAgdGhpcy4kZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKHN0eWxlcy5ucywgdGhlbWUsIHRoaXMudHlwZSk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVzaXplKCkge1xuICAgIGNvbnN0IGJvdW5kaW5nUmVjdCA9IHRoaXMuJGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHdpZHRoID0gYm91bmRpbmdSZWN0LndpZHRoO1xuICAgIGNvbnN0IG1ldGhvZCA9IHdpZHRoID4gNjAwID8gJ3JlbW92ZScgOiAnYWRkJztcblxuICAgIHRoaXMuJGVsLmNsYXNzTGlzdFttZXRob2RdKCdzbWFsbCcpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRpc3BsYXk7XG4iLCJcbmV4cG9ydCBjb25zdCB0b2dnbGUgPSBgXG4gIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzPVwidG9nZ2xlLWVsZW1lbnRcIiB2ZXJzaW9uPVwiMS4xXCIgdmlld0JveD1cIjAgMCA1MCA1MFwiIHByZXNlcnZlQXNwZWN0UmF0aW89XCJub25lXCI+XG4gICAgICA8ZyBjbGFzcz1cInhcIj5cbiAgICAgICAgPGxpbmUgeDE9XCI4XCIgeTE9XCI4XCIgeDI9XCI0MlwiIHkyPVwiNDJcIiBzdHJva2U9XCJ3aGl0ZVwiIC8+XG4gICAgICAgIDxsaW5lIHgxPVwiOFwiIHkxPVwiNDJcIiB4Mj1cIjQyXCIgeTI9XCI4XCIgc3Ryb2tlPVwid2hpdGVcIiAvPlxuICAgICAgPC9nPlxuICA8L3N2Zz5cbmA7XG5cbmV4cG9ydCBjb25zdCBhcnJvd1JpZ2h0ID0gYFxuICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzcz1cImFycm93LXJpZ2h0XCIgdmVyc2lvbj1cIjEuMVwiIHZpZXdCb3g9XCIwIDAgNTAgNTBcIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwibm9uZVwiPlxuICAgIDxsaW5lIHgxPVwiMTBcIiB5MT1cIjEwXCIgeDI9XCI0MFwiIHkyPVwiMjVcIiAvPlxuICAgIDxsaW5lIHgxPVwiMTBcIiB5MT1cIjQwXCIgeDI9XCI0MFwiIHkyPVwiMjVcIiAvPlxuICA8L3N2Zz5cbmA7XG5cbmV4cG9ydCBjb25zdCBhcnJvd0xlZnQgPSBgXG4gIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzPVwiYXJyb3ctbGVmdFwiIHZlcnNpb249XCIxLjFcIiB2aWV3Qm94PVwiMCAwIDUwIDUwXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cIm5vbmVcIj5cbiAgICA8bGluZSB4MT1cIjQwXCIgeTE9XCIxMFwiIHgyPVwiMTBcIiB5Mj1cIjI1XCIgLz5cbiAgICA8bGluZSB4MT1cIjQwXCIgeTE9XCI0MFwiIHgyPVwiMTBcIiB5Mj1cIjI1XCIgLz5cbiAgPC9zdmc+XG5gO1xuXG5leHBvcnQgY29uc3Qgc21hbGxBcnJvd1JpZ2h0ID0gYFxuICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzcz1cInNtYWxsLWFycm93LXJpZ2h0XCIgdmlld0JveD1cIjAgMCA1MCA1MFwiPlxuICAgIDxwYXRoIGQ9XCJNIDIwIDE1IEwgMzUgMjUgTCAyMCAzNSBaXCIgLz5cbiAgPC9zdmc+XG5gO1xuXG5leHBvcnQgY29uc3Qgc21hbGxBcnJvd0JvdHRvbSA9IGBcbiAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3M9XCJzbWFsbC1hcnJvdy1ib3R0b21cIiB2aWV3Qm94PVwiMCAwIDUwIDUwXCI+XG4gICAgPHBhdGggZD1cIk0gMTUgMTcgTCAzNSAxNyBMIDI1IDMyIFpcIiAvPlxuICA8L3N2Zz5cbmA7XG5cblxuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiIC5iYXNpYy1jb250cm9sbGVycyB7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIHsgd2lkdGg6IDEwMCU7IG1heC13aWR0aDogODAwcHg7IGhlaWdodDogMzRweDsgcGFkZGluZzogM3B4OyBtYXJnaW46IDRweCBhdXRvOyBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmOyBib3JkZXI6IDFweCBzb2xpZCAjYWFhYWFhOyBib3gtc2l6aW5nOiBib3JkZXItYm94OyBib3JkZXItcmFkaXVzOiAycHg7IGRpc3BsYXk6IGJsb2NrOyBjb2xvcjogIzQ2NDY0NjsgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lOyAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lOyAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7IC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7IC1tcy11c2VyLXNlbGVjdDogbm9uZTsgdXNlci1zZWxlY3Q6IG5vbmU7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC5sYWJlbCB7IGZvbnQ6IGl0YWxpYyBub3JtYWwgMS4yZW0gUXVpY2tzYW5kLCBhcmlhbCwgc2Fucy1zZXJpZjsgbGluZS1oZWlnaHQ6IDI2cHg7IG92ZXJmbG93OiBoaWRkZW47IHRleHQtYWxpZ246IHJpZ2h0OyBwYWRkaW5nOiAwIDhweCAwIDA7IGRpc3BsYXk6IGJsb2NrOyBib3gtc2l6aW5nOiBib3JkZXItYm94OyB3aWR0aDogMjQlOyBmbG9hdDogbGVmdDsgd2hpdGUtc3BhY2U6IG5vd3JhcDsgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTsgLW1vei11c2VyLXNlbGVjdDogbm9uZTsgLW1zLXVzZXItc2VsZWN0OiBub25lOyAtby11c2VyLXNlbGVjdDogbm9uZTsgdXNlci1zZWxlY3Q6IG5vbmU7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC5pbm5lci13cmFwcGVyIHsgZGlzcGxheTogLXdlYmtpdC1pbmxpbmUtZmxleDsgZGlzcGxheTogaW5saW5lLWZsZXg7IC13ZWJraXQtZmxleC13cmFwOiBuby13cmFwOyBmbGV4LXdyYXA6IG5vLXdyYXA7IHdpZHRoOiA3NiU7IGZsb2F0OiBsZWZ0OyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbCB7IGhlaWdodDogNDhweDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGw6bm90KC5hbGlnbi1zbWFsbCkgeyBoZWlnaHQ6IGF1dG87IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsOm5vdCguYWxpZ24tc21hbGwpIC5sYWJlbCB7IHdpZHRoOiAxMDAlOyBmbG9hdDogbm9uZTsgdGV4dC1hbGlnbjogbGVmdDsgbGluZS1oZWlnaHQ6IDQwcHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsOm5vdCguYWxpZ24tc21hbGwpIC5pbm5lci13cmFwcGVyIHsgd2lkdGg6IDEwMCU7IGZsb2F0OiBub25lOyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbC5hbGlnbi1zbWFsbCAubGFiZWwgeyBkaXNwbGF5OiBibG9jazsgbWFyZ2luLXJpZ2h0OiAyMHB4OyB0ZXh0LWFsaWduOiBsZWZ0OyBsaW5lLWhlaWdodDogNDBweDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGwuYWxpZ24tc21hbGwgLmlubmVyLXdyYXBwZXIgeyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHdpZHRoOiBhdXRvOyB9IC5iYXNpYy1jb250cm9sbGVycyAuYXJyb3ctcmlnaHQsIC5iYXNpYy1jb250cm9sbGVycyAuYXJyb3ctbGVmdCB7IGJvcmRlci1yYWRpdXM6IDJweDsgd2lkdGg6IDE0cHg7IGhlaWdodDogMjZweDsgY3Vyc29yOiBwb2ludGVyOyBiYWNrZ3JvdW5kLWNvbG9yOiAjNDY0NjQ2OyB9IC5iYXNpYy1jb250cm9sbGVycyAuYXJyb3ctcmlnaHQgbGluZSwgLmJhc2ljLWNvbnRyb2xsZXJzIC5hcnJvdy1sZWZ0IGxpbmUgeyBzdHJva2Utd2lkdGg6IDNweDsgc3Ryb2tlOiAjZmZmZmZmOyB9IC5iYXNpYy1jb250cm9sbGVycyAuYXJyb3ctcmlnaHQ6aG92ZXIsIC5iYXNpYy1jb250cm9sbGVycyAuYXJyb3ctbGVmdDpob3ZlciB7IGJhY2tncm91bmQtY29sb3I6ICM2ODY4Njg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC5hcnJvdy1yaWdodDphY3RpdmUsIC5iYXNpYy1jb250cm9sbGVycyAuYXJyb3ctbGVmdDphY3RpdmUgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjOTA5MDkwOyB9IC5iYXNpYy1jb250cm9sbGVycyAuc21hbGwtYXJyb3ctcmlnaHQsIC5iYXNpYy1jb250cm9sbGVycyAuc21hbGwtYXJyb3ctYm90dG9tIHsgd2lkdGg6IDI2cHg7IGhlaWdodDogMjZweDsgY3Vyc29yOiBwb2ludGVyOyB9IC5iYXNpYy1jb250cm9sbGVycyAuc21hbGwtYXJyb3ctcmlnaHQgcGF0aCwgLmJhc2ljLWNvbnRyb2xsZXJzIC5zbWFsbC1hcnJvdy1ib3R0b20gcGF0aCB7IGZpbGw6ICM5MDkwOTA7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC5zbWFsbC1hcnJvdy1yaWdodDpob3ZlciBwYXRoLCAuYmFzaWMtY29udHJvbGxlcnMgLnNtYWxsLWFycm93LWJvdHRvbTpob3ZlciBwYXRoIHsgZmlsbDogIzY4Njg2ODsgfSAuYmFzaWMtY29udHJvbGxlcnMgLnRvZ2dsZS1lbGVtZW50IHsgd2lkdGg6IDI2cHg7IGhlaWdodDogMjZweDsgYm9yZGVyLXJhZGl1czogMnB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjNDY0NjQ2OyBjdXJzb3I6IHBvaW50ZXI7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC50b2dnbGUtZWxlbWVudDpob3ZlciB7IGJhY2tncm91bmQtY29sb3I6ICM2ODY4Njg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC50b2dnbGUtZWxlbWVudCBsaW5lIHsgc3Ryb2tlLXdpZHRoOiAzcHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC50b2dnbGUtZWxlbWVudCAueCB7IGRpc3BsYXk6IG5vbmU7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC50b2dnbGUtZWxlbWVudC5hY3RpdmUgLnggeyBkaXNwbGF5OiBibG9jazsgfSAuYmFzaWMtY29udHJvbGxlcnMgLmJ0biB7IGRpc3BsYXk6IGJsb2NrOyB0ZXh0LWFsaWduOiBjZW50ZXI7IGZvbnQ6IG5vcm1hbCBub3JtYWwgMTJweCBhcmlhbDsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyBoZWlnaHQ6IDI2cHg7IGxpbmUtaGVpZ2h0OiAyNnB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjNDY0NjQ2OyBib3JkZXI6IG5vbmU7IGNvbG9yOiAjZmZmZmZmOyBtYXJnaW46IDAgNHB4IDAgMDsgcGFkZGluZzogMDsgYm94LXNpemluZzogYm9yZGVyLWJveDsgYm9yZGVyLXJhZGl1czogMnB4OyBjdXJzb3I6IHBvaW50ZXI7IC13ZWJraXQtZmxleC1ncm93OiAxOyBmbGV4LWdyb3c6IDE7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC5idG46bGFzdC1jaGlsZCB7IG1hcmdpbjogMDsgfSAuYmFzaWMtY29udHJvbGxlcnMgLmJ0bjpob3ZlciB7IGJhY2tncm91bmQtY29sb3I6ICM2ODY4Njg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC5idG46YWN0aXZlLCAuYmFzaWMtY29udHJvbGxlcnMgLmJ0bi5hY3RpdmUgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjOTA5MDkwOyB9IC5iYXNpYy1jb250cm9sbGVycyAuYnRuOmZvY3VzIHsgb3V0bGluZTogbm9uZTsgfSAuYmFzaWMtY29udHJvbGxlcnMgLm51bWJlciB7IGhlaWdodDogMjZweDsgZGlzcGxheTogaW5saW5lLWJsb2NrOyBwb3NpdGlvbjogcmVsYXRpdmU7IGZvbnQ6IG5vcm1hbCBub3JtYWwgMS4yZW0gUXVpY2tzYW5kLCBhcmlhbCwgc2Fucy1zZXJpZjsgdmVydGljYWwtYWxpZ246IHRvcDsgYm9yZGVyOiBub25lOyBiYWNrZ3JvdW5kOiBub25lOyBjb2xvcjogIzQ2NDY0NjsgcGFkZGluZzogMCA0cHg7IG1hcmdpbjogMDsgYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTsgYm9yZGVyLXJhZGl1czogMnB4OyBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9IC5iYXNpYy1jb250cm9sbGVycyAubnVtYmVyOmZvY3VzIHsgb3V0bGluZTogbm9uZTsgfSAuYmFzaWMtY29udHJvbGxlcnMgc2VsZWN0IHsgaGVpZ2h0OiAyNnB4OyBsaW5lLWhlaWdodDogMjZweDsgYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTsgYm9yZGVyLXJhZGl1czogMnB4OyBib3JkZXI6IG5vbmU7IHZlcnRpY2FsLWFsaWduOiB0b3A7IHBhZGRpbmc6IDA7IG1hcmdpbjogMDsgfSAuYmFzaWMtY29udHJvbGxlcnMgc2VsZWN0OmZvY3VzIHsgb3V0bGluZTogbm9uZTsgfSAuYmFzaWMtY29udHJvbGxlcnMgaW5wdXRbdHlwZT10ZXh0XSB7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDI2cHg7IGxpbmUtaGVpZ2h0OiAyNnB4OyBib3JkZXI6IDA7IHBhZGRpbmc6IDAgNHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5OyBib3JkZXItcmFkaXVzOiAycHg7IGNvbG9yOiAjNTY1NjU2OyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbCAuYXJyb3ctcmlnaHQsIC5iYXNpYy1jb250cm9sbGVycy5zbWFsbCAuYXJyb3ctbGVmdCB7IHdpZHRoOiAyNHB4OyBoZWlnaHQ6IDQwcHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsIC50b2dnbGUtZWxlbWVudCB7IHdpZHRoOiA0MHB4OyBoZWlnaHQ6IDQwcHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsIC5idG4geyBoZWlnaHQ6IDQwcHg7IGxpbmUtaGVpZ2h0OiA0MHB4OyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbCAubnVtYmVyIHsgaGVpZ2h0OiA0MHB4OyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbCBzZWxlY3QgeyBoZWlnaHQ6IDQwcHg7IGxpbmUtaGVpZ2h0OiA0MHB4OyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbCBpbnB1dFt0eXBlPXRleHRdIHsgaGVpZ2h0OiA0MHB4OyBsaW5lLWhlaWdodDogNDBweDsgfSAuYmFzaWMtY29udHJvbGxlcnMudGl0bGUgeyBib3JkZXI6IG5vbmUgIWltcG9ydGFudDsgbWFyZ2luLWJvdHRvbTogMDsgbWFyZ2luLXRvcDogOHB4OyBwYWRkaW5nLXRvcDogOHB4OyBwYWRkaW5nLWJvdHRvbTogMDsgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDsgaGVpZ2h0OiAyNXB4OyB9IC5iYXNpYy1jb250cm9sbGVycy50aXRsZSAubGFiZWwgeyBmb250OiBub3JtYWwgYm9sZCAxLjNlbSBRdWlja3NhbmQsIGFyaWFsLCBzYW5zLXNlcmlmOyBoZWlnaHQ6IDEwMCU7IG92ZXJmbG93OiBoaWRkZW47IHRleHQtYWxpZ246IGxlZnQ7IHBhZGRpbmc6IDA7IHdpZHRoOiAxMDAlOyBib3gtc2l6aW5nOiBib3JkZXItYm94OyAtd2Via2l0LWZsZXgtZ3JvdzogMTsgZmxleC1ncm93OiAxOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncm91cCB7IGhlaWdodDogYXV0bzsgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyb3VwIC5ncm91cC1oZWFkZXIgLmxhYmVsIHsgZm9udDogbm9ybWFsIGJvbGQgMS4zZW0gUXVpY2tzYW5kLCBhcmlhbCwgc2Fucy1zZXJpZjsgaGVpZ2h0OiAyNnB4OyBsaW5lLWhlaWdodDogMjZweDsgb3ZlcmZsb3c6IGhpZGRlbjsgdGV4dC1hbGlnbjogbGVmdDsgcGFkZGluZzogMCAwIDAgMzZweDsgd2lkdGg6IDEwMCU7IGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC13ZWJraXQtZmxleC1ncm93OiAxOyBmbGV4LWdyb3c6IDE7IGZsb2F0OiBub25lOyBjdXJzb3I6IHBvaW50ZXI7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyb3VwIC5ncm91cC1oZWFkZXIgLnNtYWxsLWFycm93LXJpZ2h0IHsgd2lkdGg6IDI2cHg7IGhlaWdodDogMjZweDsgcG9zaXRpb246IGFic29sdXRlOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncm91cCAuZ3JvdXAtaGVhZGVyIC5zbWFsbC1hcnJvdy1ib3R0b20geyB3aWR0aDogMjZweDsgaGVpZ2h0OiAyNnB4OyBwb3NpdGlvbjogYWJzb2x1dGU7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyb3VwIC5ncm91cC1jb250ZW50IHsgb3ZlcmZsb3c6IGhpZGRlbjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JvdXAgLmdyb3VwLWNvbnRlbnQgbGFiZWw6bGFzdC1jaGlsZCB7IG1hcmdpbi1ib3R0b206IDA7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyb3VwLm9wZW5lZCAuZ3JvdXAtaGVhZGVyIC5zbWFsbC1hcnJvdy1yaWdodCB7IGRpc3BsYXk6IG5vbmU7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyb3VwLm9wZW5lZCAuZ3JvdXAtaGVhZGVyIC5zbWFsbC1hcnJvdy1ib3R0b20geyBkaXNwbGF5OiBibG9jazsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JvdXAub3BlbmVkIC5ncm91cC1jb250ZW50IHsgZGlzcGxheTogYmxvY2s7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyb3VwLmNsb3NlZCAuZ3JvdXAtaGVhZGVyIC5zbWFsbC1hcnJvdy1yaWdodCB7IGRpc3BsYXk6IGJsb2NrOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncm91cC5jbG9zZWQgLmdyb3VwLWhlYWRlciAuc21hbGwtYXJyb3ctYm90dG9tIHsgZGlzcGxheTogbm9uZTsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JvdXAuY2xvc2VkIC5ncm91cC1jb250ZW50IHsgZGlzcGxheTogbm9uZTsgfSAuYmFzaWMtY29udHJvbGxlcnMuc2xpZGVyIC5yYW5nZSB7IGhlaWdodDogMjZweDsgZGlzcGxheTogaW5saW5lLWJsb2NrOyBtYXJnaW46IDA7IC13ZWJraXQtZmxleC1ncm93OiA0OyBmbGV4LWdyb3c6IDQ7IHBvc2l0aW9uOiByZWxhdGl2ZTsgfSAuYmFzaWMtY29udHJvbGxlcnMuc2xpZGVyIC5yYW5nZSBjYW52YXMgeyBwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMDsgbGVmdDogMDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc2xpZGVyIC5udW1iZXItd3JhcHBlciB7IGRpc3BsYXk6IGlubGluZTsgaGVpZ2h0OiAyNnB4OyB0ZXh0LWFsaWduOiByaWdodDsgLXdlYmtpdC1mbGV4LWdyb3c6IDM7IGZsZXgtZ3JvdzogMzsgfSAuYmFzaWMtY29udHJvbGxlcnMuc2xpZGVyIC5udW1iZXItd3JhcHBlciAubnVtYmVyIHsgbGVmdDogNXB4OyB3aWR0aDogNTRweDsgdGV4dC1hbGlnbjogcmlnaHQ7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNsaWRlciAubnVtYmVyLXdyYXBwZXIgLnVuaXQgeyBmb250OiBpdGFsaWMgbm9ybWFsIDFlbSBRdWlja3NhbmQsIGFyaWFsLCBzYW5zLXNlcmlmOyBsaW5lLWhlaWdodDogMjZweDsgaGVpZ2h0OiAyNnB4OyB3aWR0aDogMzBweDsgZGlzcGxheTogaW5saW5lLWJsb2NrOyBwb3NpdGlvbjogcmVsYXRpdmU7IHBhZGRpbmctbGVmdDogNXB4OyBwYWRkaW5nLXJpZ2h0OiA1cHg7IGNvbG9yOiAjNTY1NjU2OyB9IC5iYXNpYy1jb250cm9sbGVycy5zbGlkZXIgLm51bWJlci13cmFwcGVyIC51bml0IHN1cCB7IGxpbmUtaGVpZ2h0OiA3cHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNsaWRlci5zbGlkZXItbGFyZ2UgLnJhbmdlIHsgLXdlYmtpdC1mbGV4LWdyb3c6IDUwOyBmbGV4LWdyb3c6IDUwOyB9IC5iYXNpYy1jb250cm9sbGVycy5zbGlkZXIuc2xpZGVyLWxhcmdlIC5udW1iZXItd3JhcHBlciB7IC13ZWJraXQtZmxleC1ncm93OiAxOyBmbGV4LWdyb3c6IDE7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNsaWRlci5zbGlkZXItc21hbGwgLnJhbmdlIHsgLXdlYmtpdC1mbGV4LWdyb3c6IDI7IGZsZXgtZ3JvdzogMjsgfSAuYmFzaWMtY29udHJvbGxlcnMuc2xpZGVyLnNsaWRlci1zbWFsbCAubnVtYmVyLXdyYXBwZXIgeyAtd2Via2l0LWZsZXgtZ3JvdzogNDsgZmxleC1ncm93OiA0OyB9IC5iYXNpYy1jb250cm9sbGVycy5udW1iZXItYm94IC5udW1iZXIgeyB3aWR0aDogMTIwcHg7IG1hcmdpbjogMCAxMHB4OyB2ZXJ0aWNhbC1hbGlnbjogdG9wOyB9IC5iYXNpYy1jb250cm9sbGVycy5zZWxlY3QtbGlzdCBzZWxlY3QgeyBtYXJnaW46IDAgMTBweDsgd2lkdGg6IDEyMHB4OyBmb250OiBub3JtYWwgbm9ybWFsIDEuMmVtIFF1aWNrc2FuZCwgYXJpYWwsIHNhbnMtc2VyaWY7IGNvbG9yOiAjNDY0NjQ2OyB9IC5iYXNpYy1jb250cm9sbGVycy5zZWxlY3QtYnV0dG9ucyAuYnRuOmZpcnN0LW9mLXR5cGUgeyBtYXJnaW4tbGVmdDogNHB4OyB9IC5iYXNpYy1jb250cm9sbGVycy50ZXh0IGlucHV0W3R5cGU9dGV4dF0geyBmb250OiBub3JtYWwgbm9ybWFsIDEuMmVtIFF1aWNrc2FuZCwgYXJpYWwsIHNhbnMtc2VyaWY7IGNvbG9yOiAjNDY0NjQ2OyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbC5zbGlkZXIgLnJhbmdlIHsgaGVpZ2h0OiA0MHB4OyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbC5zbGlkZXIgLm51bWJlci13cmFwcGVyIHsgaGVpZ2h0OiA0MHB4OyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbC5zbGlkZXIgLm51bWJlci13cmFwcGVyIC51bml0IHsgbGluZS1oZWlnaHQ6IDQwcHg7IGhlaWdodDogNDBweDsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSB7IGJhY2tncm91bmQtY29sb3I6ICMzNjM2MzY7IGJvcmRlcjogMXB4IHNvbGlkICM1ODU4NTg7IGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOTUpOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC50b2dnbGUtZWxlbWVudCB7IGJhY2tncm91bmQtY29sb3I6ICNlZmVmZWY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLnRvZ2dsZS1lbGVtZW50IGxpbmUgeyBzdHJva2U6ICMzNjM2MzY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLnRvZ2dsZS1lbGVtZW50OmhvdmVyIHsgYmFja2dyb3VuZC1jb2xvcjogI2NkY2RjZDsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAuYXJyb3ctcmlnaHQsIC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC5hcnJvdy1sZWZ0IHsgYmFja2dyb3VuZC1jb2xvcjogI2VmZWZlZjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAuYXJyb3ctcmlnaHQgbGluZSwgLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLmFycm93LWxlZnQgbGluZSB7IHN0cm9rZTogIzM2MzYzNjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAuYXJyb3ctcmlnaHQ6aG92ZXIsIC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC5hcnJvdy1sZWZ0OmhvdmVyIHsgYmFja2dyb3VuZC1jb2xvcjogI2NkY2RjZDsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAuYXJyb3ctcmlnaHQ6YWN0aXZlLCAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAuYXJyb3ctbGVmdDphY3RpdmUgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjYWJhYmFiOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC5zbWFsbC1hcnJvdy1yaWdodCBwYXRoLCAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAuc21hbGwtYXJyb3ctYm90dG9tIHBhdGggeyBmaWxsOiAjYWJhYmFiOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC5zbWFsbC1hcnJvdy1yaWdodDpob3ZlciBwYXRoLCAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAuc21hbGwtYXJyb3ctYm90dG9tOmhvdmVyIHBhdGggeyBmaWxsOiAjY2RjZGNkOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC5udW1iZXIsIC5iYXNpYy1jb250cm9sbGVycy5ncmV5IHNlbGVjdCwgLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgaW5wdXRbdHlwZT10ZXh0XSB7IGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOTUpOyBiYWNrZ3JvdW5kLWNvbG9yOiAjNDU0NTQ1OyB9IC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC5idG4geyBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmOyBjb2xvcjogIzM2MzYzNjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAuYnRuOmhvdmVyIHsgYmFja2dyb3VuZC1jb2xvcjogI2NkY2RjZDsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAuYnRuOmFjdGl2ZSwgLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLmJ0bi5hY3RpdmUgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjYWJhYmFiOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncmV5LnNsaWRlciAuaW5uZXItd3JhcHBlciAubnVtYmVyLXdyYXBwZXIgLnVuaXQgeyBjb2xvcjogI2JjYmNiYzsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JleS5ncm91cCB7IGJhY2tncm91bmQtY29sb3I6ICM1MDUwNTA7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjMjQyNDI0OyBib3JkZXI6IDFweCBzb2xpZCAjMjgyODI4OyBjb2xvcjogI2ZmZmZmZjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAudG9nZ2xlLWVsZW1lbnQgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjNDY0NjQ2OyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC50b2dnbGUtZWxlbWVudCBsaW5lIHsgc3Ryb2tlOiAjZmZmZmZmOyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC50b2dnbGUtZWxlbWVudDpob3ZlciB7IGJhY2tncm91bmQtY29sb3I6ICM2ODY4Njg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLmFycm93LXJpZ2h0LCAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYXJyb3ctbGVmdCB7IGJhY2tncm91bmQtY29sb3I6ICM0NjQ2NDY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLmFycm93LXJpZ2h0IGxpbmUsIC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5hcnJvdy1sZWZ0IGxpbmUgeyBzdHJva2U6ICNmZmZmZmY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLmFycm93LXJpZ2h0OmhvdmVyLCAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYXJyb3ctbGVmdDpob3ZlciB7IGJhY2tncm91bmQtY29sb3I6ICM2ODY4Njg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLmFycm93LXJpZ2h0OmFjdGl2ZSwgLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLmFycm93LWxlZnQ6YWN0aXZlIHsgYmFja2dyb3VuZC1jb2xvcjogIzkwOTA5MDsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuc21hbGwtYXJyb3ctcmlnaHQgcGF0aCwgLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLnNtYWxsLWFycm93LWJvdHRvbSBwYXRoIHsgZmlsbDogIzkwOTA5MDsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuc21hbGwtYXJyb3ctcmlnaHQ6aG92ZXIgcGF0aCwgLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLnNtYWxsLWFycm93LWJvdHRvbTpob3ZlciBwYXRoIHsgZmlsbDogIzY4Njg2ODsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAubnVtYmVyLCAuYmFzaWMtY29udHJvbGxlcnMuZGFyayBzZWxlY3QsIC5iYXNpYy1jb250cm9sbGVycy5kYXJrIGlucHV0W3R5cGU9dGV4dF0geyBjb2xvcjogI2ZmZmZmZjsgYmFja2dyb3VuZC1jb2xvcjogIzMzMzMzMzsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYnRuIHsgYmFja2dyb3VuZC1jb2xvcjogIzQ2NDY0NjsgY29sb3I6ICNmZmZmZmY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLmJ0bjpob3ZlciB7IGJhY2tncm91bmQtY29sb3I6ICM2ODY4Njg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLmJ0bjphY3RpdmUsIC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5idG4uYWN0aXZlIHsgYmFja2dyb3VuZC1jb2xvcjogIzkwOTA5MDsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyay5zbGlkZXIgLmlubmVyLXdyYXBwZXIgLm51bWJlci13cmFwcGVyIC51bml0IHsgY29sb3I6ICNjZGNkY2Q7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsuZ3JvdXAgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjM2UzZTNlOyB9IFwiOyIsImltcG9ydCB7IG5hbWUgfSBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHN0eWxlcyBmcm9tICcuL3N0eWxlcy1kZWNsYXJhdGlvbnMuanMnO1xuXG5leHBvcnQgY29uc3QgbnMgPSBuYW1lO1xuXG5jb25zdCBuc0NsYXNzID0gYC4ke25zfWA7XG5sZXQgX2Rpc2FibGVkID0gZmFsc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICBfZGlzYWJsZWQgPSB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0U3R5bGVTaGVldCgpIHtcbiAgaWYgKF9kaXNhYmxlZCkgcmV0dXJuO1xuXG4gIGNvbnN0ICRjc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAkY3NzLnNldEF0dHJpYnV0ZSgnZGF0YS1uYW1lc3BhY2UnLCBucyk7XG4gICRjc3MudHlwZSA9ICd0ZXh0L2Nzcyc7XG5cbiAgaWYgKCRjc3Muc3R5bGVTaGVldClcbiAgICAkY3NzLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHN0eWxlcztcbiAgZWxzZVxuICAgICRjc3MuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3R5bGVzKSk7XG5cbiAgLy8gaW5zZXJ0IGJlZm9yZSBsaW5rIG9yIHN0eWxlcyBpZiBleGlzdHNcbiAgY29uc3QgJGxpbmsgPSBkb2N1bWVudC5oZWFkLnF1ZXJ5U2VsZWN0b3IoJ2xpbmsnKTtcbiAgY29uc3QgJHN0eWxlID0gZG9jdW1lbnQuaGVhZC5xdWVyeVNlbGVjdG9yKCdzdHlsZScpO1xuXG4gIGlmICgkbGluaylcbiAgICBkb2N1bWVudC5oZWFkLmluc2VydEJlZm9yZSgkY3NzLCAkbGluayk7XG4gIGVsc2UgaWYgKCRzdHlsZSlcbiAgICBkb2N1bWVudC5oZWFkLmluc2VydEJlZm9yZSgkY3NzLCAkc3R5bGUpO1xuICBlbHNlXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCgkY3NzKTtcbn1cblxuIiwiaW1wb3J0ICogYXMgY29udHJvbGxlcnMgZnJvbSAnLi4vLi4vLi4vZGlzdC9pbmRleCc7XG5cbmNvbnN0IGRlZmluaXRpb25zID0gW1xuICB7XG4gICAgaWQ6ICd0aXRsZS0wJyxcbiAgICB0eXBlOiAndGl0bGUnLFxuICAgIGxhYmVsOiAnVGl0bGUnLFxuICB9LCB7XG4gICAgaWQ6ICdzbGlkZXItMCcsXG4gICAgdHlwZTogJ3NsaWRlcicsXG4gICAgbGFiZWw6ICdNeSBTbGlkZXInLFxuICAgIHNpemU6ICdsYXJnZScsXG4gICAgbWluOiAwLFxuICAgIG1heDogMTAwMCxcbiAgICBzdGVwOiAxLFxuICAgIGRlZmF1bHQ6IDI1MyxcbiAgfSwge1xuICAgIGlkOiAnZ3JvdXAtMCcsXG4gICAgdHlwZTogJ2dyb3VwJyxcbiAgICBsYWJlbDogJ0dyb3VwJyxcbiAgICBkZWZhdWx0OiAnb3BlbmVkJyxcbiAgICBlbGVtZW50czogW1xuICAgICAge1xuICAgICAgICBpZDogJ251bWJlci0xJyxcbiAgICAgICAgdHlwZTogJ251bWJlci1ib3gnLFxuICAgICAgICBkZWZhdWx0OiAwLjQsXG4gICAgICAgIG1pbjogLTEsXG4gICAgICAgIG1heDogMSxcbiAgICAgICAgc3RlcDogMC4wMSxcbiAgICAgIH0sIHtcbiAgICAgICAgaWQ6ICd0ZXh0LTEnLFxuICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgIGxhYmVsOiAnTXkgVGV4dCcsXG4gICAgICAgIHJlYWRvbmx5OiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdDogJ2RlZmF1bHQgdGV4dCcsXG4gICAgICB9LCB7XG4gICAgICAgIGlkOiAnZ3JvdXAtMScsXG4gICAgICAgIHR5cGU6ICdncm91cCcsXG4gICAgICAgIGxhYmVsOiAnR3JvdXAnLFxuICAgICAgICBkZWZhdWx0OiAnb3BlbmVkJyxcbiAgICAgICAgZWxlbWVudHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogJ251bWJlci0yJyxcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXItYm94JyxcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAuNCxcbiAgICAgICAgICAgIG1pbjogLTEsXG4gICAgICAgICAgICBtYXg6IDEsXG4gICAgICAgICAgICBzdGVwOiAwLjAxLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIF0sXG4gIH0sIHtcbiAgICBpZDogJ3NlbGVjdC0wJyxcbiAgICB0eXBlOiAnc2VsZWN0LWxpc3QnLFxuICAgIG9wdGlvbnM6IFsnMScsICcyJywgJzMnXSxcbiAgICBkZWZhdWx0OiAnMicsXG4gIH1cbl07XG5cbmNvbnN0IGNvbnRyb2xzID0gY29udHJvbGxlcnMuY3JlYXRlKCcjY29udGFpbmVyJywgZGVmaW5pdGlvbnMpO1xuXG4vLyBnZXQgY29tcG9uZW50c1xuY29uc3QgZ3JvdXAwID0gY29udHJvbHMuZ2V0Q29tcG9uZW50KCdncm91cC0wJyk7XG5jb25zdCBudW1iZXIxID0gY29udHJvbHMuZ2V0Q29tcG9uZW50KCdncm91cC0wL251bWJlci0xJyk7XG5jb25zdCBudW1iZXIyID0gY29udHJvbHMuZ2V0Q29tcG9uZW50KCdncm91cC0wL2dyb3VwLTEvbnVtYmVyLTInKTtcblxuLy8gY29uc29sZS5sb2coZ3JvdXAwKTtcbi8vIGNvbnNvbGUubG9nKG51bWJlcjEpO1xuLy8gY29uc29sZS5sb2cobnVtYmVyMik7XG5cbi8vIGFkZCBsaXN0ZW5lcnNcbi8vIGNvbnRyb2xzLmFkZExpc3RlbmVyKCdzbGlkZXItMCcsICh2YWx1ZSkgPT4gY29uc29sZS5sb2codmFsdWUpKTtcbi8vIGNvbnRyb2xzLmFkZExpc3RlbmVyKCdncm91cC0wL251bWJlci0xJywgKHZhbHVlKSA9PiBjb25zb2xlLmxvZyh2YWx1ZSkpO1xuXG4vLyBjb250cm9scy5hZGRMaXN0ZW5lcignZ3JvdXAtMCcsIChpZCwgdmFsdWUpID0+IGNvbnNvbGUubG9nKGlkLCB2YWx1ZSkpO1xuLy8gY29udHJvbHMuYWRkTGlzdGVuZXIoJ2dyb3VwLTAvZ3JvdXAtMScsIChpZCwgdmFsdWUpID0+IGNvbnNvbGUubG9nKGlkLCB2YWx1ZSkpO1xuXG4vLyBjb250cm9scy5hZGRMaXN0ZW5lcigoaWQsIHZhbHVlKSA9PiBjb25zb2xlLmxvZyhpZCwgdmFsdWUpKTtcblxuLy8gZ3JvdXAwLmFkZExpc3RlbmVyKCdudW1iZXItMScsICh2YWx1ZSkgPT4gY29uc29sZS5sb2codmFsdWUpKTtcbi8vIGdyb3VwMC5hZGRMaXN0ZW5lcignZ3JvdXAtMScsIChpZCwgdmFsdWUpID0+IGNvbnNvbGUubG9nKGlkLCB2YWx1ZSkpO1xuZ3JvdXAwLmFkZExpc3RlbmVyKChpZCwgdmFsdWUpID0+IGNvbnNvbGUubG9nKGlkLCB2YWx1ZSkpO1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIm5hbWVcIjogXCJiYXNpYy1jb250cm9sbGVyc1wiLFxuICBcInZlcnNpb25cIjogXCIxLjAuMFwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiU2V0IG9mIHNpbXBsZSBjb250cm9sbGVycyBmb3IgcmFwaWQgcHJvdG90eXBpbmdcIixcbiAgXCJtYWluXCI6IFwiZGlzdC9pbmRleC5qc1wiLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiZG9jXCI6IFwianNkb2MybWQgLXQgdG1wbC9SRUFETUUuaGJzIC0tc2VwYXJhdG9ycyBzcmMvKiovKi5qcyBzcmMvKi5qcyA+IFJFQURNRS5tZFwiLFxuICAgIFwidHJhbnNwaWxlXCI6IFwibm9kZSAuL2Jpbi9ydW5uZXIgLS10cmFuc3BpbGVcIixcbiAgICBcInByZXdhdGNoXCI6IFwibm9kZSAuL2Jpbi9ydW5uZXIgLS10cmFuc3BpbGVcIixcbiAgICBcIndhdGNoXCI6IFwibm9kZSAuL2Jpbi9ydW5uZXIgLS13YXRjaFwiXG4gIH0sXG4gIFwibGljZW5zZVwiOiBcIkJTRC0zLUNsYXVzZVwiLFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2lyY2FtLWpzdG9vbHMvYmFzaWMtY29udHJvbGxlcnMuZ2l0XCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiYmFiZWwtcnVudGltZVwiOiBcIl42LjE4LjBcIixcbiAgICBcImd1aS1jb21wb25lbnRzXCI6IFwiaXJjYW0tanN0b29scy9ndWktY29tcG9uZW50cyN2MS4wLjBcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJiYWJlbC1jb3JlXCI6IFwiXjYuMTguMlwiLFxuICAgIFwiYmFiZWwtcGx1Z2luLXRyYW5zZm9ybS1lczIwMTUtbW9kdWxlcy1jb21tb25qc1wiOiBcIl42LjE4LjBcIixcbiAgICBcImJhYmVsLXBsdWdpbi10cmFuc2Zvcm0tcnVudGltZVwiOiBcIl42LjE1LjBcIixcbiAgICBcImJhYmVsLXByZXNldC1lczIwMTVcIjogXCJeNi4xOC4wXCIsXG4gICAgXCJjb2xvcnNcIjogXCJeMS4xLjJcIixcbiAgICBcImZzLWV4dHJhXCI6IFwiXjEuMC4wXCIsXG4gICAgXCJqc2RvYy10by1tYXJrZG93blwiOiBcIl4yLjAuMVwiLFxuICAgIFwibm9kZS1zYXNzXCI6IFwiXjMuMTMuMFwiLFxuICAgIFwid2F0Y2hcIjogXCJeMS4wLjFcIlxuICB9XG59XG4iLCJmdW5jdGlvbiBnZXRTY2FsZShkb21haW4sIHJhbmdlKSB7XG4gIGNvbnN0IHNsb3BlID0gKHJhbmdlWzFdIC0gcmFuZ2VbMF0pIC8gKGRvbWFpblsxXSAtIGRvbWFpblswXSk7XG4gIGNvbnN0IGludGVyY2VwdCA9IHJhbmdlWzBdIC0gc2xvcGUgKiBkb21haW5bMF07XG5cbiAgZnVuY3Rpb24gc2NhbGUodmFsKSB7XG4gICAgcmV0dXJuIHNsb3BlICogdmFsICsgaW50ZXJjZXB0O1xuICB9XG5cbiAgc2NhbGUuaW52ZXJ0ID0gZnVuY3Rpb24odmFsKSB7XG4gICAgcmV0dXJuICh2YWwgLSBpbnRlcmNlcHQpIC8gc2xvcGU7XG4gIH1cblxuICByZXR1cm4gc2NhbGU7XG59XG5cbmZ1bmN0aW9uIGdldENsaXBwZXIobWluLCBtYXgsIHN0ZXApIHtcbiAgcmV0dXJuICh2YWwpID0+IHtcbiAgICBjb25zdCBjbGlwcGVkVmFsdWUgPSBNYXRoLnJvdW5kKHZhbCAvIHN0ZXApICogc3RlcDtcbiAgICBjb25zdCBmaXhlZCA9IE1hdGgubWF4KE1hdGgubG9nMTAoMSAvIHN0ZXApLCAwKTtcbiAgICBjb25zdCBmaXhlZFZhbHVlID0gY2xpcHBlZFZhbHVlLnRvRml4ZWQoZml4ZWQpOyAvLyBmaXggZmxvYXRpbmcgcG9pbnQgZXJyb3JzXG4gICAgcmV0dXJuIE1hdGgubWluKG1heCwgTWF0aC5tYXgobWluLCBwYXJzZUZsb2F0KGZpeGVkVmFsdWUpKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBAbW9kdWxlIGd1aS1jb21wb25lbnRzXG4gKi9cblxuLyoqXG4gKiBWZXJzYXRpbGUgY2FudmFzIGJhc2VkIHNsaWRlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7J2p1bXAnfCdwcm9wb3J0aW9ubmFsJ3wnaGFuZGxlJ30gW29wdGlvbnMubW9kZT0nanVtcCddIC0gTW9kZSBvZiB0aGUgc2xpZGVyOlxuICogIC0gaW4gJ2p1bXAnIG1vZGUsIHRoZSB2YWx1ZSBpcyBjaGFuZ2VkIG9uICd0b3VjaHN0YXJ0JyBvciAnbW91c2Vkb3duJywgYW5kXG4gKiAgICBvbiBtb3ZlLlxuICogIC0gaW4gJ3Byb3BvcnRpb25uYWwnIG1vZGUsIHRoZSB2YWx1ZSBpcyB1cGRhdGVkIHJlbGF0aXZlbHkgdG8gbW92ZS5cbiAqICAtIGluICdoYW5kbGUnIG1vZGUsIHRoZSBzbGlkZXIgY2FuIGJlIGdyYWJiZWQgb25seSBhcm91bmQgaXRzIHZhbHVlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuY2FsbGJhY2tdIC0gQ2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWQgd2hlbiB0aGUgdmFsdWVcbiAqICBvZiB0aGUgc2xpZGVyIGNoYW5nZXMuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMud2lkdGg9MjAwXSAtIFdpZHRoIG9mIHRoZSBzbGlkZXIuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuaGVpZ2h0PTMwXSAtIEhlaWdodCBvZiB0aGUgc2xpZGVyLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1pbj0wXSAtIE1pbmltdW0gdmFsdWUuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWF4PTFdIC0gTWF4aW11bSB2YWx1ZS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5zdGVwPTAuMDFdIC0gU3RlcCBiZXR3ZWVuIGVhY2ggY29uc2VjdXRpdmUgdmFsdWVzLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmRlZmF1bHQ9MF0gLSBEZWZhdWx0IHZhbHVlLlxuICogQHBhcmFtIHtTdHJpbmd8RWxlbWVudH0gW29wdGlvbnMuY29udGFpbmVyPSdib2R5J10gLSBDU1MgU2VsZWN0b3Igb3IgRE9NXG4gKiAgZWxlbWVudCBpbiB3aGljaCBpbnNlcnRpbmcgdGhlIHNsaWRlci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3I9JyM0NjQ2NDYnXSAtIEJhY2tncm91bmQgY29sb3Igb2YgdGhlXG4gKiAgc2xpZGVyLlxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmZvcmVncm91bmRDb2xvcj0nc3RlZWxibHVlJ10gLSBGb3JlZ3JvdW5kIGNvbG9yIG9mXG4gKiAgdGhlIHNsaWRlci5cbiAqIEBwYXJhbSB7J2hvcml6b250YWwnfCd2ZXJ0aWNhbCd9IFtvcHRpb25zLm9yaWVudGF0aW9uPSdob3Jpem9udGFsJ10gLVxuICogIE9yaWVudGF0aW9uIG9mIHRoZSBzbGlkZXIuXG4gKiBAcGFyYW0ge0FycmF5fSBbb3B0aW9ucy5tYXJrZXJzPVtdXSAtIExpc3Qgb2YgdmFsdWVzIHdoZXJlIG1hcmtlcnMgc2hvdWxkXG4gKiAgYmUgZGlzcGxheWVkIG9uIHRoZSBzbGlkZXIuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnNob3dIYW5kbGU9dHJ1ZV0gLSBJbiAnaGFuZGxlJyBtb2RlLCBkZWZpbmUgaWYgdGhlXG4gKiAgZHJhZ2dhYmxlIHNob3VsZCBiZSBzaG93IG9yIG5vdC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5oYW5kbGVTaXplPTIwXSAtIFNpemUgb2YgdGhlIGRyYWdnYWJsZSB6b25lLlxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmhhbmRsZUNvbG9yPSdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNyknXSAtIENvbG9yIG9mIHRoZVxuICogIGRyYWdnYWJsZSB6b25lICh3aGVuIGBzaG93SGFuZGxlYCBpcyBgdHJ1ZWApLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgeyBTbGlkZXJ9IGZyb20gJ2d1aS1jb21wb25lbnRzJztcbiAqXG4gKiBjb25zdCBzbGlkZXIgPSBuZXcgU2xpZGVyKHtcbiAqICAgbW9kZTogJ2p1bXAnLFxuICogICBjb250YWluZXI6ICcjY29udGFpbmVyJyxcbiAqICAgZGVmYXVsdDogMC42LFxuICogICBtYXJrZXJzOiBbMC41XSxcbiAqICAgY2FsbGJhY2s6ICh2YWx1ZSkgPT4gY29uc29sZS5sb2codmFsdWUpLFxuICogfSk7XG4gKi9cbmNsYXNzIFNsaWRlciB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICAgIG1vZGU6ICdqdW1wJyxcbiAgICAgIGNhbGxiYWNrOiB2YWx1ZSA9PiB7fSxcbiAgICAgIHdpZHRoOiAyMDAsXG4gICAgICBoZWlnaHQ6IDMwLFxuICAgICAgbWluOiAwLFxuICAgICAgbWF4OiAxLFxuICAgICAgc3RlcDogMC4wMSxcbiAgICAgIGRlZmF1bHQ6IDAsXG4gICAgICBjb250YWluZXI6ICdib2R5JyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyM0NjQ2NDYnLFxuICAgICAgZm9yZWdyb3VuZENvbG9yOiAnc3RlZWxibHVlJyxcbiAgICAgIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgICBtYXJrZXJzOiBbXSxcblxuICAgICAgLy8gaGFuZGxlIHNwZWNpZmljIG9wdGlvbnNcbiAgICAgIHNob3dIYW5kbGU6IHRydWUsXG4gICAgICBoYW5kbGVTaXplOiAyMCxcbiAgICAgIGhhbmRsZUNvbG9yOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpJyxcbiAgICB9O1xuXG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgdGhpcy5fbGlzdGVuZXJzID0gW107XG4gICAgdGhpcy5fYm91bmRpbmdDbGllbnRSZWN0ID0gbnVsbDtcbiAgICB0aGlzLl90b3VjaElkID0gbnVsbDtcbiAgICB0aGlzLl92YWx1ZSA9IG51bGw7XG4gICAgdGhpcy5fY2FudmFzV2lkdGggPSBudWxsO1xuICAgIHRoaXMuX2NhbnZhc0hlaWdodCA9IG51bGw7XG4gICAgLy8gZm9yIHByb3BvcnRpb25uYWwgbW9kZVxuICAgIHRoaXMuX2N1cnJlbnRNb3VzZVBvc2l0aW9uID0geyB4OiBudWxsLCB5OiBudWxsIH07XG4gICAgdGhpcy5fY3VycmVudFNsaWRlclBvc2l0aW9uID0gbnVsbDtcblxuICAgIHRoaXMuX29uTW91c2VEb3duID0gdGhpcy5fb25Nb3VzZURvd24uYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbk1vdXNlTW92ZSA9IHRoaXMuX29uTW91c2VNb3ZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25Nb3VzZVVwID0gdGhpcy5fb25Nb3VzZVVwLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLl9vblRvdWNoU3RhcnQgPSB0aGlzLl9vblRvdWNoU3RhcnQuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vblRvdWNoTW92ZSA9IHRoaXMuX29uVG91Y2hNb3ZlIC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uVG91Y2hFbmQgPSB0aGlzLl9vblRvdWNoRW5kLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLl9vblJlc2l6ZSA9IHRoaXMuX29uUmVzaXplLmJpbmQodGhpcyk7XG5cblxuICAgIHRoaXMuX2NyZWF0ZUVsZW1lbnQoKTtcblxuICAgIC8vIGluaXRpYWxpemVcbiAgICB0aGlzLl9yZXNpemVFbGVtZW50KCk7XG4gICAgdGhpcy5fc2V0U2NhbGVzKCk7XG4gICAgdGhpcy5fYmluZEV2ZW50cygpO1xuICAgIHRoaXMuX29uUmVzaXplKCk7XG4gICAgdGhpcy5fdXBkYXRlVmFsdWUodGhpcy5wYXJhbXMuZGVmYXVsdCwgZmFsc2UsIHRydWUpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX29uUmVzaXplKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDdXJyZW50IHZhbHVlIG9mIHRoZSBzbGlkZXIuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbCkge1xuICAgIHRoaXMuX3VwZGF0ZVZhbHVlKHZhbCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhlIHNsaWRlciB0byBpdHMgZGVmYXVsdCB2YWx1ZS5cbiAgICovXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuX3VwZGF0ZVZhbHVlKHRoaXMucGFyYW1zLmRlZmF1bHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2l6ZSB0aGUgc2xpZGVyLlxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gd2lkdGggLSBOZXcgd2lkdGggb2YgdGhlIHNsaWRlci5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodCAtIE5ldyBoZWlnaHQgb2YgdGhlIHNsaWRlci5cbiAgICovXG4gIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy5wYXJhbXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLnBhcmFtcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICB0aGlzLl9yZXNpemVFbGVtZW50KCk7XG4gICAgdGhpcy5fc2V0U2NhbGVzKCk7XG4gICAgdGhpcy5fb25SZXNpemUoKTtcbiAgICB0aGlzLl91cGRhdGVWYWx1ZSh0aGlzLl92YWx1ZSwgdHJ1ZSwgdHJ1ZSk7XG4gIH1cblxuICBfdXBkYXRlVmFsdWUodmFsdWUsIGZvcmNlUmVuZGVyID0gZmFsc2UsIHNpbGVudCA9IGZhbHNlKSB7XG4gICAgY29uc3QgeyBjYWxsYmFjayB9ID0gdGhpcy5wYXJhbXM7XG4gICAgY29uc3QgY2xpcHBlZFZhbHVlID0gdGhpcy5jbGlwcGVyKHZhbHVlKTtcblxuICAgIC8vIGlmIHJlc2l6ZSByZW5kZXIgYnV0IGRvbid0IHRyaWdnZXIgY2FsbGJhY2tcbiAgICBpZiAoY2xpcHBlZFZhbHVlID09PSB0aGlzLl92YWx1ZSAmJiBmb3JjZVJlbmRlciA9PT0gdHJ1ZSlcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLl9yZW5kZXIoY2xpcHBlZFZhbHVlKSk7XG5cbiAgICAvLyB0cmlnZ2VyIGNhbGxiYWNrXG4gICAgaWYgKGNsaXBwZWRWYWx1ZSAhPT0gdGhpcy5fdmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gY2xpcHBlZFZhbHVlO1xuXG4gICAgICBpZiAoIXNpbGVudClcbiAgICAgICAgY2FsbGJhY2soY2xpcHBlZFZhbHVlKTtcblxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuX3JlbmRlcihjbGlwcGVkVmFsdWUpKTtcbiAgICB9XG4gIH1cblxuICBfY3JlYXRlRWxlbWVudCgpIHtcbiAgICBjb25zdCB7IGNvbnRhaW5lciB9ID0gdGhpcy5wYXJhbXM7XG4gICAgdGhpcy4kY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgdGhpcy5jdHggPSB0aGlzLiRjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIGlmIChjb250YWluZXIgaW5zdGFuY2VvZiBFbGVtZW50KVxuICAgICAgdGhpcy4kY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIGVsc2VcbiAgICAgIHRoaXMuJGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyKTtcblxuICAgIHRoaXMuJGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLiRjYW52YXMpO1xuICB9XG5cbiAgX3Jlc2l6ZUVsZW1lbnQoKSB7XG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSB0aGlzLnBhcmFtcztcblxuICAgIC8vIGxvZ2ljYWwgYW5kIHBpeGVsIHNpemUgb2YgdGhlIGNhbnZhc1xuICAgIHRoaXMuX3BpeGVsUmF0aW8gPSAoZnVuY3Rpb24oY3R4KSB7XG4gICAgY29uc3QgZFBSID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcbiAgICBjb25zdCBiUFIgPSBjdHgud2Via2l0QmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fFxuICAgICAgY3R4Lm1vekJhY2tpbmdTdG9yZVBpeGVsUmF0aW8gfHxcbiAgICAgIGN0eC5tc0JhY2tpbmdTdG9yZVBpeGVsUmF0aW8gfHxcbiAgICAgIGN0eC5vQmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fFxuICAgICAgY3R4LmJhY2tpbmdTdG9yZVBpeGVsUmF0aW8gfHwgMTtcblxuICAgICAgcmV0dXJuIGRQUiAvIGJQUjtcbiAgICB9KHRoaXMuY3R4KSk7XG5cbiAgICB0aGlzLl9jYW52YXNXaWR0aCA9IHdpZHRoICogdGhpcy5fcGl4ZWxSYXRpbztcbiAgICB0aGlzLl9jYW52YXNIZWlnaHQgPSBoZWlnaHQgKiB0aGlzLl9waXhlbFJhdGlvO1xuXG4gICAgdGhpcy5jdHguY2FudmFzLndpZHRoID0gdGhpcy5fY2FudmFzV2lkdGg7XG4gICAgdGhpcy5jdHguY2FudmFzLmhlaWdodCA9IHRoaXMuX2NhbnZhc0hlaWdodDtcbiAgICB0aGlzLmN0eC5jYW52YXMuc3R5bGUud2lkdGggPSBgJHt3aWR0aH1weGA7XG4gICAgdGhpcy5jdHguY2FudmFzLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH1weGA7XG4gIH1cblxuICBfb25SZXNpemUoKSB7XG4gICAgdGhpcy5fYm91bmRpbmdDbGllbnRSZWN0ID0gdGhpcy4kY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB9XG5cbiAgX3NldFNjYWxlcygpIHtcbiAgICBjb25zdCB7IG9yaWVudGF0aW9uLCB3aWR0aCwgaGVpZ2h0LCBtaW4sIG1heCwgc3RlcCB9ID0gdGhpcy5wYXJhbXM7XG4gICAgLy8gZGVmaW5lIHRyYW5zZmVydCBmdW5jdGlvbnNcbiAgICBjb25zdCBzY3JlZW5TaXplID0gb3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJyA/XG4gICAgICB3aWR0aCA6IGhlaWdodDtcblxuICAgIGNvbnN0IGNhbnZhc1NpemUgPSBvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnID9cbiAgICAgIHRoaXMuX2NhbnZhc1dpZHRoIDogdGhpcy5fY2FudmFzSGVpZ2h0O1xuXG4gICAgY29uc3QgZG9tYWluID0gb3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJyA/IFttaW4sIG1heF0gOiBbbWF4LCBtaW5dO1xuICAgIGNvbnN0IHNjcmVlblJhbmdlID0gWzAsIHNjcmVlblNpemVdO1xuICAgIGNvbnN0IGNhbnZhc1JhbmdlID0gWzAsIGNhbnZhc1NpemVdO1xuXG4gICAgdGhpcy5zY3JlZW5TY2FsZSA9IGdldFNjYWxlKGRvbWFpbiwgc2NyZWVuUmFuZ2UpO1xuICAgIHRoaXMuY2FudmFzU2NhbGUgPSBnZXRTY2FsZShkb21haW4sIGNhbnZhc1JhbmdlKTtcbiAgICB0aGlzLmNsaXBwZXIgPSBnZXRDbGlwcGVyKG1pbiwgbWF4LCBzdGVwKTtcbiAgfVxuXG4gIF9iaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9vbk1vdXNlRG93bik7XG4gICAgdGhpcy4kY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9vblRvdWNoU3RhcnQpO1xuICB9XG5cbiAgX29uU3RhcnQoeCwgeSkge1xuICAgIGxldCBzdGFydGVkID0gbnVsbDtcblxuICAgIHN3aXRjaCAodGhpcy5wYXJhbXMubW9kZSkge1xuICAgICAgY2FzZSAnanVtcCc6XG4gICAgICAgIHRoaXMuX3VwZGF0ZVBvc2l0aW9uKHgsIHkpO1xuICAgICAgICBzdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdwcm9wb3J0aW9ubmFsJzpcbiAgICAgICAgdGhpcy5fY3VycmVudE1vdXNlUG9zaXRpb24ueCA9IHg7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRNb3VzZVBvc2l0aW9uLnkgPSB5O1xuICAgICAgICBzdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdoYW5kbGUnOlxuICAgICAgICBjb25zdCBvcmllbnRhdGlvbiA9IHRoaXMucGFyYW1zLm9yaWVudGF0aW9uO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuc2NyZWVuU2NhbGUodGhpcy5fdmFsdWUpO1xuICAgICAgICBjb25zdCBjb21wYXJlID0gb3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJyA/IHggOiB5O1xuICAgICAgICBjb25zdCBkZWx0YSA9IHRoaXMucGFyYW1zLmhhbmRsZVNpemUgLyAyO1xuXG4gICAgICAgIGlmIChjb21wYXJlIDwgcG9zaXRpb24gKyBkZWx0YSAmJiBjb21wYXJlID4gcG9zaXRpb24gLSBkZWx0YSkge1xuICAgICAgICAgIHRoaXMuX2N1cnJlbnRNb3VzZVBvc2l0aW9uLnggPSB4O1xuICAgICAgICAgIHRoaXMuX2N1cnJlbnRNb3VzZVBvc2l0aW9uLnkgPSB5O1xuICAgICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnRlZDtcbiAgfVxuXG4gIF9vbk1vdmUoeCwgeSkge1xuICAgIHN3aXRjaCAodGhpcy5wYXJhbXMubW9kZSkge1xuICAgICAgY2FzZSAnanVtcCc6XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncHJvcG9ydGlvbm5hbCc6XG4gICAgICBjYXNlICdoYW5kbGUnOlxuICAgICAgICBjb25zdCBkZWx0YVggPSB4IC0gdGhpcy5fY3VycmVudE1vdXNlUG9zaXRpb24ueDtcbiAgICAgICAgY29uc3QgZGVsdGFZID0geSAtIHRoaXMuX2N1cnJlbnRNb3VzZVBvc2l0aW9uLnk7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRNb3VzZVBvc2l0aW9uLnggPSB4O1xuICAgICAgICB0aGlzLl9jdXJyZW50TW91c2VQb3NpdGlvbi55ID0geTtcblxuICAgICAgICB4ID0gdGhpcy5zY3JlZW5TY2FsZSh0aGlzLl92YWx1ZSkgKyBkZWx0YVg7XG4gICAgICAgIHkgPSB0aGlzLnNjcmVlblNjYWxlKHRoaXMuX3ZhbHVlKSArIGRlbHRhWTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgdGhpcy5fdXBkYXRlUG9zaXRpb24oeCwgeSk7XG4gIH1cblxuICBfb25FbmQoKSB7XG4gICAgc3dpdGNoICh0aGlzLnBhcmFtcy5tb2RlKSB7XG4gICAgICBjYXNlICdqdW1wJzpcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdwcm9wb3J0aW9ubmFsJzpcbiAgICAgIGNhc2UgJ2hhbmRsZSc6XG4gICAgICAgIHRoaXMuX2N1cnJlbnRNb3VzZVBvc2l0aW9uLnggPSBudWxsO1xuICAgICAgICB0aGlzLl9jdXJyZW50TW91c2VQb3NpdGlvbi55ID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gbW91c2UgZXZlbnRzXG4gIF9vbk1vdXNlRG93bihlKSB7XG4gICAgY29uc3QgcGFnZVggPSBlLnBhZ2VYO1xuICAgIGNvbnN0IHBhZ2VZID0gZS5wYWdlWTtcbiAgICBjb25zdCB4ID0gcGFnZVggLSB0aGlzLl9ib3VuZGluZ0NsaWVudFJlY3QubGVmdDtcbiAgICBjb25zdCB5ID0gcGFnZVkgLSB0aGlzLl9ib3VuZGluZ0NsaWVudFJlY3QudG9wO1xuXG4gICAgaWYgKHRoaXMuX29uU3RhcnQoeCwgeSkgPT09IHRydWUpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9vbk1vdXNlTW92ZSk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX29uTW91c2VVcCk7XG4gICAgfVxuICB9XG5cbiAgX29uTW91c2VNb3ZlKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIHByZXZlbnQgdGV4dCBzZWxlY3Rpb25cblxuICAgIGNvbnN0IHBhZ2VYID0gZS5wYWdlWDtcbiAgICBjb25zdCBwYWdlWSA9IGUucGFnZVk7XG4gICAgbGV0IHggPSBwYWdlWCAtIHRoaXMuX2JvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0OztcbiAgICBsZXQgeSA9IHBhZ2VZIC0gdGhpcy5fYm91bmRpbmdDbGllbnRSZWN0LnRvcDs7XG5cbiAgICB0aGlzLl9vbk1vdmUoeCwgeSk7XG4gIH1cblxuICBfb25Nb3VzZVVwKGUpIHtcbiAgICB0aGlzLl9vbkVuZCgpO1xuXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX29uTW91c2VNb3ZlKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX29uTW91c2VVcCk7XG4gIH1cblxuICAvLyB0b3VjaCBldmVudHNcbiAgX29uVG91Y2hTdGFydChlKSB7XG4gICAgaWYgKHRoaXMuX3RvdWNoSWQgIT09IG51bGwpIHJldHVybjtcblxuICAgIGNvbnN0IHRvdWNoID0gZS50b3VjaGVzWzBdO1xuICAgIHRoaXMuX3RvdWNoSWQgPSB0b3VjaC5pZGVudGlmaWVyO1xuXG4gICAgY29uc3QgcGFnZVggPSB0b3VjaC5wYWdlWDtcbiAgICBjb25zdCBwYWdlWSA9IHRvdWNoLnBhZ2VZO1xuICAgIGNvbnN0IHggPSBwYWdlWCAtIHRoaXMuX2JvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0O1xuICAgIGNvbnN0IHkgPSBwYWdlWSAtIHRoaXMuX2JvdW5kaW5nQ2xpZW50UmVjdC50b3A7XG5cbiAgICBpZiAodGhpcy5fb25TdGFydCh4LCB5KSA9PT0gdHJ1ZSkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuX29uVG91Y2hNb3ZlKTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuX29uVG91Y2hFbmQpO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy5fb25Ub3VjaEVuZCk7XG4gICAgfVxuICB9XG5cbiAgX29uVG91Y2hNb3ZlKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIHByZXZlbnQgdGV4dCBzZWxlY3Rpb25cblxuICAgIGNvbnN0IHRvdWNoZXMgPSBBcnJheS5mcm9tKGUudG91Y2hlcyk7XG4gICAgY29uc3QgdG91Y2ggPSB0b3VjaGVzLmZpbHRlcigodCkgPT4gdC5pZGVudGlmaWVyID09PSB0aGlzLl90b3VjaElkKVswXTtcblxuICAgIGlmICh0b3VjaCkge1xuICAgICAgY29uc3QgcGFnZVggPSB0b3VjaC5wYWdlWDtcbiAgICAgIGNvbnN0IHBhZ2VZID0gdG91Y2gucGFnZVk7XG4gICAgICBjb25zdCB4ID0gcGFnZVggLSB0aGlzLl9ib3VuZGluZ0NsaWVudFJlY3QubGVmdDtcbiAgICAgIGNvbnN0IHkgPSBwYWdlWSAtIHRoaXMuX2JvdW5kaW5nQ2xpZW50UmVjdC50b3A7XG5cbiAgICAgIHRoaXMuX29uTW92ZSh4LCB5KTtcbiAgICB9XG4gIH1cblxuICBfb25Ub3VjaEVuZChlKSB7XG4gICAgY29uc3QgdG91Y2hlcyA9IEFycmF5LmZyb20oZS50b3VjaGVzKTtcbiAgICBjb25zdCB0b3VjaCA9IHRvdWNoZXMuZmlsdGVyKCh0KSA9PiB0LmlkZW50aWZpZXIgPT09IHRoaXMuX3RvdWNoSWQpWzBdO1xuXG4gICAgaWYgKHRvdWNoID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX29uRW5kKCk7XG4gICAgICB0aGlzLl90b3VjaElkID0gbnVsbDtcblxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuX29uVG91Y2hNb3ZlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuX29uVG91Y2hFbmQpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy5fb25Ub3VjaEVuZCk7XG5cbiAgICB9XG4gIH1cblxuICBfdXBkYXRlUG9zaXRpb24oeCwgeSkge1xuICAgIGNvbnN0IHvCoG9yaWVudGF0aW9uLCBoZWlnaHQgfSA9IHRoaXMucGFyYW1zO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gb3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJyA/IHggOiB5O1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5zY3JlZW5TY2FsZS5pbnZlcnQocG9zaXRpb24pO1xuXG4gICAgdGhpcy5fdXBkYXRlVmFsdWUodmFsdWUpO1xuICB9XG5cbiAgX3JlbmRlcihjbGlwcGVkVmFsdWUpIHtcbiAgICBjb25zdCB7IGJhY2tncm91bmRDb2xvciwgZm9yZWdyb3VuZENvbG9yLCBvcmllbnRhdGlvbiB9ID0gdGhpcy5wYXJhbXM7XG4gICAgY29uc3QgY2FudmFzUG9zaXRpb24gPSBNYXRoLnJvdW5kKHRoaXMuY2FudmFzU2NhbGUoY2xpcHBlZFZhbHVlKSk7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLl9jYW52YXNXaWR0aDtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLl9jYW52YXNIZWlnaHQ7XG4gICAgY29uc3QgY3R4ID0gdGhpcy5jdHg7XG5cbiAgICBjdHguc2F2ZSgpO1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAvLyBiYWNrZ3JvdW5kXG4gICAgY3R4LmZpbGxTdHlsZSA9IGJhY2tncm91bmRDb2xvcjtcbiAgICBjdHguZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAvLyBmb3JlZ3JvdW5kXG4gICAgY3R4LmZpbGxTdHlsZSA9IGZvcmVncm91bmRDb2xvcjtcblxuICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKVxuICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhc1Bvc2l0aW9uLCBoZWlnaHQpO1xuICAgIGVsc2VcbiAgICAgIGN0eC5maWxsUmVjdCgwLCBjYW52YXNQb3NpdGlvbiwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAvLyBtYXJrZXJzXG4gICAgY29uc3QgbWFya2VycyA9IHRoaXMucGFyYW1zLm1hcmtlcnM7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hcmtlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IG1hcmtlciA9IG1hcmtlcnNbaV07XG4gICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuY2FudmFzU2NhbGUobWFya2VyKTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNyknO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuXG4gICAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICBjdHgubW92ZVRvKHBvc2l0aW9uIC0gMC41LCAxKTtcbiAgICAgICAgY3R4LmxpbmVUbyhwb3NpdGlvbiAtIDAuNSwgaGVpZ2h0IC0gMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdHgubW92ZVRvKDEsIGhlaWdodCAtIHBvc2l0aW9uICsgMC41KTtcbiAgICAgICAgY3R4LmxpbmVUbyh3aWR0aCAtIDEsIGhlaWdodCAtIHBvc2l0aW9uICsgMC41KTtcbiAgICAgIH1cblxuICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH1cblxuICAgIC8vIGhhbmRsZSBtb2RlXG4gICAgaWYgKHRoaXMucGFyYW1zLm1vZGUgPT09ICdoYW5kbGUnICYmIHRoaXMucGFyYW1zLnNob3dIYW5kbGUpIHtcbiAgICAgIGNvbnN0IGRlbHRhID0gdGhpcy5wYXJhbXMuaGFuZGxlU2l6ZSAqIHRoaXMuX3BpeGVsUmF0aW8gLyAyO1xuICAgICAgY29uc3Qgc3RhcnQgPSBjYW52YXNQb3NpdGlvbiAtIGRlbHRhO1xuICAgICAgY29uc3QgZW5kID0gY2FudmFzUG9zaXRpb24gKyBkZWx0YTtcblxuICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLnBhcmFtcy5oYW5kbGVDb2xvcjtcblxuICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgY3R4LmZpbGxSZWN0KHN0YXJ0LCAwLCBlbmQgLSBzdGFydCwgaGVpZ2h0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN0eC5maWxsUmVjdCgwLCBzdGFydCwgd2lkdGgsIGVuZCAtIHN0YXJ0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjdHgucmVzdG9yZSgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNsaWRlcjtcbiIsIi8qKlxuICogQG1vZHVsZSBndWktY29tcG9uZW50c1xuICovXG5leHBvcnQgeyBkZWZhdWx0IGFzIFNsaWRlciB9IGZyb20gJy4vU2xpZGVyJztcbiJdfQ==
