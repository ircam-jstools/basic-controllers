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

/** @module basic-controllers */

var defaults = {
  label: '&nbsp;',
  options: null,
  default: null,
  container: null,
  callback: null
};

/**
 * Drop-down list controller.
 *
 * @param {Object} config - Override default parameters.
 * @param {String} config.label - Label of the controller.
 * @param {Array} [config.options=null] - Values of the drop down list.
 * @param {Number} [config.default=null] - Default value.
 * @param {String|Element|basic-controller~Group} [config.container=null] -
 *  Container of the controller.
 * @param {Function} [config.callback=null] - Callback to be executed when the
 *  value changes.
 *
 * @example
 * import * as controllers from 'basic-controllers';
 *
 * const selectList = new controllers.SelectList({
 *   label: 'SelectList',
 *   options: ['standby', 'run', 'end'],
 *   default: 'run',
 *   container: '#container',
 *   callback: (value, index) => console.log(value, index),
 * });
 */

var SelectList = function (_BaseController) {
  _inherits(SelectList, _BaseController);

  function SelectList(config) {
    _classCallCheck(this, SelectList);

    var _this = _possibleConstructorReturn(this, (SelectList.__proto__ || Object.getPrototypeOf(SelectList)).call(this, 'select-list', defaults, config));

    if (!Array.isArray(_this.params.options)) throw new Error('TriggerButton: Invalid option "options"');

    _this._value = _this.params.default;

    var options = _this.params.options;
    var index = options.indexOf(_this._value);
    _this._index = index === -1 ? 0 : index;
    _this._maxIndex = options.length - 1;

    _get(SelectList.prototype.__proto__ || Object.getPrototypeOf(SelectList.prototype), 'initialize', _this).call(_this);
    return _this;
  }

  /**
   * Current value.
   * @type {String}
   */


  _createClass(SelectList, [{
    key: 'render',


    /** @private */
    value: function render() {
      var _params = this.params,
          label = _params.label,
          options = _params.options;

      var content = '\n      <span class="label">' + label + '</span>\n      <div class="inner-wrapper">\n        ' + elements.arrowLeft + '\n        <select>\n        ' + options.map(function (option, index) {
        return '<option value="' + option + '">' + option + '</option>';
      }).join('') + '\n        <select>\n        ' + elements.arrowRight + '\n      </div>\n    ';

      this.$el = _get(SelectList.prototype.__proto__ || Object.getPrototypeOf(SelectList.prototype), 'render', this).call(this, this.type);
      this.$el.classList.add('align-small');
      this.$el.innerHTML = content;

      this.$prev = this.$el.querySelector('.arrow-left');
      this.$next = this.$el.querySelector('.arrow-right');
      this.$select = this.$el.querySelector('select');
      // set to default value
      this.$select.value = options[this._index];
      this.bindEvents();

      return this.$el;
    }

    /** @private */

  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this2 = this;

      this.$prev.addEventListener('click', function () {
        var index = _this2._index - 1;
        _this2.propagate(index);
      }, false);

      this.$next.addEventListener('click', function () {
        var index = _this2._index + 1;
        _this2.propagate(index);
      }, false);

      this.$select.addEventListener('change', function () {
        var value = _this2.$select.value;
        var index = _this2.params.options.indexOf(value);
        _this2.propagate(index);
      });
    }

    /** @private */

  }, {
    key: 'propagate',
    value: function propagate(index) {
      if (index < 0 || index > this._maxIndex) return;

      var value = this.params.options[index];
      this._index = index;
      this._value = value;
      this.$select.value = value;

      this.executeListeners(this._value, this._index);
    }
  }, {
    key: 'value',
    get: function get() {
      return this._value;
    },
    set: function set(value) {
      this.$select.value = value;
      this._value = value;
      this._index = this.params.options.indexOf(value);
    }

    /**
     * Current option index.
     * @type {Number}
     */

  }, {
    key: 'index',
    get: function get() {
      return this._index;
    },
    set: function set(index) {
      if (index < 0 || index > this._maxIndex) return;
      this.value = this.params.options[index];
    }
  }]);

  return SelectList;
}(_BaseController3.default);

