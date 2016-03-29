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

var Toggle = function (_BaseController) {
  (0, _inherits3.default)(Toggle, _BaseController);

  function Toggle(legend) {
    var active = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
    var $container = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
    var callback = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
    (0, _classCallCheck3.default)(this, Toggle);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Toggle).call(this));

    _this.type = 'toggle';
    _this.legend = legend;
    _this._active = active;

    (0, _get3.default)((0, _getPrototypeOf2.default)(Toggle.prototype), '_applyOptionnalParameters', _this).call(_this, $container, callback);
    return _this;
  }

  (0, _createClass3.default)(Toggle, [{
    key: '_updateBtn',
    value: function _updateBtn() {
      var method = this.active ? 'add' : 'remove';
      this.$toggle.classList[method]('active');
    }
  }, {
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        ' + elements.toggle + '\n      </div>';

      this.$el = (0, _get3.default)((0, _getPrototypeOf2.default)(Toggle.prototype), 'render', this).call(this, this.type);
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
        _this2.emit('change', _this2.active);
      });
    }
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
}(_baseController2.default);

exports.default = Toggle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvZ2dsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztJQUFZOzs7Ozs7SUFFUzs7O0FBQ25CLFdBRG1CLE1BQ25CLENBQVksTUFBWixFQUF5RTtRQUFyRCwrREFBUyxxQkFBNEM7UUFBckMsbUVBQWEscUJBQXdCO1FBQWpCLGlFQUFXLG9CQUFNO3dDQUR0RCxRQUNzRDs7NkZBRHRELG9CQUNzRDs7QUFHdkUsVUFBSyxJQUFMLEdBQVksUUFBWixDQUh1RTtBQUl2RSxVQUFLLE1BQUwsR0FBYyxNQUFkLENBSnVFO0FBS3ZFLFVBQUssT0FBTCxHQUFlLE1BQWYsQ0FMdUU7O0FBT3ZFLHFEQVJpQixtRUFRZSxZQUFZLFNBQTVDLENBUHVFOztHQUF6RTs7NkJBRG1COztpQ0FrQk47QUFDWCxVQUFJLFNBQVMsS0FBSyxNQUFMLEdBQWMsS0FBZCxHQUFzQixRQUF0QixDQURGO0FBRVgsV0FBSyxPQUFMLENBQWEsU0FBYixDQUF1QixNQUF2QixFQUErQixRQUEvQixFQUZXOzs7OzZCQUtKO0FBQ1AsVUFBSSw0Q0FDcUIsS0FBSyxNQUFMLDREQUVuQixTQUFTLE1BQVQsbUJBSEYsQ0FERzs7QUFPUCxXQUFLLEdBQUwsb0RBOUJpQiw4Q0E4Qk8sS0FBSyxJQUFMLENBQXhCLENBUE87QUFRUCxXQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLEdBQW5CLENBQXVCLGFBQXZCLEVBUk87QUFTUCxXQUFLLEdBQUwsQ0FBUyxTQUFULEdBQXFCLE9BQXJCLENBVE87O0FBV1AsV0FBSyxPQUFMLEdBQWUsS0FBSyxHQUFMLENBQVMsYUFBVCxDQUF1QixpQkFBdkIsQ0FBZixDQVhPO0FBWVAsV0FBSyxVQUFMLEdBWk87QUFhUCxXQUFLLE1BQUwsR0FBYyxLQUFLLE9BQUw7O0FBYlAsYUFlQSxLQUFLLEdBQUwsQ0FmQTs7OztpQ0FrQkk7OztBQUNYLFdBQUssT0FBTCxDQUFhLGdCQUFiLENBQThCLE9BQTlCLEVBQXVDLFVBQUMsQ0FBRCxFQUFPO0FBQzVDLFVBQUUsY0FBRixHQUQ0QztBQUU1QyxlQUFLLE1BQUwsR0FBYyxDQUFDLE9BQUssTUFBTCxDQUY2QjtBQUc1QyxlQUFLLElBQUwsQ0FBVSxRQUFWLEVBQW9CLE9BQUssTUFBTCxDQUFwQixDQUg0QztPQUFQLENBQXZDLENBRFc7Ozs7c0JBOUJGLE1BQU07QUFDZixXQUFLLE9BQUwsR0FBZSxJQUFmLENBRGU7QUFFZixXQUFLLFVBQUwsR0FGZTs7d0JBS0o7QUFBRSxhQUFPLEtBQUssT0FBTCxDQUFUOzs7U0FoQk0iLCJmaWxlIjoidG9nZ2xlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VDb250cm9sbGVyIGZyb20gJy4vYmFzZS1jb250cm9sbGVyJztcbmltcG9ydCAqIGFzIGVsZW1lbnRzIGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9nZ2xlIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihsZWdlbmQsIGFjdGl2ZSA9IGZhbHNlLCAkY29udGFpbmVyID0gZmFsc2UsIGNhbGxiYWNrID0gbnVsbCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnR5cGUgPSAndG9nZ2xlJztcbiAgICB0aGlzLmxlZ2VuZCA9IGxlZ2VuZDtcbiAgICB0aGlzLl9hY3RpdmUgPSBhY3RpdmU7XG5cbiAgICBzdXBlci5fYXBwbHlPcHRpb25uYWxQYXJhbWV0ZXJzKCRjb250YWluZXIsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHNldCBhY3RpdmUoYm9vbCkge1xuICAgIHRoaXMuX2FjdGl2ZSA9IGJvb2w7XG4gICAgdGhpcy5fdXBkYXRlQnRuKCk7XG4gIH1cblxuICBnZXQgYWN0aXZlKCkgeyByZXR1cm4gdGhpcy5fYWN0aXZlOyB9XG5cbiAgX3VwZGF0ZUJ0bigpIHtcbiAgICB2YXIgbWV0aG9kID0gdGhpcy5hY3RpdmUgPyAnYWRkJyA6ICdyZW1vdmUnO1xuICAgIHRoaXMuJHRvZ2dsZS5jbGFzc0xpc3RbbWV0aG9kXSgnYWN0aXZlJyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBgXG4gICAgICA8c3BhbiBjbGFzcz1cImxlZ2VuZFwiPiR7dGhpcy5sZWdlbmR9PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImlubmVyLXdyYXBwZXJcIj5cbiAgICAgICAgJHtlbGVtZW50cy50b2dnbGV9XG4gICAgICA8L2Rpdj5gO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIodGhpcy50eXBlKTtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKCdhbGlnbi1zbWFsbCcpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiR0b2dnbGUgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcudG9nZ2xlLWVsZW1lbnQnKTtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB0aGlzLmFjdGl2ZSA9IHRoaXMuX2FjdGl2ZTsgLy8gaW5pdGlhbGl6ZSBzdGF0ZVxuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLiR0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5hY3RpdmUgPSAhdGhpcy5hY3RpdmU7XG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIHRoaXMuYWN0aXZlKTtcbiAgICB9KTtcbiAgfVxufVxuIl19