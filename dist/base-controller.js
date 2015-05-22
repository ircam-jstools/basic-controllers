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
      this.onResize();

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
//# sourceMappingURL=data:application/json;base64,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QU8sR0FBRyxjQUFjLENBQUMiLCJmaWxlIjoiZXM2L2Jhc2UtY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpO1xuY29uc3Qgc3R5bGVzID0gcmVxdWlyZSgnLi91dGlscy9zdHlsZXMnKTtcbi8vIHN0b3JlIGFsbCBpbnN0YW5jZSBpbiBhIHN0YWNrXG5jb25zdCBzdGFjayA9IG5ldyBTZXQoKTtcbmxldCB0aGVtZTtcblxuLy8gYWRkIGEgc2luZ2xlIGxpc3RlbmVyIG9uIHdpbmRvdyB0byB0cmlnZ2VyIHVwZGF0ZVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uKCkge1xuICBzdGFjay5mb3JFYWNoKChjb250cm9sbGVyKSA9PiBjb250cm9sbGVyLm9uUmVzaXplKCkpO1xufSk7XG5cbmNsYXNzIEJhc2VDb250cm9sbGVyIGV4dGVuZHMgZXZlbnRzLkV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKHN0YWNrLnNpemUgPT09IDApIHsgc3R5bGVzLmluc2VydFN0eWxlU2hlZXQoKTsgfVxuICAgIHN0YWNrLmFkZCh0aGlzKTtcbiAgfVxuXG4gIHN0YXRpYyBzZXQgdGhlbWUodmFsdWUpIHtcbiAgICBzdGFjay5mb3JFYWNoKChjb250cm9sbGVyKSA9PiBjb250cm9sbGVyLiRlbC5jbGFzc0xpc3QucmVtb3ZlKHRoZW1lKSk7XG4gICAgdGhlbWUgPSB2YWx1ZTtcbiAgICBzdGFjay5mb3JFYWNoKChjb250cm9sbGVyKSA9PiBjb250cm9sbGVyLiRlbC5jbGFzc0xpc3QuYWRkKHRoZW1lKSk7XG4gIH1cblxuICBfYXBwbHlPcHRpb25uYWxQYXJhbWV0ZXJzKCRjb250YWluZXIgPSBudWxsLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBpZiAoJGNvbnRhaW5lcikge1xuICAgICAgaWYgKHR5cGVvZiAkY29udGFpbmVyID09PSAnc3RyaW5nJykge1xuICAgICAgICAkY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigkY29udGFpbmVyKTtcbiAgICAgIH1cblxuICAgICAgJGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcigpKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5vblJlc2l6ZSgpLCAwKTtcbiAgICB9XG5cbiAgICBpZiAoY2FsbGJhY2spIHsgdGhpcy5vbignY2hhbmdlJywgY2FsbGJhY2spOyB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy4kZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoc3R5bGVzLm5zKTtcbiAgICB0aGlzLm9uUmVzaXplKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBvblJlc2l6ZSgpIHtcbiAgICBjb25zdCBib3VuZGluZ1JlY3QgPSB0aGlzLiRlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB3aWR0aCA9IGJvdW5kaW5nUmVjdC53aWR0aDtcbiAgICBjb25zdCBtZXRob2QgPSB3aWR0aCA+IDYwMCA/ICdyZW1vdmUnIDogJ2FkZCc7XG5cbiAgICB0aGlzLiRlbC5jbGFzc0xpc3RbbWV0aG9kXSgnc21hbGwnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgSW50ZXJmYWNlXG4gICAqL1xuICBiaW5kRXZlbnRzKCkge31cbn1cblxuQmFzZUNvbnRyb2xsZXIudGhlbWUgPSAnbGlnaHQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VDb250cm9sbGVyO1xuIl19