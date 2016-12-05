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
  legend: '&nbsp;',
  default: 'opened',
  container: null
};

/**
 * Group of controllers.
 *
 * @param {Object} config - Override default parameters.
 * @param {String} config.label - Label of the group.
 * @param {'opened'|'closed'} [config.default='opened'] - Default state of the
 *  group.
 * @param {String|Element|basic-controller~Group} [config.container=null] -
 *  Container of the controller.
 *
 * @example
 * import * as controllers from 'basic-controllers';
 *
 * // create a group
 * const group = new controllers.Group({
 *   label: 'Group',
 *   default: 'opened',
 *   container: '#container'
 * });
 *
 * // insert controllers in the group
 * const groupSlider = new controllers.Slider({
 *   label: 'Group Slider',
 *   min: 20,
 *   max: 1000,
 *   step: 1,
 *   default: 200,
 *   unit: 'Hz',
 *   size: 'large',
 *   container: group,
 *   callback: (value) => console.log(value),
 * });
 *
 * const groupText = new controllers.Text({
 *   label: 'Group Text',
 *   default: 'text input',
 *   readonly: false,
 *   container: group,
 *   callback: (value) => console.log(value),
 * });
 */

var Group = function (_BaseController) {
  _inherits(Group, _BaseController);

  function Group(config) {
    _classCallCheck(this, Group);

    var _this = _possibleConstructorReturn(this, (Group.__proto__ || Object.getPrototypeOf(Group)).call(this, 'group', defaults, config));

    _this._states = ['opened', 'closed'];

    if (_this._states.indexOf(_this.params.default) === -1) throw new Error('Invalid state "' + value + '"');

    _this._state = _this.params.default;

    _get(Group.prototype.__proto__ || Object.getPrototypeOf(Group.prototype), 'initialize', _this).call(_this);
    return _this;
  }

  /**
   * State of the group (`'opened'` or `'closed'`).
   * @type {String}
   */


  _createClass(Group, [{
    key: 'render',


    /** @private */
    value: function render() {
      var content = '\n      <div class="group-header">\n        ' + elements.smallArrowRight + '\n        ' + elements.smallArrowBottom + '\n        <span class="label">' + this.params.label + '</span>\n      </div>\n      <div class="group-content"></div>\n    ';

      this.$el = _get(Group.prototype.__proto__ || Object.getPrototypeOf(Group.prototype), 'render', this).call(this);
      this.$el.innerHTML = content;
      this.$el.classList.add(this._state);

      this.$header = this.$el.querySelector('.group-header');
      this.$container = this.$el.querySelector('.group-content');

      this.bindEvents();

      return this.$el;
    }

    /** @private */

  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this2 = this;

      this.$header.addEventListener('click', function () {
        var state = _this2._state === 'closed' ? 'opened' : 'closed';
        _this2.state = state;
      });
    }
  }, {
    key: 'value',
    get: function get() {
      return this.state;
    },
    set: function set(state) {
      this.state = state;
    }

    /**
     * Alias for `value`.
     * @type {String}
     */

  }, {
    key: 'state',
    get: function get() {
      return this._state;
    },
    set: function set(value) {
      if (this._states.indexOf(value) === -1) throw new Error('Invalid state "' + value + '"');

      this.$el.classList.remove(this._state);
      this.$el.classList.add(value);

      this._state = value;
    }
  }]);

  return Group;
}(_BaseController3.default);

