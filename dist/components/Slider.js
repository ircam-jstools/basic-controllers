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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNsaWRlci5qcyJdLCJuYW1lcyI6WyJndWlDb21wb25lbnRzIiwiZGVmYXVsdHMiLCJsYWJlbCIsIm1pbiIsIm1heCIsInN0ZXAiLCJkZWZhdWx0IiwidW5pdCIsInNpemUiLCJjb250YWluZXIiLCJjYWxsYmFjayIsIlNsaWRlciIsImNvbmZpZyIsIl92YWx1ZSIsInBhcmFtcyIsIl9vblNsaWRlckNoYW5nZSIsImJpbmQiLCJjb250ZW50IiwiJGVsIiwidHlwZSIsImlubmVySFRNTCIsImNsYXNzTGlzdCIsImFkZCIsIiRyYW5nZSIsInF1ZXJ5U2VsZWN0b3IiLCIkbnVtYmVyIiwic2xpZGVyIiwiZm9yZWdyb3VuZENvbG9yIiwiYmluZEV2ZW50cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJ2YWx1ZSIsInBhcnNlRmxvYXQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ3aWR0aCIsImhlaWdodCIsInJlc2l6ZSIsImV4ZWN1dGVMaXN0ZW5lcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztJQUFZQSxhOzs7Ozs7Ozs7Ozs7QUFFWjs7QUFFQSxJQUFNQyxXQUFXO0FBQ2ZDLFNBQU8sUUFEUTtBQUVmQyxPQUFLLENBRlU7QUFHZkMsT0FBSyxDQUhVO0FBSWZDLFFBQU0sSUFKUztBQUtmQyxXQUFTLENBTE07QUFNZkMsUUFBTSxFQU5TO0FBT2ZDLFFBQU0sUUFQUztBQVFmQyxhQUFXLElBUkk7QUFTZkMsWUFBVTtBQVRLLENBQWpCOztBQVlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFnQ01DLE07OztBQUNKLGtCQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBQUEsZ0hBQ1osUUFEWSxFQUNGWCxRQURFLEVBQ1FXLE1BRFI7O0FBR2xCLFVBQUtDLE1BQUwsR0FBYyxNQUFLQyxNQUFMLENBQVlSLE9BQTFCO0FBQ0EsVUFBS1MsZUFBTCxHQUF1QixNQUFLQSxlQUFMLENBQXFCQyxJQUFyQixPQUF2Qjs7QUFFQTtBQU5rQjtBQU9uQjs7QUFFRDs7Ozs7Ozs7OztBQWlCQTs2QkFDUztBQUFBLG9CQUN1QyxLQUFLRixNQUQ1QztBQUFBLFVBQ0NaLEtBREQsV0FDQ0EsS0FERDtBQUFBLFVBQ1FDLEdBRFIsV0FDUUEsR0FEUjtBQUFBLFVBQ2FDLEdBRGIsV0FDYUEsR0FEYjtBQUFBLFVBQ2tCQyxJQURsQixXQUNrQkEsSUFEbEI7QUFBQSxVQUN3QkUsSUFEeEIsV0FDd0JBLElBRHhCO0FBQUEsVUFDOEJDLElBRDlCLFdBQzhCQSxJQUQ5Qjs7QUFFUCxVQUFNUywyQ0FDa0JmLEtBRGxCLGdMQUsyQ0MsR0FMM0MsZUFLd0RDLEdBTHhELGdCQUtzRUMsSUFMdEUsaUJBS3NGLEtBQUtRLE1BTDNGLDJDQU1xQk4sSUFOckIsMENBQU47O0FBVUEsV0FBS1csR0FBTCwwR0FBd0IsS0FBS0MsSUFBN0I7QUFDQSxXQUFLRCxHQUFMLENBQVNFLFNBQVQsR0FBcUJILE9BQXJCO0FBQ0EsV0FBS0MsR0FBTCxDQUFTRyxTQUFULENBQW1CQyxHQUFuQixhQUFpQ2QsSUFBakM7O0FBRUEsV0FBS2UsTUFBTCxHQUFjLEtBQUtMLEdBQUwsQ0FBU00sYUFBVCxDQUF1QixRQUF2QixDQUFkO0FBQ0EsV0FBS0MsT0FBTCxHQUFlLEtBQUtQLEdBQUwsQ0FBU00sYUFBVCx3QkFBZjs7QUFFQSxXQUFLRSxNQUFMLEdBQWMsSUFBSTFCLGNBQWNXLE1BQWxCLENBQXlCO0FBQ3JDRixtQkFBVyxLQUFLYyxNQURxQjtBQUVyQ2Isa0JBQVUsS0FBS0ssZUFGc0I7QUFHckNaLGFBQUtBLEdBSGdDO0FBSXJDQyxhQUFLQSxHQUpnQztBQUtyQ0MsY0FBTUEsSUFMK0I7QUFNckNDLGlCQUFTLEtBQUtPLE1BTnVCO0FBT3JDYyx5QkFBaUI7QUFQb0IsT0FBekIsQ0FBZDs7QUFVQSxXQUFLQyxVQUFMOztBQUVBLGFBQU8sS0FBS1YsR0FBWjtBQUNEOztBQUVEOzs7O2lDQUNhO0FBQUE7O0FBQ1gsV0FBS08sT0FBTCxDQUFhSSxnQkFBYixDQUE4QixRQUE5QixFQUF3QyxZQUFNO0FBQzVDLFlBQU1DLFFBQVFDLFdBQVcsT0FBS04sT0FBTCxDQUFhSyxLQUF4QixDQUFkO0FBQ0E7QUFDQSxlQUFLSixNQUFMLENBQVlJLEtBQVosR0FBb0JBLEtBQXBCO0FBQ0EsZUFBS2pCLE1BQUwsR0FBY2lCLEtBQWQ7QUFDRCxPQUxELEVBS0csS0FMSDtBQU1EOztBQUVEOzs7OytCQUNXO0FBQ1Q7O0FBRFMsa0NBR2lCLEtBQUtQLE1BQUwsQ0FBWVMscUJBQVosRUFIakI7QUFBQSxVQUdEQyxLQUhDLHlCQUdEQSxLQUhDO0FBQUEsVUFHTUMsTUFITix5QkFHTUEsTUFITjs7QUFJVCxXQUFLUixNQUFMLENBQVlTLE1BQVosQ0FBbUJGLEtBQW5CLEVBQTBCQyxNQUExQjtBQUNEOztBQUVEOzs7O29DQUNnQkosSyxFQUFPO0FBQ3JCLFdBQUtMLE9BQUwsQ0FBYUssS0FBYixHQUFxQkEsS0FBckI7QUFDQSxXQUFLakIsTUFBTCxHQUFjaUIsS0FBZDs7QUFFQSxXQUFLTSxnQkFBTCxDQUFzQixLQUFLdkIsTUFBM0I7QUFDRDs7O3NCQXhFU2lCLEssRUFBTztBQUNmLFdBQUtqQixNQUFMLEdBQWNpQixLQUFkOztBQUVBLFVBQUksS0FBS0wsT0FBTCxJQUFnQixLQUFLRixNQUF6QixFQUFpQztBQUMvQixhQUFLRSxPQUFMLENBQWFLLEtBQWIsR0FBcUIsS0FBS0EsS0FBMUI7QUFDQSxhQUFLSixNQUFMLENBQVlJLEtBQVosR0FBb0IsS0FBS0EsS0FBekI7QUFDRDtBQUNGLEs7d0JBRVc7QUFDVixhQUFPLEtBQUtqQixNQUFaO0FBQ0Q7Ozs7OztrQkFnRVlGLE0iLCJmaWxlIjoiU2xpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VDb250cm9sbGVyIGZyb20gJy4vQmFzZUNvbnRyb2xsZXInO1xuaW1wb3J0ICogYXMgZ3VpQ29tcG9uZW50cyBmcm9tICdndWktY29tcG9uZW50cyc7XG5cbi8qKiBAbW9kdWxlIGJhc2ljLWNvbnRyb2xsZXJzICovXG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICBsYWJlbDogJyZuYnNwOycsXG4gIG1pbjogMCxcbiAgbWF4OiAxLFxuICBzdGVwOiAwLjAxLFxuICBkZWZhdWx0OiAwLFxuICB1bml0OiAnJyxcbiAgc2l6ZTogJ21lZGl1bScsXG4gIGNvbnRhaW5lcjogbnVsbCxcbiAgY2FsbGJhY2s6IG51bGwsXG59XG5cbi8qKlxuICogU2xpZGVyIGNvbnRyb2xsZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBjb25maWcubGFiZWwgLSBMYWJlbCBvZiB0aGUgY29udHJvbGxlci5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLm1pbj0wXSAtIE1pbmltdW0gdmFsdWUuXG4gKiBAcGFyYW0ge051bWJlcn0gW2NvbmZpZy5tYXg9MV0gLSBNYXhpbXVtIHZhbHVlLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtjb25maWcuc3RlcD0wLjAxXSAtIFN0ZXAgYmV0d2VlbiBjb25zZWN1dGl2ZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge051bWJlcn0gW2NvbmZpZy5kZWZhdWx0PTBdIC0gRGVmYXVsdCB2YWx1ZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBbY29uZmlnLnVuaXQ9JyddIC0gVW5pdCBvZiB0aGUgdmFsdWUuXG4gKiBAcGFyYW0geydzbWFsbCd8J21lZGl1bSd8J2xhcmdlJ30gW2NvbmZpZy5zaXplPSdtZWRpdW0nXSAtIFNpemUgb2YgdGhlXG4gKiAgc2xpZGVyLlxuICogQHBhcmFtIHtTdHJpbmd8RWxlbWVudHxiYXNpYy1jb250cm9sbGVyfkdyb3VwfSBbY29uZmlnLmNvbnRhaW5lcj1udWxsXSAtXG4gKiAgQ29udGFpbmVyIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbmZpZy5jYWxsYmFjaz1udWxsXSAtIENhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIHdoZW4gdGhlXG4gKiAgdmFsdWUgY2hhbmdlcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgY29udHJvbGxlcnMgZnJvbSAnYmFzaWMtY29udHJvbGxlcnMnO1xuICpcbiAqIGNvbnN0IHNsaWRlciA9IG5ldyBjb250cm9sbGVycy5TbGlkZXIoe1xuICogICBsYWJlbDogJ015IFNsaWRlcicsXG4gKiAgIG1pbjogMjAsXG4gKiAgIG1heDogMTAwMCxcbiAqICAgc3RlcDogMSxcbiAqICAgZGVmYXVsdDogNTM3LFxuICogICB1bml0OiAnSHonLFxuICogICBzaXplOiAnbGFyZ2UnLFxuICogICBjb250YWluZXI6ICcjY29udGFpbmVyJyxcbiAqICAgY2FsbGJhY2s6ICh2YWx1ZSkgPT4gY29uc29sZS5sb2codmFsdWUpLFxuICogfSk7XG4gKi9cbmNsYXNzIFNsaWRlciBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoJ3NsaWRlcicsIGRlZmF1bHRzLCBjb25maWcpO1xuXG4gICAgdGhpcy5fdmFsdWUgPSB0aGlzLnBhcmFtcy5kZWZhdWx0O1xuICAgIHRoaXMuX29uU2xpZGVyQ2hhbmdlID0gdGhpcy5fb25TbGlkZXJDaGFuZ2UuYmluZCh0aGlzKTtcblxuICAgIHN1cGVyLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDdXJyZW50IHZhbHVlLlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcblxuICAgIGlmICh0aGlzLiRudW1iZXIgJiYgdGhpcy4kcmFuZ2UpIHtcbiAgICAgIHRoaXMuJG51bWJlci52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICB0aGlzLnNsaWRlci52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBsYWJlbCwgbWluLCBtYXgsIHN0ZXAsIHVuaXQsIHNpemUgfSA9IHRoaXMucGFyYW1zO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBgXG4gICAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+JHtsYWJlbH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmFuZ2VcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm51bWJlci13cmFwcGVyXCI+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cIm51bWJlclwiIG1pbj1cIiR7bWlufVwiIG1heD1cIiR7bWF4fVwiIHN0ZXA9XCIke3N0ZXB9XCIgdmFsdWU9XCIke3RoaXMuX3ZhbHVlfVwiIC8+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1bml0XCI+JHt1bml0fTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIodGhpcy50eXBlKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoYHNsaWRlci0ke3NpemV9YCk7XG5cbiAgICB0aGlzLiRyYW5nZSA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5yYW5nZScpO1xuICAgIHRoaXMuJG51bWJlciA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoYGlucHV0W3R5cGU9XCJudW1iZXJcIl1gKTtcblxuICAgIHRoaXMuc2xpZGVyID0gbmV3IGd1aUNvbXBvbmVudHMuU2xpZGVyKHtcbiAgICAgIGNvbnRhaW5lcjogdGhpcy4kcmFuZ2UsXG4gICAgICBjYWxsYmFjazogdGhpcy5fb25TbGlkZXJDaGFuZ2UsXG4gICAgICBtaW46IG1pbixcbiAgICAgIG1heDogbWF4LFxuICAgICAgc3RlcDogc3RlcCxcbiAgICAgIGRlZmF1bHQ6IHRoaXMuX3ZhbHVlLFxuICAgICAgZm9yZWdyb3VuZENvbG9yOiAnI2FiYWJhYicsXG4gICAgfSk7XG5cbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJG51bWJlci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHBhcnNlRmxvYXQodGhpcy4kbnVtYmVyLnZhbHVlKTtcbiAgICAgIC8vIHRoZSBzbGlkZXIgcHJvcGFnYXRlcyB0aGUgdmFsdWVcbiAgICAgIHRoaXMuc2xpZGVyLnZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIH0sIGZhbHNlKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBvblJlc2l6ZSgpIHtcbiAgICBzdXBlci5vblJlc2l6ZSgpO1xuXG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0wqB9ID0gdGhpcy4kcmFuZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdGhpcy5zbGlkZXIucmVzaXplKHdpZHRoLCBoZWlnaHQpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIF9vblNsaWRlckNoYW5nZSh2YWx1ZSkge1xuICAgIHRoaXMuJG51bWJlci52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG5cbiAgICB0aGlzLmV4ZWN1dGVMaXN0ZW5lcnModGhpcy5fdmFsdWUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNsaWRlcjtcbiJdfQ==