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

var SelectList = function (_BaseController) {
  (0, _inherits3.default)(SelectList, _BaseController);

  function SelectList(legend, options, defaultValue) {
    var $container = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
    var callback = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];
    (0, _classCallCheck3.default)(this, SelectList);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SelectList).call(this));

    _this.type = 'select-list';
    _this.legend = legend;
    _this.options = options;
    _this._value = defaultValue;
    var currentIndex = _this.options.indexOf(_this._value);
    _this._currentIndex = currentIndex === -1 ? 0 : currentIndex;
    _this._maxIndex = _this.options.length - 1;

    (0, _get3.default)((0, _getPrototypeOf2.default)(SelectList.prototype), '_applyOptionnalParameters', _this).call(_this, $container, callback);
    return _this;
  }

  (0, _createClass3.default)(SelectList, [{
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        ' + elements.arrowLeft + '\n        <select>\n        ' + this.options.map(function (option, index) {
        return '<option value="' + option + '">' + option + '</option>';
      }).join('') + '\n        <select>\n        ' + elements.arrowRight + '\n      </div>\n    ';

      this.$el = (0, _get3.default)((0, _getPrototypeOf2.default)(SelectList.prototype), 'render', this).call(this, this.type);
      this.$el.classList.add('align-small');
      this.$el.innerHTML = content;

      this.$prev = this.$el.querySelector('.arrow-left');
      this.$next = this.$el.querySelector('.arrow-right');
      this.$select = this.$el.querySelector('select');
      // set to default value
      this.$select.value = this.options[this._currentIndex];
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
      }, false);

      this.$next.addEventListener('click', function () {
        var index = _this2._currentIndex + 1;
        _this2.propagate(index);
      }, false);

      this.$select.addEventListener('change', function () {
        var value = _this2.$select.value;
        var index = _this2.options.indexOf(value);
        _this2.propagate(index);
      });
    }
  }, {
    key: 'propagate',
    value: function propagate(index) {
      if (index < 0 || index > this._maxIndex) {
        return;
      }

      var value = this.options[index];
      this._currentIndex = index;
      this.$select.value = value;

      this.emit('change', value);
    }
  }, {
    key: 'value',
    get: function get() {
      return this._value;
    },
    set: function set(value) {
      this.$select.value = value;
      this._value = value;
      this._currentIndex = this.options.indexOf(value);
    }
  }]);
  return SelectList;
}(_baseController2.default);

exports.default = SelectList;
//# sourceMappingURL=data:application/json;base64,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T0FBTztBQUNmLFVBQUksUUFBUSxDQUFSLElBQWEsUUFBUSxLQUFLLFNBQUwsRUFBZ0I7QUFBRSxlQUFGO09BQXpDOztBQUVBLFVBQU0sUUFBUSxLQUFLLE9BQUwsQ0FBYSxLQUFiLENBQVIsQ0FIUztBQUlmLFdBQUssYUFBTCxHQUFxQixLQUFyQixDQUplO0FBS2YsV0FBSyxPQUFMLENBQWEsS0FBYixHQUFxQixLQUFyQixDQUxlOztBQU9mLFdBQUssSUFBTCxDQUFVLFFBQVYsRUFBb0IsS0FBcEIsRUFQZTs7Ozt3QkF4REw7QUFDVixhQUFPLEtBQUssTUFBTCxDQURHOztzQkFJRixPQUFPO0FBQ2YsV0FBSyxPQUFMLENBQWEsS0FBYixHQUFxQixLQUFyQixDQURlO0FBRWYsV0FBSyxNQUFMLEdBQWMsS0FBZCxDQUZlO0FBR2YsV0FBSyxhQUFMLEdBQXFCLEtBQUssT0FBTCxDQUFhLE9BQWIsQ0FBcUIsS0FBckIsQ0FBckIsQ0FIZTs7O1NBbkJFIiwiZmlsZSI6InNlbGVjdC1saXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VDb250cm9sbGVyIGZyb20gJy4vYmFzZS1jb250cm9sbGVyJztcbmltcG9ydCAqIGFzIGVsZW1lbnRzIGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0TGlzdCBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IobGVnZW5kLCBvcHRpb25zLCBkZWZhdWx0VmFsdWUsICRjb250YWluZXIgPSBudWxsLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy50eXBlID0gJ3NlbGVjdC1saXN0JztcbiAgICB0aGlzLmxlZ2VuZCA9IGxlZ2VuZDtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuX3ZhbHVlID0gZGVmYXVsdFZhbHVlO1xuICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IHRoaXMub3B0aW9ucy5pbmRleE9mKHRoaXMuX3ZhbHVlKTtcbiAgICB0aGlzLl9jdXJyZW50SW5kZXggPSBjdXJyZW50SW5kZXggPT09IC0xID/CoDAgOiBjdXJyZW50SW5kZXg7XG4gICAgdGhpcy5fbWF4SW5kZXggPSB0aGlzLm9wdGlvbnMubGVuZ3RoIC0gMTtcblxuICAgIHN1cGVyLl9hcHBseU9wdGlvbm5hbFBhcmFtZXRlcnMoJGNvbnRhaW5lciwgY2FsbGJhY2spO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuJHNlbGVjdC52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5fY3VycmVudEluZGV4ID0gdGhpcy5vcHRpb25zLmluZGV4T2YodmFsdWUpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBgXG4gICAgICA8c3BhbiBjbGFzcz1cImxlZ2VuZFwiPiR7dGhpcy5sZWdlbmR9PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImlubmVyLXdyYXBwZXJcIj5cbiAgICAgICAgJHtlbGVtZW50cy5hcnJvd0xlZnR9XG4gICAgICAgIDxzZWxlY3Q+XG4gICAgICAgICR7dGhpcy5vcHRpb25zLm1hcCgob3B0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgIHJldHVybiBgPG9wdGlvbiB2YWx1ZT1cIiR7b3B0aW9ufVwiPiR7b3B0aW9ufTwvb3B0aW9uPmA7XG4gICAgICAgIH0pLmpvaW4oJycpfVxuICAgICAgICA8c2VsZWN0PlxuICAgICAgICAke2VsZW1lbnRzLmFycm93UmlnaHR9XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIodGhpcy50eXBlKTtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKCdhbGlnbi1zbWFsbCcpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiRwcmV2ID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmFycm93LWxlZnQnKTtcbiAgICB0aGlzLiRuZXh0ID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmFycm93LXJpZ2h0Jyk7XG4gICAgdGhpcy4kc2VsZWN0ID0gdGhpcy4kZWwucXVlcnlTZWxlY3Rvcignc2VsZWN0Jyk7XG4gICAgLy8gc2V0IHRvIGRlZmF1bHQgdmFsdWVcbiAgICB0aGlzLiRzZWxlY3QudmFsdWUgPSB0aGlzLm9wdGlvbnNbdGhpcy5fY3VycmVudEluZGV4XTtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kcHJldi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fY3VycmVudEluZGV4IC0gMTtcbiAgICAgIHRoaXMucHJvcGFnYXRlKGluZGV4KTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICB0aGlzLiRuZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9jdXJyZW50SW5kZXggKyAxO1xuICAgICAgdGhpcy5wcm9wYWdhdGUoaW5kZXgpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIHRoaXMuJHNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuJHNlbGVjdC52YWx1ZTtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5vcHRpb25zLmluZGV4T2YodmFsdWUpO1xuICAgICAgdGhpcy5wcm9wYWdhdGUoaW5kZXgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvcGFnYXRlKGluZGV4KSB7XG4gICAgaWYgKGluZGV4IDwgMCB8fMKgaW5kZXggPiB0aGlzLl9tYXhJbmRleCkgeyByZXR1cm47IH1cblxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5vcHRpb25zW2luZGV4XTtcbiAgICB0aGlzLl9jdXJyZW50SW5kZXggPSBpbmRleDtcbiAgICB0aGlzLiRzZWxlY3QudmFsdWUgPSB2YWx1ZTtcblxuICAgIHRoaXMuZW1pdCgnY2hhbmdlJywgdmFsdWUpO1xuICB9XG59XG5cblxuXG5cblxuIl19