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

var _display2 = require('../mixins/display');

var _display3 = _interopRequireDefault(_display2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AudioContext = window.AudioContext || window.webkitAudioContext;

/** @module basic-controllers */

var defaults = {
  label: 'Drag and drop audio files',
  labelProcess: 'process...',
  audioContext: null,
  container: null,
  callback: null
};

/**
 * Drag and drop zone for audio files returning `AudioBuffer`s and/or JSON
 * descriptor data.
 *
 * @param {Object} config - Override default parameters.
 * @param {String} [config.label='Drag and drop audio files'] - Label of the
 *  controller.
 * @param {String} [config.labelProcess='process...'] - Label of the controller
 *  while audio files are decoded.
 * @param {AudioContext} [config.audioContext=null] - Optionnal audio context
 *  to use in order to decode audio files.
 * @param {String|Element|basic-controller~Group} [config.container=null] -
 *  Container of the controller.
 * @param {Function} [config.callback=null] - Callback to be executed when the
 *  value changes.
 *
 * @example
 * import * as controllers from 'basic-controllers';
 *
 * const dragAndDrop = new controllers.DragAndDrop({
 *   container: '#container',
 *   callback: (results) => console.log(results),
 * });
 */

var DragAndDrop = function (_display) {
  _inherits(DragAndDrop, _display);

  function DragAndDrop(options) {
    _classCallCheck(this, DragAndDrop);

    var _this = _possibleConstructorReturn(this, (DragAndDrop.__proto__ || Object.getPrototypeOf(DragAndDrop)).call(this, 'drag-and-drop', defaults, options));

    _this._value = null;

    if (!_this.params.audioContext) _this.params.audioContext = new AudioContext();

    _get(DragAndDrop.prototype.__proto__ || Object.getPrototypeOf(DragAndDrop.prototype), 'initialize', _this).call(_this);
    return _this;
  }

  /**
   * Get the last results
   * @type {Object<String, AudioBuffer|JSON>}
   * @readonly
   */


  _createClass(DragAndDrop, [{
    key: 'render',
    value: function render() {
      var label = this.params.label;

      var content = '\n      <div class="drop-zone">\n        <p class="label">' + label + '</p>\n      </div>\n    ';

      this.$el = _get(DragAndDrop.prototype.__proto__ || Object.getPrototypeOf(DragAndDrop.prototype), 'render', this).call(this);
      this.$el.innerHTML = content;
      this.$dropZone = this.$el.querySelector('.drop-zone');
      this.$label = this.$el.querySelector('.label');

      this._bindEvents();

      return this.$el;
    }
  }, {
    key: '_bindEvents',
    value: function _bindEvents() {
      var _this2 = this;

      this.$dropZone.addEventListener('dragover', function (e) {
        e.preventDefault();
        e.stopPropagation();

        _this2.$dropZone.classList.add('drag');
        e.dataTransfer.dropEffect = 'copy';
      }, false);

      this.$dropZone.addEventListener('dragleave', function (e) {
        e.preventDefault();
        e.stopPropagation();

        _this2.$dropZone.classList.remove('drag');
      }, false);

      this.$dropZone.addEventListener('drop', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var files = Array.from(e.dataTransfer.files);
        var audioFiles = files.filter(function (file) {
          if (/^audio/.test(file.type)) {
            file.shortType = 'audio';
            return true;
          } else if (/json$/.test(file.type)) {
            file.shortType = 'json';
            return true;
          }

          return false;
        });

        var results = {};
        var counter = 0;

        _this2.$label.textContent = _this2.params.labelProcess;

        var testEnd = function testEnd() {
          counter += 1;

          if (counter === audioFiles.length) {
            _this2._value = results;
            _this2.executeListeners(results);

            _this2.$dropZone.classList.remove('drag');
            _this2.$label.textContent = _this2.params.label;
          }
        };

        files.forEach(function (file, index) {
          var reader = new FileReader();

          reader.onload = function (e) {
            if (file.shortType === 'json') {
              results[file.name] = JSON.parse(e.target.result);
              testEnd();
            } else if (file.shortType === 'audio') {
              _this2.params.audioContext.decodeAudioData(e.target.result).then(function (audioBuffer) {
                results[file.name] = audioBuffer;
                testEnd();
              }).catch(function (err) {
                results[file.name] = null;
                testEnd();
              });
            }
          };

          if (file.shortType === 'json') reader.readAsText(file);else if (file.shortType === 'audio') reader.readAsArrayBuffer(file);
        });
      }, false);
    }
  }, {
    key: 'value',
    get: function get() {
      return this._value;
    }
  }]);

  return DragAndDrop;
}((0, _display3.default)(_BaseComponent2.default));

exports.default = DragAndDrop;

},{"../mixins/display":15,"./BaseComponent":1}],3:[function(require,module,exports){
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

},{"../mixins/container":14,"../mixins/display":15,"../utils/elements":16,"./BaseComponent":1}],4:[function(require,module,exports){
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

},{"../mixins/display":15,"../utils/elements":16,"./BaseComponent":1}],5:[function(require,module,exports){
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

},{"../mixins/display":15,"../utils/elements":16,"./BaseComponent":1}],6:[function(require,module,exports){
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
};
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

},{"../mixins/display":15,"../utils/elements":16,"./BaseComponent":1}],7:[function(require,module,exports){
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

var _guiComponents = require('@ircam/gui-components');

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
};
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

        _this2.executeListeners(_this2._value);
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

},{"../mixins/display":15,"./BaseComponent":1,"@ircam/gui-components":22}],8:[function(require,module,exports){
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
};
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

},{"../mixins/display":15,"./BaseComponent":1}],9:[function(require,module,exports){
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

},{"../mixins/display":15,"./BaseComponent":1}],10:[function(require,module,exports){
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

},{"../mixins/display":15,"../utils/elements":16,"./BaseComponent":1}],11:[function(require,module,exports){
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

},{"../mixins/display":15,"./BaseComponent":1}],12:[function(require,module,exports){
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

// map type names to constructors
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

var defaults = {
  container: 'body'
};

var Control = function (_container) {
  _inherits(Control, _container);

  function Control(config) {
    _classCallCheck(this, Control);

    var _this = _possibleConstructorReturn(this, (Control.__proto__ || Object.getPrototypeOf(Control)).call(this, 'control', defaults, config));

    var $container = _this.params.container;

    if (typeof $container === 'string') $container = document.querySelector($container);

    _this.$container = $container;
    return _this;
  }

  return Control;
}((0, _container3.default)(_BaseComponent2.default));

/** @module basic-controllers */

/**
 * Create a whole control surface from a json definition.
 *
 * @param {String|Element} container - Container of the controls.
 * @param {Object} - Definitions for the controls.
 * @return {Object} - A `Control` instance that behaves like a group without graphic.
 * @static
 *
 * @example
 * import * as controllers from 'basic-controllers';
 *
 * const definitions = [
 *   {
 *     id: 'my-slider',
 *     type: 'slider',
 *     label: 'My Slider',
 *     size: 'large',
 *     min: 0,
 *     max: 1000,
 *     step: 1,
 *     default: 253,
 *   }, {
 *     id: 'my-group',
 *     type: 'group',
 *     label: 'Group',
 *     default: 'opened',
 *     elements: [
 *       {
 *         id: 'my-number',
 *         type: 'number-box',
 *         default: 0.4,
 *         min: -1,
 *         max: 1,
 *         step: 0.01,
 *       }
 *     ],
 *   }
 * ];
 *
 * const controls = controllers.create('#container', definitions);
 *
 * // add a listener on all the component inside `my-group`
 * controls.addListener('my-group', (id, value) => console.log(id, value));
 *
 * // retrieve the instance of `my-number`
 * const myNumber = controls.getComponent('my-group/my-number');
 */


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

  var _root = new Control({ container: container });
  _parse(_root, definitions);

  return _root;
}

exports.default = create;

},{"./components/BaseComponent":1,"./components/Group":3,"./components/NumberBox":4,"./components/SelectButtons":5,"./components/SelectList":6,"./components/Slider":7,"./components/Text":8,"./components/Title":9,"./components/Toggle":10,"./components/TriggerButtons":11,"./mixins/container":14}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTheme = exports.create = exports.TriggerButtons = exports.Toggle = exports.Title = exports.Text = exports.Slider = exports.SelectList = exports.SelectButtons = exports.NumberBox = exports.DragAndDrop = exports.Group = exports.BaseComponent = exports.styles = undefined;

var _Group = require('./components/Group');

Object.defineProperty(exports, 'Group', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Group).default;
  }
});

var _DragAndDrop = require('./components/DragAndDrop');

Object.defineProperty(exports, 'DragAndDrop', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DragAndDrop).default;
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

},{"./components/BaseComponent":1,"./components/DragAndDrop":2,"./components/Group":3,"./components/NumberBox":4,"./components/SelectButtons":5,"./components/SelectList":6,"./components/Slider":7,"./components/Text":8,"./components/Title":9,"./components/Toggle":10,"./components/TriggerButtons":11,"./factory":12,"./mixins/display":15,"./utils/styles":18}],14:[function(require,module,exports){
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
       * Return a child of the group recursively according to the given `id`,
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

},{}],15:[function(require,module,exports){
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
 *  - `'light'` (default)
 *  - `'grey'`
 *  - `'dark'`
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

      // insert styles when the first controller is created
      var _this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

      if (controllers.size === 0) styles.insertStyleSheet();

      _this.resize = _this.resize.bind(_this);

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

        window.removeEventListener('resize', this.resize);
        window.addEventListener('resize', this.resize);

        return this.$el;
      }

      /** @private */

    }, {
      key: 'resize',
      value: function resize() {
        if (this.$el) {
          var boundingRect = this.$el.getBoundingClientRect();
          var width = boundingRect.width;
          var method = width > 600 ? 'remove' : 'add';

          this.$el.classList[method]('small');
        }
      }
    }]);

    return _class;
  }(superclass);
};

exports.default = display;

},{"../utils/styles":18}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var toggle = exports.toggle = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"toggle-element\" version=\"1.1\" viewBox=\"0 0 50 50\" preserveAspectRatio=\"none\">\n      <g class=\"x\">\n        <line x1=\"8\" y1=\"8\" x2=\"42\" y2=\"42\" stroke=\"white\" />\n        <line x1=\"8\" y1=\"42\" x2=\"42\" y2=\"8\" stroke=\"white\" />\n      </g>\n  </svg>\n";

var arrowRight = exports.arrowRight = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"arrow-right\" version=\"1.1\" viewBox=\"0 0 50 50\" preserveAspectRatio=\"none\">\n    <line x1=\"10\" y1=\"10\" x2=\"40\" y2=\"25\" />\n    <line x1=\"10\" y1=\"40\" x2=\"40\" y2=\"25\" />\n  </svg>\n";

var arrowLeft = exports.arrowLeft = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"arrow-left\" version=\"1.1\" viewBox=\"0 0 50 50\" preserveAspectRatio=\"none\">\n    <line x1=\"40\" y1=\"10\" x2=\"10\" y2=\"25\" />\n    <line x1=\"40\" y1=\"40\" x2=\"10\" y2=\"25\" />\n  </svg>\n";

var smallArrowRight = exports.smallArrowRight = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"small-arrow-right\" viewBox=\"0 0 50 50\">\n    <path d=\"M 20 15 L 35 25 L 20 35 Z\" />\n  </svg>\n";

var smallArrowBottom = exports.smallArrowBottom = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"small-arrow-bottom\" viewBox=\"0 0 50 50\">\n    <path d=\"M 15 17 L 35 17 L 25 32 Z\" />\n  </svg>\n";

},{}],17:[function(require,module,exports){
module.exports = " .basic-controllers { } .basic-controllers { width: 100%; max-width: 800px; height: 34px; padding: 3px; margin: 4px 0; background-color: #efefef; border: 1px solid #aaaaaa; box-sizing: border-box; border-radius: 2px; display: block; color: #464646; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .basic-controllers .label { font: italic normal 1.2em Quicksand, arial, sans-serif; line-height: 26px; overflow: hidden; text-align: right; padding: 0 8px 0 0; display: block; box-sizing: border-box; width: 24%; float: left; white-space: nowrap; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none; user-select: none; } .basic-controllers .inner-wrapper { display: -webkit-inline-flex; display: inline-flex; -webkit-flex-wrap: no-wrap; flex-wrap: no-wrap; width: 76%; float: left; } .basic-controllers.small { height: 48px; } .basic-controllers.small:not(.align-small) { height: auto; } .basic-controllers.small:not(.align-small) .label { width: 100%; float: none; text-align: left; line-height: 40px; } .basic-controllers.small:not(.align-small) .inner-wrapper { width: 100%; float: none; } .basic-controllers.small.align-small .label { display: block; margin-right: 20px; text-align: left; line-height: 40px; } .basic-controllers.small.align-small .inner-wrapper { display: inline-block; width: auto; } .basic-controllers .arrow-right, .basic-controllers .arrow-left { border-radius: 2px; width: 14px; height: 26px; cursor: pointer; background-color: #464646; } .basic-controllers .arrow-right line, .basic-controllers .arrow-left line { stroke-width: 3px; stroke: #ffffff; } .basic-controllers .arrow-right:hover, .basic-controllers .arrow-left:hover { background-color: #686868; } .basic-controllers .arrow-right:active, .basic-controllers .arrow-left:active { background-color: #909090; } .basic-controllers .small-arrow-right, .basic-controllers .small-arrow-bottom { width: 26px; height: 26px; cursor: pointer; } .basic-controllers .small-arrow-right path, .basic-controllers .small-arrow-bottom path { fill: #909090; } .basic-controllers .small-arrow-right:hover path, .basic-controllers .small-arrow-bottom:hover path { fill: #686868; } .basic-controllers .toggle-element { width: 26px; height: 26px; border-radius: 2px; background-color: #464646; cursor: pointer; } .basic-controllers .toggle-element:hover { background-color: #686868; } .basic-controllers .toggle-element line { stroke-width: 3px; } .basic-controllers .toggle-element .x { display: none; } .basic-controllers .toggle-element.active .x { display: block; } .basic-controllers .btn { display: block; text-align: center; font: normal normal 12px arial; text-decoration: none; height: 26px; line-height: 26px; background-color: #464646; border: none; color: #ffffff; margin: 0 4px 0 0; padding: 0; box-sizing: border-box; border-radius: 2px; cursor: pointer; -webkit-flex-grow: 1; flex-grow: 1; } .basic-controllers .btn:last-child { margin: 0; } .basic-controllers .btn:hover { background-color: #686868; } .basic-controllers .btn:active, .basic-controllers .btn.active { background-color: #909090; } .basic-controllers .btn:focus { outline: none; } .basic-controllers .number { height: 26px; display: inline-block; position: relative; font: normal normal 1.2em Quicksand, arial, sans-serif; vertical-align: top; border: none; background: none; color: #464646; padding: 0 4px; margin: 0; background-color: #f9f9f9; border-radius: 2px; box-sizing: border-box; } .basic-controllers .number:focus { outline: none; } .basic-controllers select { height: 26px; line-height: 26px; background-color: #f9f9f9; border-radius: 2px; border: none; vertical-align: top; padding: 0; margin: 0; } .basic-controllers select:focus { outline: none; } .basic-controllers input[type=text] { width: 100%; height: 26px; line-height: 26px; border: 0; padding: 0 4px; background-color: #f9f9f9; border-radius: 2px; color: #565656; } .basic-controllers.small .arrow-right, .basic-controllers.small .arrow-left { width: 24px; height: 40px; } .basic-controllers.small .toggle-element { width: 40px; height: 40px; } .basic-controllers.small .btn { height: 40px; line-height: 40px; } .basic-controllers.small .number { height: 40px; } .basic-controllers.small select { height: 40px; line-height: 40px; } .basic-controllers.small input[type=text] { height: 40px; line-height: 40px; } .basic-controllers.title { border: none !important; margin-bottom: 0; margin-top: 8px; padding-top: 8px; padding-bottom: 0; background-color: transparent !important; height: 25px; } .basic-controllers.title .label { font: normal bold 1.3em Quicksand, arial, sans-serif; height: 100%; overflow: hidden; text-align: left; padding: 0; width: 100%; box-sizing: border-box; -webkit-flex-grow: 1; flex-grow: 1; } .basic-controllers.group { height: auto; background-color: white; } .basic-controllers.group .group-header .label { font: normal bold 1.3em Quicksand, arial, sans-serif; height: 26px; line-height: 26px; overflow: hidden; text-align: left; padding: 0 0 0 36px; width: 100%; box-sizing: border-box; -webkit-flex-grow: 1; flex-grow: 1; float: none; cursor: pointer; } .basic-controllers.group .group-header .small-arrow-right { width: 26px; height: 26px; position: absolute; } .basic-controllers.group .group-header .small-arrow-bottom { width: 26px; height: 26px; position: absolute; } .basic-controllers.group .group-content { overflow: hidden; } .basic-controllers.group .group-content > div { margin: 4px auto; } .basic-controllers.group .group-content > div:last-child { margin-bottom: 0; } .basic-controllers.group.opened .group-header .small-arrow-right { display: none; } .basic-controllers.group.opened .group-header .small-arrow-bottom { display: block; } .basic-controllers.group.opened .group-content { display: block; } .basic-controllers.group.closed .group-header .small-arrow-right { display: block; } .basic-controllers.group.closed .group-header .small-arrow-bottom { display: none; } .basic-controllers.group.closed .group-content { display: none; } .basic-controllers.slider .range { height: 26px; display: inline-block; margin: 0; -webkit-flex-grow: 4; flex-grow: 4; position: relative; } .basic-controllers.slider .range canvas { position: absolute; top: 0; left: 0; } .basic-controllers.slider .number-wrapper { display: inline; height: 26px; text-align: right; -webkit-flex-grow: 3; flex-grow: 3; } .basic-controllers.slider .number-wrapper .number { left: 5px; width: 54px; text-align: right; } .basic-controllers.slider .number-wrapper .unit { font: italic normal 1em Quicksand, arial, sans-serif; line-height: 26px; height: 26px; width: 30px; display: inline-block; position: relative; padding-left: 5px; padding-right: 5px; color: #565656; } .basic-controllers.slider .number-wrapper .unit sup { line-height: 7px; } .basic-controllers.slider.slider-large .range { -webkit-flex-grow: 50; flex-grow: 50; } .basic-controllers.slider.slider-large .number-wrapper { -webkit-flex-grow: 1; flex-grow: 1; } .basic-controllers.slider.slider-small .range { -webkit-flex-grow: 2; flex-grow: 2; } .basic-controllers.slider.slider-small .number-wrapper { -webkit-flex-grow: 4; flex-grow: 4; } .basic-controllers.small.slider .range { height: 40px; } .basic-controllers.small.slider .number-wrapper { height: 40px; } .basic-controllers.small.slider .number-wrapper .unit { line-height: 40px; height: 40px; } .basic-controllers.number-box .number { width: 120px; margin: 0 10px; vertical-align: top; } .basic-controllers.select-list select { margin: 0 10px; width: 120px; font: normal normal 1.2em Quicksand, arial, sans-serif; color: #464646; } .basic-controllers.select-buttons .btn:first-of-type { margin-left: 4px; } .basic-controllers.text input[type=text] { font: normal normal 1.2em Quicksand, arial, sans-serif; color: #464646; } .basic-controllers.drag-and-drop { width: 100%; text-align: center; font-weight: bold; height: 100px; } .basic-controllers.drag-and-drop .drop-zone { border: 1px dotted #c4c4c4; border-radius: 2px; transition: background 200ms; height: 90px; } .basic-controllers.drag-and-drop .drop-zone.drag { background-color: #c4c4c4; } .basic-controllers.drag-and-drop .label { display: block; width: 100%; height: 90px; line-height: 90px; margin: 0; padding: 0; text-align: center; } .basic-controllers.drag-and-drop.process .label { display: none; } .basic-controllers.small.drag-and-drop { height: 120px; } .basic-controllers.small.drag-and-drop .drop-zone { height: 110px; } .basic-controllers.small.drag-and-drop .label { display: block; width: 100%; height: 110px; line-height: 110px; margin: 0; padding: 0; text-align: center; } .basic-controllers.grey { background-color: #363636; border: 1px solid #585858; color: rgba(255, 255, 255, 0.95); } .basic-controllers.grey .toggle-element { background-color: #efefef; } .basic-controllers.grey .toggle-element line { stroke: #363636; } .basic-controllers.grey .toggle-element:hover { background-color: #cdcdcd; } .basic-controllers.grey .arrow-right, .basic-controllers.grey .arrow-left { background-color: #efefef; } .basic-controllers.grey .arrow-right line, .basic-controllers.grey .arrow-left line { stroke: #363636; } .basic-controllers.grey .arrow-right:hover, .basic-controllers.grey .arrow-left:hover { background-color: #cdcdcd; } .basic-controllers.grey .arrow-right:active, .basic-controllers.grey .arrow-left:active { background-color: #ababab; } .basic-controllers.grey .small-arrow-right path, .basic-controllers.grey .small-arrow-bottom path { fill: #ababab; } .basic-controllers.grey .small-arrow-right:hover path, .basic-controllers.grey .small-arrow-bottom:hover path { fill: #cdcdcd; } .basic-controllers.grey .number, .basic-controllers.grey select, .basic-controllers.grey input[type=text] { color: rgba(255, 255, 255, 0.95); background-color: #454545; } .basic-controllers.grey .btn { background-color: #efefef; color: #363636; } .basic-controllers.grey .btn:hover { background-color: #cdcdcd; } .basic-controllers.grey .btn:active, .basic-controllers.grey .btn.active { background-color: #ababab; } .basic-controllers.grey.slider .inner-wrapper .number-wrapper .unit { color: #bcbcbc; } .basic-controllers.grey.group { background-color: #505050; } .basic-controllers.grey.drag-and-drop .drop-zone { border: 1px dotted #727272; } .basic-controllers.grey.drag-and-drop .drop-zone.drag { background-color: #727272; } .basic-controllers.dark { background-color: #242424; border: 1px solid #282828; color: #ffffff; } .basic-controllers.dark .toggle-element { background-color: #464646; } .basic-controllers.dark .toggle-element line { stroke: #ffffff; } .basic-controllers.dark .toggle-element:hover { background-color: #686868; } .basic-controllers.dark .arrow-right, .basic-controllers.dark .arrow-left { background-color: #464646; } .basic-controllers.dark .arrow-right line, .basic-controllers.dark .arrow-left line { stroke: #ffffff; } .basic-controllers.dark .arrow-right:hover, .basic-controllers.dark .arrow-left:hover { background-color: #686868; } .basic-controllers.dark .arrow-right:active, .basic-controllers.dark .arrow-left:active { background-color: #909090; } .basic-controllers.dark .small-arrow-right path, .basic-controllers.dark .small-arrow-bottom path { fill: #909090; } .basic-controllers.dark .small-arrow-right:hover path, .basic-controllers.dark .small-arrow-bottom:hover path { fill: #686868; } .basic-controllers.dark .number, .basic-controllers.dark select, .basic-controllers.dark input[type=text] { color: #ffffff; background-color: #333333; } .basic-controllers.dark .btn { background-color: #464646; color: #ffffff; } .basic-controllers.dark .btn:hover { background-color: #686868; } .basic-controllers.dark .btn:active, .basic-controllers.dark .btn.active { background-color: #909090; } .basic-controllers.dark.slider .inner-wrapper .number-wrapper .unit { color: #cdcdcd; } .basic-controllers.dark.group { background-color: #3e3e3e; } .basic-controllers.dark.drag-and-drop .drop-zone { border: 1px dotted #424242; } .basic-controllers.dark.drag-and-drop .drop-zone.drag { background-color: #424242; } ";
},{}],18:[function(require,module,exports){
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

},{"../../package.json":23,"./styles-declarations.js":17}],19:[function(require,module,exports){
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

    if (active) numberBox.value = Math.PI;
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

// group
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

var title3 = new controllers.Title({
  label: 'DragNDrop',
  container: '#container'
});

var dragNDrop = new controllers.DragAndDrop({
  container: '#container',
  callback: function callback(results) {
    return console.log(results);
  }
});

},{"../../../dist/index":13}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Breakpoint = function () {
  function Breakpoint(options) {
    _classCallCheck(this, Breakpoint);

    var defaults = {
      callback: function callback(value) {},
      width: 300,
      height: 150,
      container: 'body',
      default: [],
      radius: 4
    };

    this.params = Object.assign({}, defaults, options);

    this._values = {
      norm: [],
      logical: [],
      displayed: []
    };

    this._createElement();

    // initialize
    this._resizeElement();

    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);

    this._onResize = this._onResize.bind(this);

    this._onResize();
    this._bindEvents();

    window.addEventListener('resize', this._onResize);
  }

  _createClass(Breakpoint, [{
    key: '_createElement',


    /** @note - same as Slider */
    value: function _createElement() {
      var container = this.params.container;

      this.$canvas = document.createElement('canvas');
      this.ctx = this.$canvas.getContext('2d');

      if (container instanceof Element) this.$container = container;else this.$container = document.querySelector(container);

      this.$container.appendChild(this.$canvas);
    }

    /** @note - same as Slider */

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
    key: 'resize',
    value: function resize(width, height) {}

    // update this.dots.displayed according to new width and height


    /** @note - same as Slider */

  }, {
    key: '_onResize',
    value: function _onResize() {
      this._boundingClientRect = this.$canvas.getBoundingClientRect();
    }
  }, {
    key: '_bindEvents',
    value: function _bindEvents() {
      this.$canvas.addEventListener('mousedown', this._onMouseDown);
    }
  }, {
    key: '_onMouseDown',
    value: function _onMouseDown(e) {
      var pageX = e.pageX;
      var pageY = e.pageY;
      var x = pageX - this._boundingClientRect.left;
      var y = pageY - this._boundingClientRect.top;

      if (this._testHit(x, y)) {
        // bind mousemove and mouseup
        console.log('hit');
      } else {
        // create a new point
        console.log('create dot');
        this._createDot(x, y);
      }
    }
  }, {
    key: '_onMouseMove',
    value: function _onMouseMove() {}
  }, {
    key: '_onMouseUp',
    value: function _onMouseUp() {}

    // test if given x, y (in pixels) match some already displayed values

  }, {
    key: '_testHit',
    value: function _testHit(x, y) {
      var displayedValues = this._values.displayed;
      var radius = this.params.radius;

      for (var i = 0; i < displayedValues.length; i++) {
        var dot = displayedValues[i];
        var dx = dot[0] - x;
        var dy = dot[1] - y;
        var mag = Math.sqrt(dx * dx + dy * dy);

        if (mag <= radius) return true;
      }

      return false;
    }
  }, {
    key: '_createDot',
    value: function _createDot(x, y) {
      var normX = x / this.params.width;
      var normY = y / this.p$arams.height;
    }
  }, {
    key: 'values',
    get: function get() {},
    set: function set(values) {}
  }]);

  return Breakpoint;
}();

