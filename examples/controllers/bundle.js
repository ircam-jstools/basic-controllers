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
 * Versatile canvas based slider.
 *
 * @param {Object} options - Override default parameters.
 * @param {'jump'|'proportionnal'|'handle'} - Mode of the slider:
 *  - in 'jump' mode, the value is changed on 'touchstart' or 'mousedown', and
 *    on move.
 *  - in 'proportionnal' mode, the value is updated relatively to move.
 *  - in 'handle' mode, the slider can be grabbed only around its value.
 * @param {Function} callback - Callback to be executed when the value of the
 *  slider changes.
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
 * @param {Boolean} [showHandle=true] - In 'handle' mode, define if the
 *  draggable should be show or not.
 * @param {Number} [handleSize=20] - Size of the draggable zone.
 * @param {String} [handleColor='rgba(255, 255, 255, 0.7)'] - Color of the
 *  draggable zone (when `showHandle` is `true`).
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
   * Current value
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

// store all instance in a controllers
var controllers = new Set();
var theme = 'light';

// add a single listener on window to trigger update
window.addEventListener('resize', function () {
  controllers.forEach(function (controller) {
    return controller.onResize();
  });
});

/**
 * Base class to create new controllers
 *
 * @memberof module:basicControllers
 */

var BaseController = function () {
  function BaseController() {
    _classCallCheck(this, BaseController);

    // insert styles when the first controller is created
    if (controllers.size === 0) styles.insertStyleSheet();

    controllers.add(this);

    this._listeners = new Set();
  }

  /**
   * Set the theme of the controllers
   * @type {String}
   */


  _createClass(BaseController, [{
    key: 'addListener',
    value: function addListener(callback) {
      this._listeners.add(callback);
    }
  }, {
    key: 'removeListener',
    value: function removeListener(callback) {
      this._listeners.remove(callback);
    }
  }, {
    key: '_executeListeners',
    value: function _executeListeners(value) {
      this._listeners.forEach(function (callback) {
        return callback(value);
      });
    }

    /** @private */

  }, {
    key: '_applyOptionnalParameters',
    value: function _applyOptionnalParameters() {
      var $container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if ($container) {
        if (typeof $container === 'string') $container = document.querySelector($container);

        $container.appendChild(this.render());
        this.onRender();
      }

      if (callback) this.addListener(callback);
    }

    /** @private */

  }, {
    key: 'render',
    value: function render() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this.$el = document.createElement('label');
      this.$el.classList.add(styles.ns, theme);
      if (type !== null) {
        this.$el.classList.add(type);
      }

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
    }

    /**
     * Get the theme of the controllers
     * @type {String}
     */
    ,
    get: function get() {
      return theme;
    }
  }]);

  return BaseController;
}();

