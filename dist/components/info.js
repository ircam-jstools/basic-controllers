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

var Info = (function (_BaseController) {
  _inherits(Info, _BaseController);

  function Info(legend, defaultValue) {
    var $container = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

    _classCallCheck(this, Info);

    _get(Object.getPrototypeOf(Info.prototype), 'constructor', this).call(this);

    this.type = 'info';
    this.legend = legend;
    this._value = defaultValue;

    this._applyOptionnalParameters($container);
  }

  _createClass(Info, [{
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        <input class="text" type="text" value="' + this._value + '" readonly />\n      </div>\n    ';

      this.$el = _get(Object.getPrototypeOf(Info.prototype), 'render', this).call(this, this.type);
      this.$el.innerHTML = content;

      this.$input = this.$el.querySelector('.text');

      return this.$el;
    }
  }, {
    key: 'value',
    get: function get() {
      return this._value;
    },
    set: function set(value) {
      console.log(value);
      this.$input.value = value;
      this._value = value;
    }
  }]);

  return Info;
})(_baseController2['default']);

exports['default'] = Info;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi9jb21wb25lbnRzL2luZm8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs4QkFBMkIsbUJBQW1COzs7Ozs7OztJQU16QixJQUFJO1lBQUosSUFBSTs7QUFDWixXQURRLElBQUksQ0FDWCxNQUFNLEVBQUUsWUFBWSxFQUFxQjtRQUFuQixVQUFVLHlEQUFHLElBQUk7OzBCQURoQyxJQUFJOztBQUVyQiwrQkFGaUIsSUFBSSw2Q0FFYjs7QUFFUixRQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztBQUNuQixRQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixRQUFJLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQzs7QUFFM0IsUUFBSSxDQUFDLHlCQUF5QixDQUFDLFVBQVUsQ0FBQyxDQUFDO0dBQzVDOztlQVRrQixJQUFJOztXQXFCakIsa0JBQUc7QUFDUCxVQUFNLE9BQU8scUNBQ1ksSUFBSSxDQUFDLE1BQU0sbUdBRVMsSUFBSSxDQUFDLE1BQU0sc0NBRXZELENBQUM7O0FBRUYsVUFBSSxDQUFDLEdBQUcsOEJBN0JTLElBQUksd0NBNkJHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuQyxVQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7O0FBRTdCLFVBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRTlDLGFBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztLQUNqQjs7O1NBeEJRLGVBQUc7QUFDVixhQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDcEI7U0FFUSxhQUFDLEtBQUssRUFBRTtBQUNmLGFBQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbkIsVUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQzFCLFVBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0tBQ3JCOzs7U0FuQmtCLElBQUk7OztxQkFBSixJQUFJIiwiZmlsZSI6ImVzNi9jb21wb25lbnRzL2luZm8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZUNvbnRyb2xsZXIgZnJvbSAnLi9iYXNlLWNvbnRyb2xsZXInO1xuXG5cbi8qKlxuICogRGlzcGxheSBhIHZhbHVlLCBSZWFkLW9ubHkuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZm8gZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgZGVmYXVsdFZhbHVlLCAkY29udGFpbmVyID0gbnVsbCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnR5cGUgPSAnaW5mbyc7XG4gICAgdGhpcy5sZWdlbmQgPSBsZWdlbmQ7XG4gICAgdGhpcy5fdmFsdWUgPSBkZWZhdWx0VmFsdWU7XG5cbiAgICB0aGlzLl9hcHBseU9wdGlvbm5hbFBhcmFtZXRlcnMoJGNvbnRhaW5lcik7XG4gIH1cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgY29uc29sZS5sb2codmFsdWUpO1xuICAgIHRoaXMuJGlucHV0LnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjb250ZW50ID0gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJsZWdlbmRcIj4ke3RoaXMubGVnZW5kfTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbm5lci13cmFwcGVyXCI+XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cInRleHRcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiJHt0aGlzLl92YWx1ZX1cIiByZWFkb25seSAvPlxuICAgICAgPC9kaXY+XG4gICAgYDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKHRoaXMudHlwZSk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuJGlucHV0ID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLnRleHQnKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxufSJdfQ==