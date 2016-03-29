'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

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

var Buttons = function (_BaseController) {
  (0, _inherits3.default)(Buttons, _BaseController);

  function Buttons(legend, labels) {
    var $container = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    var callback = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
    (0, _classCallCheck3.default)(this, Buttons);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Buttons).call(this));

    _this.type = 'buttons';
    _this.legend = legend || '&nbsp'; // non breakable space to keep rendering consistency
    _this.labels = labels;
    _this._index = null;

    (0, _get3.default)((0, _getPrototypeOf2.default)(Buttons.prototype), '_applyOptionnalParameters', _this).call(_this, $container, callback);
    return _this;
  }

  (0, _createClass3.default)(Buttons, [{
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        ' + this.labels.map(function (label, index) {
        return '\n            <a href="#" class="btn">\n              ' + label + '\n            </a>';
      }).join('') + '\n      </div>';

      this.$el = (0, _get3.default)((0, _getPrototypeOf2.default)(Buttons.prototype), 'render', this).call(this, this.type);
      this.$el.innerHTML = content;

      this.$buttons = (0, _from2.default)(this.$el.querySelectorAll('.btn'));
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
          _this2.emit('change', label);
          e.preventDefault();
        });
      });
    }
  }, {
    key: 'value',
    set: function set(value) {},
    get: function get() {}
  }]);
  return Buttons;
}(_baseController2.default);

exports.default = Buttons;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJ1dHRvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7SUFFcUI7OztBQUNuQixXQURtQixPQUNuQixDQUFZLE1BQVosRUFBb0IsTUFBcEIsRUFBZ0U7UUFBcEMsbUVBQWEsb0JBQXVCO1FBQWpCLGlFQUFXLG9CQUFNO3dDQUQ3QyxTQUM2Qzs7NkZBRDdDLHFCQUM2Qzs7QUFHOUQsVUFBSyxJQUFMLEdBQVksU0FBWixDQUg4RDtBQUk5RCxVQUFLLE1BQUwsR0FBYyxVQUFVLE9BQVY7QUFKZ0QsU0FLOUQsQ0FBSyxNQUFMLEdBQWMsTUFBZCxDQUw4RDtBQU05RCxVQUFLLE1BQUwsR0FBYyxJQUFkLENBTjhEOztBQVE5RCxxREFUaUIsb0VBU2UsWUFBWSxTQUE1QyxDQVI4RDs7R0FBaEU7OzZCQURtQjs7NkJBWVY7QUFDUCxVQUFJLDRDQUNxQixLQUFLLE1BQUwsNERBRW5CLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsVUFBQyxLQUFELEVBQVEsS0FBUixFQUFrQjtBQUNsQywwRUFFTSw0QkFGTixDQURrQztPQUFsQixDQUFoQixDQUtDLElBTEQsQ0FLTSxFQUxOLG9CQUhGLENBREc7O0FBWVAsV0FBSyxHQUFMLG9EQXhCaUIsK0NBd0JPLEtBQUssSUFBTCxDQUF4QixDQVpPO0FBYVAsV0FBSyxHQUFMLENBQVMsU0FBVCxHQUFxQixPQUFyQixDQWJPOztBQWVQLFdBQUssUUFBTCxHQUFnQixvQkFBVyxLQUFLLEdBQUwsQ0FBUyxnQkFBVCxDQUEwQixNQUExQixDQUFYLENBQWhCLENBZk87QUFnQlAsV0FBSyxVQUFMLEdBaEJPOztBQWtCUCxhQUFPLEtBQUssR0FBTCxDQWxCQTs7OztpQ0E2Qkk7OztBQUNYLFdBQUssUUFBTCxDQUFjLE9BQWQsQ0FBc0IsVUFBQyxJQUFELEVBQU8sS0FBUCxFQUFpQjtBQUNyQyxZQUFNLFFBQVEsT0FBSyxNQUFMLENBQVksS0FBWixDQUFSLENBRCtCOztBQUdyQyxhQUFLLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCLFVBQUMsQ0FBRCxFQUFPO0FBQ3BDLGlCQUFLLElBQUwsQ0FBVSxRQUFWLEVBQW9CLEtBQXBCLEVBRG9DO0FBRXBDLFlBQUUsY0FBRixHQUZvQztTQUFQLENBQS9CLENBSHFDO09BQWpCLENBQXRCLENBRFc7Ozs7c0JBUkgsT0FBTzt3QkFJTDs7U0FyQ08iLCJmaWxlIjoiYnV0dG9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlQ29udHJvbGxlciBmcm9tICcuL2Jhc2UtY29udHJvbGxlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1dHRvbnMgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgbGFiZWxzLCAkY29udGFpbmVyID0gbnVsbCwgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudHlwZSA9ICdidXR0b25zJztcbiAgICB0aGlzLmxlZ2VuZCA9IGxlZ2VuZCB8fMKgJyZuYnNwJzsgLy8gbm9uIGJyZWFrYWJsZSBzcGFjZSB0byBrZWVwIHJlbmRlcmluZyBjb25zaXN0ZW5jeVxuICAgIHRoaXMubGFiZWxzID0gbGFiZWxzO1xuICAgIHRoaXMuX2luZGV4ID0gbnVsbDtcblxuICAgIHN1cGVyLl9hcHBseU9wdGlvbm5hbFBhcmFtZXRlcnMoJGNvbnRhaW5lciwgY2FsbGJhY2spO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCBjb250ZW50ID0gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJsZWdlbmRcIj4ke3RoaXMubGVnZW5kfTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbm5lci13cmFwcGVyXCI+XG4gICAgICAgICR7dGhpcy5sYWJlbHMubWFwKChsYWJlbCwgaW5kZXgpID0+IHtcbiAgICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cImJ0blwiPlxuICAgICAgICAgICAgICAke2xhYmVsfVxuICAgICAgICAgICAgPC9hPmA7XG4gICAgICAgIH0pLmpvaW4oJycpfVxuICAgICAgPC9kaXY+YDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKHRoaXMudHlwZSk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuJGJ1dHRvbnMgPSBBcnJheS5mcm9tKHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4nKSk7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWUpIHtcblxuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuXG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJGJ1dHRvbnMuZm9yRWFjaCgoJGJ0biwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5sYWJlbHNbaW5kZXhdO1xuXG4gICAgICAkYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCBsYWJlbCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=