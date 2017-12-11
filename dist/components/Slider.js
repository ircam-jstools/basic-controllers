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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNsaWRlci5qcyJdLCJuYW1lcyI6WyJndWlDb21wb25lbnRzIiwiZGVmYXVsdHMiLCJsYWJlbCIsIm1pbiIsIm1heCIsInN0ZXAiLCJkZWZhdWx0IiwidW5pdCIsInNpemUiLCJjb250YWluZXIiLCJjYWxsYmFjayIsIlNsaWRlciIsImNvbmZpZyIsIl92YWx1ZSIsInBhcmFtcyIsIl9vblNsaWRlckNoYW5nZSIsImJpbmQiLCJjb250ZW50IiwiJGVsIiwidHlwZSIsImlubmVySFRNTCIsImNsYXNzTGlzdCIsImFkZCIsIiRyYW5nZSIsInF1ZXJ5U2VsZWN0b3IiLCIkbnVtYmVyIiwic2xpZGVyIiwiZm9yZWdyb3VuZENvbG9yIiwiX2JpbmRFdmVudHMiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ3aWR0aCIsImhlaWdodCIsInJlc2l6ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJ2YWx1ZSIsInBhcnNlRmxvYXQiLCJleGVjdXRlTGlzdGVuZXJzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztJQUFZQSxhOzs7Ozs7Ozs7Ozs7QUFFWjs7QUFFQSxJQUFNQyxXQUFXO0FBQ2ZDLFNBQU8sUUFEUTtBQUVmQyxPQUFLLENBRlU7QUFHZkMsT0FBSyxDQUhVO0FBSWZDLFFBQU0sSUFKUztBQUtmQyxXQUFTLENBTE07QUFNZkMsUUFBTSxFQU5TO0FBT2ZDLFFBQU0sUUFQUztBQVFmQyxhQUFXLElBUkk7QUFTZkMsWUFBVTs7QUFHWjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFaaUIsQ0FBakI7SUE0Q01DLE07OztBQUNKLGtCQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBQUEsZ0hBQ1osUUFEWSxFQUNGWCxRQURFLEVBQ1FXLE1BRFI7O0FBR2xCLFVBQUtDLE1BQUwsR0FBYyxNQUFLQyxNQUFMLENBQVlSLE9BQTFCO0FBQ0EsVUFBS1MsZUFBTCxHQUF1QixNQUFLQSxlQUFMLENBQXFCQyxJQUFyQixPQUF2Qjs7QUFFQTtBQU5rQjtBQU9uQjs7QUFFRDs7Ozs7Ozs7OztBQWlCQTs2QkFDUztBQUFBLG9CQUN1QyxLQUFLRixNQUQ1QztBQUFBLFVBQ0NaLEtBREQsV0FDQ0EsS0FERDtBQUFBLFVBQ1FDLEdBRFIsV0FDUUEsR0FEUjtBQUFBLFVBQ2FDLEdBRGIsV0FDYUEsR0FEYjtBQUFBLFVBQ2tCQyxJQURsQixXQUNrQkEsSUFEbEI7QUFBQSxVQUN3QkUsSUFEeEIsV0FDd0JBLElBRHhCO0FBQUEsVUFDOEJDLElBRDlCLFdBQzhCQSxJQUQ5Qjs7QUFFUCxVQUFNUywyQ0FDa0JmLEtBRGxCLGdMQUsyQ0MsR0FMM0MsZUFLd0RDLEdBTHhELGdCQUtzRUMsSUFMdEUsaUJBS3NGLEtBQUtRLE1BTDNGLDJDQU1xQk4sSUFOckIsMENBQU47O0FBVUEsV0FBS1csR0FBTCwwR0FBd0IsS0FBS0MsSUFBN0I7QUFDQSxXQUFLRCxHQUFMLENBQVNFLFNBQVQsR0FBcUJILE9BQXJCO0FBQ0EsV0FBS0MsR0FBTCxDQUFTRyxTQUFULENBQW1CQyxHQUFuQixhQUFpQ2QsSUFBakM7O0FBRUEsV0FBS2UsTUFBTCxHQUFjLEtBQUtMLEdBQUwsQ0FBU00sYUFBVCxDQUF1QixRQUF2QixDQUFkO0FBQ0EsV0FBS0MsT0FBTCxHQUFlLEtBQUtQLEdBQUwsQ0FBU00sYUFBVCx3QkFBZjs7QUFFQSxXQUFLRSxNQUFMLEdBQWMsSUFBSTFCLGNBQWNXLE1BQWxCLENBQXlCO0FBQ3JDRixtQkFBVyxLQUFLYyxNQURxQjtBQUVyQ2Isa0JBQVUsS0FBS0ssZUFGc0I7QUFHckNaLGFBQUtBLEdBSGdDO0FBSXJDQyxhQUFLQSxHQUpnQztBQUtyQ0MsY0FBTUEsSUFMK0I7QUFNckNDLGlCQUFTLEtBQUtPLE1BTnVCO0FBT3JDYyx5QkFBaUI7QUFQb0IsT0FBekIsQ0FBZDs7QUFVQSxXQUFLQyxXQUFMOztBQUVBLGFBQU8sS0FBS1YsR0FBWjtBQUNEOztBQUVEOzs7OzZCQUNTO0FBQ1A7O0FBRE8sa0NBR21CLEtBQUtLLE1BQUwsQ0FBWU0scUJBQVosRUFIbkI7QUFBQSxVQUdDQyxLQUhELHlCQUdDQSxLQUhEO0FBQUEsVUFHUUMsTUFIUix5QkFHUUEsTUFIUjs7QUFJUCxXQUFLTCxNQUFMLENBQVlNLE1BQVosQ0FBbUJGLEtBQW5CLEVBQTBCQyxNQUExQjtBQUNEOztBQUVEOzs7O2tDQUNjO0FBQUE7O0FBQ1osV0FBS04sT0FBTCxDQUFhUSxnQkFBYixDQUE4QixRQUE5QixFQUF3QyxZQUFNO0FBQzVDLFlBQU1DLFFBQVFDLFdBQVcsT0FBS1YsT0FBTCxDQUFhUyxLQUF4QixDQUFkO0FBQ0E7QUFDQSxlQUFLUixNQUFMLENBQVlRLEtBQVosR0FBb0JBLEtBQXBCO0FBQ0EsZUFBS3JCLE1BQUwsR0FBY3FCLEtBQWQ7QUFDRCxPQUxELEVBS0csS0FMSDtBQU1EOztBQUVEOzs7O29DQUNnQkEsSyxFQUFPO0FBQ3JCLFdBQUtULE9BQUwsQ0FBYVMsS0FBYixHQUFxQkEsS0FBckI7QUFDQSxXQUFLckIsTUFBTCxHQUFjcUIsS0FBZDs7QUFFQSxXQUFLRSxnQkFBTCxDQUFzQixLQUFLdkIsTUFBM0I7QUFDRDs7O3NCQXhFU3FCLEssRUFBTztBQUNmLFdBQUtyQixNQUFMLEdBQWNxQixLQUFkOztBQUVBLFVBQUksS0FBS1QsT0FBTCxJQUFnQixLQUFLRixNQUF6QixFQUFpQztBQUMvQixhQUFLRSxPQUFMLENBQWFTLEtBQWIsR0FBcUIsS0FBS0EsS0FBMUI7QUFDQSxhQUFLUixNQUFMLENBQVlRLEtBQVosR0FBb0IsS0FBS0EsS0FBekI7QUFDRDtBQUNGLEs7d0JBRVc7QUFDVixhQUFPLEtBQUtyQixNQUFaO0FBQ0Q7Ozs7RUF6QmtCLCtDOztrQkF5Rk5GLE0iLCJmaWxlIjoiU2xpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VDb21wb25lbnQgZnJvbSAnLi9CYXNlQ29tcG9uZW50JztcbmltcG9ydCBkaXNwbGF5IGZyb20gJy4uL21peGlucy9kaXNwbGF5JztcbmltcG9ydCAqIGFzIGd1aUNvbXBvbmVudHMgZnJvbSAnQGlyY2FtL2d1aS1jb21wb25lbnRzJztcblxuLyoqIEBtb2R1bGUgYmFzaWMtY29udHJvbGxlcnMgKi9cblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIGxhYmVsOiAnJm5ic3A7JyxcbiAgbWluOiAwLFxuICBtYXg6IDEsXG4gIHN0ZXA6IDAuMDEsXG4gIGRlZmF1bHQ6IDAsXG4gIHVuaXQ6ICcnLFxuICBzaXplOiAnbWVkaXVtJyxcbiAgY29udGFpbmVyOiBudWxsLFxuICBjYWxsYmFjazogbnVsbCxcbn1cblxuLyoqXG4gKiBTbGlkZXIgY29udHJvbGxlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZy5sYWJlbCAtIExhYmVsIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtjb25maWcubWluPTBdIC0gTWluaW11bSB2YWx1ZS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLm1heD0xXSAtIE1heGltdW0gdmFsdWUuXG4gKiBAcGFyYW0ge051bWJlcn0gW2NvbmZpZy5zdGVwPTAuMDFdIC0gU3RlcCBiZXR3ZWVuIGNvbnNlY3V0aXZlIHZhbHVlcy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLmRlZmF1bHQ9MF0gLSBEZWZhdWx0IHZhbHVlLlxuICogQHBhcmFtIHtTdHJpbmd9IFtjb25maWcudW5pdD0nJ10gLSBVbml0IG9mIHRoZSB2YWx1ZS5cbiAqIEBwYXJhbSB7J3NtYWxsJ3wnbWVkaXVtJ3wnbGFyZ2UnfSBbY29uZmlnLnNpemU9J21lZGl1bSddIC0gU2l6ZSBvZiB0aGVcbiAqICBzbGlkZXIuXG4gKiBAcGFyYW0ge1N0cmluZ3xFbGVtZW50fGJhc2ljLWNvbnRyb2xsZXJ+R3JvdXB9IFtjb25maWcuY29udGFpbmVyPW51bGxdIC1cbiAqICBDb250YWluZXIgb2YgdGhlIGNvbnRyb2xsZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29uZmlnLmNhbGxiYWNrPW51bGxdIC0gQ2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWQgd2hlbiB0aGVcbiAqICB2YWx1ZSBjaGFuZ2VzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBjb250cm9sbGVycyBmcm9tICdiYXNpYy1jb250cm9sbGVycyc7XG4gKlxuICogY29uc3Qgc2xpZGVyID0gbmV3IGNvbnRyb2xsZXJzLlNsaWRlcih7XG4gKiAgIGxhYmVsOiAnTXkgU2xpZGVyJyxcbiAqICAgbWluOiAyMCxcbiAqICAgbWF4OiAxMDAwLFxuICogICBzdGVwOiAxLFxuICogICBkZWZhdWx0OiA1MzcsXG4gKiAgIHVuaXQ6ICdIeicsXG4gKiAgIHNpemU6ICdsYXJnZScsXG4gKiAgIGNvbnRhaW5lcjogJyNjb250YWluZXInLFxuICogICBjYWxsYmFjazogKHZhbHVlKSA9PiBjb25zb2xlLmxvZyh2YWx1ZSksXG4gKiB9KTtcbiAqL1xuY2xhc3MgU2xpZGVyIGV4dGVuZHMgZGlzcGxheShCYXNlQ29tcG9uZW50KSB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKCdzbGlkZXInLCBkZWZhdWx0cywgY29uZmlnKTtcblxuICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5wYXJhbXMuZGVmYXVsdDtcbiAgICB0aGlzLl9vblNsaWRlckNoYW5nZSA9IHRoaXMuX29uU2xpZGVyQ2hhbmdlLmJpbmQodGhpcyk7XG5cbiAgICBzdXBlci5pbml0aWFsaXplKCk7XG4gIH1cblxuICAvKipcbiAgICogQ3VycmVudCB2YWx1ZS5cbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG5cbiAgICBpZiAodGhpcy4kbnVtYmVyICYmIHRoaXMuJHJhbmdlKSB7XG4gICAgICB0aGlzLiRudW1iZXIudmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgdGhpcy5zbGlkZXIudmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgbGFiZWwsIG1pbiwgbWF4LCBzdGVwLCB1bml0LCBzaXplIH0gPSB0aGlzLnBhcmFtcztcbiAgICBjb25zdCBjb250ZW50ID0gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJsYWJlbFwiPiR7bGFiZWx9PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImlubmVyLXdyYXBwZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJhbmdlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJudW1iZXItd3JhcHBlclwiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgY2xhc3M9XCJudW1iZXJcIiBtaW49XCIke21pbn1cIiBtYXg9XCIke21heH1cIiBzdGVwPVwiJHtzdGVwfVwiIHZhbHVlPVwiJHt0aGlzLl92YWx1ZX1cIiAvPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwidW5pdFwiPiR7dW5pdH08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+YDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKHRoaXMudHlwZSk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKGBzbGlkZXItJHtzaXplfWApO1xuXG4gICAgdGhpcy4kcmFuZ2UgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcucmFuZ2UnKTtcbiAgICB0aGlzLiRudW1iZXIgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKGBpbnB1dFt0eXBlPVwibnVtYmVyXCJdYCk7XG5cbiAgICB0aGlzLnNsaWRlciA9IG5ldyBndWlDb21wb25lbnRzLlNsaWRlcih7XG4gICAgICBjb250YWluZXI6IHRoaXMuJHJhbmdlLFxuICAgICAgY2FsbGJhY2s6IHRoaXMuX29uU2xpZGVyQ2hhbmdlLFxuICAgICAgbWluOiBtaW4sXG4gICAgICBtYXg6IG1heCxcbiAgICAgIHN0ZXA6IHN0ZXAsXG4gICAgICBkZWZhdWx0OiB0aGlzLl92YWx1ZSxcbiAgICAgIGZvcmVncm91bmRDb2xvcjogJyNhYmFiYWInLFxuICAgIH0pO1xuXG4gICAgdGhpcy5fYmluZEV2ZW50cygpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlc2l6ZSgpIHtcbiAgICBzdXBlci5yZXNpemUoKTtcblxuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodMKgfSA9IHRoaXMuJHJhbmdlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHRoaXMuc2xpZGVyLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBfYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLiRudW1iZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBwYXJzZUZsb2F0KHRoaXMuJG51bWJlci52YWx1ZSk7XG4gICAgICAvLyB0aGUgc2xpZGVyIHByb3BhZ2F0ZXMgdGhlIHZhbHVlXG4gICAgICB0aGlzLnNsaWRlci52YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB9LCBmYWxzZSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgX29uU2xpZGVyQ2hhbmdlKHZhbHVlKSB7XG4gICAgdGhpcy4kbnVtYmVyLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcblxuICAgIHRoaXMuZXhlY3V0ZUxpc3RlbmVycyh0aGlzLl92YWx1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2xpZGVyO1xuIl19