exports.default = Breakpoint;

},{}],21:[function(require,module,exports){
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
    this._updateValue(this.params.default, true, true);

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

      var silent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var forceRender = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var callback = this.params.callback;

      var clippedValue = this.clipper(value);

      // resize render but don't trigger callback
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

      this._updateValue(value, false, true);
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
      // don't trigger the callback when value is set from outside
      this._updateValue(val, true, false);
    }
  }]);

  return Slider;
}();

exports.default = Slider;

},{}],22:[function(require,module,exports){
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

var _Breakpoint = require('./Breakpoint');

Object.defineProperty(exports, 'Breakpoint', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Breakpoint).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./Breakpoint":20,"./Slider":21}],23:[function(require,module,exports){
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
    "@ircam/gui-components": "^1.0.3"
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

},{}]},{},[19])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLi9kaXN0L2NvbXBvbmVudHMvQmFzZUNvbXBvbmVudC5qcyIsIi4uLy4uL2Rpc3QvY29tcG9uZW50cy9EcmFnQW5kRHJvcC5qcyIsIi4uLy4uL2Rpc3QvY29tcG9uZW50cy9Hcm91cC5qcyIsIi4uLy4uL2Rpc3QvY29tcG9uZW50cy9OdW1iZXJCb3guanMiLCIuLi8uLi9kaXN0L2NvbXBvbmVudHMvU2VsZWN0QnV0dG9ucy5qcyIsIi4uLy4uL2Rpc3QvY29tcG9uZW50cy9TZWxlY3RMaXN0LmpzIiwiLi4vLi4vZGlzdC9jb21wb25lbnRzL1NsaWRlci5qcyIsIi4uLy4uL2Rpc3QvY29tcG9uZW50cy9UZXh0LmpzIiwiLi4vLi4vZGlzdC9jb21wb25lbnRzL1RpdGxlLmpzIiwiLi4vLi4vZGlzdC9jb21wb25lbnRzL1RvZ2dsZS5qcyIsIi4uLy4uL2Rpc3QvY29tcG9uZW50cy9UcmlnZ2VyQnV0dG9ucy5qcyIsIi4uLy4uL2Rpc3QvZmFjdG9yeS5qcyIsIi4uLy4uL2Rpc3QvaW5kZXguanMiLCIuLi8uLi9kaXN0L21peGlucy9jb250YWluZXIuanMiLCIuLi8uLi9kaXN0L21peGlucy9kaXNwbGF5LmpzIiwiLi4vLi4vZGlzdC91dGlscy9lbGVtZW50cy5qcyIsIi4uLy4uL2Rpc3QvdXRpbHMvc3R5bGVzLWRlY2xhcmF0aW9ucy5qcyIsIi4uLy4uL2Rpc3QvdXRpbHMvc3R5bGVzLmpzIiwiZGlzdC9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AaXJjYW0vZ3VpLWNvbXBvbmVudHMvZGlzdC9pbmRleC5qcyIsIi4uLy4uL3BhY2thZ2UuanNvbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUNBQTs7QUFFQSxJQUFNLGVBQWUsRUFBckI7O0FBRUE7Ozs7Ozs7O0lBT00sYTtBQUNKLHlCQUFZLElBQVos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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiogQG1vZHVsZSBiYXNpYy1jb250cm9sbGVyICovXG5cbmNvbnN0IHR5cGVDb3VudGVycyA9IHt9O1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgdG8gY3JlYXRlIG5ldyBjb250cm9sbGVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIFN0cmluZyBkZXNjcmliaW5nIHRoZSB0eXBlIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRzIC0gRGVmYXVsdCBwYXJhbWV0ZXJzIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIFVzZXIgZGVmaW5lZCBjb25maWd1cmF0aW9uIG9wdGlvbnMuXG4gKi9cbmNsYXNzIEJhc2VDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcih0eXBlLCBkZWZhdWx0cywgY29uZmlnID0ge30pIHtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICAvLyBoYW5kbGUgaWRcbiAgICBpZiAoIXR5cGVDb3VudGVyc1t0eXBlXSlcbiAgICAgIHR5cGVDb3VudGVyc1t0eXBlXSA9IDA7XG5cbiAgICBpZiAoIXRoaXMucGFyYW1zLmlkKSB7XG4gICAgICB0aGlzLmlkID0gYCR7dHlwZX0tJHt0eXBlQ291bnRlcnNbdHlwZV19YDtcbiAgICAgIHR5cGVDb3VudGVyc1t0eXBlXSArPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlkID0gdGhpcy5wYXJhbXMuaWQ7XG4gICAgfVxuXG4gICAgdGhpcy5fbGlzdGVuZXJzID0gbmV3IFNldCgpO1xuICAgIHRoaXMuX2dyb3VwTGlzdGVuZXJzID0gbmV3IFNldCgpO1xuXG4gICAgLy8gcmVnaXN0ZXIgY2FsbGJhY2sgaWYgZ2l2ZW5cbiAgICBpZiAodGhpcy5wYXJhbXMuY2FsbGJhY2spXG4gICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMucGFyYW1zLmNhbGxiYWNrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBsaXN0ZW5lciB0byB0aGUgY29udHJvbGxlci5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBGdW5jdGlvbiB0byBiZSBhcHBsaWVkIHdoZW4gdGhlIGNvbnRyb2xsZXJcbiAgICogIHN0YXRlIGNoYW5nZS5cbiAgICovXG4gIGFkZExpc3RlbmVyKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fbGlzdGVuZXJzLmFkZChjYWxsYmFjayk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYSBsaXN0ZW5lciBpcyBhZGRlZCBmcm9tIGEgY29udGFpbmluZyBncm91cC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9hZGRHcm91cExpc3RlbmVyKGlkLCBjYWxsSWQsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFjYWxsSWQpXG4gICAgICB0aGlzLmFkZExpc3RlbmVyKGNhbGxiYWNrKTtcbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuX2dyb3VwTGlzdGVuZXJzLmFkZCh7IGNhbGxJZCwgY2FsbGJhY2sgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIGxpc3RlbmVyIGZyb20gdGhlIGNvbnRyb2xsZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gRnVuY3Rpb24gdG8gcmVtb3ZlIGZyb20gdGhlIGxpc3RlbmVycy5cbiAgICogQHByaXZhdGVcbiAgICogQHRvZG8gLSByZWV4cG9zZSB3aGVuIGBjb250YWluZXJgIGNhbiBvdmVycmlkZSB0aGlzIG1ldGhvZC4uLlxuICAgKi9cbiAgLy8gcmVtb3ZlTGlzdGVuZXIoY2FsbGJhY2spIHtcbiAgLy8gICB0aGlzLl9saXN0ZW5lcnMucmVtb3ZlKGNhbGxiYWNrKTtcbiAgLy8gfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBleGVjdXRlTGlzdGVuZXJzKC4uLnZhbHVlcykge1xuICAgIHRoaXMuX2xpc3RlbmVycy5mb3JFYWNoKChjYWxsYmFjaykgPT4gY2FsbGJhY2soLi4udmFsdWVzKSk7XG5cbiAgICB0aGlzLl9ncm91cExpc3RlbmVycy5mb3JFYWNoKChwYXlsb2FkKSA9PiB7XG4gICAgICBjb25zdCB7IGNhbGxiYWNrLCBjYWxsSWQgfSA9IHBheWxvYWQ7XG4gICAgICBjYWxsYmFjayhjYWxsSWQsIC4uLnZhbHVlcyk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZUNvbXBvbmVudDtcbiIsImltcG9ydCBCYXNlQ29tcG9uZW50IGZyb20gJy4vQmFzZUNvbXBvbmVudCc7XG5pbXBvcnQgZGlzcGxheSBmcm9tICcuLi9taXhpbnMvZGlzcGxheSc7XG5cbmNvbnN0IEF1ZGlvQ29udGV4dCA9ICh3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQpO1xuXG4vKiogQG1vZHVsZSBiYXNpYy1jb250cm9sbGVycyAqL1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgbGFiZWw6ICdEcmFnIGFuZCBkcm9wIGF1ZGlvIGZpbGVzJyxcbiAgbGFiZWxQcm9jZXNzOiAncHJvY2Vzcy4uLicsXG4gIGF1ZGlvQ29udGV4dDogbnVsbCxcbiAgY29udGFpbmVyOiBudWxsLFxuICBjYWxsYmFjazogbnVsbCxcbn07XG5cbi8qKlxuICogRHJhZyBhbmQgZHJvcCB6b25lIGZvciBhdWRpbyBmaWxlcyByZXR1cm5pbmcgYEF1ZGlvQnVmZmVyYHMgYW5kL29yIEpTT05cbiAqIGRlc2NyaXB0b3IgZGF0YS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IFtjb25maWcubGFiZWw9J0RyYWcgYW5kIGRyb3AgYXVkaW8gZmlsZXMnXSAtIExhYmVsIG9mIHRoZVxuICogIGNvbnRyb2xsZXIuXG4gKiBAcGFyYW0ge1N0cmluZ30gW2NvbmZpZy5sYWJlbFByb2Nlc3M9J3Byb2Nlc3MuLi4nXSAtIExhYmVsIG9mIHRoZSBjb250cm9sbGVyXG4gKiAgd2hpbGUgYXVkaW8gZmlsZXMgYXJlIGRlY29kZWQuXG4gKiBAcGFyYW0ge0F1ZGlvQ29udGV4dH0gW2NvbmZpZy5hdWRpb0NvbnRleHQ9bnVsbF0gLSBPcHRpb25uYWwgYXVkaW8gY29udGV4dFxuICogIHRvIHVzZSBpbiBvcmRlciB0byBkZWNvZGUgYXVkaW8gZmlsZXMuXG4gKiBAcGFyYW0ge1N0cmluZ3xFbGVtZW50fGJhc2ljLWNvbnRyb2xsZXJ+R3JvdXB9IFtjb25maWcuY29udGFpbmVyPW51bGxdIC1cbiAqICBDb250YWluZXIgb2YgdGhlIGNvbnRyb2xsZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29uZmlnLmNhbGxiYWNrPW51bGxdIC0gQ2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWQgd2hlbiB0aGVcbiAqICB2YWx1ZSBjaGFuZ2VzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBjb250cm9sbGVycyBmcm9tICdiYXNpYy1jb250cm9sbGVycyc7XG4gKlxuICogY29uc3QgZHJhZ0FuZERyb3AgPSBuZXcgY29udHJvbGxlcnMuRHJhZ0FuZERyb3Aoe1xuICogICBjb250YWluZXI6ICcjY29udGFpbmVyJyxcbiAqICAgY2FsbGJhY2s6IChyZXN1bHRzKSA9PiBjb25zb2xlLmxvZyhyZXN1bHRzKSxcbiAqIH0pO1xuICovXG5jbGFzcyBEcmFnQW5kRHJvcCBleHRlbmRzIGRpc3BsYXkoQmFzZUNvbXBvbmVudCkge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIoJ2RyYWctYW5kLWRyb3AnLCBkZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLl92YWx1ZSA9IG51bGw7XG5cbiAgICBpZiAoIXRoaXMucGFyYW1zLmF1ZGlvQ29udGV4dClcbiAgICAgIHRoaXMucGFyYW1zLmF1ZGlvQ29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcblxuICAgIHN1cGVyLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGxhc3QgcmVzdWx0c1xuICAgKiBAdHlwZSB7T2JqZWN0PFN0cmluZywgQXVkaW9CdWZmZXJ8SlNPTj59XG4gICAqIEByZWFkb25seVxuICAgKi9cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGxhYmVsIH0gPSB0aGlzLnBhcmFtcztcbiAgICBjb25zdCBjb250ZW50ID0gYFxuICAgICAgPGRpdiBjbGFzcz1cImRyb3Atem9uZVwiPlxuICAgICAgICA8cCBjbGFzcz1cImxhYmVsXCI+JHtsYWJlbH08L3A+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIoKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgIHRoaXMuJGRyb3Bab25lID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmRyb3Atem9uZScpO1xuICAgIHRoaXMuJGxhYmVsID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmxhYmVsJyk7XG5cbiAgICB0aGlzLl9iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBfYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLiRkcm9wWm9uZS5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICB0aGlzLiRkcm9wWm9uZS5jbGFzc0xpc3QuYWRkKCdkcmFnJyk7XG4gICAgICBlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ2NvcHknO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIHRoaXMuJGRyb3Bab25lLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICB0aGlzLiRkcm9wWm9uZS5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnJyk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgdGhpcy4kZHJvcFpvbmUuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICBjb25zdCBmaWxlcyA9IEFycmF5LmZyb20oZS5kYXRhVHJhbnNmZXIuZmlsZXMpO1xuICAgICAgY29uc3QgYXVkaW9GaWxlcyA9IGZpbGVzLmZpbHRlcigoZmlsZSkgPT4ge1xuICAgICAgICBpZiAoL15hdWRpby8udGVzdChmaWxlLnR5cGUpKSB7XG4gICAgICAgICAgZmlsZS5zaG9ydFR5cGUgPSAnYXVkaW8nO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKC9qc29uJC8udGVzdChmaWxlLnR5cGUpKSB7XG4gICAgICAgICAgZmlsZS5zaG9ydFR5cGUgPSAnanNvbic7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgcmVzdWx0cyA9IHt9O1xuICAgICAgbGV0IGNvdW50ZXIgPSAwO1xuXG4gICAgICB0aGlzLiRsYWJlbC50ZXh0Q29udGVudCA9IHRoaXMucGFyYW1zLmxhYmVsUHJvY2VzcztcblxuICAgICAgY29uc3QgdGVzdEVuZCA9ICgpID0+IHtcbiAgICAgICAgY291bnRlciArPSAxO1xuXG4gICAgICAgIGlmIChjb3VudGVyID09PSBhdWRpb0ZpbGVzLmxlbmd0aCnCoHtcbiAgICAgICAgICB0aGlzLl92YWx1ZSA9IHJlc3VsdHNcbiAgICAgICAgICB0aGlzLmV4ZWN1dGVMaXN0ZW5lcnMocmVzdWx0cyk7XG5cbiAgICAgICAgICB0aGlzLiRkcm9wWm9uZS5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnJyk7XG4gICAgICAgICAgdGhpcy4kbGFiZWwudGV4dENvbnRlbnQgPSB0aGlzLnBhcmFtcy5sYWJlbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmaWxlcy5mb3JFYWNoKChmaWxlLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSAoZSkgPT4ge1xuICAgICAgICAgIGlmIChmaWxlLnNob3J0VHlwZSA9PT0gJ2pzb24nKSB7XG4gICAgICAgICAgICByZXN1bHRzW2ZpbGUubmFtZV0gPSBKU09OLnBhcnNlKGUudGFyZ2V0LnJlc3VsdCk7XG4gICAgICAgICAgICB0ZXN0RW5kKCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChmaWxlLnNob3J0VHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgICAgICAgdGhpcy5wYXJhbXMuYXVkaW9Db250ZXh0XG4gICAgICAgICAgICAgIC5kZWNvZGVBdWRpb0RhdGEoZS50YXJnZXQucmVzdWx0KVxuICAgICAgICAgICAgICAudGhlbigoYXVkaW9CdWZmZXIpID0+IHtcbiAgICAgICAgICAgICAgICByZXN1bHRzW2ZpbGUubmFtZV0gPSBhdWRpb0J1ZmZlcjtcbiAgICAgICAgICAgICAgICB0ZXN0RW5kKCk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0c1tmaWxlLm5hbWVdID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0ZXN0RW5kKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmaWxlLnNob3J0VHlwZSA9PT0gJ2pzb24nKVxuICAgICAgICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGUpO1xuICAgICAgICBlbHNlIGlmIChmaWxlLnNob3J0VHlwZSA9PT0gJ2F1ZGlvJylcbiAgICAgICAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoZmlsZSk7XG4gICAgICB9KTtcbiAgICB9LCBmYWxzZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRHJhZ0FuZERyb3A7XG4iLCJpbXBvcnQgQmFzZUNvbXBvbmVudCBmcm9tICcuL0Jhc2VDb21wb25lbnQnO1xuaW1wb3J0IGRpc3BsYXkgZnJvbSAnLi4vbWl4aW5zL2Rpc3BsYXknO1xuaW1wb3J0IGNvbnRhaW5lciBmcm9tICcuLi9taXhpbnMvY29udGFpbmVyJztcbmltcG9ydCAqIGFzIGVsZW1lbnRzIGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcblxuLyoqIEBtb2R1bGUgYmFzaWMtY29udHJvbGxlcnMgKi9cblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIGxlZ2VuZDogJyZuYnNwOycsXG4gIGRlZmF1bHQ6ICdvcGVuZWQnLFxuICBjb250YWluZXI6IG51bGwsXG59O1xuXG4vKipcbiAqIEdyb3VwIG9mIGNvbnRyb2xsZXJzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge1N0cmluZ30gY29uZmlnLmxhYmVsIC0gTGFiZWwgb2YgdGhlIGdyb3VwLlxuICogQHBhcmFtIHsnb3BlbmVkJ3wnY2xvc2VkJ30gW2NvbmZpZy5kZWZhdWx0PSdvcGVuZWQnXSAtIERlZmF1bHQgc3RhdGUgb2YgdGhlXG4gKiAgZ3JvdXAuXG4gKiBAcGFyYW0ge1N0cmluZ3xFbGVtZW50fGJhc2ljLWNvbnRyb2xsZXJ+R3JvdXB9IFtjb25maWcuY29udGFpbmVyPW51bGxdIC1cbiAqICBDb250YWluZXIgb2YgdGhlIGNvbnRyb2xsZXIuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGNvbnRyb2xsZXJzIGZyb20gJ2Jhc2ljLWNvbnRyb2xsZXJzJztcbiAqXG4gKiAvLyBjcmVhdGUgYSBncm91cFxuICogY29uc3QgZ3JvdXAgPSBuZXcgY29udHJvbGxlcnMuR3JvdXAoe1xuICogICBsYWJlbDogJ0dyb3VwJyxcbiAqICAgZGVmYXVsdDogJ29wZW5lZCcsXG4gKiAgIGNvbnRhaW5lcjogJyNjb250YWluZXInXG4gKiB9KTtcbiAqXG4gKiAvLyBpbnNlcnQgY29udHJvbGxlcnMgaW4gdGhlIGdyb3VwXG4gKiBjb25zdCBncm91cFNsaWRlciA9IG5ldyBjb250cm9sbGVycy5TbGlkZXIoe1xuICogICBsYWJlbDogJ0dyb3VwIFNsaWRlcicsXG4gKiAgIG1pbjogMjAsXG4gKiAgIG1heDogMTAwMCxcbiAqICAgc3RlcDogMSxcbiAqICAgZGVmYXVsdDogMjAwLFxuICogICB1bml0OiAnSHonLFxuICogICBzaXplOiAnbGFyZ2UnLFxuICogICBjb250YWluZXI6IGdyb3VwLFxuICogICBjYWxsYmFjazogKHZhbHVlKSA9PiBjb25zb2xlLmxvZyh2YWx1ZSksXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBncm91cFRleHQgPSBuZXcgY29udHJvbGxlcnMuVGV4dCh7XG4gKiAgIGxhYmVsOiAnR3JvdXAgVGV4dCcsXG4gKiAgIGRlZmF1bHQ6ICd0ZXh0IGlucHV0JyxcbiAqICAgcmVhZG9ubHk6IGZhbHNlLFxuICogICBjb250YWluZXI6IGdyb3VwLFxuICogICBjYWxsYmFjazogKHZhbHVlKSA9PiBjb25zb2xlLmxvZyh2YWx1ZSksXG4gKiB9KTtcbiAqL1xuY2xhc3MgR3JvdXAgZXh0ZW5kcyBjb250YWluZXIoZGlzcGxheShCYXNlQ29tcG9uZW50KSkge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcignZ3JvdXAnLCBkZWZhdWx0cywgY29uZmlnKTtcblxuICAgIHRoaXMuX3N0YXRlcyA9IFsnb3BlbmVkJywgJ2Nsb3NlZCddO1xuXG4gICAgaWYgKHRoaXMuX3N0YXRlcy5pbmRleE9mKHRoaXMucGFyYW1zLmRlZmF1bHQpID09PSAtMSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBzdGF0ZSBcIiR7dmFsdWV9XCJgKTtcblxuICAgIHRoaXMuX3N0YXRlID0gdGhpcy5wYXJhbXMuZGVmYXVsdDtcblxuICAgIHN1cGVyLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGF0ZSBvZiB0aGUgZ3JvdXAgKGAnb3BlbmVkJ2Agb3IgYCdjbG9zZWQnYCkuXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGU7XG4gIH1cblxuICBzZXQgdmFsdWUoc3RhdGUpIHtcbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gIH1cblxuICAvKipcbiAgICogQWxpYXMgZm9yIGB2YWx1ZWAuXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBnZXQgc3RhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xuICB9XG5cbiAgc2V0IHN0YXRlKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuX3N0YXRlcy5pbmRleE9mKHZhbHVlKSA9PT0gLTEpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgc3RhdGUgXCIke3ZhbHVlfVwiYCk7XG5cbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX3N0YXRlKTtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKHZhbHVlKTtcblxuICAgIHRoaXMuX3N0YXRlID0gdmFsdWU7XG4gIH1cblxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZW5kZXIoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwiZ3JvdXAtaGVhZGVyXCI+XG4gICAgICAgICR7ZWxlbWVudHMuc21hbGxBcnJvd1JpZ2h0fVxuICAgICAgICAke2VsZW1lbnRzLnNtYWxsQXJyb3dCb3R0b219XG4gICAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWxcIj4ke3RoaXMucGFyYW1zLmxhYmVsfTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImdyb3VwLWNvbnRlbnRcIj48L2Rpdj5cbiAgICBgO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIoKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQodGhpcy5fc3RhdGUpO1xuXG4gICAgdGhpcy4kaGVhZGVyID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmdyb3VwLWhlYWRlcicpO1xuICAgIHRoaXMuJGNvbnRhaW5lciA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5ncm91cC1jb250ZW50Jyk7XG5cbiAgICB0aGlzLl9iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgX2JpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLl9zdGF0ZSA9PT0gJ2Nsb3NlZCcgPyAnb3BlbmVkJyA6ICdjbG9zZWQnO1xuICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdyb3VwO1xuIiwiaW1wb3J0IEJhc2VDb21wb25lbnQgZnJvbSAnLi9CYXNlQ29tcG9uZW50JztcbmltcG9ydCBkaXNwbGF5IGZyb20gJy4uL21peGlucy9kaXNwbGF5JztcbmltcG9ydCAqIGFzIGVsZW1lbnRzIGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcblxuLyoqIEBtb2R1bGUgYmFzaWMtY29udHJvbGxlcnMgKi9cblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIGxhYmVsOiAnJm5ic3A7JyxcbiAgbWluOiAwLFxuICBtYXg6IDEsXG4gIHN0ZXA6IDAuMDEsXG4gIGRlZmF1bHQ6IDAsXG4gIGNvbnRhaW5lcjogbnVsbCxcbiAgY2FsbGJhY2s6IG51bGwsXG59O1xuXG4vKipcbiAqIE51bWJlciBCb3ggY29udHJvbGxlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge1N0cmluZ30gY29uZmlnLmxhYmVsIC0gTGFiZWwgb2YgdGhlIGNvbnRyb2xsZXIuXG4gKiBAcGFyYW0ge051bWJlcn0gW2NvbmZpZy5taW49MF0gLSBNaW5pbXVtIHZhbHVlLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtjb25maWcubWF4PTFdIC0gTWF4aW11bSB2YWx1ZS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLnN0ZXA9MC4wMV0gLSBTdGVwIGJldHdlZW4gY29uc2VjdXRpdmUgdmFsdWVzLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtjb25maWcuZGVmYXVsdD0wXSAtIERlZmF1bHQgdmFsdWUuXG4gKiBAcGFyYW0ge1N0cmluZ3xFbGVtZW50fGJhc2ljLWNvbnRyb2xsZXJ+R3JvdXB9IFtjb25maWcuY29udGFpbmVyPW51bGxdIC1cbiAqICBDb250YWluZXIgb2YgdGhlIGNvbnRyb2xsZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29uZmlnLmNhbGxiYWNrPW51bGxdIC0gQ2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWQgd2hlbiB0aGVcbiAqICB2YWx1ZSBjaGFuZ2VzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBjb250cm9sbGVycyBmcm9tICdiYXNpYy1jb250cm9sbGVycyc7XG4gKlxuICogY29uc3QgbnVtYmVyQm94ID0gbmV3IGNvbnRyb2xsZXJzLk51bWJlckJveCh7XG4gKiAgIGxhYmVsOiAnTXkgTnVtYmVyIEJveCcsXG4gKiAgIG1pbjogMCxcbiAqICAgbWF4OiAxMCxcbiAqICAgc3RlcDogMC4xLFxuICogICBkZWZhdWx0OiA1LFxuICogICBjb250YWluZXI6ICcjY29udGFpbmVyJyxcbiAqICAgY2FsbGJhY2s6ICh2YWx1ZSkgPT4gY29uc29sZS5sb2codmFsdWUpLFxuICogfSk7XG4gKi9cbmNsYXNzIE51bWJlckJveCBleHRlbmRzIGRpc3BsYXkoQmFzZUNvbXBvbmVudCkge1xuICAvLyBsZWdlbmQsIG1pbiA9IDAsIG1heCA9IDEsIHN0ZXAgPSAwLjAxLCBkZWZhdWx0VmFsdWUgPSAwLCAkY29udGFpbmVyID0gbnVsbCwgY2FsbGJhY2sgPSBudWxsXG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKCdudW1iZXItYm94JywgZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICB0aGlzLl92YWx1ZSA9IHRoaXMucGFyYW1zLmRlZmF1bHQ7XG4gICAgdGhpcy5faXNJbnRTdGVwID0gKHRoaXMucGFyYW1zLnN0ZXAgJSAxID09PSAwKTtcblxuICAgIHN1cGVyLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDdXJyZW50IHZhbHVlIG9mIHRoZSBjb250cm9sbGVyLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIC8vIHVzZSAkbnVtYmVyIGVsZW1lbnQgbWluLCBtYXggYW5kIHN0ZXAgc3lzdGVtXG4gICAgdGhpcy4kbnVtYmVyLnZhbHVlID0gdmFsdWU7XG4gICAgdmFsdWUgPSB0aGlzLiRudW1iZXIudmFsdWU7XG4gICAgdmFsdWUgPSB0aGlzLl9pc0ludFN0ZXAgPyBwYXJzZUludCh2YWx1ZSwgMTApIDogcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBsYWJlbCwgbWluLCBtYXgsIHN0ZXAgfSA9IHRoaXMucGFyYW1zO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBgXG4gICAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+JHtsYWJlbH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlclwiPlxuICAgICAgICAke2VsZW1lbnRzLmFycm93TGVmdH1cbiAgICAgICAgPGlucHV0IGNsYXNzPVwibnVtYmVyXCIgdHlwZT1cIm51bWJlclwiIG1pbj1cIiR7bWlufVwiIG1heD1cIiR7bWF4fVwiIHN0ZXA9XCIke3N0ZXB9XCIgdmFsdWU9XCIke3RoaXMuX3ZhbHVlfVwiIC8+XG4gICAgICAgICR7ZWxlbWVudHMuYXJyb3dSaWdodH1cbiAgICAgIDwvZGl2PlxuICAgIGA7XG5cbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcigpO1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoJ2FsaWduLXNtYWxsJyk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuJHByZXYgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuYXJyb3ctbGVmdCcpO1xuICAgIHRoaXMuJG5leHQgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuYXJyb3ctcmlnaHQnKTtcbiAgICB0aGlzLiRudW1iZXIgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwibnVtYmVyXCJdJyk7XG5cbiAgICB0aGlzLl9iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgX2JpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kcHJldi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBjb25zdCBzdGVwID0gdGhpcy5wYXJhbXMuc3RlcDtcbiAgICAgIGNvbnN0IGRlY2ltYWxzID0gc3RlcC50b1N0cmluZygpLnNwbGl0KCcuJylbMV07XG4gICAgICBjb25zdCBleHAgPSBkZWNpbWFscyA/IGRlY2ltYWxzLmxlbmd0aCA6IDA7XG4gICAgICBjb25zdCBtdWx0ID0gTWF0aC5wb3coMTAsIGV4cCk7XG5cbiAgICAgIGNvbnN0IGludFZhbHVlID0gTWF0aC5mbG9vcih0aGlzLl92YWx1ZSAqIG11bHQgKyAwLjUpO1xuICAgICAgY29uc3QgaW50U3RlcCA9IE1hdGguZmxvb3Ioc3RlcCAqIG11bHQgKyAwLjUpO1xuICAgICAgY29uc3QgdmFsdWUgPSAoaW50VmFsdWUgLSBpbnRTdGVwKSAvIG11bHQ7XG5cbiAgICAgIHRoaXMuX3Byb3BhZ2F0ZSh2YWx1ZSk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgdGhpcy4kbmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBjb25zdCBzdGVwID0gdGhpcy5wYXJhbXMuc3RlcDtcbiAgICAgIGNvbnN0IGRlY2ltYWxzID0gc3RlcC50b1N0cmluZygpLnNwbGl0KCcuJylbMV07XG4gICAgICBjb25zdCBleHAgPSBkZWNpbWFscyA/IGRlY2ltYWxzLmxlbmd0aCA6IDA7XG4gICAgICBjb25zdCBtdWx0ID0gTWF0aC5wb3coMTAsIGV4cCk7XG5cbiAgICAgIGNvbnN0IGludFZhbHVlID0gTWF0aC5mbG9vcih0aGlzLl92YWx1ZSAqIG11bHQgKyAwLjUpO1xuICAgICAgY29uc3QgaW50U3RlcCA9IE1hdGguZmxvb3Ioc3RlcCAqIG11bHQgKyAwLjUpO1xuICAgICAgY29uc3QgdmFsdWUgPSAoaW50VmFsdWUgKyBpbnRTdGVwKSAvIG11bHQ7XG5cbiAgICAgIHRoaXMuX3Byb3BhZ2F0ZSh2YWx1ZSk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgdGhpcy4kbnVtYmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XG4gICAgICBsZXQgdmFsdWUgPSB0aGlzLiRudW1iZXIudmFsdWU7XG4gICAgICB2YWx1ZSA9IHRoaXMuX2lzSW50U3RlcCA/IHBhcnNlSW50KHZhbHVlLCAxMCkgOiBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICAgIHZhbHVlID0gTWF0aC5taW4odGhpcy5wYXJhbXMubWF4LCBNYXRoLm1heCh0aGlzLnBhcmFtcy5taW4sIHZhbHVlKSk7XG5cbiAgICAgIHRoaXMuX3Byb3BhZ2F0ZSh2YWx1ZSk7XG4gICAgfSwgZmFsc2UpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIF9wcm9wYWdhdGUodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IHRoaXMuX3ZhbHVlKSB7IHJldHVybjsgfVxuXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLiRudW1iZXIudmFsdWUgPSB2YWx1ZTtcblxuICAgIHRoaXMuZXhlY3V0ZUxpc3RlbmVycyh0aGlzLl92YWx1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTnVtYmVyQm94O1xuIiwiaW1wb3J0IEJhc2VDb21wb25lbnQgZnJvbSAnLi9CYXNlQ29tcG9uZW50JztcbmltcG9ydCBkaXNwbGF5IGZyb20gJy4uL21peGlucy9kaXNwbGF5JztcbmltcG9ydCAqIGFzIGVsZW1lbnRzIGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcblxuLyoqIEBtb2R1bGUgYmFzaWMtY29udHJvbGxlcnMgKi9cblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIGxhYmVsOiAnJm5ic3A7JyxcbiAgb3B0aW9uczogbnVsbCxcbiAgZGVmYXVsdDogbnVsbCxcbiAgY29udGFpbmVyOiBudWxsLFxuICBjYWxsYmFjazogbnVsbCxcbn07XG5cbi8qKlxuICogTGlzdCBvZiBidXR0b25zIHdpdGggc3RhdGUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBjb25maWcubGFiZWwgLSBMYWJlbCBvZiB0aGUgY29udHJvbGxlci5cbiAqIEBwYXJhbSB7QXJyYXl9IFtjb25maWcub3B0aW9ucz1udWxsXSAtIFZhbHVlcyBvZiB0aGUgZHJvcCBkb3duIGxpc3QuXG4gKiBAcGFyYW0ge051bWJlcn0gW2NvbmZpZy5kZWZhdWx0PW51bGxdIC0gRGVmYXVsdCB2YWx1ZS5cbiAqIEBwYXJhbSB7U3RyaW5nfEVsZW1lbnR8YmFzaWMtY29udHJvbGxlcn5Hcm91cH0gW2NvbmZpZy5jb250YWluZXI9bnVsbF0gLVxuICogIENvbnRhaW5lciBvZiB0aGUgY29udHJvbGxlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb25maWcuY2FsbGJhY2s9bnVsbF0gLSBDYWxsYmFjayB0byBiZSBleGVjdXRlZCB3aGVuIHRoZVxuICogIHZhbHVlIGNoYW5nZXMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGNvbnRyb2xsZXJzIGZyb20gJ2Jhc2ljLWNvbnRyb2xsZXJzJztcbiAqXG4gKiBjb25zdCBzZWxlY3RCdXR0b25zID0gbmV3IGNvbnRyb2xsZXJzLlNlbGVjdEJ1dHRvbnMoe1xuICogICBsYWJlbDogJ1NlbGVjdEJ1dHRvbnMnLFxuICogICBvcHRpb25zOiBbJ3N0YW5kYnknLCAncnVuJywgJ2VuZCddLFxuICogICBkZWZhdWx0OiAncnVuJyxcbiAqICAgY29udGFpbmVyOiAnI2NvbnRhaW5lcicsXG4gKiAgIGNhbGxiYWNrOiAodmFsdWUsIGluZGV4KSA9PiBjb25zb2xlLmxvZyh2YWx1ZSwgaW5kZXgpLFxuICogfSk7XG4gKi9cbmNsYXNzIFNlbGVjdEJ1dHRvbnMgZXh0ZW5kcyBkaXNwbGF5KEJhc2VDb21wb25lbnQpIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoJ3NlbGVjdC1idXR0b25zJywgZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5wYXJhbXMub3B0aW9ucykpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyaWdnZXJCdXR0b246IEludmFsaWQgb3B0aW9uIFwib3B0aW9uc1wiJyk7XG5cbiAgICB0aGlzLl92YWx1ZSA9IHRoaXMucGFyYW1zLmRlZmF1bHQ7XG5cbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5wYXJhbXMub3B0aW9ucztcbiAgICBjb25zdCBpbmRleCA9IG9wdGlvbnMuaW5kZXhPZih0aGlzLl92YWx1ZSk7XG4gICAgdGhpcy5faW5kZXggPSBpbmRleCA9PT0gLTEgP8KgMCA6IGluZGV4O1xuICAgIHRoaXMuX21heEluZGV4ID0gb3B0aW9ucy5sZW5ndGggLSAxO1xuXG4gICAgc3VwZXIuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgdmFsdWUuXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnBhcmFtcy5vcHRpb25zLmluZGV4T2YodmFsdWUpO1xuXG4gICAgaWYgKGluZGV4ICE9PSAtMSlcbiAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDdXJyZW50IG9wdGlvbiBpbmRleC5cbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIGdldCBpbmRleCgpIHtcbiAgICB0aGlzLl9pbmRleDtcbiAgfVxuXG4gIHNldCBpbmRleChpbmRleCkge1xuICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiB0aGlzLl9tYXhJbmRleCkgcmV0dXJuO1xuXG4gICAgdGhpcy5fdmFsdWUgPSB0aGlzLnBhcmFtcy5vcHRpb25zW2luZGV4XTtcbiAgICB0aGlzLl9pbmRleCA9IGluZGV4O1xuICAgIHRoaXMuX2hpZ2hsaWdodEJ0bih0aGlzLl9pbmRleCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgb3B0aW9ucywgbGFiZWwgfSA9IHRoaXMucGFyYW1zO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBgXG4gICAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+JHtsYWJlbH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlclwiPlxuICAgICAgICAke2VsZW1lbnRzLmFycm93TGVmdH1cbiAgICAgICAgJHtvcHRpb25zLm1hcCgob3B0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuXCIgZGF0YS1pbmRleD1cIiR7aW5kZXh9XCIgZGF0YS12YWx1ZT1cIiR7b3B0aW9ufVwiPlxuICAgICAgICAgICAgICAke29wdGlvbn1cbiAgICAgICAgICAgIDwvYnV0dG9uPmA7XG4gICAgICAgIH0pLmpvaW4oJycpfVxuICAgICAgICAke2VsZW1lbnRzLmFycm93UmlnaHR9XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIodGhpcy50eXBlKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gICAgdGhpcy4kcHJldiA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy1sZWZ0Jyk7XG4gICAgdGhpcy4kbmV4dCA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy1yaWdodCcpO1xuICAgIHRoaXMuJGJ0bnMgPSBBcnJheS5mcm9tKHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4nKSk7XG5cbiAgICB0aGlzLl9oaWdobGlnaHRCdG4odGhpcy5faW5kZXgpO1xuICAgIHRoaXMuX2JpbmRFdmVudHMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBfYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLiRwcmV2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9pbmRleCAtIDE7XG4gICAgICB0aGlzLl9wcm9wYWdhdGUoaW5kZXgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy4kbmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5faW5kZXggKyAxO1xuICAgICAgdGhpcy5fcHJvcGFnYXRlKGluZGV4KTtcbiAgICB9KTtcblxuICAgIHRoaXMuJGJ0bnMuZm9yRWFjaCgoJGJ0biwgaW5kZXgpID0+IHtcbiAgICAgICRidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuX3Byb3BhZ2F0ZShpbmRleCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBfcHJvcGFnYXRlKGluZGV4KSB7XG4gICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+IHRoaXMuX21heEluZGV4KSByZXR1cm47XG5cbiAgICB0aGlzLl9pbmRleCA9IGluZGV4O1xuICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5wYXJhbXMub3B0aW9uc1tpbmRleF07XG4gICAgdGhpcy5faGlnaGxpZ2h0QnRuKHRoaXMuX2luZGV4KTtcblxuICAgIHRoaXMuZXhlY3V0ZUxpc3RlbmVycyh0aGlzLl92YWx1ZSwgdGhpcy5faW5kZXgpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIF9oaWdobGlnaHRCdG4oYWN0aXZlSW5kZXgpIHtcbiAgICB0aGlzLiRidG5zLmZvckVhY2goKCRidG4sIGluZGV4KSA9PiB7XG4gICAgICAkYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXG4gICAgICBpZiAoYWN0aXZlSW5kZXggPT09IGluZGV4KSB7XG4gICAgICAgICRidG4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0QnV0dG9ucztcbiIsImltcG9ydCBCYXNlQ29tcG9uZW50IGZyb20gJy4vQmFzZUNvbXBvbmVudCc7XG5pbXBvcnQgZGlzcGxheSBmcm9tICcuLi9taXhpbnMvZGlzcGxheSc7XG5pbXBvcnQgKiBhcyBlbGVtZW50cyBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5cbi8qKiBAbW9kdWxlIGJhc2ljLWNvbnRyb2xsZXJzICovXG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICBsYWJlbDogJyZuYnNwOycsXG4gIG9wdGlvbnM6IG51bGwsXG4gIGRlZmF1bHQ6IG51bGwsXG4gIGNvbnRhaW5lcjogbnVsbCxcbiAgY2FsbGJhY2s6IG51bGwsXG59XG5cbi8qKlxuICogRHJvcC1kb3duIGxpc3QgY29udHJvbGxlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZy5sYWJlbCAtIExhYmVsIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtBcnJheX0gW2NvbmZpZy5vcHRpb25zPW51bGxdIC0gVmFsdWVzIG9mIHRoZSBkcm9wIGRvd24gbGlzdC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLmRlZmF1bHQ9bnVsbF0gLSBEZWZhdWx0IHZhbHVlLlxuICogQHBhcmFtIHtTdHJpbmd8RWxlbWVudHxiYXNpYy1jb250cm9sbGVyfkdyb3VwfSBbY29uZmlnLmNvbnRhaW5lcj1udWxsXSAtXG4gKiAgQ29udGFpbmVyIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbmZpZy5jYWxsYmFjaz1udWxsXSAtIENhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIHdoZW4gdGhlXG4gKiAgdmFsdWUgY2hhbmdlcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgY29udHJvbGxlcnMgZnJvbSAnYmFzaWMtY29udHJvbGxlcnMnO1xuICpcbiAqIGNvbnN0IHNlbGVjdExpc3QgPSBuZXcgY29udHJvbGxlcnMuU2VsZWN0TGlzdCh7XG4gKiAgIGxhYmVsOiAnU2VsZWN0TGlzdCcsXG4gKiAgIG9wdGlvbnM6IFsnc3RhbmRieScsICdydW4nLCAnZW5kJ10sXG4gKiAgIGRlZmF1bHQ6ICdydW4nLFxuICogICBjb250YWluZXI6ICcjY29udGFpbmVyJyxcbiAqICAgY2FsbGJhY2s6ICh2YWx1ZSwgaW5kZXgpID0+IGNvbnNvbGUubG9nKHZhbHVlLCBpbmRleCksXG4gKiB9KTtcbiAqL1xuY2xhc3MgU2VsZWN0TGlzdCBleHRlbmRzIGRpc3BsYXkoQmFzZUNvbXBvbmVudCkge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcignc2VsZWN0LWxpc3QnLCBkZWZhdWx0cywgY29uZmlnKTtcblxuICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLnBhcmFtcy5vcHRpb25zKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcignVHJpZ2dlckJ1dHRvbjogSW52YWxpZCBvcHRpb24gXCJvcHRpb25zXCInKTtcblxuICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5wYXJhbXMuZGVmYXVsdDtcblxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLnBhcmFtcy5vcHRpb25zO1xuICAgIGNvbnN0IGluZGV4ID0gb3B0aW9ucy5pbmRleE9mKHRoaXMuX3ZhbHVlKTtcbiAgICB0aGlzLl9pbmRleCA9IGluZGV4ID09PSAtMSA/wqAwIDogaW5kZXg7XG4gICAgdGhpcy5fbWF4SW5kZXggPSBvcHRpb25zLmxlbmd0aCAtIDE7XG5cbiAgICBzdXBlci5pbml0aWFsaXplKCk7XG4gIH1cblxuICAvKipcbiAgICogQ3VycmVudCB2YWx1ZS5cbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLiRzZWxlY3QudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX2luZGV4ID0gdGhpcy5wYXJhbXMub3B0aW9ucy5pbmRleE9mKHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDdXJyZW50IG9wdGlvbiBpbmRleC5cbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIGdldCBpbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5faW5kZXg7XG4gIH1cblxuICBzZXQgaW5kZXgoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gdGhpcy5fbWF4SW5kZXgpIHJldHVybjtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5wYXJhbXMub3B0aW9uc1tpbmRleF07XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgbGFiZWwsIG9wdGlvbnPCoH0gPSB0aGlzLnBhcmFtcztcbiAgICBjb25zdCBjb250ZW50ID0gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJsYWJlbFwiPiR7bGFiZWx9PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImlubmVyLXdyYXBwZXJcIj5cbiAgICAgICAgJHtlbGVtZW50cy5hcnJvd0xlZnR9XG4gICAgICAgIDxzZWxlY3Q+XG4gICAgICAgICR7b3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICByZXR1cm4gYDxvcHRpb24gdmFsdWU9XCIke29wdGlvbn1cIj4ke29wdGlvbn08L29wdGlvbj5gO1xuICAgICAgICB9KS5qb2luKCcnKX1cbiAgICAgICAgPHNlbGVjdD5cbiAgICAgICAgJHtlbGVtZW50cy5hcnJvd1JpZ2h0fVxuICAgICAgPC9kaXY+XG4gICAgYDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKHRoaXMudHlwZSk7XG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZCgnYWxpZ24tc21hbGwnKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gICAgdGhpcy4kcHJldiA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy1sZWZ0Jyk7XG4gICAgdGhpcy4kbmV4dCA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy1yaWdodCcpO1xuICAgIHRoaXMuJHNlbGVjdCA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdCcpO1xuICAgIC8vIHNldCB0byBkZWZhdWx0IHZhbHVlXG4gICAgdGhpcy4kc2VsZWN0LnZhbHVlID0gb3B0aW9uc1t0aGlzLl9pbmRleF07XG4gICAgdGhpcy5fYmluZEV2ZW50cygpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIF9iaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJHByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2luZGV4IC0gMTtcbiAgICAgIHRoaXMuX3Byb3BhZ2F0ZShpbmRleCk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgdGhpcy4kbmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5faW5kZXggKyAxO1xuICAgICAgdGhpcy5fcHJvcGFnYXRlKGluZGV4KTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICB0aGlzLiRzZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLiRzZWxlY3QudmFsdWU7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMucGFyYW1zLm9wdGlvbnMuaW5kZXhPZih2YWx1ZSk7XG4gICAgICB0aGlzLl9wcm9wYWdhdGUoaW5kZXgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIF9wcm9wYWdhdGUoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPCAwIHx8wqBpbmRleCA+IHRoaXMuX21heEluZGV4KSByZXR1cm47XG5cbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMucGFyYW1zLm9wdGlvbnNbaW5kZXhdO1xuICAgIHRoaXMuX2luZGV4ID0gaW5kZXg7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLiRzZWxlY3QudmFsdWUgPSB2YWx1ZTtcblxuICAgIHRoaXMuZXhlY3V0ZUxpc3RlbmVycyh0aGlzLl92YWx1ZSwgdGhpcy5faW5kZXgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdExpc3Q7XG4iLCJpbXBvcnQgQmFzZUNvbXBvbmVudCBmcm9tICcuL0Jhc2VDb21wb25lbnQnO1xuaW1wb3J0IGRpc3BsYXkgZnJvbSAnLi4vbWl4aW5zL2Rpc3BsYXknO1xuaW1wb3J0ICogYXMgZ3VpQ29tcG9uZW50cyBmcm9tICdAaXJjYW0vZ3VpLWNvbXBvbmVudHMnO1xuXG4vKiogQG1vZHVsZSBiYXNpYy1jb250cm9sbGVycyAqL1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgbGFiZWw6ICcmbmJzcDsnLFxuICBtaW46IDAsXG4gIG1heDogMSxcbiAgc3RlcDogMC4wMSxcbiAgZGVmYXVsdDogMCxcbiAgdW5pdDogJycsXG4gIHNpemU6ICdtZWRpdW0nLFxuICBjb250YWluZXI6IG51bGwsXG4gIGNhbGxiYWNrOiBudWxsLFxufVxuXG4vKipcbiAqIFNsaWRlciBjb250cm9sbGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge1N0cmluZ30gY29uZmlnLmxhYmVsIC0gTGFiZWwgb2YgdGhlIGNvbnRyb2xsZXIuXG4gKiBAcGFyYW0ge051bWJlcn0gW2NvbmZpZy5taW49MF0gLSBNaW5pbXVtIHZhbHVlLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtjb25maWcubWF4PTFdIC0gTWF4aW11bSB2YWx1ZS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLnN0ZXA9MC4wMV0gLSBTdGVwIGJldHdlZW4gY29uc2VjdXRpdmUgdmFsdWVzLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtjb25maWcuZGVmYXVsdD0wXSAtIERlZmF1bHQgdmFsdWUuXG4gKiBAcGFyYW0ge1N0cmluZ30gW2NvbmZpZy51bml0PScnXSAtIFVuaXQgb2YgdGhlIHZhbHVlLlxuICogQHBhcmFtIHsnc21hbGwnfCdtZWRpdW0nfCdsYXJnZSd9IFtjb25maWcuc2l6ZT0nbWVkaXVtJ10gLSBTaXplIG9mIHRoZVxuICogIHNsaWRlci5cbiAqIEBwYXJhbSB7U3RyaW5nfEVsZW1lbnR8YmFzaWMtY29udHJvbGxlcn5Hcm91cH0gW2NvbmZpZy5jb250YWluZXI9bnVsbF0gLVxuICogIENvbnRhaW5lciBvZiB0aGUgY29udHJvbGxlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb25maWcuY2FsbGJhY2s9bnVsbF0gLSBDYWxsYmFjayB0byBiZSBleGVjdXRlZCB3aGVuIHRoZVxuICogIHZhbHVlIGNoYW5nZXMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGNvbnRyb2xsZXJzIGZyb20gJ2Jhc2ljLWNvbnRyb2xsZXJzJztcbiAqXG4gKiBjb25zdCBzbGlkZXIgPSBuZXcgY29udHJvbGxlcnMuU2xpZGVyKHtcbiAqICAgbGFiZWw6ICdNeSBTbGlkZXInLFxuICogICBtaW46IDIwLFxuICogICBtYXg6IDEwMDAsXG4gKiAgIHN0ZXA6IDEsXG4gKiAgIGRlZmF1bHQ6IDUzNyxcbiAqICAgdW5pdDogJ0h6JyxcbiAqICAgc2l6ZTogJ2xhcmdlJyxcbiAqICAgY29udGFpbmVyOiAnI2NvbnRhaW5lcicsXG4gKiAgIGNhbGxiYWNrOiAodmFsdWUpID0+IGNvbnNvbGUubG9nKHZhbHVlKSxcbiAqIH0pO1xuICovXG5jbGFzcyBTbGlkZXIgZXh0ZW5kcyBkaXNwbGF5KEJhc2VDb21wb25lbnQpIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoJ3NsaWRlcicsIGRlZmF1bHRzLCBjb25maWcpO1xuXG4gICAgdGhpcy5fdmFsdWUgPSB0aGlzLnBhcmFtcy5kZWZhdWx0O1xuICAgIHRoaXMuX29uU2xpZGVyQ2hhbmdlID0gdGhpcy5fb25TbGlkZXJDaGFuZ2UuYmluZCh0aGlzKTtcblxuICAgIHN1cGVyLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDdXJyZW50IHZhbHVlLlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcblxuICAgIGlmICh0aGlzLiRudW1iZXIgJiYgdGhpcy4kcmFuZ2UpIHtcbiAgICAgIHRoaXMuJG51bWJlci52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICB0aGlzLnNsaWRlci52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBsYWJlbCwgbWluLCBtYXgsIHN0ZXAsIHVuaXQsIHNpemUgfSA9IHRoaXMucGFyYW1zO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBgXG4gICAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+JHtsYWJlbH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmFuZ2VcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm51bWJlci13cmFwcGVyXCI+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cIm51bWJlclwiIG1pbj1cIiR7bWlufVwiIG1heD1cIiR7bWF4fVwiIHN0ZXA9XCIke3N0ZXB9XCIgdmFsdWU9XCIke3RoaXMuX3ZhbHVlfVwiIC8+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1bml0XCI+JHt1bml0fTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIodGhpcy50eXBlKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoYHNsaWRlci0ke3NpemV9YCk7XG5cbiAgICB0aGlzLiRyYW5nZSA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5yYW5nZScpO1xuICAgIHRoaXMuJG51bWJlciA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoYGlucHV0W3R5cGU9XCJudW1iZXJcIl1gKTtcblxuICAgIHRoaXMuc2xpZGVyID0gbmV3IGd1aUNvbXBvbmVudHMuU2xpZGVyKHtcbiAgICAgIGNvbnRhaW5lcjogdGhpcy4kcmFuZ2UsXG4gICAgICBjYWxsYmFjazogdGhpcy5fb25TbGlkZXJDaGFuZ2UsXG4gICAgICBtaW46IG1pbixcbiAgICAgIG1heDogbWF4LFxuICAgICAgc3RlcDogc3RlcCxcbiAgICAgIGRlZmF1bHQ6IHRoaXMuX3ZhbHVlLFxuICAgICAgZm9yZWdyb3VuZENvbG9yOiAnI2FiYWJhYicsXG4gICAgfSk7XG5cbiAgICB0aGlzLl9iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVzaXplKCkge1xuICAgIHN1cGVyLnJlc2l6ZSgpO1xuXG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0wqB9ID0gdGhpcy4kcmFuZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdGhpcy5zbGlkZXIucmVzaXplKHdpZHRoLCBoZWlnaHQpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIF9iaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJG51bWJlci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHBhcnNlRmxvYXQodGhpcy4kbnVtYmVyLnZhbHVlKTtcbiAgICAgIC8vIHRoZSBzbGlkZXIgcHJvcGFnYXRlcyB0aGUgdmFsdWVcbiAgICAgIHRoaXMuc2xpZGVyLnZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuXG4gICAgICB0aGlzLmV4ZWN1dGVMaXN0ZW5lcnModGhpcy5fdmFsdWUpO1xuICAgIH0sIGZhbHNlKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBfb25TbGlkZXJDaGFuZ2UodmFsdWUpIHtcbiAgICB0aGlzLiRudW1iZXIudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuXG4gICAgdGhpcy5leGVjdXRlTGlzdGVuZXJzKHRoaXMuX3ZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTbGlkZXI7XG4iLCJpbXBvcnQgQmFzZUNvbXBvbmVudCBmcm9tICcuL0Jhc2VDb21wb25lbnQnO1xuaW1wb3J0IGRpc3BsYXkgZnJvbSAnLi4vbWl4aW5zL2Rpc3BsYXknO1xuXG4vKiogQG1vZHVsZSBiYXNpYy1jb250cm9sbGVycyAqL1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgbGFiZWw6ICcmbmJzcDsnLFxuICBkZWZhdWx0OiAnJyxcbiAgcmVhZG9ubHk6IGZhbHNlLFxuICBjb250YWluZXI6IG51bGwsXG4gIGNhbGxiYWNrOiBudWxsLFxufVxuXG4vKipcbiAqIFRleHQgY29udHJvbGxlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZy5sYWJlbCAtIExhYmVsIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtBcnJheX0gW2NvbmZpZy5kZWZhdWx0PScnXSAtIERlZmF1bHQgdmFsdWUgb2YgdGhlIGNvbnRyb2xsZXIuXG4gKiBAcGFyYW0ge0FycmF5fSBbY29uZmlnLnJlYWRvbmx5PWZhbHNlXSAtIERlZmluZSBpZiB0aGUgY29udHJvbGxlciBpcyByZWFkb25seS5cbiAqIEBwYXJhbSB7U3RyaW5nfEVsZW1lbnR8YmFzaWMtY29udHJvbGxlcn5Hcm91cH0gW2NvbmZpZy5jb250YWluZXI9bnVsbF0gLVxuICogIENvbnRhaW5lciBvZiB0aGUgY29udHJvbGxlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb25maWcuY2FsbGJhY2s9bnVsbF0gLSBDYWxsYmFjayB0byBiZSBleGVjdXRlZCB3aGVuIHRoZVxuICogIHZhbHVlIGNoYW5nZXMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGNvbnRyb2xsZXJzIGZyb20gJ2Jhc2ljLWNvbnRvbGxlcnMnO1xuICpcbiAqIGNvbnN0IHRleHQgPSBuZXcgY29udHJvbGxlcnMuVGV4dCh7XG4gKiAgIGxhYmVsOiAnTXkgVGV4dCcsXG4gKiAgIGRlZmF1bHQ6ICdkZWZhdWx0IHZhbHVlJyxcbiAqICAgcmVhZG9ubHk6IGZhbHNlLFxuICogICBjb250YWluZXI6ICcjY29udGFpbmVyJyxcbiAqICAgY2FsbGJhY2s6ICh2YWx1ZSkgPT4gY29uc29sZS5sb2codmFsdWUpLFxuICogfSk7XG4gKi9cbmNsYXNzIFRleHQgZXh0ZW5kcyBkaXNwbGF5KEJhc2VDb21wb25lbnQpIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoJ3RleHQnLCBkZWZhdWx0cywgY29uZmlnKTtcblxuICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5wYXJhbXMuZGVmYXVsdDtcbiAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDdXJyZW50IHZhbHVlLlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuJGlucHV0LnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgcmVhZG9ubHkgPSB0aGlzLnBhcmFtcy5yZWFkb25seSA/ICdyZWFkb25seScgOiAnJztcbiAgICBjb25zdCBjb250ZW50ID0gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJsYWJlbFwiPiR7dGhpcy5wYXJhbXMubGFiZWx9PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImlubmVyLXdyYXBwZXJcIj5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwidGV4dFwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCIke3RoaXMuX3ZhbHVlfVwiICR7cmVhZG9ubHl9IC8+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIoKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgIHRoaXMuJGlucHV0ID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLnRleHQnKTtcblxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKCkgPT4ge1xuICAgICAgdGhpcy5fdmFsdWUgPSB0aGlzLiRpbnB1dC52YWx1ZTtcbiAgICAgIHRoaXMuZXhlY3V0ZUxpc3RlbmVycyh0aGlzLl92YWx1ZSk7XG4gICAgfSwgZmFsc2UpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRleHQ7XG4iLCJpbXBvcnQgQmFzZUNvbXBvbmVudCBmcm9tICcuL0Jhc2VDb21wb25lbnQnO1xuaW1wb3J0IGRpc3BsYXkgZnJvbSAnLi4vbWl4aW5zL2Rpc3BsYXknO1xuXG4vKiogQG1vZHVsZSBiYXNpYy1jb250cm9sbGVycyAqL1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgbGFiZWw6ICcmbmJzcDsnLFxuICBjb250YWluZXI6IG51bGwsXG59O1xuXG4vKipcbiAqIFRpdGxlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge1N0cmluZ30gY29uZmlnLmxhYmVsIC0gTGFiZWwgb2YgdGhlIGNvbnRyb2xsZXIuXG4gKiBAcGFyYW0ge1N0cmluZ3xFbGVtZW50fGJhc2ljLWNvbnRyb2xsZXJ+R3JvdXB9IFtjb25maWcuY29udGFpbmVyPW51bGxdIC1cbiAqICBDb250YWluZXIgb2YgdGhlIGNvbnRyb2xsZXIuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGNvbnRyb2xsZXIgZnJvbSAnYmFzaWMtY29udHJvbGxlcnMnO1xuICpcbiAqIGNvbnN0IHRpdGxlID0gbmV3IGNvbnRyb2xsZXJzLlRpdGxlKHtcbiAqICAgbGFiZWw6ICdNeSBUaXRsZScsXG4gKiAgIGNvbnRhaW5lcjogJyNjb250YWluZXInXG4gKiB9KTtcbiAqL1xuY2xhc3MgVGl0bGUgZXh0ZW5kcyBkaXNwbGF5KEJhc2VDb21wb25lbnQpIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoJ3RpdGxlJywgZGVmYXVsdHMsIGNvbmZpZyk7XG4gICAgc3VwZXIuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjb250ZW50ID0gYDxzcGFuIGNsYXNzPVwibGFiZWxcIj4ke3RoaXMucGFyYW1zLmxhYmVsfTwvc3Bhbj5gO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIoKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRpdGxlO1xuIiwiaW1wb3J0IEJhc2VDb21wb25lbnQgZnJvbSAnLi9CYXNlQ29tcG9uZW50JztcbmltcG9ydCBkaXNwbGF5IGZyb20gJy4uL21peGlucy9kaXNwbGF5JztcbmltcG9ydCAqIGFzIGVsZW1lbnRzIGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcblxuLyoqIEBtb2R1bGUgYmFzaWMtY29udHJvbGxlcnMgKi9cblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIGxhYmVsOiAnJmJuc3A7JyxcbiAgYWN0aXZlOiBmYWxzZSxcbiAgY29udGFpbmVyOiBudWxsLFxuICBjYWxsYmFjazogbnVsbCxcbn07XG5cbi8qKlxuICogT24vT2ZmIGNvbnRyb2xsZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBjb25maWcubGFiZWwgLSBMYWJlbCBvZiB0aGUgY29udHJvbGxlci5cbiAqIEBwYXJhbSB7QXJyYXl9IFtjb25maWcuYWN0aXZlPWZhbHNlXSAtIERlZmF1bHQgc3RhdGUgb2YgdGhlIHRvZ2dsZS5cbiAqIEBwYXJhbSB7U3RyaW5nfEVsZW1lbnR8YmFzaWMtY29udHJvbGxlcn5Hcm91cH0gW2NvbmZpZy5jb250YWluZXI9bnVsbF0gLVxuICogIENvbnRhaW5lciBvZiB0aGUgY29udHJvbGxlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb25maWcuY2FsbGJhY2s9bnVsbF0gLSBDYWxsYmFjayB0byBiZSBleGVjdXRlZCB3aGVuIHRoZVxuICogIHZhbHVlIGNoYW5nZXMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGNvbnRyb2xsZXJzIGZyb20gJ2Jhc2ljLWNvbnRyb2xsZXJzJztcbiAqXG4gKiBjb25zdCB0b2dnbGUgPSBuZXcgY29udHJvbGxlcnMuVG9nZ2xlKHtcbiAqICAgbGFiZWw6ICdNeSBUb2dnbGUnLFxuICogICBhY3RpdmU6IGZhbHNlLFxuICogICBjb250YWluZXI6ICcjY29udGFpbmVyJyxcbiAqICAgY2FsbGJhY2s6IChhY3RpdmUpID0+IGNvbnNvbGUubG9nKGFjdGl2ZSksXG4gKiB9KTtcbiAqL1xuY2xhc3MgVG9nZ2xlIGV4dGVuZHMgZGlzcGxheShCYXNlQ29tcG9uZW50KSB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKCd0b2dnbGUnLCBkZWZhdWx0cywgY29uZmlnKTtcblxuICAgIHRoaXMuX2FjdGl2ZSA9IHRoaXMucGFyYW1zLmFjdGl2ZTtcblxuICAgIHN1cGVyLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWx1ZSBvZiB0aGUgdG9nZ2xlXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAgc2V0IHZhbHVlKGJvb2wpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IGJvb2w7XG4gIH1cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGlhcyBmb3IgYHZhbHVlYC5cbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuICBzZXQgYWN0aXZlKGJvb2wpIHtcbiAgICB0aGlzLl9hY3RpdmUgPSBib29sO1xuICAgIHRoaXMuX3VwZGF0ZUJ0bigpO1xuICB9XG5cbiAgZ2V0IGFjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIF91cGRhdGVCdG4oKSB7XG4gICAgdmFyIG1ldGhvZCA9IHRoaXMuYWN0aXZlID8gJ2FkZCcgOiAncmVtb3ZlJztcbiAgICB0aGlzLiR0b2dnbGUuY2xhc3NMaXN0W21ldGhvZF0oJ2FjdGl2ZScpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgY29udGVudCA9IGBcbiAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWxcIj4ke3RoaXMucGFyYW1zLmxhYmVsfTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbm5lci13cmFwcGVyXCI+XG4gICAgICAgICR7ZWxlbWVudHMudG9nZ2xlfVxuICAgICAgPC9kaXY+YDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKCk7XG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZCgnYWxpZ24tc21hbGwnKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gICAgdGhpcy4kdG9nZ2xlID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLnRvZ2dsZS1lbGVtZW50Jyk7XG4gICAgLy8gaW5pdGlhbGl6ZSBzdGF0ZVxuICAgIHRoaXMuYWN0aXZlID0gdGhpcy5fYWN0aXZlO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdGhpcy5hY3RpdmUgPSAhdGhpcy5hY3RpdmU7XG4gICAgICB0aGlzLmV4ZWN1dGVMaXN0ZW5lcnModGhpcy5fYWN0aXZlKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUb2dnbGU7XG4iLCJpbXBvcnQgQmFzZUNvbXBvbmVudCBmcm9tICcuL0Jhc2VDb21wb25lbnQnO1xuaW1wb3J0IGRpc3BsYXkgZnJvbSAnLi4vbWl4aW5zL2Rpc3BsYXknO1xuXG4vKiogQG1vZHVsZSBiYXNpYy1jb250cm9sbGVycyAqL1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgbGFiZWw6ICcmbmJzcDsnLFxuICBvcHRpb25zOiBudWxsLFxuICBjb250YWluZXI6IG51bGwsXG4gIGNhbGxiYWNrOiBudWxsLFxufTtcblxuLyoqXG4gKiBMaXN0IG9mIGJ1dHRvbnMgd2l0aG91dCBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZy5sYWJlbCAtIExhYmVsIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtBcnJheX0gW2NvbmZpZy5vcHRpb25zPW51bGxdIC0gT3B0aW9ucyBmb3IgZWFjaCBidXR0b24uXG4gKiBAcGFyYW0ge1N0cmluZ3xFbGVtZW50fGJhc2ljLWNvbnRyb2xsZXJ+R3JvdXB9IFtjb25maWcuY29udGFpbmVyPW51bGxdIC1cbiAqICBDb250YWluZXIgb2YgdGhlIGNvbnRyb2xsZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29uZmlnLmNhbGxiYWNrPW51bGxdIC0gQ2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWQgd2hlbiB0aGVcbiAqICB2YWx1ZSBjaGFuZ2VzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBjb250cm9sbGVycyBmcm9tICdiYXNpYy1jb250cm9sbGVycyc7XG4gKlxuICogY29uc3QgdHJpZ2dlckJ1dHRvbnMgPSBuZXcgY29udHJvbGxlcnMuVHJpZ2dlckJ1dHRvbnMoe1xuICogICBsYWJlbDogJ015IFRyaWdnZXIgQnV0dG9ucycsXG4gKiAgIG9wdGlvbnM6IFsndmFsdWUgMScsICd2YWx1ZSAyJywgJ3ZhbHVlIDMnXSxcbiAqICAgY29udGFpbmVyOiAnI2NvbnRhaW5lcicsXG4gKiAgIGNhbGxiYWNrOiAodmFsdWUsIGluZGV4KSA9PiBjb25zb2xlLmxvZyh2YWx1ZSwgaW5kZXgpLFxuICogfSk7XG4gKi9cbmNsYXNzIFRyaWdnZXJCdXR0b25zIGV4dGVuZHMgZGlzcGxheShCYXNlQ29tcG9uZW50KSB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKCd0cmlnZ2VyLWJ1dHRvbnMnLCBkZWZhdWx0cywgY29uZmlnKTtcblxuICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLnBhcmFtcy5vcHRpb25zKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcignVHJpZ2dlckJ1dHRvbjogSW52YWxpZCBvcHRpb24gXCJvcHRpb25zXCInKTtcblxuICAgIHRoaXMuX2luZGV4ID0gbnVsbDtcbiAgICB0aGlzLl92YWx1ZSA9IG51bGw7XG5cbiAgICBzdXBlci5pbml0aWFsaXplKCk7XG4gIH1cblxuICAvKipcbiAgICogTGFzdCB0cmlnZ2VyZWQgYnV0dG9uIHZhbHVlLlxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIGdldCB2YWx1ZSgpIHsgcmV0dXJuIHRoaXMuX3ZhbHVlOyB9XG5cbiAgLyoqXG4gICAqIExhc3QgdHJpZ2dlcmVkIGJ1dHRvbiBpbmRleC5cbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBnZXQgaW5kZXgoKSB7IHJldHVybiB0aGlzLl9pbmRleDsgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBsYWJlbCwgb3B0aW9ucyB9ID0gdGhpcy5wYXJhbXM7XG5cbiAgICBjb25zdCBjb250ZW50ID0gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJsYWJlbFwiPiR7bGFiZWx9PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImlubmVyLXdyYXBwZXJcIj5cbiAgICAgICAgJHtvcHRpb25zLm1hcCgob3B0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgIHJldHVybiBgPGEgaHJlZj1cIiNcIiBjbGFzcz1cImJ0blwiPiR7b3B0aW9ufTwvYT5gO1xuICAgICAgICB9KS5qb2luKCcnKX1cbiAgICAgIDwvZGl2PmA7XG5cbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcigpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiRidXR0b25zID0gQXJyYXkuZnJvbSh0aGlzLiRlbC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuJykpO1xuICAgIHRoaXMuX2JpbmRFdmVudHMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBfYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLiRidXR0b25zLmZvckVhY2goKCRidG4sIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMucGFyYW1zLm9wdGlvbnNbaW5kZXhdO1xuXG4gICAgICAkYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX2luZGV4ID0gaW5kZXg7XG5cbiAgICAgICAgdGhpcy5leGVjdXRlTGlzdGVuZXJzKHZhbHVlLCBpbmRleCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUcmlnZ2VyQnV0dG9ucztcbiIsImltcG9ydCBCYXNlQ29tcG9uZW50IGZyb20gJy4vY29tcG9uZW50cy9CYXNlQ29tcG9uZW50JztcbmltcG9ydCBHcm91cCBmcm9tICcuL2NvbXBvbmVudHMvR3JvdXAnO1xuaW1wb3J0IE51bWJlckJveCBmcm9tICcuL2NvbXBvbmVudHMvTnVtYmVyQm94JztcbmltcG9ydCBTZWxlY3RCdXR0b25zIGZyb20gJy4vY29tcG9uZW50cy9TZWxlY3RCdXR0b25zJztcbmltcG9ydCBTZWxlY3RMaXN0IGZyb20gJy4vY29tcG9uZW50cy9TZWxlY3RMaXN0JztcbmltcG9ydCBTbGlkZXIgZnJvbSAnLi9jb21wb25lbnRzL1NsaWRlcic7XG5pbXBvcnQgVGV4dCBmcm9tICcuL2NvbXBvbmVudHMvVGV4dCc7XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi9jb21wb25lbnRzL1RpdGxlJztcbmltcG9ydCBUb2dnbGUgZnJvbSAnLi9jb21wb25lbnRzL1RvZ2dsZSc7XG5pbXBvcnQgVHJpZ2dlckJ1dHRvbnMgZnJvbSAnLi9jb21wb25lbnRzL1RyaWdnZXJCdXR0b25zJztcblxuaW1wb3J0IGNvbnRhaW5lciBmcm9tICcuL21peGlucy9jb250YWluZXInO1xuXG4vLyBtYXAgdHlwZSBuYW1lcyB0byBjb25zdHJ1Y3RvcnNcbmNvbnN0IHR5cGVDdG9yTWFwID0ge1xuICAnZ3JvdXAnOiBHcm91cCxcbiAgJ251bWJlci1ib3gnOiBOdW1iZXJCb3gsXG4gICdzZWxlY3QtYnV0dG9ucyc6IFNlbGVjdEJ1dHRvbnMsXG4gICdzZWxlY3QtbGlzdCc6IFNlbGVjdExpc3QsXG4gICdzbGlkZXInOiBTbGlkZXIsXG4gICd0ZXh0JzogVGV4dCxcbiAgJ3RpdGxlJzogVGl0bGUsXG4gICd0b2dnbGUnOiBUb2dnbGUsXG4gICd0cmlnZ2VyLWJ1dHRvbnMnOiBUcmlnZ2VyQnV0dG9ucyxcbn07XG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICBjb250YWluZXI6ICdib2R5Jyxcbn07XG5cbmNsYXNzIENvbnRyb2wgZXh0ZW5kcyBjb250YWluZXIoQmFzZUNvbXBvbmVudCkge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcignY29udHJvbCcsIGRlZmF1bHRzLCBjb25maWcpO1xuXG4gICAgbGV0ICRjb250YWluZXIgPSB0aGlzLnBhcmFtcy5jb250YWluZXI7XG5cbiAgICBpZiAodHlwZW9mICRjb250YWluZXIgPT09ICdzdHJpbmcnKVxuICAgICAgJGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJGNvbnRhaW5lcik7XG5cbiAgICB0aGlzLiRjb250YWluZXIgPSAkY29udGFpbmVyO1xuICB9XG59XG5cbi8qKiBAbW9kdWxlIGJhc2ljLWNvbnRyb2xsZXJzICovXG5cbi8qKlxuICogQ3JlYXRlIGEgd2hvbGUgY29udHJvbCBzdXJmYWNlIGZyb20gYSBqc29uIGRlZmluaXRpb24uXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8RWxlbWVudH0gY29udGFpbmVyIC0gQ29udGFpbmVyIG9mIHRoZSBjb250cm9scy5cbiAqIEBwYXJhbSB7T2JqZWN0fSAtIERlZmluaXRpb25zIGZvciB0aGUgY29udHJvbHMuXG4gKiBAcmV0dXJuIHtPYmplY3R9IC0gQSBgQ29udHJvbGAgaW5zdGFuY2UgdGhhdCBiZWhhdmVzIGxpa2UgYSBncm91cCB3aXRob3V0IGdyYXBoaWMuXG4gKiBAc3RhdGljXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGNvbnRyb2xsZXJzIGZyb20gJ2Jhc2ljLWNvbnRyb2xsZXJzJztcbiAqXG4gKiBjb25zdCBkZWZpbml0aW9ucyA9IFtcbiAqICAge1xuICogICAgIGlkOiAnbXktc2xpZGVyJyxcbiAqICAgICB0eXBlOiAnc2xpZGVyJyxcbiAqICAgICBsYWJlbDogJ015IFNsaWRlcicsXG4gKiAgICAgc2l6ZTogJ2xhcmdlJyxcbiAqICAgICBtaW46IDAsXG4gKiAgICAgbWF4OiAxMDAwLFxuICogICAgIHN0ZXA6IDEsXG4gKiAgICAgZGVmYXVsdDogMjUzLFxuICogICB9LCB7XG4gKiAgICAgaWQ6ICdteS1ncm91cCcsXG4gKiAgICAgdHlwZTogJ2dyb3VwJyxcbiAqICAgICBsYWJlbDogJ0dyb3VwJyxcbiAqICAgICBkZWZhdWx0OiAnb3BlbmVkJyxcbiAqICAgICBlbGVtZW50czogW1xuICogICAgICAge1xuICogICAgICAgICBpZDogJ215LW51bWJlcicsXG4gKiAgICAgICAgIHR5cGU6ICdudW1iZXItYm94JyxcbiAqICAgICAgICAgZGVmYXVsdDogMC40LFxuICogICAgICAgICBtaW46IC0xLFxuICogICAgICAgICBtYXg6IDEsXG4gKiAgICAgICAgIHN0ZXA6IDAuMDEsXG4gKiAgICAgICB9XG4gKiAgICAgXSxcbiAqICAgfVxuICogXTtcbiAqXG4gKiBjb25zdCBjb250cm9scyA9IGNvbnRyb2xsZXJzLmNyZWF0ZSgnI2NvbnRhaW5lcicsIGRlZmluaXRpb25zKTtcbiAqXG4gKiAvLyBhZGQgYSBsaXN0ZW5lciBvbiBhbGwgdGhlIGNvbXBvbmVudCBpbnNpZGUgYG15LWdyb3VwYFxuICogY29udHJvbHMuYWRkTGlzdGVuZXIoJ215LWdyb3VwJywgKGlkLCB2YWx1ZSkgPT4gY29uc29sZS5sb2coaWQsIHZhbHVlKSk7XG4gKlxuICogLy8gcmV0cmlldmUgdGhlIGluc3RhbmNlIG9mIGBteS1udW1iZXJgXG4gKiBjb25zdCBteU51bWJlciA9IGNvbnRyb2xzLmdldENvbXBvbmVudCgnbXktZ3JvdXAvbXktbnVtYmVyJyk7XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZShjb250YWluZXIsIGRlZmluaXRpb25zKSB7XG5cbiAgZnVuY3Rpb24gX3BhcnNlKGNvbnRhaW5lciwgZGVmaW5pdGlvbnMpIHtcbiAgICBkZWZpbml0aW9ucy5mb3JFYWNoKChkZWYsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCB0eXBlID0gZGVmLnR5cGU7XG4gICAgICBjb25zdCBjdG9yID0gdHlwZUN0b3JNYXBbdHlwZV07XG4gICAgICBjb25zdCBjb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBkZWYpO1xuXG4gICAgICAvL1xuICAgICAgY29uZmlnLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgIGRlbGV0ZSBjb25maWcudHlwZTtcblxuICAgICAgY29uc3QgY29tcG9uZW50ID0gbmV3IGN0b3IoY29uZmlnKTtcblxuICAgICAgaWYgKHR5cGUgPT09ICdncm91cCcpXG4gICAgICAgIF9wYXJzZShjb21wb25lbnQsIGNvbmZpZy5lbGVtZW50cyk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgX3Jvb3QgPSBuZXcgQ29udHJvbCh7IGNvbnRhaW5lcjogY29udGFpbmVyIH0pO1xuICBfcGFyc2UoX3Jvb3QsIGRlZmluaXRpb25zKTtcblxuICByZXR1cm4gX3Jvb3Q7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZTtcbiIsImltcG9ydCAqIGFzIF9zdHlsZXMgZnJvbSAnLi91dGlscy9zdHlsZXMnO1xuZXhwb3J0IGNvbnN0IHN0eWxlcyA9IF9zdHlsZXM7XG5cbi8qKiBAbW9kdWxlIGJhc2ljLWNvbnRyb2xsZXJzICovXG5cbi8vIGV4cG9zZSBmb3IgcGx1Z2luc1xuaW1wb3J0IF9CYXNlQ29tcG9uZW50IGZyb20gJy4vY29tcG9uZW50cy9CYXNlQ29tcG9uZW50JztcbmV4cG9ydCBjb25zdCBCYXNlQ29tcG9uZW50ID0gX0Jhc2VDb21wb25lbnQ7XG5cbi8vIGNvbXBvbmVudHNcbmV4cG9ydCB7IGRlZmF1bHQgYXMgR3JvdXAgfSBmcm9tICcuL2NvbXBvbmVudHMvR3JvdXAnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBEcmFnQW5kRHJvcCB9IGZyb20gJy4vY29tcG9uZW50cy9EcmFnQW5kRHJvcCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE51bWJlckJveCB9IGZyb20gJy4vY29tcG9uZW50cy9OdW1iZXJCb3gnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTZWxlY3RCdXR0b25zIH0gZnJvbSAnLi9jb21wb25lbnRzL1NlbGVjdEJ1dHRvbnMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTZWxlY3RMaXN0IH0gZnJvbSAnLi9jb21wb25lbnRzL1NlbGVjdExpc3QnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTbGlkZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvU2xpZGVyJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVGV4dCB9IGZyb20gJy4vY29tcG9uZW50cy9UZXh0JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVGl0bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvVGl0bGUnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBUb2dnbGUgfSBmcm9tICcuL2NvbXBvbmVudHMvVG9nZ2xlJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVHJpZ2dlckJ1dHRvbnMgfSBmcm9tICcuL2NvbXBvbmVudHMvVHJpZ2dlckJ1dHRvbnMnO1xuXG4vLyBmYWN0b3J5XG5leHBvcnQgeyBkZWZhdWx0IGFzIGNyZWF0ZSB9IGZyb20gJy4vZmFjdG9yeSc7XG4vLyBkaXNwbGF5XG5leHBvcnQgeyBzZXRUaGVtZSAgfSBmcm9tICcuL21peGlucy9kaXNwbGF5JztcblxuLyoqXG4gKiBEaXNhYmxlIGRlZmF1bHQgc3R5bGluZyAoZXhwZWN0IGEgYnJva2VuIHVpKVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZVN0eWxlcygpIHtcbiAgX3N0eWxlcy5kaXNhYmxlKCk7XG59O1xuIiwiXG5jb25zdCBzZXBhcmF0b3IgPSAnLyc7XG5cbmZ1bmN0aW9uIGdldEhlYWQocGF0aCkge1xuICByZXR1cm4gcGF0aC5zcGxpdChzZXBhcmF0b3IpWzBdO1xufVxuXG5mdW5jdGlvbiBnZXRUYWlsKHBhdGgpIHtcbiAgY29uc3QgcGFydHMgPSBwYXRoLnNwbGl0KHNlcGFyYXRvcik7XG4gIHBhcnRzLnNoaWZ0KCk7XG4gIHJldHVybiBwYXJ0cy5qb2luKHNlcGFyYXRvcik7XG59XG5cbmNvbnN0IGNvbnRhaW5lciA9IChzdXBlcmNsYXNzKSA9PiBjbGFzcyBleHRlbmRzIHN1cGVyY2xhc3Mge1xuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICB0aGlzLmVsZW1lbnRzID0gbmV3IFNldCgpO1xuXG4gICAgLy8gc3VyZSBvZiB0aGF0ID9cbiAgICBkZWxldGUgdGhpcy5fbGlzdGVuZXJzO1xuICAgIGRlbGV0ZSB0aGlzLl9ncm91cExpc3RlbmVycztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gb25lIG9mIHRoZSBncm91cCBjaGlsZHJlbiBhY2NvcmRpbmcgdG8gaXRzIGBpZGAsIGBudWxsYCBvdGhlcndpc2UuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZ2V0SGVhZChpZCkge1xuXG4gIH1cblxuICBfZ2V0VGFpbChpZCkge1xuXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgY2hpbGQgb2YgdGhlIGdyb3VwIHJlY3Vyc2l2ZWx5IGFjY29yZGluZyB0byB0aGUgZ2l2ZW4gYGlkYCxcbiAgICogYG51bGxgIG90aGVyd2lzZS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldENvbXBvbmVudChpZCkge1xuICAgIGNvbnN0IGhlYWQgPSBnZXRIZWFkKGlkKTtcblxuICAgIGZvciAobGV0IGNvbXBvbmVudCBvZiB0aGlzLmVsZW1lbnRzKSB7XG4gICAgICBpZiAoaGVhZCA9PT0gY29tcG9uZW50LmlkKSB7XG4gICAgICAgIGlmIChoZWFkID09PSBpZClcbiAgICAgICAgICByZXR1cm4gY29tcG9uZW50O1xuICAgICAgICBlbHNlIGlmIChjb21wb25lbnQudHlwZSA9ICdncm91cCcpXG4gICAgICAgICAgcmV0dXJuIGNvbXBvbmVudC5nZXRDb21wb25lbnQoZ2V0VGFpbChpZCkpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmRlZmluZWQgY29tcG9uZW50ICR7aWR9YCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbmRlZmluZWQgY29tcG9uZW50ICR7aWR9YCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIExpc3RlbmVyIG9uIGVhY2ggY29tcG9uZW50cyBvZiB0aGUgZ3JvdXAuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBpZCAtIFBhdGggdG8gY29tcG9uZW50IGlkLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIEZ1bmN0aW9uIHRvIGV4ZWN1dGUuXG4gICAqL1xuICBhZGRMaXN0ZW5lcihpZCwgY2FsbGJhY2spIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgY2FsbGJhY2sgPSBpZDtcbiAgICAgIHRoaXMuX2FkZEdyb3VwTGlzdGVuZXIoJycsICcnLCBjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2FkZEdyb3VwTGlzdGVuZXIoaWQsICcnLCBjYWxsYmFjayk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIF9hZGRHcm91cExpc3RlbmVyKGlkLCBjYWxsSWQsIGNhbGxiYWNrKSB7XG4gICAgaWYgKGlkKSB7XG4gICAgICBjb25zdCBjb21wb25lbnRJZCA9IGdldEhlYWQoaWQpO1xuICAgICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5nZXRDb21wb25lbnQoY29tcG9uZW50SWQpO1xuXG4gICAgICBpZiAoY29tcG9uZW50KSB7XG4gICAgICAgIGlkID0gZ2V0VGFpbChpZCk7XG4gICAgICAgIGNvbXBvbmVudC5fYWRkR3JvdXBMaXN0ZW5lcihpZCwgY2FsbElkLCBjYWxsYmFjayk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZGVmaW5lZCBjb21wb25lbnQgJHt0aGlzLnJvb3RJZH0vJHtjb21wb25lbnRJZH1gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbGVtZW50cy5mb3JFYWNoKChjb21wb25lbnQpID0+IHtcbiAgICAgICAgbGV0IF9jYWxsSWQgPSBjYWxsSWQ7IC8vIGNyZWF0ZSBhIG5ldyBicmFuY2hlXG4gICAgICAgIF9jYWxsSWQgKz0gKGNhbGxJZCA9PT0gJycpID8gY29tcG9uZW50LmlkIDogc2VwYXJhdG9yICsgY29tcG9uZW50LmlkO1xuICAgICAgICBjb21wb25lbnQuX2FkZEdyb3VwTGlzdGVuZXIoaWQsIF9jYWxsSWQsIGNhbGxiYWNrKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb250YWluZXI7XG4iLCJpbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi4vdXRpbHMvc3R5bGVzJztcblxuLyoqIEBtb2R1bGUgYmFzaWMtY29udHJvbGxlcnMgKi9cblxuLy8gZGVmYXVsdCB0aGVtZVxubGV0IHRoZW1lID0gJ2xpZ2h0Jztcbi8vIHNldCBvZiB0aGUgaW5zdGFuY2lhdGVkIGNvbnRyb2xsZXJzXG5jb25zdCBjb250cm9sbGVycyA9IG5ldyBTZXQoKTtcblxuXG4vKipcbiAqIENoYW5nZSB0aGUgdGhlbWUgb2YgdGhlIGNvbnRyb2xsZXJzLCBjdXJyZW50bHkgMyB0aGVtZXMgYXJlIGF2YWlsYWJsZTpcbiAqICAtIGAnbGlnaHQnYCAoZGVmYXVsdClcbiAqICAtIGAnZ3JleSdgXG4gKiAgLSBgJ2RhcmsnYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0aGVtZSAtIE5hbWUgb2YgdGhlIHRoZW1lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0VGhlbWUodmFsdWUpIHtcbiAgY29udHJvbGxlcnMuZm9yRWFjaCgoY29udHJvbGxlcikgPT4gY29udHJvbGxlci4kZWwuY2xhc3NMaXN0LnJlbW92ZSh0aGVtZSkpO1xuICB0aGVtZSA9IHZhbHVlO1xuICBjb250cm9sbGVycy5mb3JFYWNoKChjb250cm9sbGVyKSA9PiBjb250cm9sbGVyLiRlbC5jbGFzc0xpc3QuYWRkKHRoZW1lKSk7XG59XG5cbi8qKlxuICogZGlzcGxheSBtaXhpbiAtIGNvbXBvbmVudHMgd2l0aCBET01cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGRpc3BsYXkgPSAoc3VwZXJjbGFzcykgPT4gY2xhc3MgZXh0ZW5kcyBzdXBlcmNsYXNzIHtcbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgLy8gaW5zZXJ0IHN0eWxlcyB3aGVuIHRoZSBmaXJzdCBjb250cm9sbGVyIGlzIGNyZWF0ZWRcbiAgICBpZiAoY29udHJvbGxlcnMuc2l6ZSA9PT0gMClcbiAgICAgIHN0eWxlcy5pbnNlcnRTdHlsZVNoZWV0KCk7XG5cbiAgICB0aGlzLnJlc2l6ZSA9IHRoaXMucmVzaXplLmJpbmQodGhpcyk7XG5cbiAgICBjb250cm9sbGVycy5hZGQodGhpcyk7XG4gIH1cblxuICBpbml0aWFsaXplKCkge1xuICAgIGxldCAkY29udGFpbmVyID0gdGhpcy5wYXJhbXMuY29udGFpbmVyO1xuXG4gICAgaWYgKCRjb250YWluZXIpIHtcbiAgICAgIC8vIGNzcyBzZWxlY3RvclxuICAgICAgaWYgKHR5cGVvZiAkY29udGFpbmVyID09PSAnc3RyaW5nJykge1xuICAgICAgICAkY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigkY29udGFpbmVyKTtcbiAgICAgIC8vIGdyb3VwXG4gICAgICB9IGVsc2UgaWYgKCRjb250YWluZXIuJGNvbnRhaW5lcikge1xuICAgICAgICAvLyB0aGlzLmdyb3VwID0gJGNvbnRhaW5lcjtcbiAgICAgICAgJGNvbnRhaW5lci5lbGVtZW50cy5hZGQodGhpcyk7XG4gICAgICAgICRjb250YWluZXIgPSAkY29udGFpbmVyLiRjb250YWluZXI7XG4gICAgICB9XG5cbiAgICAgICRjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXIoKSk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucmVzaXplKCksIDApO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZW5kZXIoKSB7XG4gICAgdGhpcy4kZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKHN0eWxlcy5ucywgdGhlbWUsIHRoaXMudHlwZSk7XG5cbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZSk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVzaXplKCkge1xuICAgIGlmICh0aGlzLiRlbCkge1xuICAgICAgY29uc3QgYm91bmRpbmdSZWN0ID0gdGhpcy4kZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBjb25zdCB3aWR0aCA9IGJvdW5kaW5nUmVjdC53aWR0aDtcbiAgICAgIGNvbnN0IG1ldGhvZCA9IHdpZHRoID4gNjAwID8gJ3JlbW92ZScgOiAnYWRkJztcblxuICAgICAgdGhpcy4kZWwuY2xhc3NMaXN0W21ldGhvZF0oJ3NtYWxsJyk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRpc3BsYXk7XG4iLCJcbmV4cG9ydCBjb25zdCB0b2dnbGUgPSBgXG4gIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzPVwidG9nZ2xlLWVsZW1lbnRcIiB2ZXJzaW9uPVwiMS4xXCIgdmlld0JveD1cIjAgMCA1MCA1MFwiIHByZXNlcnZlQXNwZWN0UmF0aW89XCJub25lXCI+XG4gICAgICA8ZyBjbGFzcz1cInhcIj5cbiAgICAgICAgPGxpbmUgeDE9XCI4XCIgeTE9XCI4XCIgeDI9XCI0MlwiIHkyPVwiNDJcIiBzdHJva2U9XCJ3aGl0ZVwiIC8+XG4gICAgICAgIDxsaW5lIHgxPVwiOFwiIHkxPVwiNDJcIiB4Mj1cIjQyXCIgeTI9XCI4XCIgc3Ryb2tlPVwid2hpdGVcIiAvPlxuICAgICAgPC9nPlxuICA8L3N2Zz5cbmA7XG5cbmV4cG9ydCBjb25zdCBhcnJvd1JpZ2h0ID0gYFxuICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzcz1cImFycm93LXJpZ2h0XCIgdmVyc2lvbj1cIjEuMVwiIHZpZXdCb3g9XCIwIDAgNTAgNTBcIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwibm9uZVwiPlxuICAgIDxsaW5lIHgxPVwiMTBcIiB5MT1cIjEwXCIgeDI9XCI0MFwiIHkyPVwiMjVcIiAvPlxuICAgIDxsaW5lIHgxPVwiMTBcIiB5MT1cIjQwXCIgeDI9XCI0MFwiIHkyPVwiMjVcIiAvPlxuICA8L3N2Zz5cbmA7XG5cbmV4cG9ydCBjb25zdCBhcnJvd0xlZnQgPSBgXG4gIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzPVwiYXJyb3ctbGVmdFwiIHZlcnNpb249XCIxLjFcIiB2aWV3Qm94PVwiMCAwIDUwIDUwXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cIm5vbmVcIj5cbiAgICA8bGluZSB4MT1cIjQwXCIgeTE9XCIxMFwiIHgyPVwiMTBcIiB5Mj1cIjI1XCIgLz5cbiAgICA8bGluZSB4MT1cIjQwXCIgeTE9XCI0MFwiIHgyPVwiMTBcIiB5Mj1cIjI1XCIgLz5cbiAgPC9zdmc+XG5gO1xuXG5leHBvcnQgY29uc3Qgc21hbGxBcnJvd1JpZ2h0ID0gYFxuICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzcz1cInNtYWxsLWFycm93LXJpZ2h0XCIgdmlld0JveD1cIjAgMCA1MCA1MFwiPlxuICAgIDxwYXRoIGQ9XCJNIDIwIDE1IEwgMzUgMjUgTCAyMCAzNSBaXCIgLz5cbiAgPC9zdmc+XG5gO1xuXG5leHBvcnQgY29uc3Qgc21hbGxBcnJvd0JvdHRvbSA9IGBcbiAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3M9XCJzbWFsbC1hcnJvdy1ib3R0b21cIiB2aWV3Qm94PVwiMCAwIDUwIDUwXCI+XG4gICAgPHBhdGggZD1cIk0gMTUgMTcgTCAzNSAxNyBMIDI1IDMyIFpcIiAvPlxuICA8L3N2Zz5cbmA7XG5cblxuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiIC5iYXNpYy1jb250cm9sbGVycyB7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIHsgd2lkdGg6IDEwMCU7IG1heC13aWR0aDogODAwcHg7IGhlaWdodDogMzRweDsgcGFkZGluZzogM3B4OyBtYXJnaW46IDRweCAwOyBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmOyBib3JkZXI6IDFweCBzb2xpZCAjYWFhYWFhOyBib3gtc2l6aW5nOiBib3JkZXItYm94OyBib3JkZXItcmFkaXVzOiAycHg7IGRpc3BsYXk6IGJsb2NrOyBjb2xvcjogIzQ2NDY0NjsgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lOyAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lOyAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7IC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7IC1tcy11c2VyLXNlbGVjdDogbm9uZTsgdXNlci1zZWxlY3Q6IG5vbmU7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC5sYWJlbCB7IGZvbnQ6IGl0YWxpYyBub3JtYWwgMS4yZW0gUXVpY2tzYW5kLCBhcmlhbCwgc2Fucy1zZXJpZjsgbGluZS1oZWlnaHQ6IDI2cHg7IG92ZXJmbG93OiBoaWRkZW47IHRleHQtYWxpZ246IHJpZ2h0OyBwYWRkaW5nOiAwIDhweCAwIDA7IGRpc3BsYXk6IGJsb2NrOyBib3gtc2l6aW5nOiBib3JkZXItYm94OyB3aWR0aDogMjQlOyBmbG9hdDogbGVmdDsgd2hpdGUtc3BhY2U6IG5vd3JhcDsgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTsgLW1vei11c2VyLXNlbGVjdDogbm9uZTsgLW1zLXVzZXItc2VsZWN0OiBub25lOyAtby11c2VyLXNlbGVjdDogbm9uZTsgdXNlci1zZWxlY3Q6IG5vbmU7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC5pbm5lci13cmFwcGVyIHsgZGlzcGxheTogLXdlYmtpdC1pbmxpbmUtZmxleDsgZGlzcGxheTogaW5saW5lLWZsZXg7IC13ZWJraXQtZmxleC13cmFwOiBuby13cmFwOyBmbGV4LXdyYXA6IG5vLXdyYXA7IHdpZHRoOiA3NiU7IGZsb2F0OiBsZWZ0OyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbCB7IGhlaWdodDogNDhweDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGw6bm90KC5hbGlnbi1zbWFsbCkgeyBoZWlnaHQ6IGF1dG87IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsOm5vdCguYWxpZ24tc21hbGwpIC5sYWJlbCB7IHdpZHRoOiAxMDAlOyBmbG9hdDogbm9uZTsgdGV4dC1hbGlnbjogbGVmdDsgbGluZS1oZWlnaHQ6IDQwcHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsOm5vdCguYWxpZ24tc21hbGwpIC5pbm5lci13cmFwcGVyIHsgd2lkdGg6IDEwMCU7IGZsb2F0OiBub25lOyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbC5hbGlnbi1zbWFsbCAubGFiZWwgeyBkaXNwbGF5OiBibG9jazsgbWFyZ2luLXJpZ2h0OiAyMHB4OyB0ZXh0LWFsaWduOiBsZWZ0OyBsaW5lLWhlaWdodDogNDBweDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGwuYWxpZ24tc21hbGwgLmlubmVyLXdyYXBwZXIgeyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHdpZHRoOiBhdXRvOyB9IC5iYXNpYy1jb250cm9sbGVycyAuYXJyb3ctcmlnaHQsIC5iYXNpYy1jb250cm9sbGVycyAuYXJyb3ctbGVmdCB7IGJvcmRlci1yYWRpdXM6IDJweDsgd2lkdGg6IDE0cHg7IGhlaWdodDogMjZweDsgY3Vyc29yOiBwb2ludGVyOyBiYWNrZ3JvdW5kLWNvbG9yOiAjNDY0NjQ2OyB9IC5iYXNpYy1jb250cm9sbGVycyAuYXJyb3ctcmlnaHQgbGluZSwgLmJhc2ljLWNvbnRyb2xsZXJzIC5hcnJvdy1sZWZ0IGxpbmUgeyBzdHJva2Utd2lkdGg6IDNweDsgc3Ryb2tlOiAjZmZmZmZmOyB9IC5iYXNpYy1jb250cm9sbGVycyAuYXJyb3ctcmlnaHQ6aG92ZXIsIC5iYXNpYy1jb250cm9sbGVycyAuYXJyb3ctbGVmdDpob3ZlciB7IGJhY2tncm91bmQtY29sb3I6ICM2ODY4Njg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC5hcnJvdy1yaWdodDphY3RpdmUsIC5iYXNpYy1jb250cm9sbGVycyAuYXJyb3ctbGVmdDphY3RpdmUgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjOTA5MDkwOyB9IC5iYXNpYy1jb250cm9sbGVycyAuc21hbGwtYXJyb3ctcmlnaHQsIC5iYXNpYy1jb250cm9sbGVycyAuc21hbGwtYXJyb3ctYm90dG9tIHsgd2lkdGg6IDI2cHg7IGhlaWdodDogMjZweDsgY3Vyc29yOiBwb2ludGVyOyB9IC5iYXNpYy1jb250cm9sbGVycyAuc21hbGwtYXJyb3ctcmlnaHQgcGF0aCwgLmJhc2ljLWNvbnRyb2xsZXJzIC5zbWFsbC1hcnJvdy1ib3R0b20gcGF0aCB7IGZpbGw6ICM5MDkwOTA7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC5zbWFsbC1hcnJvdy1yaWdodDpob3ZlciBwYXRoLCAuYmFzaWMtY29udHJvbGxlcnMgLnNtYWxsLWFycm93LWJvdHRvbTpob3ZlciBwYXRoIHsgZmlsbDogIzY4Njg2ODsgfSAuYmFzaWMtY29udHJvbGxlcnMgLnRvZ2dsZS1lbGVtZW50IHsgd2lkdGg6IDI2cHg7IGhlaWdodDogMjZweDsgYm9yZGVyLXJhZGl1czogMnB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjNDY0NjQ2OyBjdXJzb3I6IHBvaW50ZXI7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC50b2dnbGUtZWxlbWVudDpob3ZlciB7IGJhY2tncm91bmQtY29sb3I6ICM2ODY4Njg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC50b2dnbGUtZWxlbWVudCBsaW5lIHsgc3Ryb2tlLXdpZHRoOiAzcHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC50b2dnbGUtZWxlbWVudCAueCB7IGRpc3BsYXk6IG5vbmU7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC50b2dnbGUtZWxlbWVudC5hY3RpdmUgLnggeyBkaXNwbGF5OiBibG9jazsgfSAuYmFzaWMtY29udHJvbGxlcnMgLmJ0biB7IGRpc3BsYXk6IGJsb2NrOyB0ZXh0LWFsaWduOiBjZW50ZXI7IGZvbnQ6IG5vcm1hbCBub3JtYWwgMTJweCBhcmlhbDsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyBoZWlnaHQ6IDI2cHg7IGxpbmUtaGVpZ2h0OiAyNnB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjNDY0NjQ2OyBib3JkZXI6IG5vbmU7IGNvbG9yOiAjZmZmZmZmOyBtYXJnaW46IDAgNHB4IDAgMDsgcGFkZGluZzogMDsgYm94LXNpemluZzogYm9yZGVyLWJveDsgYm9yZGVyLXJhZGl1czogMnB4OyBjdXJzb3I6IHBvaW50ZXI7IC13ZWJraXQtZmxleC1ncm93OiAxOyBmbGV4LWdyb3c6IDE7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC5idG46bGFzdC1jaGlsZCB7IG1hcmdpbjogMDsgfSAuYmFzaWMtY29udHJvbGxlcnMgLmJ0bjpob3ZlciB7IGJhY2tncm91bmQtY29sb3I6ICM2ODY4Njg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC5idG46YWN0aXZlLCAuYmFzaWMtY29udHJvbGxlcnMgLmJ0bi5hY3RpdmUgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjOTA5MDkwOyB9IC5iYXNpYy1jb250cm9sbGVycyAuYnRuOmZvY3VzIHsgb3V0bGluZTogbm9uZTsgfSAuYmFzaWMtY29udHJvbGxlcnMgLm51bWJlciB7IGhlaWdodDogMjZweDsgZGlzcGxheTogaW5saW5lLWJsb2NrOyBwb3NpdGlvbjogcmVsYXRpdmU7IGZvbnQ6IG5vcm1hbCBub3JtYWwgMS4yZW0gUXVpY2tzYW5kLCBhcmlhbCwgc2Fucy1zZXJpZjsgdmVydGljYWwtYWxpZ246IHRvcDsgYm9yZGVyOiBub25lOyBiYWNrZ3JvdW5kOiBub25lOyBjb2xvcjogIzQ2NDY0NjsgcGFkZGluZzogMCA0cHg7IG1hcmdpbjogMDsgYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTsgYm9yZGVyLXJhZGl1czogMnB4OyBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9IC5iYXNpYy1jb250cm9sbGVycyAubnVtYmVyOmZvY3VzIHsgb3V0bGluZTogbm9uZTsgfSAuYmFzaWMtY29udHJvbGxlcnMgc2VsZWN0IHsgaGVpZ2h0OiAyNnB4OyBsaW5lLWhlaWdodDogMjZweDsgYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTsgYm9yZGVyLXJhZGl1czogMnB4OyBib3JkZXI6IG5vbmU7IHZlcnRpY2FsLWFsaWduOiB0b3A7IHBhZGRpbmc6IDA7IG1hcmdpbjogMDsgfSAuYmFzaWMtY29udHJvbGxlcnMgc2VsZWN0OmZvY3VzIHsgb3V0bGluZTogbm9uZTsgfSAuYmFzaWMtY29udHJvbGxlcnMgaW5wdXRbdHlwZT10ZXh0XSB7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDI2cHg7IGxpbmUtaGVpZ2h0OiAyNnB4OyBib3JkZXI6IDA7IHBhZGRpbmc6IDAgNHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5OyBib3JkZXItcmFkaXVzOiAycHg7IGNvbG9yOiAjNTY1NjU2OyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbCAuYXJyb3ctcmlnaHQsIC5iYXNpYy1jb250cm9sbGVycy5zbWFsbCAuYXJyb3ctbGVmdCB7IHdpZHRoOiAyNHB4OyBoZWlnaHQ6IDQwcHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsIC50b2dnbGUtZWxlbWVudCB7IHdpZHRoOiA0MHB4OyBoZWlnaHQ6IDQwcHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsIC5idG4geyBoZWlnaHQ6IDQwcHg7IGxpbmUtaGVpZ2h0OiA0MHB4OyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbCAubnVtYmVyIHsgaGVpZ2h0OiA0MHB4OyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbCBzZWxlY3QgeyBoZWlnaHQ6IDQwcHg7IGxpbmUtaGVpZ2h0OiA0MHB4OyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbCBpbnB1dFt0eXBlPXRleHRdIHsgaGVpZ2h0OiA0MHB4OyBsaW5lLWhlaWdodDogNDBweDsgfSAuYmFzaWMtY29udHJvbGxlcnMudGl0bGUgeyBib3JkZXI6IG5vbmUgIWltcG9ydGFudDsgbWFyZ2luLWJvdHRvbTogMDsgbWFyZ2luLXRvcDogOHB4OyBwYWRkaW5nLXRvcDogOHB4OyBwYWRkaW5nLWJvdHRvbTogMDsgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDsgaGVpZ2h0OiAyNXB4OyB9IC5iYXNpYy1jb250cm9sbGVycy50aXRsZSAubGFiZWwgeyBmb250OiBub3JtYWwgYm9sZCAxLjNlbSBRdWlja3NhbmQsIGFyaWFsLCBzYW5zLXNlcmlmOyBoZWlnaHQ6IDEwMCU7IG92ZXJmbG93OiBoaWRkZW47IHRleHQtYWxpZ246IGxlZnQ7IHBhZGRpbmc6IDA7IHdpZHRoOiAxMDAlOyBib3gtc2l6aW5nOiBib3JkZXItYm94OyAtd2Via2l0LWZsZXgtZ3JvdzogMTsgZmxleC1ncm93OiAxOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncm91cCB7IGhlaWdodDogYXV0bzsgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyb3VwIC5ncm91cC1oZWFkZXIgLmxhYmVsIHsgZm9udDogbm9ybWFsIGJvbGQgMS4zZW0gUXVpY2tzYW5kLCBhcmlhbCwgc2Fucy1zZXJpZjsgaGVpZ2h0OiAyNnB4OyBsaW5lLWhlaWdodDogMjZweDsgb3ZlcmZsb3c6IGhpZGRlbjsgdGV4dC1hbGlnbjogbGVmdDsgcGFkZGluZzogMCAwIDAgMzZweDsgd2lkdGg6IDEwMCU7IGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC13ZWJraXQtZmxleC1ncm93OiAxOyBmbGV4LWdyb3c6IDE7IGZsb2F0OiBub25lOyBjdXJzb3I6IHBvaW50ZXI7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyb3VwIC5ncm91cC1oZWFkZXIgLnNtYWxsLWFycm93LXJpZ2h0IHsgd2lkdGg6IDI2cHg7IGhlaWdodDogMjZweDsgcG9zaXRpb246IGFic29sdXRlOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncm91cCAuZ3JvdXAtaGVhZGVyIC5zbWFsbC1hcnJvdy1ib3R0b20geyB3aWR0aDogMjZweDsgaGVpZ2h0OiAyNnB4OyBwb3NpdGlvbjogYWJzb2x1dGU7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyb3VwIC5ncm91cC1jb250ZW50IHsgb3ZlcmZsb3c6IGhpZGRlbjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JvdXAgLmdyb3VwLWNvbnRlbnQgPiBkaXYgeyBtYXJnaW46IDRweCBhdXRvOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncm91cCAuZ3JvdXAtY29udGVudCA+IGRpdjpsYXN0LWNoaWxkIHsgbWFyZ2luLWJvdHRvbTogMDsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JvdXAub3BlbmVkIC5ncm91cC1oZWFkZXIgLnNtYWxsLWFycm93LXJpZ2h0IHsgZGlzcGxheTogbm9uZTsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JvdXAub3BlbmVkIC5ncm91cC1oZWFkZXIgLnNtYWxsLWFycm93LWJvdHRvbSB7IGRpc3BsYXk6IGJsb2NrOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncm91cC5vcGVuZWQgLmdyb3VwLWNvbnRlbnQgeyBkaXNwbGF5OiBibG9jazsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JvdXAuY2xvc2VkIC5ncm91cC1oZWFkZXIgLnNtYWxsLWFycm93LXJpZ2h0IHsgZGlzcGxheTogYmxvY2s7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyb3VwLmNsb3NlZCAuZ3JvdXAtaGVhZGVyIC5zbWFsbC1hcnJvdy1ib3R0b20geyBkaXNwbGF5OiBub25lOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncm91cC5jbG9zZWQgLmdyb3VwLWNvbnRlbnQgeyBkaXNwbGF5OiBub25lOyB9IC5iYXNpYy1jb250cm9sbGVycy5zbGlkZXIgLnJhbmdlIHsgaGVpZ2h0OiAyNnB4OyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IG1hcmdpbjogMDsgLXdlYmtpdC1mbGV4LWdyb3c6IDQ7IGZsZXgtZ3JvdzogNDsgcG9zaXRpb246IHJlbGF0aXZlOyB9IC5iYXNpYy1jb250cm9sbGVycy5zbGlkZXIgLnJhbmdlIGNhbnZhcyB7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAwOyBsZWZ0OiAwOyB9IC5iYXNpYy1jb250cm9sbGVycy5zbGlkZXIgLm51bWJlci13cmFwcGVyIHsgZGlzcGxheTogaW5saW5lOyBoZWlnaHQ6IDI2cHg7IHRleHQtYWxpZ246IHJpZ2h0OyAtd2Via2l0LWZsZXgtZ3JvdzogMzsgZmxleC1ncm93OiAzOyB9IC5iYXNpYy1jb250cm9sbGVycy5zbGlkZXIgLm51bWJlci13cmFwcGVyIC5udW1iZXIgeyBsZWZ0OiA1cHg7IHdpZHRoOiA1NHB4OyB0ZXh0LWFsaWduOiByaWdodDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc2xpZGVyIC5udW1iZXItd3JhcHBlciAudW5pdCB7IGZvbnQ6IGl0YWxpYyBub3JtYWwgMWVtIFF1aWNrc2FuZCwgYXJpYWwsIHNhbnMtc2VyaWY7IGxpbmUtaGVpZ2h0OiAyNnB4OyBoZWlnaHQ6IDI2cHg7IHdpZHRoOiAzMHB4OyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHBvc2l0aW9uOiByZWxhdGl2ZTsgcGFkZGluZy1sZWZ0OiA1cHg7IHBhZGRpbmctcmlnaHQ6IDVweDsgY29sb3I6ICM1NjU2NTY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNsaWRlciAubnVtYmVyLXdyYXBwZXIgLnVuaXQgc3VwIHsgbGluZS1oZWlnaHQ6IDdweDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc2xpZGVyLnNsaWRlci1sYXJnZSAucmFuZ2UgeyAtd2Via2l0LWZsZXgtZ3JvdzogNTA7IGZsZXgtZ3JvdzogNTA7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNsaWRlci5zbGlkZXItbGFyZ2UgLm51bWJlci13cmFwcGVyIHsgLXdlYmtpdC1mbGV4LWdyb3c6IDE7IGZsZXgtZ3JvdzogMTsgfSAuYmFzaWMtY29udHJvbGxlcnMuc2xpZGVyLnNsaWRlci1zbWFsbCAucmFuZ2UgeyAtd2Via2l0LWZsZXgtZ3JvdzogMjsgZmxleC1ncm93OiAyOyB9IC5iYXNpYy1jb250cm9sbGVycy5zbGlkZXIuc2xpZGVyLXNtYWxsIC5udW1iZXItd3JhcHBlciB7IC13ZWJraXQtZmxleC1ncm93OiA0OyBmbGV4LWdyb3c6IDQ7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsLnNsaWRlciAucmFuZ2UgeyBoZWlnaHQ6IDQwcHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsLnNsaWRlciAubnVtYmVyLXdyYXBwZXIgeyBoZWlnaHQ6IDQwcHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsLnNsaWRlciAubnVtYmVyLXdyYXBwZXIgLnVuaXQgeyBsaW5lLWhlaWdodDogNDBweDsgaGVpZ2h0OiA0MHB4OyB9IC5iYXNpYy1jb250cm9sbGVycy5udW1iZXItYm94IC5udW1iZXIgeyB3aWR0aDogMTIwcHg7IG1hcmdpbjogMCAxMHB4OyB2ZXJ0aWNhbC1hbGlnbjogdG9wOyB9IC5iYXNpYy1jb250cm9sbGVycy5zZWxlY3QtbGlzdCBzZWxlY3QgeyBtYXJnaW46IDAgMTBweDsgd2lkdGg6IDEyMHB4OyBmb250OiBub3JtYWwgbm9ybWFsIDEuMmVtIFF1aWNrc2FuZCwgYXJpYWwsIHNhbnMtc2VyaWY7IGNvbG9yOiAjNDY0NjQ2OyB9IC5iYXNpYy1jb250cm9sbGVycy5zZWxlY3QtYnV0dG9ucyAuYnRuOmZpcnN0LW9mLXR5cGUgeyBtYXJnaW4tbGVmdDogNHB4OyB9IC5iYXNpYy1jb250cm9sbGVycy50ZXh0IGlucHV0W3R5cGU9dGV4dF0geyBmb250OiBub3JtYWwgbm9ybWFsIDEuMmVtIFF1aWNrc2FuZCwgYXJpYWwsIHNhbnMtc2VyaWY7IGNvbG9yOiAjNDY0NjQ2OyB9IC5iYXNpYy1jb250cm9sbGVycy5kcmFnLWFuZC1kcm9wIHsgd2lkdGg6IDEwMCU7IHRleHQtYWxpZ246IGNlbnRlcjsgZm9udC13ZWlnaHQ6IGJvbGQ7IGhlaWdodDogMTAwcHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRyYWctYW5kLWRyb3AgLmRyb3Atem9uZSB7IGJvcmRlcjogMXB4IGRvdHRlZCAjYzRjNGM0OyBib3JkZXItcmFkaXVzOiAycHg7IHRyYW5zaXRpb246IGJhY2tncm91bmQgMjAwbXM7IGhlaWdodDogOTBweDsgfSAuYmFzaWMtY29udHJvbGxlcnMuZHJhZy1hbmQtZHJvcCAuZHJvcC16b25lLmRyYWcgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjYzRjNGM0OyB9IC5iYXNpYy1jb250cm9sbGVycy5kcmFnLWFuZC1kcm9wIC5sYWJlbCB7IGRpc3BsYXk6IGJsb2NrOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiA5MHB4OyBsaW5lLWhlaWdodDogOTBweDsgbWFyZ2luOiAwOyBwYWRkaW5nOiAwOyB0ZXh0LWFsaWduOiBjZW50ZXI7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRyYWctYW5kLWRyb3AucHJvY2VzcyAubGFiZWwgeyBkaXNwbGF5OiBub25lOyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbC5kcmFnLWFuZC1kcm9wIHsgaGVpZ2h0OiAxMjBweDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGwuZHJhZy1hbmQtZHJvcCAuZHJvcC16b25lIHsgaGVpZ2h0OiAxMTBweDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGwuZHJhZy1hbmQtZHJvcCAubGFiZWwgeyBkaXNwbGF5OiBibG9jazsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTEwcHg7IGxpbmUtaGVpZ2h0OiAxMTBweDsgbWFyZ2luOiAwOyBwYWRkaW5nOiAwOyB0ZXh0LWFsaWduOiBjZW50ZXI7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjMzYzNjM2OyBib3JkZXI6IDFweCBzb2xpZCAjNTg1ODU4OyBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjk1KTsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAudG9nZ2xlLWVsZW1lbnQgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC50b2dnbGUtZWxlbWVudCBsaW5lIHsgc3Ryb2tlOiAjMzYzNjM2OyB9IC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC50b2dnbGUtZWxlbWVudDpob3ZlciB7IGJhY2tncm91bmQtY29sb3I6ICNjZGNkY2Q7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLmFycm93LXJpZ2h0LCAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAuYXJyb3ctbGVmdCB7IGJhY2tncm91bmQtY29sb3I6ICNlZmVmZWY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLmFycm93LXJpZ2h0IGxpbmUsIC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC5hcnJvdy1sZWZ0IGxpbmUgeyBzdHJva2U6ICMzNjM2MzY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLmFycm93LXJpZ2h0OmhvdmVyLCAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAuYXJyb3ctbGVmdDpob3ZlciB7IGJhY2tncm91bmQtY29sb3I6ICNjZGNkY2Q7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLmFycm93LXJpZ2h0OmFjdGl2ZSwgLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLmFycm93LWxlZnQ6YWN0aXZlIHsgYmFja2dyb3VuZC1jb2xvcjogI2FiYWJhYjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAuc21hbGwtYXJyb3ctcmlnaHQgcGF0aCwgLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLnNtYWxsLWFycm93LWJvdHRvbSBwYXRoIHsgZmlsbDogI2FiYWJhYjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAuc21hbGwtYXJyb3ctcmlnaHQ6aG92ZXIgcGF0aCwgLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLnNtYWxsLWFycm93LWJvdHRvbTpob3ZlciBwYXRoIHsgZmlsbDogI2NkY2RjZDsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAubnVtYmVyLCAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSBzZWxlY3QsIC5iYXNpYy1jb250cm9sbGVycy5ncmV5IGlucHV0W3R5cGU9dGV4dF0geyBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjk1KTsgYmFja2dyb3VuZC1jb2xvcjogIzQ1NDU0NTsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAuYnRuIHsgYmFja2dyb3VuZC1jb2xvcjogI2VmZWZlZjsgY29sb3I6ICMzNjM2MzY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLmJ0bjpob3ZlciB7IGJhY2tncm91bmQtY29sb3I6ICNjZGNkY2Q7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLmJ0bjphY3RpdmUsIC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC5idG4uYWN0aXZlIHsgYmFja2dyb3VuZC1jb2xvcjogI2FiYWJhYjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JleS5zbGlkZXIgLmlubmVyLXdyYXBwZXIgLm51bWJlci13cmFwcGVyIC51bml0IHsgY29sb3I6ICNiY2JjYmM7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkuZ3JvdXAgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjNTA1MDUwOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncmV5LmRyYWctYW5kLWRyb3AgLmRyb3Atem9uZSB7IGJvcmRlcjogMXB4IGRvdHRlZCAjNzI3MjcyOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncmV5LmRyYWctYW5kLWRyb3AgLmRyb3Atem9uZS5kcmFnIHsgYmFja2dyb3VuZC1jb2xvcjogIzcyNzI3MjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyayB7IGJhY2tncm91bmQtY29sb3I6ICMyNDI0MjQ7IGJvcmRlcjogMXB4IHNvbGlkICMyODI4Mjg7IGNvbG9yOiAjZmZmZmZmOyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC50b2dnbGUtZWxlbWVudCB7IGJhY2tncm91bmQtY29sb3I6ICM0NjQ2NDY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLnRvZ2dsZS1lbGVtZW50IGxpbmUgeyBzdHJva2U6ICNmZmZmZmY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLnRvZ2dsZS1lbGVtZW50OmhvdmVyIHsgYmFja2dyb3VuZC1jb2xvcjogIzY4Njg2ODsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYXJyb3ctcmlnaHQsIC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5hcnJvdy1sZWZ0IHsgYmFja2dyb3VuZC1jb2xvcjogIzQ2NDY0NjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYXJyb3ctcmlnaHQgbGluZSwgLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLmFycm93LWxlZnQgbGluZSB7IHN0cm9rZTogI2ZmZmZmZjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYXJyb3ctcmlnaHQ6aG92ZXIsIC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5hcnJvdy1sZWZ0OmhvdmVyIHsgYmFja2dyb3VuZC1jb2xvcjogIzY4Njg2ODsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYXJyb3ctcmlnaHQ6YWN0aXZlLCAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYXJyb3ctbGVmdDphY3RpdmUgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjOTA5MDkwOyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5zbWFsbC1hcnJvdy1yaWdodCBwYXRoLCAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuc21hbGwtYXJyb3ctYm90dG9tIHBhdGggeyBmaWxsOiAjOTA5MDkwOyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5zbWFsbC1hcnJvdy1yaWdodDpob3ZlciBwYXRoLCAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuc21hbGwtYXJyb3ctYm90dG9tOmhvdmVyIHBhdGggeyBmaWxsOiAjNjg2ODY4OyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5udW1iZXIsIC5iYXNpYy1jb250cm9sbGVycy5kYXJrIHNlbGVjdCwgLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgaW5wdXRbdHlwZT10ZXh0XSB7IGNvbG9yOiAjZmZmZmZmOyBiYWNrZ3JvdW5kLWNvbG9yOiAjMzMzMzMzOyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5idG4geyBiYWNrZ3JvdW5kLWNvbG9yOiAjNDY0NjQ2OyBjb2xvcjogI2ZmZmZmZjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYnRuOmhvdmVyIHsgYmFja2dyb3VuZC1jb2xvcjogIzY4Njg2ODsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYnRuOmFjdGl2ZSwgLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLmJ0bi5hY3RpdmUgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjOTA5MDkwOyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrLnNsaWRlciAuaW5uZXItd3JhcHBlciAubnVtYmVyLXdyYXBwZXIgLnVuaXQgeyBjb2xvcjogI2NkY2RjZDsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyay5ncm91cCB7IGJhY2tncm91bmQtY29sb3I6ICMzZTNlM2U7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsuZHJhZy1hbmQtZHJvcCAuZHJvcC16b25lIHsgYm9yZGVyOiAxcHggZG90dGVkICM0MjQyNDI7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsuZHJhZy1hbmQtZHJvcCAuZHJvcC16b25lLmRyYWcgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjNDI0MjQyOyB9IFwiOyIsImltcG9ydCB7IG5hbWUgfSBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHN0eWxlcyBmcm9tICcuL3N0eWxlcy1kZWNsYXJhdGlvbnMuanMnO1xuXG5leHBvcnQgY29uc3QgbnMgPSBuYW1lO1xuXG5jb25zdCBuc0NsYXNzID0gYC4ke25zfWA7XG5sZXQgX2Rpc2FibGVkID0gZmFsc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICBfZGlzYWJsZWQgPSB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0U3R5bGVTaGVldCgpIHtcbiAgaWYgKF9kaXNhYmxlZCkgcmV0dXJuO1xuXG4gIGNvbnN0ICRjc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAkY3NzLnNldEF0dHJpYnV0ZSgnZGF0YS1uYW1lc3BhY2UnLCBucyk7XG4gICRjc3MudHlwZSA9ICd0ZXh0L2Nzcyc7XG5cbiAgaWYgKCRjc3Muc3R5bGVTaGVldClcbiAgICAkY3NzLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHN0eWxlcztcbiAgZWxzZVxuICAgICRjc3MuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3R5bGVzKSk7XG5cbiAgLy8gaW5zZXJ0IGJlZm9yZSBsaW5rIG9yIHN0eWxlcyBpZiBleGlzdHNcbiAgY29uc3QgJGxpbmsgPSBkb2N1bWVudC5oZWFkLnF1ZXJ5U2VsZWN0b3IoJ2xpbmsnKTtcbiAgY29uc3QgJHN0eWxlID0gZG9jdW1lbnQuaGVhZC5xdWVyeVNlbGVjdG9yKCdzdHlsZScpO1xuXG4gIGlmICgkbGluaylcbiAgICBkb2N1bWVudC5oZWFkLmluc2VydEJlZm9yZSgkY3NzLCAkbGluayk7XG4gIGVsc2UgaWYgKCRzdHlsZSlcbiAgICBkb2N1bWVudC5oZWFkLmluc2VydEJlZm9yZSgkY3NzLCAkc3R5bGUpO1xuICBlbHNlXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCgkY3NzKTtcbn1cblxuIiwiaW1wb3J0ICogYXMgY29udHJvbGxlcnMgZnJvbSAnLi4vLi4vLi4vZGlzdC9pbmRleCc7XG5cbi8vIGNvbXBvbmVudHNcbmNvbnN0IHRpdGxlMSA9IG5ldyBjb250cm9sbGVycy5UaXRsZSh7XG4gIGxhYmVsOiAnVGl0bGUnLFxuICBjb250YWluZXI6ICcjY29udGFpbmVyJ1xufSk7XG5cbmNvbnN0IHRyaWdnZXJCdXR0b25zID0gbmV3IGNvbnRyb2xsZXJzLlRyaWdnZXJCdXR0b25zKHtcbiAgbGFiZWw6ICdUcmlnZ2VyQnV0dG9ucycsXG4gIG9wdGlvbnM6IFsnbGlnaHQnLCAnZ3JleScsICdkYXJrJ10sXG4gIGNvbnRhaW5lcjogJyNjb250YWluZXInLFxuICBjYWxsYmFjazogKHRoZW1lKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ0J1dHRvbiA9PicsIHRoZW1lKTtcblxuICAgIHN3aXRjaCAodGhlbWUpIHtcbiAgICAgIGNhc2UgJ2xpZ2h0JzpcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZmZmZic7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZ3JleSc6XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyMwMDAwMDAnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2RhcmsnOlxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjMDAwMDAwJztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29udHJvbGxlcnMuc2V0VGhlbWUodGhlbWUpO1xuICB9LFxufSk7XG5cbmNvbnN0IG51bWJlckJveCA9IG5ldyBjb250cm9sbGVycy5OdW1iZXJCb3goe1xuICBsYWJlbDogJ051bWJlckJveCcsXG4gIG1pbjogMCxcbiAgbWF4OiAxMCxcbiAgc3RlcDogMC4xLFxuICBkZWZhdWx0OiA1LFxuICBjb250YWluZXI6ICcjY29udGFpbmVyJyxcbiAgY2FsbGJhY2s6ICh2YWx1ZSkgPT4gY29uc29sZS5sb2coJ051bWJlciA9PicsIHZhbHVlKSxcbn0pO1xuXG5jb25zdCB0b2dnbGUgPSBuZXcgY29udHJvbGxlcnMuVG9nZ2xlKHtcbiAgbGFiZWw6ICdUb2dnbGUnLFxuICBhY3RpdmU6IGZhbHNlLFxuICBjb250YWluZXI6ICcjY29udGFpbmVyJyxcbiAgY2FsbGJhY2s6IChhY3RpdmUpID0+IHtcbiAgICBjb25zb2xlLmxvZygnVG9nZ2xlID0+JywgYWN0aXZlKTtcblxuICAgIGlmIChhY3RpdmUpXG4gICAgICBudW1iZXJCb3gudmFsdWUgPSBNYXRoLlBJO1xuICB9XG59KTtcblxuY29uc3QgaW5mbyA9IG5ldyBjb250cm9sbGVycy5UZXh0KHtcbiAgbGFiZWw6ICdJbmZvJyxcbiAgZGVmYXVsdDogJ3JlYWQtb25seSB2YWx1ZScsXG4gIHJlYWRvbmx5OiB0cnVlLFxuICBjb250YWluZXI6ICcjY29udGFpbmVyJyxcbn0pO1xuXG5jb25zdCB0ZXh0ID0gbmV3IGNvbnRyb2xsZXJzLlRleHQoe1xuICBsYWJlbDogJ1RleHQnLFxuICBkZWZhdWx0OiAnZGVmYXVsdCB2YWx1ZScsXG4gIHJlYWRvbmx5OiBmYWxzZSxcbiAgY29udGFpbmVyOiAnI2NvbnRhaW5lcicsXG4gIGNhbGxiYWNrOiAodmFsdWUpID0+IHtcbiAgICBjb25zb2xlLmxvZygnVGV4dCA9PicsIHZhbHVlKTtcbiAgICBpbmZvLnZhbHVlID0gdmFsdWU7XG4gIH0sXG59KTtcblxuY29uc3Qgc2VsZWN0TGlzdCA9IG5ldyBjb250cm9sbGVycy5TZWxlY3RMaXN0KHtcbiAgbGFiZWw6ICdTZWxlY3RMaXN0JyxcbiAgb3B0aW9uczogWydzdGFuZGJ5JywgJ3J1bicsICdlbmQnXSxcbiAgZGVmYXVsdDogJ3J1bicsXG4gIGNvbnRhaW5lcjogJyNjb250YWluZXInLFxuICBjYWxsYmFjazogKHZhbHVlKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ1NlbGVjdExpc3QgPT4nLCB2YWx1ZSk7XG5cbiAgICBpbmZvLnZhbHVlID0gdmFsdWU7XG4gICAgc2VsZWN0QnV0dG9ucy52YWx1ZSA9IHZhbHVlO1xuICB9LFxufSk7XG5cbmNvbnN0IHNlbGVjdEJ1dHRvbnMgPSBuZXcgY29udHJvbGxlcnMuU2VsZWN0QnV0dG9ucyh7XG4gIGxhYmVsOiAnU2VsZWN0QnV0dG9ucycsXG4gIG9wdGlvbnM6IFsnc3RhbmRieScsICdydW4nLCAnZW5kJ10sXG4gIGRlZmF1bHQ6ICdydW4nLFxuICBjb250YWluZXI6ICcjY29udGFpbmVyJyxcbiAgY2FsbGJhY2s6ICh2YWx1ZSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdTZWxlY3RCdXR0b25zID0+JywgdmFsdWUpO1xuXG4gICAgaW5mby52YWx1ZSA9IHZhbHVlO1xuICAgIHNlbGVjdExpc3QudmFsdWUgPSB2YWx1ZTtcbiAgfVxufSk7XG5cbi8vIGdyb3VwXG5jb25zdCBncm91cCA9IG5ldyBjb250cm9sbGVycy5Hcm91cCh7XG4gIGxhYmVsOiAnR3JvdXAnLFxuICBkZWZhdWx0OiAnb3BlbmVkJyxcbiAgY29udGFpbmVyOiAnI2NvbnRhaW5lcidcbn0pO1xuXG5jb25zdCBncm91cFNsaWRlciA9IG5ldyBjb250cm9sbGVycy5TbGlkZXIoe1xuICBsYWJlbDogJ0dyb3VwIFNsaWRlcicsXG4gIG1pbjogMjAsXG4gIG1heDogMTAwMCxcbiAgc3RlcDogMSxcbiAgZGVmYXVsdDogMjAwLFxuICB1bml0OiAnSHonLFxuICBzaXplOiAnbGFyZ2UnLFxuICBjb250YWluZXI6IGdyb3VwLFxuICBjYWxsYmFjazogKHZhbHVlKSA9PiBjb25zb2xlLmxvZygnR3JvdXAgLSBTbGlkZXIgPT4nLCB2YWx1ZSksXG59KTtcblxuY29uc3QgZ3JvdXBUZXh0ID0gbmV3IGNvbnRyb2xsZXJzLlRleHQoe1xuICBsYWJlbDogJ0dyb3VwIFRleHQnLFxuICBkZWZhdWx0OiAndGV4dCBpbnB1dCcsXG4gIHJlYWRvbmx5OiBmYWxzZSxcbiAgY29udGFpbmVyOiBncm91cCxcbiAgY2FsbGJhY2s6ICh2YWx1ZSkgPT4gY29uc29sZS5sb2coJ0dyb3VwIC0gVGV4dCA9PicsIHZhbHVlKSxcbn0pO1xuXG4vLyAvLyBzbGlkZXJzXG5jb25zdCB0aXRsZTIgPSBuZXcgY29udHJvbGxlcnMuVGl0bGUoe1xuICBsYWJlbDogJ1NsaWRlcnMnLFxuICBjb250YWluZXI6ICcjY29udGFpbmVyJyxcbn0pO1xuXG5jb25zdCBzbGlkZXJMYXJnZSA9IG5ldyBjb250cm9sbGVycy5TbGlkZXIoe1xuICBsYWJlbDogJ1NsaWRlciAobGFyZ2UpJyxcbiAgbWluOiAyMCxcbiAgbWF4OiAxMDAwLFxuICBzdGVwOiAxLFxuICBkZWZhdWx0OiA1MzcsXG4gIHVuaXQ6ICdIeicsXG4gIHNpemU6ICdsYXJnZScsXG4gIGNvbnRhaW5lcjogJyNjb250YWluZXInLFxuICBjYWxsYmFjazogKHZhbHVlKSA9PiBjb25zb2xlLmxvZygnU2xpZGVyIChsYXJnZSkgPT4nLCB2YWx1ZSksXG59KTtcblxuY29uc3Qgc2xpZGVyTWVkaXVtID0gbmV3IGNvbnRyb2xsZXJzLlNsaWRlcih7XG4gIGxhYmVsOiAnU2xpZGVyIChkZWZhdWx0IC8gbWVkaXVtKScsXG4gIG1pbjogMjAsXG4gIG1heDogMTAwMCxcbiAgc3RlcDogMSxcbiAgZGVmYXVsdDogMjI1LFxuICB1bml0OiAnbS5zPHN1cD4tMTwvc3VwPicsXG4gIHNpemU6ICdtZWRpdW0nLFxuICBjb250YWluZXI6ICcjY29udGFpbmVyJyxcbiAgY2FsbGJhY2s6ICh2YWx1ZSkgPT4gY29uc29sZS5sb2coJ1NsaWRlciAoZGVmYXVsdCkgPT4nLCB2YWx1ZSksXG59KTtcblxuY29uc3Qgc2xpZGVyU21hbGwgPSBuZXcgY29udHJvbGxlcnMuU2xpZGVyKHtcbiAgbGFiZWw6ICdTbGlkZXIgKHNtYWxsKScsXG4gIG1pbjogMjAsXG4gIG1heDogMTAwMCxcbiAgc3RlcDogMSxcbiAgZGVmYXVsdDogNjYwLFxuICBzaXplOiAnc21hbGwnLFxuICBjb250YWluZXI6ICcjY29udGFpbmVyJyxcbiAgY2FsbGJhY2s6ICh2YWx1ZSkgPT4gY29uc29sZS5sb2coJ1NsaWRlciAoc21hbGwpID0+JywgdmFsdWUpLFxufSk7XG5cbmNvbnN0IHRpdGxlMyA9IG5ldyBjb250cm9sbGVycy5UaXRsZSh7XG4gIGxhYmVsOiAnRHJhZ05Ecm9wJyxcbiAgY29udGFpbmVyOiAnI2NvbnRhaW5lcicsXG59KTtcblxuY29uc3QgZHJhZ05Ecm9wID0gbmV3IGNvbnRyb2xsZXJzLkRyYWdBbmREcm9wKHtcbiAgY29udGFpbmVyOiAnI2NvbnRhaW5lcicsXG4gIGNhbGxiYWNrOiAocmVzdWx0cykgPT4gY29uc29sZS5sb2cocmVzdWx0cyksXG59KTtcbiIsIi8qKlxuICogQG1vZHVsZSBndWktY29tcG9uZW50c1xuICovXG5leHBvcnQgeyBkZWZhdWx0IGFzIFNsaWRlciB9IGZyb20gJy4vU2xpZGVyJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQnJlYWtwb2ludCB9IGZyb20gJy4vQnJlYWtwb2ludCc7XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwibmFtZVwiOiBcImJhc2ljLWNvbnRyb2xsZXJzXCIsXG4gIFwidmVyc2lvblwiOiBcIjEuMC4wXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJTZXQgb2Ygc2ltcGxlIGNvbnRyb2xsZXJzIGZvciByYXBpZCBwcm90b3R5cGluZ1wiLFxuICBcIm1haW5cIjogXCJkaXN0L2luZGV4LmpzXCIsXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJkb2NcIjogXCJqc2RvYzJtZCAtdCB0bXBsL1JFQURNRS5oYnMgLS1zZXBhcmF0b3JzIHNyYy8qKi8qLmpzIHNyYy8qLmpzID4gUkVBRE1FLm1kXCIsXG4gICAgXCJ0cmFuc3BpbGVcIjogXCJub2RlIC4vYmluL3J1bm5lciAtLXRyYW5zcGlsZVwiLFxuICAgIFwicHJld2F0Y2hcIjogXCJub2RlIC4vYmluL3J1bm5lciAtLXRyYW5zcGlsZVwiLFxuICAgIFwid2F0Y2hcIjogXCJub2RlIC4vYmluL3J1bm5lciAtLXdhdGNoXCJcbiAgfSxcbiAgXCJsaWNlbnNlXCI6IFwiQlNELTMtQ2xhdXNlXCIsXG4gIFwicmVwb3NpdG9yeVwiOiB7XG4gICAgXCJ0eXBlXCI6IFwiZ2l0XCIsXG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vaXJjYW0tanN0b29scy9iYXNpYy1jb250cm9sbGVycy5naXRcIlxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJiYWJlbC1ydW50aW1lXCI6IFwiXjYuMTguMFwiLFxuICAgIFwiQGlyY2FtL2d1aS1jb21wb25lbnRzXCI6IFwiXjEuMC4zXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiYmFiZWwtY29yZVwiOiBcIl42LjE4LjJcIixcbiAgICBcImJhYmVsLXBsdWdpbi10cmFuc2Zvcm0tZXMyMDE1LW1vZHVsZXMtY29tbW9uanNcIjogXCJeNi4xOC4wXCIsXG4gICAgXCJiYWJlbC1wbHVnaW4tdHJhbnNmb3JtLXJ1bnRpbWVcIjogXCJeNi4xNS4wXCIsXG4gICAgXCJiYWJlbC1wcmVzZXQtZXMyMDE1XCI6IFwiXjYuMTguMFwiLFxuICAgIFwiY29sb3JzXCI6IFwiXjEuMS4yXCIsXG4gICAgXCJmcy1leHRyYVwiOiBcIl4xLjAuMFwiLFxuICAgIFwianNkb2MtdG8tbWFya2Rvd25cIjogXCJeMi4wLjFcIixcbiAgICBcIm5vZGUtc2Fzc1wiOiBcIl4zLjEzLjBcIixcbiAgICBcIndhdGNoXCI6IFwiXjEuMC4xXCJcbiAgfVxufVxuIl19
