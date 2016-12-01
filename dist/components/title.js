'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseController2 = require('./BaseController');

var _BaseController3 = _interopRequireDefault(_BaseController2);

var _styles = require('../utils/styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Title = function (_BaseController) {
  _inherits(Title, _BaseController);

  function Title(legend) {
    var $container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, Title);

    var _this = _possibleConstructorReturn(this, (Title.__proto__ || Object.getPrototypeOf(Title)).call(this));

    _this.type = 'title';
    _this.legend = legend;

    _get(Title.prototype.__proto__ || Object.getPrototypeOf(Title.prototype), '_applyOptionnalParameters', _this).call(_this, $container);
    return _this;
  }

  _createClass(Title, [{
    key: 'render',
    value: function render() {
      var content = '<span class="legend">' + this.legend + '</span>';

      this.$el = _get(Title.prototype.__proto__ || Object.getPrototypeOf(Title.prototype), 'render', this).call(this, this.type);
      this.$el.innerHTML = content;

      return this.$el;
    }
  }]);

  return Title;
}(_BaseController3.default);

exports.default = Title;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRpdGxlLmpzIl0sIm5hbWVzIjpbIlRpdGxlIiwibGVnZW5kIiwiJGNvbnRhaW5lciIsInR5cGUiLCJjb250ZW50IiwiJGVsIiwiaW5uZXJIVE1MIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU1BLEs7OztBQUNKLGlCQUFZQyxNQUFaLEVBQXVDO0FBQUEsUUFBbkJDLFVBQW1CLHVFQUFOLElBQU07O0FBQUE7O0FBQUE7O0FBR3JDLFVBQUtDLElBQUwsR0FBWSxPQUFaO0FBQ0EsVUFBS0YsTUFBTCxHQUFjQSxNQUFkOztBQUVBLDhIQUFnQ0MsVUFBaEM7QUFOcUM7QUFPdEM7Ozs7NkJBRVE7QUFDUCxVQUFJRSxvQ0FBa0MsS0FBS0gsTUFBdkMsWUFBSjs7QUFFQSxXQUFLSSxHQUFMLHdHQUF3QixLQUFLRixJQUE3QjtBQUNBLFdBQUtFLEdBQUwsQ0FBU0MsU0FBVCxHQUFxQkYsT0FBckI7O0FBRUEsYUFBTyxLQUFLQyxHQUFaO0FBQ0Q7Ozs7OztrQkFHWUwsSyIsImZpbGUiOiJUaXRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlQ29udHJvbGxlciBmcm9tICcuL0Jhc2VDb250cm9sbGVyJztcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi4vdXRpbHMvc3R5bGVzJztcblxuY2xhc3MgVGl0bGUgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgJGNvbnRhaW5lciA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy50eXBlID0gJ3RpdGxlJztcbiAgICB0aGlzLmxlZ2VuZCA9IGxlZ2VuZDtcblxuICAgIHN1cGVyLl9hcHBseU9wdGlvbm5hbFBhcmFtZXRlcnMoJGNvbnRhaW5lcik7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBgPHNwYW4gY2xhc3M9XCJsZWdlbmRcIj4ke3RoaXMubGVnZW5kfTwvc3Bhbj5gO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIodGhpcy50eXBlKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRpdGxlO1xuIl19