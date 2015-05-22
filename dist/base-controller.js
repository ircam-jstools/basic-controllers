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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNzcy9zdHlsZXMuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7QUFFekMsSUFBTSxLQUFLLEdBQUcsVUFBUyxDQUFDOzs7QUFHeEIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxZQUFXO0FBQzNDLE9BQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxVQUFVO1dBQUssVUFBVSxDQUFDLFFBQVEsRUFBRTtHQUFBLENBQUMsQ0FBQztDQUN0RCxDQUFDLENBQUM7O0lBRUcsY0FBYztBQUNQLFdBRFAsY0FBYyxHQUNKOzBCQURWLGNBQWM7O0FBRWhCLCtCQUZFLGNBQWMsNkNBRVI7QUFDUixRQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFO0FBQUUsWUFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUM7S0FBRTtBQUNwRCxTQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQ2pCOztZQUxHLGNBQWM7O2VBQWQsY0FBYzs7V0FPTyxxQ0FBcUM7OztVQUFwQyxVQUFVLGdDQUFHLElBQUk7VUFBRSxRQUFRLGdDQUFHLElBQUk7O0FBQzFELFVBQUksVUFBVSxFQUFFO0FBQ2QsWUFBSSxPQUFPLFVBQVUsS0FBSyxRQUFRLEVBQUU7QUFDbEMsb0JBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ2pEOztBQUVELGtCQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBQ3RDLGtCQUFVLENBQUM7aUJBQU0sTUFBSyxRQUFRLEVBQUU7U0FBQSxFQUFFLENBQUMsQ0FBQyxDQUFDO09BQ3RDOztBQUVELFVBQUksUUFBUSxFQUFFO0FBQUUsWUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7T0FBRTtLQUMvQzs7O1dBRUssa0JBQUc7QUFDUCxVQUFJLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0MsVUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQzs7QUFFbEMsYUFBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0tBQ2pCOzs7V0FFTyxvQkFBRztBQUNULFVBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsQ0FBQztBQUN0RCxVQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO0FBQ2pDLFVBQU0sTUFBTSxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsUUFBUSxHQUFHLEtBQUssQ0FBQzs7QUFFOUMsVUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDckM7Ozs7Ozs7V0FLUyxzQkFBRyxFQUFFOzs7U0F0Q1gsY0FBYztHQUFTLE1BQU0sQ0FBQyxZQUFZOztBQXlDaEQsTUFBTSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMiLCJmaWxlIjoiY3NzL3N0eWxlcy5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBldmVudHMgPSByZXF1aXJlKCdldmVudHMnKTtcbmNvbnN0IHN0eWxlcyA9IHJlcXVpcmUoJy4vdXRpbHMvc3R5bGVzJyk7XG4vLyBzdG9yZSBhbGwgaW5zdGFuY2UgaW4gYSBzdGFja1xuY29uc3Qgc3RhY2sgPSBuZXcgU2V0KCk7XG5cbi8vIGFkZCBhIHNpbmdsZSBsaXN0ZW5lciBvbiB3aW5kb3cgdG8gdHJpZ2dlciB1cGRhdGVcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgc3RhY2suZm9yRWFjaCgoY29udHJvbGxlcikgPT4gY29udHJvbGxlci5vblJlc2l6ZSgpKTtcbn0pO1xuXG5jbGFzcyBCYXNlQ29udHJvbGxlciBleHRlbmRzIGV2ZW50cy5FdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIGlmIChzdGFjay5zaXplID09PSAwKSB7IHN0eWxlcy5pbnNlcnRTdHlsZVNoZWV0KCk7IH1cbiAgICBzdGFjay5hZGQodGhpcyk7XG4gIH1cblxuICBfYXBwbHlPcHRpb25uYWxQYXJhbWV0ZXJzKCRjb250YWluZXIgPSBudWxsLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBpZiAoJGNvbnRhaW5lcikge1xuICAgICAgaWYgKHR5cGVvZiAkY29udGFpbmVyID09PSAnc3RyaW5nJykge1xuICAgICAgICAkY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigkY29udGFpbmVyKTtcbiAgICAgIH1cblxuICAgICAgJGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcigpKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5vblJlc2l6ZSgpLCAwKTtcbiAgICB9XG5cbiAgICBpZiAoY2FsbGJhY2spIHsgdGhpcy5vbignY2hhbmdlJywgY2FsbGJhY2spOyB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy4kZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoc3R5bGVzLm5zKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIG9uUmVzaXplKCkge1xuICAgIGNvbnN0IGJvdW5kaW5nUmVjdCA9IHRoaXMuJGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHdpZHRoID0gYm91bmRpbmdSZWN0LndpZHRoO1xuICAgIGNvbnN0IG1ldGhvZCA9IHdpZHRoID4gNjAwID8gJ3JlbW92ZScgOiAnYWRkJztcblxuICAgIHRoaXMuJGVsLmNsYXNzTGlzdFttZXRob2RdKCdzbWFsbCcpO1xuICB9XG5cbiAgLyoqXG4gICAqICBJbnRlcmZhY2VcbiAgICovXG4gIGJpbmRFdmVudHMoKSB7fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VDb250cm9sbGVyO1xuIl19