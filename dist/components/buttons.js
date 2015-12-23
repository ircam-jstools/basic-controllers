'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _baseController = require('./base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

var Buttons = (function (_BaseController) {
  _inherits(Buttons, _BaseController);

  function Buttons(legend, labels) {
    var $container = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    var callback = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

    _classCallCheck(this, Buttons);

    _get(Object.getPrototypeOf(Buttons.prototype), 'constructor', this).call(this);

    this.type = 'buttons';
    this.legend = legend || '&nbsp'; // non breakable space to keep rendering consistency
    this.labels = labels;
    this._index = null;

    _get(Object.getPrototypeOf(Buttons.prototype), '_applyOptionnalParameters', this).call(this, $container, callback);
  }

  _createClass(Buttons, [{
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        ' + this.labels.map(function (label, index) {
        return '\n            <a href="#" class="btn">\n              ' + label + '\n            </a>';
      }).join('') + '\n      </div>';

      this.$el = _get(Object.getPrototypeOf(Buttons.prototype), 'render', this).call(this, this.type);
      this.$el.innerHTML = content;

      this.$buttons = _Array$from(this.$el.querySelectorAll('.btn'));
      this.bindEvents();

      return this.$el;
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this = this;

      this.$buttons.forEach(function ($btn, index) {
        var label = _this.labels[index];

        $btn.addEventListener('click', function (e) {
          _this.emit('change', label);
          e.preventDefault();
        });
      });
    }
  }, {
    key: 'value',
    set: function set(value) {},
    get: function get() {}
  }]);

  return Buttons;
})(_baseController2['default']);

exports['default'] = Buttons;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi9jb21wb25lbnRzL2J1dHRvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQUEyQixtQkFBbUI7Ozs7SUFFekIsT0FBTztZQUFQLE9BQU87O0FBQ2YsV0FEUSxPQUFPLENBQ2QsTUFBTSxFQUFFLE1BQU0sRUFBc0M7UUFBcEMsVUFBVSx5REFBRyxJQUFJO1FBQUUsUUFBUSx5REFBRyxJQUFJOzswQkFEM0MsT0FBTzs7QUFFeEIsK0JBRmlCLE9BQU8sNkNBRWhCOztBQUVSLFFBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO0FBQ3RCLFFBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxJQUFJLE9BQU8sQ0FBQztBQUNoQyxRQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixRQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzs7QUFFbkIsK0JBVGlCLE9BQU8sMkRBU1EsVUFBVSxFQUFFLFFBQVEsRUFBRTtHQUN2RDs7ZUFWa0IsT0FBTzs7V0FZcEIsa0JBQUc7QUFDUCxVQUFJLE9BQU8scUNBQ2MsSUFBSSxDQUFDLE1BQU0sNERBRTlCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBSyxFQUFFLEtBQUssRUFBSztBQUNsQywwRUFFTSxLQUFLLHdCQUNIO09BQ1QsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsbUJBQ04sQ0FBQzs7QUFFVixVQUFJLENBQUMsR0FBRyw4QkF4QlMsT0FBTyx3Q0F3QkEsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25DLFVBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQzs7QUFFN0IsVUFBSSxDQUFDLFFBQVEsR0FBRyxZQUFXLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUM5RCxVQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7O0FBRWxCLGFBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztLQUNqQjs7O1dBVVMsc0JBQUc7OztBQUNYLFVBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFFLEtBQUssRUFBSztBQUNyQyxZQUFNLEtBQUssR0FBRyxNQUFLLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFakMsWUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDLENBQUMsRUFBSztBQUNwQyxnQkFBSyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzNCLFdBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUNwQixDQUFDLENBQUM7T0FDSixDQUFDLENBQUM7S0FDSjs7O1NBakJRLGFBQUMsS0FBSyxFQUFFLEVBRWhCO1NBRVEsZUFBRyxFQUVYOzs7U0F2Q2tCLE9BQU87OztxQkFBUCxPQUFPIiwiZmlsZSI6ImVzNi9jb21wb25lbnRzL2J1dHRvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZUNvbnRyb2xsZXIgZnJvbSAnLi9iYXNlLWNvbnRyb2xsZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdXR0b25zIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihsZWdlbmQsIGxhYmVscywgJGNvbnRhaW5lciA9IG51bGwsIGNhbGxiYWNrID0gbnVsbCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnR5cGUgPSAnYnV0dG9ucyc7XG4gICAgdGhpcy5sZWdlbmQgPSBsZWdlbmQgfHzCoCcmbmJzcCc7IC8vIG5vbiBicmVha2FibGUgc3BhY2UgdG8ga2VlcCByZW5kZXJpbmcgY29uc2lzdGVuY3lcbiAgICB0aGlzLmxhYmVscyA9IGxhYmVscztcbiAgICB0aGlzLl9pbmRleCA9IG51bGw7XG5cbiAgICBzdXBlci5fYXBwbHlPcHRpb25uYWxQYXJhbWV0ZXJzKCRjb250YWluZXIsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgY29udGVudCA9IGBcbiAgICAgIDxzcGFuIGNsYXNzPVwibGVnZW5kXCI+JHt0aGlzLmxlZ2VuZH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlclwiPlxuICAgICAgICAke3RoaXMubGFiZWxzLm1hcCgobGFiZWwsIGluZGV4KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidG5cIj5cbiAgICAgICAgICAgICAgJHtsYWJlbH1cbiAgICAgICAgICAgIDwvYT5gO1xuICAgICAgICB9KS5qb2luKCcnKX1cbiAgICAgIDwvZGl2PmA7XG5cbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcih0aGlzLnR5cGUpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiRidXR0b25zID0gQXJyYXkuZnJvbSh0aGlzLiRlbC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuJykpO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG5cbiAgfVxuXG4gIGdldCB2YWx1ZSgpIHtcblxuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLiRidXR0b25zLmZvckVhY2goKCRidG4sIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBsYWJlbCA9IHRoaXMubGFiZWxzW2luZGV4XTtcblxuICAgICAgJGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJywgbGFiZWwpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19