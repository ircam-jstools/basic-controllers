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

var _styles = require('../utils/styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Title = function (_BaseController) {
  (0, _inherits3.default)(Title, _BaseController);

  function Title(legend) {
    var $container = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    (0, _classCallCheck3.default)(this, Title);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Title).call(this));

    _this.type = 'title';
    _this.legend = legend;

    (0, _get3.default)((0, _getPrototypeOf2.default)(Title.prototype), '_applyOptionnalParameters', _this).call(_this, $container);
    return _this;
  }

  (0, _createClass3.default)(Title, [{
    key: 'render',
    value: function render() {
      var content = '<span class="legend">' + this.legend + '</span>';

      this.$el = (0, _get3.default)((0, _getPrototypeOf2.default)(Title.prototype), 'render', this).call(this, this.type);
      this.$el.innerHTML = content;

      return this.$el;
    }
  }]);
  return Title;
}(_baseController2.default);

exports.default = Title;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRpdGxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztJQUdxQjs7O0FBQ25CLFdBRG1CLEtBQ25CLENBQVksTUFBWixFQUF1QztRQUFuQixtRUFBYSxvQkFBTTt3Q0FEcEIsT0FDb0I7OzZGQURwQixtQkFDb0I7O0FBR3JDLFVBQUssSUFBTCxHQUFZLE9BQVosQ0FIcUM7QUFJckMsVUFBSyxNQUFMLEdBQWMsTUFBZCxDQUpxQzs7QUFNckMscURBUGlCLGtFQU9lLFdBQWhDLENBTnFDOztHQUF2Qzs7NkJBRG1COzs2QkFVVjtBQUNQLFVBQUksb0NBQWtDLEtBQUssTUFBTCxZQUFsQyxDQURHOztBQUdQLFdBQUssR0FBTCxvREFiaUIsNkNBYU8sS0FBSyxJQUFMLENBQXhCLENBSE87QUFJUCxXQUFLLEdBQUwsQ0FBUyxTQUFULEdBQXFCLE9BQXJCLENBSk87O0FBTVAsYUFBTyxLQUFLLEdBQUwsQ0FOQTs7O1NBVlUiLCJmaWxlIjoidGl0bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZUNvbnRyb2xsZXIgZnJvbSAnLi9iYXNlLWNvbnRyb2xsZXInO1xuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi91dGlscy9zdHlsZXMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpdGxlIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihsZWdlbmQsICRjb250YWluZXIgPSBudWxsKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudHlwZSA9ICd0aXRsZSc7XG4gICAgdGhpcy5sZWdlbmQgPSBsZWdlbmQ7XG5cbiAgICBzdXBlci5fYXBwbHlPcHRpb25uYWxQYXJhbWV0ZXJzKCRjb250YWluZXIpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCBjb250ZW50ID0gYDxzcGFuIGNsYXNzPVwibGVnZW5kXCI+JHt0aGlzLmxlZ2VuZH08L3NwYW4+YDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKHRoaXMudHlwZSk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxufVxuXG4iXX0=