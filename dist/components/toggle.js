'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseController2 = require('./BaseController');

var _BaseController3 = _interopRequireDefault(_BaseController2);

var _elements = require('../utils/elements');

var elements = _interopRequireWildcard(_elements);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Toggle = function (_BaseController) {
  _inherits(Toggle, _BaseController);

  function Toggle(legend) {
    var active = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var $container = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    _classCallCheck(this, Toggle);

    var _this = _possibleConstructorReturn(this, (Toggle.__proto__ || Object.getPrototypeOf(Toggle)).call(this));

    _this.type = 'toggle';
    _this.legend = legend;
    _this._active = active;

    _get(Toggle.prototype.__proto__ || Object.getPrototypeOf(Toggle.prototype), '_applyOptionnalParameters', _this).call(_this, $container, callback);
    return _this;
  }

  _createClass(Toggle, [{
    key: '_updateBtn',
    value: function _updateBtn() {
      var method = this.active ? 'add' : 'remove';
      this.$toggle.classList[method]('active');
    }
  }, {
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        ' + elements.toggle + '\n      </div>';

      this.$el = _get(Toggle.prototype.__proto__ || Object.getPrototypeOf(Toggle.prototype), 'render', this).call(this, this.type);
      this.$el.classList.add('align-small');
      this.$el.innerHTML = content;

      this.$toggle = this.$el.querySelector('.toggle-element');
      this.bindEvents();
      this.active = this._active; // initialize state

      return this.$el;
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this2 = this;

      this.$toggle.addEventListener('click', function (e) {
        e.preventDefault();

        _this2.active = !_this2.active;
        _this2._executeListeners(_this2._active);
      });
    }
  }, {
    key: 'value',
    set: function set(bool) {
      this.active = bool;
    },
    get: function get() {
      return this._value;
    }

    // alias value

  }, {
    key: 'active',
    set: function set(bool) {
      this._active = bool;
      this._updateBtn();
    },
    get: function get() {
      return this._active;
    }
  }]);

  return Toggle;
}(_BaseController3.default);

