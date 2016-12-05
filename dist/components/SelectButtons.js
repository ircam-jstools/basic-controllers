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
 * List of buttons with state.
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
 * const selectButtons = new controllers.SelectButtons({
 *   label: 'SelectButtons',
 *   options: ['standby', 'run', 'end'],
 *   default: 'run',
 *   container: '#container',
 *   callback: (value, index) => console.log(value, index),
 * });
 */

var SelectButtons = function (_BaseController) {
  _inherits(SelectButtons, _BaseController);

  function SelectButtons(config) {
    _classCallCheck(this, SelectButtons);

    var _this = _possibleConstructorReturn(this, (SelectButtons.__proto__ || Object.getPrototypeOf(SelectButtons)).call(this, 'select-buttons', defaults, config));

    if (!Array.isArray(_this.params.options)) throw new Error('TriggerButton: Invalid option "options"');

    _this._value = _this.params.default;

    var options = _this.params.options;
    var index = options.indexOf(_this._value);
    _this._index = index === -1 ? 0 : index;
    _this._maxIndex = options.length - 1;

    _get(SelectButtons.prototype.__proto__ || Object.getPrototypeOf(SelectButtons.prototype), 'initialize', _this).call(_this);
    return _this;
  }

  /**
   * Current value.
   * @type {String}
   */


  _createClass(SelectButtons, [{
    key: 'render',


    /** @private */
    value: function render() {
      var _params = this.params,
          options = _params.options,
          label = _params.label;

      var content = '\n      <span class="label">' + label + '</span>\n      <div class="inner-wrapper">\n        ' + elements.arrowLeft + '\n        ' + options.map(function (option, index) {
        return '\n            <button class="btn" data-index="' + index + '" data-value="' + option + '">\n              ' + option + '\n            </button>';
      }).join('') + '\n        ' + elements.arrowRight + '\n      </div>\n    ';

      this.$el = _get(SelectButtons.prototype.__proto__ || Object.getPrototypeOf(SelectButtons.prototype), 'render', this).call(this, this.type);
      this.$el.innerHTML = content;

      this.$prev = this.$el.querySelector('.arrow-left');
      this.$next = this.$el.querySelector('.arrow-right');
      this.$btns = Array.from(this.$el.querySelectorAll('.btn'));

      this._highlightBtn(this._index);
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
      });

      this.$next.addEventListener('click', function () {
        var index = _this2._index + 1;
        _this2.propagate(index);
      });

      this.$btns.forEach(function ($btn, index) {
        $btn.addEventListener('click', function (e) {
          e.preventDefault();
          _this2.propagate(index);
        });
      });
    }

    /** @private */

  }, {
    key: 'propagate',
    value: function propagate(index) {
      if (index < 0 || index > this._maxIndex) return;

      this._index = index;
      this._value = this.params.options[index];
      this._highlightBtn(this._index);

      this.executeListeners(this._value, this._index);
    }

    /** @private */

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
      var index = this.params.options.indexOf(value);

      if (index !== -1) this.index = index;
    }

    /**
     * Current option index.
     * @type {Number}
     */

  }, {
    key: 'index',
    get: function get() {
      this._index;
    },
    set: function set(index) {
      if (index < 0 || index > this._maxIndex) return;

      this._value = this.params.options[index];
      this._index = index;
      this._highlightBtn(this._index);
    }
  }]);

  return SelectButtons;
}(_BaseController3.default);

