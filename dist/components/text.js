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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _baseController = require('./base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Display a value, Read-only.
 */

var Text = function (_BaseController) {
  (0, _inherits3.default)(Text, _BaseController);

  function Text(legend, defaultValue) {
    var readonly = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
    var $container = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
    var callback = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];
    (0, _classCallCheck3.default)(this, Text);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Text).call(this));

    _this.type = 'text';
    _this.legend = legend;
    _this._readonly = readonly;
    _this._value = defaultValue;

    _this._applyOptionnalParameters($container, callback);
    return _this;
  }

  (0, _createClass3.default)(Text, [{
    key: 'render',
    value: function render() {
      var readonly = this._readonly ? 'readonly' : '';
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        <input class="text" type="text" value="' + this._value + '" ' + readonly + ' />\n      </div>\n    ';

      this.$el = (0, _get3.default)((0, _getPrototypeOf2.default)(Text.prototype), 'render', this).call(this, this.type);
      this.$el.innerHTML = content;

      this.$input = this.$el.querySelector('.text');

      this.bindEvents();

      return this.$el;
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this2 = this;

      this.$input.addEventListener('keyup', function () {
        _this2._value = _this2.$input.value;
        _this2.emit('change', _this2._value);
      }, false);
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
}(_baseController2.default);

exports.default = Text;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7SUFNcUI7OztBQUNuQixXQURtQixJQUNuQixDQUFZLE1BQVosRUFBb0IsWUFBcEIsRUFBdUY7UUFBckQsaUVBQVcsb0JBQTBDO1FBQXBDLG1FQUFhLG9CQUF1QjtRQUFqQixpRUFBVyxvQkFBTTt3Q0FEcEUsTUFDb0U7OzZGQURwRSxrQkFDb0U7O0FBR3JGLFVBQUssSUFBTCxHQUFZLE1BQVosQ0FIcUY7QUFJckYsVUFBSyxNQUFMLEdBQWMsTUFBZCxDQUpxRjtBQUtyRixVQUFLLFNBQUwsR0FBaUIsUUFBakIsQ0FMcUY7QUFNckYsVUFBSyxNQUFMLEdBQWMsWUFBZCxDQU5xRjs7QUFRckYsVUFBSyx5QkFBTCxDQUErQixVQUEvQixFQUEyQyxRQUEzQyxFQVJxRjs7R0FBdkY7OzZCQURtQjs7NkJBcUJWO0FBQ1AsVUFBTSxXQUFXLEtBQUssU0FBTCxHQUFpQixVQUFqQixHQUE4QixFQUE5QixDQURWO0FBRVAsVUFBTSw0Q0FDbUIsS0FBSyxNQUFMLG1HQUVvQixLQUFLLE1BQUwsVUFBZ0Isb0NBSHZELENBRkM7O0FBU1AsV0FBSyxHQUFMLG9EQTlCaUIsNENBOEJPLEtBQUssSUFBTCxDQUF4QixDQVRPO0FBVVAsV0FBSyxHQUFMLENBQVMsU0FBVCxHQUFxQixPQUFyQixDQVZPOztBQVlQLFdBQUssTUFBTCxHQUFjLEtBQUssR0FBTCxDQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBZCxDQVpPOztBQWNQLFdBQUssVUFBTCxHQWRPOztBQWdCUCxhQUFPLEtBQUssR0FBTCxDQWhCQTs7OztpQ0FtQkk7OztBQUNYLFdBQUssTUFBTCxDQUFZLGdCQUFaLENBQTZCLE9BQTdCLEVBQXNDLFlBQU07QUFDMUMsZUFBSyxNQUFMLEdBQWMsT0FBSyxNQUFMLENBQVksS0FBWixDQUQ0QjtBQUUxQyxlQUFLLElBQUwsQ0FBVSxRQUFWLEVBQW9CLE9BQUssTUFBTCxDQUFwQixDQUYwQztPQUFOLEVBR25DLEtBSEgsRUFEVzs7Ozt3QkE1QkQ7QUFDVixhQUFPLEtBQUssTUFBTCxDQURHOztzQkFJRixPQUFPO0FBQ2YsV0FBSyxNQUFMLENBQVksS0FBWixHQUFvQixLQUFwQixDQURlO0FBRWYsV0FBSyxNQUFMLEdBQWMsS0FBZCxDQUZlOzs7U0FoQkUiLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlQ29udHJvbGxlciBmcm9tICcuL2Jhc2UtY29udHJvbGxlcic7XG5cblxuLyoqXG4gKiBEaXNwbGF5IGEgdmFsdWUsIFJlYWQtb25seS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IobGVnZW5kLCBkZWZhdWx0VmFsdWUsIHJlYWRvbmx5ID0gdHJ1ZSwgJGNvbnRhaW5lciA9IG51bGwsIGNhbGxiYWNrID0gbnVsbCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnR5cGUgPSAndGV4dCc7XG4gICAgdGhpcy5sZWdlbmQgPSBsZWdlbmQ7XG4gICAgdGhpcy5fcmVhZG9ubHkgPSByZWFkb25seTtcbiAgICB0aGlzLl92YWx1ZSA9IGRlZmF1bHRWYWx1ZTtcblxuICAgIHRoaXMuX2FwcGx5T3B0aW9ubmFsUGFyYW1ldGVycygkY29udGFpbmVyLCBjYWxsYmFjayk7XG4gIH1cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy4kaW5wdXQudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHJlYWRvbmx5ID0gdGhpcy5fcmVhZG9ubHkgPyAncmVhZG9ubHknIDogJydcbiAgICBjb25zdCBjb250ZW50ID0gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJsZWdlbmRcIj4ke3RoaXMubGVnZW5kfTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbm5lci13cmFwcGVyXCI+XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cInRleHRcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiJHt0aGlzLl92YWx1ZX1cIiAke3JlYWRvbmx5fSAvPlxuICAgICAgPC9kaXY+XG4gICAgYDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKHRoaXMudHlwZSk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuJGlucHV0ID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLnRleHQnKTtcblxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLiRpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsICgpID0+IHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdGhpcy4kaW5wdXQudmFsdWU7XG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIHRoaXMuX3ZhbHVlKTtcbiAgICB9LCBmYWxzZSk7XG4gIH1cbn1cbiJdfQ==