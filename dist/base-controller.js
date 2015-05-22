'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _get = require('babel-runtime/helpers/get')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Set = require('babel-runtime/core-js/set')['default'];

var events = require('events');
var styles = require('./utils/styles');
// store all instance in a stack
var stack = new _Set();
var theme = undefined;

// add a single listener on window to trigger update
window.addEventListener('resize', function () {
  stack.forEach(function (controller) {
    return controller.onResize();
  });
});

var BaseController = (function (_events$EventEmitter) {
  function BaseController() {
    _classCallCheck(this, BaseController);

    _get(Object.getPrototypeOf(BaseController.prototype), 'constructor', this).call(this);
    if (stack.size === 0) {
      styles.insertStyleSheet();
    }
    stack.add(this);
  }

  _inherits(BaseController, _events$EventEmitter);

  _createClass(BaseController, [{
    key: '_applyOptionnalParameters',
    value: function _applyOptionnalParameters() {
      var _this = this;

      var $container = arguments[0] === undefined ? null : arguments[0];
      var callback = arguments[1] === undefined ? null : arguments[1];

      if ($container) {
        if (typeof $container === 'string') {
          $container = document.querySelector($container);
        }

        $container.appendChild(this.render());
        setTimeout(function () {
          return _this.onResize();
        }, 0);
      }

      if (callback) {
        this.on('change', callback);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      this.$el = document.createElement('label');
      this.$el.classList.add(styles.ns);

      return this.$el;
    }
  }, {
    key: 'onResize',
    value: function onResize() {
      var boundingRect = this.$el.getBoundingClientRect();
      var width = boundingRect.width;
      var method = width > 600 ? 'remove' : 'add';

      this.$el.classList[method]('small');
    }
  }, {
    key: 'bindEvents',

    /**
     *  Interface
     */
    value: function bindEvents() {}
  }], [{
    key: 'theme',
    set: function (value) {
      stack.forEach(function (controller) {
        return controller.$el.classList.remove(theme);
      });
      theme = value;
      stack.forEach(function (controller) {
        return controller.$el.classList.add(theme);
      });
    }
  }]);

  return BaseController;
})(events.EventEmitter);

BaseController.theme = 'light';

module.exports = BaseController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi91dGlscy9zdHlsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOztBQUV6QyxJQUFNLEtBQUssR0FBRyxVQUFTLENBQUM7QUFDeEIsSUFBSSxLQUFLLFlBQUEsQ0FBQzs7O0FBR1YsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxZQUFXO0FBQzNDLE9BQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxVQUFVO1dBQUssVUFBVSxDQUFDLFFBQVEsRUFBRTtHQUFBLENBQUMsQ0FBQztDQUN0RCxDQUFDLENBQUM7O0lBRUcsY0FBYztBQUNQLFdBRFAsY0FBYyxHQUNKOzBCQURWLGNBQWM7O0FBRWhCLCtCQUZFLGNBQWMsNkNBRVI7QUFDUixRQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFO0FBQUUsWUFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUM7S0FBRTtBQUNwRCxTQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQ2pCOztZQUxHLGNBQWM7O2VBQWQsY0FBYzs7V0FhTyxxQ0FBcUM7OztVQUFwQyxVQUFVLGdDQUFHLElBQUk7VUFBRSxRQUFRLGdDQUFHLElBQUk7O0FBQzFELFVBQUksVUFBVSxFQUFFO0FBQ2QsWUFBSSxPQUFPLFVBQVUsS0FBSyxRQUFRLEVBQUU7QUFDbEMsb0JBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ2pEOztBQUVELGtCQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBQ3RDLGtCQUFVLENBQUM7aUJBQU0sTUFBSyxRQUFRLEVBQUU7U0FBQSxFQUFFLENBQUMsQ0FBQyxDQUFDO09BQ3RDOztBQUVELFVBQUksUUFBUSxFQUFFO0FBQUUsWUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7T0FBRTtLQUMvQzs7O1dBRUssa0JBQUc7QUFDUCxVQUFJLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0MsVUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQzs7QUFFbEMsYUFBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0tBQ2pCOzs7V0FFTyxvQkFBRztBQUNULFVBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsQ0FBQztBQUN0RCxVQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO0FBQ2pDLFVBQU0sTUFBTSxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsUUFBUSxHQUFHLEtBQUssQ0FBQzs7QUFFOUMsVUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDckM7Ozs7Ozs7V0FLUyxzQkFBRyxFQUFFOzs7U0FyQ0MsVUFBQyxLQUFLLEVBQUU7QUFDdEIsV0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFVBQVU7ZUFBSyxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO09BQUEsQ0FBQyxDQUFDO0FBQ3RFLFdBQUssR0FBRyxLQUFLLENBQUM7QUFDZCxXQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsVUFBVTtlQUFLLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7T0FBQSxDQUFDLENBQUM7S0FDcEU7OztTQVhHLGNBQWM7R0FBUyxNQUFNLENBQUMsWUFBWTs7QUErQ2hELGNBQWMsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDOztBQUUvQixNQUFNLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQyIsImZpbGUiOiJlczYvdXRpbHMvc3R5bGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJyk7XG5jb25zdCBzdHlsZXMgPSByZXF1aXJlKCcuL3V0aWxzL3N0eWxlcycpO1xuLy8gc3RvcmUgYWxsIGluc3RhbmNlIGluIGEgc3RhY2tcbmNvbnN0IHN0YWNrID0gbmV3IFNldCgpO1xubGV0IHRoZW1lO1xuXG4vLyBhZGQgYSBzaW5nbGUgbGlzdGVuZXIgb24gd2luZG93IHRvIHRyaWdnZXIgdXBkYXRlXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24oKSB7XG4gIHN0YWNrLmZvckVhY2goKGNvbnRyb2xsZXIpID0+IGNvbnRyb2xsZXIub25SZXNpemUoKSk7XG59KTtcblxuY2xhc3MgQmFzZUNvbnRyb2xsZXIgZXh0ZW5kcyBldmVudHMuRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICBpZiAoc3RhY2suc2l6ZSA9PT0gMCkgeyBzdHlsZXMuaW5zZXJ0U3R5bGVTaGVldCgpOyB9XG4gICAgc3RhY2suYWRkKHRoaXMpO1xuICB9XG5cbiAgc3RhdGljIHNldCB0aGVtZSh2YWx1ZSkge1xuICAgIHN0YWNrLmZvckVhY2goKGNvbnRyb2xsZXIpID0+IGNvbnRyb2xsZXIuJGVsLmNsYXNzTGlzdC5yZW1vdmUodGhlbWUpKTtcbiAgICB0aGVtZSA9IHZhbHVlO1xuICAgIHN0YWNrLmZvckVhY2goKGNvbnRyb2xsZXIpID0+IGNvbnRyb2xsZXIuJGVsLmNsYXNzTGlzdC5hZGQodGhlbWUpKTtcbiAgfVxuXG4gIF9hcHBseU9wdGlvbm5hbFBhcmFtZXRlcnMoJGNvbnRhaW5lciA9IG51bGwsIGNhbGxiYWNrID0gbnVsbCkge1xuICAgIGlmICgkY29udGFpbmVyKSB7XG4gICAgICBpZiAodHlwZW9mICRjb250YWluZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICRjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCRjb250YWluZXIpO1xuICAgICAgfVxuXG4gICAgICAkY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyKCkpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLm9uUmVzaXplKCksIDApO1xuICAgIH1cblxuICAgIGlmIChjYWxsYmFjaykgeyB0aGlzLm9uKCdjaGFuZ2UnLCBjYWxsYmFjayk7IH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLiRlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZChzdHlsZXMubnMpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgb25SZXNpemUoKSB7XG4gICAgY29uc3QgYm91bmRpbmdSZWN0ID0gdGhpcy4kZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3Qgd2lkdGggPSBib3VuZGluZ1JlY3Qud2lkdGg7XG4gICAgY29uc3QgbWV0aG9kID0gd2lkdGggPiA2MDAgPyAncmVtb3ZlJyA6ICdhZGQnO1xuXG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0W21ldGhvZF0oJ3NtYWxsJyk7XG4gIH1cblxuICAvKipcbiAgICogIEludGVyZmFjZVxuICAgKi9cbiAgYmluZEV2ZW50cygpIHt9XG59XG5cbkJhc2VDb250cm9sbGVyLnRoZW1lID0gJ2xpZ2h0JztcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlQ29udHJvbGxlcjtcbiJdfQ==