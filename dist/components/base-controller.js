'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Set = require('babel-runtime/core-js/set')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _utilsStyles = require('../utils/styles');

var styles = _interopRequireWildcard(_utilsStyles);

// store all instance in a stack
var stack = new _Set();
var theme = 'light';

// add a single listener on window to trigger update
window.addEventListener('resize', function () {
  stack.forEach(function (controller) {
    return controller.onResize();
  });
});

var BaseController = (function (_events$EventEmitter) {
  _inherits(BaseController, _events$EventEmitter);

  function BaseController() {
    _classCallCheck(this, BaseController);

    _get(Object.getPrototypeOf(BaseController.prototype), 'constructor', this).call(this);

    if (stack.size === 0) {
      styles.insertStyleSheet();
    }

    stack.add(this);
  }

  _createClass(BaseController, [{
    key: '_applyOptionnalParameters',
    value: function _applyOptionnalParameters() {
      var $container = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
      var callback = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      if ($container) {
        if (typeof $container === 'string') {
          $container = document.querySelector($container);
        }

        $container.appendChild(this.render());
        this.onRender();
      }

      if (callback) {
        this.on('change', callback);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var type = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      this.$el = document.createElement('label');
      this.$el.classList.add(styles.ns, theme);
      if (type !== null) {
        this.$el.classList.add(type);
      }

      return this.$el;
    }
  }, {
    key: 'onRender',
    value: function onRender() {
      var _this = this;

      setTimeout(function () {
        return _this.onResize();
      }, 0);
    }
  }, {
    key: 'onResize',
    value: function onResize() {
      var boundingRect = this.$el.getBoundingClientRect();
      var width = boundingRect.width;
      var method = width > 600 ? 'remove' : 'add';

      this.$el.classList[method]('small');
    }

    /**
     *  Interface
     */
  }, {
    key: 'bindEvents',
    value: function bindEvents() {}
  }], [{
    key: 'theme',
    set: function set(value) {
      stack.forEach(function (controller) {
        return controller.$el.classList.remove(theme);
      });
      theme = value;
      stack.forEach(function (controller) {
        return controller.$el.classList.add(theme);
      });
    },
    get: function get() {
      return theme;
    }
  }]);

  return BaseController;
})(_events2['default'].EventEmitter);

exports['default'] = BaseController;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi9jb21wb25lbnRzL2Jhc2UtY29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQkFBbUIsUUFBUTs7OzsyQkFDSCxpQkFBaUI7O0lBQTdCLE1BQU07OztBQUVsQixJQUFNLEtBQUssR0FBRyxVQUFTLENBQUM7QUFDeEIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDOzs7QUFHcEIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxZQUFXO0FBQzNDLE9BQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxVQUFVO1dBQUssVUFBVSxDQUFDLFFBQVEsRUFBRTtHQUFBLENBQUMsQ0FBQztDQUN0RCxDQUFDLENBQUM7O0lBRWtCLGNBQWM7WUFBZCxjQUFjOztBQUN0QixXQURRLGNBQWMsR0FDbkI7MEJBREssY0FBYzs7QUFFL0IsK0JBRmlCLGNBQWMsNkNBRXZCOztBQUVSLFFBQUksS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7QUFDcEIsWUFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUM7S0FDM0I7O0FBRUQsU0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztHQUNqQjs7ZUFUa0IsY0FBYzs7V0FxQlIscUNBQXFDO1VBQXBDLFVBQVUseURBQUcsSUFBSTtVQUFFLFFBQVEseURBQUcsSUFBSTs7QUFDMUQsVUFBSSxVQUFVLEVBQUU7QUFDZCxZQUFJLE9BQU8sVUFBVSxLQUFLLFFBQVEsRUFBRTtBQUNsQyxvQkFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDakQ7O0FBRUQsa0JBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDdEMsWUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO09BQ2pCOztBQUVELFVBQUksUUFBUSxFQUFFO0FBQUUsWUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7T0FBRTtLQUMvQzs7O1dBRUssa0JBQWM7VUFBYixJQUFJLHlEQUFHLElBQUk7O0FBQ2hCLFVBQUksQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMzQyxVQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN6QyxVQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7QUFBRSxZQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7T0FBRTs7QUFFcEQsYUFBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0tBQ2pCOzs7V0FFTyxvQkFBRzs7O0FBQ1QsZ0JBQVUsQ0FBQztlQUFNLE1BQUssUUFBUSxFQUFFO09BQUEsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUN0Qzs7O1dBRU8sb0JBQUc7QUFDVCxVQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLENBQUM7QUFDdEQsVUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztBQUNqQyxVQUFNLE1BQU0sR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLFFBQVEsR0FBRyxLQUFLLENBQUM7O0FBRTlDLFVBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3JDOzs7Ozs7O1dBS1Msc0JBQUcsRUFBRTs7O1NBOUNDLGFBQUMsS0FBSyxFQUFFO0FBQ3RCLFdBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxVQUFVO2VBQUssVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztPQUFBLENBQUMsQ0FBQztBQUN0RSxXQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ2QsV0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFVBQVU7ZUFBSyxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO09BQUEsQ0FBQyxDQUFDO0tBQ3BFO1NBRWUsZUFBRztBQUNqQixhQUFPLEtBQUssQ0FBQztLQUNkOzs7U0FuQmtCLGNBQWM7R0FBUyxvQkFBTyxZQUFZOztxQkFBMUMsY0FBYyIsImZpbGUiOiJlczYvY29tcG9uZW50cy9iYXNlLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXZlbnRzIGZyb20gJ2V2ZW50cyc7XG5pbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi4vdXRpbHMvc3R5bGVzJztcbi8vIHN0b3JlIGFsbCBpbnN0YW5jZSBpbiBhIHN0YWNrXG5jb25zdCBzdGFjayA9IG5ldyBTZXQoKTtcbmxldCB0aGVtZSA9ICdsaWdodCc7XG5cbi8vIGFkZCBhIHNpbmdsZSBsaXN0ZW5lciBvbiB3aW5kb3cgdG8gdHJpZ2dlciB1cGRhdGVcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgc3RhY2suZm9yRWFjaCgoY29udHJvbGxlcikgPT4gY29udHJvbGxlci5vblJlc2l6ZSgpKTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlQ29udHJvbGxlciBleHRlbmRzIGV2ZW50cy5FdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKHN0YWNrLnNpemUgPT09IDApIHtcbiAgICAgIHN0eWxlcy5pbnNlcnRTdHlsZVNoZWV0KCk7XG4gICAgfVxuXG4gICAgc3RhY2suYWRkKHRoaXMpO1xuICB9XG5cbiAgc3RhdGljIHNldCB0aGVtZSh2YWx1ZSkge1xuICAgIHN0YWNrLmZvckVhY2goKGNvbnRyb2xsZXIpID0+IGNvbnRyb2xsZXIuJGVsLmNsYXNzTGlzdC5yZW1vdmUodGhlbWUpKTtcbiAgICB0aGVtZSA9IHZhbHVlO1xuICAgIHN0YWNrLmZvckVhY2goKGNvbnRyb2xsZXIpID0+IGNvbnRyb2xsZXIuJGVsLmNsYXNzTGlzdC5hZGQodGhlbWUpKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgdGhlbWUoKSB7XG4gICAgcmV0dXJuIHRoZW1lO1xuICB9XG5cbiAgX2FwcGx5T3B0aW9ubmFsUGFyYW1ldGVycygkY29udGFpbmVyID0gbnVsbCwgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgaWYgKCRjb250YWluZXIpIHtcbiAgICAgIGlmICh0eXBlb2YgJGNvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgJGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJGNvbnRhaW5lcik7XG4gICAgICB9XG5cbiAgICAgICRjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXIoKSk7XG4gICAgICB0aGlzLm9uUmVuZGVyKCk7XG4gICAgfVxuXG4gICAgaWYgKGNhbGxiYWNrKSB7IHRoaXMub24oJ2NoYW5nZScsIGNhbGxiYWNrKTsgfVxuICB9XG5cbiAgcmVuZGVyKHR5cGUgPSBudWxsKSB7XG4gICAgdGhpcy4kZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoc3R5bGVzLm5zLCB0aGVtZSk7XG4gICAgaWYgKHR5cGUgIT09IG51bGwpIHsgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZCh0eXBlKTsgfVxuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgb25SZW5kZXIoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLm9uUmVzaXplKCksIDApO1xuICB9XG5cbiAgb25SZXNpemUoKSB7XG4gICAgY29uc3QgYm91bmRpbmdSZWN0ID0gdGhpcy4kZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3Qgd2lkdGggPSBib3VuZGluZ1JlY3Qud2lkdGg7XG4gICAgY29uc3QgbWV0aG9kID0gd2lkdGggPiA2MDAgPyAncmVtb3ZlJyA6ICdhZGQnO1xuXG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0W21ldGhvZF0oJ3NtYWxsJyk7XG4gIH1cblxuICAvKipcbiAgICogIEludGVyZmFjZVxuICAgKi9cbiAgYmluZEV2ZW50cygpIHt9XG59XG5cbiJdfQ==