exports.default = SelectList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlbGVjdExpc3QuanMiXSwibmFtZXMiOlsiZWxlbWVudHMiLCJkZWZhdWx0cyIsImxhYmVsIiwib3B0aW9ucyIsImRlZmF1bHQiLCJjb250YWluZXIiLCJjYWxsYmFjayIsIlNlbGVjdExpc3QiLCJjb25maWciLCJBcnJheSIsImlzQXJyYXkiLCJwYXJhbXMiLCJFcnJvciIsIl92YWx1ZSIsImluZGV4IiwiaW5kZXhPZiIsIl9pbmRleCIsIl9tYXhJbmRleCIsImxlbmd0aCIsImNvbnRlbnQiLCJhcnJvd0xlZnQiLCJtYXAiLCJvcHRpb24iLCJqb2luIiwiYXJyb3dSaWdodCIsIiRlbCIsInR5cGUiLCJjbGFzc0xpc3QiLCJhZGQiLCJpbm5lckhUTUwiLCIkcHJldiIsInF1ZXJ5U2VsZWN0b3IiLCIkbmV4dCIsIiRzZWxlY3QiLCJ2YWx1ZSIsImJpbmRFdmVudHMiLCJhZGRFdmVudExpc3RlbmVyIiwicHJvcGFnYXRlIiwiZXhlY3V0ZUxpc3RlbmVycyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0lBQVlBLFE7Ozs7Ozs7Ozs7OztBQUVaOztBQUVBLElBQU1DLFdBQVc7QUFDZkMsU0FBTyxRQURRO0FBRWZDLFdBQVMsSUFGTTtBQUdmQyxXQUFTLElBSE07QUFJZkMsYUFBVyxJQUpJO0FBS2ZDLFlBQVU7QUFMSyxDQUFqQjs7QUFRQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBdUJNQyxVOzs7QUFDSixzQkFBWUMsTUFBWixFQUFvQjtBQUFBOztBQUFBLHdIQUNaLGFBRFksRUFDR1AsUUFESCxFQUNhTyxNQURiOztBQUdsQixRQUFJLENBQUNDLE1BQU1DLE9BQU4sQ0FBYyxNQUFLQyxNQUFMLENBQVlSLE9BQTFCLENBQUwsRUFDRSxNQUFNLElBQUlTLEtBQUosQ0FBVSx5Q0FBVixDQUFOOztBQUVGLFVBQUtDLE1BQUwsR0FBYyxNQUFLRixNQUFMLENBQVlQLE9BQTFCOztBQUVBLFFBQU1ELFVBQVUsTUFBS1EsTUFBTCxDQUFZUixP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TCxHQUFjcUIsS0FBZDtBQUNBLFdBQUtsQixNQUFMLEdBQWMsS0FBS0wsTUFBTCxDQUFZUixPQUFaLENBQW9CWSxPQUFwQixDQUE0Qm1CLEtBQTVCLENBQWQ7QUFDRDs7QUFFRDs7Ozs7Ozt3QkFJWTtBQUNWLGFBQU8sS0FBS2xCLE1BQVo7QUFDRCxLO3NCQUVTRixLLEVBQU87QUFDZixVQUFJQSxRQUFRLENBQVIsSUFBYUEsUUFBUSxLQUFLRyxTQUE5QixFQUF5QztBQUN6QyxXQUFLaUIsS0FBTCxHQUFhLEtBQUt2QixNQUFMLENBQVlSLE9BQVosQ0FBb0JXLEtBQXBCLENBQWI7QUFDRDs7Ozs7O2tCQWdFWVAsVSIsImZpbGUiOiJTZWxlY3RMaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VDb250cm9sbGVyIGZyb20gJy4vQmFzZUNvbnRyb2xsZXInO1xuaW1wb3J0ICogYXMgZWxlbWVudHMgZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuXG4vKiogQG1vZHVsZSBiYXNpYy1jb250cm9sbGVycyAqL1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgbGFiZWw6ICcmbmJzcDsnLFxuICBvcHRpb25zOiBudWxsLFxuICBkZWZhdWx0OiBudWxsLFxuICBjb250YWluZXI6IG51bGwsXG4gIGNhbGxiYWNrOiBudWxsLFxufVxuXG4vKipcbiAqIERyb3AtZG93biBsaXN0IGNvbnRyb2xsZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBjb25maWcubGFiZWwgLSBMYWJlbCBvZiB0aGUgY29udHJvbGxlci5cbiAqIEBwYXJhbSB7QXJyYXl9IFtjb25maWcub3B0aW9ucz1udWxsXSAtIFZhbHVlcyBvZiB0aGUgZHJvcCBkb3duIGxpc3QuXG4gKiBAcGFyYW0ge051bWJlcn0gW2NvbmZpZy5kZWZhdWx0PW51bGxdIC0gRGVmYXVsdCB2YWx1ZS5cbiAqIEBwYXJhbSB7U3RyaW5nfEVsZW1lbnR8YmFzaWMtY29udHJvbGxlcn5Hcm91cH0gW2NvbmZpZy5jb250YWluZXI9bnVsbF0gLVxuICogIENvbnRhaW5lciBvZiB0aGUgY29udHJvbGxlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb25maWcuY2FsbGJhY2s9bnVsbF0gLSBDYWxsYmFjayB0byBiZSBleGVjdXRlZCB3aGVuIHRoZVxuICogIHZhbHVlIGNoYW5nZXMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGNvbnRyb2xsZXJzIGZyb20gJ2Jhc2ljLWNvbnRyb2xsZXJzJztcbiAqXG4gKiBjb25zdCBzZWxlY3RMaXN0ID0gbmV3IGNvbnRyb2xsZXJzLlNlbGVjdExpc3Qoe1xuICogICBsYWJlbDogJ1NlbGVjdExpc3QnLFxuICogICBvcHRpb25zOiBbJ3N0YW5kYnknLCAncnVuJywgJ2VuZCddLFxuICogICBkZWZhdWx0OiAncnVuJyxcbiAqICAgY29udGFpbmVyOiAnI2NvbnRhaW5lcicsXG4gKiAgIGNhbGxiYWNrOiAodmFsdWUsIGluZGV4KSA9PiBjb25zb2xlLmxvZyh2YWx1ZSwgaW5kZXgpLFxuICogfSk7XG4gKi9cbmNsYXNzIFNlbGVjdExpc3QgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKCdzZWxlY3QtbGlzdCcsIGRlZmF1bHRzLCBjb25maWcpO1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMucGFyYW1zLm9wdGlvbnMpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmlnZ2VyQnV0dG9uOiBJbnZhbGlkIG9wdGlvbiBcIm9wdGlvbnNcIicpO1xuXG4gICAgdGhpcy5fdmFsdWUgPSB0aGlzLnBhcmFtcy5kZWZhdWx0O1xuXG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMucGFyYW1zLm9wdGlvbnM7XG4gICAgY29uc3QgaW5kZXggPSBvcHRpb25zLmluZGV4T2YodGhpcy5fdmFsdWUpO1xuICAgIHRoaXMuX2luZGV4ID0gaW5kZXggPT09IC0xID/CoDAgOiBpbmRleDtcbiAgICB0aGlzLl9tYXhJbmRleCA9IG9wdGlvbnMubGVuZ3RoIC0gMTtcblxuICAgIHN1cGVyLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDdXJyZW50IHZhbHVlLlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuJHNlbGVjdC52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5faW5kZXggPSB0aGlzLnBhcmFtcy5vcHRpb25zLmluZGV4T2YodmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgb3B0aW9uIGluZGV4LlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgZ2V0IGluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLl9pbmRleDtcbiAgfVxuXG4gIHNldCBpbmRleChpbmRleCkge1xuICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiB0aGlzLl9tYXhJbmRleCkgcmV0dXJuO1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLnBhcmFtcy5vcHRpb25zW2luZGV4XTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBsYWJlbCwgb3B0aW9uc8KgfSA9IHRoaXMucGFyYW1zO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBgXG4gICAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+JHtsYWJlbH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlclwiPlxuICAgICAgICAke2VsZW1lbnRzLmFycm93TGVmdH1cbiAgICAgICAgPHNlbGVjdD5cbiAgICAgICAgJHtvcHRpb25zLm1hcCgob3B0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgIHJldHVybiBgPG9wdGlvbiB2YWx1ZT1cIiR7b3B0aW9ufVwiPiR7b3B0aW9ufTwvb3B0aW9uPmA7XG4gICAgICAgIH0pLmpvaW4oJycpfVxuICAgICAgICA8c2VsZWN0PlxuICAgICAgICAke2VsZW1lbnRzLmFycm93UmlnaHR9XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIodGhpcy50eXBlKTtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKCdhbGlnbi1zbWFsbCcpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiRwcmV2ID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmFycm93LWxlZnQnKTtcbiAgICB0aGlzLiRuZXh0ID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmFycm93LXJpZ2h0Jyk7XG4gICAgdGhpcy4kc2VsZWN0ID0gdGhpcy4kZWwucXVlcnlTZWxlY3Rvcignc2VsZWN0Jyk7XG4gICAgLy8gc2V0IHRvIGRlZmF1bHQgdmFsdWVcbiAgICB0aGlzLiRzZWxlY3QudmFsdWUgPSBvcHRpb25zW3RoaXMuX2luZGV4XTtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJHByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2luZGV4IC0gMTtcbiAgICAgIHRoaXMucHJvcGFnYXRlKGluZGV4KTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICB0aGlzLiRuZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9pbmRleCArIDE7XG4gICAgICB0aGlzLnByb3BhZ2F0ZShpbmRleCk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgdGhpcy4kc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy4kc2VsZWN0LnZhbHVlO1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnBhcmFtcy5vcHRpb25zLmluZGV4T2YodmFsdWUpO1xuICAgICAgdGhpcy5wcm9wYWdhdGUoaW5kZXgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb3BhZ2F0ZShpbmRleCkge1xuICAgIGlmIChpbmRleCA8IDAgfHzCoGluZGV4ID4gdGhpcy5fbWF4SW5kZXgpIHJldHVybjtcblxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5wYXJhbXMub3B0aW9uc1tpbmRleF07XG4gICAgdGhpcy5faW5kZXggPSBpbmRleDtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuJHNlbGVjdC52YWx1ZSA9IHZhbHVlO1xuXG4gICAgdGhpcy5leGVjdXRlTGlzdGVuZXJzKHRoaXMuX3ZhbHVlLCB0aGlzLl9pbmRleCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0TGlzdDtcbiJdfQ==