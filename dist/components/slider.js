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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNsaWRlci5qcyJdLCJuYW1lcyI6WyJndWlDb21wb25lbnRzIiwiU2xpZGVyIiwibGVnZW5kIiwibWluIiwibWF4Iiwic3RlcCIsImRlZmF1bHRWYWx1ZSIsInVuaXQiLCJzaXplIiwiJGNvbnRhaW5lciIsImNhbGxiYWNrIiwidHlwZSIsIl92YWx1ZSIsIl9vblNsaWRlckNoYW5nZSIsImJpbmQiLCJjb250ZW50IiwidmFsdWUiLCIkZWwiLCJpbm5lckhUTUwiLCJjbGFzc0xpc3QiLCJhZGQiLCIkcmFuZ2UiLCJxdWVyeVNlbGVjdG9yIiwiJG51bWJlciIsInNsaWRlciIsImNvbnRhaW5lciIsImRlZmF1bHQiLCJmb3JlZ3JvdW5kQ29sb3IiLCJiaW5kRXZlbnRzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhcnNlRmxvYXQiLCJfZXhlY3V0ZUxpc3RlbmVycyIsImNvbnNvbGUiLCJsb2ciLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ3aWR0aCIsImhlaWdodCIsInJlc2l6ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0lBQVlBLGE7Ozs7Ozs7Ozs7OztJQUVOQyxNOzs7QUFDSixrQkFBWUMsTUFBWixFQUFzSTtBQUFBLFFBQWxIQyxHQUFrSCx1RUFBNUcsQ0FBNEc7QUFBQSxRQUF6R0MsR0FBeUcsdUVBQW5HLENBQW1HO0FBQUEsUUFBaEdDLElBQWdHLHVFQUF6RixJQUF5RjtBQUFBLFFBQW5GQyxZQUFtRix1RUFBcEUsQ0FBb0U7QUFBQSxRQUFqRUMsSUFBaUUsdUVBQTFELEVBQTBEO0FBQUEsUUFBdERDLElBQXNELHVFQUEvQyxTQUErQztBQUFBLFFBQXBDQyxVQUFvQyx1RUFBdkIsSUFBdUI7QUFBQSxRQUFqQkMsUUFBaUIsdUVBQU4sSUFBTTs7QUFBQTs7QUFBQTs7QUFHcEksVUFBS0MsSUFBTCxHQUFZLFFBQVo7QUFDQSxVQUFLVCxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxVQUFLQyxHQUFMLEdBQVdBLEdBQVg7QUFDQSxVQUFLQyxHQUFMLEdBQVdBLEdBQVg7QUFDQSxVQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxVQUFLRSxJQUFMLEdBQVlBLElBQVo7QUFDQSxVQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxVQUFLSSxNQUFMLEdBQWNOLFlBQWQ7O0FBRUEsVUFBS08sZUFBTCxHQUF1QixNQUFLQSxlQUFMLENBQXFCQyxJQUFyQixPQUF2Qjs7QUFFQSxnSUFBZ0NMLFVBQWhDLEVBQTRDQyxRQUE1QztBQWRvSTtBQWVySTs7Ozs2QkFlUTtBQUNQLFVBQU1LLDRDQUNtQixLQUFLYixNQUR4QixnTEFLMkMsS0FBS0MsR0FMaEQsZUFLNkQsS0FBS0MsR0FMbEUsZ0JBS2dGLEtBQUtDLElBTHJGLGlCQUtxRyxLQUFLVyxLQUwxRywyQ0FNcUIsS0FBS1QsSUFOMUIsMENBQU47O0FBVUEsV0FBS1UsR0FBTCwwR0FBd0IsS0FBS04sSUFBN0I7QUFDQSxXQUFLTSxHQUFMLENBQVNDLFNBQVQsR0FBcUJILE9BQXJCO0FBQ0EsV0FBS0UsR0FBTCxDQUFTRSxTQUFULENBQW1CQyxHQUFuQixhQUFpQyxLQUFLWixJQUF0Qzs7QUFFQSxXQUFLYSxNQUFMLEdBQWMsS0FBS0osR0FBTCxDQUFTSyxhQUFULENBQXVCLFFBQXZCLENBQWQ7QUFDQSxXQUFLQyxPQUFMLEdBQWUsS0FBS04sR0FBTCxDQUFTSyxhQUFULHdCQUFmOztBQUVBLFdBQUtFLE1BQUwsR0FBYyxJQUFJeEIsY0FBY0MsTUFBbEIsQ0FBeUI7QUFDckN3QixtQkFBVyxLQUFLSixNQURxQjtBQUVyQ1gsa0JBQVUsS0FBS0csZUFGc0I7QUFHckNWLGFBQUssS0FBS0EsR0FIMkI7QUFJckNDLGFBQUssS0FBS0EsR0FKMkI7QUFLckNDLGNBQU0sS0FBS0EsSUFMMEI7QUFNckNxQixpQkFBUyxLQUFLVixLQU51QjtBQU9yQ1cseUJBQWlCO0FBUG9CLE9BQXpCLENBQWQ7O0FBVUEsV0FBS0MsVUFBTDs7QUFFQSxhQUFPLEtBQUtYLEdBQVo7QUFDRDs7O2lDQUVZO0FBQUE7O0FBQ1gsV0FBS00sT0FBTCxDQUFhTSxnQkFBYixDQUE4QixRQUE5QixFQUF3QyxZQUFNO0FBQzVDLFlBQU1iLFFBQVFjLFdBQVcsT0FBS1AsT0FBTCxDQUFhUCxLQUF4QixDQUFkO0FBQ0EsZUFBS1EsTUFBTCxDQUFZUixLQUFaLEdBQW9CQSxLQUFwQjtBQUNBLGVBQUtKLE1BQUwsR0FBY0ksS0FBZDs7QUFFQSxlQUFLZSxpQkFBTCxDQUF1QixPQUFLbkIsTUFBNUI7QUFDRCxPQU5ELEVBTUcsS0FOSDtBQU9EOzs7K0JBRVU7QUFDVDs7QUFFQW9CLGNBQVFDLEdBQVIsQ0FBWSxLQUFaOztBQUhTLGtDQUlpQixLQUFLWixNQUFMLENBQVlhLHFCQUFaLEVBSmpCO0FBQUEsVUFJREMsS0FKQyx5QkFJREEsS0FKQztBQUFBLFVBSU1DLE1BSk4seUJBSU1BLE1BSk47O0FBS1QsV0FBS1osTUFBTCxDQUFZYSxNQUFaLENBQW1CRixLQUFuQixFQUEwQkMsTUFBMUI7QUFDRDs7O29DQUVlcEIsSyxFQUFPO0FBQ3JCLFdBQUtPLE9BQUwsQ0FBYVAsS0FBYixHQUFxQkEsS0FBckI7QUFDQSxXQUFLSixNQUFMLEdBQWNJLEtBQWQ7O0FBRUEsV0FBS2UsaUJBQUwsQ0FBdUIsS0FBS25CLE1BQTVCO0FBQ0Q7OztzQkFyRVNJLEssRUFBTztBQUNmLFdBQUtKLE1BQUwsR0FBY0ksS0FBZDs7QUFFQSxVQUFJLEtBQUtPLE9BQUwsSUFBZ0IsS0FBS0YsTUFBekIsRUFBaUM7QUFDL0IsYUFBS0UsT0FBTCxDQUFhUCxLQUFiLEdBQXFCLEtBQUtBLEtBQTFCO0FBQ0EsYUFBS0ssTUFBTCxDQUFZTCxLQUFaLEdBQW9CLEtBQUtBLEtBQXpCO0FBQ0Q7QUFDRixLO3dCQUVXO0FBQ1YsYUFBTyxLQUFLSixNQUFaO0FBQ0Q7Ozs7OztrQkE2RFlYLE0iLCJmaWxlIjoiU2xpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VDb250cm9sbGVyIGZyb20gJy4vQmFzZUNvbnRyb2xsZXInO1xuaW1wb3J0ICogYXMgZ3VpQ29tcG9uZW50cyBmcm9tICdndWktY29tcG9uZW50cyc7XG5cbmNsYXNzIFNsaWRlciBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IobGVnZW5kLCBtaW4gPSAwLCBtYXggPSAxLCBzdGVwID0gMC4wMSwgZGVmYXVsdFZhbHVlID0gMCwgdW5pdCA9ICcnLCBzaXplID0gJ2RlZmF1bHQnLCAkY29udGFpbmVyID0gbnVsbCwgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudHlwZSA9ICdzbGlkZXInO1xuICAgIHRoaXMubGVnZW5kID0gbGVnZW5kO1xuICAgIHRoaXMubWluID0gbWluO1xuICAgIHRoaXMubWF4ID0gbWF4O1xuICAgIHRoaXMuc3RlcCA9IHN0ZXA7XG4gICAgdGhpcy51bml0ID0gdW5pdDtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgIHRoaXMuX3ZhbHVlID0gZGVmYXVsdFZhbHVlO1xuXG4gICAgdGhpcy5fb25TbGlkZXJDaGFuZ2UgPSB0aGlzLl9vblNsaWRlckNoYW5nZS5iaW5kKHRoaXMpO1xuXG4gICAgc3VwZXIuX2FwcGx5T3B0aW9ubmFsUGFyYW1ldGVycygkY29udGFpbmVyLCBjYWxsYmFjayk7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuXG4gICAgaWYgKHRoaXMuJG51bWJlciAmJiB0aGlzLiRyYW5nZSkge1xuICAgICAgdGhpcy4kbnVtYmVyLnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgIHRoaXMuJHJhbmdlLnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICB9XG4gIH1cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBgXG4gICAgICA8c3BhbiBjbGFzcz1cImxlZ2VuZFwiPiR7dGhpcy5sZWdlbmR9PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImlubmVyLXdyYXBwZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJhbmdlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJudW1iZXItd3JhcHBlclwiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgY2xhc3M9XCJudW1iZXJcIiBtaW49XCIke3RoaXMubWlufVwiIG1heD1cIiR7dGhpcy5tYXh9XCIgc3RlcD1cIiR7dGhpcy5zdGVwfVwiIHZhbHVlPVwiJHt0aGlzLnZhbHVlfVwiIC8+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1bml0XCI+JHt0aGlzLnVuaXR9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PmA7XG5cbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcih0aGlzLnR5cGUpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZChgc2xpZGVyLSR7dGhpcy5zaXplfWApO1xuXG4gICAgdGhpcy4kcmFuZ2UgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcucmFuZ2UnKTtcbiAgICB0aGlzLiRudW1iZXIgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKGBpbnB1dFt0eXBlPVwibnVtYmVyXCJdYCk7XG5cbiAgICB0aGlzLnNsaWRlciA9IG5ldyBndWlDb21wb25lbnRzLlNsaWRlcih7XG4gICAgICBjb250YWluZXI6IHRoaXMuJHJhbmdlLFxuICAgICAgY2FsbGJhY2s6IHRoaXMuX29uU2xpZGVyQ2hhbmdlLFxuICAgICAgbWluOiB0aGlzLm1pbixcbiAgICAgIG1heDogdGhpcy5tYXgsXG4gICAgICBzdGVwOiB0aGlzLnN0ZXAsXG4gICAgICBkZWZhdWx0OiB0aGlzLnZhbHVlLFxuICAgICAgZm9yZWdyb3VuZENvbG9yOiAnI2FiYWJhYicsXG4gICAgfSk7XG5cbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kbnVtYmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcGFyc2VGbG9hdCh0aGlzLiRudW1iZXIudmFsdWUpO1xuICAgICAgdGhpcy5zbGlkZXIudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG5cbiAgICAgIHRoaXMuX2V4ZWN1dGVMaXN0ZW5lcnModGhpcy5fdmFsdWUpO1xuICAgIH0sIGZhbHNlKTtcbiAgfVxuXG4gIG9uUmVzaXplKCkge1xuICAgIHN1cGVyLm9uUmVzaXplKCk7XG5cbiAgICBjb25zb2xlLmxvZygnPz8/Jyk7XG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0wqB9ID0gdGhpcy4kcmFuZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdGhpcy5zbGlkZXIucmVzaXplKHdpZHRoLCBoZWlnaHQpO1xuICB9XG5cbiAgX29uU2xpZGVyQ2hhbmdlKHZhbHVlKSB7XG4gICAgdGhpcy4kbnVtYmVyLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcblxuICAgIHRoaXMuX2V4ZWN1dGVMaXN0ZW5lcnModGhpcy5fdmFsdWUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNsaWRlcjtcbiJdfQ==