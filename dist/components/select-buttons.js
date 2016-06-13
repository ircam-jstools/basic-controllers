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

var _elements = require('../utils/elements');

var elements = _interopRequireWildcard(_elements);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectButtons = function (_BaseController) {
  (0, _inherits3.default)(SelectButtons, _BaseController);

  function SelectButtons(legend, options, defaultValue) {
    var $container = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
    var callback = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];
    (0, _classCallCheck3.default)(this, SelectButtons);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SelectButtons).call(this));

    _this.type = 'select-buttons';
    _this.legend = legend; // non breakable space to keep rendering consistency
    _this.options = options;
    _this._value = defaultValue;
    var currentIndex = _this.options.indexOf(_this._value);
    _this._currentIndex = currentIndex === -1 ? 0 : currentIndex;
    _this._maxIndex = _this.options.length - 1;

    (0, _get3.default)((0, _getPrototypeOf2.default)(SelectButtons.prototype), '_applyOptionnalParameters', _this).call(_this, $container, callback);
    return _this;
  }

  (0, _createClass3.default)(SelectButtons, [{
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        ' + elements.arrowLeft + '\n        ' + this.options.map(function (option, index) {
        return '\n            <a href="#" class="btn" data-index="' + index + '" data-value="' + option + '">\n              ' + option + '\n            </a>';
      }).join('') + '\n        ' + elements.arrowRight + '\n      </div>\n    ';

      this.$el = (0, _get3.default)((0, _getPrototypeOf2.default)(SelectButtons.prototype), 'render', this).call(this, this.type);
      this.$el.innerHTML = content;

      this.$prev = this.$el.querySelector('.arrow-left');
      this.$next = this.$el.querySelector('.arrow-right');
      this.$btns = (0, _from2.default)(this.$el.querySelectorAll('.btn'));
      this._highlightBtn(this._currentIndex);

      this.bindEvents();
      return this.$el;
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this2 = this;

      this.$prev.addEventListener('click', function () {
        var index = _this2._currentIndex - 1;
        _this2.propagate(index);
      });

      this.$next.addEventListener('click', function () {
        var index = _this2._currentIndex + 1;
        _this2.propagate(index);
      });

      this.$btns.forEach(function ($btn, index) {
        $btn.addEventListener('click', function (e) {
          e.preventDefault();
          _this2.propagate(index);
        });
      });
    }
  }, {
    key: 'propagate',
    value: function propagate(index) {
      if (index < 0 || index > this._maxIndex) {
        return;
      }

      this._currentIndex = index;
      this._value = this.options[index];
      this._highlightBtn(this._currentIndex);

      this.emit('change', this._value);
    }
  }, {
    key: '_highlightBtn',
    value: function _highlightBtn(activeIndex) {
      this.$btns.forEach(function ($btn, index) {
        $btn.classList.remove('active');

        if (activeIndex === index) {
          $btn.classList.add('active');
        }
      });
    }
  }, {
    key: 'value',
    get: function get() {
      return this._value;
    },
    set: function set(value) {
      var index = this.options.indexOf(value);

      if (index !== -1) {
        this._value = value;
        this._currentIndex = index;
        this._highlightBtn(this._currentIndex);
      }
    }
  }]);
  return SelectButtons;
}(_baseController2.default);

exports.default = SelectButtons;
//# sourceMappingURL=data:application/json;base64,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Qzs7QUFFQSxXQUFLLGFBQUwsR0FBcUIsS0FBckIsQ0FIZTtBQUlmLFdBQUssTUFBTCxHQUFjLEtBQUssT0FBTCxDQUFhLEtBQWIsQ0FBZCxDQUplO0FBS2YsV0FBSyxhQUFMLENBQW1CLEtBQUssYUFBTCxDQUFuQixDQUxlOztBQU9mLFdBQUssSUFBTCxDQUFVLFFBQVYsRUFBb0IsS0FBSyxNQUFMLENBQXBCLENBUGU7Ozs7a0NBVUgsYUFBYTtBQUN6QixXQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLFVBQUMsSUFBRCxFQUFPLEtBQVAsRUFBaUI7QUFDbEMsYUFBSyxTQUFMLENBQWUsTUFBZixDQUFzQixRQUF0QixFQURrQzs7QUFHbEMsWUFBSSxnQkFBZ0IsS0FBaEIsRUFBdUI7QUFDekIsZUFBSyxTQUFMLENBQWUsR0FBZixDQUFtQixRQUFuQixFQUR5QjtTQUEzQjtPQUhpQixDQUFuQixDQUR5Qjs7Ozt3QkF0RWY7QUFDVixhQUFPLEtBQUssTUFBTCxDQURHOztzQkFJRixPQUFPO0FBQ2YsVUFBTSxRQUFRLEtBQUssT0FBTCxDQUFhLE9BQWIsQ0FBcUIsS0FBckIsQ0FBUixDQURTOztBQUdmLFVBQUksVUFBVSxDQUFDLENBQUQsRUFBSTtBQUNoQixhQUFLLE1BQUwsR0FBYyxLQUFkLENBRGdCO0FBRWhCLGFBQUssYUFBTCxHQUFxQixLQUFyQixDQUZnQjtBQUdoQixhQUFLLGFBQUwsQ0FBbUIsS0FBSyxhQUFMLENBQW5CLENBSGdCO09BQWxCOzs7U0F0QmlCIiwiZmlsZSI6InNlbGVjdC1idXR0b25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VDb250cm9sbGVyIGZyb20gJy4vYmFzZS1jb250cm9sbGVyJztcbmltcG9ydCAqIGFzIGVsZW1lbnRzIGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0QnV0dG9ucyBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IobGVnZW5kLCBvcHRpb25zLCBkZWZhdWx0VmFsdWUsICRjb250YWluZXIgPSBudWxsLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy50eXBlID0gJ3NlbGVjdC1idXR0b25zJztcbiAgICB0aGlzLmxlZ2VuZCA9IGxlZ2VuZDsgLy8gbm9uIGJyZWFrYWJsZSBzcGFjZSB0byBrZWVwIHJlbmRlcmluZyBjb25zaXN0ZW5jeVxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5fdmFsdWUgPSBkZWZhdWx0VmFsdWU7XG4gICAgY29uc3QgY3VycmVudEluZGV4ID0gdGhpcy5vcHRpb25zLmluZGV4T2YodGhpcy5fdmFsdWUpO1xuICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IGN1cnJlbnRJbmRleCA9PT0gLTEgP8KgMCA6IGN1cnJlbnRJbmRleDtcbiAgICB0aGlzLl9tYXhJbmRleCA9IHRoaXMub3B0aW9ucy5sZW5ndGggLSAxO1xuXG4gICAgc3VwZXIuX2FwcGx5T3B0aW9ubmFsUGFyYW1ldGVycygkY29udGFpbmVyLCBjYWxsYmFjayk7XG4gIH1cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLm9wdGlvbnMuaW5kZXhPZih2YWx1ZSk7XG5cbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5fY3VycmVudEluZGV4ID0gaW5kZXg7XG4gICAgICB0aGlzLl9oaWdobGlnaHRCdG4odGhpcy5fY3VycmVudEluZGV4KTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgY29udGVudCA9IGBcbiAgICAgIDxzcGFuIGNsYXNzPVwibGVnZW5kXCI+JHt0aGlzLmxlZ2VuZH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlclwiPlxuICAgICAgICAke2VsZW1lbnRzLmFycm93TGVmdH1cbiAgICAgICAgJHt0aGlzLm9wdGlvbnMubWFwKChvcHRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidG5cIiBkYXRhLWluZGV4PVwiJHtpbmRleH1cIiBkYXRhLXZhbHVlPVwiJHtvcHRpb259XCI+XG4gICAgICAgICAgICAgICR7b3B0aW9ufVxuICAgICAgICAgICAgPC9hPmA7XG4gICAgICAgIH0pLmpvaW4oJycpfVxuICAgICAgICAke2VsZW1lbnRzLmFycm93UmlnaHR9XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIodGhpcy50eXBlKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gICAgdGhpcy4kcHJldiA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy1sZWZ0Jyk7XG4gICAgdGhpcy4kbmV4dCA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy1yaWdodCcpO1xuICAgIHRoaXMuJGJ0bnMgPSBBcnJheS5mcm9tKHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4nKSk7XG4gICAgdGhpcy5faGlnaGxpZ2h0QnRuKHRoaXMuX2N1cnJlbnRJbmRleCk7XG5cbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJHByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2N1cnJlbnRJbmRleCAtIDE7XG4gICAgICB0aGlzLnByb3BhZ2F0ZShpbmRleCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLiRuZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9jdXJyZW50SW5kZXggKyAxO1xuICAgICAgdGhpcy5wcm9wYWdhdGUoaW5kZXgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy4kYnRucy5mb3JFYWNoKCgkYnRuLCBpbmRleCkgPT4ge1xuICAgICAgJGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5wcm9wYWdhdGUoaW5kZXgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcm9wYWdhdGUoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gdGhpcy5fbWF4SW5kZXgpIHsgcmV0dXJuOyB9XG5cbiAgICB0aGlzLl9jdXJyZW50SW5kZXggPSBpbmRleDtcbiAgICB0aGlzLl92YWx1ZSA9IHRoaXMub3B0aW9uc1tpbmRleF07XG4gICAgdGhpcy5faGlnaGxpZ2h0QnRuKHRoaXMuX2N1cnJlbnRJbmRleCk7XG5cbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIHRoaXMuX3ZhbHVlKTtcbiAgfVxuXG4gIF9oaWdobGlnaHRCdG4oYWN0aXZlSW5kZXgpIHtcbiAgICB0aGlzLiRidG5zLmZvckVhY2goKCRidG4sIGluZGV4KSA9PiB7XG4gICAgICAkYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXG4gICAgICBpZiAoYWN0aXZlSW5kZXggPT09IGluZGV4KSB7XG4gICAgICAgICRidG4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==