exports.default = Toggle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRvZ2dsZS5qcyJdLCJuYW1lcyI6WyJlbGVtZW50cyIsIlRvZ2dsZSIsImxlZ2VuZCIsImFjdGl2ZSIsIiRjb250YWluZXIiLCJjYWxsYmFjayIsInR5cGUiLCJfYWN0aXZlIiwibWV0aG9kIiwiJHRvZ2dsZSIsImNsYXNzTGlzdCIsImNvbnRlbnQiLCJ0b2dnbGUiLCIkZWwiLCJhZGQiLCJpbm5lckhUTUwiLCJxdWVyeVNlbGVjdG9yIiwiYmluZEV2ZW50cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJfZXhlY3V0ZUxpc3RlbmVycyIsImJvb2wiLCJfdmFsdWUiLCJfdXBkYXRlQnRuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7SUFBWUEsUTs7Ozs7Ozs7Ozs7O0lBRU5DLE07OztBQUNKLGtCQUFZQyxNQUFaLEVBQXlFO0FBQUEsUUFBckRDLE1BQXFELHVFQUE1QyxLQUE0QztBQUFBLFFBQXJDQyxVQUFxQyx1RUFBeEIsS0FBd0I7QUFBQSxRQUFqQkMsUUFBaUIsdUVBQU4sSUFBTTs7QUFBQTs7QUFBQTs7QUFHdkUsVUFBS0MsSUFBTCxHQUFZLFFBQVo7QUFDQSxVQUFLSixNQUFMLEdBQWNBLE1BQWQ7QUFDQSxVQUFLSyxPQUFMLEdBQWVKLE1BQWY7O0FBRUEsZ0lBQWdDQyxVQUFoQyxFQUE0Q0MsUUFBNUM7QUFQdUU7QUFReEU7Ozs7aUNBb0JZO0FBQ1gsVUFBSUcsU0FBUyxLQUFLTCxNQUFMLEdBQWMsS0FBZCxHQUFzQixRQUFuQztBQUNBLFdBQUtNLE9BQUwsQ0FBYUMsU0FBYixDQUF1QkYsTUFBdkIsRUFBK0IsUUFBL0I7QUFDRDs7OzZCQUVRO0FBQ1AsVUFBSUcsNENBQ3FCLEtBQUtULE1BRDFCLDREQUdFRixTQUFTWSxNQUhYLG1CQUFKOztBQU1BLFdBQUtDLEdBQUwsMEdBQXdCLEtBQUtQLElBQTdCO0FBQ0EsV0FBS08sR0FBTCxDQUFTSCxTQUFULENBQW1CSSxHQUFuQixDQUF1QixhQUF2QjtBQUNBLFdBQUtELEdBQUwsQ0FBU0UsU0FBVCxHQUFxQkosT0FBckI7O0FBRUEsV0FBS0YsT0FBTCxHQUFlLEtBQUtJLEdBQUwsQ0FBU0csYUFBVCxDQUF1QixpQkFBdkIsQ0FBZjtBQUNBLFdBQUtDLFVBQUw7QUFDQSxXQUFLZCxNQUFMLEdBQWMsS0FBS0ksT0FBbkIsQ0FiTyxDQWFxQjs7QUFFNUIsYUFBTyxLQUFLTSxHQUFaO0FBQ0Q7OztpQ0FFWTtBQUFBOztBQUNYLFdBQUtKLE9BQUwsQ0FBYVMsZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUMsVUFBQ0MsQ0FBRCxFQUFPO0FBQzVDQSxVQUFFQyxjQUFGOztBQUVBLGVBQUtqQixNQUFMLEdBQWMsQ0FBQyxPQUFLQSxNQUFwQjtBQUNBLGVBQUtrQixpQkFBTCxDQUF1QixPQUFLZCxPQUE1QjtBQUNELE9BTEQ7QUFNRDs7O3NCQWhEU2UsSSxFQUFNO0FBQ2QsV0FBS25CLE1BQUwsR0FBY21CLElBQWQ7QUFDRCxLO3dCQUVXO0FBQ1YsYUFBTyxLQUFLQyxNQUFaO0FBQ0Q7O0FBRUQ7Ozs7c0JBQ1dELEksRUFBTTtBQUNmLFdBQUtmLE9BQUwsR0FBZWUsSUFBZjtBQUNBLFdBQUtFLFVBQUw7QUFDRCxLO3dCQUVZO0FBQ1gsYUFBTyxLQUFLakIsT0FBWjtBQUNEOzs7Ozs7a0JBbUNZTixNIiwiZmlsZSI6IlRvZ2dsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlQ29udHJvbGxlciBmcm9tICcuL0Jhc2VDb250cm9sbGVyJztcbmltcG9ydCAqIGFzIGVsZW1lbnRzIGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcblxuY2xhc3MgVG9nZ2xlIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihsZWdlbmQsIGFjdGl2ZSA9IGZhbHNlLCAkY29udGFpbmVyID0gZmFsc2UsIGNhbGxiYWNrID0gbnVsbCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnR5cGUgPSAndG9nZ2xlJztcbiAgICB0aGlzLmxlZ2VuZCA9IGxlZ2VuZDtcbiAgICB0aGlzLl9hY3RpdmUgPSBhY3RpdmU7XG5cbiAgICBzdXBlci5fYXBwbHlPcHRpb25uYWxQYXJhbWV0ZXJzKCRjb250YWluZXIsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHNldCB2YWx1ZShib29sKSB7XG4gICAgdGhpcy5hY3RpdmUgPSBib29sO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIC8vIGFsaWFzIHZhbHVlXG4gIHNldCBhY3RpdmUoYm9vbCkge1xuICAgIHRoaXMuX2FjdGl2ZSA9IGJvb2w7XG4gICAgdGhpcy5fdXBkYXRlQnRuKCk7XG4gIH1cblxuICBnZXQgYWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmU7XG4gIH1cblxuICBfdXBkYXRlQnRuKCkge1xuICAgIHZhciBtZXRob2QgPSB0aGlzLmFjdGl2ZSA/ICdhZGQnIDogJ3JlbW92ZSc7XG4gICAgdGhpcy4kdG9nZ2xlLmNsYXNzTGlzdFttZXRob2RdKCdhY3RpdmUnKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgY29udGVudCA9IGBcbiAgICAgIDxzcGFuIGNsYXNzPVwibGVnZW5kXCI+JHt0aGlzLmxlZ2VuZH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlclwiPlxuICAgICAgICAke2VsZW1lbnRzLnRvZ2dsZX1cbiAgICAgIDwvZGl2PmA7XG5cbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcih0aGlzLnR5cGUpO1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoJ2FsaWduLXNtYWxsJyk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuJHRvZ2dsZSA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy50b2dnbGUtZWxlbWVudCcpO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIHRoaXMuYWN0aXZlID0gdGhpcy5fYWN0aXZlOyAvLyBpbml0aWFsaXplIHN0YXRlXG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHRoaXMuYWN0aXZlID0gIXRoaXMuYWN0aXZlO1xuICAgICAgdGhpcy5fZXhlY3V0ZUxpc3RlbmVycyh0aGlzLl9hY3RpdmUpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRvZ2dsZTtcbiJdfQ==