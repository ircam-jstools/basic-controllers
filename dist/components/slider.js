'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _baseController = require('./base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Slider = function (_BaseController) {
  (0, _inherits3.default)(Slider, _BaseController);

  function Slider(legend) {
    var min = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    var max = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
    var step = arguments.length <= 3 || arguments[3] === undefined ? 0.01 : arguments[3];
    var defaultValue = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
    var unit = arguments.length <= 5 || arguments[5] === undefined ? '' : arguments[5];
    var size = arguments.length <= 6 || arguments[6] === undefined ? 'default' : arguments[6];
    var $container = arguments.length <= 7 || arguments[7] === undefined ? null : arguments[7];
    var callback = arguments.length <= 8 || arguments[8] === undefined ? null : arguments[8];
    (0, _classCallCheck3.default)(this, Slider);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Slider).call(this));

    _this.type = 'slider';
    _this.legend = legend;
    _this.min = min;
    _this.max = max;
    _this.step = step;
    _this.unit = unit;
    _this.size = size;
    _this._value = defaultValue;

    (0, _get3.default)((0, _getPrototypeOf2.default)(Slider.prototype), '_applyOptionnalParameters', _this).call(_this, $container, callback);
    return _this;
  }

  (0, _createClass3.default)(Slider, [{
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        <input class="range" type="range" min="' + this.min + '" max="' + this.max + '" step="' + this.step + '" value="' + this.value + '" />\n        <div class="number-wrapper">\n          <input type="number" class="number" min="' + this.min + '" max="' + this.max + '" step="' + this.step + '" value="' + this.value + '" />\n          <span class="unit">' + this.unit + '</span>\n        </div>\n      </div>';

      this.$el = (0, _get3.default)((0, _getPrototypeOf2.default)(Slider.prototype), 'render', this).call(this, this.type);
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
      var _this2 = this;

      this.$range.addEventListener('input', function () {
        var value = parseFloat(_this2.$range.value);
        _this2.$number.value = value;
        _this2.value = value;

        _this2.emit('change', value);
      }, false);

      this.$number.addEventListener('change', function () {
        // @todo - should handle min and max
        var value = parseFloat(_this2.$number.value);
        _this2.$range.value = value;
        _this2.value = value;

        _this2.emit('change', value);
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
}(_baseController2.default);

exports.default = Slider;
//# sourceMappingURL=data:application/json;base64,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QUFaLEdBQW9CLEtBQUssS0FBTCxDQUZXO09BQWpDOzt3QkFNVTtBQUNWLGFBQU8sS0FBSyxNQUFMLENBREc7OztTQXpCTyIsImZpbGUiOiJzbGlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZUNvbnRyb2xsZXIgZnJvbSAnLi9iYXNlLWNvbnRyb2xsZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZXIgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgbWluID0gMCwgbWF4ID0gMSwgc3RlcCA9IDAuMDEsIGRlZmF1bHRWYWx1ZSA9IDAsIHVuaXQgPSAnJywgc2l6ZSA9ICdkZWZhdWx0JywgJGNvbnRhaW5lciA9IG51bGwsIGNhbGxiYWNrID0gbnVsbCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnR5cGUgPSAnc2xpZGVyJztcbiAgICB0aGlzLmxlZ2VuZCA9IGxlZ2VuZDtcbiAgICB0aGlzLm1pbiA9IG1pbjtcbiAgICB0aGlzLm1heCA9IG1heDtcbiAgICB0aGlzLnN0ZXAgPSBzdGVwO1xuICAgIHRoaXMudW5pdCA9IHVuaXQ7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICB0aGlzLl92YWx1ZSA9IGRlZmF1bHRWYWx1ZTtcblxuICAgIHN1cGVyLl9hcHBseU9wdGlvbm5hbFBhcmFtZXRlcnMoJGNvbnRhaW5lciwgY2FsbGJhY2spO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcblxuICAgIGlmICh0aGlzLiRudW1iZXIgJiYgdGhpcy4kcmFuZ2UpIHtcbiAgICAgIHRoaXMuJG51bWJlci52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICB0aGlzLiRyYW5nZS52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjb250ZW50ID0gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJsZWdlbmRcIj4ke3RoaXMubGVnZW5kfTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbm5lci13cmFwcGVyXCI+XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cInJhbmdlXCIgdHlwZT1cInJhbmdlXCIgbWluPVwiJHt0aGlzLm1pbn1cIiBtYXg9XCIke3RoaXMubWF4fVwiIHN0ZXA9XCIke3RoaXMuc3RlcH1cIiB2YWx1ZT1cIiR7dGhpcy52YWx1ZX1cIiAvPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibnVtYmVyLXdyYXBwZXJcIj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwibnVtYmVyXCIgbWluPVwiJHt0aGlzLm1pbn1cIiBtYXg9XCIke3RoaXMubWF4fVwiIHN0ZXA9XCIke3RoaXMuc3RlcH1cIiB2YWx1ZT1cIiR7dGhpcy52YWx1ZX1cIiAvPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwidW5pdFwiPiR7dGhpcy51bml0fTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIodGhpcy50eXBlKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoYHNsaWRlci0ke3RoaXMuc2l6ZX1gKTtcblxuICAgIHRoaXMuJHJhbmdlICA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoYGlucHV0W3R5cGU9XCJyYW5nZVwiXWApO1xuICAgIHRoaXMuJG51bWJlciA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoYGlucHV0W3R5cGU9XCJudW1iZXJcIl1gKTtcblxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLiRyYW5nZS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcGFyc2VGbG9hdCh0aGlzLiRyYW5nZS52YWx1ZSk7XG4gICAgICB0aGlzLiRudW1iZXIudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcblxuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCB2YWx1ZSk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgdGhpcy4kbnVtYmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIC8vIEB0b2RvIC0gc2hvdWxkIGhhbmRsZSBtaW4gYW5kIG1heFxuICAgICAgY29uc3QgdmFsdWUgPSBwYXJzZUZsb2F0KHRoaXMuJG51bWJlci52YWx1ZSk7XG4gICAgICB0aGlzLiRyYW5nZS52YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIHZhbHVlKTtcbiAgICB9LCBmYWxzZSk7XG4gIH1cbn1cblxuIl19