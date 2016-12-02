(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{"./Slider":1}],3:[function(require,module,exports){
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

/**
 * @module basic-controllers
 */

/**
 * Base class to create new controllers
 */

var BaseController = function () {
  function BaseController(type, defaults, options) {
    _classCallCheck(this, BaseController);

    this.type = type;
    this.params = Object.assign({}, defaults, options);
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
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this.$el = document.createElement('label');
      this.$el.classList.add(styles.ns, theme);

      if (type !== null) this.$el.classList.add(type);

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

},{"../utils/styles":16}],4:[function(require,module,exports){
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

/**
 * @module basic-controllers
 */

var defaults = {
  legend: '&nbsp;',
  defaultState: 'opened',
  container: null
};

/**
 * Create a group of controllers.
 *
 * @param {Object} options - Override default parameters.
 * @param {String} legend -
 */

var Group = function (_BaseController) {
  _inherits(Group, _BaseController);

  function Group(options) {
    _classCallCheck(this, Group);

    var _this = _possibleConstructorReturn(this, (Group.__proto__ || Object.getPrototypeOf(Group)).call(this, type, defaults, options));

    _this._states = ['opened', 'closed'];
    _get(Group.prototype.__proto__ || Object.getPrototypeOf(Group.prototype), 'initialize', _this).call(_this, $container);
    return _this;
  }

  /**
   * State of the group (`'opened'` or `'closed'`).
   *
   * @type {String}
   */


  _createClass(Group, [{
    key: 'render',


    /** @private */
    value: function render() {
      var content = '\n      <div class="group-header">\n        ' + elements.smallArrowRight + '\n        ' + elements.smallArrowBottom + '\n        <span class="legend">' + this.params.legend + '</span>\n      </div>\n      <div class="group-content"></div>\n    ';

      this.$el = _get(Group.prototype.__proto__ || Object.getPrototypeOf(Group.prototype), 'render', this).call(this, this.type);
      this.$el.innerHTML = content;
      this.$el.classList.add(this.params.state);

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
        var state = _this2.params.state === 'closed' ? 'opened' : 'closed';
        _this2.state = state;
      });
    }
  }, {
    key: 'state',
    get: function get() {
      return this.params.state;
    },
    set: function set(value) {
      if (this._states.indexOf(value) === -1) throw new Error('Invalid state "' + value + '"');

      this.$el.classList.remove(this.params.state);
      this.$el.classList.add(value);

      this.params.state = value;
    }
  }]);

  return Group;
}(_BaseController3.default);

exports.default = Group;

},{"../utils/elements":14,"./BaseController":3}],5:[function(require,module,exports){
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

/**
 * @module basic-controllers
 */

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
 * Number Box
 *
 * @param {Object} options - Override default options.
 * @param {String} label - Label of the controller.
 * @param {Number} [min=0] - Minimum value.
 * @param {Number} [max=1] - Maximum value.
 * @param {Number} [step=0.01] - Step between consecutive values.
 * @param {Number} [default=0] - Default value.
 * @param {Number} [container=null] - Container of the controller.
 * @param {Number} [callback=null] - Callback to be executed when the value changes.
 */

var NumberBox = function (_BaseController) {
  _inherits(NumberBox, _BaseController);

  // legend, min = 0, max = 1, step = 0.01, defaultValue = 0, $container = null, callback = null
  function NumberBox(options) {
    _classCallCheck(this, NumberBox);

    var _this = _possibleConstructorReturn(this, (NumberBox.__proto__ || Object.getPrototypeOf(NumberBox)).call(this, 'number-box', defaults, options));

    _this._value = _this.params.default;
    _this._isIntStep = _this.params.step % 1 === 0;

    _get(NumberBox.prototype.__proto__ || Object.getPrototypeOf(NumberBox.prototype), 'initialize', _this).call(_this);
    return _this;
  }

  _createClass(NumberBox, [{
    key: 'render',
    value: function render() {
      var _params = this.params,
          label = _params.label,
          min = _params.min,
          max = _params.max,
          step = _params.step;

      console.log(this._value);
      var content = '\n      <span class="label">' + label + '</span>\n      <div class="inner-wrapper">\n        ' + elements.arrowLeft + '\n        <input class="number" type="number" min="' + min + '" max="' + max + '" step="' + step + '" value="' + this._value + '" />\n        ' + elements.arrowRight + '\n      </div>\n    ';

      this.$el = _get(NumberBox.prototype.__proto__ || Object.getPrototypeOf(NumberBox.prototype), 'render', this).call(this, this.type);
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

},{"../utils/elements":14,"./BaseController":3}],6:[function(require,module,exports){
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

var SelectButtons = function (_BaseController) {
  _inherits(SelectButtons, _BaseController);

  function SelectButtons(legend, options, defaultValue) {
    var $container = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var callback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    _classCallCheck(this, SelectButtons);

    var _this = _possibleConstructorReturn(this, (SelectButtons.__proto__ || Object.getPrototypeOf(SelectButtons)).call(this));

    _this.type = 'select-buttons';
    _this.legend = legend; // non breakable space to keep rendering consistency
    _this.options = options;
    _this._value = defaultValue;
    var currentIndex = _this.options.indexOf(_this._value);
    _this._currentIndex = currentIndex === -1 ? 0 : currentIndex;
    _this._maxIndex = _this.options.length - 1;

    _get(SelectButtons.prototype.__proto__ || Object.getPrototypeOf(SelectButtons.prototype), '_applyOptionnalParameters', _this).call(_this, $container, callback);
    return _this;
  }

  _createClass(SelectButtons, [{
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        ' + elements.arrowLeft + '\n        ' + this.options.map(function (option, index) {
        return '\n            <a href="#" class="btn" data-index="' + index + '" data-value="' + option + '">\n              ' + option + '\n            </a>';
      }).join('') + '\n        ' + elements.arrowRight + '\n      </div>\n    ';

      this.$el = _get(SelectButtons.prototype.__proto__ || Object.getPrototypeOf(SelectButtons.prototype), 'render', this).call(this, this.type);
      this.$el.innerHTML = content;

      this.$prev = this.$el.querySelector('.arrow-left');
      this.$next = this.$el.querySelector('.arrow-right');
      this.$btns = Array.from(this.$el.querySelectorAll('.btn'));
      this._highlightBtn(this._currentIndex);

      this.bindEvents();
      return this.$el;
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this2 = this;

      this.$prev.addEventListener('click', function () {
        var index = _this2._currentIndex - 1;
        _this2.propagate(index);
      });

      this.$next.addEventListener('click', function () {
        var index = _this2._currentIndex + 1;
        _this2.propagate(index);
      });

      this.$btns.forEach(function ($btn, index) {
        $btn.addEventListener('click', function (e) {
          e.preventDefault();
          _this2.propagate(index);
        });
      });
    }
  }, {
    key: 'propagate',
    value: function propagate(index) {
      if (index < 0 || index > this._maxIndex) return;

      this._currentIndex = index;
      this._value = this.options[index];
      this._highlightBtn(this._currentIndex);

      this._executeListeners(this._value);
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
    set: function set(value) {
      var index = this.options.indexOf(value);

      if (index !== -1) {
        this._value = value;
        this._currentIndex = index;
        this._highlightBtn(this._currentIndex);
      }
    }
  }]);

  return SelectButtons;
}(_BaseController3.default);

exports.default = SelectButtons;

},{"../utils/elements":14,"./BaseController":3}],7:[function(require,module,exports){
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

var SelectList = function (_BaseController) {
  _inherits(SelectList, _BaseController);

  function SelectList(legend, options, defaultValue) {
    var $container = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var callback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    _classCallCheck(this, SelectList);

    var _this = _possibleConstructorReturn(this, (SelectList.__proto__ || Object.getPrototypeOf(SelectList)).call(this));

    _this.type = 'select-list';
    _this.legend = legend;
    _this.options = options;
    _this._value = defaultValue;
    var currentIndex = _this.options.indexOf(_this._value);
    _this._currentIndex = currentIndex === -1 ? 0 : currentIndex;
    _this._maxIndex = _this.options.length - 1;

    _get(SelectList.prototype.__proto__ || Object.getPrototypeOf(SelectList.prototype), '_applyOptionnalParameters', _this).call(_this, $container, callback);
    return _this;
  }

  _createClass(SelectList, [{
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        ' + elements.arrowLeft + '\n        <select>\n        ' + this.options.map(function (option, index) {
        return '<option value="' + option + '">' + option + '</option>';
      }).join('') + '\n        <select>\n        ' + elements.arrowRight + '\n      </div>\n    ';

      this.$el = _get(SelectList.prototype.__proto__ || Object.getPrototypeOf(SelectList.prototype), 'render', this).call(this, this.type);
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
      var _this2 = this;

      this.$prev.addEventListener('click', function () {
        var index = _this2._currentIndex - 1;
        _this2.propagate(index);
      }, false);

      this.$next.addEventListener('click', function () {
        var index = _this2._currentIndex + 1;
        _this2.propagate(index);
      }, false);

      this.$select.addEventListener('change', function () {
        var value = _this2.$select.value;
        var index = _this2.options.indexOf(value);
        _this2.propagate(index);
      });
    }
  }, {
    key: 'propagate',
    value: function propagate(index) {
      if (index < 0 || index > this._maxIndex) return;

      console.log(index);
      var value = this.options[index];
      this._currentIndex = index;
      this._value = value;
      this.$select.value = value;

      this._executeListeners(this._value);
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
}(_BaseController3.default);

exports.default = SelectList;

},{"../utils/elements":14,"./BaseController":3}],8:[function(require,module,exports){
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

var Slider = function (_BaseController) {
  _inherits(Slider, _BaseController);

  function Slider(legend) {
    var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var step = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.01;
    var defaultValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var unit = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';
    var size = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'default';
    var $container = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
    var callback = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : null;

    _classCallCheck(this, Slider);

    var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this));

    _this.type = 'slider';
    _this.legend = legend;
    _this.min = min;
    _this.max = max;
    _this.step = step;
    _this.unit = unit;
    _this.size = size;
    _this._value = defaultValue;

    _this._onSliderChange = _this._onSliderChange.bind(_this);

    _get(Slider.prototype.__proto__ || Object.getPrototypeOf(Slider.prototype), '_applyOptionnalParameters', _this).call(_this, $container, callback);
    return _this;
  }

  _createClass(Slider, [{
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        <div class="range"></div>\n        <div class="number-wrapper">\n          <input type="number" class="number" min="' + this.min + '" max="' + this.max + '" step="' + this.step + '" value="' + this.value + '" />\n          <span class="unit">' + this.unit + '</span>\n        </div>\n      </div>';

      this.$el = _get(Slider.prototype.__proto__ || Object.getPrototypeOf(Slider.prototype), 'render', this).call(this, this.type);
      this.$el.innerHTML = content;
      this.$el.classList.add('slider-' + this.size);

      this.$range = this.$el.querySelector('.range');
      this.$number = this.$el.querySelector('input[type="number"]');

      this.slider = new guiComponents.Slider({
        container: this.$range,
        callback: this._onSliderChange,
        min: this.min,
        max: this.max,
        step: this.step,
        default: this.value,
        foregroundColor: '#ababab'
      });

      this.bindEvents();

      return this.$el;
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this2 = this;

      this.$number.addEventListener('change', function () {
        var value = parseFloat(_this2.$number.value);
        _this2.slider.value = value;
        _this2._value = value;

        _this2._executeListeners(_this2._value);
      }, false);
    }
  }, {
    key: 'onResize',
    value: function onResize() {
      _get(Slider.prototype.__proto__ || Object.getPrototypeOf(Slider.prototype), 'onResize', this).call(this);

      var _$range$getBoundingCl = this.$range.getBoundingClientRect(),
          width = _$range$getBoundingCl.width,
          height = _$range$getBoundingCl.height;

      this.slider.resize(width, height);
    }
  }, {
    key: '_onSliderChange',
    value: function _onSliderChange(value) {
      this.$number.value = value;
      this._value = value;

      this._executeListeners(this._value);
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
}(_BaseController3.default);

exports.default = Slider;

},{"./BaseController":3,"gui-components":2}],9:[function(require,module,exports){
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

/**
 * Display a value, Read-only.
 */
var Text = function (_BaseController) {
  _inherits(Text, _BaseController);

  function Text(legend, defaultValue) {
    var readonly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var $container = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var callback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    _classCallCheck(this, Text);

    var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this));

    _this.type = 'text';
    _this.legend = legend;
    _this._readonly = readonly;
    _this._value = defaultValue;

    _this._applyOptionnalParameters($container, callback);
    return _this;
  }

  _createClass(Text, [{
    key: 'render',
    value: function render() {
      var readonly = this._readonly ? 'readonly' : '';
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        <input class="text" type="text" value="' + this._value + '" ' + readonly + ' />\n      </div>\n    ';

      this.$el = _get(Text.prototype.__proto__ || Object.getPrototypeOf(Text.prototype), 'render', this).call(this, this.type);
      this.$el.innerHTML = content;

      this.$input = this.$el.querySelector('.text');

      this.bindEvents();

      return this.$el;
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this2 = this;

      this.$input.addEventListener('keyup', function () {
        _this2._value = _this2.$input.value;
        _this2._executeListeners(_this2._value);
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

},{"./BaseController":3}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseController2 = require('./BaseController');

var _BaseController3 = _interopRequireDefault(_BaseController2);

var _styles = require('../utils/styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Title = function (_BaseController) {
  _inherits(Title, _BaseController);

  function Title(legend) {
    var $container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, Title);

    var _this = _possibleConstructorReturn(this, (Title.__proto__ || Object.getPrototypeOf(Title)).call(this));

    _this.type = 'title';
    _this.legend = legend;

    _get(Title.prototype.__proto__ || Object.getPrototypeOf(Title.prototype), '_applyOptionnalParameters', _this).call(_this, $container);
    return _this;
  }

  _createClass(Title, [{
    key: 'render',
    value: function render() {
      var content = '<span class="legend">' + this.legend + '</span>';

      this.$el = _get(Title.prototype.__proto__ || Object.getPrototypeOf(Title.prototype), 'render', this).call(this, this.type);
      this.$el.innerHTML = content;

      return this.$el;
    }
  }]);

  return Title;
}(_BaseController3.default);

exports.default = Title;

},{"../utils/styles":16,"./BaseController":3}],11:[function(require,module,exports){
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

var Toggle = function (_BaseController) {
  _inherits(Toggle, _BaseController);

  function Toggle(legend) {
    var active = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var $container = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    _classCallCheck(this, Toggle);

    var _this = _possibleConstructorReturn(this, (Toggle.__proto__ || Object.getPrototypeOf(Toggle)).call(this));

    _this.type = 'toggle';
    _this.legend = legend;
    _this._active = active;

    _get(Toggle.prototype.__proto__ || Object.getPrototypeOf(Toggle.prototype), '_applyOptionnalParameters', _this).call(_this, $container, callback);
    return _this;
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

      this.$el = _get(Toggle.prototype.__proto__ || Object.getPrototypeOf(Toggle.prototype), 'render', this).call(this, this.type);
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
      var _this2 = this;

      this.$toggle.addEventListener('click', function (e) {
        e.preventDefault();

        _this2.active = !_this2.active;
        _this2._executeListeners(_this2._active);
      });
    }
  }, {
    key: 'value',
    set: function set(bool) {
      this.active = bool;
    },
    get: function get() {
      return this._value;
    }

    // alias value

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

},{"../utils/elements":14,"./BaseController":3}],12:[function(require,module,exports){
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

var TriggerButtons = function (_BaseController) {
  _inherits(TriggerButtons, _BaseController);

  function TriggerButtons(legend, labels) {
    var $container = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    _classCallCheck(this, TriggerButtons);

    var _this = _possibleConstructorReturn(this, (TriggerButtons.__proto__ || Object.getPrototypeOf(TriggerButtons)).call(this));

    _this.type = 'buttons';
    _this.legend = legend || '&nbsp'; // non breakable space to keep rendering consistency
    _this.labels = labels;
    _this._index = null;
    _this._value = null;

    _get(TriggerButtons.prototype.__proto__ || Object.getPrototypeOf(TriggerButtons.prototype), '_applyOptionnalParameters', _this).call(_this, $container, callback);
    return _this;
  }

  /**
   * Last triggered label
   * @type {String}
   */


  _createClass(TriggerButtons, [{
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        ' + this.labels.map(function (label, index) {
        return '\n            <a href="#" class="btn">\n              ' + label + '\n            </a>';
      }).join('') + '\n      </div>';

      this.$el = _get(TriggerButtons.prototype.__proto__ || Object.getPrototypeOf(TriggerButtons.prototype), 'render', this).call(this, this.type);
      this.$el.innerHTML = content;

      this.$buttons = Array.from(this.$el.querySelectorAll('.btn'));
      this.bindEvents();

      return this.$el;
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this2 = this;

      this.$buttons.forEach(function ($btn, index) {
        var label = _this2.labels[index];

        $btn.addEventListener('click', function (e) {
          e.preventDefault();

          _this2._value = label;
          _this2._executeListeners(label, index);
        });
      });
    }
  }, {
    key: 'value',
    get: function get() {
      return this._value;
    }
  }]);

  return TriggerButtons;
}(_BaseController3.default);

exports.default = TriggerButtons;

},{"./BaseController":3}],13:[function(require,module,exports){
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

},{"./components/BaseController":3,"./components/Group":4,"./components/NumberBox":5,"./components/SelectButtons":6,"./components/SelectList":7,"./components/Slider":8,"./components/Text":9,"./components/Title":10,"./components/Toggle":11,"./components/TriggerButtons":12,"./utils/styles":16}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var toggle = exports.toggle = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"toggle-element\" version=\"1.1\" viewBox=\"0 0 50 50\" preserveAspectRatio=\"none\">\n      <g class=\"x\">\n        <line x1=\"8\" y1=\"8\" x2=\"42\" y2=\"42\" stroke=\"white\" />\n        <line x1=\"8\" y1=\"42\" x2=\"42\" y2=\"8\" stroke=\"white\" />\n      </g>\n  </svg>\n";

var arrowRight = exports.arrowRight = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"arrow-right\" version=\"1.1\" viewBox=\"0 0 50 50\" preserveAspectRatio=\"none\">\n    <line x1=\"10\" y1=\"10\" x2=\"40\" y2=\"25\" />\n    <line x1=\"10\" y1=\"40\" x2=\"40\" y2=\"25\" />\n  </svg>\n";

var arrowLeft = exports.arrowLeft = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"arrow-left\" version=\"1.1\" viewBox=\"0 0 50 50\" preserveAspectRatio=\"none\">\n    <line x1=\"40\" y1=\"10\" x2=\"10\" y2=\"25\" />\n    <line x1=\"40\" y1=\"40\" x2=\"10\" y2=\"25\" />\n  </svg>\n";

var smallArrowRight = exports.smallArrowRight = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"small-arrow-right\" viewBox=\"0 0 50 50\">\n    <path d=\"M 20 15 L 35 25 L 20 35 Z\" />\n  </svg>\n";

var smallArrowBottom = exports.smallArrowBottom = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"small-arrow-bottom\" viewBox=\"0 0 50 50\">\n    <path d=\"M 15 17 L 35 17 L 25 32 Z\" />\n  </svg>\n";

},{}],15:[function(require,module,exports){
module.exports = " .basic-controllers { } .basic-controllers { width: 100%; max-width: 800px; height: 34px; padding: 3px; margin: 4px auto; background-color: #efefef; border: 1px solid #aaaaaa; box-sizing: border-box; border-radius: 2px; display: block; color: #464646; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .basic-controllers .label { font: italic normal 1.2em Quicksand, arial, sans-serif; line-height: 26px; overflow: hidden; text-align: right; padding: 0 8px 0 0; display: block; box-sizing: border-box; width: 24%; float: left; white-space: nowrap; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none; user-select: none; } .basic-controllers .inner-wrapper { display: -webkit-inline-flex; display: inline-flex; -webkit-flex-wrap: no-wrap; flex-wrap: no-wrap; width: 76%; float: left; } .basic-controllers.small { height: 48px; } .basic-controllers.small:not(.align-small) { height: auto; } .basic-controllers.small:not(.align-small) .label { width: 100%; float: none; text-align: left; line-height: 40px; } .basic-controllers.small:not(.align-small) .inner-wrapper { width: 100%; float: none; } .basic-controllers.small.align-small .label { display: block; margin-right: 20px; text-align: left; line-height: 40px; } .basic-controllers.small.align-small .inner-wrapper { display: inline-block; width: auto; } .basic-controllers .arrow-right, .basic-controllers .arrow-left { border-radius: 2px; width: 14px; height: 26px; cursor: pointer; background-color: #464646; } .basic-controllers .arrow-right line, .basic-controllers .arrow-left line { stroke-width: 3px; stroke: #ffffff; } .basic-controllers .arrow-right:hover, .basic-controllers .arrow-left:hover { background-color: #686868; } .basic-controllers .arrow-right:active, .basic-controllers .arrow-left:active { background-color: #909090; } .basic-controllers .small-arrow-right, .basic-controllers .small-arrow-bottom { width: 26px; height: 26px; cursor: pointer; } .basic-controllers .small-arrow-right path, .basic-controllers .small-arrow-bottom path { fill: #909090; } .basic-controllers .small-arrow-right:hover path, .basic-controllers .small-arrow-bottom:hover path { fill: #686868; } .basic-controllers .toggle-element { width: 26px; height: 26px; border-radius: 2px; background-color: #464646; cursor: pointer; } .basic-controllers .toggle-element:hover { background-color: #686868; } .basic-controllers .toggle-element line { stroke-width: 3px; } .basic-controllers .toggle-element .x { display: none; } .basic-controllers .toggle-element.active .x { display: block; } .basic-controllers .btn { display: block; text-align: center; font: normal normal 12px arial; text-decoration: none; height: 26px; line-height: 26px; background-color: #464646; border: none; color: #ffffff; margin: 0 4px 0 0; padding: 0; box-sizing: border-box; border-radius: 2px; cursor: pointer; -webkit-flex-grow: 1; flex-grow: 1; } .basic-controllers .btn:last-child { margin: 0; } .basic-controllers .btn:hover { background-color: #686868; } .basic-controllers .btn:active, .basic-controllers .btn.active { background-color: #909090; } .basic-controllers .btn:focus { outline: none; } .basic-controllers .number { height: 26px; display: inline-block; position: relative; font: normal normal 1.2em Quicksand, arial, sans-serif; vertical-align: top; border: none; background: none; color: #464646; padding: 0 4px; margin: 0; background-color: #f9f9f9; border-radius: 2px; box-sizing: border-box; } .basic-controllers .number:focus { outline: none; } .basic-controllers select { height: 26px; line-height: 26px; background-color: #f9f9f9; border-radius: 2px; border: none; vertical-align: top; padding: 0; margin: 0; } .basic-controllers select:focus { outline: none; } .basic-controllers input[type=text] { width: 100%; height: 26px; line-height: 26px; border: 0; padding: 0 4px; background-color: #f9f9f9; border-radius: 2px; color: #565656; } .basic-controllers.small .arrow-right, .basic-controllers.small .arrow-left { width: 24px; height: 40px; } .basic-controllers.small .toggle-element { width: 40px; height: 40px; } .basic-controllers.small .btn { height: 40px; line-height: 40px; } .basic-controllers.small .number { height: 40px; } .basic-controllers.small select { height: 40px; line-height: 40px; } .basic-controllers.small input[type=text] { height: 40px; line-height: 40px; } .basic-controllers.title { border: none !important; margin-bottom: 0; margin-top: 8px; padding-top: 8px; padding-bottom: 0; background-color: transparent !important; height: 25px; } .basic-controllers.title .label { font: normal bold 1.3em Quicksand, arial, sans-serif; height: 100%; overflow: hidden; text-align: left; padding: 0; width: 100%; box-sizing: border-box; -webkit-flex-grow: 1; flex-grow: 1; } .basic-controllers.group { height: auto; background-color: white; } .basic-controllers.group .group-header .label { font: normal bold 1.3em Quicksand, arial, sans-serif; height: 26px; line-height: 26px; overflow: hidden; text-align: left; padding: 0 0 0 36px; width: 100%; box-sizing: border-box; -webkit-flex-grow: 1; flex-grow: 1; float: none; cursor: pointer; } .basic-controllers.group .group-header .small-arrow-right { width: 26px; height: 26px; position: absolute; } .basic-controllers.group .group-header .small-arrow-bottom { width: 26px; height: 26px; position: absolute; } .basic-controllers.group .group-content { overflow: hidden; } .basic-controllers.group .group-content label:last-child { margin-bottom: 0; } .basic-controllers.group.opened .group-header .small-arrow-right { display: none; } .basic-controllers.group.opened .group-header .small-arrow-bottom { display: block; } .basic-controllers.group.opened .group-content { height: auto; } .basic-controllers.group.closed .group-header .small-arrow-right { display: block; } .basic-controllers.group.closed .group-header .small-arrow-bottom { display: none; } .basic-controllers.group.closed .group-content { height: 0; } .basic-controllers.slider .range { height: 26px; display: inline-block; margin: 0; -webkit-flex-grow: 4; flex-grow: 4; position: relative; } .basic-controllers.slider .range canvas { position: absolute; top: 0; left: 0; } .basic-controllers.slider .number-wrapper { display: inline; height: 26px; text-align: right; -webkit-flex-grow: 3; flex-grow: 3; } .basic-controllers.slider .number-wrapper .number { left: 5px; width: 54px; text-align: right; } .basic-controllers.slider .number-wrapper .unit { font: italic normal 1em Quicksand, arial, sans-serif; line-height: 26px; height: 26px; width: 30px; display: inline-block; position: relative; padding-left: 5px; padding-right: 5px; color: #565656; } .basic-controllers.slider .number-wrapper .unit sup { line-height: 7px; } .basic-controllers.slider.slider-large .range { -webkit-flex-grow: 50; flex-grow: 50; } .basic-controllers.slider.slider-large .number-wrapper { -webkit-flex-grow: 1; flex-grow: 1; } .basic-controllers.slider.slider-small .range { -webkit-flex-grow: 2; flex-grow: 2; } .basic-controllers.slider.slider-small .number-wrapper { -webkit-flex-grow: 4; flex-grow: 4; } .basic-controllers.number-box .number { width: 120px; margin: 0 10px; vertical-align: top; } .basic-controllers.select-list select { margin: 0 10px; width: 120px; font: normal normal 1.2em Quicksand, arial, sans-serif; color: #464646; } .basic-controllers.select-buttons .btn:first-of-type { margin-left: 4px; } .basic-controllers.text input[type=text] { font: normal normal 1.2em Quicksand, arial, sans-serif; color: #464646; } .basic-controllers.small.slider .range { height: 40px; } .basic-controllers.small.slider .number-wrapper { height: 40px; } .basic-controllers.small.slider .number-wrapper .unit { line-height: 40px; height: 40px; } .basic-controllers.grey { background-color: #363636; border: 1px solid #585858; color: rgba(255, 255, 255, 0.95); } .basic-controllers.grey .toggle-element { background-color: #efefef; } .basic-controllers.grey .toggle-element line { stroke: #363636; } .basic-controllers.grey .toggle-element:hover { background-color: #cdcdcd; } .basic-controllers.grey .arrow-right, .basic-controllers.grey .arrow-left { background-color: #efefef; } .basic-controllers.grey .arrow-right line, .basic-controllers.grey .arrow-left line { stroke: #363636; } .basic-controllers.grey .arrow-right:hover, .basic-controllers.grey .arrow-left:hover { background-color: #cdcdcd; } .basic-controllers.grey .arrow-right:active, .basic-controllers.grey .arrow-left:active { background-color: #ababab; } .basic-controllers.grey .small-arrow-right path, .basic-controllers.grey .small-arrow-bottom path { fill: #ababab; } .basic-controllers.grey .small-arrow-right:hover path, .basic-controllers.grey .small-arrow-bottom:hover path { fill: #cdcdcd; } .basic-controllers.grey .number, .basic-controllers.grey select, .basic-controllers.grey input[type=text] { color: rgba(255, 255, 255, 0.95); background-color: #454545; } .basic-controllers.grey .btn { background-color: #efefef; color: #363636; } .basic-controllers.grey .btn:hover { background-color: #cdcdcd; } .basic-controllers.grey .btn:active, .basic-controllers.grey .btn.active { background-color: #ababab; } .basic-controllers.grey.slider .inner-wrapper .number-wrapper .unit { color: #bcbcbc; } .basic-controllers.grey.group { background-color: #505050; } .basic-controllers.dark { background-color: #242424; border: 1px solid #282828; color: #ffffff; } .basic-controllers.dark .toggle-element { background-color: #464646; } .basic-controllers.dark .toggle-element line { stroke: #ffffff; } .basic-controllers.dark .toggle-element:hover { background-color: #686868; } .basic-controllers.dark .arrow-right, .basic-controllers.dark .arrow-left { background-color: #464646; } .basic-controllers.dark .arrow-right line, .basic-controllers.dark .arrow-left line { stroke: #ffffff; } .basic-controllers.dark .arrow-right:hover, .basic-controllers.dark .arrow-left:hover { background-color: #686868; } .basic-controllers.dark .arrow-right:active, .basic-controllers.dark .arrow-left:active { background-color: #909090; } .basic-controllers.dark .small-arrow-right path, .basic-controllers.dark .small-arrow-bottom path { fill: #909090; } .basic-controllers.dark .small-arrow-right:hover path, .basic-controllers.dark .small-arrow-bottom:hover path { fill: #686868; } .basic-controllers.dark .number, .basic-controllers.dark select, .basic-controllers.dark input[type=text] { color: #ffffff; background-color: #333333; } .basic-controllers.dark .btn { background-color: #464646; color: #ffffff; } .basic-controllers.dark .btn:hover { background-color: #686868; } .basic-controllers.dark .btn:active, .basic-controllers.dark .btn.active { background-color: #909090; } .basic-controllers.dark.slider .inner-wrapper .number-wrapper .unit { color: #cdcdcd; } .basic-controllers.dark.group { background-color: #3e3e3e; } ";
},{}],16:[function(require,module,exports){
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

},{"../../package.json":18,"./styles-declarations.js":15}],17:[function(require,module,exports){
'use strict';

var _index = require('../../../dist/index');

var controllers = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// components
// const title1 = new controllers.Title('Title', '#container');

// const triggerButtons = new controllers.TriggerButtons('TriggerButtons', ['light', 'grey', 'dark'], '#container', function(theme) {
//   console.log('Button =>', theme);
//   controllers.setTheme(theme);

//   switch (theme) {
//     case 'light':
//       document.body.style.backgroundColor = '#ffffff';
//       break;
//     case 'grey':
//       document.body.style.backgroundColor = '#000000';
//       break;
//     case 'dark':
//       document.body.style.backgroundColor = '#000000';
//       break;
//   }
// });

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

// const toggle = new controllers.Toggle('Toggle', false, '#container', function(active) {
//   console.log('Toggle =>', active);

//   if (active)
//     numberBox.value = 0;
// });

// const info = new controllers.Text('Info', 'read-only value', true, '#container');

// const text = new controllers.Text('Text', 'changable value', false,  '#container', (value) => {
//   console.log('Text =>', value);
//   info.value = value;
// });

// const selectList = new controllers.SelectList('SelectList', ['standby', 'run', 'end'], 'run', '#container', function(value) {
//   console.log('SelectList =>', value);

//   info.value = value;
//   selectButtons.value = value;
// });

// const selectButtons = new controllers.SelectButtons('SelectButtons', ['standby', 'run', 'end'], 'run', '#container', function(value) {
//   console.log('SelectButtons =>', value);

//   info.value = value;
//   selectList.value = value;
// });

// // group
// const group = new controllers.Group('Group', 'opened', '#container');

// const groupSlider = new controllers.Slider('Group Slider', 20, 1000, 1, 200, 'Hz', 'large', group, function(value) {
//   console.log('Group - Slider =>', value);
// });

// const groupText = new controllers.Text('Group Text', 'text input', false,  group, (value) => {
//   console.log('Group - Text =>', value);
//   info.value = value;
// });

// // sliders
// const title2 = new controllers.Title('Sliders', '#container');

// const sliderLarge = new controllers.Slider('Slider (large)', 20, 1000, 1, 537, 'Hz', 'large', '#container', function(value) {
//   console.log('Slider (large) =>', value);
// });

// const sliderDefault = new controllers.Slider('Slider (default / medium)', 20, 1000, 1, 225, 'm.s<sup>-1</sup>', 'default', '#container', function(value) {
//   console.log('Slider (default) =>', value);
// });

// const sliderSmall = new controllers.Slider('Slider (small)', 20, 1000, 1, 660, '', 'small', '#container', function(value) {
//   console.log('Slider (small) =>', value);
// });

},{"../../../dist/index":13}],18:[function(require,module,exports){
module.exports={
  "name": "basic-controllers",
  "version": "0.6.2",
  "description": "Set of simple controllers for rapid prototyping",
  "main": "dist/index.js",
  "scripts": {
    "doc": "jsdoc2md -t tmpl/README.hbs --separators src/**/*.js src/*.js > README-test.md",
    "transpile": "node ./bin/runner --transpile",
    "prewatch": "node ./bin/runner --transpile",
    "watch": "node ./bin/runner --watch"
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
    "babel-runtime": "^6.18.0",
    "gui-components": "^1.0.0",
    "jsdoc-to-markdown": "^2.0.1",
    "parameters": "ircam-jstools/parameters"
  },
  "devDependencies": {
    "babel-core": "^6.18.2",
    "babel-plugin-transform-es2015-modules-commonjs": "^6.18.0",
    "babel-plugin-transform-runtime": "^6.15.0",
    "babel-preset-es2015": "^6.18.0",
    "colors": "^1.1.2",
    "fs-extra": "^1.0.0",
    "node-sass": "^3.13.0",
    "watch": "^1.0.1"
  }
}

},{}]},{},[17])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLi8uLi8uLi8uLi9pcmNhbS1qc3Rvb2xzL2d1aS1jb21wb25lbnRzL2Rpc3QvU2xpZGVyLmpzIiwiLi4vLi4vLi4vLi4vLi4vaXJjYW0tanN0b29scy9ndWktY29tcG9uZW50cy9kaXN0L2luZGV4LmpzIiwiLi4vLi4vZGlzdC9jb21wb25lbnRzL0Jhc2VDb250cm9sbGVyLmpzIiwiLi4vLi4vZGlzdC9jb21wb25lbnRzL0dyb3VwLmpzIiwiLi4vLi4vZGlzdC9jb21wb25lbnRzL051bWJlckJveC5qcyIsIi4uLy4uL2Rpc3QvY29tcG9uZW50cy9TZWxlY3RCdXR0b25zLmpzIiwiLi4vLi4vZGlzdC9jb21wb25lbnRzL1NlbGVjdExpc3QuanMiLCIuLi8uLi9kaXN0L2NvbXBvbmVudHMvU2xpZGVyLmpzIiwiLi4vLi4vZGlzdC9jb21wb25lbnRzL1RleHQuanMiLCIuLi8uLi9kaXN0L2NvbXBvbmVudHMvVGl0bGUuanMiLCIuLi8uLi9kaXN0L2NvbXBvbmVudHMvVG9nZ2xlLmpzIiwiLi4vLi4vZGlzdC9jb21wb25lbnRzL1RyaWdnZXJCdXR0b25zLmpzIiwiLi4vLi4vZGlzdC9pbmRleC5qcyIsIi4uLy4uL2Rpc3QvdXRpbHMvZWxlbWVudHMuanMiLCIuLi8uLi9kaXN0L3V0aWxzL3N0eWxlcy1kZWNsYXJhdGlvbnMuanMiLCIuLi8uLi9kaXN0L3V0aWxzL3N0eWxlcy5qcyIsImRpc3QvaW5kZXguanMiLCIuLi8uLi9wYWNrYWdlLmpzb24iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FDQUEsU0FBUyxRQUFULENBQWtCLE1BQWxCLEVBQTBCLEtBQTFCLEVBQWlDO0FBQy9CLE1BQU0sUUFBUSxDQUFDLE1BQU0sQ0FBTixJQUFXLE1BQU0sQ0FBTixDQUFaLEtBQXlCLE9BQU8sQ0FBUCxJQUFZLE9BQU8sQ0FB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QUFqQyxFQURHLEtBR0gsU0FBUyxJQUFULENBQWMsV0FBZCxDQUEwQixJQUExQjtBQUNIOzs7OztBQ2xDRDs7SUFBWSxXOzs7O0FBRVo7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQU0sWUFBWSxJQUFJLFlBQVksU0FBaEIsQ0FBMEI7QUFDMUMsU0FBTyxXQURtQztBQUUxQyxPQUFLLENBRnFDO0FBRzFDLE9BQUssRUFIcUM7QUFJMUMsUUFBTSxHQUpvQztBQUsxQyxXQUFTLENBTGlDO0FBTTFDLGFBQVcsWUFOK0I7QUFPMUMsWUFBVSxrQkFBQyxLQUFEO0FBQUEsV0FBVyxRQUFRLEdBQVIsQ0FBWSxXQUFaLEVBQXlCLEtBQXpCLENBQVg7QUFBQTtBQVBnQyxDQUExQixDQUFsQjs7QUFVQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZnVuY3Rpb24gZ2V0U2NhbGUoZG9tYWluLCByYW5nZSkge1xuICBjb25zdCBzbG9wZSA9IChyYW5nZVsxXSAtIHJhbmdlWzBdKSAvIChkb21haW5bMV0gLSBkb21haW5bMF0pO1xuICBjb25zdCBpbnRlcmNlcHQgPSByYW5nZVswXSAtIHNsb3BlICogZG9tYWluWzBdO1xuXG4gIGZ1bmN0aW9uIHNjYWxlKHZhbCkge1xuICAgIHJldHVybiBzbG9wZSAqIHZhbCArIGludGVyY2VwdDtcbiAgfVxuXG4gIHNjYWxlLmludmVydCA9IGZ1bmN0aW9uKHZhbCkge1xuICAgIHJldHVybiAodmFsIC0gaW50ZXJjZXB0KSAvIHNsb3BlO1xuICB9XG5cbiAgcmV0dXJuIHNjYWxlO1xufVxuXG5mdW5jdGlvbiBnZXRDbGlwcGVyKG1pbiwgbWF4LCBzdGVwKSB7XG4gIHJldHVybiAodmFsKSA9PiB7XG4gICAgY29uc3QgY2xpcHBlZFZhbHVlID0gTWF0aC5yb3VuZCh2YWwgLyBzdGVwKSAqIHN0ZXA7XG4gICAgY29uc3QgZml4ZWQgPSBNYXRoLm1heChNYXRoLmxvZzEwKDEgLyBzdGVwKSwgMCk7XG4gICAgY29uc3QgZml4ZWRWYWx1ZSA9IGNsaXBwZWRWYWx1ZS50b0ZpeGVkKGZpeGVkKTsgLy8gZml4IGZsb2F0aW5nIHBvaW50IGVycm9yc1xuICAgIHJldHVybiBNYXRoLm1pbihtYXgsIE1hdGgubWF4KG1pbiwgcGFyc2VGbG9hdChmaXhlZFZhbHVlKSkpO1xuICB9XG59XG5cbi8qKlxuICogQG1vZHVsZSBndWktY29tcG9uZW50c1xuICovXG5cbi8qKlxuICogVmVyc2F0aWxlIGNhbnZhcyBiYXNlZCBzbGlkZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0geydqdW1wJ3wncHJvcG9ydGlvbm5hbCd8J2hhbmRsZSd9IFtvcHRpb25zLm1vZGU9J2p1bXAnXSAtIE1vZGUgb2YgdGhlIHNsaWRlcjpcbiAqICAtIGluICdqdW1wJyBtb2RlLCB0aGUgdmFsdWUgaXMgY2hhbmdlZCBvbiAndG91Y2hzdGFydCcgb3IgJ21vdXNlZG93bicsIGFuZFxuICogICAgb24gbW92ZS5cbiAqICAtIGluICdwcm9wb3J0aW9ubmFsJyBtb2RlLCB0aGUgdmFsdWUgaXMgdXBkYXRlZCByZWxhdGl2ZWx5IHRvIG1vdmUuXG4gKiAgLSBpbiAnaGFuZGxlJyBtb2RlLCB0aGUgc2xpZGVyIGNhbiBiZSBncmFiYmVkIG9ubHkgYXJvdW5kIGl0cyB2YWx1ZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmNhbGxiYWNrXSAtIENhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIHdoZW4gdGhlIHZhbHVlXG4gKiAgb2YgdGhlIHNsaWRlciBjaGFuZ2VzLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLndpZHRoPTIwMF0gLSBXaWR0aCBvZiB0aGUgc2xpZGVyLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmhlaWdodD0zMF0gLSBIZWlnaHQgb2YgdGhlIHNsaWRlci5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5taW49MF0gLSBNaW5pbXVtIHZhbHVlLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heD0xXSAtIE1heGltdW0gdmFsdWUuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuc3RlcD0wLjAxXSAtIFN0ZXAgYmV0d2VlbiBlYWNoIGNvbnNlY3V0aXZlIHZhbHVlcy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5kZWZhdWx0PTBdIC0gRGVmYXVsdCB2YWx1ZS5cbiAqIEBwYXJhbSB7U3RyaW5nfEVsZW1lbnR9IFtvcHRpb25zLmNvbnRhaW5lcj0nYm9keSddIC0gQ1NTIFNlbGVjdG9yIG9yIERPTVxuICogIGVsZW1lbnQgaW4gd2hpY2ggaW5zZXJ0aW5nIHRoZSBzbGlkZXIuXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuYmFja2dyb3VuZENvbG9yPScjNDY0NjQ2J10gLSBCYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZVxuICogIHNsaWRlci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5mb3JlZ3JvdW5kQ29sb3I9J3N0ZWVsYmx1ZSddIC0gRm9yZWdyb3VuZCBjb2xvciBvZlxuICogIHRoZSBzbGlkZXIuXG4gKiBAcGFyYW0geydob3Jpem9udGFsJ3wndmVydGljYWwnfSBbb3B0aW9ucy5vcmllbnRhdGlvbj0naG9yaXpvbnRhbCddIC1cbiAqICBPcmllbnRhdGlvbiBvZiB0aGUgc2xpZGVyLlxuICogQHBhcmFtIHtBcnJheX0gW29wdGlvbnMubWFya2Vycz1bXV0gLSBMaXN0IG9mIHZhbHVlcyB3aGVyZSBtYXJrZXJzIHNob3VsZFxuICogIGJlIGRpc3BsYXllZCBvbiB0aGUgc2xpZGVyLlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5zaG93SGFuZGxlPXRydWVdIC0gSW4gJ2hhbmRsZScgbW9kZSwgZGVmaW5lIGlmIHRoZVxuICogIGRyYWdnYWJsZSBzaG91bGQgYmUgc2hvdyBvciBub3QuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuaGFuZGxlU2l6ZT0yMF0gLSBTaXplIG9mIHRoZSBkcmFnZ2FibGUgem9uZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5oYW5kbGVDb2xvcj0ncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpJ10gLSBDb2xvciBvZiB0aGVcbiAqICBkcmFnZ2FibGUgem9uZSAod2hlbiBgc2hvd0hhbmRsZWAgaXMgYHRydWVgKS5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHsgU2xpZGVyfSBmcm9tICdndWktY29tcG9uZW50cyc7XG4gKlxuICogY29uc3Qgc2xpZGVyID0gbmV3IFNsaWRlcih7XG4gKiAgIG1vZGU6ICdqdW1wJyxcbiAqICAgY29udGFpbmVyOiAnI2NvbnRhaW5lcicsXG4gKiAgIGRlZmF1bHQ6IDAuNixcbiAqICAgbWFya2VyczogWzAuNV0sXG4gKiAgIGNhbGxiYWNrOiAodmFsdWUpID0+IGNvbnNvbGUubG9nKHZhbHVlKSxcbiAqIH0pO1xuICovXG5jbGFzcyBTbGlkZXIge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgICBtb2RlOiAnanVtcCcsXG4gICAgICBjYWxsYmFjazogdmFsdWUgPT4ge30sXG4gICAgICB3aWR0aDogMjAwLFxuICAgICAgaGVpZ2h0OiAzMCxcbiAgICAgIG1pbjogMCxcbiAgICAgIG1heDogMSxcbiAgICAgIHN0ZXA6IDAuMDEsXG4gICAgICBkZWZhdWx0OiAwLFxuICAgICAgY29udGFpbmVyOiAnYm9keScsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjNDY0NjQ2JyxcbiAgICAgIGZvcmVncm91bmRDb2xvcjogJ3N0ZWVsYmx1ZScsXG4gICAgICBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnLFxuICAgICAgbWFya2VyczogW10sXG5cbiAgICAgIC8vIGhhbmRsZSBzcGVjaWZpYyBvcHRpb25zXG4gICAgICBzaG93SGFuZGxlOiB0cnVlLFxuICAgICAgaGFuZGxlU2l6ZTogMjAsXG4gICAgICBoYW5kbGVDb2xvcjogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC43KScsXG4gICAgfTtcblxuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgIHRoaXMuX2xpc3RlbmVycyA9IFtdO1xuICAgIHRoaXMuX2JvdW5kaW5nQ2xpZW50UmVjdCA9IG51bGw7XG4gICAgdGhpcy5fdG91Y2hJZCA9IG51bGw7XG4gICAgdGhpcy5fdmFsdWUgPSBudWxsO1xuICAgIHRoaXMuX2NhbnZhc1dpZHRoID0gbnVsbDtcbiAgICB0aGlzLl9jYW52YXNIZWlnaHQgPSBudWxsO1xuICAgIC8vIGZvciBwcm9wb3J0aW9ubmFsIG1vZGVcbiAgICB0aGlzLl9jdXJyZW50TW91c2VQb3NpdGlvbiA9IHsgeDogbnVsbCwgeTogbnVsbCB9O1xuICAgIHRoaXMuX2N1cnJlbnRTbGlkZXJQb3NpdGlvbiA9IG51bGw7XG5cbiAgICB0aGlzLl9vbk1vdXNlRG93biA9IHRoaXMuX29uTW91c2VEb3duLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25Nb3VzZU1vdmUgPSB0aGlzLl9vbk1vdXNlTW92ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uTW91c2VVcCA9IHRoaXMuX29uTW91c2VVcC5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5fb25Ub3VjaFN0YXJ0ID0gdGhpcy5fb25Ub3VjaFN0YXJ0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25Ub3VjaE1vdmUgPSB0aGlzLl9vblRvdWNoTW92ZSAuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vblRvdWNoRW5kID0gdGhpcy5fb25Ub3VjaEVuZC5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5fb25SZXNpemUgPSB0aGlzLl9vblJlc2l6ZS5iaW5kKHRoaXMpO1xuXG5cbiAgICB0aGlzLl9jcmVhdGVFbGVtZW50KCk7XG5cbiAgICAvLyBpbml0aWFsaXplXG4gICAgdGhpcy5fcmVzaXplRWxlbWVudCgpO1xuICAgIHRoaXMuX3NldFNjYWxlcygpO1xuICAgIHRoaXMuX2JpbmRFdmVudHMoKTtcbiAgICB0aGlzLl9vblJlc2l6ZSgpO1xuICAgIHRoaXMuX3VwZGF0ZVZhbHVlKHRoaXMucGFyYW1zLmRlZmF1bHQpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX29uUmVzaXplKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDdXJyZW50IHZhbHVlIG9mIHRoZSBzbGlkZXIuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbCkge1xuICAgIHRoaXMuX3VwZGF0ZVZhbHVlKHZhbCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhlIHNsaWRlciB0byBpdHMgZGVmYXVsdCB2YWx1ZS5cbiAgICovXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuX3VwZGF0ZVZhbHVlKHRoaXMucGFyYW1zLmRlZmF1bHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2l6ZSB0aGUgc2xpZGVyLlxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gd2lkdGggLSBOZXcgd2lkdGggb2YgdGhlIHNsaWRlci5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodCAtIE5ldyBoZWlnaHQgb2YgdGhlIHNsaWRlci5cbiAgICovXG4gIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy5wYXJhbXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLnBhcmFtcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICB0aGlzLl9yZXNpemVFbGVtZW50KCk7XG4gICAgdGhpcy5fc2V0U2NhbGVzKCk7XG4gICAgdGhpcy5fb25SZXNpemUoKTtcbiAgICB0aGlzLl91cGRhdGVWYWx1ZSh0aGlzLl92YWx1ZSwgdHJ1ZSk7XG4gIH1cblxuICBfdXBkYXRlVmFsdWUodmFsdWUsIGZvcmNlUmVuZGVyID0gZmFsc2UpIHtcbiAgICBjb25zdCB7IGNhbGxiYWNrIH0gPSB0aGlzLnBhcmFtcztcbiAgICBjb25zdCBjbGlwcGVkVmFsdWUgPSB0aGlzLmNsaXBwZXIodmFsdWUpO1xuXG4gICAgLy8gaWYgcmVzaXplIHJlbmRlciBidXQgZG9uJ3QgdHJpZ2dlciBjYWxsYmFja1xuICAgIGlmIChjbGlwcGVkVmFsdWUgPT09IHRoaXMuX3ZhbHVlICYmIGZvcmNlUmVuZGVyID09PSB0cnVlKVxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuX3JlbmRlcihjbGlwcGVkVmFsdWUpKTtcblxuICAgIC8vIHRyaWdnZXIgY2FsbGJhY2tcbiAgICBpZiAoY2xpcHBlZFZhbHVlICE9PSB0aGlzLl92YWx1ZSkge1xuICAgICAgdGhpcy5fdmFsdWUgPSBjbGlwcGVkVmFsdWU7XG4gICAgICBjYWxsYmFjayhjbGlwcGVkVmFsdWUpO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuX3JlbmRlcihjbGlwcGVkVmFsdWUpKTtcbiAgICB9XG4gIH1cblxuICBfY3JlYXRlRWxlbWVudCgpIHtcbiAgICBjb25zdCB7IGNvbnRhaW5lciB9ID0gdGhpcy5wYXJhbXM7XG4gICAgdGhpcy4kY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgdGhpcy5jdHggPSB0aGlzLiRjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIGlmIChjb250YWluZXIgaW5zdGFuY2VvZiBFbGVtZW50KVxuICAgICAgdGhpcy4kY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIGVsc2VcbiAgICAgIHRoaXMuJGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyKTtcblxuICAgIHRoaXMuJGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLiRjYW52YXMpO1xuICB9XG5cbiAgX3Jlc2l6ZUVsZW1lbnQoKSB7XG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSB0aGlzLnBhcmFtcztcblxuICAgIC8vIGxvZ2ljYWwgYW5kIHBpeGVsIHNpemUgb2YgdGhlIGNhbnZhc1xuICAgIHRoaXMuX3BpeGVsUmF0aW8gPSAoZnVuY3Rpb24oY3R4KSB7XG4gICAgY29uc3QgZFBSID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcbiAgICBjb25zdCBiUFIgPSBjdHgud2Via2l0QmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fFxuICAgICAgY3R4Lm1vekJhY2tpbmdTdG9yZVBpeGVsUmF0aW8gfHxcbiAgICAgIGN0eC5tc0JhY2tpbmdTdG9yZVBpeGVsUmF0aW8gfHxcbiAgICAgIGN0eC5vQmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fFxuICAgICAgY3R4LmJhY2tpbmdTdG9yZVBpeGVsUmF0aW8gfHwgMTtcblxuICAgICAgcmV0dXJuIGRQUiAvIGJQUjtcbiAgICB9KHRoaXMuY3R4KSk7XG5cbiAgICB0aGlzLl9jYW52YXNXaWR0aCA9IHdpZHRoICogdGhpcy5fcGl4ZWxSYXRpbztcbiAgICB0aGlzLl9jYW52YXNIZWlnaHQgPSBoZWlnaHQgKiB0aGlzLl9waXhlbFJhdGlvO1xuXG4gICAgdGhpcy5jdHguY2FudmFzLndpZHRoID0gdGhpcy5fY2FudmFzV2lkdGg7XG4gICAgdGhpcy5jdHguY2FudmFzLmhlaWdodCA9IHRoaXMuX2NhbnZhc0hlaWdodDtcbiAgICB0aGlzLmN0eC5jYW52YXMuc3R5bGUud2lkdGggPSBgJHt3aWR0aH1weGA7XG4gICAgdGhpcy5jdHguY2FudmFzLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH1weGA7XG4gIH1cblxuICBfb25SZXNpemUoKSB7XG4gICAgdGhpcy5fYm91bmRpbmdDbGllbnRSZWN0ID0gdGhpcy4kY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB9XG5cbiAgX3NldFNjYWxlcygpIHtcbiAgICBjb25zdCB7IG9yaWVudGF0aW9uLCB3aWR0aCwgaGVpZ2h0LCBtaW4sIG1heCwgc3RlcCB9ID0gdGhpcy5wYXJhbXM7XG4gICAgLy8gZGVmaW5lIHRyYW5zZmVydCBmdW5jdGlvbnNcbiAgICBjb25zdCBzY3JlZW5TaXplID0gb3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJyA/XG4gICAgICB3aWR0aCA6IGhlaWdodDtcblxuICAgIGNvbnN0IGNhbnZhc1NpemUgPSBvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnID9cbiAgICAgIHRoaXMuX2NhbnZhc1dpZHRoIDogdGhpcy5fY2FudmFzSGVpZ2h0O1xuXG4gICAgY29uc3QgZG9tYWluID0gb3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJyA/IFttaW4sIG1heF0gOiBbbWF4LCBtaW5dO1xuICAgIGNvbnN0IHNjcmVlblJhbmdlID0gWzAsIHNjcmVlblNpemVdO1xuICAgIGNvbnN0IGNhbnZhc1JhbmdlID0gWzAsIGNhbnZhc1NpemVdO1xuXG4gICAgdGhpcy5zY3JlZW5TY2FsZSA9IGdldFNjYWxlKGRvbWFpbiwgc2NyZWVuUmFuZ2UpO1xuICAgIHRoaXMuY2FudmFzU2NhbGUgPSBnZXRTY2FsZShkb21haW4sIGNhbnZhc1JhbmdlKTtcbiAgICB0aGlzLmNsaXBwZXIgPSBnZXRDbGlwcGVyKG1pbiwgbWF4LCBzdGVwKTtcbiAgfVxuXG4gIF9iaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9vbk1vdXNlRG93bik7XG4gICAgdGhpcy4kY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9vblRvdWNoU3RhcnQpO1xuICB9XG5cbiAgX29uU3RhcnQoeCwgeSkge1xuICAgIGxldCBzdGFydGVkID0gbnVsbDtcblxuICAgIHN3aXRjaCAodGhpcy5wYXJhbXMubW9kZSkge1xuICAgICAgY2FzZSAnanVtcCc6XG4gICAgICAgIHRoaXMuX3VwZGF0ZVBvc2l0aW9uKHgsIHkpO1xuICAgICAgICBzdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdwcm9wb3J0aW9ubmFsJzpcbiAgICAgICAgdGhpcy5fY3VycmVudE1vdXNlUG9zaXRpb24ueCA9IHg7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRNb3VzZVBvc2l0aW9uLnkgPSB5O1xuICAgICAgICBzdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdoYW5kbGUnOlxuICAgICAgICBjb25zdCBvcmllbnRhdGlvbiA9IHRoaXMucGFyYW1zLm9yaWVudGF0aW9uO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuc2NyZWVuU2NhbGUodGhpcy5fdmFsdWUpO1xuICAgICAgICBjb25zdCBjb21wYXJlID0gb3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJyA/IHggOiB5O1xuICAgICAgICBjb25zdCBkZWx0YSA9IHRoaXMucGFyYW1zLmhhbmRsZVNpemUgLyAyO1xuXG4gICAgICAgIGlmIChjb21wYXJlIDwgcG9zaXRpb24gKyBkZWx0YSAmJiBjb21wYXJlID4gcG9zaXRpb24gLSBkZWx0YSkge1xuICAgICAgICAgIHRoaXMuX2N1cnJlbnRNb3VzZVBvc2l0aW9uLnggPSB4O1xuICAgICAgICAgIHRoaXMuX2N1cnJlbnRNb3VzZVBvc2l0aW9uLnkgPSB5O1xuICAgICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnRlZDtcbiAgfVxuXG4gIF9vbk1vdmUoeCwgeSkge1xuICAgIHN3aXRjaCAodGhpcy5wYXJhbXMubW9kZSkge1xuICAgICAgY2FzZSAnanVtcCc6XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncHJvcG9ydGlvbm5hbCc6XG4gICAgICBjYXNlICdoYW5kbGUnOlxuICAgICAgICBjb25zdCBkZWx0YVggPSB4IC0gdGhpcy5fY3VycmVudE1vdXNlUG9zaXRpb24ueDtcbiAgICAgICAgY29uc3QgZGVsdGFZID0geSAtIHRoaXMuX2N1cnJlbnRNb3VzZVBvc2l0aW9uLnk7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRNb3VzZVBvc2l0aW9uLnggPSB4O1xuICAgICAgICB0aGlzLl9jdXJyZW50TW91c2VQb3NpdGlvbi55ID0geTtcblxuICAgICAgICB4ID0gdGhpcy5zY3JlZW5TY2FsZSh0aGlzLl92YWx1ZSkgKyBkZWx0YVg7XG4gICAgICAgIHkgPSB0aGlzLnNjcmVlblNjYWxlKHRoaXMuX3ZhbHVlKSArIGRlbHRhWTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgdGhpcy5fdXBkYXRlUG9zaXRpb24oeCwgeSk7XG4gIH1cblxuICBfb25FbmQoKSB7XG4gICAgc3dpdGNoICh0aGlzLnBhcmFtcy5tb2RlKSB7XG4gICAgICBjYXNlICdqdW1wJzpcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdwcm9wb3J0aW9ubmFsJzpcbiAgICAgIGNhc2UgJ2hhbmRsZSc6XG4gICAgICAgIHRoaXMuX2N1cnJlbnRNb3VzZVBvc2l0aW9uLnggPSBudWxsO1xuICAgICAgICB0aGlzLl9jdXJyZW50TW91c2VQb3NpdGlvbi55ID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gbW91c2UgZXZlbnRzXG4gIF9vbk1vdXNlRG93bihlKSB7XG4gICAgY29uc3QgcGFnZVggPSBlLnBhZ2VYO1xuICAgIGNvbnN0IHBhZ2VZID0gZS5wYWdlWTtcbiAgICBjb25zdCB4ID0gcGFnZVggLSB0aGlzLl9ib3VuZGluZ0NsaWVudFJlY3QubGVmdDtcbiAgICBjb25zdCB5ID0gcGFnZVkgLSB0aGlzLl9ib3VuZGluZ0NsaWVudFJlY3QudG9wO1xuXG4gICAgaWYgKHRoaXMuX29uU3RhcnQoeCwgeSkgPT09IHRydWUpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9vbk1vdXNlTW92ZSk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX29uTW91c2VVcCk7XG4gICAgfVxuICB9XG5cbiAgX29uTW91c2VNb3ZlKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIHByZXZlbnQgdGV4dCBzZWxlY3Rpb25cblxuICAgIGNvbnN0IHBhZ2VYID0gZS5wYWdlWDtcbiAgICBjb25zdCBwYWdlWSA9IGUucGFnZVk7XG4gICAgbGV0IHggPSBwYWdlWCAtIHRoaXMuX2JvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0OztcbiAgICBsZXQgeSA9IHBhZ2VZIC0gdGhpcy5fYm91bmRpbmdDbGllbnRSZWN0LnRvcDs7XG5cbiAgICB0aGlzLl9vbk1vdmUoeCwgeSk7XG4gIH1cblxuICBfb25Nb3VzZVVwKGUpIHtcbiAgICB0aGlzLl9vbkVuZCgpO1xuXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX29uTW91c2VNb3ZlKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX29uTW91c2VVcCk7XG4gIH1cblxuICAvLyB0b3VjaCBldmVudHNcbiAgX29uVG91Y2hTdGFydChlKSB7XG4gICAgaWYgKHRoaXMuX3RvdWNoSWQgIT09IG51bGwpIHJldHVybjtcblxuICAgIGNvbnN0IHRvdWNoID0gZS50b3VjaGVzWzBdO1xuICAgIHRoaXMuX3RvdWNoSWQgPSB0b3VjaC5pZGVudGlmaWVyO1xuXG4gICAgY29uc3QgcGFnZVggPSB0b3VjaC5wYWdlWDtcbiAgICBjb25zdCBwYWdlWSA9IHRvdWNoLnBhZ2VZO1xuICAgIGNvbnN0IHggPSBwYWdlWCAtIHRoaXMuX2JvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0O1xuICAgIGNvbnN0IHkgPSBwYWdlWSAtIHRoaXMuX2JvdW5kaW5nQ2xpZW50UmVjdC50b3A7XG5cbiAgICBpZiAodGhpcy5fb25TdGFydCh4LCB5KSA9PT0gdHJ1ZSkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuX29uVG91Y2hNb3ZlKTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuX29uVG91Y2hFbmQpO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy5fb25Ub3VjaEVuZCk7XG4gICAgfVxuICB9XG5cbiAgX29uVG91Y2hNb3ZlKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIHByZXZlbnQgdGV4dCBzZWxlY3Rpb25cblxuICAgIGNvbnN0IHRvdWNoZXMgPSBBcnJheS5mcm9tKGUudG91Y2hlcyk7XG4gICAgY29uc3QgdG91Y2ggPSB0b3VjaGVzLmZpbHRlcigodCkgPT4gdC5pZGVudGlmaWVyID09PSB0aGlzLl90b3VjaElkKVswXTtcblxuICAgIGlmICh0b3VjaCkge1xuICAgICAgY29uc3QgcGFnZVggPSB0b3VjaC5wYWdlWDtcbiAgICAgIGNvbnN0IHBhZ2VZID0gdG91Y2gucGFnZVk7XG4gICAgICBjb25zdCB4ID0gcGFnZVggLSB0aGlzLl9ib3VuZGluZ0NsaWVudFJlY3QubGVmdDtcbiAgICAgIGNvbnN0IHkgPSBwYWdlWSAtIHRoaXMuX2JvdW5kaW5nQ2xpZW50UmVjdC50b3A7XG5cbiAgICAgIHRoaXMuX29uTW92ZSh4LCB5KTtcbiAgICB9XG4gIH1cblxuICBfb25Ub3VjaEVuZChlKSB7XG4gICAgY29uc3QgdG91Y2hlcyA9IEFycmF5LmZyb20oZS50b3VjaGVzKTtcbiAgICBjb25zdCB0b3VjaCA9IHRvdWNoZXMuZmlsdGVyKCh0KSA9PiB0LmlkZW50aWZpZXIgPT09IHRoaXMuX3RvdWNoSWQpWzBdO1xuXG4gICAgaWYgKHRvdWNoID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX29uRW5kKCk7XG4gICAgICB0aGlzLl90b3VjaElkID0gbnVsbDtcblxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuX29uVG91Y2hNb3ZlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuX29uVG91Y2hFbmQpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy5fb25Ub3VjaEVuZCk7XG5cbiAgICB9XG4gIH1cblxuICBfdXBkYXRlUG9zaXRpb24oeCwgeSkge1xuICAgIGNvbnN0IHvCoG9yaWVudGF0aW9uLCBoZWlnaHQgfSA9IHRoaXMucGFyYW1zO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gb3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJyA/IHggOiB5O1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5zY3JlZW5TY2FsZS5pbnZlcnQocG9zaXRpb24pO1xuXG4gICAgdGhpcy5fdXBkYXRlVmFsdWUodmFsdWUpO1xuICB9XG5cbiAgX3JlbmRlcihjbGlwcGVkVmFsdWUpIHtcbiAgICBjb25zdCB7IGJhY2tncm91bmRDb2xvciwgZm9yZWdyb3VuZENvbG9yLCBvcmllbnRhdGlvbiB9ID0gdGhpcy5wYXJhbXM7XG4gICAgY29uc3QgY2FudmFzUG9zaXRpb24gPSBNYXRoLnJvdW5kKHRoaXMuY2FudmFzU2NhbGUoY2xpcHBlZFZhbHVlKSk7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLl9jYW52YXNXaWR0aDtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLl9jYW52YXNIZWlnaHQ7XG4gICAgY29uc3QgY3R4ID0gdGhpcy5jdHg7XG5cbiAgICBjdHguc2F2ZSgpO1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAvLyBiYWNrZ3JvdW5kXG4gICAgY3R4LmZpbGxTdHlsZSA9IGJhY2tncm91bmRDb2xvcjtcbiAgICBjdHguZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAvLyBmb3JlZ3JvdW5kXG4gICAgY3R4LmZpbGxTdHlsZSA9IGZvcmVncm91bmRDb2xvcjtcblxuICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKVxuICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhc1Bvc2l0aW9uLCBoZWlnaHQpO1xuICAgIGVsc2VcbiAgICAgIGN0eC5maWxsUmVjdCgwLCBjYW52YXNQb3NpdGlvbiwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAvLyBtYXJrZXJzXG4gICAgY29uc3QgbWFya2VycyA9IHRoaXMucGFyYW1zLm1hcmtlcnM7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hcmtlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IG1hcmtlciA9IG1hcmtlcnNbaV07XG4gICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuY2FudmFzU2NhbGUobWFya2VyKTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNyknO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuXG4gICAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICBjdHgubW92ZVRvKHBvc2l0aW9uIC0gMC41LCAxKTtcbiAgICAgICAgY3R4LmxpbmVUbyhwb3NpdGlvbiAtIDAuNSwgaGVpZ2h0IC0gMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdHgubW92ZVRvKDEsIGhlaWdodCAtIHBvc2l0aW9uICsgMC41KTtcbiAgICAgICAgY3R4LmxpbmVUbyh3aWR0aCAtIDEsIGhlaWdodCAtIHBvc2l0aW9uICsgMC41KTtcbiAgICAgIH1cblxuICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH1cblxuICAgIC8vIGhhbmRsZSBtb2RlXG4gICAgaWYgKHRoaXMucGFyYW1zLm1vZGUgPT09ICdoYW5kbGUnICYmIHRoaXMucGFyYW1zLnNob3dIYW5kbGUpIHtcbiAgICAgIGNvbnN0IGRlbHRhID0gdGhpcy5wYXJhbXMuaGFuZGxlU2l6ZSAqIHRoaXMuX3BpeGVsUmF0aW8gLyAyO1xuICAgICAgY29uc3Qgc3RhcnQgPSBjYW52YXNQb3NpdGlvbiAtIGRlbHRhO1xuICAgICAgY29uc3QgZW5kID0gY2FudmFzUG9zaXRpb24gKyBkZWx0YTtcblxuICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLnBhcmFtcy5oYW5kbGVDb2xvcjtcblxuICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgY3R4LmZpbGxSZWN0KHN0YXJ0LCAwLCBlbmQgLSBzdGFydCwgaGVpZ2h0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN0eC5maWxsUmVjdCgwLCBzdGFydCwgd2lkdGgsIGVuZCAtIHN0YXJ0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjdHgucmVzdG9yZSgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNsaWRlcjtcbiIsIi8qKlxuICogQG1vZHVsZSBndWktY29tcG9uZW50c1xuICovXG5leHBvcnQgeyBkZWZhdWx0IGFzIFNsaWRlciB9IGZyb20gJy4vU2xpZGVyJztcbiIsImltcG9ydCAqIGFzIHN0eWxlcyBmcm9tICcuLi91dGlscy9zdHlsZXMnO1xuXG4vLyBrZWVwIHRyYWNrIG9mIGFsbCBpbnN0YWNpYXRlZCBjb250cm9sbGVyc1xuY29uc3QgY29udHJvbGxlcnMgPSBuZXcgU2V0KCk7XG4vLyBkZWZhdWx0IHRoZW1lXG5sZXQgdGhlbWUgPSAnbGlnaHQnO1xuXG4vKipcbiAqIEBtb2R1bGUgYmFzaWMtY29udHJvbGxlcnNcbiAqL1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgdG8gY3JlYXRlIG5ldyBjb250cm9sbGVyc1xuICovXG5jbGFzcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKHR5cGUsIGRlZmF1bHRzLCBvcHRpb25zKSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBvcHRpb25zKTtcbiAgICAvLyBpbnNlcnQgc3R5bGVzIGFuZCBsaXN0ZW4gd2luZG93IHJlc2l6ZSB3aGVuIHRoZSBmaXJzdCBjb250cm9sbGVyIGlzIGNyZWF0ZWRcbiAgICBpZiAoY29udHJvbGxlcnMuc2l6ZSA9PT0gMCkge1xuICAgICAgc3R5bGVzLmluc2VydFN0eWxlU2hlZXQoKTtcblxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250cm9sbGVycy5mb3JFYWNoKChjb250cm9sbGVyKSA9PiBjb250cm9sbGVyLm9uUmVzaXplKCkpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29udHJvbGxlcnMuYWRkKHRoaXMpO1xuXG4gICAgdGhpcy5fbGlzdGVuZXJzID0gbmV3IFNldCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZW1lIG9mIHRoZSBjb250cm9sbGVyc1xuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc3RhdGljIHNldCB0aGVtZSh2YWx1ZSkge1xuICAgIGNvbnRyb2xsZXJzLmZvckVhY2goKGNvbnRyb2xsZXIpID0+IGNvbnRyb2xsZXIuJGVsLmNsYXNzTGlzdC5yZW1vdmUodGhlbWUpKTtcbiAgICB0aGVtZSA9IHZhbHVlO1xuICAgIGNvbnRyb2xsZXJzLmZvckVhY2goKGNvbnRyb2xsZXIpID0+IGNvbnRyb2xsZXIuJGVsLmNsYXNzTGlzdC5hZGQodGhlbWUpKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgdGhlbWUoKSB7XG4gICAgcmV0dXJuIHRoZW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hbmRhdG9yeSBtZXRob2QgdG8gYmUgY2FsbGVkIGF0IHRoZSBlbmQgb2YgYSBjb25zdHJ1Y3Rvci5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGluaXRpYWxpemUoKSB7XG4gICAgY29uc3QgY2FsbGJhY2sgPSB0aGlzLnBhcmFtcy5jYWxsYmFjaztcbiAgICBsZXQgJGNvbnRhaW5lciA9IHRoaXMucGFyYW1zLmNvbnRhaW5lcjtcblxuICAgIGlmICgkY29udGFpbmVyKSB7XG4gICAgICAvLyBjc3Mgc2VsZWN0b3JcbiAgICAgIGlmICh0eXBlb2YgJGNvbnRhaW5lciA9PT0gJ3N0cmluZycpXG4gICAgICAgICRjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCRjb250YWluZXIpO1xuICAgICAgLy8gZ3JvdXBcbiAgICAgIGVsc2UgaWYgKCRjb250YWluZXIgaW5zdGFuY2VvZiBCYXNlQ29udHJvbGxlciAmJiAkY29udGFpbmVyLiRjb250YWluZXIpXG4gICAgICAgICRjb250YWluZXIgPSAkY29udGFpbmVyLiRjb250YWluZXI7XG5cbiAgICAgICRjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXIoKSk7XG4gICAgICB0aGlzLm9uUmVuZGVyKCk7XG4gICAgfVxuXG4gICAgaWYgKGNhbGxiYWNrKVxuICAgICAgdGhpcy5hZGRMaXN0ZW5lcihjYWxsYmFjayk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgbGlzdGVuZXIgdG8gdGhlIGNvbnRyb2xsZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gRnVuY3Rpb24gdG8gYmUgYXBwbGllZCB3aGVuIHRoZSBjb250cm9sbGVyXG4gICAqICBzdGF0ZSBjaGFuZ2UuXG4gICAqL1xuICBhZGRMaXN0ZW5lcihjYWxsYmFjaykge1xuICAgIHRoaXMuX2xpc3RlbmVycy5hZGQoY2FsbGJhY2spO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIGxpc3RlbmVyIGZyb20gdGhlIGNvbnRyb2xsZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gRnVuY3Rpb24gdG8gcmVtb3ZlIGZyb20gdGhlIGxpc3RlbmVycy5cbiAgICovXG4gIHJlbW92ZUxpc3RlbmVyKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fbGlzdGVuZXJzLnJlbW92ZShjYWxsYmFjayk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZXhlY3V0ZUxpc3RlbmVycyguLi52YWx1ZXMpIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMuZm9yRWFjaCgoY2FsbGJhY2spID0+IGNhbGxiYWNrKC4uLnZhbHVlcykpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlbmRlcih0eXBlID0gbnVsbCkge1xuICAgIHRoaXMuJGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKHN0eWxlcy5ucywgdGhlbWUpO1xuXG4gICAgaWYgKHR5cGUgIT09IG51bGwpXG4gICAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKHR5cGUpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIG9uUmVuZGVyKCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5vblJlc2l6ZSgpLCAwKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBvblJlc2l6ZSgpIHtcbiAgICBjb25zdCBib3VuZGluZ1JlY3QgPSB0aGlzLiRlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB3aWR0aCA9IGJvdW5kaW5nUmVjdC53aWR0aDtcbiAgICBjb25zdCBtZXRob2QgPSB3aWR0aCA+IDYwMCA/ICdyZW1vdmUnIDogJ2FkZCc7XG5cbiAgICB0aGlzLiRlbC5jbGFzc0xpc3RbbWV0aG9kXSgnc21hbGwnKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBiaW5kRXZlbnRzKCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZUNvbnRyb2xsZXI7XG4iLCJpbXBvcnQgQmFzZUNvbnRyb2xsZXIgZnJvbSAnLi9CYXNlQ29udHJvbGxlcic7XG5pbXBvcnQgKiBhcyBlbGVtZW50cyBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5cbi8qKlxuICogQG1vZHVsZSBiYXNpYy1jb250cm9sbGVyc1xuICovXG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICBsZWdlbmQ6ICcmbmJzcDsnLFxuICBkZWZhdWx0U3RhdGU6ICdvcGVuZWQnLFxuICBjb250YWluZXI6IG51bGwsXG59O1xuXG4vKipcbiAqIENyZWF0ZSBhIGdyb3VwIG9mIGNvbnRyb2xsZXJzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IGxlZ2VuZCAtXG4gKi9cbmNsYXNzIEdyb3VwIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIodHlwZSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgdGhpcy5fc3RhdGVzID0gWydvcGVuZWQnLCAnY2xvc2VkJ107XG4gICAgc3VwZXIuaW5pdGlhbGl6ZSgkY29udGFpbmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGF0ZSBvZiB0aGUgZ3JvdXAgKGAnb3BlbmVkJ2Agb3IgYCdjbG9zZWQnYCkuXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBnZXQgc3RhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyYW1zLnN0YXRlO1xuICB9XG5cbiAgc2V0IHN0YXRlKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuX3N0YXRlcy5pbmRleE9mKHZhbHVlKSA9PT0gLTEpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgc3RhdGUgXCIke3ZhbHVlfVwiYCk7XG5cbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMucGFyYW1zLnN0YXRlKTtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKHZhbHVlKTtcblxuICAgIHRoaXMucGFyYW1zLnN0YXRlID0gdmFsdWU7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVuZGVyKCkge1xuICAgIGxldCBjb250ZW50ID0gYFxuICAgICAgPGRpdiBjbGFzcz1cImdyb3VwLWhlYWRlclwiPlxuICAgICAgICAke2VsZW1lbnRzLnNtYWxsQXJyb3dSaWdodH1cbiAgICAgICAgJHtlbGVtZW50cy5zbWFsbEFycm93Qm90dG9tfVxuICAgICAgICA8c3BhbiBjbGFzcz1cImxlZ2VuZFwiPiR7dGhpcy5wYXJhbXMubGVnZW5kfTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImdyb3VwLWNvbnRlbnRcIj48L2Rpdj5cbiAgICBgO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIodGhpcy50eXBlKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQodGhpcy5wYXJhbXMuc3RhdGUpO1xuXG4gICAgdGhpcy4kaGVhZGVyID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmdyb3VwLWhlYWRlcicpO1xuICAgIHRoaXMuJGNvbnRhaW5lciA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5ncm91cC1jb250ZW50Jyk7XG5cbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJGhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5wYXJhbXMuc3RhdGUgPT09ICdjbG9zZWQnID8gJ29wZW5lZCcgOiAnY2xvc2VkJztcbiAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHcm91cDtcbiIsImltcG9ydCBCYXNlQ29udHJvbGxlciBmcm9tICcuL0Jhc2VDb250cm9sbGVyJztcbmltcG9ydCAqIGFzIGVsZW1lbnRzIGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcblxuLyoqXG4gKiBAbW9kdWxlIGJhc2ljLWNvbnRyb2xsZXJzXG4gKi9cblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIGxhYmVsOiAnJG5ic3A7JyxcbiAgbWluOiAwLFxuICBtYXg6IDEsXG4gIHN0ZXA6IDAuMDEsXG4gIGRlZmF1bHQ6IDAsXG4gIGNvbnRhaW5lcjogbnVsbCxcbiAgY2FsbGJhY2s6IG51bGwsXG59O1xuXG4vKipcbiAqIE51bWJlciBCb3hcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlIGRlZmF1bHQgb3B0aW9ucy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBsYWJlbCAtIExhYmVsIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtOdW1iZXJ9IFttaW49MF0gLSBNaW5pbXVtIHZhbHVlLlxuICogQHBhcmFtIHtOdW1iZXJ9IFttYXg9MV0gLSBNYXhpbXVtIHZhbHVlLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtzdGVwPTAuMDFdIC0gU3RlcCBiZXR3ZWVuIGNvbnNlY3V0aXZlIHZhbHVlcy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbZGVmYXVsdD0wXSAtIERlZmF1bHQgdmFsdWUuXG4gKiBAcGFyYW0ge051bWJlcn0gW2NvbnRhaW5lcj1udWxsXSAtIENvbnRhaW5lciBvZiB0aGUgY29udHJvbGxlci5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbY2FsbGJhY2s9bnVsbF0gLSBDYWxsYmFjayB0byBiZSBleGVjdXRlZCB3aGVuIHRoZSB2YWx1ZSBjaGFuZ2VzLlxuICovXG5jbGFzcyBOdW1iZXJCb3ggZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG4gIC8vIGxlZ2VuZCwgbWluID0gMCwgbWF4ID0gMSwgc3RlcCA9IDAuMDEsIGRlZmF1bHRWYWx1ZSA9IDAsICRjb250YWluZXIgPSBudWxsLCBjYWxsYmFjayA9IG51bGxcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKCdudW1iZXItYm94JywgZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgdGhpcy5fdmFsdWUgPSB0aGlzLnBhcmFtcy5kZWZhdWx0O1xuICAgIHRoaXMuX2lzSW50U3RlcCA9ICh0aGlzLnBhcmFtcy5zdGVwICUgMSA9PT0gMCk7XG5cbiAgICBzdXBlci5pbml0aWFsaXplKCk7XG4gIH1cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgLy8gdXNlICRudW1iZXIgZWxlbWVudCBtaW4sIG1heCBhbmQgc3RlcCBzeXN0ZW1cbiAgICB0aGlzLiRudW1iZXIudmFsdWUgPSB2YWx1ZTtcbiAgICB2YWx1ZSA9IHRoaXMuJG51bWJlci52YWx1ZTtcbiAgICB2YWx1ZSA9IHRoaXMuX2lzSW50U3RlcCA/IHBhcnNlSW50KHZhbHVlLCAxMCkgOiBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgbGFiZWwsIG1pbiwgbWF4LCBzdGVwIH0gPSB0aGlzLnBhcmFtcztcbiAgICBjb25zb2xlLmxvZyh0aGlzLl92YWx1ZSlcbiAgICBjb25zdCBjb250ZW50ID0gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJsYWJlbFwiPiR7bGFiZWx9PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImlubmVyLXdyYXBwZXJcIj5cbiAgICAgICAgJHtlbGVtZW50cy5hcnJvd0xlZnR9XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cIm51bWJlclwiIHR5cGU9XCJudW1iZXJcIiBtaW49XCIke21pbn1cIiBtYXg9XCIke21heH1cIiBzdGVwPVwiJHtzdGVwfVwiIHZhbHVlPVwiJHt0aGlzLl92YWx1ZX1cIiAvPlxuICAgICAgICAke2VsZW1lbnRzLmFycm93UmlnaHR9XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIodGhpcy50eXBlKTtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKCdhbGlnbi1zbWFsbCcpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiRwcmV2ID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmFycm93LWxlZnQnKTtcbiAgICB0aGlzLiRuZXh0ID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmFycm93LXJpZ2h0Jyk7XG4gICAgdGhpcy4kbnVtYmVyID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cIm51bWJlclwiXScpO1xuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJHByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgY29uc3Qgc3RlcCA9IHRoaXMucGFyYW1zLnN0ZXA7XG4gICAgICBjb25zdCBkZWNpbWFscyA9IHN0ZXAudG9TdHJpbmcoKS5zcGxpdCgnLicpWzFdO1xuICAgICAgY29uc3QgZXhwID0gZGVjaW1hbHMgPyBkZWNpbWFscy5sZW5ndGggOiAwO1xuICAgICAgY29uc3QgbXVsdCA9IE1hdGgucG93KDEwLCBleHApO1xuXG4gICAgICBjb25zdCBpbnRWYWx1ZSA9IE1hdGguZmxvb3IodGhpcy5fdmFsdWUgKiBtdWx0ICsgMC41KTtcbiAgICAgIGNvbnN0IGludFN0ZXAgPSBNYXRoLmZsb29yKHN0ZXAgKiBtdWx0ICsgMC41KTtcbiAgICAgIGNvbnN0IHZhbHVlID0gKGludFZhbHVlIC0gaW50U3RlcCkgLyBtdWx0O1xuXG4gICAgICB0aGlzLnByb3BhZ2F0ZSh2YWx1ZSk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgdGhpcy4kbmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBjb25zdCBzdGVwID0gdGhpcy5wYXJhbXMuc3RlcDtcbiAgICAgIGNvbnN0IGRlY2ltYWxzID0gc3RlcC50b1N0cmluZygpLnNwbGl0KCcuJylbMV07XG4gICAgICBjb25zdCBleHAgPSBkZWNpbWFscyA/IGRlY2ltYWxzLmxlbmd0aCA6IDA7XG4gICAgICBjb25zdCBtdWx0ID0gTWF0aC5wb3coMTAsIGV4cCk7XG5cbiAgICAgIGNvbnN0IGludFZhbHVlID0gTWF0aC5mbG9vcih0aGlzLl92YWx1ZSAqIG11bHQgKyAwLjUpO1xuICAgICAgY29uc3QgaW50U3RlcCA9IE1hdGguZmxvb3Ioc3RlcCAqIG11bHQgKyAwLjUpO1xuICAgICAgY29uc3QgdmFsdWUgPSAoaW50VmFsdWUgKyBpbnRTdGVwKSAvIG11bHQ7XG5cbiAgICAgIHRoaXMucHJvcGFnYXRlKHZhbHVlKTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICB0aGlzLiRudW1iZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IHRoaXMuJG51bWJlci52YWx1ZTtcbiAgICAgIHZhbHVlID0gdGhpcy5faXNJbnRTdGVwID8gcGFyc2VJbnQodmFsdWUsIDEwKSA6IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgdmFsdWUgPSBNYXRoLm1pbih0aGlzLnBhcmFtcy5tYXgsIE1hdGgubWF4KHRoaXMucGFyYW1zLm1pbiwgdmFsdWUpKTtcblxuICAgICAgdGhpcy5wcm9wYWdhdGUodmFsdWUpO1xuICAgIH0sIGZhbHNlKTtcbiAgfVxuXG4gIHByb3BhZ2F0ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5fdmFsdWUpIHsgcmV0dXJuOyB9XG5cbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuJG51bWJlci52YWx1ZSA9IHZhbHVlO1xuXG4gICAgdGhpcy5leGVjdXRlTGlzdGVuZXJzKHRoaXMuX3ZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBOdW1iZXJCb3g7XG4iLCJpbXBvcnQgQmFzZUNvbnRyb2xsZXIgZnJvbSAnLi9CYXNlQ29udHJvbGxlcic7XG5pbXBvcnQgKiBhcyBlbGVtZW50cyBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5cbmNsYXNzIFNlbGVjdEJ1dHRvbnMgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgb3B0aW9ucywgZGVmYXVsdFZhbHVlLCAkY29udGFpbmVyID0gbnVsbCwgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudHlwZSA9ICdzZWxlY3QtYnV0dG9ucyc7XG4gICAgdGhpcy5sZWdlbmQgPSBsZWdlbmQ7IC8vIG5vbiBicmVha2FibGUgc3BhY2UgdG8ga2VlcCByZW5kZXJpbmcgY29uc2lzdGVuY3lcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuX3ZhbHVlID0gZGVmYXVsdFZhbHVlO1xuICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IHRoaXMub3B0aW9ucy5pbmRleE9mKHRoaXMuX3ZhbHVlKTtcbiAgICB0aGlzLl9jdXJyZW50SW5kZXggPSBjdXJyZW50SW5kZXggPT09IC0xID/CoDAgOiBjdXJyZW50SW5kZXg7XG4gICAgdGhpcy5fbWF4SW5kZXggPSB0aGlzLm9wdGlvbnMubGVuZ3RoIC0gMTtcblxuICAgIHN1cGVyLl9hcHBseU9wdGlvbm5hbFBhcmFtZXRlcnMoJGNvbnRhaW5lciwgY2FsbGJhY2spO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5vcHRpb25zLmluZGV4T2YodmFsdWUpO1xuXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IGluZGV4O1xuICAgICAgdGhpcy5faGlnaGxpZ2h0QnRuKHRoaXMuX2N1cnJlbnRJbmRleCk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBgXG4gICAgICA8c3BhbiBjbGFzcz1cImxlZ2VuZFwiPiR7dGhpcy5sZWdlbmR9PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImlubmVyLXdyYXBwZXJcIj5cbiAgICAgICAgJHtlbGVtZW50cy5hcnJvd0xlZnR9XG4gICAgICAgICR7dGhpcy5vcHRpb25zLm1hcCgob3B0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiYnRuXCIgZGF0YS1pbmRleD1cIiR7aW5kZXh9XCIgZGF0YS12YWx1ZT1cIiR7b3B0aW9ufVwiPlxuICAgICAgICAgICAgICAke29wdGlvbn1cbiAgICAgICAgICAgIDwvYT5gO1xuICAgICAgICB9KS5qb2luKCcnKX1cbiAgICAgICAgJHtlbGVtZW50cy5hcnJvd1JpZ2h0fVxuICAgICAgPC9kaXY+XG4gICAgYDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKHRoaXMudHlwZSk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuJHByZXYgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuYXJyb3ctbGVmdCcpO1xuICAgIHRoaXMuJG5leHQgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuYXJyb3ctcmlnaHQnKTtcbiAgICB0aGlzLiRidG5zID0gQXJyYXkuZnJvbSh0aGlzLiRlbC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuJykpO1xuICAgIHRoaXMuX2hpZ2hsaWdodEJ0bih0aGlzLl9jdXJyZW50SW5kZXgpO1xuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLiRwcmV2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9jdXJyZW50SW5kZXggLSAxO1xuICAgICAgdGhpcy5wcm9wYWdhdGUoaW5kZXgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy4kbmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fY3VycmVudEluZGV4ICsgMTtcbiAgICAgIHRoaXMucHJvcGFnYXRlKGluZGV4KTtcbiAgICB9KTtcblxuICAgIHRoaXMuJGJ0bnMuZm9yRWFjaCgoJGJ0biwgaW5kZXgpID0+IHtcbiAgICAgICRidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMucHJvcGFnYXRlKGluZGV4KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvcGFnYXRlKGluZGV4KSB7XG4gICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+IHRoaXMuX21heEluZGV4KSByZXR1cm47XG5cbiAgICB0aGlzLl9jdXJyZW50SW5kZXggPSBpbmRleDtcbiAgICB0aGlzLl92YWx1ZSA9IHRoaXMub3B0aW9uc1tpbmRleF07XG4gICAgdGhpcy5faGlnaGxpZ2h0QnRuKHRoaXMuX2N1cnJlbnRJbmRleCk7XG5cbiAgICB0aGlzLl9leGVjdXRlTGlzdGVuZXJzKHRoaXMuX3ZhbHVlKTtcbiAgfVxuXG4gIF9oaWdobGlnaHRCdG4oYWN0aXZlSW5kZXgpIHtcbiAgICB0aGlzLiRidG5zLmZvckVhY2goKCRidG4sIGluZGV4KSA9PiB7XG4gICAgICAkYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXG4gICAgICBpZiAoYWN0aXZlSW5kZXggPT09IGluZGV4KSB7XG4gICAgICAgICRidG4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0QnV0dG9ucztcbiIsImltcG9ydCBCYXNlQ29udHJvbGxlciBmcm9tICcuL0Jhc2VDb250cm9sbGVyJztcbmltcG9ydCAqIGFzIGVsZW1lbnRzIGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcblxuY2xhc3MgU2VsZWN0TGlzdCBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IobGVnZW5kLCBvcHRpb25zLCBkZWZhdWx0VmFsdWUsICRjb250YWluZXIgPSBudWxsLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy50eXBlID0gJ3NlbGVjdC1saXN0JztcbiAgICB0aGlzLmxlZ2VuZCA9IGxlZ2VuZDtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuX3ZhbHVlID0gZGVmYXVsdFZhbHVlO1xuICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IHRoaXMub3B0aW9ucy5pbmRleE9mKHRoaXMuX3ZhbHVlKTtcbiAgICB0aGlzLl9jdXJyZW50SW5kZXggPSBjdXJyZW50SW5kZXggPT09IC0xID/CoDAgOiBjdXJyZW50SW5kZXg7XG4gICAgdGhpcy5fbWF4SW5kZXggPSB0aGlzLm9wdGlvbnMubGVuZ3RoIC0gMTtcblxuICAgIHN1cGVyLl9hcHBseU9wdGlvbm5hbFBhcmFtZXRlcnMoJGNvbnRhaW5lciwgY2FsbGJhY2spO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuJHNlbGVjdC52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5fY3VycmVudEluZGV4ID0gdGhpcy5vcHRpb25zLmluZGV4T2YodmFsdWUpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBgXG4gICAgICA8c3BhbiBjbGFzcz1cImxlZ2VuZFwiPiR7dGhpcy5sZWdlbmR9PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImlubmVyLXdyYXBwZXJcIj5cbiAgICAgICAgJHtlbGVtZW50cy5hcnJvd0xlZnR9XG4gICAgICAgIDxzZWxlY3Q+XG4gICAgICAgICR7dGhpcy5vcHRpb25zLm1hcCgob3B0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgIHJldHVybiBgPG9wdGlvbiB2YWx1ZT1cIiR7b3B0aW9ufVwiPiR7b3B0aW9ufTwvb3B0aW9uPmA7XG4gICAgICAgIH0pLmpvaW4oJycpfVxuICAgICAgICA8c2VsZWN0PlxuICAgICAgICAke2VsZW1lbnRzLmFycm93UmlnaHR9XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIodGhpcy50eXBlKTtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKCdhbGlnbi1zbWFsbCcpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiRwcmV2ID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmFycm93LWxlZnQnKTtcbiAgICB0aGlzLiRuZXh0ID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmFycm93LXJpZ2h0Jyk7XG4gICAgdGhpcy4kc2VsZWN0ID0gdGhpcy4kZWwucXVlcnlTZWxlY3Rvcignc2VsZWN0Jyk7XG4gICAgLy8gc2V0IHRvIGRlZmF1bHQgdmFsdWVcbiAgICB0aGlzLiRzZWxlY3QudmFsdWUgPSB0aGlzLm9wdGlvbnNbdGhpcy5fY3VycmVudEluZGV4XTtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kcHJldi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fY3VycmVudEluZGV4IC0gMTtcbiAgICAgIHRoaXMucHJvcGFnYXRlKGluZGV4KTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICB0aGlzLiRuZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9jdXJyZW50SW5kZXggKyAxO1xuICAgICAgdGhpcy5wcm9wYWdhdGUoaW5kZXgpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIHRoaXMuJHNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuJHNlbGVjdC52YWx1ZTtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5vcHRpb25zLmluZGV4T2YodmFsdWUpO1xuICAgICAgdGhpcy5wcm9wYWdhdGUoaW5kZXgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvcGFnYXRlKGluZGV4KSB7XG4gICAgaWYgKGluZGV4IDwgMCB8fMKgaW5kZXggPiB0aGlzLl9tYXhJbmRleCkgcmV0dXJuO1xuXG4gICAgY29uc29sZS5sb2coaW5kZXgpO1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5vcHRpb25zW2luZGV4XTtcbiAgICB0aGlzLl9jdXJyZW50SW5kZXggPSBpbmRleDtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuJHNlbGVjdC52YWx1ZSA9IHZhbHVlO1xuXG4gICAgdGhpcy5fZXhlY3V0ZUxpc3RlbmVycyh0aGlzLl92YWx1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0TGlzdDtcbiIsImltcG9ydCBCYXNlQ29udHJvbGxlciBmcm9tICcuL0Jhc2VDb250cm9sbGVyJztcbmltcG9ydCAqIGFzIGd1aUNvbXBvbmVudHMgZnJvbSAnZ3VpLWNvbXBvbmVudHMnO1xuXG5jbGFzcyBTbGlkZXIgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgbWluID0gMCwgbWF4ID0gMSwgc3RlcCA9IDAuMDEsIGRlZmF1bHRWYWx1ZSA9IDAsIHVuaXQgPSAnJywgc2l6ZSA9ICdkZWZhdWx0JywgJGNvbnRhaW5lciA9IG51bGwsIGNhbGxiYWNrID0gbnVsbCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnR5cGUgPSAnc2xpZGVyJztcbiAgICB0aGlzLmxlZ2VuZCA9IGxlZ2VuZDtcbiAgICB0aGlzLm1pbiA9IG1pbjtcbiAgICB0aGlzLm1heCA9IG1heDtcbiAgICB0aGlzLnN0ZXAgPSBzdGVwO1xuICAgIHRoaXMudW5pdCA9IHVuaXQ7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICB0aGlzLl92YWx1ZSA9IGRlZmF1bHRWYWx1ZTtcblxuICAgIHRoaXMuX29uU2xpZGVyQ2hhbmdlID0gdGhpcy5fb25TbGlkZXJDaGFuZ2UuYmluZCh0aGlzKTtcblxuICAgIHN1cGVyLl9hcHBseU9wdGlvbm5hbFBhcmFtZXRlcnMoJGNvbnRhaW5lciwgY2FsbGJhY2spO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcblxuICAgIGlmICh0aGlzLiRudW1iZXIgJiYgdGhpcy4kcmFuZ2UpIHtcbiAgICAgIHRoaXMuJG51bWJlci52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICB0aGlzLiRyYW5nZS52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjb250ZW50ID0gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJsZWdlbmRcIj4ke3RoaXMubGVnZW5kfTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbm5lci13cmFwcGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyYW5nZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibnVtYmVyLXdyYXBwZXJcIj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwibnVtYmVyXCIgbWluPVwiJHt0aGlzLm1pbn1cIiBtYXg9XCIke3RoaXMubWF4fVwiIHN0ZXA9XCIke3RoaXMuc3RlcH1cIiB2YWx1ZT1cIiR7dGhpcy52YWx1ZX1cIiAvPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwidW5pdFwiPiR7dGhpcy51bml0fTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIodGhpcy50eXBlKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoYHNsaWRlci0ke3RoaXMuc2l6ZX1gKTtcblxuICAgIHRoaXMuJHJhbmdlID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLnJhbmdlJyk7XG4gICAgdGhpcy4kbnVtYmVyID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcihgaW5wdXRbdHlwZT1cIm51bWJlclwiXWApO1xuXG4gICAgdGhpcy5zbGlkZXIgPSBuZXcgZ3VpQ29tcG9uZW50cy5TbGlkZXIoe1xuICAgICAgY29udGFpbmVyOiB0aGlzLiRyYW5nZSxcbiAgICAgIGNhbGxiYWNrOiB0aGlzLl9vblNsaWRlckNoYW5nZSxcbiAgICAgIG1pbjogdGhpcy5taW4sXG4gICAgICBtYXg6IHRoaXMubWF4LFxuICAgICAgc3RlcDogdGhpcy5zdGVwLFxuICAgICAgZGVmYXVsdDogdGhpcy52YWx1ZSxcbiAgICAgIGZvcmVncm91bmRDb2xvcjogJyNhYmFiYWInLFxuICAgIH0pO1xuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJG51bWJlci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHBhcnNlRmxvYXQodGhpcy4kbnVtYmVyLnZhbHVlKTtcbiAgICAgIHRoaXMuc2xpZGVyLnZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuXG4gICAgICB0aGlzLl9leGVjdXRlTGlzdGVuZXJzKHRoaXMuX3ZhbHVlKTtcbiAgICB9LCBmYWxzZSk7XG4gIH1cblxuICBvblJlc2l6ZSgpIHtcbiAgICBzdXBlci5vblJlc2l6ZSgpO1xuXG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0wqB9ID0gdGhpcy4kcmFuZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdGhpcy5zbGlkZXIucmVzaXplKHdpZHRoLCBoZWlnaHQpO1xuICB9XG5cbiAgX29uU2xpZGVyQ2hhbmdlKHZhbHVlKSB7XG4gICAgdGhpcy4kbnVtYmVyLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcblxuICAgIHRoaXMuX2V4ZWN1dGVMaXN0ZW5lcnModGhpcy5fdmFsdWUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNsaWRlcjtcbiIsImltcG9ydCBCYXNlQ29udHJvbGxlciBmcm9tICcuL0Jhc2VDb250cm9sbGVyJztcblxuXG4vKipcbiAqIERpc3BsYXkgYSB2YWx1ZSwgUmVhZC1vbmx5LlxuICovXG5jbGFzcyBUZXh0IGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihsZWdlbmQsIGRlZmF1bHRWYWx1ZSwgcmVhZG9ubHkgPSB0cnVlLCAkY29udGFpbmVyID0gbnVsbCwgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudHlwZSA9ICd0ZXh0JztcbiAgICB0aGlzLmxlZ2VuZCA9IGxlZ2VuZDtcbiAgICB0aGlzLl9yZWFkb25seSA9IHJlYWRvbmx5O1xuICAgIHRoaXMuX3ZhbHVlID0gZGVmYXVsdFZhbHVlO1xuXG4gICAgdGhpcy5fYXBwbHlPcHRpb25uYWxQYXJhbWV0ZXJzKCRjb250YWluZXIsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLiRpbnB1dC52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgcmVhZG9ubHkgPSB0aGlzLl9yZWFkb25seSA/ICdyZWFkb25seScgOiAnJ1xuICAgIGNvbnN0IGNvbnRlbnQgPSBgXG4gICAgICA8c3BhbiBjbGFzcz1cImxlZ2VuZFwiPiR7dGhpcy5sZWdlbmR9PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImlubmVyLXdyYXBwZXJcIj5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwidGV4dFwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCIke3RoaXMuX3ZhbHVlfVwiICR7cmVhZG9ubHl9IC8+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIodGhpcy50eXBlKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gICAgdGhpcy4kaW5wdXQgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcudGV4dCcpO1xuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKCkgPT4ge1xuICAgICAgdGhpcy5fdmFsdWUgPSB0aGlzLiRpbnB1dC52YWx1ZTtcbiAgICAgIHRoaXMuX2V4ZWN1dGVMaXN0ZW5lcnModGhpcy5fdmFsdWUpO1xuICAgIH0sIGZhbHNlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUZXh0O1xuIiwiaW1wb3J0IEJhc2VDb250cm9sbGVyIGZyb20gJy4vQmFzZUNvbnRyb2xsZXInO1xuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi91dGlscy9zdHlsZXMnO1xuXG5jbGFzcyBUaXRsZSBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IobGVnZW5kLCAkY29udGFpbmVyID0gbnVsbCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnR5cGUgPSAndGl0bGUnO1xuICAgIHRoaXMubGVnZW5kID0gbGVnZW5kO1xuXG4gICAgc3VwZXIuX2FwcGx5T3B0aW9ubmFsUGFyYW1ldGVycygkY29udGFpbmVyKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgY29udGVudCA9IGA8c3BhbiBjbGFzcz1cImxlZ2VuZFwiPiR7dGhpcy5sZWdlbmR9PC9zcGFuPmA7XG5cbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcih0aGlzLnR5cGUpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGl0bGU7XG4iLCJpbXBvcnQgQmFzZUNvbnRyb2xsZXIgZnJvbSAnLi9CYXNlQ29udHJvbGxlcic7XG5pbXBvcnQgKiBhcyBlbGVtZW50cyBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5cbmNsYXNzIFRvZ2dsZSBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IobGVnZW5kLCBhY3RpdmUgPSBmYWxzZSwgJGNvbnRhaW5lciA9IGZhbHNlLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy50eXBlID0gJ3RvZ2dsZSc7XG4gICAgdGhpcy5sZWdlbmQgPSBsZWdlbmQ7XG4gICAgdGhpcy5fYWN0aXZlID0gYWN0aXZlO1xuXG4gICAgc3VwZXIuX2FwcGx5T3B0aW9ubmFsUGFyYW1ldGVycygkY29udGFpbmVyLCBjYWxsYmFjayk7XG4gIH1cblxuICBzZXQgdmFsdWUoYm9vbCkge1xuICAgIHRoaXMuYWN0aXZlID0gYm9vbDtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICAvLyBhbGlhcyB2YWx1ZVxuICBzZXQgYWN0aXZlKGJvb2wpIHtcbiAgICB0aGlzLl9hY3RpdmUgPSBib29sO1xuICAgIHRoaXMuX3VwZGF0ZUJ0bigpO1xuICB9XG5cbiAgZ2V0IGFjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlO1xuICB9XG5cbiAgX3VwZGF0ZUJ0bigpIHtcbiAgICB2YXIgbWV0aG9kID0gdGhpcy5hY3RpdmUgPyAnYWRkJyA6ICdyZW1vdmUnO1xuICAgIHRoaXMuJHRvZ2dsZS5jbGFzc0xpc3RbbWV0aG9kXSgnYWN0aXZlJyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBgXG4gICAgICA8c3BhbiBjbGFzcz1cImxlZ2VuZFwiPiR7dGhpcy5sZWdlbmR9PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImlubmVyLXdyYXBwZXJcIj5cbiAgICAgICAgJHtlbGVtZW50cy50b2dnbGV9XG4gICAgICA8L2Rpdj5gO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIodGhpcy50eXBlKTtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKCdhbGlnbi1zbWFsbCcpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiR0b2dnbGUgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcudG9nZ2xlLWVsZW1lbnQnKTtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB0aGlzLmFjdGl2ZSA9IHRoaXMuX2FjdGl2ZTsgLy8gaW5pdGlhbGl6ZSBzdGF0ZVxuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLiR0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB0aGlzLmFjdGl2ZSA9ICF0aGlzLmFjdGl2ZTtcbiAgICAgIHRoaXMuX2V4ZWN1dGVMaXN0ZW5lcnModGhpcy5fYWN0aXZlKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUb2dnbGU7XG4iLCJpbXBvcnQgQmFzZUNvbnRyb2xsZXIgZnJvbSAnLi9CYXNlQ29udHJvbGxlcic7XG5cbmNsYXNzIFRyaWdnZXJCdXR0b25zIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihsZWdlbmQsIGxhYmVscywgJGNvbnRhaW5lciA9IG51bGwsIGNhbGxiYWNrID0gbnVsbCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnR5cGUgPSAnYnV0dG9ucyc7XG4gICAgdGhpcy5sZWdlbmQgPSBsZWdlbmQgfHzCoCcmbmJzcCc7IC8vIG5vbiBicmVha2FibGUgc3BhY2UgdG8ga2VlcCByZW5kZXJpbmcgY29uc2lzdGVuY3lcbiAgICB0aGlzLmxhYmVscyA9IGxhYmVscztcbiAgICB0aGlzLl9pbmRleCA9IG51bGw7XG4gICAgdGhpcy5fdmFsdWUgPSBudWxsO1xuXG4gICAgc3VwZXIuX2FwcGx5T3B0aW9ubmFsUGFyYW1ldGVycygkY29udGFpbmVyLCBjYWxsYmFjayk7XG4gIH1cblxuICAvKipcbiAgICogTGFzdCB0cmlnZ2VyZWQgbGFiZWxcbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBgXG4gICAgICA8c3BhbiBjbGFzcz1cImxlZ2VuZFwiPiR7dGhpcy5sZWdlbmR9PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImlubmVyLXdyYXBwZXJcIj5cbiAgICAgICAgJHt0aGlzLmxhYmVscy5tYXAoKGxhYmVsLCBpbmRleCkgPT4ge1xuICAgICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiYnRuXCI+XG4gICAgICAgICAgICAgICR7bGFiZWx9XG4gICAgICAgICAgICA8L2E+YDtcbiAgICAgICAgfSkuam9pbignJyl9XG4gICAgICA8L2Rpdj5gO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIodGhpcy50eXBlKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gICAgdGhpcy4kYnV0dG9ucyA9IEFycmF5LmZyb20odGhpcy4kZWwucXVlcnlTZWxlY3RvckFsbCgnLmJ0bicpKTtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kYnV0dG9ucy5mb3JFYWNoKCgkYnRuLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmxhYmVsc1tpbmRleF07XG5cbiAgICAgICRidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy5fdmFsdWUgPSBsYWJlbDtcbiAgICAgICAgdGhpcy5fZXhlY3V0ZUxpc3RlbmVycyhsYWJlbCwgaW5kZXgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHJpZ2dlckJ1dHRvbnM7XG4iLCJpbXBvcnQgKiBhcyBfc3R5bGVzIGZyb20gJy4vdXRpbHMvc3R5bGVzJztcbmV4cG9ydCBjb25zdCBzdHlsZXMgPSBfc3R5bGVzO1xuXG4vKipcbiAqIEBtb2R1bGUgYmFzaWMtY29udHJvbGxlcnNcbiAqL1xuXG4vLyBleHBvc2UgZm9yIHBsdWdpbnNcbmltcG9ydCBfQmFzZUNvbnRyb2xsZXIgZnJvbSAnLi9jb21wb25lbnRzL0Jhc2VDb250cm9sbGVyJztcbmV4cG9ydCBjb25zdCBCYXNlQ29udHJvbGxlciA9IF9CYXNlQ29udHJvbGxlcjtcblxuZXhwb3J0IHsgZGVmYXVsdCBhcyBHcm91cCB9IGZyb20gJy4vY29tcG9uZW50cy9Hcm91cCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE51bWJlckJveCB9IGZyb20gJy4vY29tcG9uZW50cy9OdW1iZXJCb3gnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTZWxlY3RCdXR0b25zIH0gZnJvbSAnLi9jb21wb25lbnRzL1NlbGVjdEJ1dHRvbnMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTZWxlY3RMaXN0IH0gZnJvbSAnLi9jb21wb25lbnRzL1NlbGVjdExpc3QnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTbGlkZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvU2xpZGVyJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVGV4dCB9IGZyb20gJy4vY29tcG9uZW50cy9UZXh0JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVGl0bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvVGl0bGUnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBUb2dnbGUgfSBmcm9tICcuL2NvbXBvbmVudHMvVG9nZ2xlJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVHJpZ2dlckJ1dHRvbnMgfSBmcm9tICcuL2NvbXBvbmVudHMvVHJpZ2dlckJ1dHRvbnMnO1xuXG4vKipcbiAqIENoYW5nZSB0aGUgdGhlbWUgb2YgdGhlIGNvbnRyb2xsZXJzLCBjdXJyZW50bHkgMyB0aGVtZXMgYXJlIGF2YWlsYWJsZTpcbiAqICAtICdsaWdodCcgKGRlZmF1bHQpXG4gKiAgLSAnZ3JleSdcbiAqICAtICdkYXJrJ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0aGVtZSAtIE5hbWUgb2YgdGhlIHRoZW1lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0VGhlbWUodGhlbWUpIHtcbiAgX0Jhc2VDb250cm9sbGVyLnRoZW1lID0gdGhlbWU7XG59O1xuXG4vKipcbiAqIERpc2FibGUgZGVmYXVsdCBzdHlsaW5nIChleHBlY3QgYSBicm9rZW4gdWkpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlU3R5bGVzKCkge1xuICBfc3R5bGVzLmRpc2FibGUoKTtcbn07XG5cbiIsIlxuZXhwb3J0IGNvbnN0IHRvZ2dsZSA9IGBcbiAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3M9XCJ0b2dnbGUtZWxlbWVudFwiIHZlcnNpb249XCIxLjFcIiB2aWV3Qm94PVwiMCAwIDUwIDUwXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cIm5vbmVcIj5cbiAgICAgIDxnIGNsYXNzPVwieFwiPlxuICAgICAgICA8bGluZSB4MT1cIjhcIiB5MT1cIjhcIiB4Mj1cIjQyXCIgeTI9XCI0MlwiIHN0cm9rZT1cIndoaXRlXCIgLz5cbiAgICAgICAgPGxpbmUgeDE9XCI4XCIgeTE9XCI0MlwiIHgyPVwiNDJcIiB5Mj1cIjhcIiBzdHJva2U9XCJ3aGl0ZVwiIC8+XG4gICAgICA8L2c+XG4gIDwvc3ZnPlxuYDtcblxuZXhwb3J0IGNvbnN0IGFycm93UmlnaHQgPSBgXG4gIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzPVwiYXJyb3ctcmlnaHRcIiB2ZXJzaW9uPVwiMS4xXCIgdmlld0JveD1cIjAgMCA1MCA1MFwiIHByZXNlcnZlQXNwZWN0UmF0aW89XCJub25lXCI+XG4gICAgPGxpbmUgeDE9XCIxMFwiIHkxPVwiMTBcIiB4Mj1cIjQwXCIgeTI9XCIyNVwiIC8+XG4gICAgPGxpbmUgeDE9XCIxMFwiIHkxPVwiNDBcIiB4Mj1cIjQwXCIgeTI9XCIyNVwiIC8+XG4gIDwvc3ZnPlxuYDtcblxuZXhwb3J0IGNvbnN0IGFycm93TGVmdCA9IGBcbiAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3M9XCJhcnJvdy1sZWZ0XCIgdmVyc2lvbj1cIjEuMVwiIHZpZXdCb3g9XCIwIDAgNTAgNTBcIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwibm9uZVwiPlxuICAgIDxsaW5lIHgxPVwiNDBcIiB5MT1cIjEwXCIgeDI9XCIxMFwiIHkyPVwiMjVcIiAvPlxuICAgIDxsaW5lIHgxPVwiNDBcIiB5MT1cIjQwXCIgeDI9XCIxMFwiIHkyPVwiMjVcIiAvPlxuICA8L3N2Zz5cbmA7XG5cbmV4cG9ydCBjb25zdCBzbWFsbEFycm93UmlnaHQgPSBgXG4gIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzPVwic21hbGwtYXJyb3ctcmlnaHRcIiB2aWV3Qm94PVwiMCAwIDUwIDUwXCI+XG4gICAgPHBhdGggZD1cIk0gMjAgMTUgTCAzNSAyNSBMIDIwIDM1IFpcIiAvPlxuICA8L3N2Zz5cbmA7XG5cbmV4cG9ydCBjb25zdCBzbWFsbEFycm93Qm90dG9tID0gYFxuICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzcz1cInNtYWxsLWFycm93LWJvdHRvbVwiIHZpZXdCb3g9XCIwIDAgNTAgNTBcIj5cbiAgICA8cGF0aCBkPVwiTSAxNSAxNyBMIDM1IDE3IEwgMjUgMzIgWlwiIC8+XG4gIDwvc3ZnPlxuYDtcblxuXG5cbiIsIm1vZHVsZS5leHBvcnRzID0gXCIgLmJhc2ljLWNvbnRyb2xsZXJzIHsgfSAuYmFzaWMtY29udHJvbGxlcnMgeyB3aWR0aDogMTAwJTsgbWF4LXdpZHRoOiA4MDBweDsgaGVpZ2h0OiAzNHB4OyBwYWRkaW5nOiAzcHg7IG1hcmdpbjogNHB4IGF1dG87IGJhY2tncm91bmQtY29sb3I6ICNlZmVmZWY7IGJvcmRlcjogMXB4IHNvbGlkICNhYWFhYWE7IGJveC1zaXppbmc6IGJvcmRlci1ib3g7IGJvcmRlci1yYWRpdXM6IDJweDsgZGlzcGxheTogYmxvY2s7IGNvbG9yOiAjNDY0NjQ2OyAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7IC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7IC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTsgLW1vei11c2VyLXNlbGVjdDogbm9uZTsgLW1zLXVzZXItc2VsZWN0OiBub25lOyB1c2VyLXNlbGVjdDogbm9uZTsgfSAuYmFzaWMtY29udHJvbGxlcnMgLmxhYmVsIHsgZm9udDogaXRhbGljIG5vcm1hbCAxLjJlbSBRdWlja3NhbmQsIGFyaWFsLCBzYW5zLXNlcmlmOyBsaW5lLWhlaWdodDogMjZweDsgb3ZlcmZsb3c6IGhpZGRlbjsgdGV4dC1hbGlnbjogcmlnaHQ7IHBhZGRpbmc6IDAgOHB4IDAgMDsgZGlzcGxheTogYmxvY2s7IGJveC1zaXppbmc6IGJvcmRlci1ib3g7IHdpZHRoOiAyNCU7IGZsb2F0OiBsZWZ0OyB3aGl0ZS1zcGFjZTogbm93cmFwOyAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lOyAtbW96LXVzZXItc2VsZWN0OiBub25lOyAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7IC1vLXVzZXItc2VsZWN0OiBub25lOyB1c2VyLXNlbGVjdDogbm9uZTsgfSAuYmFzaWMtY29udHJvbGxlcnMgLmlubmVyLXdyYXBwZXIgeyBkaXNwbGF5OiAtd2Via2l0LWlubGluZS1mbGV4OyBkaXNwbGF5OiBpbmxpbmUtZmxleDsgLXdlYmtpdC1mbGV4LXdyYXA6IG5vLXdyYXA7IGZsZXgtd3JhcDogbm8td3JhcDsgd2lkdGg6IDc2JTsgZmxvYXQ6IGxlZnQ7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsIHsgaGVpZ2h0OiA0OHB4OyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbDpub3QoLmFsaWduLXNtYWxsKSB7IGhlaWdodDogYXV0bzsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGw6bm90KC5hbGlnbi1zbWFsbCkgLmxhYmVsIHsgd2lkdGg6IDEwMCU7IGZsb2F0OiBub25lOyB0ZXh0LWFsaWduOiBsZWZ0OyBsaW5lLWhlaWdodDogNDBweDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGw6bm90KC5hbGlnbi1zbWFsbCkgLmlubmVyLXdyYXBwZXIgeyB3aWR0aDogMTAwJTsgZmxvYXQ6IG5vbmU7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsLmFsaWduLXNtYWxsIC5sYWJlbCB7IGRpc3BsYXk6IGJsb2NrOyBtYXJnaW4tcmlnaHQ6IDIwcHg7IHRleHQtYWxpZ246IGxlZnQ7IGxpbmUtaGVpZ2h0OiA0MHB4OyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbC5hbGlnbi1zbWFsbCAuaW5uZXItd3JhcHBlciB7IGRpc3BsYXk6IGlubGluZS1ibG9jazsgd2lkdGg6IGF1dG87IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC5hcnJvdy1yaWdodCwgLmJhc2ljLWNvbnRyb2xsZXJzIC5hcnJvdy1sZWZ0IHsgYm9yZGVyLXJhZGl1czogMnB4OyB3aWR0aDogMTRweDsgaGVpZ2h0OiAyNnB4OyBjdXJzb3I6IHBvaW50ZXI7IGJhY2tncm91bmQtY29sb3I6ICM0NjQ2NDY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC5hcnJvdy1yaWdodCBsaW5lLCAuYmFzaWMtY29udHJvbGxlcnMgLmFycm93LWxlZnQgbGluZSB7IHN0cm9rZS13aWR0aDogM3B4OyBzdHJva2U6ICNmZmZmZmY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC5hcnJvdy1yaWdodDpob3ZlciwgLmJhc2ljLWNvbnRyb2xsZXJzIC5hcnJvdy1sZWZ0OmhvdmVyIHsgYmFja2dyb3VuZC1jb2xvcjogIzY4Njg2ODsgfSAuYmFzaWMtY29udHJvbGxlcnMgLmFycm93LXJpZ2h0OmFjdGl2ZSwgLmJhc2ljLWNvbnRyb2xsZXJzIC5hcnJvdy1sZWZ0OmFjdGl2ZSB7IGJhY2tncm91bmQtY29sb3I6ICM5MDkwOTA7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC5zbWFsbC1hcnJvdy1yaWdodCwgLmJhc2ljLWNvbnRyb2xsZXJzIC5zbWFsbC1hcnJvdy1ib3R0b20geyB3aWR0aDogMjZweDsgaGVpZ2h0OiAyNnB4OyBjdXJzb3I6IHBvaW50ZXI7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC5zbWFsbC1hcnJvdy1yaWdodCBwYXRoLCAuYmFzaWMtY29udHJvbGxlcnMgLnNtYWxsLWFycm93LWJvdHRvbSBwYXRoIHsgZmlsbDogIzkwOTA5MDsgfSAuYmFzaWMtY29udHJvbGxlcnMgLnNtYWxsLWFycm93LXJpZ2h0OmhvdmVyIHBhdGgsIC5iYXNpYy1jb250cm9sbGVycyAuc21hbGwtYXJyb3ctYm90dG9tOmhvdmVyIHBhdGggeyBmaWxsOiAjNjg2ODY4OyB9IC5iYXNpYy1jb250cm9sbGVycyAudG9nZ2xlLWVsZW1lbnQgeyB3aWR0aDogMjZweDsgaGVpZ2h0OiAyNnB4OyBib3JkZXItcmFkaXVzOiAycHg7IGJhY2tncm91bmQtY29sb3I6ICM0NjQ2NDY7IGN1cnNvcjogcG9pbnRlcjsgfSAuYmFzaWMtY29udHJvbGxlcnMgLnRvZ2dsZS1lbGVtZW50OmhvdmVyIHsgYmFja2dyb3VuZC1jb2xvcjogIzY4Njg2ODsgfSAuYmFzaWMtY29udHJvbGxlcnMgLnRvZ2dsZS1lbGVtZW50IGxpbmUgeyBzdHJva2Utd2lkdGg6IDNweDsgfSAuYmFzaWMtY29udHJvbGxlcnMgLnRvZ2dsZS1lbGVtZW50IC54IHsgZGlzcGxheTogbm9uZTsgfSAuYmFzaWMtY29udHJvbGxlcnMgLnRvZ2dsZS1lbGVtZW50LmFjdGl2ZSAueCB7IGRpc3BsYXk6IGJsb2NrOyB9IC5iYXNpYy1jb250cm9sbGVycyAuYnRuIHsgZGlzcGxheTogYmxvY2s7IHRleHQtYWxpZ246IGNlbnRlcjsgZm9udDogbm9ybWFsIG5vcm1hbCAxMnB4IGFyaWFsOyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IGhlaWdodDogMjZweDsgbGluZS1oZWlnaHQ6IDI2cHg7IGJhY2tncm91bmQtY29sb3I6ICM0NjQ2NDY7IGJvcmRlcjogbm9uZTsgY29sb3I6ICNmZmZmZmY7IG1hcmdpbjogMCA0cHggMCAwOyBwYWRkaW5nOiAwOyBib3gtc2l6aW5nOiBib3JkZXItYm94OyBib3JkZXItcmFkaXVzOiAycHg7IGN1cnNvcjogcG9pbnRlcjsgLXdlYmtpdC1mbGV4LWdyb3c6IDE7IGZsZXgtZ3JvdzogMTsgfSAuYmFzaWMtY29udHJvbGxlcnMgLmJ0bjpsYXN0LWNoaWxkIHsgbWFyZ2luOiAwOyB9IC5iYXNpYy1jb250cm9sbGVycyAuYnRuOmhvdmVyIHsgYmFja2dyb3VuZC1jb2xvcjogIzY4Njg2ODsgfSAuYmFzaWMtY29udHJvbGxlcnMgLmJ0bjphY3RpdmUsIC5iYXNpYy1jb250cm9sbGVycyAuYnRuLmFjdGl2ZSB7IGJhY2tncm91bmQtY29sb3I6ICM5MDkwOTA7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC5idG46Zm9jdXMgeyBvdXRsaW5lOiBub25lOyB9IC5iYXNpYy1jb250cm9sbGVycyAubnVtYmVyIHsgaGVpZ2h0OiAyNnB4OyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHBvc2l0aW9uOiByZWxhdGl2ZTsgZm9udDogbm9ybWFsIG5vcm1hbCAxLjJlbSBRdWlja3NhbmQsIGFyaWFsLCBzYW5zLXNlcmlmOyB2ZXJ0aWNhbC1hbGlnbjogdG9wOyBib3JkZXI6IG5vbmU7IGJhY2tncm91bmQ6IG5vbmU7IGNvbG9yOiAjNDY0NjQ2OyBwYWRkaW5nOiAwIDRweDsgbWFyZ2luOiAwOyBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5OyBib3JkZXItcmFkaXVzOiAycHg7IGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC5udW1iZXI6Zm9jdXMgeyBvdXRsaW5lOiBub25lOyB9IC5iYXNpYy1jb250cm9sbGVycyBzZWxlY3QgeyBoZWlnaHQ6IDI2cHg7IGxpbmUtaGVpZ2h0OiAyNnB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5OyBib3JkZXItcmFkaXVzOiAycHg7IGJvcmRlcjogbm9uZTsgdmVydGljYWwtYWxpZ246IHRvcDsgcGFkZGluZzogMDsgbWFyZ2luOiAwOyB9IC5iYXNpYy1jb250cm9sbGVycyBzZWxlY3Q6Zm9jdXMgeyBvdXRsaW5lOiBub25lOyB9IC5iYXNpYy1jb250cm9sbGVycyBpbnB1dFt0eXBlPXRleHRdIHsgd2lkdGg6IDEwMCU7IGhlaWdodDogMjZweDsgbGluZS1oZWlnaHQ6IDI2cHg7IGJvcmRlcjogMDsgcGFkZGluZzogMCA0cHg7IGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7IGJvcmRlci1yYWRpdXM6IDJweDsgY29sb3I6ICM1NjU2NTY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsIC5hcnJvdy1yaWdodCwgLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsIC5hcnJvdy1sZWZ0IHsgd2lkdGg6IDI0cHg7IGhlaWdodDogNDBweDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGwgLnRvZ2dsZS1lbGVtZW50IHsgd2lkdGg6IDQwcHg7IGhlaWdodDogNDBweDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGwgLmJ0biB7IGhlaWdodDogNDBweDsgbGluZS1oZWlnaHQ6IDQwcHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsIC5udW1iZXIgeyBoZWlnaHQ6IDQwcHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsIHNlbGVjdCB7IGhlaWdodDogNDBweDsgbGluZS1oZWlnaHQ6IDQwcHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsIGlucHV0W3R5cGU9dGV4dF0geyBoZWlnaHQ6IDQwcHg7IGxpbmUtaGVpZ2h0OiA0MHB4OyB9IC5iYXNpYy1jb250cm9sbGVycy50aXRsZSB7IGJvcmRlcjogbm9uZSAhaW1wb3J0YW50OyBtYXJnaW4tYm90dG9tOiAwOyBtYXJnaW4tdG9wOiA4cHg7IHBhZGRpbmctdG9wOiA4cHg7IHBhZGRpbmctYm90dG9tOiAwOyBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50OyBoZWlnaHQ6IDI1cHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnRpdGxlIC5sYWJlbCB7IGZvbnQ6IG5vcm1hbCBib2xkIDEuM2VtIFF1aWNrc2FuZCwgYXJpYWwsIHNhbnMtc2VyaWY7IGhlaWdodDogMTAwJTsgb3ZlcmZsb3c6IGhpZGRlbjsgdGV4dC1hbGlnbjogbGVmdDsgcGFkZGluZzogMDsgd2lkdGg6IDEwMCU7IGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC13ZWJraXQtZmxleC1ncm93OiAxOyBmbGV4LWdyb3c6IDE7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyb3VwIHsgaGVpZ2h0OiBhdXRvOyBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JvdXAgLmdyb3VwLWhlYWRlciAubGFiZWwgeyBmb250OiBub3JtYWwgYm9sZCAxLjNlbSBRdWlja3NhbmQsIGFyaWFsLCBzYW5zLXNlcmlmOyBoZWlnaHQ6IDI2cHg7IGxpbmUtaGVpZ2h0OiAyNnB4OyBvdmVyZmxvdzogaGlkZGVuOyB0ZXh0LWFsaWduOiBsZWZ0OyBwYWRkaW5nOiAwIDAgMCAzNnB4OyB3aWR0aDogMTAwJTsgYm94LXNpemluZzogYm9yZGVyLWJveDsgLXdlYmtpdC1mbGV4LWdyb3c6IDE7IGZsZXgtZ3JvdzogMTsgZmxvYXQ6IG5vbmU7IGN1cnNvcjogcG9pbnRlcjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JvdXAgLmdyb3VwLWhlYWRlciAuc21hbGwtYXJyb3ctcmlnaHQgeyB3aWR0aDogMjZweDsgaGVpZ2h0OiAyNnB4OyBwb3NpdGlvbjogYWJzb2x1dGU7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyb3VwIC5ncm91cC1oZWFkZXIgLnNtYWxsLWFycm93LWJvdHRvbSB7IHdpZHRoOiAyNnB4OyBoZWlnaHQ6IDI2cHg7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JvdXAgLmdyb3VwLWNvbnRlbnQgeyBvdmVyZmxvdzogaGlkZGVuOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncm91cCAuZ3JvdXAtY29udGVudCBsYWJlbDpsYXN0LWNoaWxkIHsgbWFyZ2luLWJvdHRvbTogMDsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JvdXAub3BlbmVkIC5ncm91cC1oZWFkZXIgLnNtYWxsLWFycm93LXJpZ2h0IHsgZGlzcGxheTogbm9uZTsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JvdXAub3BlbmVkIC5ncm91cC1oZWFkZXIgLnNtYWxsLWFycm93LWJvdHRvbSB7IGRpc3BsYXk6IGJsb2NrOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncm91cC5vcGVuZWQgLmdyb3VwLWNvbnRlbnQgeyBoZWlnaHQ6IGF1dG87IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyb3VwLmNsb3NlZCAuZ3JvdXAtaGVhZGVyIC5zbWFsbC1hcnJvdy1yaWdodCB7IGRpc3BsYXk6IGJsb2NrOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncm91cC5jbG9zZWQgLmdyb3VwLWhlYWRlciAuc21hbGwtYXJyb3ctYm90dG9tIHsgZGlzcGxheTogbm9uZTsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JvdXAuY2xvc2VkIC5ncm91cC1jb250ZW50IHsgaGVpZ2h0OiAwOyB9IC5iYXNpYy1jb250cm9sbGVycy5zbGlkZXIgLnJhbmdlIHsgaGVpZ2h0OiAyNnB4OyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IG1hcmdpbjogMDsgLXdlYmtpdC1mbGV4LWdyb3c6IDQ7IGZsZXgtZ3JvdzogNDsgcG9zaXRpb246IHJlbGF0aXZlOyB9IC5iYXNpYy1jb250cm9sbGVycy5zbGlkZXIgLnJhbmdlIGNhbnZhcyB7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAwOyBsZWZ0OiAwOyB9IC5iYXNpYy1jb250cm9sbGVycy5zbGlkZXIgLm51bWJlci13cmFwcGVyIHsgZGlzcGxheTogaW5saW5lOyBoZWlnaHQ6IDI2cHg7IHRleHQtYWxpZ246IHJpZ2h0OyAtd2Via2l0LWZsZXgtZ3JvdzogMzsgZmxleC1ncm93OiAzOyB9IC5iYXNpYy1jb250cm9sbGVycy5zbGlkZXIgLm51bWJlci13cmFwcGVyIC5udW1iZXIgeyBsZWZ0OiA1cHg7IHdpZHRoOiA1NHB4OyB0ZXh0LWFsaWduOiByaWdodDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc2xpZGVyIC5udW1iZXItd3JhcHBlciAudW5pdCB7IGZvbnQ6IGl0YWxpYyBub3JtYWwgMWVtIFF1aWNrc2FuZCwgYXJpYWwsIHNhbnMtc2VyaWY7IGxpbmUtaGVpZ2h0OiAyNnB4OyBoZWlnaHQ6IDI2cHg7IHdpZHRoOiAzMHB4OyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHBvc2l0aW9uOiByZWxhdGl2ZTsgcGFkZGluZy1sZWZ0OiA1cHg7IHBhZGRpbmctcmlnaHQ6IDVweDsgY29sb3I6ICM1NjU2NTY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNsaWRlciAubnVtYmVyLXdyYXBwZXIgLnVuaXQgc3VwIHsgbGluZS1oZWlnaHQ6IDdweDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc2xpZGVyLnNsaWRlci1sYXJnZSAucmFuZ2UgeyAtd2Via2l0LWZsZXgtZ3JvdzogNTA7IGZsZXgtZ3JvdzogNTA7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNsaWRlci5zbGlkZXItbGFyZ2UgLm51bWJlci13cmFwcGVyIHsgLXdlYmtpdC1mbGV4LWdyb3c6IDE7IGZsZXgtZ3JvdzogMTsgfSAuYmFzaWMtY29udHJvbGxlcnMuc2xpZGVyLnNsaWRlci1zbWFsbCAucmFuZ2UgeyAtd2Via2l0LWZsZXgtZ3JvdzogMjsgZmxleC1ncm93OiAyOyB9IC5iYXNpYy1jb250cm9sbGVycy5zbGlkZXIuc2xpZGVyLXNtYWxsIC5udW1iZXItd3JhcHBlciB7IC13ZWJraXQtZmxleC1ncm93OiA0OyBmbGV4LWdyb3c6IDQ7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLm51bWJlci1ib3ggLm51bWJlciB7IHdpZHRoOiAxMjBweDsgbWFyZ2luOiAwIDEwcHg7IHZlcnRpY2FsLWFsaWduOiB0b3A7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNlbGVjdC1saXN0IHNlbGVjdCB7IG1hcmdpbjogMCAxMHB4OyB3aWR0aDogMTIwcHg7IGZvbnQ6IG5vcm1hbCBub3JtYWwgMS4yZW0gUXVpY2tzYW5kLCBhcmlhbCwgc2Fucy1zZXJpZjsgY29sb3I6ICM0NjQ2NDY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNlbGVjdC1idXR0b25zIC5idG46Zmlyc3Qtb2YtdHlwZSB7IG1hcmdpbi1sZWZ0OiA0cHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnRleHQgaW5wdXRbdHlwZT10ZXh0XSB7IGZvbnQ6IG5vcm1hbCBub3JtYWwgMS4yZW0gUXVpY2tzYW5kLCBhcmlhbCwgc2Fucy1zZXJpZjsgY29sb3I6ICM0NjQ2NDY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsLnNsaWRlciAucmFuZ2UgeyBoZWlnaHQ6IDQwcHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsLnNsaWRlciAubnVtYmVyLXdyYXBwZXIgeyBoZWlnaHQ6IDQwcHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsLnNsaWRlciAubnVtYmVyLXdyYXBwZXIgLnVuaXQgeyBsaW5lLWhlaWdodDogNDBweDsgaGVpZ2h0OiA0MHB4OyB9IC5iYXNpYy1jb250cm9sbGVycy5ncmV5IHsgYmFja2dyb3VuZC1jb2xvcjogIzM2MzYzNjsgYm9yZGVyOiAxcHggc29saWQgIzU4NTg1ODsgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45NSk7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLnRvZ2dsZS1lbGVtZW50IHsgYmFja2dyb3VuZC1jb2xvcjogI2VmZWZlZjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAudG9nZ2xlLWVsZW1lbnQgbGluZSB7IHN0cm9rZTogIzM2MzYzNjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAudG9nZ2xlLWVsZW1lbnQ6aG92ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjY2RjZGNkOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC5hcnJvdy1yaWdodCwgLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLmFycm93LWxlZnQgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC5hcnJvdy1yaWdodCBsaW5lLCAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAuYXJyb3ctbGVmdCBsaW5lIHsgc3Ryb2tlOiAjMzYzNjM2OyB9IC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC5hcnJvdy1yaWdodDpob3ZlciwgLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLmFycm93LWxlZnQ6aG92ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjY2RjZGNkOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC5hcnJvdy1yaWdodDphY3RpdmUsIC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC5hcnJvdy1sZWZ0OmFjdGl2ZSB7IGJhY2tncm91bmQtY29sb3I6ICNhYmFiYWI7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLnNtYWxsLWFycm93LXJpZ2h0IHBhdGgsIC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC5zbWFsbC1hcnJvdy1ib3R0b20gcGF0aCB7IGZpbGw6ICNhYmFiYWI7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLnNtYWxsLWFycm93LXJpZ2h0OmhvdmVyIHBhdGgsIC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC5zbWFsbC1hcnJvdy1ib3R0b206aG92ZXIgcGF0aCB7IGZpbGw6ICNjZGNkY2Q7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLm51bWJlciwgLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgc2VsZWN0LCAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSBpbnB1dFt0eXBlPXRleHRdIHsgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45NSk7IGJhY2tncm91bmQtY29sb3I6ICM0NTQ1NDU7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkgLmJ0biB7IGJhY2tncm91bmQtY29sb3I6ICNlZmVmZWY7IGNvbG9yOiAjMzYzNjM2OyB9IC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC5idG46aG92ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjY2RjZGNkOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncmV5IC5idG46YWN0aXZlLCAuYmFzaWMtY29udHJvbGxlcnMuZ3JleSAuYnRuLmFjdGl2ZSB7IGJhY2tncm91bmQtY29sb3I6ICNhYmFiYWI7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmdyZXkuc2xpZGVyIC5pbm5lci13cmFwcGVyIC5udW1iZXItd3JhcHBlciAudW5pdCB7IGNvbG9yOiAjYmNiY2JjOyB9IC5iYXNpYy1jb250cm9sbGVycy5ncmV5Lmdyb3VwIHsgYmFja2dyb3VuZC1jb2xvcjogIzUwNTA1MDsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyayB7IGJhY2tncm91bmQtY29sb3I6ICMyNDI0MjQ7IGJvcmRlcjogMXB4IHNvbGlkICMyODI4Mjg7IGNvbG9yOiAjZmZmZmZmOyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC50b2dnbGUtZWxlbWVudCB7IGJhY2tncm91bmQtY29sb3I6ICM0NjQ2NDY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLnRvZ2dsZS1lbGVtZW50IGxpbmUgeyBzdHJva2U6ICNmZmZmZmY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLnRvZ2dsZS1lbGVtZW50OmhvdmVyIHsgYmFja2dyb3VuZC1jb2xvcjogIzY4Njg2ODsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYXJyb3ctcmlnaHQsIC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5hcnJvdy1sZWZ0IHsgYmFja2dyb3VuZC1jb2xvcjogIzQ2NDY0NjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYXJyb3ctcmlnaHQgbGluZSwgLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLmFycm93LWxlZnQgbGluZSB7IHN0cm9rZTogI2ZmZmZmZjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYXJyb3ctcmlnaHQ6aG92ZXIsIC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5hcnJvdy1sZWZ0OmhvdmVyIHsgYmFja2dyb3VuZC1jb2xvcjogIzY4Njg2ODsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYXJyb3ctcmlnaHQ6YWN0aXZlLCAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYXJyb3ctbGVmdDphY3RpdmUgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjOTA5MDkwOyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5zbWFsbC1hcnJvdy1yaWdodCBwYXRoLCAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuc21hbGwtYXJyb3ctYm90dG9tIHBhdGggeyBmaWxsOiAjOTA5MDkwOyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5zbWFsbC1hcnJvdy1yaWdodDpob3ZlciBwYXRoLCAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuc21hbGwtYXJyb3ctYm90dG9tOmhvdmVyIHBhdGggeyBmaWxsOiAjNjg2ODY4OyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5udW1iZXIsIC5iYXNpYy1jb250cm9sbGVycy5kYXJrIHNlbGVjdCwgLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgaW5wdXRbdHlwZT10ZXh0XSB7IGNvbG9yOiAjZmZmZmZmOyBiYWNrZ3JvdW5kLWNvbG9yOiAjMzMzMzMzOyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5idG4geyBiYWNrZ3JvdW5kLWNvbG9yOiAjNDY0NjQ2OyBjb2xvcjogI2ZmZmZmZjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYnRuOmhvdmVyIHsgYmFja2dyb3VuZC1jb2xvcjogIzY4Njg2ODsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYnRuOmFjdGl2ZSwgLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLmJ0bi5hY3RpdmUgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjOTA5MDkwOyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrLnNsaWRlciAuaW5uZXItd3JhcHBlciAubnVtYmVyLXdyYXBwZXIgLnVuaXQgeyBjb2xvcjogI2NkY2RjZDsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyay5ncm91cCB7IGJhY2tncm91bmQtY29sb3I6ICMzZTNlM2U7IH0gXCI7IiwiaW1wb3J0IHsgbmFtZSB9IGZyb20gJy4uLy4uL3BhY2thZ2UuanNvbic7XG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vc3R5bGVzLWRlY2xhcmF0aW9ucy5qcyc7XG5cbmV4cG9ydCBjb25zdCBucyA9IG5hbWU7XG5cbmNvbnN0IG5zQ2xhc3MgPSBgLiR7bnN9YDtcbmxldCBfZGlzYWJsZWQgPSBmYWxzZTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gIF9kaXNhYmxlZCA9IHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRTdHlsZVNoZWV0KCkge1xuICBpZiAoX2Rpc2FibGVkKSByZXR1cm47XG5cbiAgY29uc3QgJGNzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICRjc3Muc2V0QXR0cmlidXRlKCdkYXRhLW5hbWVzcGFjZScsIG5zKTtcbiAgJGNzcy50eXBlID0gJ3RleHQvY3NzJztcblxuICBpZiAoJGNzcy5zdHlsZVNoZWV0KVxuICAgICRjc3Muc3R5bGVTaGVldC5jc3NUZXh0ID0gc3R5bGVzO1xuICBlbHNlXG4gICAgJGNzcy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzdHlsZXMpKTtcblxuICAvLyBpbnNlcnQgYmVmb3JlIGxpbmsgb3Igc3R5bGVzIGlmIGV4aXN0c1xuICBjb25zdCAkbGluayA9IGRvY3VtZW50LmhlYWQucXVlcnlTZWxlY3RvcignbGluaycpO1xuICBjb25zdCAkc3R5bGUgPSBkb2N1bWVudC5oZWFkLnF1ZXJ5U2VsZWN0b3IoJ3N0eWxlJyk7XG5cbiAgaWYgKCRsaW5rKVxuICAgIGRvY3VtZW50LmhlYWQuaW5zZXJ0QmVmb3JlKCRjc3MsICRsaW5rKTtcbiAgZWxzZSBpZiAoJHN0eWxlKVxuICAgIGRvY3VtZW50LmhlYWQuaW5zZXJ0QmVmb3JlKCRjc3MsICRzdHlsZSk7XG4gIGVsc2VcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKCRjc3MpO1xufVxuXG4iLCJpbXBvcnQgKiBhcyBjb250cm9sbGVycyBmcm9tICcuLi8uLi8uLi9kaXN0L2luZGV4JztcblxuLy8gY29tcG9uZW50c1xuLy8gY29uc3QgdGl0bGUxID0gbmV3IGNvbnRyb2xsZXJzLlRpdGxlKCdUaXRsZScsICcjY29udGFpbmVyJyk7XG5cbi8vIGNvbnN0IHRyaWdnZXJCdXR0b25zID0gbmV3IGNvbnRyb2xsZXJzLlRyaWdnZXJCdXR0b25zKCdUcmlnZ2VyQnV0dG9ucycsIFsnbGlnaHQnLCAnZ3JleScsICdkYXJrJ10sICcjY29udGFpbmVyJywgZnVuY3Rpb24odGhlbWUpIHtcbi8vICAgY29uc29sZS5sb2coJ0J1dHRvbiA9PicsIHRoZW1lKTtcbi8vICAgY29udHJvbGxlcnMuc2V0VGhlbWUodGhlbWUpO1xuXG4vLyAgIHN3aXRjaCAodGhlbWUpIHtcbi8vICAgICBjYXNlICdsaWdodCc6XG4vLyAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZmZmZmZmJztcbi8vICAgICAgIGJyZWFrO1xuLy8gICAgIGNhc2UgJ2dyZXknOlxuLy8gICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMDAwMCc7XG4vLyAgICAgICBicmVhaztcbi8vICAgICBjYXNlICdkYXJrJzpcbi8vICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyMwMDAwMDAnO1xuLy8gICAgICAgYnJlYWs7XG4vLyAgIH1cbi8vIH0pO1xuXG5jb25zdCBudW1iZXJCb3ggPSBuZXcgY29udHJvbGxlcnMuTnVtYmVyQm94KHtcbiAgbGFiZWw6ICdOdW1iZXJCb3gnLFxuICBtaW46IDAsXG4gIG1heDogMTAsXG4gIHN0ZXA6IDAuMSxcbiAgZGVmYXVsdDogNSxcbiAgY29udGFpbmVyOiAnI2NvbnRhaW5lcicsXG4gIGNhbGxiYWNrOiAodmFsdWUpID0+IGNvbnNvbGUubG9nKCdOdW1iZXIgPT4nLCB2YWx1ZSksXG59KTtcblxuLy8gY29uc3QgdG9nZ2xlID0gbmV3IGNvbnRyb2xsZXJzLlRvZ2dsZSgnVG9nZ2xlJywgZmFsc2UsICcjY29udGFpbmVyJywgZnVuY3Rpb24oYWN0aXZlKSB7XG4vLyAgIGNvbnNvbGUubG9nKCdUb2dnbGUgPT4nLCBhY3RpdmUpO1xuXG4vLyAgIGlmIChhY3RpdmUpXG4vLyAgICAgbnVtYmVyQm94LnZhbHVlID0gMDtcbi8vIH0pO1xuXG4vLyBjb25zdCBpbmZvID0gbmV3IGNvbnRyb2xsZXJzLlRleHQoJ0luZm8nLCAncmVhZC1vbmx5IHZhbHVlJywgdHJ1ZSwgJyNjb250YWluZXInKTtcblxuLy8gY29uc3QgdGV4dCA9IG5ldyBjb250cm9sbGVycy5UZXh0KCdUZXh0JywgJ2NoYW5nYWJsZSB2YWx1ZScsIGZhbHNlLCAgJyNjb250YWluZXInLCAodmFsdWUpID0+IHtcbi8vICAgY29uc29sZS5sb2coJ1RleHQgPT4nLCB2YWx1ZSk7XG4vLyAgIGluZm8udmFsdWUgPSB2YWx1ZTtcbi8vIH0pO1xuXG4vLyBjb25zdCBzZWxlY3RMaXN0ID0gbmV3IGNvbnRyb2xsZXJzLlNlbGVjdExpc3QoJ1NlbGVjdExpc3QnLCBbJ3N0YW5kYnknLCAncnVuJywgJ2VuZCddLCAncnVuJywgJyNjb250YWluZXInLCBmdW5jdGlvbih2YWx1ZSkge1xuLy8gICBjb25zb2xlLmxvZygnU2VsZWN0TGlzdCA9PicsIHZhbHVlKTtcblxuLy8gICBpbmZvLnZhbHVlID0gdmFsdWU7XG4vLyAgIHNlbGVjdEJ1dHRvbnMudmFsdWUgPSB2YWx1ZTtcbi8vIH0pO1xuXG4vLyBjb25zdCBzZWxlY3RCdXR0b25zID0gbmV3IGNvbnRyb2xsZXJzLlNlbGVjdEJ1dHRvbnMoJ1NlbGVjdEJ1dHRvbnMnLCBbJ3N0YW5kYnknLCAncnVuJywgJ2VuZCddLCAncnVuJywgJyNjb250YWluZXInLCBmdW5jdGlvbih2YWx1ZSkge1xuLy8gICBjb25zb2xlLmxvZygnU2VsZWN0QnV0dG9ucyA9PicsIHZhbHVlKTtcblxuLy8gICBpbmZvLnZhbHVlID0gdmFsdWU7XG4vLyAgIHNlbGVjdExpc3QudmFsdWUgPSB2YWx1ZTtcbi8vIH0pO1xuXG4vLyAvLyBncm91cFxuLy8gY29uc3QgZ3JvdXAgPSBuZXcgY29udHJvbGxlcnMuR3JvdXAoJ0dyb3VwJywgJ29wZW5lZCcsICcjY29udGFpbmVyJyk7XG5cbi8vIGNvbnN0IGdyb3VwU2xpZGVyID0gbmV3IGNvbnRyb2xsZXJzLlNsaWRlcignR3JvdXAgU2xpZGVyJywgMjAsIDEwMDAsIDEsIDIwMCwgJ0h6JywgJ2xhcmdlJywgZ3JvdXAsIGZ1bmN0aW9uKHZhbHVlKSB7XG4vLyAgIGNvbnNvbGUubG9nKCdHcm91cCAtIFNsaWRlciA9PicsIHZhbHVlKTtcbi8vIH0pO1xuXG4vLyBjb25zdCBncm91cFRleHQgPSBuZXcgY29udHJvbGxlcnMuVGV4dCgnR3JvdXAgVGV4dCcsICd0ZXh0IGlucHV0JywgZmFsc2UsICBncm91cCwgKHZhbHVlKSA9PiB7XG4vLyAgIGNvbnNvbGUubG9nKCdHcm91cCAtIFRleHQgPT4nLCB2YWx1ZSk7XG4vLyAgIGluZm8udmFsdWUgPSB2YWx1ZTtcbi8vIH0pO1xuXG4vLyAvLyBzbGlkZXJzXG4vLyBjb25zdCB0aXRsZTIgPSBuZXcgY29udHJvbGxlcnMuVGl0bGUoJ1NsaWRlcnMnLCAnI2NvbnRhaW5lcicpO1xuXG4vLyBjb25zdCBzbGlkZXJMYXJnZSA9IG5ldyBjb250cm9sbGVycy5TbGlkZXIoJ1NsaWRlciAobGFyZ2UpJywgMjAsIDEwMDAsIDEsIDUzNywgJ0h6JywgJ2xhcmdlJywgJyNjb250YWluZXInLCBmdW5jdGlvbih2YWx1ZSkge1xuLy8gICBjb25zb2xlLmxvZygnU2xpZGVyIChsYXJnZSkgPT4nLCB2YWx1ZSk7XG4vLyB9KTtcblxuLy8gY29uc3Qgc2xpZGVyRGVmYXVsdCA9IG5ldyBjb250cm9sbGVycy5TbGlkZXIoJ1NsaWRlciAoZGVmYXVsdCAvIG1lZGl1bSknLCAyMCwgMTAwMCwgMSwgMjI1LCAnbS5zPHN1cD4tMTwvc3VwPicsICdkZWZhdWx0JywgJyNjb250YWluZXInLCBmdW5jdGlvbih2YWx1ZSkge1xuLy8gICBjb25zb2xlLmxvZygnU2xpZGVyIChkZWZhdWx0KSA9PicsIHZhbHVlKTtcbi8vIH0pO1xuXG4vLyBjb25zdCBzbGlkZXJTbWFsbCA9IG5ldyBjb250cm9sbGVycy5TbGlkZXIoJ1NsaWRlciAoc21hbGwpJywgMjAsIDEwMDAsIDEsIDY2MCwgJycsICdzbWFsbCcsICcjY29udGFpbmVyJywgZnVuY3Rpb24odmFsdWUpIHtcbi8vICAgY29uc29sZS5sb2coJ1NsaWRlciAoc21hbGwpID0+JywgdmFsdWUpO1xuLy8gfSk7XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwibmFtZVwiOiBcImJhc2ljLWNvbnRyb2xsZXJzXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuNi4yXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJTZXQgb2Ygc2ltcGxlIGNvbnRyb2xsZXJzIGZvciByYXBpZCBwcm90b3R5cGluZ1wiLFxuICBcIm1haW5cIjogXCJkaXN0L2luZGV4LmpzXCIsXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJkb2NcIjogXCJqc2RvYzJtZCAtdCB0bXBsL1JFQURNRS5oYnMgLS1zZXBhcmF0b3JzIHNyYy8qKi8qLmpzIHNyYy8qLmpzID4gUkVBRE1FLXRlc3QubWRcIixcbiAgICBcInRyYW5zcGlsZVwiOiBcIm5vZGUgLi9iaW4vcnVubmVyIC0tdHJhbnNwaWxlXCIsXG4gICAgXCJwcmV3YXRjaFwiOiBcIm5vZGUgLi9iaW4vcnVubmVyIC0tdHJhbnNwaWxlXCIsXG4gICAgXCJ3YXRjaFwiOiBcIm5vZGUgLi9iaW4vcnVubmVyIC0td2F0Y2hcIlxuICB9LFxuICBcImxpY2Vuc2VcIjogXCJCU0QtM1wiLFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3dhdmVzanMvYmFzaWMtY29udHJvbGxlcnMuZ2l0XCJcbiAgfSxcbiAgXCJqc2hpbnRDb25maWdcIjoge1xuICAgIFwiZXNuZXh0XCI6IHRydWUsXG4gICAgXCJicm93c2VyXCI6IHRydWUsXG4gICAgXCJub2RlXCI6IHRydWUsXG4gICAgXCJkZXZlbFwiOiB0cnVlXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImJhYmVsLXJ1bnRpbWVcIjogXCJeNi4xOC4wXCIsXG4gICAgXCJndWktY29tcG9uZW50c1wiOiBcIl4xLjAuMFwiLFxuICAgIFwianNkb2MtdG8tbWFya2Rvd25cIjogXCJeMi4wLjFcIixcbiAgICBcInBhcmFtZXRlcnNcIjogXCJpcmNhbS1qc3Rvb2xzL3BhcmFtZXRlcnNcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJiYWJlbC1jb3JlXCI6IFwiXjYuMTguMlwiLFxuICAgIFwiYmFiZWwtcGx1Z2luLXRyYW5zZm9ybS1lczIwMTUtbW9kdWxlcy1jb21tb25qc1wiOiBcIl42LjE4LjBcIixcbiAgICBcImJhYmVsLXBsdWdpbi10cmFuc2Zvcm0tcnVudGltZVwiOiBcIl42LjE1LjBcIixcbiAgICBcImJhYmVsLXByZXNldC1lczIwMTVcIjogXCJeNi4xOC4wXCIsXG4gICAgXCJjb2xvcnNcIjogXCJeMS4xLjJcIixcbiAgICBcImZzLWV4dHJhXCI6IFwiXjEuMC4wXCIsXG4gICAgXCJub2RlLXNhc3NcIjogXCJeMy4xMy4wXCIsXG4gICAgXCJ3YXRjaFwiOiBcIl4xLjAuMVwiXG4gIH1cbn1cbiJdfQ==
