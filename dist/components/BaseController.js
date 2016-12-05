'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _styles = require('../utils/styles');

var styles = _interopRequireWildcard(_styles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// keep track of all instaciated controllers
var controllers = new Set();
// default theme
var theme = 'light';

/** @module basic-controller */

/**
 * Base class to create new controllers.
 *
 * @param {String} type - String describing the type of the controller.
 * @param {Object} defaults - Default parameters of the controller.
 * @param {Object} config - User defined configuration options.
 */

var BaseController = function () {
  function BaseController(type, defaults) {
    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, BaseController);

    this.type = type;
    this.params = Object.assign({}, defaults, config);
    // insert styles and listen window resize when the first controller is created
    if (controllers.size === 0) {
      styles.insertStyleSheet();

      window.addEventListener('resize', function () {
        controllers.forEach(function (controller) {
          return controller.onResize();
        });
      });
    }

    controllers.add(this);

    this._listeners = new Set();
  }

  /**
   * Theme of the controllers
   * @type {String}
   * @private
   */


  _createClass(BaseController, [{
    key: 'initialize',


    /**
     * Mandatory method to be called at the end of a constructor.
     * @private
     */
    value: function initialize() {
      var callback = this.params.callback;
      var $container = this.params.container;

      if ($container) {
        // css selector
        if (typeof $container === 'string') $container = document.querySelector($container);
        // group
        else if ($container instanceof BaseController && $container.$container) $container = $container.$container;

        $container.appendChild(this.render());
        this.onRender();
      }

      if (callback) this.addListener(callback);
    }

    /**
     * Add a listener to the controller.
     *
     * @param {Function} callback - Function to be applied when the controller
     *  state change.
     */

  }, {
    key: 'addListener',
    value: function addListener(callback) {
      this._listeners.add(callback);
    }

    /**
     * Remove a listener from the controller.
     *
     * @param {Function} callback - Function to remove from the listeners.
     */

  }, {
    key: 'removeListener',
    value: function removeListener(callback) {
      this._listeners.remove(callback);
    }

    /** @private */

  }, {
    key: 'executeListeners',
    value: function executeListeners() {
      for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }

      this._listeners.forEach(function (callback) {
        return callback.apply(undefined, values);
      });
    }

    /** @private */

  }, {
    key: 'render',
    value: function render() {
      this.$el = document.createElement('div');
      this.$el.classList.add(styles.ns, theme, this.type);

      return this.$el;
    }

    /** @private */

  }, {
    key: 'onRender',
    value: function onRender() {
      var _this = this;

      setTimeout(function () {
        return _this.onResize();
      }, 0);
    }

    /** @private */

  }, {
    key: 'onResize',
    value: function onResize() {
      var boundingRect = this.$el.getBoundingClientRect();
      var width = boundingRect.width;
      var method = width > 600 ? 'remove' : 'add';

      this.$el.classList[method]('small');
    }

    /** @private */

  }, {
    key: 'bindEvents',
    value: function bindEvents() {}
  }], [{
    key: 'theme',
    set: function set(value) {
      controllers.forEach(function (controller) {
        return controller.$el.classList.remove(theme);
      });
      theme = value;
      controllers.forEach(function (controller) {
        return controller.$el.classList.add(theme);
      });
    },
    get: function get() {
      return theme;
    }
  }]);

  return BaseController;
}();

