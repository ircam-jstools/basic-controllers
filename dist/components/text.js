'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseController2 = require('./BaseController');

var _BaseController3 = _interopRequireDefault(_BaseController2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Display a value, Read-only.
 */
var Text = function (_BaseController) {
  _inherits(Text, _BaseController);

  function Text(legend, defaultValue) {
    var readonly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var $container = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var callback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    _classCallCheck(this, Text);

    var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this));

    _this.type = 'text';
    _this.legend = legend;
    _this._readonly = readonly;
    _this._value = defaultValue;

    _this._applyOptionnalParameters($container, callback);
    return _this;
  }

  _createClass(Text, [{
    key: 'render',
    value: function render() {
      var readonly = this._readonly ? 'readonly' : '';
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        <input class="text" type="text" value="' + this._value + '" ' + readonly + ' />\n      </div>\n    ';

      this.$el = _get(Text.prototype.__proto__ || Object.getPrototypeOf(Text.prototype), 'render', this).call(this, this.type);
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
        _this2._executeListeners(_this2._value);
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
}(_BaseController3.default);

exports.default = Text;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRleHQuanMiXSwibmFtZXMiOlsiVGV4dCIsImxlZ2VuZCIsImRlZmF1bHRWYWx1ZSIsInJlYWRvbmx5IiwiJGNvbnRhaW5lciIsImNhbGxiYWNrIiwidHlwZSIsIl9yZWFkb25seSIsIl92YWx1ZSIsIl9hcHBseU9wdGlvbm5hbFBhcmFtZXRlcnMiLCJjb250ZW50IiwiJGVsIiwiaW5uZXJIVE1MIiwiJGlucHV0IiwicXVlcnlTZWxlY3RvciIsImJpbmRFdmVudHMiLCJhZGRFdmVudExpc3RlbmVyIiwidmFsdWUiLCJfZXhlY3V0ZUxpc3RlbmVycyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUFHQTs7O0lBR01BLEk7OztBQUNKLGdCQUFZQyxNQUFaLEVBQW9CQyxZQUFwQixFQUF1RjtBQUFBLFFBQXJEQyxRQUFxRCx1RUFBMUMsSUFBMEM7QUFBQSxRQUFwQ0MsVUFBb0MsdUVBQXZCLElBQXVCO0FBQUEsUUFBakJDLFFBQWlCLHVFQUFOLElBQU07O0FBQUE7O0FBQUE7O0FBR3JGLFVBQUtDLElBQUwsR0FBWSxNQUFaO0FBQ0EsVUFBS0wsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsVUFBS00sU0FBTCxHQUFpQkosUUFBakI7QUFDQSxVQUFLSyxNQUFMLEdBQWNOLFlBQWQ7O0FBRUEsVUFBS08seUJBQUwsQ0FBK0JMLFVBQS9CLEVBQTJDQyxRQUEzQztBQVJxRjtBQVN0Rjs7Ozs2QkFXUTtBQUNQLFVBQU1GLFdBQVcsS0FBS0ksU0FBTCxHQUFpQixVQUFqQixHQUE4QixFQUEvQztBQUNBLFVBQU1HLDRDQUNtQixLQUFLVCxNQUR4QixtR0FHdUMsS0FBS08sTUFINUMsVUFHdURMLFFBSHZELDRCQUFOOztBQU9BLFdBQUtRLEdBQUwsc0dBQXdCLEtBQUtMLElBQTdCO0FBQ0EsV0FBS0ssR0FBTCxDQUFTQyxTQUFULEdBQXFCRixPQUFyQjs7QUFFQSxXQUFLRyxNQUFMLEdBQWMsS0FBS0YsR0FBTCxDQUFTRyxhQUFULENBQXVCLE9BQXZCLENBQWQ7O0FBRUEsV0FBS0MsVUFBTDs7QUFFQSxhQUFPLEtBQUtKLEdBQVo7QUFDRDs7O2lDQUVZO0FBQUE7O0FBQ1gsV0FBS0UsTUFBTCxDQUFZRyxnQkFBWixDQUE2QixPQUE3QixFQUFzQyxZQUFNO0FBQzFDLGVBQUtSLE1BQUwsR0FBYyxPQUFLSyxNQUFMLENBQVlJLEtBQTFCO0FBQ0EsZUFBS0MsaUJBQUwsQ0FBdUIsT0FBS1YsTUFBNUI7QUFDRCxPQUhELEVBR0csS0FISDtBQUlEOzs7d0JBakNXO0FBQ1YsYUFBTyxLQUFLQSxNQUFaO0FBQ0QsSztzQkFFU1MsSyxFQUFPO0FBQ2YsV0FBS0osTUFBTCxDQUFZSSxLQUFaLEdBQW9CQSxLQUFwQjtBQUNBLFdBQUtULE1BQUwsR0FBY1MsS0FBZDtBQUNEOzs7Ozs7a0JBNkJZakIsSSIsImZpbGUiOiJUZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VDb250cm9sbGVyIGZyb20gJy4vQmFzZUNvbnRyb2xsZXInO1xuXG5cbi8qKlxuICogRGlzcGxheSBhIHZhbHVlLCBSZWFkLW9ubHkuXG4gKi9cbmNsYXNzIFRleHQgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgZGVmYXVsdFZhbHVlLCByZWFkb25seSA9IHRydWUsICRjb250YWluZXIgPSBudWxsLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy50eXBlID0gJ3RleHQnO1xuICAgIHRoaXMubGVnZW5kID0gbGVnZW5kO1xuICAgIHRoaXMuX3JlYWRvbmx5ID0gcmVhZG9ubHk7XG4gICAgdGhpcy5fdmFsdWUgPSBkZWZhdWx0VmFsdWU7XG5cbiAgICB0aGlzLl9hcHBseU9wdGlvbm5hbFBhcmFtZXRlcnMoJGNvbnRhaW5lciwgY2FsbGJhY2spO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuJGlucHV0LnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCByZWFkb25seSA9IHRoaXMuX3JlYWRvbmx5ID8gJ3JlYWRvbmx5JyA6ICcnXG4gICAgY29uc3QgY29udGVudCA9IGBcbiAgICAgIDxzcGFuIGNsYXNzPVwibGVnZW5kXCI+JHt0aGlzLmxlZ2VuZH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlclwiPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJ0ZXh0XCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIiR7dGhpcy5fdmFsdWV9XCIgJHtyZWFkb25seX0gLz5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG5cbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcih0aGlzLnR5cGUpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiRpbnB1dCA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy50ZXh0Jyk7XG5cbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoKSA9PiB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHRoaXMuJGlucHV0LnZhbHVlO1xuICAgICAgdGhpcy5fZXhlY3V0ZUxpc3RlbmVycyh0aGlzLl92YWx1ZSk7XG4gICAgfSwgZmFsc2UpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRleHQ7XG4iXX0=