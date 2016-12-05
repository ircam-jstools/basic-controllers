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

/** @module basic-controllers */

var defaults = {
  label: '&nbsp;',
  default: '',
  readonly: false,
  container: null,
  callback: null
};

/**
 * Text controller.
 *
 * @param {Object} config - Override default parameters.
 * @param {String} config.label - Label of the controller.
 * @param {Array} [config.default=''] - Default value of the controller.
 * @param {Array} [config.readonly=false] - Define if the controller is readonly.
 * @param {String|Element|basic-controller~Group} [config.container=null] -
 *  Container of the controller.
 * @param {Function} [config.callback=null] - Callback to be executed when the
 *  value changes.
 *
 * @example
 * import * as controllers from 'basic-contollers';
 *
 * const text = new controllers.Text({
 *   label: 'My Text',
 *   default: 'default value',
 *   readonly: false,
 *   container: '#container',
 *   callback: (value) => console.log(value),
 * });
 */

var Text = function (_BaseController) {
  _inherits(Text, _BaseController);

  function Text(config) {
    _classCallCheck(this, Text);

    var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, 'text', defaults, config));

    _this._value = _this.params.default;
    _this.initialize();
    return _this;
  }

  /**
   * Current value.
   * @type {String}
   */


  _createClass(Text, [{
    key: 'render',


    /** @private */
    value: function render() {
      var readonly = this.params.readonly ? 'readonly' : '';
      var content = '\n      <span class="label">' + this.params.label + '</span>\n      <div class="inner-wrapper">\n        <input class="text" type="text" value="' + this._value + '" ' + readonly + ' />\n      </div>\n    ';

      this.$el = _get(Text.prototype.__proto__ || Object.getPrototypeOf(Text.prototype), 'render', this).call(this);
      this.$el.innerHTML = content;
      this.$input = this.$el.querySelector('.text');

      this.bindEvents();
      return this.$el;
    }

    /** @private */

  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this2 = this;

      this.$input.addEventListener('keyup', function () {
        _this2._value = _this2.$input.value;
        _this2.executeListeners(_this2._value);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRleHQuanMiXSwibmFtZXMiOlsiZGVmYXVsdHMiLCJsYWJlbCIsImRlZmF1bHQiLCJyZWFkb25seSIsImNvbnRhaW5lciIsImNhbGxiYWNrIiwiVGV4dCIsImNvbmZpZyIsIl92YWx1ZSIsInBhcmFtcyIsImluaXRpYWxpemUiLCJjb250ZW50IiwiJGVsIiwiaW5uZXJIVE1MIiwiJGlucHV0IiwicXVlcnlTZWxlY3RvciIsImJpbmRFdmVudHMiLCJhZGRFdmVudExpc3RlbmVyIiwidmFsdWUiLCJleGVjdXRlTGlzdGVuZXJzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztBQUVBOztBQUVBLElBQU1BLFdBQVc7QUFDZkMsU0FBTyxRQURRO0FBRWZDLFdBQVMsRUFGTTtBQUdmQyxZQUFVLEtBSEs7QUFJZkMsYUFBVyxJQUpJO0FBS2ZDLFlBQVU7QUFMSyxDQUFqQjs7QUFRQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBdUJNQyxJOzs7QUFDSixnQkFBWUMsTUFBWixFQUFvQjtBQUFBOztBQUFBLDRHQUNaLE1BRFksRUFDSlAsUUFESSxFQUNNTyxNQUROOztBQUdsQixVQUFLQyxNQUFMLEdBQWMsTUFBS0MsTUFBTCxDQUFZUCxPQUExQjtBQUNBLFVBQUtRLFVBQUw7QUFKa0I7QUFLbkI7O0FBRUQ7Ozs7Ozs7Ozs7QUFhQTs2QkFDUztBQUNQLFVBQU1QLFdBQVcsS0FBS00sTUFBTCxDQUFZTixRQUFaLEdBQXVCLFVBQXZCLEdBQW9DLEVBQXJEO0FBQ0EsVUFBTVEsMkNBQ2tCLEtBQUtGLE1BQUwsQ0FBWVIsS0FEOUIsbUdBR3VDLEtBQUtPLE1BSDVDLFVBR3VETCxRQUh2RCw0QkFBTjs7QUFPQSxXQUFLUyxHQUFMO0FBQ0EsV0FBS0EsR0FBTCxDQUFTQyxTQUFULEdBQXFCRixPQUFyQjtBQUNBLFdBQUtHLE1BQUwsR0FBYyxLQUFLRixHQUFMLENBQVNHLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBZDs7QUFFQSxXQUFLQyxVQUFMO0FBQ0EsYUFBTyxLQUFLSixHQUFaO0FBQ0Q7O0FBRUQ7Ozs7aUNBQ2E7QUFBQTs7QUFDWCxXQUFLRSxNQUFMLENBQVlHLGdCQUFaLENBQTZCLE9BQTdCLEVBQXNDLFlBQU07QUFDMUMsZUFBS1QsTUFBTCxHQUFjLE9BQUtNLE1BQUwsQ0FBWUksS0FBMUI7QUFDQSxlQUFLQyxnQkFBTCxDQUFzQixPQUFLWCxNQUEzQjtBQUNELE9BSEQsRUFHRyxLQUhIO0FBSUQ7Ozt3QkFqQ1c7QUFDVixhQUFPLEtBQUtBLE1BQVo7QUFDRCxLO3NCQUVTVSxLLEVBQU87QUFDZixXQUFLSixNQUFMLENBQVlJLEtBQVosR0FBb0JBLEtBQXBCO0FBQ0EsV0FBS1YsTUFBTCxHQUFjVSxLQUFkO0FBQ0Q7Ozs7OztrQkE2QllaLEkiLCJmaWxlIjoiVGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlQ29udHJvbGxlciBmcm9tICcuL0Jhc2VDb250cm9sbGVyJztcblxuLyoqIEBtb2R1bGUgYmFzaWMtY29udHJvbGxlcnMgKi9cblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIGxhYmVsOiAnJm5ic3A7JyxcbiAgZGVmYXVsdDogJycsXG4gIHJlYWRvbmx5OiBmYWxzZSxcbiAgY29udGFpbmVyOiBudWxsLFxuICBjYWxsYmFjazogbnVsbCxcbn1cblxuLyoqXG4gKiBUZXh0IGNvbnRyb2xsZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBjb25maWcubGFiZWwgLSBMYWJlbCBvZiB0aGUgY29udHJvbGxlci5cbiAqIEBwYXJhbSB7QXJyYXl9IFtjb25maWcuZGVmYXVsdD0nJ10gLSBEZWZhdWx0IHZhbHVlIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtBcnJheX0gW2NvbmZpZy5yZWFkb25seT1mYWxzZV0gLSBEZWZpbmUgaWYgdGhlIGNvbnRyb2xsZXIgaXMgcmVhZG9ubHkuXG4gKiBAcGFyYW0ge1N0cmluZ3xFbGVtZW50fGJhc2ljLWNvbnRyb2xsZXJ+R3JvdXB9IFtjb25maWcuY29udGFpbmVyPW51bGxdIC1cbiAqICBDb250YWluZXIgb2YgdGhlIGNvbnRyb2xsZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29uZmlnLmNhbGxiYWNrPW51bGxdIC0gQ2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWQgd2hlbiB0aGVcbiAqICB2YWx1ZSBjaGFuZ2VzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBjb250cm9sbGVycyBmcm9tICdiYXNpYy1jb250b2xsZXJzJztcbiAqXG4gKiBjb25zdCB0ZXh0ID0gbmV3IGNvbnRyb2xsZXJzLlRleHQoe1xuICogICBsYWJlbDogJ015IFRleHQnLFxuICogICBkZWZhdWx0OiAnZGVmYXVsdCB2YWx1ZScsXG4gKiAgIHJlYWRvbmx5OiBmYWxzZSxcbiAqICAgY29udGFpbmVyOiAnI2NvbnRhaW5lcicsXG4gKiAgIGNhbGxiYWNrOiAodmFsdWUpID0+IGNvbnNvbGUubG9nKHZhbHVlKSxcbiAqIH0pO1xuICovXG5jbGFzcyBUZXh0IGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcigndGV4dCcsIGRlZmF1bHRzLCBjb25maWcpO1xuXG4gICAgdGhpcy5fdmFsdWUgPSB0aGlzLnBhcmFtcy5kZWZhdWx0O1xuICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgdmFsdWUuXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy4kaW5wdXQudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCByZWFkb25seSA9IHRoaXMucGFyYW1zLnJlYWRvbmx5ID8gJ3JlYWRvbmx5JyA6ICcnO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBgXG4gICAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+JHt0aGlzLnBhcmFtcy5sYWJlbH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlclwiPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJ0ZXh0XCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIiR7dGhpcy5fdmFsdWV9XCIgJHtyZWFkb25seX0gLz5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG5cbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcigpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgdGhpcy4kaW5wdXQgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcudGV4dCcpO1xuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoKSA9PiB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHRoaXMuJGlucHV0LnZhbHVlO1xuICAgICAgdGhpcy5leGVjdXRlTGlzdGVuZXJzKHRoaXMuX3ZhbHVlKTtcbiAgICB9LCBmYWxzZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGV4dDtcbiJdfQ==