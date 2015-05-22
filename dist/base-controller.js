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
  }]);

  return BaseController;
})(events.EventEmitter);

module.exports = BaseController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi9iYXNlLWNvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOztBQUV6QyxJQUFNLEtBQUssR0FBRyxVQUFTLENBQUM7OztBQUd4QixNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFlBQVc7QUFDM0MsT0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFVBQVU7V0FBSyxVQUFVLENBQUMsUUFBUSxFQUFFO0dBQUEsQ0FBQyxDQUFDO0NBQ3RELENBQUMsQ0FBQzs7SUFFRyxjQUFjO0FBQ1AsV0FEUCxjQUFjLEdBQ0o7MEJBRFYsY0FBYzs7QUFFaEIsK0JBRkUsY0FBYyw2Q0FFUjtBQUNSLFFBQUksS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7QUFBRSxZQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztLQUFFO0FBQ3BELFNBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDakI7O1lBTEcsY0FBYzs7ZUFBZCxjQUFjOztXQU9PLHFDQUFxQzs7O1VBQXBDLFVBQVUsZ0NBQUcsSUFBSTtVQUFFLFFBQVEsZ0NBQUcsSUFBSTs7QUFDMUQsVUFBSSxVQUFVLEVBQUU7QUFDZCxZQUFJLE9BQU8sVUFBVSxLQUFLLFFBQVEsRUFBRTtBQUNsQyxvQkFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDakQ7O0FBRUQsa0JBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDdEMsa0JBQVUsQ0FBQztpQkFBTSxNQUFLLFFBQVEsRUFBRTtTQUFBLEVBQUUsQ0FBQyxDQUFDLENBQUM7T0FDdEM7O0FBRUQsVUFBSSxRQUFRLEVBQUU7QUFBRSxZQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztPQUFFO0tBQy9DOzs7V0FFSyxrQkFBRztBQUNQLFVBQUksQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMzQyxVQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDOztBQUVsQyxhQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7S0FDakI7OztXQUVPLG9CQUFHO0FBQ1QsVUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0FBQ3RELFVBQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7QUFDakMsVUFBTSxNQUFNLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxRQUFRLEdBQUcsS0FBSyxDQUFDOztBQUU5QyxVQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNyQzs7Ozs7OztXQUtTLHNCQUFHLEVBQUU7OztTQXRDWCxjQUFjO0dBQVMsTUFBTSxDQUFDLFlBQVk7O0FBeUNoRCxNQUFNLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQyIsImZpbGUiOiJlczYvYmFzZS1jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJyk7XG5jb25zdCBzdHlsZXMgPSByZXF1aXJlKCcuL3V0aWxzL3N0eWxlcycpO1xuLy8gc3RvcmUgYWxsIGluc3RhbmNlIGluIGEgc3RhY2tcbmNvbnN0IHN0YWNrID0gbmV3IFNldCgpO1xuXG4vLyBhZGQgYSBzaW5nbGUgbGlzdGVuZXIgb24gd2luZG93IHRvIHRyaWdnZXIgdXBkYXRlXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24oKSB7XG4gIHN0YWNrLmZvckVhY2goKGNvbnRyb2xsZXIpID0+IGNvbnRyb2xsZXIub25SZXNpemUoKSk7XG59KTtcblxuY2xhc3MgQmFzZUNvbnRyb2xsZXIgZXh0ZW5kcyBldmVudHMuRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICBpZiAoc3RhY2suc2l6ZSA9PT0gMCkgeyBzdHlsZXMuaW5zZXJ0U3R5bGVTaGVldCgpOyB9XG4gICAgc3RhY2suYWRkKHRoaXMpO1xuICB9XG5cbiAgX2FwcGx5T3B0aW9ubmFsUGFyYW1ldGVycygkY29udGFpbmVyID0gbnVsbCwgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgaWYgKCRjb250YWluZXIpIHtcbiAgICAgIGlmICh0eXBlb2YgJGNvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgJGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJGNvbnRhaW5lcik7XG4gICAgICB9XG5cbiAgICAgICRjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXIoKSk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMub25SZXNpemUoKSwgMCk7XG4gICAgfVxuXG4gICAgaWYgKGNhbGxiYWNrKSB7IHRoaXMub24oJ2NoYW5nZScsIGNhbGxiYWNrKTsgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuJGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKHN0eWxlcy5ucyk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBvblJlc2l6ZSgpIHtcbiAgICBjb25zdCBib3VuZGluZ1JlY3QgPSB0aGlzLiRlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB3aWR0aCA9IGJvdW5kaW5nUmVjdC53aWR0aDtcbiAgICBjb25zdCBtZXRob2QgPSB3aWR0aCA+IDYwMCA/ICdyZW1vdmUnIDogJ2FkZCc7XG5cbiAgICB0aGlzLiRlbC5jbGFzc0xpc3RbbWV0aG9kXSgnc21hbGwnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgSW50ZXJmYWNlXG4gICAqL1xuICBiaW5kRXZlbnRzKCkge31cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlQ29udHJvbGxlcjtcbiJdfQ==