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

var _elements = require('../utils/elements');

var elements = _interopRequireWildcard(_elements);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NumberBox = function (_BaseController) {
  (0, _inherits3.default)(NumberBox, _BaseController);

  function NumberBox(legend) {
    var min = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    var max = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
    var step = arguments.length <= 3 || arguments[3] === undefined ? 0.01 : arguments[3];
    var defaultValue = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
    var $container = arguments.length <= 5 || arguments[5] === undefined ? null : arguments[5];
    var callback = arguments.length <= 6 || arguments[6] === undefined ? null : arguments[6];
    (0, _classCallCheck3.default)(this, NumberBox);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(NumberBox).call(this));

    _this.type = 'number-box';
    _this.legend = legend;
    _this.min = 0;
    _this.max = max;
    _this.step = step;
    _this._value = defaultValue;
    _this._isIntStep = step % 1 === 0;

    (0, _get3.default)((0, _getPrototypeOf2.default)(NumberBox.prototype), '_applyOptionnalParameters', _this).call(_this, $container, callback);
    return _this;
  }

  (0, _createClass3.default)(NumberBox, [{
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        ' + elements.arrowLeft + '\n        <input class="number" type="number" min="' + this.min + '" max="' + this.max + '" step="' + this.step + '" value="' + this._value + '" />\n        ' + elements.arrowRight + '\n      </div>\n    ';

      this.$el = (0, _get3.default)((0, _getPrototypeOf2.default)(NumberBox.prototype), 'render', this).call(this, this.type);
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

      this.emit('change', this._value);
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
}(_baseController2.default);

exports.default = NumberBox;
//# sourceMappingURL=data:application/json;base64,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S0FBSyxNQUFMLENBREc7O3NCQUlGLE9BQU87QUFDZixjQUFRLEtBQUssVUFBTCxHQUFrQixTQUFTLEtBQVQsRUFBZ0IsRUFBaEIsQ0FBbEIsR0FBd0MsV0FBVyxLQUFYLENBQXhDLENBRE87QUFFZixjQUFRLEtBQUssR0FBTCxDQUFTLEtBQUssR0FBTCxFQUFVLEtBQUssR0FBTCxDQUFTLEtBQUssR0FBTCxFQUFVLEtBQW5CLENBQW5CLENBQVIsQ0FGZTtBQUdmLFdBQUssT0FBTCxDQUFhLEtBQWIsR0FBcUIsS0FBckIsQ0FIZTs7QUFLZixXQUFLLE1BQUwsR0FBYyxLQUFkLENBTGU7OztTQW5CRSIsImZpbGUiOiJudW1iZXItYm94LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VDb250cm9sbGVyIGZyb20gJy4vYmFzZS1jb250cm9sbGVyJztcbmltcG9ydCAqIGFzIGVsZW1lbnRzIGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTnVtYmVyQm94IGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihsZWdlbmQsIG1pbiA9IDAsIG1heCA9IDEsIHN0ZXAgPSAwLjAxLCBkZWZhdWx0VmFsdWUgPSAwLCAkY29udGFpbmVyID0gbnVsbCwgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudHlwZSA9ICdudW1iZXItYm94JztcbiAgICB0aGlzLmxlZ2VuZCA9IGxlZ2VuZDtcbiAgICB0aGlzLm1pbiA9IDA7XG4gICAgdGhpcy5tYXggPSBtYXg7XG4gICAgdGhpcy5zdGVwID0gc3RlcDtcbiAgICB0aGlzLl92YWx1ZSA9IGRlZmF1bHRWYWx1ZTtcbiAgICB0aGlzLl9pc0ludFN0ZXAgPSAoc3RlcCAlIDEgPT09IDApO1xuXG4gICAgc3VwZXIuX2FwcGx5T3B0aW9ubmFsUGFyYW1ldGVycygkY29udGFpbmVyLCBjYWxsYmFjayk7XG4gIH1cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgdmFsdWUgPSB0aGlzLl9pc0ludFN0ZXAgPyBwYXJzZUludCh2YWx1ZSwgMTApIDogcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgdmFsdWUgPSBNYXRoLm1pbih0aGlzLm1heCwgTWF0aC5tYXgodGhpcy5taW4sIHZhbHVlKSk7XG4gICAgdGhpcy4kbnVtYmVyLnZhbHVlID0gdmFsdWU7XG5cbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBgXG4gICAgICA8c3BhbiBjbGFzcz1cImxlZ2VuZFwiPiR7dGhpcy5sZWdlbmR9PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImlubmVyLXdyYXBwZXJcIj5cbiAgICAgICAgJHtlbGVtZW50cy5hcnJvd0xlZnR9XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cIm51bWJlclwiIHR5cGU9XCJudW1iZXJcIiBtaW49XCIke3RoaXMubWlufVwiIG1heD1cIiR7dGhpcy5tYXh9XCIgc3RlcD1cIiR7dGhpcy5zdGVwfVwiIHZhbHVlPVwiJHt0aGlzLl92YWx1ZX1cIiAvPlxuICAgICAgICAke2VsZW1lbnRzLmFycm93UmlnaHR9XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIodGhpcy50eXBlKTtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKCdhbGlnbi1zbWFsbCcpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiRwcmV2ID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmFycm93LWxlZnQnKTtcbiAgICB0aGlzLiRuZXh0ID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmFycm93LXJpZ2h0Jyk7XG4gICAgdGhpcy4kbnVtYmVyID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cIm51bWJlclwiXScpO1xuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJHByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgY29uc3QgZGVjaW1hbHMgPSB0aGlzLnN0ZXAudG9TdHJpbmcoKS5zcGxpdCgnLicpWzFdO1xuICAgICAgY29uc3QgZXhwID0gZGVjaW1hbHMgPyBkZWNpbWFscy5sZW5ndGggOiAwO1xuICAgICAgY29uc3QgbXVsdCA9IE1hdGgucG93KDEwLCBleHApO1xuXG4gICAgICBjb25zdCBpbnRWYWx1ZSA9IE1hdGguZmxvb3IodGhpcy52YWx1ZSAqIG11bHQgKyAwLjUpO1xuICAgICAgY29uc3QgaW50U3RlcCA9IE1hdGguZmxvb3IodGhpcy5zdGVwICogbXVsdCArIDAuNSk7XG4gICAgICBjb25zdCB2YWx1ZSA9IChpbnRWYWx1ZSAtIGludFN0ZXApIC8gbXVsdDtcblxuICAgICAgdGhpcy5wcm9wYWdhdGUodmFsdWUpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIHRoaXMuJG5leHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgY29uc3QgZGVjaW1hbHMgPSB0aGlzLnN0ZXAudG9TdHJpbmcoKS5zcGxpdCgnLicpWzFdO1xuICAgICAgY29uc3QgZXhwID0gZGVjaW1hbHMgPyBkZWNpbWFscy5sZW5ndGggOiAwO1xuICAgICAgY29uc3QgbXVsdCA9IE1hdGgucG93KDEwLCBleHApO1xuXG4gICAgICBjb25zdCBpbnRWYWx1ZSA9IE1hdGguZmxvb3IodGhpcy52YWx1ZSAqIG11bHQgKyAwLjUpO1xuICAgICAgY29uc3QgaW50U3RlcCA9IE1hdGguZmxvb3IodGhpcy5zdGVwICogbXVsdCArIDAuNSk7XG4gICAgICBjb25zdCB2YWx1ZSA9IChpbnRWYWx1ZSArIGludFN0ZXApIC8gbXVsdDtcblxuICAgICAgdGhpcy5wcm9wYWdhdGUodmFsdWUpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIHRoaXMuJG51bWJlci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xuICAgICAgbGV0IHZhbHVlID0gdGhpcy4kbnVtYmVyLnZhbHVlO1xuICAgICAgdmFsdWUgPSB0aGlzLl9pc0ludFN0ZXAgPyBwYXJzZUludCh2YWx1ZSwgMTApIDogcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgICB2YWx1ZSA9IE1hdGgubWluKHRoaXMubWF4LCBNYXRoLm1heCh0aGlzLm1pbiwgdmFsdWUpKTtcblxuICAgICAgdGhpcy5wcm9wYWdhdGUodmFsdWUpO1xuICAgIH0sIGZhbHNlKTtcbiAgfVxuXG4gIHByb3BhZ2F0ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5fdmFsdWUpIHsgcmV0dXJuOyB9XG5cbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuJG51bWJlci52YWx1ZSA9IHZhbHVlO1xuXG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCB0aGlzLl92YWx1ZSk7XG4gIH1cbn1cbiJdfQ==