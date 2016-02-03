'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _baseController = require('./base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

var Slider = (function (_BaseController) {
  _inherits(Slider, _BaseController);

  function Slider(legend) {
    var min = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    var max = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
    var step = arguments.length <= 3 || arguments[3] === undefined ? 0.01 : arguments[3];
    var defaultValue = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
    var unit = arguments.length <= 5 || arguments[5] === undefined ? '' : arguments[5];
    var size = arguments.length <= 6 || arguments[6] === undefined ? 'default' : arguments[6];
    var $container = arguments.length <= 7 || arguments[7] === undefined ? null : arguments[7];
    var callback = arguments.length <= 8 || arguments[8] === undefined ? null : arguments[8];

    _classCallCheck(this, Slider);

    _get(Object.getPrototypeOf(Slider.prototype), 'constructor', this).call(this);

    this.type = 'slider';
    this.legend = legend;
    this.min = min;
    this.max = max;
    this.step = step;
    this.unit = unit;
    this.size = size;
    this._value = defaultValue;

    _get(Object.getPrototypeOf(Slider.prototype), '_applyOptionnalParameters', this).call(this, $container, callback);
  }

  _createClass(Slider, [{
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        <input class="range" type="range" min="' + this.min + '" max="' + this.max + '" step="' + this.step + '" value="' + this.value + '" />\n        <div class="number-wrapper">\n          <input type="number" class="number" min="' + this.min + '" max="' + this.max + '" step="' + this.step + '" value="' + this.value + '" />\n          <span class="unit">' + this.unit + '</span>\n        </div>\n      </div>';

      this.$el = _get(Object.getPrototypeOf(Slider.prototype), 'render', this).call(this, this.type);
      this.$el.innerHTML = content;
      this.$el.classList.add('slider-' + this.size);

      this.$range = this.$el.querySelector('input[type="range"]');
      this.$number = this.$el.querySelector('input[type="number"]');

      this.bindEvents();

      return this.$el;
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this = this;

      this.$range.addEventListener('input', function () {
        var value = parseFloat(_this.$range.value);
        _this.$number.value = value;
        _this.value = value;

        _this.emit('change', value);
      }, false);

      this.$number.addEventListener('change', function () {
        // @todo - should handle min and max
        var value = parseFloat(_this.$number.value);
        _this.$range.value = value;
        _this.value = value;

        _this.emit('change', value);
      }, false);
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
})(_baseController2['default']);

exports['default'] = Slider;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi9jb21wb25lbnRzL3NsaWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OzhCQUEyQixtQkFBbUI7Ozs7SUFFekIsTUFBTTtZQUFOLE1BQU07O0FBQ2QsV0FEUSxNQUFNLENBQ2IsTUFBTSxFQUFvSDtRQUFsSCxHQUFHLHlEQUFHLENBQUM7UUFBRSxHQUFHLHlEQUFHLENBQUM7UUFBRSxJQUFJLHlEQUFHLElBQUk7UUFBRSxZQUFZLHlEQUFHLENBQUM7UUFBRSxJQUFJLHlEQUFHLEVBQUU7UUFBRSxJQUFJLHlEQUFHLFNBQVM7UUFBRSxVQUFVLHlEQUFHLElBQUk7UUFBRSxRQUFRLHlEQUFHLElBQUk7OzBCQURqSCxNQUFNOztBQUV2QiwrQkFGaUIsTUFBTSw2Q0FFZjs7QUFFUixRQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztBQUNyQixRQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixRQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNmLFFBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQ2YsUUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsUUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsUUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsUUFBSSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUM7O0FBRTNCLCtCQWJpQixNQUFNLDJEQWFTLFVBQVUsRUFBRSxRQUFRLEVBQUU7R0FDdkQ7O2VBZGtCLE1BQU07O1dBNkJuQixrQkFBRztBQUNQLFVBQU0sT0FBTyxxQ0FDWSxJQUFJLENBQUMsTUFBTSxtR0FFUyxJQUFJLENBQUMsR0FBRyxlQUFVLElBQUksQ0FBQyxHQUFHLGdCQUFXLElBQUksQ0FBQyxJQUFJLGlCQUFZLElBQUksQ0FBQyxLQUFLLHVHQUVoRSxJQUFJLENBQUMsR0FBRyxlQUFVLElBQUksQ0FBQyxHQUFHLGdCQUFXLElBQUksQ0FBQyxJQUFJLGlCQUFZLElBQUksQ0FBQyxLQUFLLDJDQUMxRixJQUFJLENBQUMsSUFBSSwwQ0FFM0IsQ0FBQzs7QUFFVixVQUFJLENBQUMsR0FBRyw4QkF4Q1MsTUFBTSx3Q0F3Q0MsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25DLFVBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztBQUM3QixVQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLGFBQVcsSUFBSSxDQUFDLElBQUksQ0FBRyxDQUFDOztBQUU5QyxVQUFJLENBQUMsTUFBTSxHQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSx1QkFBdUIsQ0FBQztBQUM3RCxVQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSx3QkFBd0IsQ0FBQzs7QUFFOUQsVUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDOztBQUVsQixhQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7S0FDakI7OztXQUVTLHNCQUFHOzs7QUFDWCxVQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0FBQzFDLFlBQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxNQUFLLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM1QyxjQUFLLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQzNCLGNBQUssS0FBSyxHQUFHLEtBQUssQ0FBQzs7QUFFbkIsY0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO09BQzVCLEVBQUUsS0FBSyxDQUFDLENBQUM7O0FBRVYsVUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsWUFBTTs7QUFFNUMsWUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLE1BQUssT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzdDLGNBQUssTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDMUIsY0FBSyxLQUFLLEdBQUcsS0FBSyxDQUFDOztBQUVuQixjQUFLLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7T0FDNUIsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNYOzs7U0FyRFEsYUFBQyxLQUFLLEVBQUU7QUFDZixVQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzs7QUFFcEIsVUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDL0IsWUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUNoQyxZQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO09BQ2hDO0tBQ0Y7U0FFUSxlQUFHO0FBQ1YsYUFBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0tBQ3BCOzs7U0EzQmtCLE1BQU07OztxQkFBTixNQUFNIiwiZmlsZSI6ImVzNi9jb21wb25lbnRzL3NsaWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlQ29udHJvbGxlciBmcm9tICcuL2Jhc2UtY29udHJvbGxlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlciBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IobGVnZW5kLCBtaW4gPSAwLCBtYXggPSAxLCBzdGVwID0gMC4wMSwgZGVmYXVsdFZhbHVlID0gMCwgdW5pdCA9ICcnLCBzaXplID0gJ2RlZmF1bHQnLCAkY29udGFpbmVyID0gbnVsbCwgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudHlwZSA9ICdzbGlkZXInO1xuICAgIHRoaXMubGVnZW5kID0gbGVnZW5kO1xuICAgIHRoaXMubWluID0gbWluO1xuICAgIHRoaXMubWF4ID0gbWF4O1xuICAgIHRoaXMuc3RlcCA9IHN0ZXA7XG4gICAgdGhpcy51bml0ID0gdW5pdDtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgIHRoaXMuX3ZhbHVlID0gZGVmYXVsdFZhbHVlO1xuXG4gICAgc3VwZXIuX2FwcGx5T3B0aW9ubmFsUGFyYW1ldGVycygkY29udGFpbmVyLCBjYWxsYmFjayk7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuXG4gICAgaWYgKHRoaXMuJG51bWJlciAmJiB0aGlzLiRyYW5nZSkge1xuICAgICAgdGhpcy4kbnVtYmVyLnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgIHRoaXMuJHJhbmdlLnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICB9XG4gIH1cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBgXG4gICAgICA8c3BhbiBjbGFzcz1cImxlZ2VuZFwiPiR7dGhpcy5sZWdlbmR9PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImlubmVyLXdyYXBwZXJcIj5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwicmFuZ2VcIiB0eXBlPVwicmFuZ2VcIiBtaW49XCIke3RoaXMubWlufVwiIG1heD1cIiR7dGhpcy5tYXh9XCIgc3RlcD1cIiR7dGhpcy5zdGVwfVwiIHZhbHVlPVwiJHt0aGlzLnZhbHVlfVwiIC8+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJudW1iZXItd3JhcHBlclwiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgY2xhc3M9XCJudW1iZXJcIiBtaW49XCIke3RoaXMubWlufVwiIG1heD1cIiR7dGhpcy5tYXh9XCIgc3RlcD1cIiR7dGhpcy5zdGVwfVwiIHZhbHVlPVwiJHt0aGlzLnZhbHVlfVwiIC8+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1bml0XCI+JHt0aGlzLnVuaXR9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PmA7XG5cbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcih0aGlzLnR5cGUpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZChgc2xpZGVyLSR7dGhpcy5zaXplfWApO1xuXG4gICAgdGhpcy4kcmFuZ2UgID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcihgaW5wdXRbdHlwZT1cInJhbmdlXCJdYCk7XG4gICAgdGhpcy4kbnVtYmVyID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcihgaW5wdXRbdHlwZT1cIm51bWJlclwiXWApO1xuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJHJhbmdlLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBwYXJzZUZsb2F0KHRoaXMuJHJhbmdlLnZhbHVlKTtcbiAgICAgIHRoaXMuJG51bWJlci52YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIHZhbHVlKTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICB0aGlzLiRudW1iZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgLy8gQHRvZG8gLSBzaG91bGQgaGFuZGxlIG1pbiBhbmQgbWF4XG4gICAgICBjb25zdCB2YWx1ZSA9IHBhcnNlRmxvYXQodGhpcy4kbnVtYmVyLnZhbHVlKTtcbiAgICAgIHRoaXMuJHJhbmdlLnZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG5cbiAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJywgdmFsdWUpO1xuICAgIH0sIGZhbHNlKTtcbiAgfVxufVxuXG4iXX0=