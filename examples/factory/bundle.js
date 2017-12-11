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

var ns = exports.ns = _package.name.replace('@ircam/', '');

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

controls.addListener(function (id, value) {
  return console.log(id, value);
});

// group0.addListener('number-1', (value) => console.log(value));
// group0.addListener('group-1', (id, value) => console.log(id, value));
// group0.addListener((id, value) => console.log(id, value));

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
  "name": "@ircam/basic-controllers",
  "version": "1.0.1",
  "description": "Set of simple controllers for rapid prototyping",
  "main": "dist/index.js",
  "license": "BSD-3-Clause",
  "standalone": "basicControllers",
  "publishConfig": {
    "access": "public"
  },
  "scripts": {
    "bundle": "node ./bin/runner --bundle",
    "deploy": "np --yolo",
    "doc": "jsdoc2md -t tmpl/README.hbs src/*.js > README.md",
    "transpile": "node ./bin/runner --transpile",
    "version": "npm run transpile && npm run doc && git add README.md",
    "prewatch": "npm run transpile",
    "watch": "node ./bin/runner --watch"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/ircam-jstools/basic-controllers.git"
  },
  "dependencies": {
    "@ircam/gui-components": "^1.0.2"
  },
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-plugin-transform-es2015-modules-commonjs": "^6.26.0",
    "babel-preset-env": "^1.6.1",
    "browserify": "^14.5.0",
    "chalk": "^2.3.0",
    "fs-extra": "^4.0.3",
    "jsdoc-to-markdown": "^3.0.0",
    "klaw": "^2.1.1",
    "node-sass": "^4.7.2",
    "np": "^2.18.2",
    "tape": "^4.8.0",
    "uglify-js": "^3.2.2",
    "watch": "^1.0.2"
  }
}

},{}]},{},[19])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLi9kaXN0L2NvbXBvbmVudHMvQmFzZUNvbXBvbmVudC5qcyIsIi4uLy4uL2Rpc3QvY29tcG9uZW50cy9EcmFnQW5kRHJvcC5qcyIsIi4uLy4uL2Rpc3QvY29tcG9uZW50cy9Hcm91cC5qcyIsIi4uLy4uL2Rpc3QvY29tcG9uZW50cy9OdW1iZXJCb3guanMiLCIuLi8uLi9kaXN0L2NvbXBvbmVudHMvU2VsZWN0QnV0dG9ucy5qcyIsIi4uLy4uL2Rpc3QvY29tcG9uZW50cy9TZWxlY3RMaXN0LmpzIiwiLi4vLi4vZGlzdC9jb21wb25lbnRzL1NsaWRlci5qcyIsIi4uLy4uL2Rpc3QvY29tcG9uZW50cy9UZXh0LmpzIiwiLi4vLi4vZGlzdC9jb21wb25lbnRzL1RpdGxlLmpzIiwiLi4vLi4vZGlzdC9jb21wb25lbnRzL1RvZ2dsZS5qcyIsIi4uLy4uL2Rpc3QvY29tcG9uZW50cy9UcmlnZ2VyQnV0dG9ucy5qcyIsIi4uLy4uL2Rpc3QvZmFjdG9yeS5qcyIsIi4uLy4uL2Rpc3QvaW5kZXguanMiLCIuLi8uLi9kaXN0L21peGlucy9jb250YWluZXIuanMiLCIuLi8uLi9kaXN0L21peGlucy9kaXNwbGF5LmpzIiwiLi4vLi4vZGlzdC91dGlscy9lbGVtZW50cy5qcyIsIi4uLy4uL2Rpc3QvdXRpbHMvc3R5bGVzLWRlY2xhcmF0aW9ucy5qcyIsIi4uLy4uL2Rpc3QvdXRpbHMvc3R5bGVzLmpzIiwiZGlzdC9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AaXJjYW0vZ3VpLWNvbXBvbmVudHMvZGlzdC9pbmRleC5qcyIsIi4uLy4uL3BhY2thZ2UuanNvbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUNBQTs7QUFFQSxJQUFNLGVBQWUsRUFBckI7O0FBRUE7Ozs7Ozs7O0lBT00sYTtBQUNKLHlCQUFZLElBQVos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Q0EsV0FBSyxZQUFMLENBQWtCLEdBQWxCLEVBQXVCLElBQXZCLEVBQTZCLEtBQTdCO0FBQ0Q7Ozs7OztrQkFtVVksTTs7Ozs7Ozs7Ozs7Ozs7MkNBN2NOLE87Ozs7Ozs7OzsrQ0FDQSxPOzs7Ozs7O0FDSlQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqIEBtb2R1bGUgYmFzaWMtY29udHJvbGxlciAqL1xuXG5jb25zdCB0eXBlQ291bnRlcnMgPSB7fTtcblxuLyoqXG4gKiBCYXNlIGNsYXNzIHRvIGNyZWF0ZSBuZXcgY29udHJvbGxlcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBTdHJpbmcgZGVzY3JpYmluZyB0aGUgdHlwZSBvZiB0aGUgY29udHJvbGxlci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0cyAtIERlZmF1bHQgcGFyYW1ldGVycyBvZiB0aGUgY29udHJvbGxlci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgLSBVc2VyIGRlZmluZWQgY29uZmlndXJhdGlvbiBvcHRpb25zLlxuICovXG5jbGFzcyBCYXNlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IodHlwZSwgZGVmYXVsdHMsIGNvbmZpZyA9IHt9KSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBjb25maWcpO1xuXG4gICAgLy8gaGFuZGxlIGlkXG4gICAgaWYgKCF0eXBlQ291bnRlcnNbdHlwZV0pXG4gICAgICB0eXBlQ291bnRlcnNbdHlwZV0gPSAwO1xuXG4gICAgaWYgKCF0aGlzLnBhcmFtcy5pZCkge1xuICAgICAgdGhpcy5pZCA9IGAke3R5cGV9LSR7dHlwZUNvdW50ZXJzW3R5cGVdfWA7XG4gICAgICB0eXBlQ291bnRlcnNbdHlwZV0gKz0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pZCA9IHRoaXMucGFyYW1zLmlkO1xuICAgIH1cblxuICAgIHRoaXMuX2xpc3RlbmVycyA9IG5ldyBTZXQoKTtcbiAgICB0aGlzLl9ncm91cExpc3RlbmVycyA9IG5ldyBTZXQoKTtcblxuICAgIC8vIHJlZ2lzdGVyIGNhbGxiYWNrIGlmIGdpdmVuXG4gICAgaWYgKHRoaXMucGFyYW1zLmNhbGxiYWNrKVxuICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLnBhcmFtcy5jYWxsYmFjayk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgbGlzdGVuZXIgdG8gdGhlIGNvbnRyb2xsZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gRnVuY3Rpb24gdG8gYmUgYXBwbGllZCB3aGVuIHRoZSBjb250cm9sbGVyXG4gICAqICBzdGF0ZSBjaGFuZ2UuXG4gICAqL1xuICBhZGRMaXN0ZW5lcihjYWxsYmFjaykge1xuICAgIHRoaXMuX2xpc3RlbmVycy5hZGQoY2FsbGJhY2spO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGEgbGlzdGVuZXIgaXMgYWRkZWQgZnJvbSBhIGNvbnRhaW5pbmcgZ3JvdXAuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfYWRkR3JvdXBMaXN0ZW5lcihpZCwgY2FsbElkLCBjYWxsYmFjaykge1xuICAgIGlmICghY2FsbElkKVxuICAgICAgdGhpcy5hZGRMaXN0ZW5lcihjYWxsYmFjayk7XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLl9ncm91cExpc3RlbmVycy5hZGQoeyBjYWxsSWQsIGNhbGxiYWNrIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBsaXN0ZW5lciBmcm9tIHRoZSBjb250cm9sbGVyLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIEZ1bmN0aW9uIHRvIHJlbW92ZSBmcm9tIHRoZSBsaXN0ZW5lcnMuXG4gICAqIEBwcml2YXRlXG4gICAqIEB0b2RvIC0gcmVleHBvc2Ugd2hlbiBgY29udGFpbmVyYCBjYW4gb3ZlcnJpZGUgdGhpcyBtZXRob2QuLi5cbiAgICovXG4gIC8vIHJlbW92ZUxpc3RlbmVyKGNhbGxiYWNrKSB7XG4gIC8vICAgdGhpcy5fbGlzdGVuZXJzLnJlbW92ZShjYWxsYmFjayk7XG4gIC8vIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZXhlY3V0ZUxpc3RlbmVycyguLi52YWx1ZXMpIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMuZm9yRWFjaCgoY2FsbGJhY2spID0+IGNhbGxiYWNrKC4uLnZhbHVlcykpO1xuXG4gICAgdGhpcy5fZ3JvdXBMaXN0ZW5lcnMuZm9yRWFjaCgocGF5bG9hZCkgPT4ge1xuICAgICAgY29uc3QgeyBjYWxsYmFjaywgY2FsbElkIH0gPSBwYXlsb2FkO1xuICAgICAgY2FsbGJhY2soY2FsbElkLCAuLi52YWx1ZXMpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VDb21wb25lbnQ7XG4iLCJpbXBvcnQgQmFzZUNvbXBvbmVudCBmcm9tICcuL0Jhc2VDb21wb25lbnQnO1xuaW1wb3J0IGRpc3BsYXkgZnJvbSAnLi4vbWl4aW5zL2Rpc3BsYXknO1xuXG5jb25zdCBBdWRpb0NvbnRleHQgPSAod2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0KTtcblxuLyoqIEBtb2R1bGUgYmFzaWMtY29udHJvbGxlcnMgKi9cblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIGxhYmVsOiAnRHJhZyBhbmQgZHJvcCBhdWRpbyBmaWxlcycsXG4gIGxhYmVsUHJvY2VzczogJ3Byb2Nlc3MuLi4nLFxuICBhdWRpb0NvbnRleHQ6IG51bGwsXG4gIGNvbnRhaW5lcjogbnVsbCxcbiAgY2FsbGJhY2s6IG51bGwsXG59O1xuXG4vKipcbiAqIERyYWcgYW5kIGRyb3Agem9uZSBmb3IgYXVkaW8gZmlsZXMgcmV0dXJuaW5nIGBBdWRpb0J1ZmZlcmBzIGFuZC9vciBKU09OXG4gKiBkZXNjcmlwdG9yIGRhdGEuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBbY29uZmlnLmxhYmVsPSdEcmFnIGFuZCBkcm9wIGF1ZGlvIGZpbGVzJ10gLSBMYWJlbCBvZiB0aGVcbiAqICBjb250cm9sbGVyLlxuICogQHBhcmFtIHtTdHJpbmd9IFtjb25maWcubGFiZWxQcm9jZXNzPSdwcm9jZXNzLi4uJ10gLSBMYWJlbCBvZiB0aGUgY29udHJvbGxlclxuICogIHdoaWxlIGF1ZGlvIGZpbGVzIGFyZSBkZWNvZGVkLlxuICogQHBhcmFtIHtBdWRpb0NvbnRleHR9IFtjb25maWcuYXVkaW9Db250ZXh0PW51bGxdIC0gT3B0aW9ubmFsIGF1ZGlvIGNvbnRleHRcbiAqICB0byB1c2UgaW4gb3JkZXIgdG8gZGVjb2RlIGF1ZGlvIGZpbGVzLlxuICogQHBhcmFtIHtTdHJpbmd8RWxlbWVudHxiYXNpYy1jb250cm9sbGVyfkdyb3VwfSBbY29uZmlnLmNvbnRhaW5lcj1udWxsXSAtXG4gKiAgQ29udGFpbmVyIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbmZpZy5jYWxsYmFjaz1udWxsXSAtIENhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIHdoZW4gdGhlXG4gKiAgdmFsdWUgY2hhbmdlcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgY29udHJvbGxlcnMgZnJvbSAnYmFzaWMtY29udHJvbGxlcnMnO1xuICpcbiAqIGNvbnN0IGRyYWdBbmREcm9wID0gbmV3IGNvbnRyb2xsZXJzLkRyYWdBbmREcm9wKHtcbiAqICAgY29udGFpbmVyOiAnI2NvbnRhaW5lcicsXG4gKiAgIGNhbGxiYWNrOiAocmVzdWx0cykgPT4gY29uc29sZS5sb2cocmVzdWx0cyksXG4gKiB9KTtcbiAqL1xuY2xhc3MgRHJhZ0FuZERyb3AgZXh0ZW5kcyBkaXNwbGF5KEJhc2VDb21wb25lbnQpIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKCdkcmFnLWFuZC1kcm9wJywgZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgdGhpcy5fdmFsdWUgPSBudWxsO1xuXG4gICAgaWYgKCF0aGlzLnBhcmFtcy5hdWRpb0NvbnRleHQpXG4gICAgICB0aGlzLnBhcmFtcy5hdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XG5cbiAgICBzdXBlci5pbml0aWFsaXplKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBsYXN0IHJlc3VsdHNcbiAgICogQHR5cGUge09iamVjdDxTdHJpbmcsIEF1ZGlvQnVmZmVyfEpTT04+fVxuICAgKiBAcmVhZG9ubHlcbiAgICovXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBsYWJlbCB9ID0gdGhpcy5wYXJhbXM7XG4gICAgY29uc3QgY29udGVudCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJkcm9wLXpvbmVcIj5cbiAgICAgICAgPHAgY2xhc3M9XCJsYWJlbFwiPiR7bGFiZWx9PC9wPlxuICAgICAgPC9kaXY+XG4gICAgYDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKCk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcbiAgICB0aGlzLiRkcm9wWm9uZSA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5kcm9wLXpvbmUnKTtcbiAgICB0aGlzLiRsYWJlbCA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5sYWJlbCcpO1xuXG4gICAgdGhpcy5fYmluZEV2ZW50cygpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgX2JpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kZHJvcFpvbmUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgdGhpcy4kZHJvcFpvbmUuY2xhc3NMaXN0LmFkZCgnZHJhZycpO1xuICAgICAgZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5JztcbiAgICB9LCBmYWxzZSk7XG5cbiAgICB0aGlzLiRkcm9wWm9uZS5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgdGhpcy4kZHJvcFpvbmUuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZycpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIHRoaXMuJGRyb3Bab25lLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgY29uc3QgZmlsZXMgPSBBcnJheS5mcm9tKGUuZGF0YVRyYW5zZmVyLmZpbGVzKTtcbiAgICAgIGNvbnN0IGF1ZGlvRmlsZXMgPSBmaWxlcy5maWx0ZXIoKGZpbGUpID0+IHtcbiAgICAgICAgaWYgKC9eYXVkaW8vLnRlc3QoZmlsZS50eXBlKSkge1xuICAgICAgICAgIGZpbGUuc2hvcnRUeXBlID0gJ2F1ZGlvJztcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICgvanNvbiQvLnRlc3QoZmlsZS50eXBlKSkge1xuICAgICAgICAgIGZpbGUuc2hvcnRUeXBlID0gJ2pzb24nO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHJlc3VsdHMgPSB7fTtcbiAgICAgIGxldCBjb3VudGVyID0gMDtcblxuICAgICAgdGhpcy4kbGFiZWwudGV4dENvbnRlbnQgPSB0aGlzLnBhcmFtcy5sYWJlbFByb2Nlc3M7XG5cbiAgICAgIGNvbnN0IHRlc3RFbmQgPSAoKSA9PiB7XG4gICAgICAgIGNvdW50ZXIgKz0gMTtcblxuICAgICAgICBpZiAoY291bnRlciA9PT0gYXVkaW9GaWxlcy5sZW5ndGgpwqB7XG4gICAgICAgICAgdGhpcy5fdmFsdWUgPSByZXN1bHRzXG4gICAgICAgICAgdGhpcy5leGVjdXRlTGlzdGVuZXJzKHJlc3VsdHMpO1xuXG4gICAgICAgICAgdGhpcy4kZHJvcFpvbmUuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZycpO1xuICAgICAgICAgIHRoaXMuJGxhYmVsLnRleHRDb250ZW50ID0gdGhpcy5wYXJhbXMubGFiZWw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZmlsZXMuZm9yRWFjaCgoZmlsZSwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgICByZWFkZXIub25sb2FkID0gKGUpID0+IHtcbiAgICAgICAgICBpZiAoZmlsZS5zaG9ydFR5cGUgPT09ICdqc29uJykge1xuICAgICAgICAgICAgcmVzdWx0c1tmaWxlLm5hbWVdID0gSlNPTi5wYXJzZShlLnRhcmdldC5yZXN1bHQpO1xuICAgICAgICAgICAgdGVzdEVuZCgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZmlsZS5zaG9ydFR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLmF1ZGlvQ29udGV4dFxuICAgICAgICAgICAgICAuZGVjb2RlQXVkaW9EYXRhKGUudGFyZ2V0LnJlc3VsdClcbiAgICAgICAgICAgICAgLnRoZW4oKGF1ZGlvQnVmZmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0c1tmaWxlLm5hbWVdID0gYXVkaW9CdWZmZXI7XG4gICAgICAgICAgICAgICAgdGVzdEVuZCgpO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIHJlc3VsdHNbZmlsZS5uYW1lXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGVzdEVuZCgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmlsZS5zaG9ydFR5cGUgPT09ICdqc29uJylcbiAgICAgICAgICByZWFkZXIucmVhZEFzVGV4dChmaWxlKTtcbiAgICAgICAgZWxzZSBpZiAoZmlsZS5zaG9ydFR5cGUgPT09ICdhdWRpbycpXG4gICAgICAgICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGUpO1xuICAgICAgfSk7XG4gICAgfSwgZmFsc2UpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERyYWdBbmREcm9wO1xuIiwiaW1wb3J0IEJhc2VDb21wb25lbnQgZnJvbSAnLi9CYXNlQ29tcG9uZW50JztcbmltcG9ydCBkaXNwbGF5IGZyb20gJy4uL21peGlucy9kaXNwbGF5JztcbmltcG9ydCBjb250YWluZXIgZnJvbSAnLi4vbWl4aW5zL2NvbnRhaW5lcic7XG5pbXBvcnQgKiBhcyBlbGVtZW50cyBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5cbi8qKiBAbW9kdWxlIGJhc2ljLWNvbnRyb2xsZXJzICovXG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICBsZWdlbmQ6ICcmbmJzcDsnLFxuICBkZWZhdWx0OiAnb3BlbmVkJyxcbiAgY29udGFpbmVyOiBudWxsLFxufTtcblxuLyoqXG4gKiBHcm91cCBvZiBjb250cm9sbGVycy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZy5sYWJlbCAtIExhYmVsIG9mIHRoZSBncm91cC5cbiAqIEBwYXJhbSB7J29wZW5lZCd8J2Nsb3NlZCd9IFtjb25maWcuZGVmYXVsdD0nb3BlbmVkJ10gLSBEZWZhdWx0IHN0YXRlIG9mIHRoZVxuICogIGdyb3VwLlxuICogQHBhcmFtIHtTdHJpbmd8RWxlbWVudHxiYXNpYy1jb250cm9sbGVyfkdyb3VwfSBbY29uZmlnLmNvbnRhaW5lcj1udWxsXSAtXG4gKiAgQ29udGFpbmVyIG9mIHRoZSBjb250cm9sbGVyLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBjb250cm9sbGVycyBmcm9tICdiYXNpYy1jb250cm9sbGVycyc7XG4gKlxuICogLy8gY3JlYXRlIGEgZ3JvdXBcbiAqIGNvbnN0IGdyb3VwID0gbmV3IGNvbnRyb2xsZXJzLkdyb3VwKHtcbiAqICAgbGFiZWw6ICdHcm91cCcsXG4gKiAgIGRlZmF1bHQ6ICdvcGVuZWQnLFxuICogICBjb250YWluZXI6ICcjY29udGFpbmVyJ1xuICogfSk7XG4gKlxuICogLy8gaW5zZXJ0IGNvbnRyb2xsZXJzIGluIHRoZSBncm91cFxuICogY29uc3QgZ3JvdXBTbGlkZXIgPSBuZXcgY29udHJvbGxlcnMuU2xpZGVyKHtcbiAqICAgbGFiZWw6ICdHcm91cCBTbGlkZXInLFxuICogICBtaW46IDIwLFxuICogICBtYXg6IDEwMDAsXG4gKiAgIHN0ZXA6IDEsXG4gKiAgIGRlZmF1bHQ6IDIwMCxcbiAqICAgdW5pdDogJ0h6JyxcbiAqICAgc2l6ZTogJ2xhcmdlJyxcbiAqICAgY29udGFpbmVyOiBncm91cCxcbiAqICAgY2FsbGJhY2s6ICh2YWx1ZSkgPT4gY29uc29sZS5sb2codmFsdWUpLFxuICogfSk7XG4gKlxuICogY29uc3QgZ3JvdXBUZXh0ID0gbmV3IGNvbnRyb2xsZXJzLlRleHQoe1xuICogICBsYWJlbDogJ0dyb3VwIFRleHQnLFxuICogICBkZWZhdWx0OiAndGV4dCBpbnB1dCcsXG4gKiAgIHJlYWRvbmx5OiBmYWxzZSxcbiAqICAgY29udGFpbmVyOiBncm91cCxcbiAqICAgY2FsbGJhY2s6ICh2YWx1ZSkgPT4gY29uc29sZS5sb2codmFsdWUpLFxuICogfSk7XG4gKi9cbmNsYXNzIEdyb3VwIGV4dGVuZHMgY29udGFpbmVyKGRpc3BsYXkoQmFzZUNvbXBvbmVudCkpIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoJ2dyb3VwJywgZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICB0aGlzLl9zdGF0ZXMgPSBbJ29wZW5lZCcsICdjbG9zZWQnXTtcblxuICAgIGlmICh0aGlzLl9zdGF0ZXMuaW5kZXhPZih0aGlzLnBhcmFtcy5kZWZhdWx0KSA9PT0gLTEpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgc3RhdGUgXCIke3ZhbHVlfVwiYCk7XG5cbiAgICB0aGlzLl9zdGF0ZSA9IHRoaXMucGFyYW1zLmRlZmF1bHQ7XG5cbiAgICBzdXBlci5pbml0aWFsaXplKCk7XG4gIH1cblxuICAvKipcbiAgICogU3RhdGUgb2YgdGhlIGdyb3VwIChgJ29wZW5lZCdgIG9yIGAnY2xvc2VkJ2ApLlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHN0YXRlKSB7XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsaWFzIGZvciBgdmFsdWVgLlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgZ2V0IHN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcbiAgfVxuXG4gIHNldCBzdGF0ZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLl9zdGF0ZXMuaW5kZXhPZih2YWx1ZSkgPT09IC0xKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHN0YXRlIFwiJHt2YWx1ZX1cImApO1xuXG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9zdGF0ZSk7XG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZCh2YWx1ZSk7XG5cbiAgICB0aGlzLl9zdGF0ZSA9IHZhbHVlO1xuICB9XG5cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVuZGVyKCkge1xuICAgIGxldCBjb250ZW50ID0gYFxuICAgICAgPGRpdiBjbGFzcz1cImdyb3VwLWhlYWRlclwiPlxuICAgICAgICAke2VsZW1lbnRzLnNtYWxsQXJyb3dSaWdodH1cbiAgICAgICAgJHtlbGVtZW50cy5zbWFsbEFycm93Qm90dG9tfVxuICAgICAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+JHt0aGlzLnBhcmFtcy5sYWJlbH08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJncm91cC1jb250ZW50XCI+PC9kaXY+XG4gICAgYDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKCk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKHRoaXMuX3N0YXRlKTtcblxuICAgIHRoaXMuJGhlYWRlciA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5ncm91cC1oZWFkZXInKTtcbiAgICB0aGlzLiRjb250YWluZXIgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuZ3JvdXAtY29udGVudCcpO1xuXG4gICAgdGhpcy5fYmluZEV2ZW50cygpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIF9iaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJGhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5fc3RhdGUgPT09ICdjbG9zZWQnID8gJ29wZW5lZCcgOiAnY2xvc2VkJztcbiAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHcm91cDtcbiIsImltcG9ydCBCYXNlQ29tcG9uZW50IGZyb20gJy4vQmFzZUNvbXBvbmVudCc7XG5pbXBvcnQgZGlzcGxheSBmcm9tICcuLi9taXhpbnMvZGlzcGxheSc7XG5pbXBvcnQgKiBhcyBlbGVtZW50cyBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5cbi8qKiBAbW9kdWxlIGJhc2ljLWNvbnRyb2xsZXJzICovXG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICBsYWJlbDogJyZuYnNwOycsXG4gIG1pbjogMCxcbiAgbWF4OiAxLFxuICBzdGVwOiAwLjAxLFxuICBkZWZhdWx0OiAwLFxuICBjb250YWluZXI6IG51bGwsXG4gIGNhbGxiYWNrOiBudWxsLFxufTtcblxuLyoqXG4gKiBOdW1iZXIgQm94IGNvbnRyb2xsZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZy5sYWJlbCAtIExhYmVsIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtjb25maWcubWluPTBdIC0gTWluaW11bSB2YWx1ZS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLm1heD0xXSAtIE1heGltdW0gdmFsdWUuXG4gKiBAcGFyYW0ge051bWJlcn0gW2NvbmZpZy5zdGVwPTAuMDFdIC0gU3RlcCBiZXR3ZWVuIGNvbnNlY3V0aXZlIHZhbHVlcy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLmRlZmF1bHQ9MF0gLSBEZWZhdWx0IHZhbHVlLlxuICogQHBhcmFtIHtTdHJpbmd8RWxlbWVudHxiYXNpYy1jb250cm9sbGVyfkdyb3VwfSBbY29uZmlnLmNvbnRhaW5lcj1udWxsXSAtXG4gKiAgQ29udGFpbmVyIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbmZpZy5jYWxsYmFjaz1udWxsXSAtIENhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIHdoZW4gdGhlXG4gKiAgdmFsdWUgY2hhbmdlcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgY29udHJvbGxlcnMgZnJvbSAnYmFzaWMtY29udHJvbGxlcnMnO1xuICpcbiAqIGNvbnN0IG51bWJlckJveCA9IG5ldyBjb250cm9sbGVycy5OdW1iZXJCb3goe1xuICogICBsYWJlbDogJ015IE51bWJlciBCb3gnLFxuICogICBtaW46IDAsXG4gKiAgIG1heDogMTAsXG4gKiAgIHN0ZXA6IDAuMSxcbiAqICAgZGVmYXVsdDogNSxcbiAqICAgY29udGFpbmVyOiAnI2NvbnRhaW5lcicsXG4gKiAgIGNhbGxiYWNrOiAodmFsdWUpID0+IGNvbnNvbGUubG9nKHZhbHVlKSxcbiAqIH0pO1xuICovXG5jbGFzcyBOdW1iZXJCb3ggZXh0ZW5kcyBkaXNwbGF5KEJhc2VDb21wb25lbnQpIHtcbiAgLy8gbGVnZW5kLCBtaW4gPSAwLCBtYXggPSAxLCBzdGVwID0gMC4wMSwgZGVmYXVsdFZhbHVlID0gMCwgJGNvbnRhaW5lciA9IG51bGwsIGNhbGxiYWNrID0gbnVsbFxuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcignbnVtYmVyLWJveCcsIGRlZmF1bHRzLCBjb25maWcpO1xuXG4gICAgdGhpcy5fdmFsdWUgPSB0aGlzLnBhcmFtcy5kZWZhdWx0O1xuICAgIHRoaXMuX2lzSW50U3RlcCA9ICh0aGlzLnBhcmFtcy5zdGVwICUgMSA9PT0gMCk7XG5cbiAgICBzdXBlci5pbml0aWFsaXplKCk7XG4gIH1cblxuICAvKipcbiAgICogQ3VycmVudCB2YWx1ZSBvZiB0aGUgY29udHJvbGxlci5cbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAvLyB1c2UgJG51bWJlciBlbGVtZW50IG1pbiwgbWF4IGFuZCBzdGVwIHN5c3RlbVxuICAgIHRoaXMuJG51bWJlci52YWx1ZSA9IHZhbHVlO1xuICAgIHZhbHVlID0gdGhpcy4kbnVtYmVyLnZhbHVlO1xuICAgIHZhbHVlID0gdGhpcy5faXNJbnRTdGVwID8gcGFyc2VJbnQodmFsdWUsIDEwKSA6IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgbGFiZWwsIG1pbiwgbWF4LCBzdGVwIH0gPSB0aGlzLnBhcmFtcztcbiAgICBjb25zdCBjb250ZW50ID0gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJsYWJlbFwiPiR7bGFiZWx9PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImlubmVyLXdyYXBwZXJcIj5cbiAgICAgICAgJHtlbGVtZW50cy5hcnJvd0xlZnR9XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cIm51bWJlclwiIHR5cGU9XCJudW1iZXJcIiBtaW49XCIke21pbn1cIiBtYXg9XCIke21heH1cIiBzdGVwPVwiJHtzdGVwfVwiIHZhbHVlPVwiJHt0aGlzLl92YWx1ZX1cIiAvPlxuICAgICAgICAke2VsZW1lbnRzLmFycm93UmlnaHR9XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIoKTtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKCdhbGlnbi1zbWFsbCcpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiRwcmV2ID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmFycm93LWxlZnQnKTtcbiAgICB0aGlzLiRuZXh0ID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmFycm93LXJpZ2h0Jyk7XG4gICAgdGhpcy4kbnVtYmVyID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cIm51bWJlclwiXScpO1xuXG4gICAgdGhpcy5fYmluZEV2ZW50cygpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIF9iaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJHByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgY29uc3Qgc3RlcCA9IHRoaXMucGFyYW1zLnN0ZXA7XG4gICAgICBjb25zdCBkZWNpbWFscyA9IHN0ZXAudG9TdHJpbmcoKS5zcGxpdCgnLicpWzFdO1xuICAgICAgY29uc3QgZXhwID0gZGVjaW1hbHMgPyBkZWNpbWFscy5sZW5ndGggOiAwO1xuICAgICAgY29uc3QgbXVsdCA9IE1hdGgucG93KDEwLCBleHApO1xuXG4gICAgICBjb25zdCBpbnRWYWx1ZSA9IE1hdGguZmxvb3IodGhpcy5fdmFsdWUgKiBtdWx0ICsgMC41KTtcbiAgICAgIGNvbnN0IGludFN0ZXAgPSBNYXRoLmZsb29yKHN0ZXAgKiBtdWx0ICsgMC41KTtcbiAgICAgIGNvbnN0IHZhbHVlID0gKGludFZhbHVlIC0gaW50U3RlcCkgLyBtdWx0O1xuXG4gICAgICB0aGlzLl9wcm9wYWdhdGUodmFsdWUpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIHRoaXMuJG5leHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgY29uc3Qgc3RlcCA9IHRoaXMucGFyYW1zLnN0ZXA7XG4gICAgICBjb25zdCBkZWNpbWFscyA9IHN0ZXAudG9TdHJpbmcoKS5zcGxpdCgnLicpWzFdO1xuICAgICAgY29uc3QgZXhwID0gZGVjaW1hbHMgPyBkZWNpbWFscy5sZW5ndGggOiAwO1xuICAgICAgY29uc3QgbXVsdCA9IE1hdGgucG93KDEwLCBleHApO1xuXG4gICAgICBjb25zdCBpbnRWYWx1ZSA9IE1hdGguZmxvb3IodGhpcy5fdmFsdWUgKiBtdWx0ICsgMC41KTtcbiAgICAgIGNvbnN0IGludFN0ZXAgPSBNYXRoLmZsb29yKHN0ZXAgKiBtdWx0ICsgMC41KTtcbiAgICAgIGNvbnN0IHZhbHVlID0gKGludFZhbHVlICsgaW50U3RlcCkgLyBtdWx0O1xuXG4gICAgICB0aGlzLl9wcm9wYWdhdGUodmFsdWUpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIHRoaXMuJG51bWJlci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xuICAgICAgbGV0IHZhbHVlID0gdGhpcy4kbnVtYmVyLnZhbHVlO1xuICAgICAgdmFsdWUgPSB0aGlzLl9pc0ludFN0ZXAgPyBwYXJzZUludCh2YWx1ZSwgMTApIDogcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgICB2YWx1ZSA9IE1hdGgubWluKHRoaXMucGFyYW1zLm1heCwgTWF0aC5tYXgodGhpcy5wYXJhbXMubWluLCB2YWx1ZSkpO1xuXG4gICAgICB0aGlzLl9wcm9wYWdhdGUodmFsdWUpO1xuICAgIH0sIGZhbHNlKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBfcHJvcGFnYXRlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSB0aGlzLl92YWx1ZSkgeyByZXR1cm47IH1cblxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy4kbnVtYmVyLnZhbHVlID0gdmFsdWU7XG5cbiAgICB0aGlzLmV4ZWN1dGVMaXN0ZW5lcnModGhpcy5fdmFsdWUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE51bWJlckJveDtcbiIsImltcG9ydCBCYXNlQ29tcG9uZW50IGZyb20gJy4vQmFzZUNvbXBvbmVudCc7XG5pbXBvcnQgZGlzcGxheSBmcm9tICcuLi9taXhpbnMvZGlzcGxheSc7XG5pbXBvcnQgKiBhcyBlbGVtZW50cyBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5cbi8qKiBAbW9kdWxlIGJhc2ljLWNvbnRyb2xsZXJzICovXG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICBsYWJlbDogJyZuYnNwOycsXG4gIG9wdGlvbnM6IG51bGwsXG4gIGRlZmF1bHQ6IG51bGwsXG4gIGNvbnRhaW5lcjogbnVsbCxcbiAgY2FsbGJhY2s6IG51bGwsXG59O1xuXG4vKipcbiAqIExpc3Qgb2YgYnV0dG9ucyB3aXRoIHN0YXRlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge1N0cmluZ30gY29uZmlnLmxhYmVsIC0gTGFiZWwgb2YgdGhlIGNvbnRyb2xsZXIuXG4gKiBAcGFyYW0ge0FycmF5fSBbY29uZmlnLm9wdGlvbnM9bnVsbF0gLSBWYWx1ZXMgb2YgdGhlIGRyb3AgZG93biBsaXN0LlxuICogQHBhcmFtIHtOdW1iZXJ9IFtjb25maWcuZGVmYXVsdD1udWxsXSAtIERlZmF1bHQgdmFsdWUuXG4gKiBAcGFyYW0ge1N0cmluZ3xFbGVtZW50fGJhc2ljLWNvbnRyb2xsZXJ+R3JvdXB9IFtjb25maWcuY29udGFpbmVyPW51bGxdIC1cbiAqICBDb250YWluZXIgb2YgdGhlIGNvbnRyb2xsZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29uZmlnLmNhbGxiYWNrPW51bGxdIC0gQ2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWQgd2hlbiB0aGVcbiAqICB2YWx1ZSBjaGFuZ2VzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBjb250cm9sbGVycyBmcm9tICdiYXNpYy1jb250cm9sbGVycyc7XG4gKlxuICogY29uc3Qgc2VsZWN0QnV0dG9ucyA9IG5ldyBjb250cm9sbGVycy5TZWxlY3RCdXR0b25zKHtcbiAqICAgbGFiZWw6ICdTZWxlY3RCdXR0b25zJyxcbiAqICAgb3B0aW9uczogWydzdGFuZGJ5JywgJ3J1bicsICdlbmQnXSxcbiAqICAgZGVmYXVsdDogJ3J1bicsXG4gKiAgIGNvbnRhaW5lcjogJyNjb250YWluZXInLFxuICogICBjYWxsYmFjazogKHZhbHVlLCBpbmRleCkgPT4gY29uc29sZS5sb2codmFsdWUsIGluZGV4KSxcbiAqIH0pO1xuICovXG5jbGFzcyBTZWxlY3RCdXR0b25zIGV4dGVuZHMgZGlzcGxheShCYXNlQ29tcG9uZW50KSB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKCdzZWxlY3QtYnV0dG9ucycsIGRlZmF1bHRzLCBjb25maWcpO1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMucGFyYW1zLm9wdGlvbnMpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmlnZ2VyQnV0dG9uOiBJbnZhbGlkIG9wdGlvbiBcIm9wdGlvbnNcIicpO1xuXG4gICAgdGhpcy5fdmFsdWUgPSB0aGlzLnBhcmFtcy5kZWZhdWx0O1xuXG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMucGFyYW1zLm9wdGlvbnM7XG4gICAgY29uc3QgaW5kZXggPSBvcHRpb25zLmluZGV4T2YodGhpcy5fdmFsdWUpO1xuICAgIHRoaXMuX2luZGV4ID0gaW5kZXggPT09IC0xID/CoDAgOiBpbmRleDtcbiAgICB0aGlzLl9tYXhJbmRleCA9IG9wdGlvbnMubGVuZ3RoIC0gMTtcblxuICAgIHN1cGVyLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDdXJyZW50IHZhbHVlLlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wYXJhbXMub3B0aW9ucy5pbmRleE9mKHZhbHVlKTtcblxuICAgIGlmIChpbmRleCAhPT0gLTEpXG4gICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gIH1cblxuICAvKipcbiAgICogQ3VycmVudCBvcHRpb24gaW5kZXguXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBnZXQgaW5kZXgoKSB7XG4gICAgdGhpcy5faW5kZXg7XG4gIH1cblxuICBzZXQgaW5kZXgoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gdGhpcy5fbWF4SW5kZXgpIHJldHVybjtcblxuICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5wYXJhbXMub3B0aW9uc1tpbmRleF07XG4gICAgdGhpcy5faW5kZXggPSBpbmRleDtcbiAgICB0aGlzLl9oaWdobGlnaHRCdG4odGhpcy5faW5kZXgpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IG9wdGlvbnMsIGxhYmVsIH0gPSB0aGlzLnBhcmFtcztcbiAgICBjb25zdCBjb250ZW50ID0gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJsYWJlbFwiPiR7bGFiZWx9PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImlubmVyLXdyYXBwZXJcIj5cbiAgICAgICAgJHtlbGVtZW50cy5hcnJvd0xlZnR9XG4gICAgICAgICR7b3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0blwiIGRhdGEtaW5kZXg9XCIke2luZGV4fVwiIGRhdGEtdmFsdWU9XCIke29wdGlvbn1cIj5cbiAgICAgICAgICAgICAgJHtvcHRpb259XG4gICAgICAgICAgICA8L2J1dHRvbj5gO1xuICAgICAgICB9KS5qb2luKCcnKX1cbiAgICAgICAgJHtlbGVtZW50cy5hcnJvd1JpZ2h0fVxuICAgICAgPC9kaXY+XG4gICAgYDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKHRoaXMudHlwZSk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuJHByZXYgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuYXJyb3ctbGVmdCcpO1xuICAgIHRoaXMuJG5leHQgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuYXJyb3ctcmlnaHQnKTtcbiAgICB0aGlzLiRidG5zID0gQXJyYXkuZnJvbSh0aGlzLiRlbC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuJykpO1xuXG4gICAgdGhpcy5faGlnaGxpZ2h0QnRuKHRoaXMuX2luZGV4KTtcbiAgICB0aGlzLl9iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgX2JpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kcHJldi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5faW5kZXggLSAxO1xuICAgICAgdGhpcy5fcHJvcGFnYXRlKGluZGV4KTtcbiAgICB9KTtcblxuICAgIHRoaXMuJG5leHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2luZGV4ICsgMTtcbiAgICAgIHRoaXMuX3Byb3BhZ2F0ZShpbmRleCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLiRidG5zLmZvckVhY2goKCRidG4sIGluZGV4KSA9PiB7XG4gICAgICAkYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLl9wcm9wYWdhdGUoaW5kZXgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgX3Byb3BhZ2F0ZShpbmRleCkge1xuICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiB0aGlzLl9tYXhJbmRleCkgcmV0dXJuO1xuXG4gICAgdGhpcy5faW5kZXggPSBpbmRleDtcbiAgICB0aGlzLl92YWx1ZSA9IHRoaXMucGFyYW1zLm9wdGlvbnNbaW5kZXhdO1xuICAgIHRoaXMuX2hpZ2hsaWdodEJ0bih0aGlzLl9pbmRleCk7XG5cbiAgICB0aGlzLmV4ZWN1dGVMaXN0ZW5lcnModGhpcy5fdmFsdWUsIHRoaXMuX2luZGV4KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBfaGlnaGxpZ2h0QnRuKGFjdGl2ZUluZGV4KSB7XG4gICAgdGhpcy4kYnRucy5mb3JFYWNoKCgkYnRuLCBpbmRleCkgPT4ge1xuICAgICAgJGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblxuICAgICAgaWYgKGFjdGl2ZUluZGV4ID09PSBpbmRleCkge1xuICAgICAgICAkYnRuLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdEJ1dHRvbnM7XG4iLCJpbXBvcnQgQmFzZUNvbXBvbmVudCBmcm9tICcuL0Jhc2VDb21wb25lbnQnO1xuaW1wb3J0IGRpc3BsYXkgZnJvbSAnLi4vbWl4aW5zL2Rpc3BsYXknO1xuaW1wb3J0ICogYXMgZWxlbWVudHMgZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuXG4vKiogQG1vZHVsZSBiYXNpYy1jb250cm9sbGVycyAqL1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgbGFiZWw6ICcmbmJzcDsnLFxuICBvcHRpb25zOiBudWxsLFxuICBkZWZhdWx0OiBudWxsLFxuICBjb250YWluZXI6IG51bGwsXG4gIGNhbGxiYWNrOiBudWxsLFxufVxuXG4vKipcbiAqIERyb3AtZG93biBsaXN0IGNvbnRyb2xsZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBjb25maWcubGFiZWwgLSBMYWJlbCBvZiB0aGUgY29udHJvbGxlci5cbiAqIEBwYXJhbSB7QXJyYXl9IFtjb25maWcub3B0aW9ucz1udWxsXSAtIFZhbHVlcyBvZiB0aGUgZHJvcCBkb3duIGxpc3QuXG4gKiBAcGFyYW0ge051bWJlcn0gW2NvbmZpZy5kZWZhdWx0PW51bGxdIC0gRGVmYXVsdCB2YWx1ZS5cbiAqIEBwYXJhbSB7U3RyaW5nfEVsZW1lbnR8YmFzaWMtY29udHJvbGxlcn5Hcm91cH0gW2NvbmZpZy5jb250YWluZXI9bnVsbF0gLVxuICogIENvbnRhaW5lciBvZiB0aGUgY29udHJvbGxlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb25maWcuY2FsbGJhY2s9bnVsbF0gLSBDYWxsYmFjayB0byBiZSBleGVjdXRlZCB3aGVuIHRoZVxuICogIHZhbHVlIGNoYW5nZXMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGNvbnRyb2xsZXJzIGZyb20gJ2Jhc2ljLWNvbnRyb2xsZXJzJztcbiAqXG4gKiBjb25zdCBzZWxlY3RMaXN0ID0gbmV3IGNvbnRyb2xsZXJzLlNlbGVjdExpc3Qoe1xuICogICBsYWJlbDogJ1NlbGVjdExpc3QnLFxuICogICBvcHRpb25zOiBbJ3N0YW5kYnknLCAncnVuJywgJ2VuZCddLFxuICogICBkZWZhdWx0OiAncnVuJyxcbiAqICAgY29udGFpbmVyOiAnI2NvbnRhaW5lcicsXG4gKiAgIGNhbGxiYWNrOiAodmFsdWUsIGluZGV4KSA9PiBjb25zb2xlLmxvZyh2YWx1ZSwgaW5kZXgpLFxuICogfSk7XG4gKi9cbmNsYXNzIFNlbGVjdExpc3QgZXh0ZW5kcyBkaXNwbGF5KEJhc2VDb21wb25lbnQpIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoJ3NlbGVjdC1saXN0JywgZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5wYXJhbXMub3B0aW9ucykpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyaWdnZXJCdXR0b246IEludmFsaWQgb3B0aW9uIFwib3B0aW9uc1wiJyk7XG5cbiAgICB0aGlzLl92YWx1ZSA9IHRoaXMucGFyYW1zLmRlZmF1bHQ7XG5cbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5wYXJhbXMub3B0aW9ucztcbiAgICBjb25zdCBpbmRleCA9IG9wdGlvbnMuaW5kZXhPZih0aGlzLl92YWx1ZSk7XG4gICAgdGhpcy5faW5kZXggPSBpbmRleCA9PT0gLTEgP8KgMCA6IGluZGV4O1xuICAgIHRoaXMuX21heEluZGV4ID0gb3B0aW9ucy5sZW5ndGggLSAxO1xuXG4gICAgc3VwZXIuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgdmFsdWUuXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy4kc2VsZWN0LnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLl9pbmRleCA9IHRoaXMucGFyYW1zLm9wdGlvbnMuaW5kZXhPZih2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogQ3VycmVudCBvcHRpb24gaW5kZXguXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBnZXQgaW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luZGV4O1xuICB9XG5cbiAgc2V0IGluZGV4KGluZGV4KSB7XG4gICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+IHRoaXMuX21heEluZGV4KSByZXR1cm47XG4gICAgdGhpcy52YWx1ZSA9IHRoaXMucGFyYW1zLm9wdGlvbnNbaW5kZXhdO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGxhYmVsLCBvcHRpb25zwqB9ID0gdGhpcy5wYXJhbXM7XG4gICAgY29uc3QgY29udGVudCA9IGBcbiAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWxcIj4ke2xhYmVsfTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbm5lci13cmFwcGVyXCI+XG4gICAgICAgICR7ZWxlbWVudHMuYXJyb3dMZWZ0fVxuICAgICAgICA8c2VsZWN0PlxuICAgICAgICAke29wdGlvbnMubWFwKChvcHRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGA8b3B0aW9uIHZhbHVlPVwiJHtvcHRpb259XCI+JHtvcHRpb259PC9vcHRpb24+YDtcbiAgICAgICAgfSkuam9pbignJyl9XG4gICAgICAgIDxzZWxlY3Q+XG4gICAgICAgICR7ZWxlbWVudHMuYXJyb3dSaWdodH1cbiAgICAgIDwvZGl2PlxuICAgIGA7XG5cbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcih0aGlzLnR5cGUpO1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoJ2FsaWduLXNtYWxsJyk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuJHByZXYgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuYXJyb3ctbGVmdCcpO1xuICAgIHRoaXMuJG5leHQgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuYXJyb3ctcmlnaHQnKTtcbiAgICB0aGlzLiRzZWxlY3QgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCdzZWxlY3QnKTtcbiAgICAvLyBzZXQgdG8gZGVmYXVsdCB2YWx1ZVxuICAgIHRoaXMuJHNlbGVjdC52YWx1ZSA9IG9wdGlvbnNbdGhpcy5faW5kZXhdO1xuICAgIHRoaXMuX2JpbmRFdmVudHMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBfYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLiRwcmV2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9pbmRleCAtIDE7XG4gICAgICB0aGlzLl9wcm9wYWdhdGUoaW5kZXgpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIHRoaXMuJG5leHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2luZGV4ICsgMTtcbiAgICAgIHRoaXMuX3Byb3BhZ2F0ZShpbmRleCk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgdGhpcy4kc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy4kc2VsZWN0LnZhbHVlO1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnBhcmFtcy5vcHRpb25zLmluZGV4T2YodmFsdWUpO1xuICAgICAgdGhpcy5fcHJvcGFnYXRlKGluZGV4KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBfcHJvcGFnYXRlKGluZGV4KSB7XG4gICAgaWYgKGluZGV4IDwgMCB8fMKgaW5kZXggPiB0aGlzLl9tYXhJbmRleCkgcmV0dXJuO1xuXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnBhcmFtcy5vcHRpb25zW2luZGV4XTtcbiAgICB0aGlzLl9pbmRleCA9IGluZGV4O1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy4kc2VsZWN0LnZhbHVlID0gdmFsdWU7XG5cbiAgICB0aGlzLmV4ZWN1dGVMaXN0ZW5lcnModGhpcy5fdmFsdWUsIHRoaXMuX2luZGV4KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RMaXN0O1xuIiwiaW1wb3J0IEJhc2VDb21wb25lbnQgZnJvbSAnLi9CYXNlQ29tcG9uZW50JztcbmltcG9ydCBkaXNwbGF5IGZyb20gJy4uL21peGlucy9kaXNwbGF5JztcbmltcG9ydCAqIGFzIGd1aUNvbXBvbmVudHMgZnJvbSAnQGlyY2FtL2d1aS1jb21wb25lbnRzJztcblxuLyoqIEBtb2R1bGUgYmFzaWMtY29udHJvbGxlcnMgKi9cblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIGxhYmVsOiAnJm5ic3A7JyxcbiAgbWluOiAwLFxuICBtYXg6IDEsXG4gIHN0ZXA6IDAuMDEsXG4gIGRlZmF1bHQ6IDAsXG4gIHVuaXQ6ICcnLFxuICBzaXplOiAnbWVkaXVtJyxcbiAgY29udGFpbmVyOiBudWxsLFxuICBjYWxsYmFjazogbnVsbCxcbn1cblxuLyoqXG4gKiBTbGlkZXIgY29udHJvbGxlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZy5sYWJlbCAtIExhYmVsIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtjb25maWcubWluPTBdIC0gTWluaW11bSB2YWx1ZS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLm1heD0xXSAtIE1heGltdW0gdmFsdWUuXG4gKiBAcGFyYW0ge051bWJlcn0gW2NvbmZpZy5zdGVwPTAuMDFdIC0gU3RlcCBiZXR3ZWVuIGNvbnNlY3V0aXZlIHZhbHVlcy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLmRlZmF1bHQ9MF0gLSBEZWZhdWx0IHZhbHVlLlxuICogQHBhcmFtIHtTdHJpbmd9IFtjb25maWcudW5pdD0nJ10gLSBVbml0IG9mIHRoZSB2YWx1ZS5cbiAqIEBwYXJhbSB7J3NtYWxsJ3wnbWVkaXVtJ3wnbGFyZ2UnfSBbY29uZmlnLnNpemU9J21lZGl1bSddIC0gU2l6ZSBvZiB0aGVcbiAqICBzbGlkZXIuXG4gKiBAcGFyYW0ge1N0cmluZ3xFbGVtZW50fGJhc2ljLWNvbnRyb2xsZXJ+R3JvdXB9IFtjb25maWcuY29udGFpbmVyPW51bGxdIC1cbiAqICBDb250YWluZXIgb2YgdGhlIGNvbnRyb2xsZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29uZmlnLmNhbGxiYWNrPW51bGxdIC0gQ2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWQgd2hlbiB0aGVcbiAqICB2YWx1ZSBjaGFuZ2VzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBjb250cm9sbGVycyBmcm9tICdiYXNpYy1jb250cm9sbGVycyc7XG4gKlxuICogY29uc3Qgc2xpZGVyID0gbmV3IGNvbnRyb2xsZXJzLlNsaWRlcih7XG4gKiAgIGxhYmVsOiAnTXkgU2xpZGVyJyxcbiAqICAgbWluOiAyMCxcbiAqICAgbWF4OiAxMDAwLFxuICogICBzdGVwOiAxLFxuICogICBkZWZhdWx0OiA1MzcsXG4gKiAgIHVuaXQ6ICdIeicsXG4gKiAgIHNpemU6ICdsYXJnZScsXG4gKiAgIGNvbnRhaW5lcjogJyNjb250YWluZXInLFxuICogICBjYWxsYmFjazogKHZhbHVlKSA9PiBjb25zb2xlLmxvZyh2YWx1ZSksXG4gKiB9KTtcbiAqL1xuY2xhc3MgU2xpZGVyIGV4dGVuZHMgZGlzcGxheShCYXNlQ29tcG9uZW50KSB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKCdzbGlkZXInLCBkZWZhdWx0cywgY29uZmlnKTtcblxuICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5wYXJhbXMuZGVmYXVsdDtcbiAgICB0aGlzLl9vblNsaWRlckNoYW5nZSA9IHRoaXMuX29uU2xpZGVyQ2hhbmdlLmJpbmQodGhpcyk7XG5cbiAgICBzdXBlci5pbml0aWFsaXplKCk7XG4gIH1cblxuICAvKipcbiAgICogQ3VycmVudCB2YWx1ZS5cbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG5cbiAgICBpZiAodGhpcy4kbnVtYmVyICYmIHRoaXMuJHJhbmdlKSB7XG4gICAgICB0aGlzLiRudW1iZXIudmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgdGhpcy5zbGlkZXIudmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgbGFiZWwsIG1pbiwgbWF4LCBzdGVwLCB1bml0LCBzaXplIH0gPSB0aGlzLnBhcmFtcztcbiAgICBjb25zdCBjb250ZW50ID0gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJsYWJlbFwiPiR7bGFiZWx9PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImlubmVyLXdyYXBwZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJhbmdlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJudW1iZXItd3JhcHBlclwiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgY2xhc3M9XCJudW1iZXJcIiBtaW49XCIke21pbn1cIiBtYXg9XCIke21heH1cIiBzdGVwPVwiJHtzdGVwfVwiIHZhbHVlPVwiJHt0aGlzLl92YWx1ZX1cIiAvPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwidW5pdFwiPiR7dW5pdH08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+YDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKHRoaXMudHlwZSk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKGBzbGlkZXItJHtzaXplfWApO1xuXG4gICAgdGhpcy4kcmFuZ2UgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcucmFuZ2UnKTtcbiAgICB0aGlzLiRudW1iZXIgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKGBpbnB1dFt0eXBlPVwibnVtYmVyXCJdYCk7XG5cbiAgICB0aGlzLnNsaWRlciA9IG5ldyBndWlDb21wb25lbnRzLlNsaWRlcih7XG4gICAgICBjb250YWluZXI6IHRoaXMuJHJhbmdlLFxuICAgICAgY2FsbGJhY2s6IHRoaXMuX29uU2xpZGVyQ2hhbmdlLFxuICAgICAgbWluOiBtaW4sXG4gICAgICBtYXg6IG1heCxcbiAgICAgIHN0ZXA6IHN0ZXAsXG4gICAgICBkZWZhdWx0OiB0aGlzLl92YWx1ZSxcbiAgICAgIGZvcmVncm91bmRDb2xvcjogJyNhYmFiYWInLFxuICAgIH0pO1xuXG4gICAgdGhpcy5fYmluZEV2ZW50cygpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlc2l6ZSgpIHtcbiAgICBzdXBlci5yZXNpemUoKTtcblxuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodMKgfSA9IHRoaXMuJHJhbmdlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHRoaXMuc2xpZGVyLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBfYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLiRudW1iZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBwYXJzZUZsb2F0KHRoaXMuJG51bWJlci52YWx1ZSk7XG4gICAgICAvLyB0aGUgc2xpZGVyIHByb3BhZ2F0ZXMgdGhlIHZhbHVlXG4gICAgICB0aGlzLnNsaWRlci52YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB9LCBmYWxzZSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgX29uU2xpZGVyQ2hhbmdlKHZhbHVlKSB7XG4gICAgdGhpcy4kbnVtYmVyLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcblxuICAgIHRoaXMuZXhlY3V0ZUxpc3RlbmVycyh0aGlzLl92YWx1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2xpZGVyO1xuIiwiaW1wb3J0IEJhc2VDb21wb25lbnQgZnJvbSAnLi9CYXNlQ29tcG9uZW50JztcbmltcG9ydCBkaXNwbGF5IGZyb20gJy4uL21peGlucy9kaXNwbGF5JztcblxuLyoqIEBtb2R1bGUgYmFzaWMtY29udHJvbGxlcnMgKi9cblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIGxhYmVsOiAnJm5ic3A7JyxcbiAgZGVmYXVsdDogJycsXG4gIHJlYWRvbmx5OiBmYWxzZSxcbiAgY29udGFpbmVyOiBudWxsLFxuICBjYWxsYmFjazogbnVsbCxcbn1cblxuLyoqXG4gKiBUZXh0IGNvbnRyb2xsZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBjb25maWcubGFiZWwgLSBMYWJlbCBvZiB0aGUgY29udHJvbGxlci5cbiAqIEBwYXJhbSB7QXJyYXl9IFtjb25maWcuZGVmYXVsdD0nJ10gLSBEZWZhdWx0IHZhbHVlIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtBcnJheX0gW2NvbmZpZy5yZWFkb25seT1mYWxzZV0gLSBEZWZpbmUgaWYgdGhlIGNvbnRyb2xsZXIgaXMgcmVhZG9ubHkuXG4gKiBAcGFyYW0ge1N0cmluZ3xFbGVtZW50fGJhc2ljLWNvbnRyb2xsZXJ+R3JvdXB9IFtjb25maWcuY29udGFpbmVyPW51bGxdIC1cbiAqICBDb250YWluZXIgb2YgdGhlIGNvbnRyb2xsZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29uZmlnLmNhbGxiYWNrPW51bGxdIC0gQ2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWQgd2hlbiB0aGVcbiAqICB2YWx1ZSBjaGFuZ2VzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBjb250cm9sbGVycyBmcm9tICdiYXNpYy1jb250b2xsZXJzJztcbiAqXG4gKiBjb25zdCB0ZXh0ID0gbmV3IGNvbnRyb2xsZXJzLlRleHQoe1xuICogICBsYWJlbDogJ015IFRleHQnLFxuICogICBkZWZhdWx0OiAnZGVmYXVsdCB2YWx1ZScsXG4gKiAgIHJlYWRvbmx5OiBmYWxzZSxcbiAqICAgY29udGFpbmVyOiAnI2NvbnRhaW5lcicsXG4gKiAgIGNhbGxiYWNrOiAodmFsdWUpID0+IGNvbnNvbGUubG9nKHZhbHVlKSxcbiAqIH0pO1xuICovXG5jbGFzcyBUZXh0IGV4dGVuZHMgZGlzcGxheShCYXNlQ29tcG9uZW50KSB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKCd0ZXh0JywgZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICB0aGlzLl92YWx1ZSA9IHRoaXMucGFyYW1zLmRlZmF1bHQ7XG4gICAgdGhpcy5pbml0aWFsaXplKCk7XG4gIH1cblxuICAvKipcbiAgICogQ3VycmVudCB2YWx1ZS5cbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLiRpbnB1dC52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHJlYWRvbmx5ID0gdGhpcy5wYXJhbXMucmVhZG9ubHkgPyAncmVhZG9ubHknIDogJyc7XG4gICAgY29uc3QgY29udGVudCA9IGBcbiAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWxcIj4ke3RoaXMucGFyYW1zLmxhYmVsfTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbm5lci13cmFwcGVyXCI+XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cInRleHRcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiJHt0aGlzLl92YWx1ZX1cIiAke3JlYWRvbmx5fSAvPlxuICAgICAgPC9kaXY+XG4gICAgYDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKCk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcbiAgICB0aGlzLiRpbnB1dCA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy50ZXh0Jyk7XG5cbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLiRpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsICgpID0+IHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdGhpcy4kaW5wdXQudmFsdWU7XG4gICAgICB0aGlzLmV4ZWN1dGVMaXN0ZW5lcnModGhpcy5fdmFsdWUpO1xuICAgIH0sIGZhbHNlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUZXh0O1xuIiwiaW1wb3J0IEJhc2VDb21wb25lbnQgZnJvbSAnLi9CYXNlQ29tcG9uZW50JztcbmltcG9ydCBkaXNwbGF5IGZyb20gJy4uL21peGlucy9kaXNwbGF5JztcblxuLyoqIEBtb2R1bGUgYmFzaWMtY29udHJvbGxlcnMgKi9cblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIGxhYmVsOiAnJm5ic3A7JyxcbiAgY29udGFpbmVyOiBudWxsLFxufTtcblxuLyoqXG4gKiBUaXRsZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZy5sYWJlbCAtIExhYmVsIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtTdHJpbmd8RWxlbWVudHxiYXNpYy1jb250cm9sbGVyfkdyb3VwfSBbY29uZmlnLmNvbnRhaW5lcj1udWxsXSAtXG4gKiAgQ29udGFpbmVyIG9mIHRoZSBjb250cm9sbGVyLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBjb250cm9sbGVyIGZyb20gJ2Jhc2ljLWNvbnRyb2xsZXJzJztcbiAqXG4gKiBjb25zdCB0aXRsZSA9IG5ldyBjb250cm9sbGVycy5UaXRsZSh7XG4gKiAgIGxhYmVsOiAnTXkgVGl0bGUnLFxuICogICBjb250YWluZXI6ICcjY29udGFpbmVyJ1xuICogfSk7XG4gKi9cbmNsYXNzIFRpdGxlIGV4dGVuZHMgZGlzcGxheShCYXNlQ29tcG9uZW50KSB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKCd0aXRsZScsIGRlZmF1bHRzLCBjb25maWcpO1xuICAgIHN1cGVyLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgY29udGVudCA9IGA8c3BhbiBjbGFzcz1cImxhYmVsXCI+JHt0aGlzLnBhcmFtcy5sYWJlbH08L3NwYW4+YDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKCk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUaXRsZTtcbiIsImltcG9ydCBCYXNlQ29tcG9uZW50IGZyb20gJy4vQmFzZUNvbXBvbmVudCc7XG5pbXBvcnQgZGlzcGxheSBmcm9tICcuLi9taXhpbnMvZGlzcGxheSc7XG5pbXBvcnQgKiBhcyBlbGVtZW50cyBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5cbi8qKiBAbW9kdWxlIGJhc2ljLWNvbnRyb2xsZXJzICovXG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICBsYWJlbDogJyZibnNwOycsXG4gIGFjdGl2ZTogZmFsc2UsXG4gIGNvbnRhaW5lcjogbnVsbCxcbiAgY2FsbGJhY2s6IG51bGwsXG59O1xuXG4vKipcbiAqIE9uL09mZiBjb250cm9sbGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge1N0cmluZ30gY29uZmlnLmxhYmVsIC0gTGFiZWwgb2YgdGhlIGNvbnRyb2xsZXIuXG4gKiBAcGFyYW0ge0FycmF5fSBbY29uZmlnLmFjdGl2ZT1mYWxzZV0gLSBEZWZhdWx0IHN0YXRlIG9mIHRoZSB0b2dnbGUuXG4gKiBAcGFyYW0ge1N0cmluZ3xFbGVtZW50fGJhc2ljLWNvbnRyb2xsZXJ+R3JvdXB9IFtjb25maWcuY29udGFpbmVyPW51bGxdIC1cbiAqICBDb250YWluZXIgb2YgdGhlIGNvbnRyb2xsZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29uZmlnLmNhbGxiYWNrPW51bGxdIC0gQ2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWQgd2hlbiB0aGVcbiAqICB2YWx1ZSBjaGFuZ2VzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBjb250cm9sbGVycyBmcm9tICdiYXNpYy1jb250cm9sbGVycyc7XG4gKlxuICogY29uc3QgdG9nZ2xlID0gbmV3IGNvbnRyb2xsZXJzLlRvZ2dsZSh7XG4gKiAgIGxhYmVsOiAnTXkgVG9nZ2xlJyxcbiAqICAgYWN0aXZlOiBmYWxzZSxcbiAqICAgY29udGFpbmVyOiAnI2NvbnRhaW5lcicsXG4gKiAgIGNhbGxiYWNrOiAoYWN0aXZlKSA9PiBjb25zb2xlLmxvZyhhY3RpdmUpLFxuICogfSk7XG4gKi9cbmNsYXNzIFRvZ2dsZSBleHRlbmRzIGRpc3BsYXkoQmFzZUNvbXBvbmVudCkge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcigndG9nZ2xlJywgZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICB0aGlzLl9hY3RpdmUgPSB0aGlzLnBhcmFtcy5hY3RpdmU7XG5cbiAgICBzdXBlci5pbml0aWFsaXplKCk7XG4gIH1cblxuICAvKipcbiAgICogVmFsdWUgb2YgdGhlIHRvZ2dsZVxuICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICovXG4gIHNldCB2YWx1ZShib29sKSB7XG4gICAgdGhpcy5hY3RpdmUgPSBib29sO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmU7XG4gIH1cblxuICAvKipcbiAgICogQWxpYXMgZm9yIGB2YWx1ZWAuXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAgc2V0IGFjdGl2ZShib29sKSB7XG4gICAgdGhpcy5fYWN0aXZlID0gYm9vbDtcbiAgICB0aGlzLl91cGRhdGVCdG4oKTtcbiAgfVxuXG4gIGdldCBhY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBfdXBkYXRlQnRuKCkge1xuICAgIHZhciBtZXRob2QgPSB0aGlzLmFjdGl2ZSA/ICdhZGQnIDogJ3JlbW92ZSc7XG4gICAgdGhpcy4kdG9nZ2xlLmNsYXNzTGlzdFttZXRob2RdKCdhY3RpdmUnKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZW5kZXIoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBgXG4gICAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+JHt0aGlzLnBhcmFtcy5sYWJlbH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlclwiPlxuICAgICAgICAke2VsZW1lbnRzLnRvZ2dsZX1cbiAgICAgIDwvZGl2PmA7XG5cbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcigpO1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoJ2FsaWduLXNtYWxsJyk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuJHRvZ2dsZSA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy50b2dnbGUtZWxlbWVudCcpO1xuICAgIC8vIGluaXRpYWxpemUgc3RhdGVcbiAgICB0aGlzLmFjdGl2ZSA9IHRoaXMuX2FjdGl2ZTtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHRoaXMuYWN0aXZlID0gIXRoaXMuYWN0aXZlO1xuICAgICAgdGhpcy5leGVjdXRlTGlzdGVuZXJzKHRoaXMuX2FjdGl2ZSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9nZ2xlO1xuIiwiaW1wb3J0IEJhc2VDb21wb25lbnQgZnJvbSAnLi9CYXNlQ29tcG9uZW50JztcbmltcG9ydCBkaXNwbGF5IGZyb20gJy4uL21peGlucy9kaXNwbGF5JztcblxuLyoqIEBtb2R1bGUgYmFzaWMtY29udHJvbGxlcnMgKi9cblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIGxhYmVsOiAnJm5ic3A7JyxcbiAgb3B0aW9uczogbnVsbCxcbiAgY29udGFpbmVyOiBudWxsLFxuICBjYWxsYmFjazogbnVsbCxcbn07XG5cbi8qKlxuICogTGlzdCBvZiBidXR0b25zIHdpdGhvdXQgc3RhdGUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBjb25maWcubGFiZWwgLSBMYWJlbCBvZiB0aGUgY29udHJvbGxlci5cbiAqIEBwYXJhbSB7QXJyYXl9IFtjb25maWcub3B0aW9ucz1udWxsXSAtIE9wdGlvbnMgZm9yIGVhY2ggYnV0dG9uLlxuICogQHBhcmFtIHtTdHJpbmd8RWxlbWVudHxiYXNpYy1jb250cm9sbGVyfkdyb3VwfSBbY29uZmlnLmNvbnRhaW5lcj1udWxsXSAtXG4gKiAgQ29udGFpbmVyIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbmZpZy5jYWxsYmFjaz1udWxsXSAtIENhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIHdoZW4gdGhlXG4gKiAgdmFsdWUgY2hhbmdlcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgY29udHJvbGxlcnMgZnJvbSAnYmFzaWMtY29udHJvbGxlcnMnO1xuICpcbiAqIGNvbnN0IHRyaWdnZXJCdXR0b25zID0gbmV3IGNvbnRyb2xsZXJzLlRyaWdnZXJCdXR0b25zKHtcbiAqICAgbGFiZWw6ICdNeSBUcmlnZ2VyIEJ1dHRvbnMnLFxuICogICBvcHRpb25zOiBbJ3ZhbHVlIDEnLCAndmFsdWUgMicsICd2YWx1ZSAzJ10sXG4gKiAgIGNvbnRhaW5lcjogJyNjb250YWluZXInLFxuICogICBjYWxsYmFjazogKHZhbHVlLCBpbmRleCkgPT4gY29uc29sZS5sb2codmFsdWUsIGluZGV4KSxcbiAqIH0pO1xuICovXG5jbGFzcyBUcmlnZ2VyQnV0dG9ucyBleHRlbmRzIGRpc3BsYXkoQmFzZUNvbXBvbmVudCkge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcigndHJpZ2dlci1idXR0b25zJywgZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5wYXJhbXMub3B0aW9ucykpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyaWdnZXJCdXR0b246IEludmFsaWQgb3B0aW9uIFwib3B0aW9uc1wiJyk7XG5cbiAgICB0aGlzLl9pbmRleCA9IG51bGw7XG4gICAgdGhpcy5fdmFsdWUgPSBudWxsO1xuXG4gICAgc3VwZXIuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIExhc3QgdHJpZ2dlcmVkIGJ1dHRvbiB2YWx1ZS5cbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBnZXQgdmFsdWUoKSB7IHJldHVybiB0aGlzLl92YWx1ZTsgfVxuXG4gIC8qKlxuICAgKiBMYXN0IHRyaWdnZXJlZCBidXR0b24gaW5kZXguXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgZ2V0IGluZGV4KCkgeyByZXR1cm4gdGhpcy5faW5kZXg7IH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgbGFiZWwsIG9wdGlvbnMgfSA9IHRoaXMucGFyYW1zO1xuXG4gICAgY29uc3QgY29udGVudCA9IGBcbiAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWxcIj4ke2xhYmVsfTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbm5lci13cmFwcGVyXCI+XG4gICAgICAgICR7b3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICByZXR1cm4gYDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidG5cIj4ke29wdGlvbn08L2E+YDtcbiAgICAgICAgfSkuam9pbignJyl9XG4gICAgICA8L2Rpdj5gO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIoKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gICAgdGhpcy4kYnV0dG9ucyA9IEFycmF5LmZyb20odGhpcy4kZWwucXVlcnlTZWxlY3RvckFsbCgnLmJ0bicpKTtcbiAgICB0aGlzLl9iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgX2JpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kYnV0dG9ucy5mb3JFYWNoKCgkYnRuLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnBhcmFtcy5vcHRpb25zW2luZGV4XTtcblxuICAgICAgJGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9pbmRleCA9IGluZGV4O1xuXG4gICAgICAgIHRoaXMuZXhlY3V0ZUxpc3RlbmVycyh2YWx1ZSwgaW5kZXgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHJpZ2dlckJ1dHRvbnM7XG4iLCJpbXBvcnQgQmFzZUNvbXBvbmVudCBmcm9tICcuL2NvbXBvbmVudHMvQmFzZUNvbXBvbmVudCc7XG5pbXBvcnQgR3JvdXAgZnJvbSAnLi9jb21wb25lbnRzL0dyb3VwJztcbmltcG9ydCBOdW1iZXJCb3ggZnJvbSAnLi9jb21wb25lbnRzL051bWJlckJveCc7XG5pbXBvcnQgU2VsZWN0QnV0dG9ucyBmcm9tICcuL2NvbXBvbmVudHMvU2VsZWN0QnV0dG9ucyc7XG5pbXBvcnQgU2VsZWN0TGlzdCBmcm9tICcuL2NvbXBvbmVudHMvU2VsZWN0TGlzdCc7XG5pbXBvcnQgU2xpZGVyIGZyb20gJy4vY29tcG9uZW50cy9TbGlkZXInO1xuaW1wb3J0IFRleHQgZnJvbSAnLi9jb21wb25lbnRzL1RleHQnO1xuaW1wb3J0IFRpdGxlIGZyb20gJy4vY29tcG9uZW50cy9UaXRsZSc7XG5pbXBvcnQgVG9nZ2xlIGZyb20gJy4vY29tcG9uZW50cy9Ub2dnbGUnO1xuaW1wb3J0IFRyaWdnZXJCdXR0b25zIGZyb20gJy4vY29tcG9uZW50cy9UcmlnZ2VyQnV0dG9ucyc7XG5cbmltcG9ydCBjb250YWluZXIgZnJvbSAnLi9taXhpbnMvY29udGFpbmVyJztcblxuLy8gbWFwIHR5cGUgbmFtZXMgdG8gY29uc3RydWN0b3JzXG5jb25zdCB0eXBlQ3Rvck1hcCA9IHtcbiAgJ2dyb3VwJzogR3JvdXAsXG4gICdudW1iZXItYm94JzogTnVtYmVyQm94LFxuICAnc2VsZWN0LWJ1dHRvbnMnOiBTZWxlY3RCdXR0b25zLFxuICAnc2VsZWN0LWxpc3QnOiBTZWxlY3RMaXN0LFxuICAnc2xpZGVyJzogU2xpZGVyLFxuICAndGV4dCc6IFRleHQsXG4gICd0aXRsZSc6IFRpdGxlLFxuICAndG9nZ2xlJzogVG9nZ2xlLFxuICAndHJpZ2dlci1idXR0b25zJzogVHJpZ2dlckJ1dHRvbnMsXG59O1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgY29udGFpbmVyOiAnYm9keScsXG59O1xuXG5jbGFzcyBDb250cm9sIGV4dGVuZHMgY29udGFpbmVyKEJhc2VDb21wb25lbnQpIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoJ2NvbnRyb2wnLCBkZWZhdWx0cywgY29uZmlnKTtcblxuICAgIGxldCAkY29udGFpbmVyID0gdGhpcy5wYXJhbXMuY29udGFpbmVyO1xuXG4gICAgaWYgKHR5cGVvZiAkY29udGFpbmVyID09PSAnc3RyaW5nJylcbiAgICAgICRjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCRjb250YWluZXIpO1xuXG4gICAgdGhpcy4kY29udGFpbmVyID0gJGNvbnRhaW5lcjtcbiAgfVxufVxuXG4vKiogQG1vZHVsZSBiYXNpYy1jb250cm9sbGVycyAqL1xuXG4vKipcbiAqIENyZWF0ZSBhIHdob2xlIGNvbnRyb2wgc3VyZmFjZSBmcm9tIGEganNvbiBkZWZpbml0aW9uLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfEVsZW1lbnR9IGNvbnRhaW5lciAtIENvbnRhaW5lciBvZiB0aGUgY29udHJvbHMuXG4gKiBAcGFyYW0ge09iamVjdH0gLSBEZWZpbml0aW9ucyBmb3IgdGhlIGNvbnRyb2xzLlxuICogQHJldHVybiB7T2JqZWN0fSAtIEEgYENvbnRyb2xgIGluc3RhbmNlIHRoYXQgYmVoYXZlcyBsaWtlIGEgZ3JvdXAgd2l0aG91dCBncmFwaGljLlxuICogQHN0YXRpY1xuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBjb250cm9sbGVycyBmcm9tICdiYXNpYy1jb250cm9sbGVycyc7XG4gKlxuICogY29uc3QgZGVmaW5pdGlvbnMgPSBbXG4gKiAgIHtcbiAqICAgICBpZDogJ215LXNsaWRlcicsXG4gKiAgICAgdHlwZTogJ3NsaWRlcicsXG4gKiAgICAgbGFiZWw6ICdNeSBTbGlkZXInLFxuICogICAgIHNpemU6ICdsYXJnZScsXG4gKiAgICAgbWluOiAwLFxuICogICAgIG1heDogMTAwMCxcbiAqICAgICBzdGVwOiAxLFxuICogICAgIGRlZmF1bHQ6IDI1MyxcbiAqICAgfSwge1xuICogICAgIGlkOiAnbXktZ3JvdXAnLFxuICogICAgIHR5cGU6ICdncm91cCcsXG4gKiAgICAgbGFiZWw6ICdHcm91cCcsXG4gKiAgICAgZGVmYXVsdDogJ29wZW5lZCcsXG4gKiAgICAgZWxlbWVudHM6IFtcbiAqICAgICAgIHtcbiAqICAgICAgICAgaWQ6ICdteS1udW1iZXInLFxuICogICAgICAgICB0eXBlOiAnbnVtYmVyLWJveCcsXG4gKiAgICAgICAgIGRlZmF1bHQ6IDAuNCxcbiAqICAgICAgICAgbWluOiAtMSxcbiAqICAgICAgICAgbWF4OiAxLFxuICogICAgICAgICBzdGVwOiAwLjAxLFxuICogICAgICAgfVxuICogICAgIF0sXG4gKiAgIH1cbiAqIF07XG4gKlxuICogY29uc3QgY29udHJvbHMgPSBjb250cm9sbGVycy5jcmVhdGUoJyNjb250YWluZXInLCBkZWZpbml0aW9ucyk7XG4gKlxuICogLy8gYWRkIGEgbGlzdGVuZXIgb24gYWxsIHRoZSBjb21wb25lbnQgaW5zaWRlIGBteS1ncm91cGBcbiAqIGNvbnRyb2xzLmFkZExpc3RlbmVyKCdteS1ncm91cCcsIChpZCwgdmFsdWUpID0+IGNvbnNvbGUubG9nKGlkLCB2YWx1ZSkpO1xuICpcbiAqIC8vIHJldHJpZXZlIHRoZSBpbnN0YW5jZSBvZiBgbXktbnVtYmVyYFxuICogY29uc3QgbXlOdW1iZXIgPSBjb250cm9scy5nZXRDb21wb25lbnQoJ215LWdyb3VwL215LW51bWJlcicpO1xuICovXG5mdW5jdGlvbiBjcmVhdGUoY29udGFpbmVyLCBkZWZpbml0aW9ucykge1xuXG4gIGZ1bmN0aW9uIF9wYXJzZShjb250YWluZXIsIGRlZmluaXRpb25zKSB7XG4gICAgZGVmaW5pdGlvbnMuZm9yRWFjaCgoZGVmLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgdHlwZSA9IGRlZi50eXBlO1xuICAgICAgY29uc3QgY3RvciA9IHR5cGVDdG9yTWFwW3R5cGVdO1xuICAgICAgY29uc3QgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmKTtcblxuICAgICAgLy9cbiAgICAgIGNvbmZpZy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICBkZWxldGUgY29uZmlnLnR5cGU7XG5cbiAgICAgIGNvbnN0IGNvbXBvbmVudCA9IG5ldyBjdG9yKGNvbmZpZyk7XG5cbiAgICAgIGlmICh0eXBlID09PSAnZ3JvdXAnKVxuICAgICAgICBfcGFyc2UoY29tcG9uZW50LCBjb25maWcuZWxlbWVudHMpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IF9yb290ID0gbmV3IENvbnRyb2woeyBjb250YWluZXI6IGNvbnRhaW5lciB9KTtcbiAgX3BhcnNlKF9yb290LCBkZWZpbml0aW9ucyk7XG5cbiAgcmV0dXJuIF9yb290O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGU7XG4iLCJpbXBvcnQgKiBhcyBfc3R5bGVzIGZyb20gJy4vdXRpbHMvc3R5bGVzJztcbmV4cG9ydCBjb25zdCBzdHlsZXMgPSBfc3R5bGVzO1xuXG4vKiogQG1vZHVsZSBiYXNpYy1jb250cm9sbGVycyAqL1xuXG4vLyBleHBvc2UgZm9yIHBsdWdpbnNcbmltcG9ydCBfQmFzZUNvbXBvbmVudCBmcm9tICcuL2NvbXBvbmVudHMvQmFzZUNvbXBvbmVudCc7XG5leHBvcnQgY29uc3QgQmFzZUNvbXBvbmVudCA9IF9CYXNlQ29tcG9uZW50O1xuXG4vLyBjb21wb25lbnRzXG5leHBvcnQgeyBkZWZhdWx0IGFzIEdyb3VwIH0gZnJvbSAnLi9jb21wb25lbnRzL0dyb3VwJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRHJhZ0FuZERyb3AgfSBmcm9tICcuL2NvbXBvbmVudHMvRHJhZ0FuZERyb3AnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBOdW1iZXJCb3ggfSBmcm9tICcuL2NvbXBvbmVudHMvTnVtYmVyQm94JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU2VsZWN0QnV0dG9ucyB9IGZyb20gJy4vY29tcG9uZW50cy9TZWxlY3RCdXR0b25zJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU2VsZWN0TGlzdCB9IGZyb20gJy4vY29tcG9uZW50cy9TZWxlY3RMaXN0JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU2xpZGVyIH0gZnJvbSAnLi9jb21wb25lbnRzL1NsaWRlcic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFRleHQgfSBmcm9tICcuL2NvbXBvbmVudHMvVGV4dCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFRpdGxlIH0gZnJvbSAnLi9jb21wb25lbnRzL1RpdGxlJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVG9nZ2xlIH0gZnJvbSAnLi9jb21wb25lbnRzL1RvZ2dsZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFRyaWdnZXJCdXR0b25zIH0gZnJvbSAnLi9jb21wb25lbnRzL1RyaWdnZXJCdXR0b25zJztcblxuLy8gZmFjdG9yeVxuZXhwb3J0IHsgZGVmYXVsdCBhcyBjcmVhdGUgfSBmcm9tICcuL2ZhY3RvcnknO1xuLy8gZGlzcGxheVxuZXhwb3J0IHsgc2V0VGhlbWUgIH0gZnJvbSAnLi9taXhpbnMvZGlzcGxheSc7XG5cbi8qKlxuICogRGlzYWJsZSBkZWZhdWx0IHN0eWxpbmcgKGV4cGVjdCBhIGJyb2tlbiB1aSlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVTdHlsZXMoKSB7XG4gIF9zdHlsZXMuZGlzYWJsZSgpO1xufTtcbiIsIlxuY29uc3Qgc2VwYXJhdG9yID0gJy8nO1xuXG5mdW5jdGlvbiBnZXRIZWFkKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguc3BsaXQoc2VwYXJhdG9yKVswXTtcbn1cblxuZnVuY3Rpb24gZ2V0VGFpbChwYXRoKSB7XG4gIGNvbnN0IHBhcnRzID0gcGF0aC5zcGxpdChzZXBhcmF0b3IpO1xuICBwYXJ0cy5zaGlmdCgpO1xuICByZXR1cm4gcGFydHMuam9pbihzZXBhcmF0b3IpO1xufVxuXG5jb25zdCBjb250YWluZXIgPSAoc3VwZXJjbGFzcykgPT4gY2xhc3MgZXh0ZW5kcyBzdXBlcmNsYXNzIHtcbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgdGhpcy5lbGVtZW50cyA9IG5ldyBTZXQoKTtcblxuICAgIC8vIHN1cmUgb2YgdGhhdCA/XG4gICAgZGVsZXRlIHRoaXMuX2xpc3RlbmVycztcbiAgICBkZWxldGUgdGhpcy5fZ3JvdXBMaXN0ZW5lcnM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIG9uZSBvZiB0aGUgZ3JvdXAgY2hpbGRyZW4gYWNjb3JkaW5nIHRvIGl0cyBgaWRgLCBgbnVsbGAgb3RoZXJ3aXNlLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2dldEhlYWQoaWQpIHtcblxuICB9XG5cbiAgX2dldFRhaWwoaWQpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIGNoaWxkIG9mIHRoZSBncm91cCByZWN1cnNpdmVseSBhY2NvcmRpbmcgdG8gdGhlIGdpdmVuIGBpZGAsXG4gICAqIGBudWxsYCBvdGhlcndpc2UuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXRDb21wb25lbnQoaWQpIHtcbiAgICBjb25zdCBoZWFkID0gZ2V0SGVhZChpZCk7XG5cbiAgICBmb3IgKGxldCBjb21wb25lbnQgb2YgdGhpcy5lbGVtZW50cykge1xuICAgICAgaWYgKGhlYWQgPT09IGNvbXBvbmVudC5pZCkge1xuICAgICAgICBpZiAoaGVhZCA9PT0gaWQpXG4gICAgICAgICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgICAgICAgZWxzZSBpZiAoY29tcG9uZW50LnR5cGUgPSAnZ3JvdXAnKVxuICAgICAgICAgIHJldHVybiBjb21wb25lbnQuZ2V0Q29tcG9uZW50KGdldFRhaWwoaWQpKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5kZWZpbmVkIGNvbXBvbmVudCAke2lkfWApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRocm93IG5ldyBFcnJvcihgVW5kZWZpbmVkIGNvbXBvbmVudCAke2lkfWApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBMaXN0ZW5lciBvbiBlYWNoIGNvbXBvbmVudHMgb2YgdGhlIGdyb3VwLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gaWQgLSBQYXRoIHRvIGNvbXBvbmVudCBpZC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBGdW5jdGlvbiB0byBleGVjdXRlLlxuICAgKi9cbiAgYWRkTGlzdGVuZXIoaWQsIGNhbGxiYWNrKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGNhbGxiYWNrID0gaWQ7XG4gICAgICB0aGlzLl9hZGRHcm91cExpc3RlbmVyKCcnLCAnJywgY2FsbGJhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9hZGRHcm91cExpc3RlbmVyKGlkLCAnJywgY2FsbGJhY2spO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBfYWRkR3JvdXBMaXN0ZW5lcihpZCwgY2FsbElkLCBjYWxsYmFjaykge1xuICAgIGlmIChpZCkge1xuICAgICAgY29uc3QgY29tcG9uZW50SWQgPSBnZXRIZWFkKGlkKTtcbiAgICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMuZ2V0Q29tcG9uZW50KGNvbXBvbmVudElkKTtcblxuICAgICAgaWYgKGNvbXBvbmVudCkge1xuICAgICAgICBpZCA9IGdldFRhaWwoaWQpO1xuICAgICAgICBjb21wb25lbnQuX2FkZEdyb3VwTGlzdGVuZXIoaWQsIGNhbGxJZCwgY2FsbGJhY2spO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmRlZmluZWQgY29tcG9uZW50ICR7dGhpcy5yb290SWR9LyR7Y29tcG9uZW50SWR9YCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWxlbWVudHMuZm9yRWFjaCgoY29tcG9uZW50KSA9PiB7XG4gICAgICAgIGxldCBfY2FsbElkID0gY2FsbElkOyAvLyBjcmVhdGUgYSBuZXcgYnJhbmNoZVxuICAgICAgICBfY2FsbElkICs9IChjYWxsSWQgPT09ICcnKSA/IGNvbXBvbmVudC5pZCA6IHNlcGFyYXRvciArIGNvbXBvbmVudC5pZDtcbiAgICAgICAgY29tcG9uZW50Ll9hZGRHcm91cExpc3RlbmVyKGlkLCBfY2FsbElkLCBjYWxsYmFjayk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29udGFpbmVyO1xuIiwiaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4uL3V0aWxzL3N0eWxlcyc7XG5cbi8qKiBAbW9kdWxlIGJhc2ljLWNvbnRyb2xsZXJzICovXG5cbi8vIGRlZmF1bHQgdGhlbWVcbmxldCB0aGVtZSA9ICdsaWdodCc7XG4vLyBzZXQgb2YgdGhlIGluc3RhbmNpYXRlZCBjb250cm9sbGVyc1xuY29uc3QgY29udHJvbGxlcnMgPSBuZXcgU2V0KCk7XG5cblxuLyoqXG4gKiBDaGFuZ2UgdGhlIHRoZW1lIG9mIHRoZSBjb250cm9sbGVycywgY3VycmVudGx5IDMgdGhlbWVzIGFyZSBhdmFpbGFibGU6XG4gKiAgLSBgJ2xpZ2h0J2AgKGRlZmF1bHQpXG4gKiAgLSBgJ2dyZXknYFxuICogIC0gYCdkYXJrJ2BcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdGhlbWUgLSBOYW1lIG9mIHRoZSB0aGVtZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFRoZW1lKHZhbHVlKSB7XG4gIGNvbnRyb2xsZXJzLmZvckVhY2goKGNvbnRyb2xsZXIpID0+IGNvbnRyb2xsZXIuJGVsLmNsYXNzTGlzdC5yZW1vdmUodGhlbWUpKTtcbiAgdGhlbWUgPSB2YWx1ZTtcbiAgY29udHJvbGxlcnMuZm9yRWFjaCgoY29udHJvbGxlcikgPT4gY29udHJvbGxlci4kZWwuY2xhc3NMaXN0LmFkZCh0aGVtZSkpO1xufVxuXG4vKipcbiAqIGRpc3BsYXkgbWl4aW4gLSBjb21wb25lbnRzIHdpdGggRE9NXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBkaXNwbGF5ID0gKHN1cGVyY2xhc3MpID0+IGNsYXNzIGV4dGVuZHMgc3VwZXJjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKTtcblxuICAgIC8vIGluc2VydCBzdHlsZXMgYW5kIGxpc3RlbiB3aW5kb3cgcmVzaXplIHdoZW4gdGhlIGZpcnN0IGNvbnRyb2xsZXIgaXMgY3JlYXRlZFxuICAgIGlmIChjb250cm9sbGVycy5zaXplID09PSAwKSB7XG4gICAgICBzdHlsZXMuaW5zZXJ0U3R5bGVTaGVldCgpO1xuXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRyb2xsZXJzLmZvckVhY2goKGNvbnRyb2xsZXIpID0+IGNvbnRyb2xsZXIucmVzaXplKCkpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29udHJvbGxlcnMuYWRkKHRoaXMpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICBsZXQgJGNvbnRhaW5lciA9IHRoaXMucGFyYW1zLmNvbnRhaW5lcjtcblxuICAgIGlmICgkY29udGFpbmVyKSB7XG4gICAgICAvLyBjc3Mgc2VsZWN0b3JcbiAgICAgIGlmICh0eXBlb2YgJGNvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgJGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJGNvbnRhaW5lcik7XG4gICAgICAvLyBncm91cFxuICAgICAgfSBlbHNlIGlmICgkY29udGFpbmVyLiRjb250YWluZXIpIHtcbiAgICAgICAgLy8gdGhpcy5ncm91cCA9ICRjb250YWluZXI7XG4gICAgICAgICRjb250YWluZXIuZWxlbWVudHMuYWRkKHRoaXMpO1xuICAgICAgICAkY29udGFpbmVyID0gJGNvbnRhaW5lci4kY29udGFpbmVyO1xuICAgICAgfVxuXG4gICAgICAkY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyKCkpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlc2l6ZSgpLCAwKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuJGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZChzdHlsZXMubnMsIHRoZW1lLCB0aGlzLnR5cGUpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlc2l6ZSgpIHtcbiAgICBjb25zdCBib3VuZGluZ1JlY3QgPSB0aGlzLiRlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB3aWR0aCA9IGJvdW5kaW5nUmVjdC53aWR0aDtcbiAgICBjb25zdCBtZXRob2QgPSB3aWR0aCA+IDYwMCA/ICdyZW1vdmUnIDogJ2FkZCc7XG5cbiAgICB0aGlzLiRlbC5jbGFzc0xpc3RbbWV0aG9kXSgnc21hbGwnKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBkaXNwbGF5O1xuIiwiXG5leHBvcnQgY29uc3QgdG9nZ2xlID0gYFxuICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzcz1cInRvZ2dsZS1lbGVtZW50XCIgdmVyc2lvbj1cIjEuMVwiIHZpZXdCb3g9XCIwIDAgNTAgNTBcIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwibm9uZVwiPlxuICAgICAgPGcgY2xhc3M9XCJ4XCI+XG4gICAgICAgIDxsaW5lIHgxPVwiOFwiIHkxPVwiOFwiIHgyPVwiNDJcIiB5Mj1cIjQyXCIgc3Ryb2tlPVwid2hpdGVcIiAvPlxuICAgICAgICA8bGluZSB4MT1cIjhcIiB5MT1cIjQyXCIgeDI9XCI0MlwiIHkyPVwiOFwiIHN0cm9rZT1cIndoaXRlXCIgLz5cbiAgICAgIDwvZz5cbiAgPC9zdmc+XG5gO1xuXG5leHBvcnQgY29uc3QgYXJyb3dSaWdodCA9IGBcbiAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3M9XCJhcnJvdy1yaWdodFwiIHZlcnNpb249XCIxLjFcIiB2aWV3Qm94PVwiMCAwIDUwIDUwXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cIm5vbmVcIj5cbiAgICA8bGluZSB4MT1cIjEwXCIgeTE9XCIxMFwiIHgyPVwiNDBcIiB5Mj1cIjI1XCIgLz5cbiAgICA8bGluZSB4MT1cIjEwXCIgeTE9XCI0MFwiIHgyPVwiNDBcIiB5Mj1cIjI1XCIgLz5cbiAgPC9zdmc+XG5gO1xuXG5leHBvcnQgY29uc3QgYXJyb3dMZWZ0ID0gYFxuICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzcz1cImFycm93LWxlZnRcIiB2ZXJzaW9uPVwiMS4xXCIgdmlld0JveD1cIjAgMCA1MCA1MFwiIHByZXNlcnZlQXNwZWN0UmF0aW89XCJub25lXCI+XG4gICAgPGxpbmUgeDE9XCI0MFwiIHkxPVwiMTBcIiB4Mj1cIjEwXCIgeTI9XCIyNVwiIC8+XG4gICAgPGxpbmUgeDE9XCI0MFwiIHkxPVwiNDBcIiB4Mj1cIjEwXCIgeTI9XCIyNVwiIC8+XG4gIDwvc3ZnPlxuYDtcblxuZXhwb3J0IGNvbnN0IHNtYWxsQXJyb3dSaWdodCA9IGBcbiAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3M9XCJzbWFsbC1hcnJvdy1yaWdodFwiIHZpZXdCb3g9XCIwIDAgNTAgNTBcIj5cbiAgICA8cGF0aCBkPVwiTSAyMCAxNSBMIDM1IDI1IEwgMjAgMzUgWlwiIC8+XG4gIDwvc3ZnPlxuYDtcblxuZXhwb3J0IGNvbnN0IHNtYWxsQXJyb3dCb3R0b20gPSBgXG4gIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzPVwic21hbGwtYXJyb3ctYm90dG9tXCIgdmlld0JveD1cIjAgMCA1MCA1MFwiPlxuICAgIDxwYXRoIGQ9XCJNIDE1IDE3IEwgMzUgMTcgTCAyNSAzMiBaXCIgLz5cbiAgPC9zdmc+XG5gO1xuXG5cblxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIiAuYmFzaWMtY29udHJvbGxlcnMgeyB9IC5iYXNpYy1jb250cm9sbGVycyB7IHdpZHRoOiAxMDAlOyBtYXgtd2lkdGg6IDgwMHB4OyBoZWlnaHQ6IDM0cHg7IHBhZGRpbmc6IDNweDsgbWFyZ2luOiA0cHggMDsgYmFja2dyb3VuZC1jb2xvcjogI2VmZWZlZjsgYm9yZGVyOiAxcHggc29saWQgI2FhYWFhYTsgYm94LXNpemluZzogYm9yZGVyLWJveDsgYm9yZGVyLXJhZGl1czogMnB4OyBkaXNwbGF5OiBibG9jazsgY29sb3I6ICM0NjQ2NDY7IC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTsgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTsgLWtodG1sLXVzZXItc2VsZWN0OiBub25lOyAtbW96LXVzZXItc2VsZWN0OiBub25lOyAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7IHVzZXItc2VsZWN0OiBub25lOyB9IC5iYXNpYy1jb250cm9sbGVycyAubGFiZWwgeyBmb250OiBpdGFsaWMgbm9ybWFsIDEuMmVtIFF1aWNrc2FuZCwgYXJpYWwsIHNhbnMtc2VyaWY7IGxpbmUtaGVpZ2h0OiAyNnB4OyBvdmVyZmxvdzogaGlkZGVuOyB0ZXh0LWFsaWduOiByaWdodDsgcGFkZGluZzogMCA4cHggMCAwOyBkaXNwbGF5OiBibG9jazsgYm94LXNpemluZzogYm9yZGVyLWJveDsgd2lkdGg6IDI0JTsgZmxvYXQ6IGxlZnQ7IHdoaXRlLXNwYWNlOiBub3dyYXA7IC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7IC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7IC1tcy11c2VyLXNlbGVjdDogbm9uZTsgLW8tdXNlci1zZWxlY3Q6IG5vbmU7IHVzZXItc2VsZWN0OiBub25lOyB9IC5iYXNpYy1jb250cm9sbGVycyAuaW5uZXItd3JhcHBlciB7IGRpc3BsYXk6IC13ZWJraXQtaW5saW5lLWZsZXg7IGRpc3BsYXk6IGlubGluZS1mbGV4OyAtd2Via2l0LWZsZXgtd3JhcDogbm8td3JhcDsgZmxleC13cmFwOiBuby13cmFwOyB3aWR0aDogNzYlOyBmbG9hdDogbGVmdDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGwgeyBoZWlnaHQ6IDQ4cHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsOm5vdCguYWxpZ24tc21hbGwpIHsgaGVpZ2h0OiBhdXRvOyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbDpub3QoLmFsaWduLXNtYWxsKSAubGFiZWwgeyB3aWR0aDogMTAwJTsgZmxvYXQ6IG5vbmU7IHRleHQtYWxpZ246IGxlZnQ7IGxpbmUtaGVpZ2h0OiA0MHB4OyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbDpub3QoLmFsaWduLXNtYWxsKSAuaW5uZXItd3JhcHBlciB7IHdpZHRoOiAxMDAlOyBmbG9hdDogbm9uZTsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGwuYWxpZ24tc21hbGwgLmxhYmVsIHsgZGlzcGxheTogYmxvY2s7IG1hcmdpbi1yaWdodDogMjBweDsgdGV4dC1hbGlnbjogbGVmdDsgbGluZS1oZWlnaHQ6IDQwcHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsLmFsaWduLXNtYWxsIC5pbm5lci13cmFwcGVyIHsgZGlzcGxheTogaW5saW5lLWJsb2NrOyB3aWR0aDogYXV0bzsgfSAuYmFzaWMtY29udHJvbGxlcnMgLmFycm93LXJpZ2h0LCAuYmFzaWMtY29udHJvbGxlcnMgLmFycm93LWxlZnQgeyBib3JkZXItcmFkaXVzOiAycHg7IHdpZHRoOiAxNHB4OyBoZWlnaHQ6IDI2cHg7IGN1cnNvcjogcG9pbnRlcjsgYmFja2dyb3VuZC1jb2xvcjogIzQ2NDY0NjsgfSAuYmFzaWMtY29udHJvbGxlcnMgLmFycm93LXJpZ2h0IGxpbmUsIC5iYXNpYy1jb250cm9sbGVycyAuYXJyb3ctbGVmdCBsaW5lIHsgc3Ryb2tlLXdpZHRoOiAzcHg7IHN0cm9rZTogI2ZmZmZmZjsgfSAuYmFzaWMtY29udHJvbGxlcnMgLmFycm93LXJpZ2h0OmhvdmVyLCAuYmFzaWMtY29udHJvbGxlcnMgLmFycm93LWxlZnQ6aG92ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjNjg2ODY4OyB9IC5iYXNpYy1jb250cm9sbGVycyAuYXJyb3ctcmlnaHQ6YWN0aXZlLCAuYmFzaWMtY29udHJvbGxlcnMgLmFycm93LWxlZnQ6YWN0aXZlIHsgYmFja2dyb3VuZC1jb2xvcjogIzkwOTA5MDsgfSAuYmFzaWMtY29udHJvbGxlcnMgLnNtYWxsLWFycm93LXJpZ2h0LCAuYmFzaWMtY29udHJvbGxlcnMgLnNtYWxsLWFycm93LWJvdHRvbSB7IHdpZHRoOiAyNnB4OyBoZWlnaHQ6IDI2cHg7IGN1cnNvcjogcG9pbnRlcjsgfSAuYmFzaWMtY29udHJvbGxlcnMgLnNtYWxsLWFycm93LXJpZ2h0IHBhdGgsIC5iYXNpYy1jb250cm9sbGVycyAuc21hbGwtYXJyb3ctYm90dG9tIHBhdGggeyBmaWxsOiAjOTA5MDkwOyB9IC5iYXNpYy1jb250cm9sbGVycyAuc21hbGwtYXJyb3ctcmlnaHQ6aG92ZXIgcGF0aCwgLmJhc2ljLWNvbnRyb2xsZXJzIC5zbWFsbC1hcnJvdy1ib3R0b206aG92ZXIgcGF0aCB7IGZpbGw6ICM2ODY4Njg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC50b2dnbGUtZWxlbWVudCB7IHdpZHRoOiAyNnB4OyBoZWlnaHQ6IDI2cHg7IGJvcmRlci1yYWRpdXM6IDJweDsgYmFja2dyb3VuZC1jb2xvcjogIzQ2NDY0NjsgY3Vyc29yOiBwb2ludGVyOyB9IC5iYXNpYy1jb250cm9sbGVycyAudG9nZ2xlLWVsZW1lbnQ6aG92ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjNjg2ODY4OyB9IC5iYXNpYy1jb250cm9sbGVycyAudG9nZ2xlLWVsZW1lbnQgbGluZSB7IHN0cm9rZS13aWR0aDogM3B4OyB9IC5iYXNpYy1jb250cm9sbGVycyAudG9nZ2xlLWVsZW1lbnQgLnggeyBkaXNwbGF5OiBub25lOyB9IC5iYXNpYy1jb250cm9sbGVycyAudG9nZ2xlLWVsZW1lbnQuYWN0aXZlIC54IHsgZGlzcGxheTogYmxvY2s7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC5idG4geyBkaXNwbGF5OiBibG9jazsgdGV4dC1hbGlnbjogY2VudGVyOyBmb250OiBub3JtYWwgbm9ybWFsIDEycHggYXJpYWw7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgaGVpZ2h0OiAyNnB4OyBsaW5lLWhlaWdodDogMjZweDsgYmFja2dyb3VuZC1jb2xvcjogIzQ2NDY0NjsgYm9yZGVyOiBub25lOyBjb2xvcjogI2ZmZmZmZjsgbWFyZ2luOiAwIDRweCAwIDA7IHBhZGRpbmc6IDA7IGJveC1zaXppbmc6IGJvcmRlci1ib3g7IGJvcmRlci1yYWRpdXM6IDJweDsgY3Vyc29yOiBwb2ludGVyOyAtd2Via2l0LWZsZXgtZ3JvdzogMTsgZmxleC1ncm93OiAxOyB9IC5iYXNpYy1jb250cm9sbGVycyAuYnRuOmxhc3QtY2hpbGQgeyBtYXJnaW46IDA7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC5idG46aG92ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjNjg2ODY4OyB9IC5iYXNpYy1jb250cm9sbGVycyAuYnRuOmFjdGl2ZSwgLmJhc2ljLWNvbnRyb2xsZXJzIC5idG4uYWN0aXZlIHsgYmFja2dyb3VuZC1jb2xvcjogIzkwOTA5MDsgfSAuYmFzaWMtY29udHJvbGxlcnMgLmJ0bjpmb2N1cyB7IG91dGxpbmU6IG5vbmU7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC5udW1iZXIgeyBoZWlnaHQ6IDI2cHg7IGRpc3BsYXk6IGlubGluZS1ibG9jazsgcG9zaXRpb246IHJlbGF0aXZlOyBmb250OiBub3JtYWwgbm9ybWFsIDEuMmVtIFF1aWNrc2FuZCwgYXJpYWwsIHNhbnMtc2VyaWY7IHZlcnRpY2FsLWFsaWduOiB0b3A7IGJvcmRlcjogbm9uZTsgYmFja2dyb3VuZDogbm9uZTsgY29sb3I6ICM0NjQ2NDY7IHBhZGRpbmc6IDAgNHB4OyBtYXJnaW46IDA7IGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7IGJvcmRlci1yYWRpdXM6IDJweDsgYm94LXNpemluZzogYm9yZGVyLWJveDsgfSAuYmFzaWMtY29udHJvbGxlcnMgLm51bWJlcjpmb2N1cyB7IG91dGxpbmU6IG5vbmU7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIHNlbGVjdCB7IGhlaWdodDogMjZweDsgbGluZS1oZWlnaHQ6IDI2cHg7IGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7IGJvcmRlci1yYWRpdXM6IDJweDsgYm9yZGVyOiBub25lOyB2ZXJ0aWNhbC1hbGlnbjogdG9wOyBwYWRkaW5nOiAwOyBtYXJnaW46IDA7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIHNlbGVjdDpmb2N1cyB7IG91dGxpbmU6IG5vbmU7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIGlucHV0W3R5cGU9dGV4dF0geyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAyNnB4OyBsaW5lLWhlaWdodDogMjZweDsgYm9yZGVyOiAwOyBwYWRkaW5nOiAwIDRweDsgYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTsgYm9yZGVyLXJhZGl1czogMnB4OyBjb2xvcjogIzU2NTY1NjsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGwgLmFycm93LXJpZ2h0LCAuYmFzaWMtY29udHJvbGxlcnMuc21hbGwgLmFycm93LWxlZnQgeyB3aWR0aDogMjRweDsgaGVpZ2h0OiA0MHB4OyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbCAudG9nZ2xlLWVsZW1lbnQgeyB3aWR0aDogNDBweDsgaGVpZ2h0OiA0MHB4OyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbCAuYnRuIHsgaGVpZ2h0OiA0MHB4OyBsaW5lLWhlaWdodDogNDBweDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGwgLm51bWJlciB7IGhlaWdodDogNDBweDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGwgc2VsZWN0IHsgaGVpZ2h0OiA0MHB4OyBsaW5lLWhlaWdodDogNDBweDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGwgaW5wdXRbdHlwZT10ZXh0XSB7IGhlaWdodDogNDBweDsgbGluZS1oZWlnaHQ6IDQwcHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnRpdGxlIHsgYm9yZGVyOiBub25lICFpbXBvcnRhbnQ7IG1hcmdpbi1ib3R0b206IDA7IG1hcmdpbi10b3A6IDhweDsgcGFkZGluZy10b3A6IDhweDsgcGFkZGluZy1ib3R0b206IDA7IGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7IGhlaWdodDogMjVweDsgfSAuYmFzaWMtY29udHJvbGxlcnMudGl0bGUgLmxhYmVsIHsgZm9udDogbm9ybWFsIGJvbGQgMS4zZW0gUXVpY2tzYW5kLCBhcmlhbCwgc2Fucy1zZXJpZjsgaGVpZ2h0OiAxMDAlOyBvdmVyZmxvdzogaGlkZGVuOyB0ZXh0LWFsaWduOiBsZWZ0OyBwYWRkaW5nOiAwOyB3aWR0aDogMTAwJTsgYm94LXNpemluZzogYm9yZGVyLWJveDsgLXdlYmtpdC1mbGV4LWdyb3c6IDE7IGZsZXgtZ3JvdzogMTsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JvdXAgeyBoZWlnaHQ6IGF1dG87IGJhY2tncm91bmQtY29sb3I6IHdoaXRlOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncm91cCAuZ3JvdXAtaGVhZGVyIC5sYWJlbCB7IGZvbnQ6IG5vcm1hbCBib2xkIDEuM2VtIFF1aWNrc2FuZCwgYXJpYWwsIHNhbnMtc2VyaWY7IGhlaWdodDogMjZweDsgbGluZS1oZWlnaHQ6IDI2cHg7IG92ZXJmbG93OiBoaWRkZW47IHRleHQtYWxpZ246IGxlZnQ7IHBhZGRpbmc6IDAgMCAwIDM2cHg7IHdpZHRoOiAxMDAlOyBib3gtc2l6aW5nOiBib3JkZXItYm94OyAtd2Via2l0LWZsZXgtZ3JvdzogMTsgZmxleC1ncm93OiAxOyBmbG9hdDogbm9uZTsgY3Vyc29yOiBwb2ludGVyOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncm91cCAuZ3JvdXAtaGVhZGVyIC5zbWFsbC1hcnJvdy1yaWdodCB7IHdpZHRoOiAyNnB4OyBoZWlnaHQ6IDI2cHg7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JvdXAgLmdyb3VwLWhlYWRlciAuc21hbGwtYXJyb3ctYm90dG9tIHsgd2lkdGg6IDI2cHg7IGhlaWdodDogMjZweDsgcG9zaXRpb246IGFic29sdXRlOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncm91cCAuZ3JvdXAtY29udGVudCB7IG92ZXJmbG93OiBoaWRkZW47IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyb3VwIC5ncm91cC1jb250ZW50ID4gZGl2IHsgbWFyZ2luOiA0cHggYXV0bzsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JvdXAgLmdyb3VwLWNvbnRlbnQgPiBkaXY6bGFzdC1jaGlsZCB7IG1hcmdpbi1ib3R0b206IDA7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyb3VwLm9wZW5lZCAuZ3JvdXAtaGVhZGVyIC5zbWFsbC1hcnJvdy1yaWdodCB7IGRpc3BsYXk6IG5vbmU7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyb3VwLm9wZW5lZCAuZ3JvdXAtaGVhZGVyIC5zbWFsbC1hcnJvdy1ib3R0b20geyBkaXNwbGF5OiBibG9jazsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JvdXAub3BlbmVkIC5ncm91cC1jb250ZW50IHsgZGlzcGxheTogYmxvY2s7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyb3VwLmNsb3NlZCAuZ3JvdXAtaGVhZGVyIC5zbWFsbC1hcnJvdy1yaWdodCB7IGRpc3BsYXk6IGJsb2NrOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncm91cC5jbG9zZWQgLmdyb3VwLWhlYWRlciAuc21hbGwtYXJyb3ctYm90dG9tIHsgZGlzcGxheTogbm9uZTsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JvdXAuY2xvc2VkIC5ncm91cC1jb250ZW50IHsgZGlzcGxheTogbm9uZTsgfSAuYmFzaWMtY29udHJvbGxlcnMuc2xpZGVyIC5yYW5nZSB7IGhlaWdodDogMjZweDsgZGlzcGxheTogaW5saW5lLWJsb2NrOyBtYXJnaW46IDA7IC13ZWJraXQtZmxleC1ncm93OiA0OyBmbGV4LWdyb3c6IDQ7IHBvc2l0aW9uOiByZWxhdGl2ZTsgfSAuYmFzaWMtY29udHJvbGxlcnMuc2xpZGVyIC5yYW5nZSBjYW52YXMgeyBwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMDsgbGVmdDogMDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc2xpZGVyIC5udW1iZXItd3JhcHBlciB7IGRpc3BsYXk6IGlubGluZTsgaGVpZ2h0OiAyNnB4OyB0ZXh0LWFsaWduOiByaWdodDsgLXdlYmtpdC1mbGV4LWdyb3c6IDM7IGZsZXgtZ3JvdzogMzsgfSAuYmFzaWMtY29udHJvbGxlcnMuc2xpZGVyIC5udW1iZXItd3JhcHBlciAubnVtYmVyIHsgbGVmdDogNXB4OyB3aWR0aDogNTRweDsgdGV4dC1hbGlnbjogcmlnaHQ7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNsaWRlciAubnVtYmVyLXdyYXBwZXIgLnVuaXQgeyBmb250OiBpdGFsaWMgbm9ybWFsIDFlbSBRdWlja3NhbmQsIGFyaWFsLCBzYW5zLXNlcmlmOyBsaW5lLWhlaWdodDogMjZweDsgaGVpZ2h0OiAyNnB4OyB3aWR0aDogMzBweDsgZGlzcGxheTogaW5saW5lLWJsb2NrOyBwb3NpdGlvbjogcmVsYXRpdmU7IHBhZGRpbmctbGVmdDogNXB4OyBwYWRkaW5nLXJpZ2h0OiA1cHg7IGNvbG9yOiAjNTY1NjU2OyB9IC5iYXNpYy1jb250cm9sbGVycy5zbGlkZXIgLm51bWJlci13cmFwcGVyIC51bml0IHN1cCB7IGxpbmUtaGVpZ2h0OiA3cHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNsaWRlci5zbGlkZXItbGFyZ2UgLnJhbmdlIHsgLXdlYmtpdC1mbGV4LWdyb3c6IDUwOyBmbGV4LWdyb3c6IDUwOyB9IC5iYXNpYy1jb250cm9sbGVycy5zbGlkZXIuc2xpZGVyLWxhcmdlIC5udW1iZXItd3JhcHBlciB7IC13ZWJraXQtZmxleC1ncm93OiAxOyBmbGV4LWdyb3c6IDE7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNsaWRlci5zbGlkZXItc21hbGwgLnJhbmdlIHsgLXdlYmtpdC1mbGV4LWdyb3c6IDI7IGZsZXgtZ3JvdzogMjsgfSAuYmFzaWMtY29udHJvbGxlcnMuc2xpZGVyLnNsaWRlci1zbWFsbCAubnVtYmVyLXdyYXBwZXIgeyAtd2Via2l0LWZsZXgtZ3JvdzogNDsgZmxleC1ncm93OiA0OyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbC5zbGlkZXIgLnJhbmdlIHsgaGVpZ2h0OiA0MHB4OyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbC5zbGlkZXIgLm51bWJlci13cmFwcGVyIHsgaGVpZ2h0OiA0MHB4OyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbC5zbGlkZXIgLm51bWJlci13cmFwcGVyIC51bml0IHsgbGluZS1oZWlnaHQ6IDQwcHg7IGhlaWdodDogNDBweDsgfSAuYmFzaWMtY29udHJvbGxlcnMubnVtYmVyLWJveCAubnVtYmVyIHsgd2lkdGg6IDEyMHB4OyBtYXJnaW46IDAgMTBweDsgdmVydGljYWwtYWxpZ246IHRvcDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc2VsZWN0LWxpc3Qgc2VsZWN0IHsgbWFyZ2luOiAwIDEwcHg7IHdpZHRoOiAxMjBweDsgZm9udDogbm9ybWFsIG5vcm1hbCAxLjJlbSBRdWlja3NhbmQsIGFyaWFsLCBzYW5zLXNlcmlmOyBjb2xvcjogIzQ2NDY0NjsgfSAuYmFzaWMtY29udHJvbGxlcnMuc2VsZWN0LWJ1dHRvbnMgLmJ0bjpmaXJzdC1vZi10eXBlIHsgbWFyZ2luLWxlZnQ6IDRweDsgfSAuYmFzaWMtY29udHJvbGxlcnMudGV4dCBpbnB1dFt0eXBlPXRleHRdIHsgZm9udDogbm9ybWFsIG5vcm1hbCAxLjJlbSBRdWlja3NhbmQsIGFyaWFsLCBzYW5zLXNlcmlmOyBjb2xvcjogIzQ2NDY0NjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZHJhZy1hbmQtZHJvcCB7IHdpZHRoOiAxMDAlOyB0ZXh0LWFsaWduOiBjZW50ZXI7IGZvbnQtd2VpZ2h0OiBib2xkOyBoZWlnaHQ6IDEwMHB4OyB9IC5iYXNpYy1jb250cm9sbGVycy5kcmFnLWFuZC1kcm9wIC5kcm9wLXpvbmUgeyBib3JkZXI6IDFweCBkb3R0ZWQgI2M0YzRjNDsgYm9yZGVyLXJhZGl1czogMnB4OyB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDIwMG1zOyBoZWlnaHQ6IDkwcHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRyYWctYW5kLWRyb3AgLmRyb3Atem9uZS5kcmFnIHsgYmFja2dyb3VuZC1jb2xvcjogI2M0YzRjNDsgfSAuYmFzaWMtY29udHJvbGxlcnMuZHJhZy1hbmQtZHJvcCAubGFiZWwgeyBkaXNwbGF5OiBibG9jazsgd2lkdGg6IDEwMCU7IGhlaWdodDogOTBweDsgbGluZS1oZWlnaHQ6IDkwcHg7IG1hcmdpbjogMDsgcGFkZGluZzogMDsgdGV4dC1hbGlnbjogY2VudGVyOyB9IC5iYXNpYy1jb250cm9sbGVycy5kcmFnLWFuZC1kcm9wLnByb2Nlc3MgLmxhYmVsIHsgZGlzcGxheTogbm9uZTsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGwuZHJhZy1hbmQtZHJvcCB7IGhlaWdodDogMTIwcHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsLmRyYWctYW5kLWRyb3AgLmRyb3Atem9uZSB7IGhlaWdodDogMTEwcHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsLmRyYWctYW5kLWRyb3AgLmxhYmVsIHsgZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDExMHB4OyBsaW5lLWhlaWdodDogMTEwcHg7IG1hcmdpbjogMDsgcGFkZGluZzogMDsgdGV4dC1hbGlnbjogY2VudGVyOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncmV5IHsgYmFja2dyb3VuZC1jb2xvcjogIzM2MzYzNjsgYm9yZGVyOiAxcHggc29saWQgIzU4NTg1ODsgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45NSk7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLnRvZ2dsZS1lbGVtZW50IHsgYmFja2dyb3VuZC1jb2xvcjogI2VmZWZlZjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAudG9nZ2xlLWVsZW1lbnQgbGluZSB7IHN0cm9rZTogIzM2MzYzNjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAudG9nZ2xlLWVsZW1lbnQ6aG92ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjY2RjZGNkOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC5hcnJvdy1yaWdodCwgLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLmFycm93LWxlZnQgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC5hcnJvdy1yaWdodCBsaW5lLCAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAuYXJyb3ctbGVmdCBsaW5lIHsgc3Ryb2tlOiAjMzYzNjM2OyB9IC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC5hcnJvdy1yaWdodDpob3ZlciwgLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLmFycm93LWxlZnQ6aG92ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjY2RjZGNkOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC5hcnJvdy1yaWdodDphY3RpdmUsIC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC5hcnJvdy1sZWZ0OmFjdGl2ZSB7IGJhY2tncm91bmQtY29sb3I6ICNhYmFiYWI7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLnNtYWxsLWFycm93LXJpZ2h0IHBhdGgsIC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC5zbWFsbC1hcnJvdy1ib3R0b20gcGF0aCB7IGZpbGw6ICNhYmFiYWI7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLnNtYWxsLWFycm93LXJpZ2h0OmhvdmVyIHBhdGgsIC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC5zbWFsbC1hcnJvdy1ib3R0b206aG92ZXIgcGF0aCB7IGZpbGw6ICNjZGNkY2Q7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLm51bWJlciwgLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgc2VsZWN0LCAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSBpbnB1dFt0eXBlPXRleHRdIHsgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45NSk7IGJhY2tncm91bmQtY29sb3I6ICM0NTQ1NDU7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLmJ0biB7IGJhY2tncm91bmQtY29sb3I6ICNlZmVmZWY7IGNvbG9yOiAjMzYzNjM2OyB9IC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC5idG46aG92ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjY2RjZGNkOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC5idG46YWN0aXZlLCAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAuYnRuLmFjdGl2ZSB7IGJhY2tncm91bmQtY29sb3I6ICNhYmFiYWI7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkuc2xpZGVyIC5pbm5lci13cmFwcGVyIC5udW1iZXItd3JhcHBlciAudW5pdCB7IGNvbG9yOiAjYmNiY2JjOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncmV5Lmdyb3VwIHsgYmFja2dyb3VuZC1jb2xvcjogIzUwNTA1MDsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JleS5kcmFnLWFuZC1kcm9wIC5kcm9wLXpvbmUgeyBib3JkZXI6IDFweCBkb3R0ZWQgIzcyNzI3MjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JleS5kcmFnLWFuZC1kcm9wIC5kcm9wLXpvbmUuZHJhZyB7IGJhY2tncm91bmQtY29sb3I6ICM3MjcyNzI7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjMjQyNDI0OyBib3JkZXI6IDFweCBzb2xpZCAjMjgyODI4OyBjb2xvcjogI2ZmZmZmZjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAudG9nZ2xlLWVsZW1lbnQgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjNDY0NjQ2OyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC50b2dnbGUtZWxlbWVudCBsaW5lIHsgc3Ryb2tlOiAjZmZmZmZmOyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC50b2dnbGUtZWxlbWVudDpob3ZlciB7IGJhY2tncm91bmQtY29sb3I6ICM2ODY4Njg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLmFycm93LXJpZ2h0LCAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYXJyb3ctbGVmdCB7IGJhY2tncm91bmQtY29sb3I6ICM0NjQ2NDY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLmFycm93LXJpZ2h0IGxpbmUsIC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5hcnJvdy1sZWZ0IGxpbmUgeyBzdHJva2U6ICNmZmZmZmY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLmFycm93LXJpZ2h0OmhvdmVyLCAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYXJyb3ctbGVmdDpob3ZlciB7IGJhY2tncm91bmQtY29sb3I6ICM2ODY4Njg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLmFycm93LXJpZ2h0OmFjdGl2ZSwgLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLmFycm93LWxlZnQ6YWN0aXZlIHsgYmFja2dyb3VuZC1jb2xvcjogIzkwOTA5MDsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuc21hbGwtYXJyb3ctcmlnaHQgcGF0aCwgLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLnNtYWxsLWFycm93LWJvdHRvbSBwYXRoIHsgZmlsbDogIzkwOTA5MDsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuc21hbGwtYXJyb3ctcmlnaHQ6aG92ZXIgcGF0aCwgLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLnNtYWxsLWFycm93LWJvdHRvbTpob3ZlciBwYXRoIHsgZmlsbDogIzY4Njg2ODsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAubnVtYmVyLCAuYmFzaWMtY29udHJvbGxlcnMuZGFyayBzZWxlY3QsIC5iYXNpYy1jb250cm9sbGVycy5kYXJrIGlucHV0W3R5cGU9dGV4dF0geyBjb2xvcjogI2ZmZmZmZjsgYmFja2dyb3VuZC1jb2xvcjogIzMzMzMzMzsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYnRuIHsgYmFja2dyb3VuZC1jb2xvcjogIzQ2NDY0NjsgY29sb3I6ICNmZmZmZmY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLmJ0bjpob3ZlciB7IGJhY2tncm91bmQtY29sb3I6ICM2ODY4Njg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLmJ0bjphY3RpdmUsIC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5idG4uYWN0aXZlIHsgYmFja2dyb3VuZC1jb2xvcjogIzkwOTA5MDsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyay5zbGlkZXIgLmlubmVyLXdyYXBwZXIgLm51bWJlci13cmFwcGVyIC51bml0IHsgY29sb3I6ICNjZGNkY2Q7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsuZ3JvdXAgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjM2UzZTNlOyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrLmRyYWctYW5kLWRyb3AgLmRyb3Atem9uZSB7IGJvcmRlcjogMXB4IGRvdHRlZCAjNDI0MjQyOyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrLmRyYWctYW5kLWRyb3AgLmRyb3Atem9uZS5kcmFnIHsgYmFja2dyb3VuZC1jb2xvcjogIzQyNDI0MjsgfSBcIjsiLCJpbXBvcnQgeyBuYW1lIH0gZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJztcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9zdHlsZXMtZGVjbGFyYXRpb25zLmpzJztcblxuZXhwb3J0IGNvbnN0IG5zID0gbmFtZS5yZXBsYWNlKCdAaXJjYW0vJywgJycpO1xuXG5jb25zdCBuc0NsYXNzID0gYC4ke25zfWA7XG5sZXQgX2Rpc2FibGVkID0gZmFsc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICBfZGlzYWJsZWQgPSB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0U3R5bGVTaGVldCgpIHtcbiAgaWYgKF9kaXNhYmxlZCkgcmV0dXJuO1xuXG4gIGNvbnN0ICRjc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAkY3NzLnNldEF0dHJpYnV0ZSgnZGF0YS1uYW1lc3BhY2UnLCBucyk7XG4gICRjc3MudHlwZSA9ICd0ZXh0L2Nzcyc7XG5cbiAgaWYgKCRjc3Muc3R5bGVTaGVldClcbiAgICAkY3NzLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHN0eWxlcztcbiAgZWxzZVxuICAgICRjc3MuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3R5bGVzKSk7XG5cbiAgLy8gaW5zZXJ0IGJlZm9yZSBsaW5rIG9yIHN0eWxlcyBpZiBleGlzdHNcbiAgY29uc3QgJGxpbmsgPSBkb2N1bWVudC5oZWFkLnF1ZXJ5U2VsZWN0b3IoJ2xpbmsnKTtcbiAgY29uc3QgJHN0eWxlID0gZG9jdW1lbnQuaGVhZC5xdWVyeVNlbGVjdG9yKCdzdHlsZScpO1xuXG4gIGlmICgkbGluaylcbiAgICBkb2N1bWVudC5oZWFkLmluc2VydEJlZm9yZSgkY3NzLCAkbGluayk7XG4gIGVsc2UgaWYgKCRzdHlsZSlcbiAgICBkb2N1bWVudC5oZWFkLmluc2VydEJlZm9yZSgkY3NzLCAkc3R5bGUpO1xuICBlbHNlXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCgkY3NzKTtcbn1cblxuIiwiaW1wb3J0ICogYXMgY29udHJvbGxlcnMgZnJvbSAnLi4vLi4vLi4vZGlzdC9pbmRleCc7XG5cbmNvbnN0IGRlZmluaXRpb25zID0gW1xuICB7XG4gICAgaWQ6ICd0aXRsZS0wJyxcbiAgICB0eXBlOiAndGl0bGUnLFxuICAgIGxhYmVsOiAnVGl0bGUnLFxuICB9LCB7XG4gICAgaWQ6ICdzbGlkZXItMCcsXG4gICAgdHlwZTogJ3NsaWRlcicsXG4gICAgbGFiZWw6ICdNeSBTbGlkZXInLFxuICAgIHNpemU6ICdsYXJnZScsXG4gICAgbWluOiAwLFxuICAgIG1heDogMTAwMCxcbiAgICBzdGVwOiAxLFxuICAgIGRlZmF1bHQ6IDI1MyxcbiAgfSwge1xuICAgIGlkOiAnZ3JvdXAtMCcsXG4gICAgdHlwZTogJ2dyb3VwJyxcbiAgICBsYWJlbDogJ0dyb3VwJyxcbiAgICBkZWZhdWx0OiAnb3BlbmVkJyxcbiAgICBlbGVtZW50czogW1xuICAgICAge1xuICAgICAgICBpZDogJ251bWJlci0xJyxcbiAgICAgICAgdHlwZTogJ251bWJlci1ib3gnLFxuICAgICAgICBkZWZhdWx0OiAwLjQsXG4gICAgICAgIG1pbjogLTEsXG4gICAgICAgIG1heDogMSxcbiAgICAgICAgc3RlcDogMC4wMSxcbiAgICAgIH0sIHtcbiAgICAgICAgaWQ6ICd0ZXh0LTEnLFxuICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgIGxhYmVsOiAnTXkgVGV4dCcsXG4gICAgICAgIHJlYWRvbmx5OiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdDogJ2RlZmF1bHQgdGV4dCcsXG4gICAgICB9LCB7XG4gICAgICAgIGlkOiAnZ3JvdXAtMScsXG4gICAgICAgIHR5cGU6ICdncm91cCcsXG4gICAgICAgIGxhYmVsOiAnR3JvdXAnLFxuICAgICAgICBkZWZhdWx0OiAnb3BlbmVkJyxcbiAgICAgICAgZWxlbWVudHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogJ251bWJlci0yJyxcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXItYm94JyxcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAuNCxcbiAgICAgICAgICAgIG1pbjogLTEsXG4gICAgICAgICAgICBtYXg6IDEsXG4gICAgICAgICAgICBzdGVwOiAwLjAxLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIF0sXG4gIH0sIHtcbiAgICBpZDogJ3NlbGVjdC0wJyxcbiAgICB0eXBlOiAnc2VsZWN0LWxpc3QnLFxuICAgIG9wdGlvbnM6IFsnMScsICcyJywgJzMnXSxcbiAgICBkZWZhdWx0OiAnMicsXG4gIH1cbl07XG5cbmNvbnN0IGNvbnRyb2xzID0gY29udHJvbGxlcnMuY3JlYXRlKCcjY29udGFpbmVyJywgZGVmaW5pdGlvbnMpO1xuXG4vLyBnZXQgY29tcG9uZW50c1xuY29uc3QgZ3JvdXAwID0gY29udHJvbHMuZ2V0Q29tcG9uZW50KCdncm91cC0wJyk7XG5jb25zdCBudW1iZXIxID0gY29udHJvbHMuZ2V0Q29tcG9uZW50KCdncm91cC0wL251bWJlci0xJyk7XG5jb25zdCBudW1iZXIyID0gY29udHJvbHMuZ2V0Q29tcG9uZW50KCdncm91cC0wL2dyb3VwLTEvbnVtYmVyLTInKTtcblxuLy8gY29uc29sZS5sb2coZ3JvdXAwKTtcbi8vIGNvbnNvbGUubG9nKG51bWJlcjEpO1xuLy8gY29uc29sZS5sb2cobnVtYmVyMik7XG5cbi8vIGFkZCBsaXN0ZW5lcnNcbi8vIGNvbnRyb2xzLmFkZExpc3RlbmVyKCdzbGlkZXItMCcsICh2YWx1ZSkgPT4gY29uc29sZS5sb2codmFsdWUpKTtcbi8vIGNvbnRyb2xzLmFkZExpc3RlbmVyKCdncm91cC0wL251bWJlci0xJywgKHZhbHVlKSA9PiBjb25zb2xlLmxvZyh2YWx1ZSkpO1xuXG4vLyBjb250cm9scy5hZGRMaXN0ZW5lcignZ3JvdXAtMCcsIChpZCwgdmFsdWUpID0+IGNvbnNvbGUubG9nKGlkLCB2YWx1ZSkpO1xuLy8gY29udHJvbHMuYWRkTGlzdGVuZXIoJ2dyb3VwLTAvZ3JvdXAtMScsIChpZCwgdmFsdWUpID0+IGNvbnNvbGUubG9nKGlkLCB2YWx1ZSkpO1xuXG5jb250cm9scy5hZGRMaXN0ZW5lcigoaWQsIHZhbHVlKSA9PiBjb25zb2xlLmxvZyhpZCwgdmFsdWUpKTtcblxuLy8gZ3JvdXAwLmFkZExpc3RlbmVyKCdudW1iZXItMScsICh2YWx1ZSkgPT4gY29uc29sZS5sb2codmFsdWUpKTtcbi8vIGdyb3VwMC5hZGRMaXN0ZW5lcignZ3JvdXAtMScsIChpZCwgdmFsdWUpID0+IGNvbnNvbGUubG9nKGlkLCB2YWx1ZSkpO1xuLy8gZ3JvdXAwLmFkZExpc3RlbmVyKChpZCwgdmFsdWUpID0+IGNvbnNvbGUubG9nKGlkLCB2YWx1ZSkpO1xuIiwiLyoqXG4gKiBAbW9kdWxlIGd1aS1jb21wb25lbnRzXG4gKi9cbmV4cG9ydCB7IGRlZmF1bHQgYXMgU2xpZGVyIH0gZnJvbSAnLi9TbGlkZXInO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBCcmVha3BvaW50IH0gZnJvbSAnLi9CcmVha3BvaW50JztcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJuYW1lXCI6IFwiQGlyY2FtL2Jhc2ljLWNvbnRyb2xsZXJzXCIsXG4gIFwidmVyc2lvblwiOiBcIjEuMC4xXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJTZXQgb2Ygc2ltcGxlIGNvbnRyb2xsZXJzIGZvciByYXBpZCBwcm90b3R5cGluZ1wiLFxuICBcIm1haW5cIjogXCJkaXN0L2luZGV4LmpzXCIsXG4gIFwibGljZW5zZVwiOiBcIkJTRC0zLUNsYXVzZVwiLFxuICBcInN0YW5kYWxvbmVcIjogXCJiYXNpY0NvbnRyb2xsZXJzXCIsXG4gIFwicHVibGlzaENvbmZpZ1wiOiB7XG4gICAgXCJhY2Nlc3NcIjogXCJwdWJsaWNcIlxuICB9LFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiYnVuZGxlXCI6IFwibm9kZSAuL2Jpbi9ydW5uZXIgLS1idW5kbGVcIixcbiAgICBcImRlcGxveVwiOiBcIm5wIC0teW9sb1wiLFxuICAgIFwiZG9jXCI6IFwianNkb2MybWQgLXQgdG1wbC9SRUFETUUuaGJzIHNyYy8qLmpzID4gUkVBRE1FLm1kXCIsXG4gICAgXCJ0cmFuc3BpbGVcIjogXCJub2RlIC4vYmluL3J1bm5lciAtLXRyYW5zcGlsZVwiLFxuICAgIFwidmVyc2lvblwiOiBcIm5wbSBydW4gdHJhbnNwaWxlICYmIG5wbSBydW4gZG9jICYmIGdpdCBhZGQgUkVBRE1FLm1kXCIsXG4gICAgXCJwcmV3YXRjaFwiOiBcIm5wbSBydW4gdHJhbnNwaWxlXCIsXG4gICAgXCJ3YXRjaFwiOiBcIm5vZGUgLi9iaW4vcnVubmVyIC0td2F0Y2hcIlxuICB9LFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2lyY2FtLWpzdG9vbHMvYmFzaWMtY29udHJvbGxlcnMuZ2l0XCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGlyY2FtL2d1aS1jb21wb25lbnRzXCI6IFwiXjEuMC4yXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiYmFiZWwtY29yZVwiOiBcIl42LjI2LjBcIixcbiAgICBcImJhYmVsLXBsdWdpbi10cmFuc2Zvcm0tZXMyMDE1LW1vZHVsZXMtY29tbW9uanNcIjogXCJeNi4yNi4wXCIsXG4gICAgXCJiYWJlbC1wcmVzZXQtZW52XCI6IFwiXjEuNi4xXCIsXG4gICAgXCJicm93c2VyaWZ5XCI6IFwiXjE0LjUuMFwiLFxuICAgIFwiY2hhbGtcIjogXCJeMi4zLjBcIixcbiAgICBcImZzLWV4dHJhXCI6IFwiXjQuMC4zXCIsXG4gICAgXCJqc2RvYy10by1tYXJrZG93blwiOiBcIl4zLjAuMFwiLFxuICAgIFwia2xhd1wiOiBcIl4yLjEuMVwiLFxuICAgIFwibm9kZS1zYXNzXCI6IFwiXjQuNy4yXCIsXG4gICAgXCJucFwiOiBcIl4yLjE4LjJcIixcbiAgICBcInRhcGVcIjogXCJeNC44LjBcIixcbiAgICBcInVnbGlmeS1qc1wiOiBcIl4zLjIuMlwiLFxuICAgIFwid2F0Y2hcIjogXCJeMS4wLjJcIlxuICB9XG59XG4iXX0=