exports.default = BaseController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJhc2VDb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbInN0eWxlcyIsImNvbnRyb2xsZXJzIiwiU2V0IiwidGhlbWUiLCJCYXNlQ29udHJvbGxlciIsInR5cGUiLCJkZWZhdWx0cyIsImNvbmZpZyIsInBhcmFtcyIsIk9iamVjdCIsImFzc2lnbiIsInNpemUiLCJpbnNlcnRTdHlsZVNoZWV0Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImZvckVhY2giLCJjb250cm9sbGVyIiwib25SZXNpemUiLCJhZGQiLCJfbGlzdGVuZXJzIiwiY2FsbGJhY2siLCIkY29udGFpbmVyIiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYXBwZW5kQ2hpbGQiLCJyZW5kZXIiLCJvblJlbmRlciIsImFkZExpc3RlbmVyIiwicmVtb3ZlIiwidmFsdWVzIiwiJGVsIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsIm5zIiwic2V0VGltZW91dCIsImJvdW5kaW5nUmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIndpZHRoIiwibWV0aG9kIiwidmFsdWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0lBQVlBLE07Ozs7OztBQUVaO0FBQ0EsSUFBTUMsY0FBYyxJQUFJQyxHQUFKLEVBQXBCO0FBQ0E7QUFDQSxJQUFJQyxRQUFRLE9BQVo7O0FBRUE7O0FBRUE7Ozs7Ozs7O0lBT01DLGM7QUFDSiwwQkFBWUMsSUFBWixFQUFrQkMsUUFBbEIsRUFBeUM7QUFBQSxRQUFiQyxNQUFhLHVFQUFKLEVBQUk7O0FBQUE7O0FBQ3ZDLFNBQUtGLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtHLE1BQUwsR0FBY0MsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JKLFFBQWxCLEVBQTRCQyxNQUE1QixDQUFkO0FBQ0E7QUFDQSxRQUFJTixZQUFZVSxJQUFaLEtBQXFCLENBQXpCLEVBQTRCO0FBQzFCWCxhQUFPWSxnQkFBUDs7QUFFQUMsYUFBT0MsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsWUFBVztBQUMzQ2Isb0JBQVljLE9BQVosQ0FBb0IsVUFBQ0MsVUFBRDtBQUFBLGlCQUFnQkEsV0FBV0MsUUFBWCxFQUFoQjtBQUFBLFNBQXBCO0FBQ0QsT0FGRDtBQUdEOztBQUVEaEIsZ0JBQVlpQixHQUFaLENBQWdCLElBQWhCOztBQUVBLFNBQUtDLFVBQUwsR0FBa0IsSUFBSWpCLEdBQUosRUFBbEI7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7QUFlQTs7OztpQ0FJYTtBQUNYLFVBQU1rQixXQUFXLEtBQUtaLE1BQUwsQ0FBWVksUUFBN0I7QUFDQSxVQUFJQyxhQUFhLEtBQUtiLE1BQUwsQ0FBWWMsU0FBN0I7O0FBRUEsVUFBSUQsVUFBSixFQUFnQjtBQUNkO0FBQ0EsWUFBSSxPQUFPQSxVQUFQLEtBQXNCLFFBQTFCLEVBQ0VBLGFBQWFFLFNBQVNDLGFBQVQsQ0FBdUJILFVBQXZCLENBQWI7QUFDRjtBQUZBLGFBR0ssSUFBSUEsc0JBQXNCakIsY0FBdEIsSUFBd0NpQixXQUFXQSxVQUF2RCxFQUNIQSxhQUFhQSxXQUFXQSxVQUF4Qjs7QUFFRkEsbUJBQVdJLFdBQVgsQ0FBdUIsS0FBS0MsTUFBTCxFQUF2QjtBQUNBLGFBQUtDLFFBQUw7QUFDRDs7QUFFRCxVQUFJUCxRQUFKLEVBQ0UsS0FBS1EsV0FBTCxDQUFpQlIsUUFBakI7QUFDSDs7QUFFRDs7Ozs7Ozs7O2dDQU1ZQSxRLEVBQVU7QUFDcEIsV0FBS0QsVUFBTCxDQUFnQkQsR0FBaEIsQ0FBb0JFLFFBQXBCO0FBQ0Q7O0FBRUQ7Ozs7Ozs7O21DQUtlQSxRLEVBQVU7QUFDdkIsV0FBS0QsVUFBTCxDQUFnQlUsTUFBaEIsQ0FBdUJULFFBQXZCO0FBQ0Q7O0FBRUQ7Ozs7dUNBQzRCO0FBQUEsd0NBQVJVLE1BQVE7QUFBUkEsY0FBUTtBQUFBOztBQUMxQixXQUFLWCxVQUFMLENBQWdCSixPQUFoQixDQUF3QixVQUFDSyxRQUFEO0FBQUEsZUFBY0EsMEJBQVlVLE1BQVosQ0FBZDtBQUFBLE9BQXhCO0FBQ0Q7O0FBRUQ7Ozs7NkJBQ1M7QUFDUCxXQUFLQyxHQUFMLEdBQVdSLFNBQVNTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWDtBQUNBLFdBQUtELEdBQUwsQ0FBU0UsU0FBVCxDQUFtQmYsR0FBbkIsQ0FBdUJsQixPQUFPa0MsRUFBOUIsRUFBa0MvQixLQUFsQyxFQUF5QyxLQUFLRSxJQUE5Qzs7QUFFQSxhQUFPLEtBQUswQixHQUFaO0FBQ0Q7O0FBRUQ7Ozs7K0JBQ1c7QUFBQTs7QUFDVEksaUJBQVc7QUFBQSxlQUFNLE1BQUtsQixRQUFMLEVBQU47QUFBQSxPQUFYLEVBQWtDLENBQWxDO0FBQ0Q7O0FBRUQ7Ozs7K0JBQ1c7QUFDVCxVQUFNbUIsZUFBZSxLQUFLTCxHQUFMLENBQVNNLHFCQUFULEVBQXJCO0FBQ0EsVUFBTUMsUUFBUUYsYUFBYUUsS0FBM0I7QUFDQSxVQUFNQyxTQUFTRCxRQUFRLEdBQVIsR0FBYyxRQUFkLEdBQXlCLEtBQXhDOztBQUVBLFdBQUtQLEdBQUwsQ0FBU0UsU0FBVCxDQUFtQk0sTUFBbkIsRUFBMkIsT0FBM0I7QUFDRDs7QUFFRDs7OztpQ0FDYSxDQUFFOzs7c0JBakZFQyxLLEVBQU87QUFDdEJ2QyxrQkFBWWMsT0FBWixDQUFvQixVQUFDQyxVQUFEO0FBQUEsZUFBZ0JBLFdBQVdlLEdBQVgsQ0FBZUUsU0FBZixDQUF5QkosTUFBekIsQ0FBZ0MxQixLQUFoQyxDQUFoQjtBQUFBLE9BQXBCO0FBQ0FBLGNBQVFxQyxLQUFSO0FBQ0F2QyxrQkFBWWMsT0FBWixDQUFvQixVQUFDQyxVQUFEO0FBQUEsZUFBZ0JBLFdBQVdlLEdBQVgsQ0FBZUUsU0FBZixDQUF5QmYsR0FBekIsQ0FBNkJmLEtBQTdCLENBQWhCO0FBQUEsT0FBcEI7QUFDRCxLO3dCQUVrQjtBQUNqQixhQUFPQSxLQUFQO0FBQ0Q7Ozs7OztrQkE0RVlDLGMiLCJmaWxlIjoiQmFzZUNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi4vdXRpbHMvc3R5bGVzJztcblxuLy8ga2VlcCB0cmFjayBvZiBhbGwgaW5zdGFjaWF0ZWQgY29udHJvbGxlcnNcbmNvbnN0IGNvbnRyb2xsZXJzID0gbmV3IFNldCgpO1xuLy8gZGVmYXVsdCB0aGVtZVxubGV0IHRoZW1lID0gJ2xpZ2h0JztcblxuLyoqIEBtb2R1bGUgYmFzaWMtY29udHJvbGxlciAqL1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgdG8gY3JlYXRlIG5ldyBjb250cm9sbGVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIFN0cmluZyBkZXNjcmliaW5nIHRoZSB0eXBlIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRzIC0gRGVmYXVsdCBwYXJhbWV0ZXJzIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIFVzZXIgZGVmaW5lZCBjb25maWd1cmF0aW9uIG9wdGlvbnMuXG4gKi9cbmNsYXNzIEJhc2VDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IodHlwZSwgZGVmYXVsdHMsIGNvbmZpZyA9IHt9KSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBjb25maWcpO1xuICAgIC8vIGluc2VydCBzdHlsZXMgYW5kIGxpc3RlbiB3aW5kb3cgcmVzaXplIHdoZW4gdGhlIGZpcnN0IGNvbnRyb2xsZXIgaXMgY3JlYXRlZFxuICAgIGlmIChjb250cm9sbGVycy5zaXplID09PSAwKSB7XG4gICAgICBzdHlsZXMuaW5zZXJ0U3R5bGVTaGVldCgpO1xuXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRyb2xsZXJzLmZvckVhY2goKGNvbnRyb2xsZXIpID0+IGNvbnRyb2xsZXIub25SZXNpemUoKSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb250cm9sbGVycy5hZGQodGhpcyk7XG5cbiAgICB0aGlzLl9saXN0ZW5lcnMgPSBuZXcgU2V0KCk7XG4gIH1cblxuICAvKipcbiAgICogVGhlbWUgb2YgdGhlIGNvbnRyb2xsZXJzXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzdGF0aWMgc2V0IHRoZW1lKHZhbHVlKSB7XG4gICAgY29udHJvbGxlcnMuZm9yRWFjaCgoY29udHJvbGxlcikgPT4gY29udHJvbGxlci4kZWwuY2xhc3NMaXN0LnJlbW92ZSh0aGVtZSkpO1xuICAgIHRoZW1lID0gdmFsdWU7XG4gICAgY29udHJvbGxlcnMuZm9yRWFjaCgoY29udHJvbGxlcikgPT4gY29udHJvbGxlci4kZWwuY2xhc3NMaXN0LmFkZCh0aGVtZSkpO1xuICB9XG5cbiAgc3RhdGljIGdldCB0aGVtZSgpIHtcbiAgICByZXR1cm4gdGhlbWU7XG4gIH1cblxuICAvKipcbiAgICogTWFuZGF0b3J5IG1ldGhvZCB0byBiZSBjYWxsZWQgYXQgdGhlIGVuZCBvZiBhIGNvbnN0cnVjdG9yLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICBjb25zdCBjYWxsYmFjayA9IHRoaXMucGFyYW1zLmNhbGxiYWNrO1xuICAgIGxldCAkY29udGFpbmVyID0gdGhpcy5wYXJhbXMuY29udGFpbmVyO1xuXG4gICAgaWYgKCRjb250YWluZXIpIHtcbiAgICAgIC8vIGNzcyBzZWxlY3RvclxuICAgICAgaWYgKHR5cGVvZiAkY29udGFpbmVyID09PSAnc3RyaW5nJylcbiAgICAgICAgJGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJGNvbnRhaW5lcik7XG4gICAgICAvLyBncm91cFxuICAgICAgZWxzZSBpZiAoJGNvbnRhaW5lciBpbnN0YW5jZW9mIEJhc2VDb250cm9sbGVyICYmICRjb250YWluZXIuJGNvbnRhaW5lcilcbiAgICAgICAgJGNvbnRhaW5lciA9ICRjb250YWluZXIuJGNvbnRhaW5lcjtcblxuICAgICAgJGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcigpKTtcbiAgICAgIHRoaXMub25SZW5kZXIoKTtcbiAgICB9XG5cbiAgICBpZiAoY2FsbGJhY2spXG4gICAgICB0aGlzLmFkZExpc3RlbmVyKGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBsaXN0ZW5lciB0byB0aGUgY29udHJvbGxlci5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBGdW5jdGlvbiB0byBiZSBhcHBsaWVkIHdoZW4gdGhlIGNvbnRyb2xsZXJcbiAgICogIHN0YXRlIGNoYW5nZS5cbiAgICovXG4gIGFkZExpc3RlbmVyKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fbGlzdGVuZXJzLmFkZChjYWxsYmFjayk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEgbGlzdGVuZXIgZnJvbSB0aGUgY29udHJvbGxlci5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBGdW5jdGlvbiB0byByZW1vdmUgZnJvbSB0aGUgbGlzdGVuZXJzLlxuICAgKi9cbiAgcmVtb3ZlTGlzdGVuZXIoY2FsbGJhY2spIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMucmVtb3ZlKGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBleGVjdXRlTGlzdGVuZXJzKC4uLnZhbHVlcykge1xuICAgIHRoaXMuX2xpc3RlbmVycy5mb3JFYWNoKChjYWxsYmFjaykgPT4gY2FsbGJhY2soLi4udmFsdWVzKSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuJGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZChzdHlsZXMubnMsIHRoZW1lLCB0aGlzLnR5cGUpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIG9uUmVuZGVyKCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5vblJlc2l6ZSgpLCAwKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBvblJlc2l6ZSgpIHtcbiAgICBjb25zdCBib3VuZGluZ1JlY3QgPSB0aGlzLiRlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB3aWR0aCA9IGJvdW5kaW5nUmVjdC53aWR0aDtcbiAgICBjb25zdCBtZXRob2QgPSB3aWR0aCA+IDYwMCA/ICdyZW1vdmUnIDogJ2FkZCc7XG5cbiAgICB0aGlzLiRlbC5jbGFzc0xpc3RbbWV0aG9kXSgnc21hbGwnKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBiaW5kRXZlbnRzKCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZUNvbnRyb2xsZXI7XG4iXX0=