exports.default = SelectButtons;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlbGVjdEJ1dHRvbnMuanMiXSwibmFtZXMiOlsiZWxlbWVudHMiLCJkZWZhdWx0cyIsImxhYmVsIiwib3B0aW9ucyIsImRlZmF1bHQiLCJjb250YWluZXIiLCJjYWxsYmFjayIsIlNlbGVjdEJ1dHRvbnMiLCJjb25maWciLCJBcnJheSIsImlzQXJyYXkiLCJwYXJhbXMiLCJFcnJvciIsIl92YWx1ZSIsImluZGV4IiwiaW5kZXhPZiIsIl9pbmRleCIsIl9tYXhJbmRleCIsImxlbmd0aCIsImNvbnRlbnQiLCJhcnJvd0xlZnQiLCJtYXAiLCJvcHRpb24iLCJqb2luIiwiYXJyb3dSaWdodCIsIiRlbCIsInR5cGUiLCJpbm5lckhUTUwiLCIkcHJldiIsInF1ZXJ5U2VsZWN0b3IiLCIkbmV4dCIsIiRidG5zIiwiZnJvbSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJfaGlnaGxpZ2h0QnRuIiwiYmluZEV2ZW50cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJwcm9wYWdhdGUiLCJmb3JFYWNoIiwiJGJ0biIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImV4ZWN1dGVMaXN0ZW5lcnMiLCJhY3RpdmVJbmRleCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7SUFBWUEsUTs7Ozs7Ozs7Ozs7O0FBRVo7O0FBRUEsSUFBTUMsV0FBVztBQUNmQyxTQUFPLFFBRFE7QUFFZkMsV0FBUyxJQUZNO0FBR2ZDLFdBQVMsSUFITTtBQUlmQyxhQUFXLElBSkk7QUFLZkMsWUFBVTtBQUxLLENBQWpCOztBQVFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF1Qk1DLGE7OztBQUNKLHlCQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBQUEsOEhBQ1osZ0JBRFksRUFDTVAsUUFETixFQUNnQk8sTUFEaEI7O0FBR2xCLFFBQUksQ0FBQ0MsTUFBTUMsT0FBTixDQUFjLE1BQUtDLE1BQUwsQ0FBWVIsT0FBMUIsQ0FBTCxFQUNFLE1B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QUFMLENBQWVDLE1BQWYsQ0FBc0IsUUFBdEI7O0FBRUEsWUFBSUYsZ0JBQWdCN0IsS0FBcEIsRUFBMkI7QUFDekJ5QixlQUFLSyxTQUFMLENBQWVFLEdBQWYsQ0FBbUIsUUFBbkI7QUFDRDtBQUNGLE9BTkQ7QUFPRDs7O3dCQWpHVztBQUNWLGFBQU8sS0FBS2pDLE1BQVo7QUFDRCxLO3NCQUVTa0MsSyxFQUFPO0FBQ2YsVUFBTWpDLFFBQVEsS0FBS0gsTUFBTCxDQUFZUixPQUFaLENBQW9CWSxPQUFwQixDQUE0QmdDLEtBQTVCLENBQWQ7O0FBRUEsVUFBSWpDLFVBQVUsQ0FBQyxDQUFmLEVBQ0UsS0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0g7O0FBRUQ7Ozs7Ozs7d0JBSVk7QUFDVixXQUFLRSxNQUFMO0FBQ0QsSztzQkFFU0YsSyxFQUFPO0FBQ2YsVUFBSUEsUUFBUSxDQUFSLElBQWFBLFFBQVEsS0FBS0csU0FBOUIsRUFBeUM7O0FBRXpDLFdBQUtKLE1BQUwsR0FBYyxLQUFLRixNQUFMLENBQVlSLE9BQVosQ0FBb0JXLEtBQXBCLENBQWQ7QUFDQSxXQUFLRSxNQUFMLEdBQWNGLEtBQWQ7QUFDQSxXQUFLb0IsYUFBTCxDQUFtQixLQUFLbEIsTUFBeEI7QUFDRDs7Ozs7O2tCQTJFWVQsYSIsImZpbGUiOiJTZWxlY3RCdXR0b25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VDb250cm9sbGVyIGZyb20gJy4vQmFzZUNvbnRyb2xsZXInO1xuaW1wb3J0ICogYXMgZWxlbWVudHMgZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuXG4vKiogQG1vZHVsZSBiYXNpYy1jb250cm9sbGVycyAqL1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgbGFiZWw6ICcmbmJzcDsnLFxuICBvcHRpb25zOiBudWxsLFxuICBkZWZhdWx0OiBudWxsLFxuICBjb250YWluZXI6IG51bGwsXG4gIGNhbGxiYWNrOiBudWxsLFxufTtcblxuLyoqXG4gKiBMaXN0IG9mIGJ1dHRvbnMgd2l0aCBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZy5sYWJlbCAtIExhYmVsIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtBcnJheX0gW2NvbmZpZy5vcHRpb25zPW51bGxdIC0gVmFsdWVzIG9mIHRoZSBkcm9wIGRvd24gbGlzdC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLmRlZmF1bHQ9bnVsbF0gLSBEZWZhdWx0IHZhbHVlLlxuICogQHBhcmFtIHtTdHJpbmd8RWxlbWVudHxiYXNpYy1jb250cm9sbGVyfkdyb3VwfSBbY29uZmlnLmNvbnRhaW5lcj1udWxsXSAtXG4gKiAgQ29udGFpbmVyIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbmZpZy5jYWxsYmFjaz1udWxsXSAtIENhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIHdoZW4gdGhlXG4gKiAgdmFsdWUgY2hhbmdlcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgY29udHJvbGxlcnMgZnJvbSAnYmFzaWMtY29udHJvbGxlcnMnO1xuICpcbiAqIGNvbnN0IHNlbGVjdEJ1dHRvbnMgPSBuZXcgY29udHJvbGxlcnMuU2VsZWN0QnV0dG9ucyh7XG4gKiAgIGxhYmVsOiAnU2VsZWN0QnV0dG9ucycsXG4gKiAgIG9wdGlvbnM6IFsnc3RhbmRieScsICdydW4nLCAnZW5kJ10sXG4gKiAgIGRlZmF1bHQ6ICdydW4nLFxuICogICBjb250YWluZXI6ICcjY29udGFpbmVyJyxcbiAqICAgY2FsbGJhY2s6ICh2YWx1ZSwgaW5kZXgpID0+IGNvbnNvbGUubG9nKHZhbHVlLCBpbmRleCksXG4gKiB9KTtcbiAqL1xuY2xhc3MgU2VsZWN0QnV0dG9ucyBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoJ3NlbGVjdC1idXR0b25zJywgZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5wYXJhbXMub3B0aW9ucykpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyaWdnZXJCdXR0b246IEludmFsaWQgb3B0aW9uIFwib3B0aW9uc1wiJyk7XG5cbiAgICB0aGlzLl92YWx1ZSA9IHRoaXMucGFyYW1zLmRlZmF1bHQ7XG5cbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5wYXJhbXMub3B0aW9ucztcbiAgICBjb25zdCBpbmRleCA9IG9wdGlvbnMuaW5kZXhPZih0aGlzLl92YWx1ZSk7XG4gICAgdGhpcy5faW5kZXggPSBpbmRleCA9PT0gLTEgP8KgMCA6IGluZGV4O1xuICAgIHRoaXMuX21heEluZGV4ID0gb3B0aW9ucy5sZW5ndGggLSAxO1xuXG4gICAgc3VwZXIuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgdmFsdWUuXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnBhcmFtcy5vcHRpb25zLmluZGV4T2YodmFsdWUpO1xuXG4gICAgaWYgKGluZGV4ICE9PSAtMSlcbiAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDdXJyZW50IG9wdGlvbiBpbmRleC5cbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIGdldCBpbmRleCgpIHtcbiAgICB0aGlzLl9pbmRleDtcbiAgfVxuXG4gIHNldCBpbmRleChpbmRleCkge1xuICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiB0aGlzLl9tYXhJbmRleCkgcmV0dXJuO1xuXG4gICAgdGhpcy5fdmFsdWUgPSB0aGlzLnBhcmFtcy5vcHRpb25zW2luZGV4XTtcbiAgICB0aGlzLl9pbmRleCA9IGluZGV4O1xuICAgIHRoaXMuX2hpZ2hsaWdodEJ0bih0aGlzLl9pbmRleCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgb3B0aW9ucywgbGFiZWwgfSA9IHRoaXMucGFyYW1zO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBgXG4gICAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+JHtsYWJlbH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlclwiPlxuICAgICAgICAke2VsZW1lbnRzLmFycm93TGVmdH1cbiAgICAgICAgJHtvcHRpb25zLm1hcCgob3B0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuXCIgZGF0YS1pbmRleD1cIiR7aW5kZXh9XCIgZGF0YS12YWx1ZT1cIiR7b3B0aW9ufVwiPlxuICAgICAgICAgICAgICAke29wdGlvbn1cbiAgICAgICAgICAgIDwvYnV0dG9uPmA7XG4gICAgICAgIH0pLmpvaW4oJycpfVxuICAgICAgICAke2VsZW1lbnRzLmFycm93UmlnaHR9XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIodGhpcy50eXBlKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gICAgdGhpcy4kcHJldiA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy1sZWZ0Jyk7XG4gICAgdGhpcy4kbmV4dCA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy1yaWdodCcpO1xuICAgIHRoaXMuJGJ0bnMgPSBBcnJheS5mcm9tKHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4nKSk7XG5cbiAgICB0aGlzLl9oaWdobGlnaHRCdG4odGhpcy5faW5kZXgpO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kcHJldi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5faW5kZXggLSAxO1xuICAgICAgdGhpcy5wcm9wYWdhdGUoaW5kZXgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy4kbmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5faW5kZXggKyAxO1xuICAgICAgdGhpcy5wcm9wYWdhdGUoaW5kZXgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy4kYnRucy5mb3JFYWNoKCgkYnRuLCBpbmRleCkgPT4ge1xuICAgICAgJGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5wcm9wYWdhdGUoaW5kZXgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvcGFnYXRlKGluZGV4KSB7XG4gICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+IHRoaXMuX21heEluZGV4KSByZXR1cm47XG5cbiAgICB0aGlzLl9pbmRleCA9IGluZGV4O1xuICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5wYXJhbXMub3B0aW9uc1tpbmRleF07XG4gICAgdGhpcy5faGlnaGxpZ2h0QnRuKHRoaXMuX2luZGV4KTtcblxuICAgIHRoaXMuZXhlY3V0ZUxpc3RlbmVycyh0aGlzLl92YWx1ZSwgdGhpcy5faW5kZXgpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIF9oaWdobGlnaHRCdG4oYWN0aXZlSW5kZXgpIHtcbiAgICB0aGlzLiRidG5zLmZvckVhY2goKCRidG4sIGluZGV4KSA9PiB7XG4gICAgICAkYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXG4gICAgICBpZiAoYWN0aXZlSW5kZXggPT09IGluZGV4KSB7XG4gICAgICAgICRidG4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0QnV0dG9ucztcbiJdfQ==