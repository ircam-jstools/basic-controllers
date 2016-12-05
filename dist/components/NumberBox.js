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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk51bWJlckJveC5qcyJdLCJuYW1lcyI6WyJlbGVtZW50cyIsImRlZmF1bHRzIiwibGFiZWwiLCJtaW4iLCJtYXgiLCJzdGVwIiwiZGVmYXVsdCIsImNvbnRhaW5lciIsImNhbGxiYWNrIiwiTnVtYmVyQm94IiwiY29uZmlnIiwiX3ZhbHVlIiwicGFyYW1zIiwiX2lzSW50U3RlcCIsImNvbnRlbnQiLCJhcnJvd0xlZnQiLCJhcnJvd1JpZ2h0IiwiJGVsIiwiY2xhc3NMaXN0IiwiYWRkIiwiaW5uZXJIVE1MIiwiJHByZXYiLCJxdWVyeVNlbGVjdG9yIiwiJG5leHQiLCIkbnVtYmVyIiwiYmluZEV2ZW50cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiZGVjaW1hbHMiLCJ0b1N0cmluZyIsInNwbGl0IiwiZXhwIiwibGVuZ3RoIiwibXVsdCIsIk1hdGgiLCJwb3ciLCJpbnRWYWx1ZSIsImZsb29yIiwiaW50U3RlcCIsInZhbHVlIiwicHJvcGFnYXRlIiwicGFyc2VJbnQiLCJwYXJzZUZsb2F0IiwiZXhlY3V0ZUxpc3RlbmVycyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0lBQVlBLFE7Ozs7Ozs7Ozs7OztBQUVaOztBQUVBLElBQU1DLFdBQVc7QUFDZkMsU0FBTyxRQURRO0FBRWZDLE9BQUssQ0FGVTtBQUdmQyxPQUFLLENBSFU7QUFJZkMsUUFBTSxJQUpTO0FBS2ZDLFdBQVMsQ0FMTTtBQU1mQyxhQUFXLElBTkk7QUFPZkMsWUFBVTtBQVBLLENBQWpCOztBQVVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBMkJNQyxTOzs7QUFDSjtBQUNBLHFCQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBQUEsc0hBQ1osWUFEWSxFQUNFVCxRQURGLEVBQ1lTLE1BRFo7O0FBR2xCLFVBQUtDLE1BQUwsR0FBYyxNQUFLQyxNQUFMLENBQVlOLE9BQTFCO0FBQ0EsVUFBS08sVUFBTCxHQUFtQixNQUFLRCxNQUFMLENBQVlQLElBQVosR0FBbUIsQ0FB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QUFhZSxLQUF6QjtBQUNBQSxnQkFBUSxPQUFLMUIsVUFBTCxHQUFrQjRCLFNBQVNGLEtBQVQsRUFBZ0IsRUFBaEIsQ0FBbEIsR0FBd0NHLFdBQVdILEtBQVgsQ0FBaEQ7QUFDQUEsZ0JBQVFMLEtBQUsvQixHQUFMLENBQVMsT0FBS1MsTUFBTCxDQUFZUixHQUFyQixFQUEwQjhCLEtBQUs5QixHQUFMLENBQVMsT0FBS1EsTUFBTCxDQUFZVCxHQUFyQixFQUEwQm9DLEtBQTFCLENBQTFCLENBQVI7O0FBRUEsZUFBS0MsU0FBTCxDQUFlRCxLQUFmO0FBQ0QsT0FORCxFQU1HLEtBTkg7QUFPRDs7QUFFRDs7Ozs4QkFDVUEsSyxFQUFPO0FBQ2YsVUFBSUEsVUFBVSxLQUFLNUIsTUFBbkIsRUFBMkI7QUFBRTtBQUFTOztBQUV0QyxXQUFLQSxNQUFMLEdBQWM0QixLQUFkO0FBQ0EsV0FBS2YsT0FBTCxDQUFhZSxLQUFiLEdBQXFCQSxLQUFyQjs7QUFFQSxXQUFLSSxnQkFBTCxDQUFzQixLQUFLaEMsTUFBM0I7QUFDRDs7O3dCQWxGVztBQUNWLGFBQU8sS0FBS0EsTUFBWjtBQUNELEs7c0JBRVM0QixLLEVBQU87QUFDZjtBQUNBLFdBQUtmLE9BQUwsQ0FBYWUsS0FBYixHQUFxQkEsS0FBckI7QUFDQUEsY0FBUSxLQUFLZixPQUFMLENBQWFlLEtBQXJCO0FBQ0FBLGNBQVEsS0FBSzFCLFVBQUwsR0FBa0I0QixTQUFTRixLQUFULEVBQWdCLEVBQWhCLENBQWxCLEdBQXdDRyxXQUFXSCxLQUFYLENBQWhEO0FBQ0EsV0FBSzVCLE1BQUwsR0FBYzRCLEtBQWQ7QUFDRDs7Ozs7O2tCQTJFWTlCLFMiLCJmaWxlIjoiTnVtYmVyQm94LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VDb250cm9sbGVyIGZyb20gJy4vQmFzZUNvbnRyb2xsZXInO1xuaW1wb3J0ICogYXMgZWxlbWVudHMgZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuXG4vKiogQG1vZHVsZSBiYXNpYy1jb250cm9sbGVycyAqL1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgbGFiZWw6ICckbmJzcDsnLFxuICBtaW46IDAsXG4gIG1heDogMSxcbiAgc3RlcDogMC4wMSxcbiAgZGVmYXVsdDogMCxcbiAgY29udGFpbmVyOiBudWxsLFxuICBjYWxsYmFjazogbnVsbCxcbn07XG5cbi8qKlxuICogTnVtYmVyIEJveCBjb250cm9sbGVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBjb25maWcubGFiZWwgLSBMYWJlbCBvZiB0aGUgY29udHJvbGxlci5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLm1pbj0wXSAtIE1pbmltdW0gdmFsdWUuXG4gKiBAcGFyYW0ge051bWJlcn0gW2NvbmZpZy5tYXg9MV0gLSBNYXhpbXVtIHZhbHVlLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtjb25maWcuc3RlcD0wLjAxXSAtIFN0ZXAgYmV0d2VlbiBjb25zZWN1dGl2ZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge051bWJlcn0gW2NvbmZpZy5kZWZhdWx0PTBdIC0gRGVmYXVsdCB2YWx1ZS5cbiAqIEBwYXJhbSB7U3RyaW5nfEVsZW1lbnR8YmFzaWMtY29udHJvbGxlcn5Hcm91cH0gW2NvbmZpZy5jb250YWluZXI9bnVsbF0gLVxuICogIENvbnRhaW5lciBvZiB0aGUgY29udHJvbGxlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb25maWcuY2FsbGJhY2s9bnVsbF0gLSBDYWxsYmFjayB0byBiZSBleGVjdXRlZCB3aGVuIHRoZVxuICogIHZhbHVlIGNoYW5nZXMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGNvbnRyb2xsZXJzIGZyb20gJ2Jhc2ljLWNvbnRyb2xsZXJzJztcbiAqXG4gKiBjb25zdCBudW1iZXJCb3ggPSBuZXcgY29udHJvbGxlcnMuTnVtYmVyQm94KHtcbiAqICAgbGFiZWw6ICdNeSBOdW1iZXIgQm94JyxcbiAqICAgbWluOiAwLFxuICogICBtYXg6IDEwLFxuICogICBzdGVwOiAwLjEsXG4gKiAgIGRlZmF1bHQ6IDUsXG4gKiAgIGNvbnRhaW5lcjogJyNjb250YWluZXInLFxuICogICBjYWxsYmFjazogKHZhbHVlKSA9PiBjb25zb2xlLmxvZyh2YWx1ZSksXG4gKiB9KTtcbiAqL1xuY2xhc3MgTnVtYmVyQm94IGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xuICAvLyBsZWdlbmQsIG1pbiA9IDAsIG1heCA9IDEsIHN0ZXAgPSAwLjAxLCBkZWZhdWx0VmFsdWUgPSAwLCAkY29udGFpbmVyID0gbnVsbCwgY2FsbGJhY2sgPSBudWxsXG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKCdudW1iZXItYm94JywgZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICB0aGlzLl92YWx1ZSA9IHRoaXMucGFyYW1zLmRlZmF1bHQ7XG4gICAgdGhpcy5faXNJbnRTdGVwID0gKHRoaXMucGFyYW1zLnN0ZXAgJSAxID09PSAwKTtcblxuICAgIHN1cGVyLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDdXJyZW50IHZhbHVlIG9mIHRoZSBjb250cm9sbGVyLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIC8vIHVzZSAkbnVtYmVyIGVsZW1lbnQgbWluLCBtYXggYW5kIHN0ZXAgc3lzdGVtXG4gICAgdGhpcy4kbnVtYmVyLnZhbHVlID0gdmFsdWU7XG4gICAgdmFsdWUgPSB0aGlzLiRudW1iZXIudmFsdWU7XG4gICAgdmFsdWUgPSB0aGlzLl9pc0ludFN0ZXAgPyBwYXJzZUludCh2YWx1ZSwgMTApIDogcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBsYWJlbCwgbWluLCBtYXgsIHN0ZXAgfSA9IHRoaXMucGFyYW1zO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBgXG4gICAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+JHtsYWJlbH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlclwiPlxuICAgICAgICAke2VsZW1lbnRzLmFycm93TGVmdH1cbiAgICAgICAgPGlucHV0IGNsYXNzPVwibnVtYmVyXCIgdHlwZT1cIm51bWJlclwiIG1pbj1cIiR7bWlufVwiIG1heD1cIiR7bWF4fVwiIHN0ZXA9XCIke3N0ZXB9XCIgdmFsdWU9XCIke3RoaXMuX3ZhbHVlfVwiIC8+XG4gICAgICAgICR7ZWxlbWVudHMuYXJyb3dSaWdodH1cbiAgICAgIDwvZGl2PlxuICAgIGA7XG5cbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcigpO1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoJ2FsaWduLXNtYWxsJyk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuJHByZXYgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuYXJyb3ctbGVmdCcpO1xuICAgIHRoaXMuJG5leHQgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuYXJyb3ctcmlnaHQnKTtcbiAgICB0aGlzLiRudW1iZXIgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwibnVtYmVyXCJdJyk7XG5cbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJHByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgY29uc3Qgc3RlcCA9IHRoaXMucGFyYW1zLnN0ZXA7XG4gICAgICBjb25zdCBkZWNpbWFscyA9IHN0ZXAudG9TdHJpbmcoKS5zcGxpdCgnLicpWzFdO1xuICAgICAgY29uc3QgZXhwID0gZGVjaW1hbHMgPyBkZWNpbWFscy5sZW5ndGggOiAwO1xuICAgICAgY29uc3QgbXVsdCA9IE1hdGgucG93KDEwLCBleHApO1xuXG4gICAgICBjb25zdCBpbnRWYWx1ZSA9IE1hdGguZmxvb3IodGhpcy5fdmFsdWUgKiBtdWx0ICsgMC41KTtcbiAgICAgIGNvbnN0IGludFN0ZXAgPSBNYXRoLmZsb29yKHN0ZXAgKiBtdWx0ICsgMC41KTtcbiAgICAgIGNvbnN0IHZhbHVlID0gKGludFZhbHVlIC0gaW50U3RlcCkgLyBtdWx0O1xuXG4gICAgICB0aGlzLnByb3BhZ2F0ZSh2YWx1ZSk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgdGhpcy4kbmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBjb25zdCBzdGVwID0gdGhpcy5wYXJhbXMuc3RlcDtcbiAgICAgIGNvbnN0IGRlY2ltYWxzID0gc3RlcC50b1N0cmluZygpLnNwbGl0KCcuJylbMV07XG4gICAgICBjb25zdCBleHAgPSBkZWNpbWFscyA/IGRlY2ltYWxzLmxlbmd0aCA6IDA7XG4gICAgICBjb25zdCBtdWx0ID0gTWF0aC5wb3coMTAsIGV4cCk7XG5cbiAgICAgIGNvbnN0IGludFZhbHVlID0gTWF0aC5mbG9vcih0aGlzLl92YWx1ZSAqIG11bHQgKyAwLjUpO1xuICAgICAgY29uc3QgaW50U3RlcCA9IE1hdGguZmxvb3Ioc3RlcCAqIG11bHQgKyAwLjUpO1xuICAgICAgY29uc3QgdmFsdWUgPSAoaW50VmFsdWUgKyBpbnRTdGVwKSAvIG11bHQ7XG5cbiAgICAgIHRoaXMucHJvcGFnYXRlKHZhbHVlKTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICB0aGlzLiRudW1iZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IHRoaXMuJG51bWJlci52YWx1ZTtcbiAgICAgIHZhbHVlID0gdGhpcy5faXNJbnRTdGVwID8gcGFyc2VJbnQodmFsdWUsIDEwKSA6IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgdmFsdWUgPSBNYXRoLm1pbih0aGlzLnBhcmFtcy5tYXgsIE1hdGgubWF4KHRoaXMucGFyYW1zLm1pbiwgdmFsdWUpKTtcblxuICAgICAgdGhpcy5wcm9wYWdhdGUodmFsdWUpO1xuICAgIH0sIGZhbHNlKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9wYWdhdGUodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IHRoaXMuX3ZhbHVlKSB7IHJldHVybjsgfVxuXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLiRudW1iZXIudmFsdWUgPSB2YWx1ZTtcblxuICAgIHRoaXMuZXhlY3V0ZUxpc3RlbmVycyh0aGlzLl92YWx1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTnVtYmVyQm94O1xuIl19