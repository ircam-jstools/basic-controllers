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
    stack.add(this);
  }

  _inherits(BaseController, _events$EventEmitter);

  _createClass(BaseController, [{
    key: '_applyOptionnalParameters',
    value: function _applyOptionnalParameters() {
      var $container = arguments[0] === undefined ? null : arguments[0];
      var callback = arguments[1] === undefined ? null : arguments[1];

      if ($container) {
        if (typeof $container === 'string') {
          $container = document.querySelector($container);
        }

        $container.appendChild(this.render());
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
  }]);

  return BaseController;
})(events.EventEmitter);

module.exports = BaseController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi91dGlscy9zdHlsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOztBQUV6QyxJQUFNLEtBQUssR0FBRyxVQUFTLENBQUM7OztBQUd4QixNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFlBQVc7QUFDM0MsT0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFVBQVU7V0FBSyxVQUFVLENBQUMsUUFBUSxFQUFFO0dBQUEsQ0FBQyxDQUFDO0NBQ3RELENBQUMsQ0FBQzs7SUFFRyxjQUFjO0FBQ1AsV0FEUCxjQUFjLEdBQ0o7MEJBRFYsY0FBYzs7QUFFaEIsK0JBRkUsY0FBYyw2Q0FFUjtBQUNSLFNBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDakI7O1lBSkcsY0FBYzs7ZUFBZCxjQUFjOztXQU1PLHFDQUFxQztVQUFwQyxVQUFVLGdDQUFHLElBQUk7VUFBRSxRQUFRLGdDQUFHLElBQUk7O0FBQzFELFVBQUksVUFBVSxFQUFFO0FBQ2QsWUFBSSxPQUFPLFVBQVUsS0FBSyxRQUFRLEVBQUU7QUFDbEMsb0JBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ2pEOztBQUVELGtCQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO09BQ3ZDOztBQUVELFVBQUksUUFBUSxFQUFFO0FBQUUsWUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7T0FBRTtLQUMvQzs7O1dBRUssa0JBQUc7QUFDUCxVQUFJLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0MsVUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNsQyxVQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7O0FBRWhCLGFBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztLQUNqQjs7O1dBRU8sb0JBQUc7QUFDVCxVQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLENBQUM7QUFDdEQsVUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztBQUNqQyxVQUFNLE1BQU0sR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLFFBQVEsR0FBRyxLQUFLLENBQUM7O0FBRTlDLFVBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3JDOzs7Ozs7O1dBS1Msc0JBQUcsRUFBRTs7O1NBckNYLGNBQWM7R0FBUyxNQUFNLENBQUMsWUFBWTs7QUF3Q2hELE1BQU0sQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDIiwiZmlsZSI6ImVzNi91dGlscy9zdHlsZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBldmVudHMgPSByZXF1aXJlKCdldmVudHMnKTtcbmNvbnN0IHN0eWxlcyA9IHJlcXVpcmUoJy4vdXRpbHMvc3R5bGVzJyk7XG4vLyBzdG9yZSBhbGwgaW5zdGFuY2UgaW4gYSBzdGFja1xuY29uc3Qgc3RhY2sgPSBuZXcgU2V0KCk7XG5cbi8vIGFkZCBhIHNpbmdsZSBsaXN0ZW5lciBvbiB3aW5kb3cgdG8gdHJpZ2dlciB1cGRhdGVcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgc3RhY2suZm9yRWFjaCgoY29udHJvbGxlcikgPT4gY29udHJvbGxlci5vblJlc2l6ZSgpKTtcbn0pO1xuXG5jbGFzcyBCYXNlQ29udHJvbGxlciBleHRlbmRzIGV2ZW50cy5FdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHN0YWNrLmFkZCh0aGlzKTtcbiAgfVxuXG4gIF9hcHBseU9wdGlvbm5hbFBhcmFtZXRlcnMoJGNvbnRhaW5lciA9IG51bGwsIGNhbGxiYWNrID0gbnVsbCkge1xuICAgIGlmICgkY29udGFpbmVyKSB7XG4gICAgICBpZiAodHlwZW9mICRjb250YWluZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICRjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCRjb250YWluZXIpO1xuICAgICAgfVxuXG4gICAgICAkY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyKCkpO1xuICAgIH1cblxuICAgIGlmIChjYWxsYmFjaykgeyB0aGlzLm9uKCdjaGFuZ2UnLCBjYWxsYmFjayk7IH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLiRlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZChzdHlsZXMubnMpO1xuICAgIHRoaXMub25SZXNpemUoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIG9uUmVzaXplKCkge1xuICAgIGNvbnN0IGJvdW5kaW5nUmVjdCA9IHRoaXMuJGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHdpZHRoID0gYm91bmRpbmdSZWN0LndpZHRoO1xuICAgIGNvbnN0IG1ldGhvZCA9IHdpZHRoID4gNjAwID8gJ3JlbW92ZScgOiAnYWRkJztcblxuICAgIHRoaXMuJGVsLmNsYXNzTGlzdFttZXRob2RdKCdzbWFsbCcpO1xuICB9XG5cbiAgLyoqXG4gICAqICBJbnRlcmZhY2VcbiAgICovXG4gIGJpbmRFdmVudHMoKSB7fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VDb250cm9sbGVyO1xuIl19