exports.default = BaseController;

},{"../utils/styles":15}],4:[function(require,module,exports){
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

var NumberBox = function (_BaseController) {
  _inherits(NumberBox, _BaseController);

  function NumberBox(legend) {
    var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var step = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.01;
    var defaultValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var $container = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var callback = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;

    _classCallCheck(this, NumberBox);

    var _this = _possibleConstructorReturn(this, (NumberBox.__proto__ || Object.getPrototypeOf(NumberBox)).call(this));

    _this.type = 'number-box';
    _this.legend = legend;
    _this.min = 0;
    _this.max = max;
    _this.step = step;
    _this._value = defaultValue;
    _this._isIntStep = step % 1 === 0;

    _get(NumberBox.prototype.__proto__ || Object.getPrototypeOf(NumberBox.prototype), '_applyOptionnalParameters', _this).call(_this, $container, callback);
    return _this;
  }

  _createClass(NumberBox, [{
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        ' + elements.arrowLeft + '\n        <input class="number" type="number" min="' + this.min + '" max="' + this.max + '" step="' + this.step + '" value="' + this._value + '" />\n        ' + elements.arrowRight + '\n      </div>\n    ';

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
        var decimals = _this2.step.toString().split('.')[1];
        var exp = decimals ? decimals.length : 0;
        var mult = Math.pow(10, exp);

        var intValue = Math.floor(_this2.value * mult + 0.5);
        var intStep = Math.floor(_this2.step * mult + 0.5);
        var value = (intValue - intStep) / mult;

        _this2.propagate(value);
      }, false);

      this.$next.addEventListener('click', function (e) {
        var decimals = _this2.step.toString().split('.')[1];
        var exp = decimals ? decimals.length : 0;
        var mult = Math.pow(10, exp);

        var intValue = Math.floor(_this2.value * mult + 0.5);
        var intStep = Math.floor(_this2.step * mult + 0.5);
        var value = (intValue + intStep) / mult;

        _this2.propagate(value);
      }, false);

      this.$number.addEventListener('change', function (e) {
        var value = _this2.$number.value;
        value = _this2._isIntStep ? parseInt(value, 10) : parseFloat(value);
        value = Math.min(_this2.max, Math.max(_this2.min, value));

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

      this._executeListeners(this._value);
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
}(_BaseController3.default);

exports.default = NumberBox;

},{"../utils/elements":13,"./BaseController":3}],5:[function(require,module,exports){
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

},{"../utils/elements":13,"./BaseController":3}],6:[function(require,module,exports){
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

},{"../utils/elements":13,"./BaseController":3}],7:[function(require,module,exports){
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
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        <div class="range"></div>\n        <!-- <input class="range" type="range" min="' + this.min + '" max="' + this.max + '" step="' + this.step + '" value="' + this.value + '" /> -->\n        <div class="number-wrapper">\n          <input type="number" class="number" min="' + this.min + '" max="' + this.max + '" step="' + this.step + '" value="' + this.value + '" />\n          <span class="unit">' + this.unit + '</span>\n        </div>\n      </div>';

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

      console.log('???');

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

},{"./BaseController":3,"gui-components":2}],8:[function(require,module,exports){
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

},{"./BaseController":3}],9:[function(require,module,exports){
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

},{"../utils/styles":15,"./BaseController":3}],10:[function(require,module,exports){
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

},{"../utils/elements":13,"./BaseController":3}],11:[function(require,module,exports){
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
          _this2._executeListeners(_this2._value);
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

},{"./BaseController":3}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerButtons = exports.Toggle = exports.Title = exports.Text = exports.Slider = exports.SelectList = exports.SelectButtons = exports.NumberBox = exports.BaseController = exports.styles = undefined;

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
// expose for plugins
var BaseController = exports.BaseController = _BaseController3.default;

function setTheme(theme) {
  _BaseController3.default.theme = theme;
};

function disableStyles() {
  _styles.disable();
};

},{"./components/BaseController":3,"./components/NumberBox":4,"./components/SelectButtons":5,"./components/SelectList":6,"./components/Slider":7,"./components/Text":8,"./components/Title":9,"./components/Toggle":10,"./components/TriggerButtons":11,"./utils/styles":15}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var toggle = exports.toggle = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"toggle-element\" version=\"1.1\" viewBox=\"0 0 50 50\" preserveAspectRatio=\"none\">\n      <g class=\"x\">\n        <line x1=\"8\" y1=\"8\" x2=\"42\" y2=\"42\" stroke=\"white\" />\n        <line x1=\"8\" y1=\"42\" x2=\"42\" y2=\"8\" stroke=\"white\" />\n      </g>\n  </svg>\n";

var arrowRight = exports.arrowRight = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"arrow-right\" version=\"1.1\" viewBox=\"0 0 50 50\" preserveAspectRatio=\"none\">\n    <line x1=\"10\" y1=\"10\" x2=\"40\" y2=\"25\" />\n    <line x1=\"10\" y1=\"40\" x2=\"40\" y2=\"25\" />\n  </svg>\n";

var arrowLeft = exports.arrowLeft = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"arrow-left\" version=\"1.1\" viewBox=\"0 0 50 50\" preserveAspectRatio=\"none\">\n    <line x1=\"40\" y1=\"10\" x2=\"10\" y2=\"25\" />\n    <line x1=\"40\" y1=\"40\" x2=\"10\" y2=\"25\" />\n  </svg>\n";

},{}],14:[function(require,module,exports){
module.exports = " .basic-controllers { } .basic-controllers { width: 100%; max-width: 800px; height: 34px; padding: 3px; margin: 4px auto; background-color: #efefef; border: 1px solid #aaaaaa; box-sizing: border-box; border-radius: 2px; display: block; color: #464646; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .basic-controllers .legend { font: italic normal 1.2em Quicksand, arial, sans-serif; line-height: 26px; overflow: hidden; text-align: right; padding: 0 8px 0 0; display: block; box-sizing: border-box; width: 24%; float: left; white-space: nowrap; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none; user-select: none; } .basic-controllers .inner-wrapper { display: -webkit-inline-flex; display: inline-flex; -webkit-flex-wrap: no-wrap; flex-wrap: no-wrap; width: 76%; float: left; } .basic-controllers.small { height: 48px; } .basic-controllers.small:not(.align-small) { height: auto; } .basic-controllers.small:not(.align-small) .legend { width: 100%; float: none; text-align: left; line-height: 40px; } .basic-controllers.small:not(.align-small) .inner-wrapper { width: 100%; float: none; } .basic-controllers.small.align-small .legend { display: block; margin-right: 20px; text-align: left; line-height: 40px; } .basic-controllers.small.align-small .inner-wrapper { display: inline-block; width: auto; } .basic-controllers .arrow-right, .basic-controllers .arrow-left { border-radius: 2px; width: 14px; height: 26px; cursor: pointer; background-color: #464646; } .basic-controllers .arrow-right line, .basic-controllers .arrow-left line { stroke-width: 3px; stroke: #ffffff; } .basic-controllers .arrow-right:hover, .basic-controllers .arrow-left:hover { background-color: #686868; } .basic-controllers .arrow-right:active, .basic-controllers .arrow-left:active { background-color: #909090; } .basic-controllers .toggle-element { width: 26px; height: 26px; border-radius: 2px; background-color: #464646; cursor: pointer; } .basic-controllers .toggle-element:hover { background-color: #686868; } .basic-controllers .toggle-element line { stroke-width: 3px; } .basic-controllers .toggle-element .x { display: none; } .basic-controllers .toggle-element.active .x { display: block; } .basic-controllers .btn { display: block; text-align: center; font: normal normal 12px arial; text-decoration: none; height: 26px; line-height: 26px; background-color: #464646; border: none; color: #ffffff; margin: 0 4px 0 0; padding: 0; box-sizing: border-box; border-radius: 2px; cursor: pointer; -webkit-flex-grow: 1; flex-grow: 1; } .basic-controllers .btn:last-child { margin: 0; } .basic-controllers .btn:hover { background-color: #686868; } .basic-controllers .btn:active, .basic-controllers .btn.active { background-color: #909090; } .basic-controllers .btn:focus { outline: none; } .basic-controllers .number { height: 26px; display: inline-block; position: relative; font: normal normal 1.2em Quicksand, arial, sans-serif; vertical-align: top; border: none; background: none; color: #464646; padding: 0 4px; margin: 0; background-color: #f9f9f9; border-radius: 2px; box-sizing: border-box; } .basic-controllers .number:focus { outline: none; } .basic-controllers select { height: 26px; line-height: 26px; background-color: #f9f9f9; border-radius: 2px; border: none; vertical-align: top; padding: 0; margin: 0; } .basic-controllers select:focus { outline: none; } .basic-controllers input[type=text] { width: 100%; height: 26px; line-height: 26px; border: 0; padding: 0 4px; background-color: #f9f9f9; border-radius: 2px; color: #565656; } .basic-controllers.small .arrow-right, .basic-controllers.small .arrow-left { width: 24px; height: 40px; } .basic-controllers.small .toggle-element { width: 40px; height: 40px; } .basic-controllers.small .btn { height: 40px; line-height: 40px; } .basic-controllers.small .number { height: 40px; } .basic-controllers.small select { height: 40px; line-height: 40px; } .basic-controllers.small input[type=text] { height: 40px; line-height: 40px; } .basic-controllers.title { border: none !important; margin-bottom: 0; margin-top: 8px; padding-top: 8px; padding-bottom: 0; background-color: transparent !important; height: 25px; } .basic-controllers.title .legend { font: normal bold 1.3em Quicksand, arial, sans-serif; height: 100%; overflow: hidden; text-align: left; padding: 0; width: 100%; box-sizing: border-box; -webkit-flex-grow: 1; flex-grow: 1; } .basic-controllers.slider .range { height: 26px; display: inline-block; margin: 0; -webkit-flex-grow: 4; flex-grow: 4; position: relative; } .basic-controllers.slider .range canvas { position: absolute; top: 0; left: 0; } .basic-controllers.slider .number-wrapper { display: inline; height: 26px; text-align: right; -webkit-flex-grow: 3; flex-grow: 3; } .basic-controllers.slider .number-wrapper .number { left: 5px; width: 54px; text-align: right; } .basic-controllers.slider .number-wrapper .unit { font: italic normal 1em Quicksand, arial, sans-serif; line-height: 26px; height: 26px; width: 30px; display: inline-block; position: relative; padding-left: 5px; padding-right: 5px; color: #565656; } .basic-controllers.slider .number-wrapper .unit sup { line-height: 7px; } .basic-controllers.slider.slider-large .range { -webkit-flex-grow: 50; flex-grow: 50; } .basic-controllers.slider.slider-large .number-wrapper { -webkit-flex-grow: 1; flex-grow: 1; } .basic-controllers.slider.slider-small .range { -webkit-flex-grow: 2; flex-grow: 2; } .basic-controllers.slider.slider-small .number-wrapper { -webkit-flex-grow: 4; flex-grow: 4; } .basic-controllers.number-box .number { width: 120px; margin: 0 10px; vertical-align: top; } .basic-controllers.select-list select { margin: 0 10px; width: 120px; font: normal normal 1.2em Quicksand, arial, sans-serif; color: #464646; } .basic-controllers.select-buttons .btn:first-of-type { margin-left: 4px; } .basic-controllers.text input[type=text] { font: normal normal 1.2em Quicksand, arial, sans-serif; color: #464646; } .basic-controllers.small.slider .range { height: 40px; } .basic-controllers.small.slider .number-wrapper { height: 40px; } .basic-controllers.small.slider .number-wrapper .unit { line-height: 40px; height: 40px; } .basic-controllers.dark { background-color: #363636; border: 1px solid #585858; color: rgba(255, 255, 255, 0.95); } .basic-controllers.dark .toggle-element { background-color: #efefef; } .basic-controllers.dark .toggle-element line { stroke: #363636; } .basic-controllers.dark .toggle-element:hover { background-color: #cdcdcd; } .basic-controllers.dark .arrow-right, .basic-controllers.dark .arrow-left { background-color: #efefef; } .basic-controllers.dark .arrow-right line, .basic-controllers.dark .arrow-left line { stroke: #363636; } .basic-controllers.dark .arrow-right:hover, .basic-controllers.dark .arrow-left:hover { background-color: #cdcdcd; } .basic-controllers.dark .arrow-right:active, .basic-controllers.dark .arrow-left:active { background-color: #ababab; } .basic-controllers.dark .number, .basic-controllers.dark select, .basic-controllers.dark input[type=text] { color: rgba(255, 255, 255, 0.95); background-color: #454545; } .basic-controllers.dark .btn { background-color: #efefef; color: #363636; } .basic-controllers.dark .btn:hover { background-color: #cdcdcd; } .basic-controllers.dark .btn:active, .basic-controllers.dark .btn.active { background-color: #ababab; } .basic-controllers.dark.slider .inner-wrapper .number-wrapper .unit { color: #bcbcbc; } .basic-controllers.soundworks { background-color: #242424; border: 1px solid #282828; color: #ffffff; } .basic-controllers.soundworks .toggle-element { background-color: #464646; } .basic-controllers.soundworks .toggle-element line { stroke: #ffffff; } .basic-controllers.soundworks .toggle-element:hover { background-color: #686868; } .basic-controllers.soundworks .arrow-right, .basic-controllers.soundworks .arrow-left { background-color: #464646; } .basic-controllers.soundworks .arrow-right line, .basic-controllers.soundworks .arrow-left line { stroke: #ffffff; } .basic-controllers.soundworks .arrow-right:hover, .basic-controllers.soundworks .arrow-left:hover { background-color: #686868; } .basic-controllers.soundworks .arrow-right:active, .basic-controllers.soundworks .arrow-left:active { background-color: #909090; } .basic-controllers.soundworks .number, .basic-controllers.soundworks select, .basic-controllers.soundworks input[type=text] { color: #ffffff; background-color: #333333; } .basic-controllers.soundworks .btn { background-color: #464646; color: #ffffff; } .basic-controllers.soundworks .btn:hover { background-color: #686868; } .basic-controllers.soundworks .btn:active, .basic-controllers.soundworks .btn.active { background-color: #909090; } .basic-controllers.soundworks.slider .inner-wrapper .number-wrapper .unit { color: #cdcdcd; } ";
},{}],15:[function(require,module,exports){
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

},{"../../package.json":17,"./styles-declarations.js":14}],16:[function(require,module,exports){
'use strict';

var _index = require('../../../dist/index');

var controllers = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var title1 = new controllers.Title('Title', '#container');

var triggerButtons = new controllers.TriggerButtons('TriggerButtons', ['light', 'dark', 'soundworks'], '#container', function (theme) {
  console.log('Button =>', theme);
  controllers.setTheme(theme);

  switch (theme) {
    case 'light':
      document.body.style.backgroundColor = '#ffffff';
      break;
    case 'dark':
    case 'soundworks':
      document.body.style.backgroundColor = '#000';
      break;
  }
});

var numberBox = new controllers.NumberBox('NumberBox', 0, 10, 1, 5, '#container', function (value) {
  console.log('Number =>', value);
});

var toggle = new controllers.Toggle('Toggle', false, '#container', function (active) {
  console.log('Toggle =>', active);

  if (active) numberBox.value = 0;
});

var info = new controllers.Text('Info', 'read-only value', true, '#container');

var text = new controllers.Text('Text', 'changable value', false, '#container', function (value) {
  console.log('Text =>', value);
  info.value = value;
});

var selectList = new controllers.SelectList('SelectList', ['standby', 'run', 'end'], 'run', '#container', function (value) {
  console.log('SelectList =>', value);

  info.value = value;
  selectButtons.value = value;
});

var selectButtons = new controllers.SelectButtons('SelectButtons', ['standby', 'run', 'end'], 'run', '#container', function (value) {
  console.log('SelectButtons =>', value);

  info.value = value;
  selectList.value = value;
});

var title2 = new controllers.Title('Sliders', '#container');

var sliderLarge = new controllers.Slider('Slider (large)', 20, 1000, 1, 537, 'Hz', 'large', '#container', function (value) {
  console.log('Slider (large) =>', value);
});

var sliderDefault = new controllers.Slider('Slider (default / medium)', 20, 1000, 1, 225, 'm.s<sup>-1</sup>', 'default', '#container', function (value) {
  console.log('Slider (default) =>', value);
});

var sliderSmall = new controllers.Slider('Slider (small)', 20, 1000, 1, 660, '', 'small', '#container', function (value) {
  console.log('Slider (small) =>', value);
});

},{"../../../dist/index":12}],17:[function(require,module,exports){
module.exports={
  "name": "basic-controllers",
  "version": "0.6.2",
  "description": "basic-controllers for rapid prototyping",
  "main": "dist/index.js",
  "scripts": {
    "bundle": "node ./bin/runner --bundle",
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
    "gui-components": "^1.0.0"
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

},{}]},{},[16])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLi8uLi8uLi8uLi9pcmNhbS1qc3Rvb2xzL2d1aS1jb21wb25lbnRzL2Rpc3QvU2xpZGVyLmpzIiwiLi4vLi4vLi4vLi4vLi4vaXJjYW0tanN0b29scy9ndWktY29tcG9uZW50cy9kaXN0L2luZGV4LmpzIiwiLi4vLi4vZGlzdC9jb21wb25lbnRzL0Jhc2VDb250cm9sbGVyLmpzIiwiLi4vLi4vZGlzdC9jb21wb25lbnRzL051bWJlckJveC5qcyIsIi4uLy4uL2Rpc3QvY29tcG9uZW50cy9TZWxlY3RCdXR0b25zLmpzIiwiLi4vLi4vZGlzdC9jb21wb25lbnRzL1NlbGVjdExpc3QuanMiLCIuLi8uLi9kaXN0L2NvbXBvbmVudHMvU2xpZGVyLmpzIiwiLi4vLi4vZGlzdC9jb21wb25lbnRzL1RleHQuanMiLCIuLi8uLi9kaXN0L2NvbXBvbmVudHMvVGl0bGUuanMiLCIuLi8uLi9kaXN0L2NvbXBvbmVudHMvVG9nZ2xlLmpzIiwiLi4vLi4vZGlzdC9jb21wb25lbnRzL1RyaWdnZXJCdXR0b25zLmpzIiwiLi4vLi4vZGlzdC9pbmRleC5qcyIsIi4uLy4uL2Rpc3QvdXRpbHMvZWxlbWVudHMuanMiLCIuLi8uLi9kaXN0L3V0aWxzL3N0eWxlcy1kZWNsYXJhdGlvbnMuanMiLCIuLi8uLi9kaXN0L3V0aWxzL3N0eWxlcy5qcyIsImRpc3QvaW5kZXguanMiLCIuLi8uLi9wYWNrYWdlLmpzb24iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FDQUEsU0FBUyxRQUFULENBQWtCLE1BQWxCLEVBQTBCLEtBQTFCLEVBQWlDO0FBQy9CLE1BQU0sUUFBUSxDQUFDLE1BQU0sQ0FBTixJQUFXLE1BQU0sQ0FBTixDQUFaLEtBQXlCLE9BQU8sQ0FBUCxJQUFZLE9BQU8sQ0FBUCxDQUFyQyxDQUFkO0FBQ0EsTUFBTSxZQUFZLE1BQU0s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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZnVuY3Rpb24gZ2V0U2NhbGUoZG9tYWluLCByYW5nZSkge1xuICBjb25zdCBzbG9wZSA9IChyYW5nZVsxXSAtIHJhbmdlWzBdKSAvIChkb21haW5bMV0gLSBkb21haW5bMF0pO1xuICBjb25zdCBpbnRlcmNlcHQgPSByYW5nZVswXSAtIHNsb3BlICogZG9tYWluWzBdO1xuXG4gIGZ1bmN0aW9uIHNjYWxlKHZhbCkge1xuICAgIHJldHVybiBzbG9wZSAqIHZhbCArIGludGVyY2VwdDtcbiAgfVxuXG4gIHNjYWxlLmludmVydCA9IGZ1bmN0aW9uKHZhbCkge1xuICAgIHJldHVybiAodmFsIC0gaW50ZXJjZXB0KSAvIHNsb3BlO1xuICB9XG5cbiAgcmV0dXJuIHNjYWxlO1xufVxuXG5mdW5jdGlvbiBnZXRDbGlwcGVyKG1pbiwgbWF4LCBzdGVwKSB7XG4gIHJldHVybiAodmFsKSA9PiB7XG4gICAgY29uc3QgY2xpcHBlZFZhbHVlID0gTWF0aC5yb3VuZCh2YWwgLyBzdGVwKSAqIHN0ZXA7XG4gICAgY29uc3QgZml4ZWQgPSBNYXRoLm1heChNYXRoLmxvZzEwKDEgLyBzdGVwKSwgMCk7XG4gICAgY29uc3QgZml4ZWRWYWx1ZSA9IGNsaXBwZWRWYWx1ZS50b0ZpeGVkKGZpeGVkKTsgLy8gZml4IGZsb2F0aW5nIHBvaW50IGVycm9yc1xuICAgIHJldHVybiBNYXRoLm1pbihtYXgsIE1hdGgubWF4KG1pbiwgcGFyc2VGbG9hdChmaXhlZFZhbHVlKSkpO1xuICB9XG59XG5cbi8qKlxuICogVmVyc2F0aWxlIGNhbnZhcyBiYXNlZCBzbGlkZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0geydqdW1wJ3wncHJvcG9ydGlvbm5hbCd8J2hhbmRsZSd9IC0gTW9kZSBvZiB0aGUgc2xpZGVyOlxuICogIC0gaW4gJ2p1bXAnIG1vZGUsIHRoZSB2YWx1ZSBpcyBjaGFuZ2VkIG9uICd0b3VjaHN0YXJ0JyBvciAnbW91c2Vkb3duJywgYW5kXG4gKiAgICBvbiBtb3ZlLlxuICogIC0gaW4gJ3Byb3BvcnRpb25uYWwnIG1vZGUsIHRoZSB2YWx1ZSBpcyB1cGRhdGVkIHJlbGF0aXZlbHkgdG8gbW92ZS5cbiAqICAtIGluICdoYW5kbGUnIG1vZGUsIHRoZSBzbGlkZXIgY2FuIGJlIGdyYWJiZWQgb25seSBhcm91bmQgaXRzIHZhbHVlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBDYWxsYmFjayB0byBiZSBleGVjdXRlZCB3aGVuIHRoZSB2YWx1ZSBvZiB0aGVcbiAqICBzbGlkZXIgY2hhbmdlcy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy53aWR0aD0yMDBdIC0gV2lkdGggb2YgdGhlIHNsaWRlci5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5oZWlnaHQ9MzBdIC0gSGVpZ2h0IG9mIHRoZSBzbGlkZXIuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWluPTBdIC0gTWluaW11bSB2YWx1ZS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5tYXg9MV0gLSBNYXhpbXVtIHZhbHVlLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnN0ZXA9MC4wMV0gLSBTdGVwIGJldHdlZW4gZWFjaCBjb25zZWN1dGl2ZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZGVmYXVsdD0wXSAtIERlZmF1bHQgdmFsdWUuXG4gKiBAcGFyYW0ge1N0cmluZ3xFbGVtZW50fSBbb3B0aW9ucy5jb250YWluZXI9J2JvZHknXSAtIENTUyBTZWxlY3RvciBvciBET01cbiAqICBlbGVtZW50IGluIHdoaWNoIGluc2VydGluZyB0aGUgc2xpZGVyLlxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmJhY2tncm91bmRDb2xvcj0nIzQ2NDY0NiddIC0gQmFja2dyb3VuZCBjb2xvciBvZiB0aGVcbiAqICBzbGlkZXIuXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuZm9yZWdyb3VuZENvbG9yPSdzdGVlbGJsdWUnXSAtIEZvcmVncm91bmQgY29sb3Igb2ZcbiAqICB0aGUgc2xpZGVyLlxuICogQHBhcmFtIHsnaG9yaXpvbnRhbCd8J3ZlcnRpY2FsJ30gW29wdGlvbnMub3JpZW50YXRpb249J2hvcml6b250YWwnXSAtXG4gKiAgT3JpZW50YXRpb24gb2YgdGhlIHNsaWRlci5cbiAqIEBwYXJhbSB7QXJyYXl9IFtvcHRpb25zLm1hcmtlcnM9W11dIC0gTGlzdCBvZiB2YWx1ZXMgd2hlcmUgbWFya2VycyBzaG91bGRcbiAqICBiZSBkaXNwbGF5ZWQgb24gdGhlIHNsaWRlci5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3Nob3dIYW5kbGU9dHJ1ZV0gLSBJbiAnaGFuZGxlJyBtb2RlLCBkZWZpbmUgaWYgdGhlXG4gKiAgZHJhZ2dhYmxlIHNob3VsZCBiZSBzaG93IG9yIG5vdC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbaGFuZGxlU2l6ZT0yMF0gLSBTaXplIG9mIHRoZSBkcmFnZ2FibGUgem9uZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBbaGFuZGxlQ29sb3I9J3JnYmEoMjU1LCAyNTUsIDI1NSwgMC43KSddIC0gQ29sb3Igb2YgdGhlXG4gKiAgZHJhZ2dhYmxlIHpvbmUgKHdoZW4gYHNob3dIYW5kbGVgIGlzIGB0cnVlYCkuXG4gKi9cbmNsYXNzIFNsaWRlciB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICAgIG1vZGU6ICdqdW1wJyxcbiAgICAgIGNhbGxiYWNrOiB2YWx1ZSA9PiB7fSxcbiAgICAgIHdpZHRoOiAyMDAsXG4gICAgICBoZWlnaHQ6IDMwLFxuICAgICAgbWluOiAwLFxuICAgICAgbWF4OiAxLFxuICAgICAgc3RlcDogMC4wMSxcbiAgICAgIGRlZmF1bHQ6IDAsXG4gICAgICBjb250YWluZXI6ICdib2R5JyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyM0NjQ2NDYnLFxuICAgICAgZm9yZWdyb3VuZENvbG9yOiAnc3RlZWxibHVlJyxcbiAgICAgIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgICBtYXJrZXJzOiBbXSxcblxuICAgICAgLy8gaGFuZGxlIHNwZWNpZmljIG9wdGlvbnNcbiAgICAgIHNob3dIYW5kbGU6IHRydWUsXG4gICAgICBoYW5kbGVTaXplOiAyMCxcbiAgICAgIGhhbmRsZUNvbG9yOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpJyxcbiAgICB9O1xuXG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgdGhpcy5fbGlzdGVuZXJzID0gW107XG4gICAgdGhpcy5fYm91bmRpbmdDbGllbnRSZWN0ID0gbnVsbDtcbiAgICB0aGlzLl90b3VjaElkID0gbnVsbDtcbiAgICB0aGlzLl92YWx1ZSA9IG51bGw7XG4gICAgdGhpcy5fY2FudmFzV2lkdGggPSBudWxsO1xuICAgIHRoaXMuX2NhbnZhc0hlaWdodCA9IG51bGw7XG4gICAgLy8gZm9yIHByb3BvcnRpb25uYWwgbW9kZVxuICAgIHRoaXMuX2N1cnJlbnRNb3VzZVBvc2l0aW9uID0geyB4OiBudWxsLCB5OiBudWxsIH07XG4gICAgdGhpcy5fY3VycmVudFNsaWRlclBvc2l0aW9uID0gbnVsbDtcblxuICAgIHRoaXMuX29uTW91c2VEb3duID0gdGhpcy5fb25Nb3VzZURvd24uYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbk1vdXNlTW92ZSA9IHRoaXMuX29uTW91c2VNb3ZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25Nb3VzZVVwID0gdGhpcy5fb25Nb3VzZVVwLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLl9vblRvdWNoU3RhcnQgPSB0aGlzLl9vblRvdWNoU3RhcnQuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vblRvdWNoTW92ZSA9IHRoaXMuX29uVG91Y2hNb3ZlIC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uVG91Y2hFbmQgPSB0aGlzLl9vblRvdWNoRW5kLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLl9vblJlc2l6ZSA9IHRoaXMuX29uUmVzaXplLmJpbmQodGhpcyk7XG5cblxuICAgIHRoaXMuX2NyZWF0ZUVsZW1lbnQoKTtcblxuICAgIC8vIGluaXRpYWxpemVcbiAgICB0aGlzLl9yZXNpemVFbGVtZW50KCk7XG4gICAgdGhpcy5fc2V0U2NhbGVzKCk7XG4gICAgdGhpcy5fYmluZEV2ZW50cygpO1xuICAgIHRoaXMuX29uUmVzaXplKCk7XG4gICAgdGhpcy5fdXBkYXRlVmFsdWUodGhpcy5wYXJhbXMuZGVmYXVsdCk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fb25SZXNpemUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgdmFsdWVcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsKSB7XG4gICAgdGhpcy5fdXBkYXRlVmFsdWUodmFsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgc2xpZGVyIHRvIGl0cyBkZWZhdWx0IHZhbHVlLlxuICAgKi9cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5fdXBkYXRlVmFsdWUodGhpcy5wYXJhbXMuZGVmYXVsdCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzaXplIHRoZSBzbGlkZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB3aWR0aCAtIE5ldyB3aWR0aCBvZiB0aGUgc2xpZGVyLlxuICAgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0IC0gTmV3IGhlaWdodCBvZiB0aGUgc2xpZGVyLlxuICAgKi9cbiAgcmVzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLnBhcmFtcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMucGFyYW1zLmhlaWdodCA9IGhlaWdodDtcblxuICAgIHRoaXMuX3Jlc2l6ZUVsZW1lbnQoKTtcbiAgICB0aGlzLl9zZXRTY2FsZXMoKTtcbiAgICB0aGlzLl9vblJlc2l6ZSgpO1xuICAgIHRoaXMuX3VwZGF0ZVZhbHVlKHRoaXMuX3ZhbHVlLCB0cnVlKTtcbiAgfVxuXG4gIF91cGRhdGVWYWx1ZSh2YWx1ZSwgZm9yY2VSZW5kZXIgPSBmYWxzZSkge1xuICAgIGNvbnN0IHsgY2FsbGJhY2sgfSA9IHRoaXMucGFyYW1zO1xuICAgIGNvbnN0IGNsaXBwZWRWYWx1ZSA9IHRoaXMuY2xpcHBlcih2YWx1ZSk7XG5cbiAgICAvLyBpZiByZXNpemUgcmVuZGVyIGJ1dCBkb24ndCB0cmlnZ2VyIGNhbGxiYWNrXG4gICAgaWYgKGNsaXBwZWRWYWx1ZSA9PT0gdGhpcy5fdmFsdWUgJiYgZm9yY2VSZW5kZXIgPT09IHRydWUpXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5fcmVuZGVyKGNsaXBwZWRWYWx1ZSkpO1xuXG4gICAgLy8gdHJpZ2dlciBjYWxsYmFja1xuICAgIGlmIChjbGlwcGVkVmFsdWUgIT09IHRoaXMuX3ZhbHVlKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IGNsaXBwZWRWYWx1ZTtcbiAgICAgIGNhbGxiYWNrKGNsaXBwZWRWYWx1ZSk7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5fcmVuZGVyKGNsaXBwZWRWYWx1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIF9jcmVhdGVFbGVtZW50KCkge1xuICAgIGNvbnN0IHsgY29udGFpbmVyIH0gPSB0aGlzLnBhcmFtcztcbiAgICB0aGlzLiRjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICB0aGlzLmN0eCA9IHRoaXMuJGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgaWYgKGNvbnRhaW5lciBpbnN0YW5jZW9mIEVsZW1lbnQpXG4gICAgICB0aGlzLiRjb250YWluZXIgPSBjb250YWluZXI7XG4gICAgZWxzZVxuICAgICAgdGhpcy4kY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXIpO1xuXG4gICAgdGhpcy4kY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuJGNhbnZhcyk7XG4gIH1cblxuICBfcmVzaXplRWxlbWVudCgpIHtcbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHRoaXMucGFyYW1zO1xuXG4gICAgLy8gbG9naWNhbCBhbmQgcGl4ZWwgc2l6ZSBvZiB0aGUgY2FudmFzXG4gICAgdGhpcy5fcGl4ZWxSYXRpbyA9IChmdW5jdGlvbihjdHgpIHtcbiAgICBjb25zdCBkUFIgPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuICAgIGNvbnN0IGJQUiA9IGN0eC53ZWJraXRCYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XG4gICAgICBjdHgubW96QmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fFxuICAgICAgY3R4Lm1zQmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fFxuICAgICAgY3R4Lm9CYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XG4gICAgICBjdHguYmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fCAxO1xuXG4gICAgICByZXR1cm4gZFBSIC8gYlBSO1xuICAgIH0odGhpcy5jdHgpKTtcblxuICAgIHRoaXMuX2NhbnZhc1dpZHRoID0gd2lkdGggKiB0aGlzLl9waXhlbFJhdGlvO1xuICAgIHRoaXMuX2NhbnZhc0hlaWdodCA9IGhlaWdodCAqIHRoaXMuX3BpeGVsUmF0aW87XG5cbiAgICB0aGlzLmN0eC5jYW52YXMud2lkdGggPSB0aGlzLl9jYW52YXNXaWR0aDtcbiAgICB0aGlzLmN0eC5jYW52YXMuaGVpZ2h0ID0gdGhpcy5fY2FudmFzSGVpZ2h0O1xuICAgIHRoaXMuY3R4LmNhbnZhcy5zdHlsZS53aWR0aCA9IGAke3dpZHRofXB4YDtcbiAgICB0aGlzLmN0eC5jYW52YXMuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcbiAgfVxuXG4gIF9vblJlc2l6ZSgpIHtcbiAgICB0aGlzLl9ib3VuZGluZ0NsaWVudFJlY3QgPSB0aGlzLiRjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIH1cblxuICBfc2V0U2NhbGVzKCkge1xuICAgIGNvbnN0IHsgb3JpZW50YXRpb24sIHdpZHRoLCBoZWlnaHQsIG1pbiwgbWF4LCBzdGVwIH0gPSB0aGlzLnBhcmFtcztcbiAgICAvLyBkZWZpbmUgdHJhbnNmZXJ0IGZ1bmN0aW9uc1xuICAgIGNvbnN0IHNjcmVlblNpemUgPSBvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnID9cbiAgICAgIHdpZHRoIDogaGVpZ2h0O1xuXG4gICAgY29uc3QgY2FudmFzU2l6ZSA9IG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcgP1xuICAgICAgdGhpcy5fY2FudmFzV2lkdGggOiB0aGlzLl9jYW52YXNIZWlnaHQ7XG5cbiAgICBjb25zdCBkb21haW4gPSBvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnID8gW21pbiwgbWF4XSA6IFttYXgsIG1pbl07XG4gICAgY29uc3Qgc2NyZWVuUmFuZ2UgPSBbMCwgc2NyZWVuU2l6ZV07XG4gICAgY29uc3QgY2FudmFzUmFuZ2UgPSBbMCwgY2FudmFzU2l6ZV07XG5cbiAgICB0aGlzLnNjcmVlblNjYWxlID0gZ2V0U2NhbGUoZG9tYWluLCBzY3JlZW5SYW5nZSk7XG4gICAgdGhpcy5jYW52YXNTY2FsZSA9IGdldFNjYWxlKGRvbWFpbiwgY2FudmFzUmFuZ2UpO1xuICAgIHRoaXMuY2xpcHBlciA9IGdldENsaXBwZXIobWluLCBtYXgsIHN0ZXApO1xuICB9XG5cbiAgX2JpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX29uTW91c2VEb3duKTtcbiAgICB0aGlzLiRjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuX29uVG91Y2hTdGFydCk7XG4gIH1cblxuICBfb25TdGFydCh4LCB5KSB7XG4gICAgbGV0IHN0YXJ0ZWQgPSBudWxsO1xuXG4gICAgc3dpdGNoICh0aGlzLnBhcmFtcy5tb2RlKSB7XG4gICAgICBjYXNlICdqdW1wJzpcbiAgICAgICAgdGhpcy5fdXBkYXRlUG9zaXRpb24oeCwgeSk7XG4gICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3Byb3BvcnRpb25uYWwnOlxuICAgICAgICB0aGlzLl9jdXJyZW50TW91c2VQb3NpdGlvbi54ID0geDtcbiAgICAgICAgdGhpcy5fY3VycmVudE1vdXNlUG9zaXRpb24ueSA9IHk7XG4gICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2hhbmRsZSc6XG4gICAgICAgIGNvbnN0IG9yaWVudGF0aW9uID0gdGhpcy5wYXJhbXMub3JpZW50YXRpb247XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5zY3JlZW5TY2FsZSh0aGlzLl92YWx1ZSk7XG4gICAgICAgIGNvbnN0IGNvbXBhcmUgPSBvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnID8geCA6IHk7XG4gICAgICAgIGNvbnN0IGRlbHRhID0gdGhpcy5wYXJhbXMuaGFuZGxlU2l6ZSAvIDI7XG5cbiAgICAgICAgaWYgKGNvbXBhcmUgPCBwb3NpdGlvbiArIGRlbHRhICYmIGNvbXBhcmUgPiBwb3NpdGlvbiAtIGRlbHRhKSB7XG4gICAgICAgICAgdGhpcy5fY3VycmVudE1vdXNlUG9zaXRpb24ueCA9IHg7XG4gICAgICAgICAgdGhpcy5fY3VycmVudE1vdXNlUG9zaXRpb24ueSA9IHk7XG4gICAgICAgICAgc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBzdGFydGVkO1xuICB9XG5cbiAgX29uTW92ZSh4LCB5KSB7XG4gICAgc3dpdGNoICh0aGlzLnBhcmFtcy5tb2RlKSB7XG4gICAgICBjYXNlICdqdW1wJzpcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdwcm9wb3J0aW9ubmFsJzpcbiAgICAgIGNhc2UgJ2hhbmRsZSc6XG4gICAgICAgIGNvbnN0IGRlbHRhWCA9IHggLSB0aGlzLl9jdXJyZW50TW91c2VQb3NpdGlvbi54O1xuICAgICAgICBjb25zdCBkZWx0YVkgPSB5IC0gdGhpcy5fY3VycmVudE1vdXNlUG9zaXRpb24ueTtcbiAgICAgICAgdGhpcy5fY3VycmVudE1vdXNlUG9zaXRpb24ueCA9IHg7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRNb3VzZVBvc2l0aW9uLnkgPSB5O1xuXG4gICAgICAgIHggPSB0aGlzLnNjcmVlblNjYWxlKHRoaXMuX3ZhbHVlKSArIGRlbHRhWDtcbiAgICAgICAgeSA9IHRoaXMuc2NyZWVuU2NhbGUodGhpcy5fdmFsdWUpICsgZGVsdGFZO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGVQb3NpdGlvbih4LCB5KTtcbiAgfVxuXG4gIF9vbkVuZCgpIHtcbiAgICBzd2l0Y2ggKHRoaXMucGFyYW1zLm1vZGUpIHtcbiAgICAgIGNhc2UgJ2p1bXAnOlxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3Byb3BvcnRpb25uYWwnOlxuICAgICAgY2FzZSAnaGFuZGxlJzpcbiAgICAgICAgdGhpcy5fY3VycmVudE1vdXNlUG9zaXRpb24ueCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRNb3VzZVBvc2l0aW9uLnkgPSBudWxsO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvLyBtb3VzZSBldmVudHNcbiAgX29uTW91c2VEb3duKGUpIHtcbiAgICBjb25zdCBwYWdlWCA9IGUucGFnZVg7XG4gICAgY29uc3QgcGFnZVkgPSBlLnBhZ2VZO1xuICAgIGNvbnN0IHggPSBwYWdlWCAtIHRoaXMuX2JvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0O1xuICAgIGNvbnN0IHkgPSBwYWdlWSAtIHRoaXMuX2JvdW5kaW5nQ2xpZW50UmVjdC50b3A7XG5cbiAgICBpZiAodGhpcy5fb25TdGFydCh4LCB5KSA9PT0gdHJ1ZSkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX29uTW91c2VNb3ZlKTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5fb25Nb3VzZVVwKTtcbiAgICB9XG4gIH1cblxuICBfb25Nb3VzZU1vdmUoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudCB0ZXh0IHNlbGVjdGlvblxuXG4gICAgY29uc3QgcGFnZVggPSBlLnBhZ2VYO1xuICAgIGNvbnN0IHBhZ2VZID0gZS5wYWdlWTtcbiAgICBsZXQgeCA9IHBhZ2VYIC0gdGhpcy5fYm91bmRpbmdDbGllbnRSZWN0LmxlZnQ7O1xuICAgIGxldCB5ID0gcGFnZVkgLSB0aGlzLl9ib3VuZGluZ0NsaWVudFJlY3QudG9wOztcblxuICAgIHRoaXMuX29uTW92ZSh4LCB5KTtcbiAgfVxuXG4gIF9vbk1vdXNlVXAoZSkge1xuICAgIHRoaXMuX29uRW5kKCk7XG5cbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5fb25Nb3VzZU1vdmUpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5fb25Nb3VzZVVwKTtcbiAgfVxuXG4gIC8vIHRvdWNoIGV2ZW50c1xuICBfb25Ub3VjaFN0YXJ0KGUpIHtcbiAgICBpZiAodGhpcy5fdG91Y2hJZCAhPT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgY29uc3QgdG91Y2ggPSBlLnRvdWNoZXNbMF07XG4gICAgdGhpcy5fdG91Y2hJZCA9IHRvdWNoLmlkZW50aWZpZXI7XG5cbiAgICBjb25zdCBwYWdlWCA9IHRvdWNoLnBhZ2VYO1xuICAgIGNvbnN0IHBhZ2VZID0gdG91Y2gucGFnZVk7XG4gICAgY29uc3QgeCA9IHBhZ2VYIC0gdGhpcy5fYm91bmRpbmdDbGllbnRSZWN0LmxlZnQ7XG4gICAgY29uc3QgeSA9IHBhZ2VZIC0gdGhpcy5fYm91bmRpbmdDbGllbnRSZWN0LnRvcDtcblxuICAgIGlmICh0aGlzLl9vblN0YXJ0KHgsIHkpID09PSB0cnVlKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5fb25Ub3VjaE1vdmUpO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5fb25Ub3VjaEVuZCk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0aGlzLl9vblRvdWNoRW5kKTtcbiAgICB9XG4gIH1cblxuICBfb25Ub3VjaE1vdmUoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudCB0ZXh0IHNlbGVjdGlvblxuXG4gICAgY29uc3QgdG91Y2hlcyA9IEFycmF5LmZyb20oZS50b3VjaGVzKTtcbiAgICBjb25zdCB0b3VjaCA9IHRvdWNoZXMuZmlsdGVyKCh0KSA9PiB0LmlkZW50aWZpZXIgPT09IHRoaXMuX3RvdWNoSWQpWzBdO1xuXG4gICAgaWYgKHRvdWNoKSB7XG4gICAgICBjb25zdCBwYWdlWCA9IHRvdWNoLnBhZ2VYO1xuICAgICAgY29uc3QgcGFnZVkgPSB0b3VjaC5wYWdlWTtcbiAgICAgIGNvbnN0IHggPSBwYWdlWCAtIHRoaXMuX2JvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0O1xuICAgICAgY29uc3QgeSA9IHBhZ2VZIC0gdGhpcy5fYm91bmRpbmdDbGllbnRSZWN0LnRvcDtcblxuICAgICAgdGhpcy5fb25Nb3ZlKHgsIHkpO1xuICAgIH1cbiAgfVxuXG4gIF9vblRvdWNoRW5kKGUpIHtcbiAgICBjb25zdCB0b3VjaGVzID0gQXJyYXkuZnJvbShlLnRvdWNoZXMpO1xuICAgIGNvbnN0IHRvdWNoID0gdG91Y2hlcy5maWx0ZXIoKHQpID0+IHQuaWRlbnRpZmllciA9PT0gdGhpcy5fdG91Y2hJZClbMF07XG5cbiAgICBpZiAodG91Y2ggPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fb25FbmQoKTtcbiAgICAgIHRoaXMuX3RvdWNoSWQgPSBudWxsO1xuXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5fb25Ub3VjaE1vdmUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5fb25Ub3VjaEVuZCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0aGlzLl9vblRvdWNoRW5kKTtcblxuICAgIH1cbiAgfVxuXG4gIF91cGRhdGVQb3NpdGlvbih4LCB5KSB7XG4gICAgY29uc3Qge8Kgb3JpZW50YXRpb24sIGhlaWdodCB9ID0gdGhpcy5wYXJhbXM7XG4gICAgY29uc3QgcG9zaXRpb24gPSBvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnID8geCA6IHk7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnNjcmVlblNjYWxlLmludmVydChwb3NpdGlvbik7XG5cbiAgICB0aGlzLl91cGRhdGVWYWx1ZSh2YWx1ZSk7XG4gIH1cblxuICBfcmVuZGVyKGNsaXBwZWRWYWx1ZSkge1xuICAgIGNvbnN0IHsgYmFja2dyb3VuZENvbG9yLCBmb3JlZ3JvdW5kQ29sb3IsIG9yaWVudGF0aW9uIH0gPSB0aGlzLnBhcmFtcztcbiAgICBjb25zdCBjYW52YXNQb3NpdGlvbiA9IE1hdGgucm91bmQodGhpcy5jYW52YXNTY2FsZShjbGlwcGVkVmFsdWUpKTtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuX2NhbnZhc1dpZHRoO1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuX2NhbnZhc0hlaWdodDtcbiAgICBjb25zdCBjdHggPSB0aGlzLmN0eDtcblxuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIC8vIGJhY2tncm91bmRcbiAgICBjdHguZmlsbFN0eWxlID0gYmFja2dyb3VuZENvbG9yO1xuICAgIGN0eC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIC8vIGZvcmVncm91bmRcbiAgICBjdHguZmlsbFN0eWxlID0gZm9yZWdyb3VuZENvbG9yO1xuXG4gICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpXG4gICAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzUG9zaXRpb24sIGhlaWdodCk7XG4gICAgZWxzZVxuICAgICAgY3R4LmZpbGxSZWN0KDAsIGNhbnZhc1Bvc2l0aW9uLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIC8vIG1hcmtlcnNcbiAgICBjb25zdCBtYXJrZXJzID0gdGhpcy5wYXJhbXMubWFya2VycztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFya2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbWFya2VyID0gbWFya2Vyc1tpXTtcbiAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5jYW52YXNTY2FsZShtYXJrZXIpO1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC43KSc7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG5cbiAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgIGN0eC5tb3ZlVG8ocG9zaXRpb24gLSAwLjUsIDEpO1xuICAgICAgICBjdHgubGluZVRvKHBvc2l0aW9uIC0gMC41LCBoZWlnaHQgLSAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN0eC5tb3ZlVG8oMSwgaGVpZ2h0IC0gcG9zaXRpb24gKyAwLjUpO1xuICAgICAgICBjdHgubGluZVRvKHdpZHRoIC0gMSwgaGVpZ2h0IC0gcG9zaXRpb24gKyAwLjUpO1xuICAgICAgfVxuXG4gICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgLy8gaGFuZGxlIG1vZGVcbiAgICBpZiAodGhpcy5wYXJhbXMubW9kZSA9PT0gJ2hhbmRsZScgJiYgdGhpcy5wYXJhbXMuc2hvd0hhbmRsZSkge1xuICAgICAgY29uc3QgZGVsdGEgPSB0aGlzLnBhcmFtcy5oYW5kbGVTaXplICogdGhpcy5fcGl4ZWxSYXRpbyAvIDI7XG4gICAgICBjb25zdCBzdGFydCA9IGNhbnZhc1Bvc2l0aW9uIC0gZGVsdGE7XG4gICAgICBjb25zdCBlbmQgPSBjYW52YXNQb3NpdGlvbiArIGRlbHRhO1xuXG4gICAgICBjdHguZ2xvYmFsQWxwaGEgPSAxO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMucGFyYW1zLmhhbmRsZUNvbG9yO1xuXG4gICAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICBjdHguZmlsbFJlY3Qoc3RhcnQsIDAsIGVuZCAtIHN0YXJ0LCBoZWlnaHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsIHN0YXJ0LCB3aWR0aCwgZW5kIC0gc3RhcnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGN0eC5yZXN0b3JlKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2xpZGVyO1xuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBTbGlkZXIgfSBmcm9tICcuL1NsaWRlcic7XG4iLCJpbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi4vdXRpbHMvc3R5bGVzJztcbi8vIHN0b3JlIGFsbCBpbnN0YW5jZSBpbiBhIGNvbnRyb2xsZXJzXG5jb25zdCBjb250cm9sbGVycyA9IG5ldyBTZXQoKTtcbmxldCB0aGVtZSA9ICdsaWdodCc7XG5cbi8vIGFkZCBhIHNpbmdsZSBsaXN0ZW5lciBvbiB3aW5kb3cgdG8gdHJpZ2dlciB1cGRhdGVcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgY29udHJvbGxlcnMuZm9yRWFjaCgoY29udHJvbGxlcikgPT4gY29udHJvbGxlci5vblJlc2l6ZSgpKTtcbn0pO1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgdG8gY3JlYXRlIG5ldyBjb250cm9sbGVyc1xuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6YmFzaWNDb250cm9sbGVyc1xuICovXG5jbGFzcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIGluc2VydCBzdHlsZXMgd2hlbiB0aGUgZmlyc3QgY29udHJvbGxlciBpcyBjcmVhdGVkXG4gICAgaWYgKGNvbnRyb2xsZXJzLnNpemUgPT09IDApXG4gICAgICBzdHlsZXMuaW5zZXJ0U3R5bGVTaGVldCgpO1xuXG4gICAgY29udHJvbGxlcnMuYWRkKHRoaXMpO1xuXG4gICAgdGhpcy5fbGlzdGVuZXJzID0gbmV3IFNldCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgdGhlbWUgb2YgdGhlIGNvbnRyb2xsZXJzXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBzdGF0aWMgc2V0IHRoZW1lKHZhbHVlKSB7XG4gICAgY29udHJvbGxlcnMuZm9yRWFjaCgoY29udHJvbGxlcikgPT4gY29udHJvbGxlci4kZWwuY2xhc3NMaXN0LnJlbW92ZSh0aGVtZSkpO1xuICAgIHRoZW1lID0gdmFsdWU7XG4gICAgY29udHJvbGxlcnMuZm9yRWFjaCgoY29udHJvbGxlcikgPT4gY29udHJvbGxlci4kZWwuY2xhc3NMaXN0LmFkZCh0aGVtZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgdGhlbWUgb2YgdGhlIGNvbnRyb2xsZXJzXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBzdGF0aWMgZ2V0IHRoZW1lKCkge1xuICAgIHJldHVybiB0aGVtZTtcbiAgfVxuXG4gIGFkZExpc3RlbmVyKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fbGlzdGVuZXJzLmFkZChjYWxsYmFjayk7XG4gIH1cblxuICByZW1vdmVMaXN0ZW5lcihjYWxsYmFjaykge1xuICAgIHRoaXMuX2xpc3RlbmVycy5yZW1vdmUoY2FsbGJhY2spO1xuICB9XG5cbiAgX2V4ZWN1dGVMaXN0ZW5lcnModmFsdWUpIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMuZm9yRWFjaCgoY2FsbGJhY2spID0+IGNhbGxiYWNrKHZhbHVlKSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgX2FwcGx5T3B0aW9ubmFsUGFyYW1ldGVycygkY29udGFpbmVyID0gbnVsbCwgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgaWYgKCRjb250YWluZXIpIHtcbiAgICAgIGlmICh0eXBlb2YgJGNvbnRhaW5lciA9PT0gJ3N0cmluZycpXG4gICAgICAgICRjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCRjb250YWluZXIpO1xuXG4gICAgICAkY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyKCkpO1xuICAgICAgdGhpcy5vblJlbmRlcigpO1xuICAgIH1cblxuICAgIGlmIChjYWxsYmFjaylcbiAgICAgIHRoaXMuYWRkTGlzdGVuZXIoY2FsbGJhY2spO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlbmRlcih0eXBlID0gbnVsbCkge1xuICAgIHRoaXMuJGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKHN0eWxlcy5ucywgdGhlbWUpO1xuICAgIGlmICh0eXBlICE9PSBudWxsKSB7IHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQodHlwZSk7IH1cblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBvblJlbmRlcigpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMub25SZXNpemUoKSwgMCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgb25SZXNpemUoKSB7XG4gICAgY29uc3QgYm91bmRpbmdSZWN0ID0gdGhpcy4kZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3Qgd2lkdGggPSBib3VuZGluZ1JlY3Qud2lkdGg7XG4gICAgY29uc3QgbWV0aG9kID0gd2lkdGggPiA2MDAgPyAncmVtb3ZlJyA6ICdhZGQnO1xuXG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0W21ldGhvZF0oJ3NtYWxsJyk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgYmluZEV2ZW50cygpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VDb250cm9sbGVyO1xuIiwiaW1wb3J0IEJhc2VDb250cm9sbGVyIGZyb20gJy4vQmFzZUNvbnRyb2xsZXInO1xuaW1wb3J0ICogYXMgZWxlbWVudHMgZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuXG5jbGFzcyBOdW1iZXJCb3ggZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgbWluID0gMCwgbWF4ID0gMSwgc3RlcCA9IDAuMDEsIGRlZmF1bHRWYWx1ZSA9IDAsICRjb250YWluZXIgPSBudWxsLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy50eXBlID0gJ251bWJlci1ib3gnO1xuICAgIHRoaXMubGVnZW5kID0gbGVnZW5kO1xuICAgIHRoaXMubWluID0gMDtcbiAgICB0aGlzLm1heCA9IG1heDtcbiAgICB0aGlzLnN0ZXAgPSBzdGVwO1xuICAgIHRoaXMuX3ZhbHVlID0gZGVmYXVsdFZhbHVlO1xuICAgIHRoaXMuX2lzSW50U3RlcCA9IChzdGVwICUgMSA9PT0gMCk7XG5cbiAgICBzdXBlci5fYXBwbHlPcHRpb25uYWxQYXJhbWV0ZXJzKCRjb250YWluZXIsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICB2YWx1ZSA9IHRoaXMuX2lzSW50U3RlcCA/IHBhcnNlSW50KHZhbHVlLCAxMCkgOiBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICB2YWx1ZSA9IE1hdGgubWluKHRoaXMubWF4LCBNYXRoLm1heCh0aGlzLm1pbiwgdmFsdWUpKTtcblxuICAgIHRoaXMuJG51bWJlci52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgY29udGVudCA9IGBcbiAgICAgIDxzcGFuIGNsYXNzPVwibGVnZW5kXCI+JHt0aGlzLmxlZ2VuZH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlclwiPlxuICAgICAgICAke2VsZW1lbnRzLmFycm93TGVmdH1cbiAgICAgICAgPGlucHV0IGNsYXNzPVwibnVtYmVyXCIgdHlwZT1cIm51bWJlclwiIG1pbj1cIiR7dGhpcy5taW59XCIgbWF4PVwiJHt0aGlzLm1heH1cIiBzdGVwPVwiJHt0aGlzLnN0ZXB9XCIgdmFsdWU9XCIke3RoaXMuX3ZhbHVlfVwiIC8+XG4gICAgICAgICR7ZWxlbWVudHMuYXJyb3dSaWdodH1cbiAgICAgIDwvZGl2PlxuICAgIGA7XG5cbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcih0aGlzLnR5cGUpO1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoJ2FsaWduLXNtYWxsJyk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuJHByZXYgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuYXJyb3ctbGVmdCcpO1xuICAgIHRoaXMuJG5leHQgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuYXJyb3ctcmlnaHQnKTtcbiAgICB0aGlzLiRudW1iZXIgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwibnVtYmVyXCJdJyk7XG5cbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kcHJldi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBjb25zdCBkZWNpbWFscyA9IHRoaXMuc3RlcC50b1N0cmluZygpLnNwbGl0KCcuJylbMV07XG4gICAgICBjb25zdCBleHAgPSBkZWNpbWFscyA/IGRlY2ltYWxzLmxlbmd0aCA6IDA7XG4gICAgICBjb25zdCBtdWx0ID0gTWF0aC5wb3coMTAsIGV4cCk7XG5cbiAgICAgIGNvbnN0IGludFZhbHVlID0gTWF0aC5mbG9vcih0aGlzLnZhbHVlICogbXVsdCArIDAuNSk7XG4gICAgICBjb25zdCBpbnRTdGVwID0gTWF0aC5mbG9vcih0aGlzLnN0ZXAgKiBtdWx0ICsgMC41KTtcbiAgICAgIGNvbnN0IHZhbHVlID0gKGludFZhbHVlIC0gaW50U3RlcCkgLyBtdWx0O1xuXG4gICAgICB0aGlzLnByb3BhZ2F0ZSh2YWx1ZSk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgdGhpcy4kbmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBjb25zdCBkZWNpbWFscyA9IHRoaXMuc3RlcC50b1N0cmluZygpLnNwbGl0KCcuJylbMV07XG4gICAgICBjb25zdCBleHAgPSBkZWNpbWFscyA/IGRlY2ltYWxzLmxlbmd0aCA6IDA7XG4gICAgICBjb25zdCBtdWx0ID0gTWF0aC5wb3coMTAsIGV4cCk7XG5cbiAgICAgIGNvbnN0IGludFZhbHVlID0gTWF0aC5mbG9vcih0aGlzLnZhbHVlICogbXVsdCArIDAuNSk7XG4gICAgICBjb25zdCBpbnRTdGVwID0gTWF0aC5mbG9vcih0aGlzLnN0ZXAgKiBtdWx0ICsgMC41KTtcbiAgICAgIGNvbnN0IHZhbHVlID0gKGludFZhbHVlICsgaW50U3RlcCkgLyBtdWx0O1xuXG4gICAgICB0aGlzLnByb3BhZ2F0ZSh2YWx1ZSk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgdGhpcy4kbnVtYmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XG4gICAgICBsZXQgdmFsdWUgPSB0aGlzLiRudW1iZXIudmFsdWU7XG4gICAgICB2YWx1ZSA9IHRoaXMuX2lzSW50U3RlcCA/IHBhcnNlSW50KHZhbHVlLCAxMCkgOiBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICAgIHZhbHVlID0gTWF0aC5taW4odGhpcy5tYXgsIE1hdGgubWF4KHRoaXMubWluLCB2YWx1ZSkpO1xuXG4gICAgICB0aGlzLnByb3BhZ2F0ZSh2YWx1ZSk7XG4gICAgfSwgZmFsc2UpO1xuICB9XG5cbiAgcHJvcGFnYXRlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSB0aGlzLl92YWx1ZSkgeyByZXR1cm47IH1cblxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy4kbnVtYmVyLnZhbHVlID0gdmFsdWU7XG5cbiAgICB0aGlzLl9leGVjdXRlTGlzdGVuZXJzKHRoaXMuX3ZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBOdW1iZXJCb3g7XG4iLCJpbXBvcnQgQmFzZUNvbnRyb2xsZXIgZnJvbSAnLi9CYXNlQ29udHJvbGxlcic7XG5pbXBvcnQgKiBhcyBlbGVtZW50cyBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5cbmNsYXNzIFNlbGVjdEJ1dHRvbnMgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgb3B0aW9ucywgZGVmYXVsdFZhbHVlLCAkY29udGFpbmVyID0gbnVsbCwgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudHlwZSA9ICdzZWxlY3QtYnV0dG9ucyc7XG4gICAgdGhpcy5sZWdlbmQgPSBsZWdlbmQ7IC8vIG5vbiBicmVha2FibGUgc3BhY2UgdG8ga2VlcCByZW5kZXJpbmcgY29uc2lzdGVuY3lcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuX3ZhbHVlID0gZGVmYXVsdFZhbHVlO1xuICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IHRoaXMub3B0aW9ucy5pbmRleE9mKHRoaXMuX3ZhbHVlKTtcbiAgICB0aGlzLl9jdXJyZW50SW5kZXggPSBjdXJyZW50SW5kZXggPT09IC0xID/CoDAgOiBjdXJyZW50SW5kZXg7XG4gICAgdGhpcy5fbWF4SW5kZXggPSB0aGlzLm9wdGlvbnMubGVuZ3RoIC0gMTtcblxuICAgIHN1cGVyLl9hcHBseU9wdGlvbm5hbFBhcmFtZXRlcnMoJGNvbnRhaW5lciwgY2FsbGJhY2spO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5vcHRpb25zLmluZGV4T2YodmFsdWUpO1xuXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IGluZGV4O1xuICAgICAgdGhpcy5faGlnaGxpZ2h0QnRuKHRoaXMuX2N1cnJlbnRJbmRleCk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBgXG4gICAgICA8c3BhbiBjbGFzcz1cImxlZ2VuZFwiPiR7dGhpcy5sZWdlbmR9PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImlubmVyLXdyYXBwZXJcIj5cbiAgICAgICAgJHtlbGVtZW50cy5hcnJvd0xlZnR9XG4gICAgICAgICR7dGhpcy5vcHRpb25zLm1hcCgob3B0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiYnRuXCIgZGF0YS1pbmRleD1cIiR7aW5kZXh9XCIgZGF0YS12YWx1ZT1cIiR7b3B0aW9ufVwiPlxuICAgICAgICAgICAgICAke29wdGlvbn1cbiAgICAgICAgICAgIDwvYT5gO1xuICAgICAgICB9KS5qb2luKCcnKX1cbiAgICAgICAgJHtlbGVtZW50cy5hcnJvd1JpZ2h0fVxuICAgICAgPC9kaXY+XG4gICAgYDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKHRoaXMudHlwZSk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuJHByZXYgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuYXJyb3ctbGVmdCcpO1xuICAgIHRoaXMuJG5leHQgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuYXJyb3ctcmlnaHQnKTtcbiAgICB0aGlzLiRidG5zID0gQXJyYXkuZnJvbSh0aGlzLiRlbC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuJykpO1xuICAgIHRoaXMuX2hpZ2hsaWdodEJ0bih0aGlzLl9jdXJyZW50SW5kZXgpO1xuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLiRwcmV2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9jdXJyZW50SW5kZXggLSAxO1xuICAgICAgdGhpcy5wcm9wYWdhdGUoaW5kZXgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy4kbmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fY3VycmVudEluZGV4ICsgMTtcbiAgICAgIHRoaXMucHJvcGFnYXRlKGluZGV4KTtcbiAgICB9KTtcblxuICAgIHRoaXMuJGJ0bnMuZm9yRWFjaCgoJGJ0biwgaW5kZXgpID0+IHtcbiAgICAgICRidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMucHJvcGFnYXRlKGluZGV4KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvcGFnYXRlKGluZGV4KSB7XG4gICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+IHRoaXMuX21heEluZGV4KSByZXR1cm47XG5cbiAgICB0aGlzLl9jdXJyZW50SW5kZXggPSBpbmRleDtcbiAgICB0aGlzLl92YWx1ZSA9IHRoaXMub3B0aW9uc1tpbmRleF07XG4gICAgdGhpcy5faGlnaGxpZ2h0QnRuKHRoaXMuX2N1cnJlbnRJbmRleCk7XG5cbiAgICB0aGlzLl9leGVjdXRlTGlzdGVuZXJzKHRoaXMuX3ZhbHVlKTtcbiAgfVxuXG4gIF9oaWdobGlnaHRCdG4oYWN0aXZlSW5kZXgpIHtcbiAgICB0aGlzLiRidG5zLmZvckVhY2goKCRidG4sIGluZGV4KSA9PiB7XG4gICAgICAkYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXG4gICAgICBpZiAoYWN0aXZlSW5kZXggPT09IGluZGV4KSB7XG4gICAgICAgICRidG4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0QnV0dG9ucztcbiIsImltcG9ydCBCYXNlQ29udHJvbGxlciBmcm9tICcuL0Jhc2VDb250cm9sbGVyJztcbmltcG9ydCAqIGFzIGVsZW1lbnRzIGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcblxuY2xhc3MgU2VsZWN0TGlzdCBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IobGVnZW5kLCBvcHRpb25zLCBkZWZhdWx0VmFsdWUsICRjb250YWluZXIgPSBudWxsLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy50eXBlID0gJ3NlbGVjdC1saXN0JztcbiAgICB0aGlzLmxlZ2VuZCA9IGxlZ2VuZDtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuX3ZhbHVlID0gZGVmYXVsdFZhbHVlO1xuICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IHRoaXMub3B0aW9ucy5pbmRleE9mKHRoaXMuX3ZhbHVlKTtcbiAgICB0aGlzLl9jdXJyZW50SW5kZXggPSBjdXJyZW50SW5kZXggPT09IC0xID/CoDAgOiBjdXJyZW50SW5kZXg7XG4gICAgdGhpcy5fbWF4SW5kZXggPSB0aGlzLm9wdGlvbnMubGVuZ3RoIC0gMTtcblxuICAgIHN1cGVyLl9hcHBseU9wdGlvbm5hbFBhcmFtZXRlcnMoJGNvbnRhaW5lciwgY2FsbGJhY2spO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuJHNlbGVjdC52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5fY3VycmVudEluZGV4ID0gdGhpcy5vcHRpb25zLmluZGV4T2YodmFsdWUpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBgXG4gICAgICA8c3BhbiBjbGFzcz1cImxlZ2VuZFwiPiR7dGhpcy5sZWdlbmR9PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImlubmVyLXdyYXBwZXJcIj5cbiAgICAgICAgJHtlbGVtZW50cy5hcnJvd0xlZnR9XG4gICAgICAgIDxzZWxlY3Q+XG4gICAgICAgICR7dGhpcy5vcHRpb25zLm1hcCgob3B0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgIHJldHVybiBgPG9wdGlvbiB2YWx1ZT1cIiR7b3B0aW9ufVwiPiR7b3B0aW9ufTwvb3B0aW9uPmA7XG4gICAgICAgIH0pLmpvaW4oJycpfVxuICAgICAgICA8c2VsZWN0PlxuICAgICAgICAke2VsZW1lbnRzLmFycm93UmlnaHR9XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIodGhpcy50eXBlKTtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKCdhbGlnbi1zbWFsbCcpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiRwcmV2ID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmFycm93LWxlZnQnKTtcbiAgICB0aGlzLiRuZXh0ID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmFycm93LXJpZ2h0Jyk7XG4gICAgdGhpcy4kc2VsZWN0ID0gdGhpcy4kZWwucXVlcnlTZWxlY3Rvcignc2VsZWN0Jyk7XG4gICAgLy8gc2V0IHRvIGRlZmF1bHQgdmFsdWVcbiAgICB0aGlzLiRzZWxlY3QudmFsdWUgPSB0aGlzLm9wdGlvbnNbdGhpcy5fY3VycmVudEluZGV4XTtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kcHJldi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fY3VycmVudEluZGV4IC0gMTtcbiAgICAgIHRoaXMucHJvcGFnYXRlKGluZGV4KTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICB0aGlzLiRuZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9jdXJyZW50SW5kZXggKyAxO1xuICAgICAgdGhpcy5wcm9wYWdhdGUoaW5kZXgpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIHRoaXMuJHNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuJHNlbGVjdC52YWx1ZTtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5vcHRpb25zLmluZGV4T2YodmFsdWUpO1xuICAgICAgdGhpcy5wcm9wYWdhdGUoaW5kZXgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvcGFnYXRlKGluZGV4KSB7XG4gICAgaWYgKGluZGV4IDwgMCB8fMKgaW5kZXggPiB0aGlzLl9tYXhJbmRleCkgcmV0dXJuO1xuXG4gICAgY29uc29sZS5sb2coaW5kZXgpO1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5vcHRpb25zW2luZGV4XTtcbiAgICB0aGlzLl9jdXJyZW50SW5kZXggPSBpbmRleDtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuJHNlbGVjdC52YWx1ZSA9IHZhbHVlO1xuXG4gICAgdGhpcy5fZXhlY3V0ZUxpc3RlbmVycyh0aGlzLl92YWx1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0TGlzdDtcbiIsImltcG9ydCBCYXNlQ29udHJvbGxlciBmcm9tICcuL0Jhc2VDb250cm9sbGVyJztcbmltcG9ydCAqIGFzIGd1aUNvbXBvbmVudHMgZnJvbSAnZ3VpLWNvbXBvbmVudHMnO1xuXG5jbGFzcyBTbGlkZXIgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgbWluID0gMCwgbWF4ID0gMSwgc3RlcCA9IDAuMDEsIGRlZmF1bHRWYWx1ZSA9IDAsIHVuaXQgPSAnJywgc2l6ZSA9ICdkZWZhdWx0JywgJGNvbnRhaW5lciA9IG51bGwsIGNhbGxiYWNrID0gbnVsbCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnR5cGUgPSAnc2xpZGVyJztcbiAgICB0aGlzLmxlZ2VuZCA9IGxlZ2VuZDtcbiAgICB0aGlzLm1pbiA9IG1pbjtcbiAgICB0aGlzLm1heCA9IG1heDtcbiAgICB0aGlzLnN0ZXAgPSBzdGVwO1xuICAgIHRoaXMudW5pdCA9IHVuaXQ7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICB0aGlzLl92YWx1ZSA9IGRlZmF1bHRWYWx1ZTtcblxuICAgIHRoaXMuX29uU2xpZGVyQ2hhbmdlID0gdGhpcy5fb25TbGlkZXJDaGFuZ2UuYmluZCh0aGlzKTtcblxuICAgIHN1cGVyLl9hcHBseU9wdGlvbm5hbFBhcmFtZXRlcnMoJGNvbnRhaW5lciwgY2FsbGJhY2spO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcblxuICAgIGlmICh0aGlzLiRudW1iZXIgJiYgdGhpcy4kcmFuZ2UpIHtcbiAgICAgIHRoaXMuJG51bWJlci52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICB0aGlzLiRyYW5nZS52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjb250ZW50ID0gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJsZWdlbmRcIj4ke3RoaXMubGVnZW5kfTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbm5lci13cmFwcGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyYW5nZVwiPjwvZGl2PlxuICAgICAgICA8IS0tIDxpbnB1dCBjbGFzcz1cInJhbmdlXCIgdHlwZT1cInJhbmdlXCIgbWluPVwiJHt0aGlzLm1pbn1cIiBtYXg9XCIke3RoaXMubWF4fVwiIHN0ZXA9XCIke3RoaXMuc3RlcH1cIiB2YWx1ZT1cIiR7dGhpcy52YWx1ZX1cIiAvPiAtLT5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm51bWJlci13cmFwcGVyXCI+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cIm51bWJlclwiIG1pbj1cIiR7dGhpcy5taW59XCIgbWF4PVwiJHt0aGlzLm1heH1cIiBzdGVwPVwiJHt0aGlzLnN0ZXB9XCIgdmFsdWU9XCIke3RoaXMudmFsdWV9XCIgLz5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInVuaXRcIj4ke3RoaXMudW5pdH08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+YDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKHRoaXMudHlwZSk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKGBzbGlkZXItJHt0aGlzLnNpemV9YCk7XG5cbiAgICB0aGlzLiRyYW5nZSA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5yYW5nZScpO1xuICAgIHRoaXMuJG51bWJlciA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoYGlucHV0W3R5cGU9XCJudW1iZXJcIl1gKTtcblxuICAgIHRoaXMuc2xpZGVyID0gbmV3IGd1aUNvbXBvbmVudHMuU2xpZGVyKHtcbiAgICAgIGNvbnRhaW5lcjogdGhpcy4kcmFuZ2UsXG4gICAgICBjYWxsYmFjazogdGhpcy5fb25TbGlkZXJDaGFuZ2UsXG4gICAgICBtaW46IHRoaXMubWluLFxuICAgICAgbWF4OiB0aGlzLm1heCxcbiAgICAgIHN0ZXA6IHRoaXMuc3RlcCxcbiAgICAgIGRlZmF1bHQ6IHRoaXMudmFsdWUsXG4gICAgICBmb3JlZ3JvdW5kQ29sb3I6ICcjYWJhYmFiJyxcbiAgICB9KTtcblxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLiRudW1iZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBwYXJzZUZsb2F0KHRoaXMuJG51bWJlci52YWx1ZSk7XG4gICAgICB0aGlzLnNsaWRlci52YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcblxuICAgICAgdGhpcy5fZXhlY3V0ZUxpc3RlbmVycyh0aGlzLl92YWx1ZSk7XG4gICAgfSwgZmFsc2UpO1xuICB9XG5cbiAgb25SZXNpemUoKSB7XG4gICAgc3VwZXIub25SZXNpemUoKTtcblxuICAgIGNvbnNvbGUubG9nKCc/Pz8nKTtcbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHTCoH0gPSB0aGlzLiRyYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0aGlzLnNsaWRlci5yZXNpemUod2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICBfb25TbGlkZXJDaGFuZ2UodmFsdWUpIHtcbiAgICB0aGlzLiRudW1iZXIudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuXG4gICAgdGhpcy5fZXhlY3V0ZUxpc3RlbmVycyh0aGlzLl92YWx1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2xpZGVyO1xuIiwiaW1wb3J0IEJhc2VDb250cm9sbGVyIGZyb20gJy4vQmFzZUNvbnRyb2xsZXInO1xuXG5cbi8qKlxuICogRGlzcGxheSBhIHZhbHVlLCBSZWFkLW9ubHkuXG4gKi9cbmNsYXNzIFRleHQgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgZGVmYXVsdFZhbHVlLCByZWFkb25seSA9IHRydWUsICRjb250YWluZXIgPSBudWxsLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy50eXBlID0gJ3RleHQnO1xuICAgIHRoaXMubGVnZW5kID0gbGVnZW5kO1xuICAgIHRoaXMuX3JlYWRvbmx5ID0gcmVhZG9ubHk7XG4gICAgdGhpcy5fdmFsdWUgPSBkZWZhdWx0VmFsdWU7XG5cbiAgICB0aGlzLl9hcHBseU9wdGlvbm5hbFBhcmFtZXRlcnMoJGNvbnRhaW5lciwgY2FsbGJhY2spO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuJGlucHV0LnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCByZWFkb25seSA9IHRoaXMuX3JlYWRvbmx5ID8gJ3JlYWRvbmx5JyA6ICcnXG4gICAgY29uc3QgY29udGVudCA9IGBcbiAgICAgIDxzcGFuIGNsYXNzPVwibGVnZW5kXCI+JHt0aGlzLmxlZ2VuZH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlclwiPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJ0ZXh0XCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIiR7dGhpcy5fdmFsdWV9XCIgJHtyZWFkb25seX0gLz5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG5cbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcih0aGlzLnR5cGUpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiRpbnB1dCA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy50ZXh0Jyk7XG5cbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoKSA9PiB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHRoaXMuJGlucHV0LnZhbHVlO1xuICAgICAgdGhpcy5fZXhlY3V0ZUxpc3RlbmVycyh0aGlzLl92YWx1ZSk7XG4gICAgfSwgZmFsc2UpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRleHQ7XG4iLCJpbXBvcnQgQmFzZUNvbnRyb2xsZXIgZnJvbSAnLi9CYXNlQ29udHJvbGxlcic7XG5pbXBvcnQgc3R5bGVzIGZyb20gJy4uL3V0aWxzL3N0eWxlcyc7XG5cbmNsYXNzIFRpdGxlIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihsZWdlbmQsICRjb250YWluZXIgPSBudWxsKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudHlwZSA9ICd0aXRsZSc7XG4gICAgdGhpcy5sZWdlbmQgPSBsZWdlbmQ7XG5cbiAgICBzdXBlci5fYXBwbHlPcHRpb25uYWxQYXJhbWV0ZXJzKCRjb250YWluZXIpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCBjb250ZW50ID0gYDxzcGFuIGNsYXNzPVwibGVnZW5kXCI+JHt0aGlzLmxlZ2VuZH08L3NwYW4+YDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKHRoaXMudHlwZSk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUaXRsZTtcbiIsImltcG9ydCBCYXNlQ29udHJvbGxlciBmcm9tICcuL0Jhc2VDb250cm9sbGVyJztcbmltcG9ydCAqIGFzIGVsZW1lbnRzIGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcblxuY2xhc3MgVG9nZ2xlIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihsZWdlbmQsIGFjdGl2ZSA9IGZhbHNlLCAkY29udGFpbmVyID0gZmFsc2UsIGNhbGxiYWNrID0gbnVsbCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnR5cGUgPSAndG9nZ2xlJztcbiAgICB0aGlzLmxlZ2VuZCA9IGxlZ2VuZDtcbiAgICB0aGlzLl9hY3RpdmUgPSBhY3RpdmU7XG5cbiAgICBzdXBlci5fYXBwbHlPcHRpb25uYWxQYXJhbWV0ZXJzKCRjb250YWluZXIsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHNldCB2YWx1ZShib29sKSB7XG4gICAgdGhpcy5hY3RpdmUgPSBib29sO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIC8vIGFsaWFzIHZhbHVlXG4gIHNldCBhY3RpdmUoYm9vbCkge1xuICAgIHRoaXMuX2FjdGl2ZSA9IGJvb2w7XG4gICAgdGhpcy5fdXBkYXRlQnRuKCk7XG4gIH1cblxuICBnZXQgYWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmU7XG4gIH1cblxuICBfdXBkYXRlQnRuKCkge1xuICAgIHZhciBtZXRob2QgPSB0aGlzLmFjdGl2ZSA/ICdhZGQnIDogJ3JlbW92ZSc7XG4gICAgdGhpcy4kdG9nZ2xlLmNsYXNzTGlzdFttZXRob2RdKCdhY3RpdmUnKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgY29udGVudCA9IGBcbiAgICAgIDxzcGFuIGNsYXNzPVwibGVnZW5kXCI+JHt0aGlzLmxlZ2VuZH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlclwiPlxuICAgICAgICAke2VsZW1lbnRzLnRvZ2dsZX1cbiAgICAgIDwvZGl2PmA7XG5cbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcih0aGlzLnR5cGUpO1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoJ2FsaWduLXNtYWxsJyk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuJHRvZ2dsZSA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy50b2dnbGUtZWxlbWVudCcpO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIHRoaXMuYWN0aXZlID0gdGhpcy5fYWN0aXZlOyAvLyBpbml0aWFsaXplIHN0YXRlXG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHRoaXMuYWN0aXZlID0gIXRoaXMuYWN0aXZlO1xuICAgICAgdGhpcy5fZXhlY3V0ZUxpc3RlbmVycyh0aGlzLl9hY3RpdmUpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRvZ2dsZTtcbiIsImltcG9ydCBCYXNlQ29udHJvbGxlciBmcm9tICcuL0Jhc2VDb250cm9sbGVyJztcblxuY2xhc3MgVHJpZ2dlckJ1dHRvbnMgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgbGFiZWxzLCAkY29udGFpbmVyID0gbnVsbCwgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudHlwZSA9ICdidXR0b25zJztcbiAgICB0aGlzLmxlZ2VuZCA9IGxlZ2VuZCB8fMKgJyZuYnNwJzsgLy8gbm9uIGJyZWFrYWJsZSBzcGFjZSB0byBrZWVwIHJlbmRlcmluZyBjb25zaXN0ZW5jeVxuICAgIHRoaXMubGFiZWxzID0gbGFiZWxzO1xuICAgIHRoaXMuX2luZGV4ID0gbnVsbDtcbiAgICB0aGlzLl92YWx1ZSA9IG51bGw7XG5cbiAgICBzdXBlci5fYXBwbHlPcHRpb25uYWxQYXJhbWV0ZXJzKCRjb250YWluZXIsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgY29udGVudCA9IGBcbiAgICAgIDxzcGFuIGNsYXNzPVwibGVnZW5kXCI+JHt0aGlzLmxlZ2VuZH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlclwiPlxuICAgICAgICAke3RoaXMubGFiZWxzLm1hcCgobGFiZWwsIGluZGV4KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidG5cIj5cbiAgICAgICAgICAgICAgJHtsYWJlbH1cbiAgICAgICAgICAgIDwvYT5gO1xuICAgICAgICB9KS5qb2luKCcnKX1cbiAgICAgIDwvZGl2PmA7XG5cbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcih0aGlzLnR5cGUpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiRidXR0b25zID0gQXJyYXkuZnJvbSh0aGlzLiRlbC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuJykpO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kYnV0dG9ucy5mb3JFYWNoKCgkYnRuLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmxhYmVsc1tpbmRleF07XG5cbiAgICAgICRidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy5fdmFsdWUgPSBsYWJlbDtcbiAgICAgICAgdGhpcy5fZXhlY3V0ZUxpc3RlbmVycyh0aGlzLl92YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUcmlnZ2VyQnV0dG9ucztcbiIsImltcG9ydCAqIGFzIF9zdHlsZXMgZnJvbSAnLi91dGlscy9zdHlsZXMnO1xuZXhwb3J0IGNvbnN0IHN0eWxlcyA9IF9zdHlsZXM7XG4vLyBleHBvc2UgZm9yIHBsdWdpbnNcbmltcG9ydCBfQmFzZUNvbnRyb2xsZXIgZnJvbSAnLi9jb21wb25lbnRzL0Jhc2VDb250cm9sbGVyJztcbmV4cG9ydCBjb25zdCBCYXNlQ29udHJvbGxlciA9IF9CYXNlQ29udHJvbGxlcjtcblxuZXhwb3J0IHsgZGVmYXVsdCBhcyBOdW1iZXJCb3ggfSBmcm9tICcuL2NvbXBvbmVudHMvTnVtYmVyQm94JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU2VsZWN0QnV0dG9ucyB9IGZyb20gJy4vY29tcG9uZW50cy9TZWxlY3RCdXR0b25zJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU2VsZWN0TGlzdCB9IGZyb20gJy4vY29tcG9uZW50cy9TZWxlY3RMaXN0JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU2xpZGVyIH0gZnJvbSAnLi9jb21wb25lbnRzL1NsaWRlcic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFRleHQgfSBmcm9tICcuL2NvbXBvbmVudHMvVGV4dCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFRpdGxlIH0gZnJvbSAnLi9jb21wb25lbnRzL1RpdGxlJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVG9nZ2xlIH0gZnJvbSAnLi9jb21wb25lbnRzL1RvZ2dsZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFRyaWdnZXJCdXR0b25zIH0gZnJvbSAnLi9jb21wb25lbnRzL1RyaWdnZXJCdXR0b25zJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNldFRoZW1lKHRoZW1lKSB7XG4gIF9CYXNlQ29udHJvbGxlci50aGVtZSA9IHRoZW1lO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVTdHlsZXMoKSB7XG4gIF9zdHlsZXMuZGlzYWJsZSgpO1xufTtcblxuIiwiXG5leHBvcnQgY29uc3QgdG9nZ2xlID0gYFxuICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzcz1cInRvZ2dsZS1lbGVtZW50XCIgdmVyc2lvbj1cIjEuMVwiIHZpZXdCb3g9XCIwIDAgNTAgNTBcIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwibm9uZVwiPlxuICAgICAgPGcgY2xhc3M9XCJ4XCI+XG4gICAgICAgIDxsaW5lIHgxPVwiOFwiIHkxPVwiOFwiIHgyPVwiNDJcIiB5Mj1cIjQyXCIgc3Ryb2tlPVwid2hpdGVcIiAvPlxuICAgICAgICA8bGluZSB4MT1cIjhcIiB5MT1cIjQyXCIgeDI9XCI0MlwiIHkyPVwiOFwiIHN0cm9rZT1cIndoaXRlXCIgLz5cbiAgICAgIDwvZz5cbiAgPC9zdmc+XG5gO1xuXG5leHBvcnQgY29uc3QgYXJyb3dSaWdodCA9IGBcbiAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3M9XCJhcnJvdy1yaWdodFwiIHZlcnNpb249XCIxLjFcIiB2aWV3Qm94PVwiMCAwIDUwIDUwXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cIm5vbmVcIj5cbiAgICA8bGluZSB4MT1cIjEwXCIgeTE9XCIxMFwiIHgyPVwiNDBcIiB5Mj1cIjI1XCIgLz5cbiAgICA8bGluZSB4MT1cIjEwXCIgeTE9XCI0MFwiIHgyPVwiNDBcIiB5Mj1cIjI1XCIgLz5cbiAgPC9zdmc+XG5gO1xuXG5leHBvcnQgY29uc3QgYXJyb3dMZWZ0ID0gYFxuICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzcz1cImFycm93LWxlZnRcIiB2ZXJzaW9uPVwiMS4xXCIgdmlld0JveD1cIjAgMCA1MCA1MFwiIHByZXNlcnZlQXNwZWN0UmF0aW89XCJub25lXCI+XG4gICAgPGxpbmUgeDE9XCI0MFwiIHkxPVwiMTBcIiB4Mj1cIjEwXCIgeTI9XCIyNVwiIC8+XG4gICAgPGxpbmUgeDE9XCI0MFwiIHkxPVwiNDBcIiB4Mj1cIjEwXCIgeTI9XCIyNVwiIC8+XG4gIDwvc3ZnPlxuYDsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiIC5iYXNpYy1jb250cm9sbGVycyB7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIHsgd2lkdGg6IDEwMCU7IG1heC13aWR0aDogODAwcHg7IGhlaWdodDogMzRweDsgcGFkZGluZzogM3B4OyBtYXJnaW46IDRweCBhdXRvOyBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmOyBib3JkZXI6IDFweCBzb2xpZCAjYWFhYWFhOyBib3gtc2l6aW5nOiBib3JkZXItYm94OyBib3JkZXItcmFkaXVzOiAycHg7IGRpc3BsYXk6IGJsb2NrOyBjb2xvcjogIzQ2NDY0NjsgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lOyAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lOyAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7IC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7IC1tcy11c2VyLXNlbGVjdDogbm9uZTsgdXNlci1zZWxlY3Q6IG5vbmU7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC5sZWdlbmQgeyBmb250OiBpdGFsaWMgbm9ybWFsIDEuMmVtIFF1aWNrc2FuZCwgYXJpYWwsIHNhbnMtc2VyaWY7IGxpbmUtaGVpZ2h0OiAyNnB4OyBvdmVyZmxvdzogaGlkZGVuOyB0ZXh0LWFsaWduOiByaWdodDsgcGFkZGluZzogMCA4cHggMCAwOyBkaXNwbGF5OiBibG9jazsgYm94LXNpemluZzogYm9yZGVyLWJveDsgd2lkdGg6IDI0JTsgZmxvYXQ6IGxlZnQ7IHdoaXRlLXNwYWNlOiBub3dyYXA7IC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7IC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7IC1tcy11c2VyLXNlbGVjdDogbm9uZTsgLW8tdXNlci1zZWxlY3Q6IG5vbmU7IHVzZXItc2VsZWN0OiBub25lOyB9IC5iYXNpYy1jb250cm9sbGVycyAuaW5uZXItd3JhcHBlciB7IGRpc3BsYXk6IC13ZWJraXQtaW5saW5lLWZsZXg7IGRpc3BsYXk6IGlubGluZS1mbGV4OyAtd2Via2l0LWZsZXgtd3JhcDogbm8td3JhcDsgZmxleC13cmFwOiBuby13cmFwOyB3aWR0aDogNzYlOyBmbG9hdDogbGVmdDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGwgeyBoZWlnaHQ6IDQ4cHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsOm5vdCguYWxpZ24tc21hbGwpIHsgaGVpZ2h0OiBhdXRvOyB9IC5iYXNpYy1jb250cm9sbGVycy5zbWFsbDpub3QoLmFsaWduLXNtYWxsKSAubGVnZW5kIHsgd2lkdGg6IDEwMCU7IGZsb2F0OiBub25lOyB0ZXh0LWFsaWduOiBsZWZ0OyBsaW5lLWhlaWdodDogNDBweDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGw6bm90KC5hbGlnbi1zbWFsbCkgLmlubmVyLXdyYXBwZXIgeyB3aWR0aDogMTAwJTsgZmxvYXQ6IG5vbmU7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsLmFsaWduLXNtYWxsIC5sZWdlbmQgeyBkaXNwbGF5OiBibG9jazsgbWFyZ2luLXJpZ2h0OiAyMHB4OyB0ZXh0LWFsaWduOiBsZWZ0OyBsaW5lLWhlaWdodDogNDBweDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGwuYWxpZ24tc21hbGwgLmlubmVyLXdyYXBwZXIgeyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHdpZHRoOiBhdXRvOyB9IC5iYXNpYy1jb250cm9sbGVycyAuYXJyb3ctcmlnaHQsIC5iYXNpYy1jb250cm9sbGVycyAuYXJyb3ctbGVmdCB7IGJvcmRlci1yYWRpdXM6IDJweDsgd2lkdGg6IDE0cHg7IGhlaWdodDogMjZweDsgY3Vyc29yOiBwb2ludGVyOyBiYWNrZ3JvdW5kLWNvbG9yOiAjNDY0NjQ2OyB9IC5iYXNpYy1jb250cm9sbGVycyAuYXJyb3ctcmlnaHQgbGluZSwgLmJhc2ljLWNvbnRyb2xsZXJzIC5hcnJvdy1sZWZ0IGxpbmUgeyBzdHJva2Utd2lkdGg6IDNweDsgc3Ryb2tlOiAjZmZmZmZmOyB9IC5iYXNpYy1jb250cm9sbGVycyAuYXJyb3ctcmlnaHQ6aG92ZXIsIC5iYXNpYy1jb250cm9sbGVycyAuYXJyb3ctbGVmdDpob3ZlciB7IGJhY2tncm91bmQtY29sb3I6ICM2ODY4Njg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC5hcnJvdy1yaWdodDphY3RpdmUsIC5iYXNpYy1jb250cm9sbGVycyAuYXJyb3ctbGVmdDphY3RpdmUgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjOTA5MDkwOyB9IC5iYXNpYy1jb250cm9sbGVycyAudG9nZ2xlLWVsZW1lbnQgeyB3aWR0aDogMjZweDsgaGVpZ2h0OiAyNnB4OyBib3JkZXItcmFkaXVzOiAycHg7IGJhY2tncm91bmQtY29sb3I6ICM0NjQ2NDY7IGN1cnNvcjogcG9pbnRlcjsgfSAuYmFzaWMtY29udHJvbGxlcnMgLnRvZ2dsZS1lbGVtZW50OmhvdmVyIHsgYmFja2dyb3VuZC1jb2xvcjogIzY4Njg2ODsgfSAuYmFzaWMtY29udHJvbGxlcnMgLnRvZ2dsZS1lbGVtZW50IGxpbmUgeyBzdHJva2Utd2lkdGg6IDNweDsgfSAuYmFzaWMtY29udHJvbGxlcnMgLnRvZ2dsZS1lbGVtZW50IC54IHsgZGlzcGxheTogbm9uZTsgfSAuYmFzaWMtY29udHJvbGxlcnMgLnRvZ2dsZS1lbGVtZW50LmFjdGl2ZSAueCB7IGRpc3BsYXk6IGJsb2NrOyB9IC5iYXNpYy1jb250cm9sbGVycyAuYnRuIHsgZGlzcGxheTogYmxvY2s7IHRleHQtYWxpZ246IGNlbnRlcjsgZm9udDogbm9ybWFsIG5vcm1hbCAxMnB4IGFyaWFsOyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IGhlaWdodDogMjZweDsgbGluZS1oZWlnaHQ6IDI2cHg7IGJhY2tncm91bmQtY29sb3I6ICM0NjQ2NDY7IGJvcmRlcjogbm9uZTsgY29sb3I6ICNmZmZmZmY7IG1hcmdpbjogMCA0cHggMCAwOyBwYWRkaW5nOiAwOyBib3gtc2l6aW5nOiBib3JkZXItYm94OyBib3JkZXItcmFkaXVzOiAycHg7IGN1cnNvcjogcG9pbnRlcjsgLXdlYmtpdC1mbGV4LWdyb3c6IDE7IGZsZXgtZ3JvdzogMTsgfSAuYmFzaWMtY29udHJvbGxlcnMgLmJ0bjpsYXN0LWNoaWxkIHsgbWFyZ2luOiAwOyB9IC5iYXNpYy1jb250cm9sbGVycyAuYnRuOmhvdmVyIHsgYmFja2dyb3VuZC1jb2xvcjogIzY4Njg2ODsgfSAuYmFzaWMtY29udHJvbGxlcnMgLmJ0bjphY3RpdmUsIC5iYXNpYy1jb250cm9sbGVycyAuYnRuLmFjdGl2ZSB7IGJhY2tncm91bmQtY29sb3I6ICM5MDkwOTA7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC5idG46Zm9jdXMgeyBvdXRsaW5lOiBub25lOyB9IC5iYXNpYy1jb250cm9sbGVycyAubnVtYmVyIHsgaGVpZ2h0OiAyNnB4OyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHBvc2l0aW9uOiByZWxhdGl2ZTsgZm9udDogbm9ybWFsIG5vcm1hbCAxLjJlbSBRdWlja3NhbmQsIGFyaWFsLCBzYW5zLXNlcmlmOyB2ZXJ0aWNhbC1hbGlnbjogdG9wOyBib3JkZXI6IG5vbmU7IGJhY2tncm91bmQ6IG5vbmU7IGNvbG9yOiAjNDY0NjQ2OyBwYWRkaW5nOiAwIDRweDsgbWFyZ2luOiAwOyBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5OyBib3JkZXItcmFkaXVzOiAycHg7IGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH0gLmJhc2ljLWNvbnRyb2xsZXJzIC5udW1iZXI6Zm9jdXMgeyBvdXRsaW5lOiBub25lOyB9IC5iYXNpYy1jb250cm9sbGVycyBzZWxlY3QgeyBoZWlnaHQ6IDI2cHg7IGxpbmUtaGVpZ2h0OiAyNnB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5OyBib3JkZXItcmFkaXVzOiAycHg7IGJvcmRlcjogbm9uZTsgdmVydGljYWwtYWxpZ246IHRvcDsgcGFkZGluZzogMDsgbWFyZ2luOiAwOyB9IC5iYXNpYy1jb250cm9sbGVycyBzZWxlY3Q6Zm9jdXMgeyBvdXRsaW5lOiBub25lOyB9IC5iYXNpYy1jb250cm9sbGVycyBpbnB1dFt0eXBlPXRleHRdIHsgd2lkdGg6IDEwMCU7IGhlaWdodDogMjZweDsgbGluZS1oZWlnaHQ6IDI2cHg7IGJvcmRlcjogMDsgcGFkZGluZzogMCA0cHg7IGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7IGJvcmRlci1yYWRpdXM6IDJweDsgY29sb3I6ICM1NjU2NTY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsIC5hcnJvdy1yaWdodCwgLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsIC5hcnJvdy1sZWZ0IHsgd2lkdGg6IDI0cHg7IGhlaWdodDogNDBweDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGwgLnRvZ2dsZS1lbGVtZW50IHsgd2lkdGg6IDQwcHg7IGhlaWdodDogNDBweDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc21hbGwgLmJ0biB7IGhlaWdodDogNDBweDsgbGluZS1oZWlnaHQ6IDQwcHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsIC5udW1iZXIgeyBoZWlnaHQ6IDQwcHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsIHNlbGVjdCB7IGhlaWdodDogNDBweDsgbGluZS1oZWlnaHQ6IDQwcHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsIGlucHV0W3R5cGU9dGV4dF0geyBoZWlnaHQ6IDQwcHg7IGxpbmUtaGVpZ2h0OiA0MHB4OyB9IC5iYXNpYy1jb250cm9sbGVycy50aXRsZSB7IGJvcmRlcjogbm9uZSAhaW1wb3J0YW50OyBtYXJnaW4tYm90dG9tOiAwOyBtYXJnaW4tdG9wOiA4cHg7IHBhZGRpbmctdG9wOiA4cHg7IHBhZGRpbmctYm90dG9tOiAwOyBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50OyBoZWlnaHQ6IDI1cHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnRpdGxlIC5sZWdlbmQgeyBmb250OiBub3JtYWwgYm9sZCAxLjNlbSBRdWlja3NhbmQsIGFyaWFsLCBzYW5zLXNlcmlmOyBoZWlnaHQ6IDEwMCU7IG92ZXJmbG93OiBoaWRkZW47IHRleHQtYWxpZ246IGxlZnQ7IHBhZGRpbmc6IDA7IHdpZHRoOiAxMDAlOyBib3gtc2l6aW5nOiBib3JkZXItYm94OyAtd2Via2l0LWZsZXgtZ3JvdzogMTsgZmxleC1ncm93OiAxOyB9IC5iYXNpYy1jb250cm9sbGVycy5zbGlkZXIgLnJhbmdlIHsgaGVpZ2h0OiAyNnB4OyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IG1hcmdpbjogMDsgLXdlYmtpdC1mbGV4LWdyb3c6IDQ7IGZsZXgtZ3JvdzogNDsgcG9zaXRpb246IHJlbGF0aXZlOyB9IC5iYXNpYy1jb250cm9sbGVycy5zbGlkZXIgLnJhbmdlIGNhbnZhcyB7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAwOyBsZWZ0OiAwOyB9IC5iYXNpYy1jb250cm9sbGVycy5zbGlkZXIgLm51bWJlci13cmFwcGVyIHsgZGlzcGxheTogaW5saW5lOyBoZWlnaHQ6IDI2cHg7IHRleHQtYWxpZ246IHJpZ2h0OyAtd2Via2l0LWZsZXgtZ3JvdzogMzsgZmxleC1ncm93OiAzOyB9IC5iYXNpYy1jb250cm9sbGVycy5zbGlkZXIgLm51bWJlci13cmFwcGVyIC5udW1iZXIgeyBsZWZ0OiA1cHg7IHdpZHRoOiA1NHB4OyB0ZXh0LWFsaWduOiByaWdodDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc2xpZGVyIC5udW1iZXItd3JhcHBlciAudW5pdCB7IGZvbnQ6IGl0YWxpYyBub3JtYWwgMWVtIFF1aWNrc2FuZCwgYXJpYWwsIHNhbnMtc2VyaWY7IGxpbmUtaGVpZ2h0OiAyNnB4OyBoZWlnaHQ6IDI2cHg7IHdpZHRoOiAzMHB4OyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHBvc2l0aW9uOiByZWxhdGl2ZTsgcGFkZGluZy1sZWZ0OiA1cHg7IHBhZGRpbmctcmlnaHQ6IDVweDsgY29sb3I6ICM1NjU2NTY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNsaWRlciAubnVtYmVyLXdyYXBwZXIgLnVuaXQgc3VwIHsgbGluZS1oZWlnaHQ6IDdweDsgfSAuYmFzaWMtY29udHJvbGxlcnMuc2xpZGVyLnNsaWRlci1sYXJnZSAucmFuZ2UgeyAtd2Via2l0LWZsZXgtZ3JvdzogNTA7IGZsZXgtZ3JvdzogNTA7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNsaWRlci5zbGlkZXItbGFyZ2UgLm51bWJlci13cmFwcGVyIHsgLXdlYmtpdC1mbGV4LWdyb3c6IDE7IGZsZXgtZ3JvdzogMTsgfSAuYmFzaWMtY29udHJvbGxlcnMuc2xpZGVyLnNsaWRlci1zbWFsbCAucmFuZ2UgeyAtd2Via2l0LWZsZXgtZ3JvdzogMjsgZmxleC1ncm93OiAyOyB9IC5iYXNpYy1jb250cm9sbGVycy5zbGlkZXIuc2xpZGVyLXNtYWxsIC5udW1iZXItd3JhcHBlciB7IC13ZWJraXQtZmxleC1ncm93OiA0OyBmbGV4LWdyb3c6IDQ7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLm51bWJlci1ib3ggLm51bWJlciB7IHdpZHRoOiAxMjBweDsgbWFyZ2luOiAwIDEwcHg7IHZlcnRpY2FsLWFsaWduOiB0b3A7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNlbGVjdC1saXN0IHNlbGVjdCB7IG1hcmdpbjogMCAxMHB4OyB3aWR0aDogMTIwcHg7IGZvbnQ6IG5vcm1hbCBub3JtYWwgMS4yZW0gUXVpY2tzYW5kLCBhcmlhbCwgc2Fucy1zZXJpZjsgY29sb3I6ICM0NjQ2NDY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNlbGVjdC1idXR0b25zIC5idG46Zmlyc3Qtb2YtdHlwZSB7IG1hcmdpbi1sZWZ0OiA0cHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnRleHQgaW5wdXRbdHlwZT10ZXh0XSB7IGZvbnQ6IG5vcm1hbCBub3JtYWwgMS4yZW0gUXVpY2tzYW5kLCBhcmlhbCwgc2Fucy1zZXJpZjsgY29sb3I6ICM0NjQ2NDY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsLnNsaWRlciAucmFuZ2UgeyBoZWlnaHQ6IDQwcHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsLnNsaWRlciAubnVtYmVyLXdyYXBwZXIgeyBoZWlnaHQ6IDQwcHg7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNtYWxsLnNsaWRlciAubnVtYmVyLXdyYXBwZXIgLnVuaXQgeyBsaW5lLWhlaWdodDogNDBweDsgaGVpZ2h0OiA0MHB4OyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrIHsgYmFja2dyb3VuZC1jb2xvcjogIzM2MzYzNjsgYm9yZGVyOiAxcHggc29saWQgIzU4NTg1ODsgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45NSk7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLnRvZ2dsZS1lbGVtZW50IHsgYmFja2dyb3VuZC1jb2xvcjogI2VmZWZlZjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAudG9nZ2xlLWVsZW1lbnQgbGluZSB7IHN0cm9rZTogIzM2MzYzNjsgfSAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAudG9nZ2xlLWVsZW1lbnQ6aG92ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjY2RjZGNkOyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5hcnJvdy1yaWdodCwgLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLmFycm93LWxlZnQgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmOyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5hcnJvdy1yaWdodCBsaW5lLCAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYXJyb3ctbGVmdCBsaW5lIHsgc3Ryb2tlOiAjMzYzNjM2OyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5hcnJvdy1yaWdodDpob3ZlciwgLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLmFycm93LWxlZnQ6aG92ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjY2RjZGNkOyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5hcnJvdy1yaWdodDphY3RpdmUsIC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5hcnJvdy1sZWZ0OmFjdGl2ZSB7IGJhY2tncm91bmQtY29sb3I6ICNhYmFiYWI7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLm51bWJlciwgLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgc2VsZWN0LCAuYmFzaWMtY29udHJvbGxlcnMuZGFyayBpbnB1dFt0eXBlPXRleHRdIHsgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45NSk7IGJhY2tncm91bmQtY29sb3I6ICM0NTQ1NDU7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsgLmJ0biB7IGJhY2tncm91bmQtY29sb3I6ICNlZmVmZWY7IGNvbG9yOiAjMzYzNjM2OyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5idG46aG92ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjY2RjZGNkOyB9IC5iYXNpYy1jb250cm9sbGVycy5kYXJrIC5idG46YWN0aXZlLCAuYmFzaWMtY29udHJvbGxlcnMuZGFyayAuYnRuLmFjdGl2ZSB7IGJhY2tncm91bmQtY29sb3I6ICNhYmFiYWI7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLmRhcmsuc2xpZGVyIC5pbm5lci13cmFwcGVyIC5udW1iZXItd3JhcHBlciAudW5pdCB7IGNvbG9yOiAjYmNiY2JjOyB9IC5iYXNpYy1jb250cm9sbGVycy5zb3VuZHdvcmtzIHsgYmFja2dyb3VuZC1jb2xvcjogIzI0MjQyNDsgYm9yZGVyOiAxcHggc29saWQgIzI4MjgyODsgY29sb3I6ICNmZmZmZmY7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNvdW5kd29ya3MgLnRvZ2dsZS1lbGVtZW50IHsgYmFja2dyb3VuZC1jb2xvcjogIzQ2NDY0NjsgfSAuYmFzaWMtY29udHJvbGxlcnMuc291bmR3b3JrcyAudG9nZ2xlLWVsZW1lbnQgbGluZSB7IHN0cm9rZTogI2ZmZmZmZjsgfSAuYmFzaWMtY29udHJvbGxlcnMuc291bmR3b3JrcyAudG9nZ2xlLWVsZW1lbnQ6aG92ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjNjg2ODY4OyB9IC5iYXNpYy1jb250cm9sbGVycy5zb3VuZHdvcmtzIC5hcnJvdy1yaWdodCwgLmJhc2ljLWNvbnRyb2xsZXJzLnNvdW5kd29ya3MgLmFycm93LWxlZnQgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjNDY0NjQ2OyB9IC5iYXNpYy1jb250cm9sbGVycy5zb3VuZHdvcmtzIC5hcnJvdy1yaWdodCBsaW5lLCAuYmFzaWMtY29udHJvbGxlcnMuc291bmR3b3JrcyAuYXJyb3ctbGVmdCBsaW5lIHsgc3Ryb2tlOiAjZmZmZmZmOyB9IC5iYXNpYy1jb250cm9sbGVycy5zb3VuZHdvcmtzIC5hcnJvdy1yaWdodDpob3ZlciwgLmJhc2ljLWNvbnRyb2xsZXJzLnNvdW5kd29ya3MgLmFycm93LWxlZnQ6aG92ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjNjg2ODY4OyB9IC5iYXNpYy1jb250cm9sbGVycy5zb3VuZHdvcmtzIC5hcnJvdy1yaWdodDphY3RpdmUsIC5iYXNpYy1jb250cm9sbGVycy5zb3VuZHdvcmtzIC5hcnJvdy1sZWZ0OmFjdGl2ZSB7IGJhY2tncm91bmQtY29sb3I6ICM5MDkwOTA7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNvdW5kd29ya3MgLm51bWJlciwgLmJhc2ljLWNvbnRyb2xsZXJzLnNvdW5kd29ya3Mgc2VsZWN0LCAuYmFzaWMtY29udHJvbGxlcnMuc291bmR3b3JrcyBpbnB1dFt0eXBlPXRleHRdIHsgY29sb3I6ICNmZmZmZmY7IGJhY2tncm91bmQtY29sb3I6ICMzMzMzMzM7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNvdW5kd29ya3MgLmJ0biB7IGJhY2tncm91bmQtY29sb3I6ICM0NjQ2NDY7IGNvbG9yOiAjZmZmZmZmOyB9IC5iYXNpYy1jb250cm9sbGVycy5zb3VuZHdvcmtzIC5idG46aG92ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjNjg2ODY4OyB9IC5iYXNpYy1jb250cm9sbGVycy5zb3VuZHdvcmtzIC5idG46YWN0aXZlLCAuYmFzaWMtY29udHJvbGxlcnMuc291bmR3b3JrcyAuYnRuLmFjdGl2ZSB7IGJhY2tncm91bmQtY29sb3I6ICM5MDkwOTA7IH0gLmJhc2ljLWNvbnRyb2xsZXJzLnNvdW5kd29ya3Muc2xpZGVyIC5pbm5lci13cmFwcGVyIC5udW1iZXItd3JhcHBlciAudW5pdCB7IGNvbG9yOiAjY2RjZGNkOyB9IFwiOyIsImltcG9ydCB7IG5hbWUgfSBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHN0eWxlcyBmcm9tICcuL3N0eWxlcy1kZWNsYXJhdGlvbnMuanMnO1xuXG5leHBvcnQgY29uc3QgbnMgPSBuYW1lO1xuXG5jb25zdCBuc0NsYXNzID0gYC4ke25zfWA7XG5sZXQgX2Rpc2FibGVkID0gZmFsc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICBfZGlzYWJsZWQgPSB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0U3R5bGVTaGVldCgpIHtcbiAgaWYgKF9kaXNhYmxlZCkgcmV0dXJuO1xuXG4gIGNvbnN0ICRjc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAkY3NzLnNldEF0dHJpYnV0ZSgnZGF0YS1uYW1lc3BhY2UnLCBucyk7XG4gICRjc3MudHlwZSA9ICd0ZXh0L2Nzcyc7XG5cbiAgaWYgKCRjc3Muc3R5bGVTaGVldClcbiAgICAkY3NzLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHN0eWxlcztcbiAgZWxzZVxuICAgICRjc3MuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3R5bGVzKSk7XG5cbiAgLy8gaW5zZXJ0IGJlZm9yZSBsaW5rIG9yIHN0eWxlcyBpZiBleGlzdHNcbiAgY29uc3QgJGxpbmsgPSBkb2N1bWVudC5oZWFkLnF1ZXJ5U2VsZWN0b3IoJ2xpbmsnKTtcbiAgY29uc3QgJHN0eWxlID0gZG9jdW1lbnQuaGVhZC5xdWVyeVNlbGVjdG9yKCdzdHlsZScpO1xuXG4gIGlmICgkbGluaylcbiAgICBkb2N1bWVudC5oZWFkLmluc2VydEJlZm9yZSgkY3NzLCAkbGluayk7XG4gIGVsc2UgaWYgKCRzdHlsZSlcbiAgICBkb2N1bWVudC5oZWFkLmluc2VydEJlZm9yZSgkY3NzLCAkc3R5bGUpO1xuICBlbHNlXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCgkY3NzKTtcbn1cblxuIiwiaW1wb3J0ICogYXMgY29udHJvbGxlcnMgZnJvbSAnLi4vLi4vLi4vZGlzdC9pbmRleCc7XG5cbmNvbnN0IHRpdGxlMSA9IG5ldyBjb250cm9sbGVycy5UaXRsZSgnVGl0bGUnLCAnI2NvbnRhaW5lcicpO1xuXG5jb25zdCB0cmlnZ2VyQnV0dG9ucyA9IG5ldyBjb250cm9sbGVycy5UcmlnZ2VyQnV0dG9ucygnVHJpZ2dlckJ1dHRvbnMnLCBbJ2xpZ2h0JywgJ2RhcmsnLCAnc291bmR3b3JrcyddLCAnI2NvbnRhaW5lcicsIGZ1bmN0aW9uKHRoZW1lKSB7XG4gIGNvbnNvbGUubG9nKCdCdXR0b24gPT4nLCB0aGVtZSk7XG4gIGNvbnRyb2xsZXJzLnNldFRoZW1lKHRoZW1lKTtcblxuICBzd2l0Y2ggKHRoZW1lKSB7XG4gICAgY2FzZSAnbGlnaHQnOlxuICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZmZmZic7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdkYXJrJzpcbiAgICBjYXNlICdzb3VuZHdvcmtzJzpcbiAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyMwMDAnO1xuICAgICAgYnJlYWs7XG4gIH1cbn0pO1xuXG5jb25zdCBudW1iZXJCb3ggPSBuZXcgY29udHJvbGxlcnMuTnVtYmVyQm94KCdOdW1iZXJCb3gnLCAwLCAxMCwgMSwgNSwgJyNjb250YWluZXInLCBmdW5jdGlvbih2YWx1ZSkge1xuICBjb25zb2xlLmxvZygnTnVtYmVyID0+JywgdmFsdWUpO1xufSk7XG5cbmNvbnN0IHRvZ2dsZSA9IG5ldyBjb250cm9sbGVycy5Ub2dnbGUoJ1RvZ2dsZScsIGZhbHNlLCAnI2NvbnRhaW5lcicsIGZ1bmN0aW9uKGFjdGl2ZSkge1xuICBjb25zb2xlLmxvZygnVG9nZ2xlID0+JywgYWN0aXZlKTtcblxuICBpZiAoYWN0aXZlKVxuICAgIG51bWJlckJveC52YWx1ZSA9IDA7XG59KTtcblxuY29uc3QgaW5mbyA9IG5ldyBjb250cm9sbGVycy5UZXh0KCdJbmZvJywgJ3JlYWQtb25seSB2YWx1ZScsIHRydWUsICcjY29udGFpbmVyJyk7XG5cbmNvbnN0IHRleHQgPSBuZXcgY29udHJvbGxlcnMuVGV4dCgnVGV4dCcsICdjaGFuZ2FibGUgdmFsdWUnLCBmYWxzZSwgICcjY29udGFpbmVyJywgKHZhbHVlKSA9PiB7XG4gIGNvbnNvbGUubG9nKCdUZXh0ID0+JywgdmFsdWUpO1xuICBpbmZvLnZhbHVlID0gdmFsdWU7XG59KTtcblxuY29uc3Qgc2VsZWN0TGlzdCA9IG5ldyBjb250cm9sbGVycy5TZWxlY3RMaXN0KCdTZWxlY3RMaXN0JywgWydzdGFuZGJ5JywgJ3J1bicsICdlbmQnXSwgJ3J1bicsICcjY29udGFpbmVyJywgZnVuY3Rpb24odmFsdWUpIHtcbiAgY29uc29sZS5sb2coJ1NlbGVjdExpc3QgPT4nLCB2YWx1ZSk7XG5cbiAgaW5mby52YWx1ZSA9IHZhbHVlO1xuICBzZWxlY3RCdXR0b25zLnZhbHVlID0gdmFsdWU7XG59KTtcblxuY29uc3Qgc2VsZWN0QnV0dG9ucyA9IG5ldyBjb250cm9sbGVycy5TZWxlY3RCdXR0b25zKCdTZWxlY3RCdXR0b25zJywgWydzdGFuZGJ5JywgJ3J1bicsICdlbmQnXSwgJ3J1bicsICcjY29udGFpbmVyJywgZnVuY3Rpb24odmFsdWUpIHtcbiAgY29uc29sZS5sb2coJ1NlbGVjdEJ1dHRvbnMgPT4nLCB2YWx1ZSk7XG5cbiAgaW5mby52YWx1ZSA9IHZhbHVlO1xuICBzZWxlY3RMaXN0LnZhbHVlID0gdmFsdWU7XG59KTtcblxuY29uc3QgdGl0bGUyID0gbmV3IGNvbnRyb2xsZXJzLlRpdGxlKCdTbGlkZXJzJywgJyNjb250YWluZXInKTtcblxuY29uc3Qgc2xpZGVyTGFyZ2UgPSBuZXcgY29udHJvbGxlcnMuU2xpZGVyKCdTbGlkZXIgKGxhcmdlKScsIDIwLCAxMDAwLCAxLCA1MzcsICdIeicsICdsYXJnZScsICcjY29udGFpbmVyJywgZnVuY3Rpb24odmFsdWUpIHtcbiAgY29uc29sZS5sb2coJ1NsaWRlciAobGFyZ2UpID0+JywgdmFsdWUpO1xufSk7XG5cbmNvbnN0IHNsaWRlckRlZmF1bHQgPSBuZXcgY29udHJvbGxlcnMuU2xpZGVyKCdTbGlkZXIgKGRlZmF1bHQgLyBtZWRpdW0pJywgMjAsIDEwMDAsIDEsIDIyNSwgJ20uczxzdXA+LTE8L3N1cD4nLCAnZGVmYXVsdCcsICcjY29udGFpbmVyJywgZnVuY3Rpb24odmFsdWUpIHtcbiAgY29uc29sZS5sb2coJ1NsaWRlciAoZGVmYXVsdCkgPT4nLCB2YWx1ZSk7XG59KTtcblxuY29uc3Qgc2xpZGVyU21hbGwgPSBuZXcgY29udHJvbGxlcnMuU2xpZGVyKCdTbGlkZXIgKHNtYWxsKScsIDIwLCAxMDAwLCAxLCA2NjAsICcnLCAnc21hbGwnLCAnI2NvbnRhaW5lcicsIGZ1bmN0aW9uKHZhbHVlKSB7XG4gIGNvbnNvbGUubG9nKCdTbGlkZXIgKHNtYWxsKSA9PicsIHZhbHVlKTtcbn0pO1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIm5hbWVcIjogXCJiYXNpYy1jb250cm9sbGVyc1wiLFxuICBcInZlcnNpb25cIjogXCIwLjYuMlwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiYmFzaWMtY29udHJvbGxlcnMgZm9yIHJhcGlkIHByb3RvdHlwaW5nXCIsXG4gIFwibWFpblwiOiBcImRpc3QvaW5kZXguanNcIixcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImJ1bmRsZVwiOiBcIm5vZGUgLi9iaW4vcnVubmVyIC0tYnVuZGxlXCIsXG4gICAgXCJ0cmFuc3BpbGVcIjogXCJub2RlIC4vYmluL3J1bm5lciAtLXRyYW5zcGlsZVwiLFxuICAgIFwicHJld2F0Y2hcIjogXCJub2RlIC4vYmluL3J1bm5lciAtLXRyYW5zcGlsZVwiLFxuICAgIFwid2F0Y2hcIjogXCJub2RlIC4vYmluL3J1bm5lciAtLXdhdGNoXCJcbiAgfSxcbiAgXCJsaWNlbnNlXCI6IFwiQlNELTNcIixcbiAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS93YXZlc2pzL2Jhc2ljLWNvbnRyb2xsZXJzLmdpdFwiXG4gIH0sXG4gIFwianNoaW50Q29uZmlnXCI6IHtcbiAgICBcImVzbmV4dFwiOiB0cnVlLFxuICAgIFwiYnJvd3NlclwiOiB0cnVlLFxuICAgIFwibm9kZVwiOiB0cnVlLFxuICAgIFwiZGV2ZWxcIjogdHJ1ZVxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJiYWJlbC1ydW50aW1lXCI6IFwiXjYuMTguMFwiLFxuICAgIFwiZ3VpLWNvbXBvbmVudHNcIjogXCJeMS4wLjBcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJiYWJlbC1jb3JlXCI6IFwiXjYuMTguMlwiLFxuICAgIFwiYmFiZWwtcGx1Z2luLXRyYW5zZm9ybS1lczIwMTUtbW9kdWxlcy1jb21tb25qc1wiOiBcIl42LjE4LjBcIixcbiAgICBcImJhYmVsLXBsdWdpbi10cmFuc2Zvcm0tcnVudGltZVwiOiBcIl42LjE1LjBcIixcbiAgICBcImJhYmVsLXByZXNldC1lczIwMTVcIjogXCJeNi4xOC4wXCIsXG4gICAgXCJjb2xvcnNcIjogXCJeMS4xLjJcIixcbiAgICBcImZzLWV4dHJhXCI6IFwiXjEuMC4wXCIsXG4gICAgXCJub2RlLXNhc3NcIjogXCJeMy4xMy4wXCIsXG4gICAgXCJ3YXRjaFwiOiBcIl4xLjAuMVwiXG4gIH1cbn1cbiJdfQ==