exports.default = Group;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdyb3VwLmpzIl0sIm5hbWVzIjpbImVsZW1lbnRzIiwiZGVmYXVsdHMiLCJsZWdlbmQiLCJkZWZhdWx0IiwiY29udGFpbmVyIiwiR3JvdXAiLCJjb25maWciLCJfc3RhdGVzIiwiaW5kZXhPZiIsInBhcmFtcyIsIkVycm9yIiwidmFsdWUiLCJfc3RhdGUiLCJjb250ZW50Iiwic21hbGxBcnJvd1JpZ2h0Iiwic21hbGxBcnJvd0JvdHRvbSIsImxhYmVsIiwiJGVsIiwiaW5uZXJIVE1MIiwiY2xhc3NMaXN0IiwiYWRkIiwiJGhlYWRlciIsInF1ZXJ5U2VsZWN0b3IiLCIkY29udGFpbmVyIiwiYmluZEV2ZW50cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdGF0ZSIsInJlbW92ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0lBQVlBLFE7Ozs7Ozs7Ozs7OztBQUVaOztBQUVBLElBQU1DLFdBQVc7QUFDZkMsVUFBUSxRQURPO0FBRWZDLFdBQVMsUUFGTTtBQUdmQyxhQUFXO0FBSEksQ0FBakI7O0FBTUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXlDTUMsSzs7O0FBQ0osaUJBQVlDLE1BQVosRUFBb0I7QUFBQTs7QUFBQSw4R0FDWixPQURZLEVBQ0hMLFFBREcsRUFDT0ssTUFEUDs7QUFHbEIsVUFBS0MsT0FBTCxHQUFlLENBQUMsUUFBRCxFQUFXLFFBQVgsQ0FBZjs7QUFFQSxRQUFJLE1BQUtBLE9BQUwsQ0FBYUMsT0FBYixDQUFxQixNQUFLQyxNQUFMLENBQVlOLE9BQWpDLE1BQThDLENBQUMsQ0FBbkQsRUFDRSxNQUFNLElBQUlPLEtBQUoscUJBQTRCQyxLQUE1QixPQUFOOztBQUVGLFVBQUtDLE1BQUwsR0FBYyxNQUFLSCxNQUFMLENBQVlOLE9BQTFCOztBQUVBO0FBVmtCO0FBV25COztBQUVEOzs7Ozs7Ozs7O0FBOEJBOzZCQUNTO0FBQ1AsVUFBSVUsMkRBRUViLFNBQVNjLGVBRlgsa0JBR0VkLFNBQVNlLGdCQUhYLHNDQUlzQixLQUFLTixNQUFMLENBQVlPLEtBSmxDLHlFQUFKOztBQVNBLFdBQUtDLEdBQUw7QUFDQSxXQUFLQSxHQUFMLENBQVNDLFNBQVQsR0FBcUJMLE9BQXJCO0FBQ0EsV0FBS0ksR0FBTCxDQUFTRSxTQUFULENBQW1CQyxHQUFuQixDQUF1QixLQUFLUixNQUE1Qjs7QUFFQSxXQUFLUyxPQUFMLEdBQWUsS0FBS0osR0FBTCxDQUFTSyxhQUFULENBQXVCLGVBQXZCLENBQWY7QUFDQSxXQUFLQyxVQUFMLEdBQWtCLEtBQUtOLEdBQUwsQ0FBU0ssYUFBVCxDQUF1QixnQkFBdkIsQ0FBbEI7O0FBRUEsV0FBS0UsVUFBTDs7QUFFQSxhQUFPLEtBQUtQLEdBQVo7QUFDRDs7QUFFRDs7OztpQ0FDYTtBQUFBOztBQUNYLFdBQUtJLE9BQUwsQ0FBYUksZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUMsWUFBTTtBQUMzQyxZQUFNQyxRQUFRLE9BQUtkLE1BQUwsS0FBZ0IsUUFBaEIsR0FBMkIsUUFBM0IsR0FBc0MsUUFBcEQ7QUFDQSxlQUFLYyxLQUFMLEdBQWFBLEtBQWI7QUFDRCxPQUhEO0FBSUQ7Ozt3QkF2RFc7QUFDVixhQUFPLEtBQUtBLEtBQVo7QUFDRCxLO3NCQUVTQSxLLEVBQU87QUFDZixXQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDRDs7QUFFRDs7Ozs7Ozt3QkFJWTtBQUNWLGFBQU8sS0FBS2QsTUFBWjtBQUNELEs7c0JBRVNELEssRUFBTztBQUNmLFVBQUksS0FBS0osT0FBTCxDQUFhQyxPQUFiLENBQXFCRyxLQUFyQixNQUFnQyxDQUFDLENBQXJDLEVBQ0UsTUFBTSxJQUFJRCxLQUFKLHFCQUE0QkMsS0FBNUIsT0FBTjs7QUFFRixXQUFLTSxHQUFMLENBQVNFLFNBQVQsQ0FBbUJRLE1BQW5CLENBQTBCLEtBQUtmLE1BQS9CO0FBQ0EsV0FBS0ssR0FBTCxDQUFTRSxTQUFULENBQW1CQyxHQUFuQixDQUF1QlQsS0FBdkI7O0FBRUEsV0FBS0MsTUFBTCxHQUFjRCxLQUFkO0FBQ0Q7Ozs7OztrQkFrQ1lOLEsiLCJmaWxlIjoiR3JvdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZUNvbnRyb2xsZXIgZnJvbSAnLi9CYXNlQ29udHJvbGxlcic7XG5pbXBvcnQgKiBhcyBlbGVtZW50cyBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5cbi8qKiBAbW9kdWxlIGJhc2ljLWNvbnRyb2xsZXJzICovXG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICBsZWdlbmQ6ICcmbmJzcDsnLFxuICBkZWZhdWx0OiAnb3BlbmVkJyxcbiAgY29udGFpbmVyOiBudWxsLFxufTtcblxuLyoqXG4gKiBHcm91cCBvZiBjb250cm9sbGVycy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZy5sYWJlbCAtIExhYmVsIG9mIHRoZSBncm91cC5cbiAqIEBwYXJhbSB7J29wZW5lZCd8J2Nsb3NlZCd9IFtjb25maWcuZGVmYXVsdD0nb3BlbmVkJ10gLSBEZWZhdWx0IHN0YXRlIG9mIHRoZVxuICogIGdyb3VwLlxuICogQHBhcmFtIHtTdHJpbmd8RWxlbWVudHxiYXNpYy1jb250cm9sbGVyfkdyb3VwfSBbY29uZmlnLmNvbnRhaW5lcj1udWxsXSAtXG4gKiAgQ29udGFpbmVyIG9mIHRoZSBjb250cm9sbGVyLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBjb250cm9sbGVycyBmcm9tICdiYXNpYy1jb250cm9sbGVycyc7XG4gKlxuICogLy8gY3JlYXRlIGEgZ3JvdXBcbiAqIGNvbnN0IGdyb3VwID0gbmV3IGNvbnRyb2xsZXJzLkdyb3VwKHtcbiAqICAgbGFiZWw6ICdHcm91cCcsXG4gKiAgIGRlZmF1bHQ6ICdvcGVuZWQnLFxuICogICBjb250YWluZXI6ICcjY29udGFpbmVyJ1xuICogfSk7XG4gKlxuICogLy8gaW5zZXJ0IGNvbnRyb2xsZXJzIGluIHRoZSBncm91cFxuICogY29uc3QgZ3JvdXBTbGlkZXIgPSBuZXcgY29udHJvbGxlcnMuU2xpZGVyKHtcbiAqICAgbGFiZWw6ICdHcm91cCBTbGlkZXInLFxuICogICBtaW46IDIwLFxuICogICBtYXg6IDEwMDAsXG4gKiAgIHN0ZXA6IDEsXG4gKiAgIGRlZmF1bHQ6IDIwMCxcbiAqICAgdW5pdDogJ0h6JyxcbiAqICAgc2l6ZTogJ2xhcmdlJyxcbiAqICAgY29udGFpbmVyOiBncm91cCxcbiAqICAgY2FsbGJhY2s6ICh2YWx1ZSkgPT4gY29uc29sZS5sb2codmFsdWUpLFxuICogfSk7XG4gKlxuICogY29uc3QgZ3JvdXBUZXh0ID0gbmV3IGNvbnRyb2xsZXJzLlRleHQoe1xuICogICBsYWJlbDogJ0dyb3VwIFRleHQnLFxuICogICBkZWZhdWx0OiAndGV4dCBpbnB1dCcsXG4gKiAgIHJlYWRvbmx5OiBmYWxzZSxcbiAqICAgY29udGFpbmVyOiBncm91cCxcbiAqICAgY2FsbGJhY2s6ICh2YWx1ZSkgPT4gY29uc29sZS5sb2codmFsdWUpLFxuICogfSk7XG4gKi9cbmNsYXNzIEdyb3VwIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcignZ3JvdXAnLCBkZWZhdWx0cywgY29uZmlnKTtcblxuICAgIHRoaXMuX3N0YXRlcyA9IFsnb3BlbmVkJywgJ2Nsb3NlZCddO1xuXG4gICAgaWYgKHRoaXMuX3N0YXRlcy5pbmRleE9mKHRoaXMucGFyYW1zLmRlZmF1bHQpID09PSAtMSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBzdGF0ZSBcIiR7dmFsdWV9XCJgKTtcblxuICAgIHRoaXMuX3N0YXRlID0gdGhpcy5wYXJhbXMuZGVmYXVsdDtcblxuICAgIHN1cGVyLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGF0ZSBvZiB0aGUgZ3JvdXAgKGAnb3BlbmVkJ2Agb3IgYCdjbG9zZWQnYCkuXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGU7XG4gIH1cblxuICBzZXQgdmFsdWUoc3RhdGUpIHtcbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gIH1cblxuICAvKipcbiAgICogQWxpYXMgZm9yIGB2YWx1ZWAuXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBnZXQgc3RhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xuICB9XG5cbiAgc2V0IHN0YXRlKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuX3N0YXRlcy5pbmRleE9mKHZhbHVlKSA9PT0gLTEpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgc3RhdGUgXCIke3ZhbHVlfVwiYCk7XG5cbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX3N0YXRlKTtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKHZhbHVlKTtcblxuICAgIHRoaXMuX3N0YXRlID0gdmFsdWU7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVuZGVyKCkge1xuICAgIGxldCBjb250ZW50ID0gYFxuICAgICAgPGRpdiBjbGFzcz1cImdyb3VwLWhlYWRlclwiPlxuICAgICAgICAke2VsZW1lbnRzLnNtYWxsQXJyb3dSaWdodH1cbiAgICAgICAgJHtlbGVtZW50cy5zbWFsbEFycm93Qm90dG9tfVxuICAgICAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+JHt0aGlzLnBhcmFtcy5sYWJlbH08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJncm91cC1jb250ZW50XCI+PC9kaXY+XG4gICAgYDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKCk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKHRoaXMuX3N0YXRlKTtcblxuICAgIHRoaXMuJGhlYWRlciA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5ncm91cC1oZWFkZXInKTtcbiAgICB0aGlzLiRjb250YWluZXIgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuZ3JvdXAtY29udGVudCcpO1xuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLiRoZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuX3N0YXRlID09PSAnY2xvc2VkJyA/ICdvcGVuZWQnIDogJ2Nsb3NlZCc7XG4gICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR3JvdXA7XG4iXX0=