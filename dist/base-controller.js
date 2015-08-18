'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

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
      var _this = this;

      var $container = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
      var callback = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

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
      this.$el.classList.add(styles.ns, theme);

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
})(events.EventEmitter);

BaseController.theme = 'light';

module.exports = BaseController;
//# sourceMappingURL=data:application/json;base64,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RS9CLE1BQU0sQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDIiwiZmlsZSI6ImVzNi9iYXNlLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBldmVudHMgPSByZXF1aXJlKCdldmVudHMnKTtcbmNvbnN0IHN0eWxlcyA9IHJlcXVpcmUoJy4vdXRpbHMvc3R5bGVzJyk7XG4vLyBzdG9yZSBhbGwgaW5zdGFuY2UgaW4gYSBzdGFja1xuY29uc3Qgc3RhY2sgPSBuZXcgU2V0KCk7XG5sZXQgdGhlbWU7XG5cbi8vIGFkZCBhIHNpbmdsZSBsaXN0ZW5lciBvbiB3aW5kb3cgdG8gdHJpZ2dlciB1cGRhdGVcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgc3RhY2suZm9yRWFjaCgoY29udHJvbGxlcikgPT4gY29udHJvbGxlci5vblJlc2l6ZSgpKTtcbn0pO1xuXG5jbGFzcyBCYXNlQ29udHJvbGxlciBleHRlbmRzIGV2ZW50cy5FdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIGlmIChzdGFjay5zaXplID09PSAwKSB7IHN0eWxlcy5pbnNlcnRTdHlsZVNoZWV0KCk7IH1cbiAgICBzdGFjay5hZGQodGhpcyk7XG4gIH1cblxuICBzdGF0aWMgc2V0IHRoZW1lKHZhbHVlKSB7XG4gICAgc3RhY2suZm9yRWFjaCgoY29udHJvbGxlcikgPT4gY29udHJvbGxlci4kZWwuY2xhc3NMaXN0LnJlbW92ZSh0aGVtZSkpO1xuICAgIHRoZW1lID0gdmFsdWU7XG4gICAgc3RhY2suZm9yRWFjaCgoY29udHJvbGxlcikgPT4gY29udHJvbGxlci4kZWwuY2xhc3NMaXN0LmFkZCh0aGVtZSkpO1xuICB9XG5cbiAgc3RhdGljIGdldCB0aGVtZSgpIHtcbiAgICByZXR1cm4gdGhlbWU7XG4gIH1cblxuICBfYXBwbHlPcHRpb25uYWxQYXJhbWV0ZXJzKCRjb250YWluZXIgPSBudWxsLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBpZiAoJGNvbnRhaW5lcikge1xuICAgICAgaWYgKHR5cGVvZiAkY29udGFpbmVyID09PSAnc3RyaW5nJykge1xuICAgICAgICAkY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigkY29udGFpbmVyKTtcbiAgICAgIH1cblxuICAgICAgJGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcigpKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5vblJlc2l6ZSgpLCAwKTtcbiAgICB9XG5cbiAgICBpZiAoY2FsbGJhY2spIHsgdGhpcy5vbignY2hhbmdlJywgY2FsbGJhY2spOyB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy4kZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoc3R5bGVzLm5zLCB0aGVtZSk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBvblJlc2l6ZSgpIHtcbiAgICBjb25zdCBib3VuZGluZ1JlY3QgPSB0aGlzLiRlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB3aWR0aCA9IGJvdW5kaW5nUmVjdC53aWR0aDtcbiAgICBjb25zdCBtZXRob2QgPSB3aWR0aCA+IDYwMCA/ICdyZW1vdmUnIDogJ2FkZCc7XG5cbiAgICB0aGlzLiRlbC5jbGFzc0xpc3RbbWV0aG9kXSgnc21hbGwnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgSW50ZXJmYWNlXG4gICAqL1xuICBiaW5kRXZlbnRzKCkge31cbn1cblxuQmFzZUNvbnRyb2xsZXIudGhlbWUgPSAnbGlnaHQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VDb250cm9sbGVyO1xuIl19