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

/**
 * Display a value, Read-only.
 */

var Text = (function (_BaseController) {
  _inherits(Text, _BaseController);

  function Text(legend, defaultValue) {
    var readonly = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
    var $container = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
    var callback = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];

    _classCallCheck(this, Text);

    _get(Object.getPrototypeOf(Text.prototype), 'constructor', this).call(this);

    this.type = 'info';
    this.legend = legend;
    this['this']._value = defaultValue;

    this._applyOptionnalParameters($container);
  }

  _createClass(Text, [{
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        <input class="text" type="text" value="' + this._value + '" readonly />\n      </div>\n    ';

      this.$el = _get(Object.getPrototypeOf(Text.prototype), 'render', this).call(this, this.type);
      this.$el.innerHTML = content;

      this.$input = this.$el.querySelector('.text');

      this.bindEvents;

      return this.$el;
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
})(_baseController2['default']);

exports['default'] = Text;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi9jb21wb25lbnRzL2luZm8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs4QkFBMkIsbUJBQW1COzs7Ozs7OztJQU16QixJQUFJO1lBQUosSUFBSTs7QUFDWixXQURRLElBQUksQ0FDWCxNQUFNLEVBQUUsWUFBWSxFQUF1RDtRQUFyRCxRQUFRLHlEQUFHLElBQUk7UUFBRSxVQUFVLHlEQUFHLElBQUk7UUFBRSxRQUFRLHlEQUFHLElBQUk7OzBCQURsRSxJQUFJOztBQUVyQiwrQkFGaUIsSUFBSSw2Q0FFYjs7QUFFUixRQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztBQUNuQixRQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixRQUFJLFFBQ0EsQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDOztBQUUzQixRQUFJLENBQUMseUJBQXlCLENBQUMsVUFBVSxDQUFDLENBQUM7R0FDNUM7O2VBVmtCLElBQUk7O1dBcUJqQixrQkFBRztBQUNQLFVBQU0sT0FBTyxxQ0FDWSxJQUFJLENBQUMsTUFBTSxtR0FFUyxJQUFJLENBQUMsTUFBTSxzQ0FFdkQsQ0FBQzs7QUFFRixVQUFJLENBQUMsR0FBRyw4QkE3QlMsSUFBSSx3Q0E2QkcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25DLFVBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQzs7QUFFN0IsVUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFOUMsVUFBSSxDQUFDLFVBQVUsQ0FBQTs7QUFFZixhQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7S0FDakI7OztTQXpCUSxlQUFHO0FBQ1YsYUFBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0tBQ3BCO1NBRVEsYUFBQyxLQUFLLEVBQUU7QUFDZixVQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDMUIsVUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7S0FDckI7OztTQW5Ca0IsSUFBSTs7O3FCQUFKLElBQUkiLCJmaWxlIjoiZXM2L2NvbXBvbmVudHMvaW5mby5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlQ29udHJvbGxlciBmcm9tICcuL2Jhc2UtY29udHJvbGxlcic7XG5cblxuLyoqXG4gKiBEaXNwbGF5IGEgdmFsdWUsIFJlYWQtb25seS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IobGVnZW5kLCBkZWZhdWx0VmFsdWUsIHJlYWRvbmx5ID0gdHJ1ZSwgJGNvbnRhaW5lciA9IG51bGwsIGNhbGxiYWNrID0gbnVsbCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnR5cGUgPSAnaW5mbyc7XG4gICAgdGhpcy5sZWdlbmQgPSBsZWdlbmQ7XG4gICAgdGhpcy5cbiAgICB0aGlzLl92YWx1ZSA9IGRlZmF1bHRWYWx1ZTtcblxuICAgIHRoaXMuX2FwcGx5T3B0aW9ubmFsUGFyYW1ldGVycygkY29udGFpbmVyKTtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLiRpbnB1dC52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgY29udGVudCA9IGBcbiAgICAgIDxzcGFuIGNsYXNzPVwibGVnZW5kXCI+JHt0aGlzLmxlZ2VuZH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlclwiPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJ0ZXh0XCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIiR7dGhpcy5fdmFsdWV9XCIgcmVhZG9ubHkgLz5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG5cbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcih0aGlzLnR5cGUpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiRpbnB1dCA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy50ZXh0Jyk7XG5cbiAgICB0aGlzLmJpbmRFdmVudHNcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxufVxuIl19