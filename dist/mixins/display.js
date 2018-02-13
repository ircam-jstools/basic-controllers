'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.setTheme = setTheme;

var _styles = require('../utils/styles');

var styles = _interopRequireWildcard(_styles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module basic-controllers */

// default theme
var theme = 'light';
// set of the instanciated controllers
var controllers = new Set();

/**
 * Change the theme of the controllers, currently 3 themes are available:
 *  - `'light'` (default)
 *  - `'grey'`
 *  - `'dark'`
 *
 * @param {String} theme - Name of the theme.
 */
function setTheme(value) {
  controllers.forEach(function (controller) {
    return controller.$el.classList.remove(theme);
  });
  theme = value;
  controllers.forEach(function (controller) {
    return controller.$el.classList.add(theme);
  });
}

/**
 * display mixin - components with DOM
 * @private
 */
var display = function display(superclass) {
  return function (_superclass) {
    _inherits(_class, _superclass);

    function _class() {
      var _ref;

      _classCallCheck(this, _class);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // insert styles when the first controller is created
      var _this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

      if (controllers.size === 0) styles.insertStyleSheet();

      _this.resize = _this.resize.bind(_this);

      controllers.add(_this);
      return _this;
    }

    _createClass(_class, [{
      key: 'initialize',
      value: function initialize() {
        var _this2 = this;

        var $container = this.params.container;

        if ($container) {
          // css selector
          if (typeof $container === 'string') {
            $container = document.querySelector($container);
            // group
          } else if ($container.$container) {
            // this.group = $container;
            $container.elements.add(this);
            $container = $container.$container;
          }

          $container.appendChild(this.render());
          setTimeout(function () {
            return _this2.resize();
          }, 0);
        }
      }

      /** @private */

    }, {
      key: 'render',
      value: function render() {
        this.$el = document.createElement('div');
        this.$el.classList.add(styles.ns, theme, this.type);

        window.removeEventListener('resize', this.resize);
        window.addEventListener('resize', this.resize);

        return this.$el;
      }

      /** @private */

    }, {
      key: 'resize',
      value: function resize() {
        if (this.$el) {
          var boundingRect = this.$el.getBoundingClientRect();
          var width = boundingRect.width;
          var method = width > 600 ? 'remove' : 'add';

          this.$el.classList[method]('small');
        }
      }
    }]);

    return _class;
  }(superclass);
};

exports.default = display;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3BsYXkuanMiXSwibmFtZXMiOlsic2V0VGhlbWUiLCJzdHlsZXMiLCJ0aGVtZSIsImNvbnRyb2xsZXJzIiwiU2V0IiwidmFsdWUiLCJmb3JFYWNoIiwiY29udHJvbGxlciIsIiRlbCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsImRpc3BsYXkiLCJzdXBlcmNsYXNzIiwiYXJncyIsInNpemUiLCJpbnNlcnRTdHlsZVNoZWV0IiwicmVzaXplIiwiYmluZCIsIiRjb250YWluZXIiLCJwYXJhbXMiLCJjb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJlbGVtZW50cyIsImFwcGVuZENoaWxkIiwicmVuZGVyIiwic2V0VGltZW91dCIsImNyZWF0ZUVsZW1lbnQiLCJucyIsInR5cGUiLCJ3aW5kb3ciLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImJvdW5kaW5nUmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIndpZHRoIiwibWV0aG9kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztRQWtCZ0JBLFEsR0FBQUEsUTs7QUFsQmhCOztJQUFZQyxNOzs7Ozs7Ozs7O0FBRVo7O0FBRUE7QUFDQSxJQUFJQyxRQUFRLE9BQVo7QUFDQTtBQUNBLElBQU1DLGNBQWMsSUFBSUMsR0FBSixFQUFwQjs7QUFHQTs7Ozs7Ozs7QUFRTyxTQUFTSixRQUFULENBQWtCSyxLQUFsQixFQUF5QjtBQUM5QkYsY0FBWUcsT0FBWixDQUFvQixVQUFDQyxVQUFEO0FBQUEsV0FBZ0JBLFdBQVdDLEdBQVgsQ0FBZUMsU0FBZixDQUF5QkMsTUFBekIsQ0FBZ0NSLEtBQWhDLENBQWhCO0FBQUEsR0FBcEI7QUFDQUEsVUFBUUcsS0FBUjtBQUNBRixjQUFZRyxPQUFaLENBQW9CLFVBQUNDLFVBQUQ7QUFBQSxXQUFnQkEsV0FBV0MsR0FBWCxDQUFlQyxTQUFmLENBQXlCRSxHQUF6QixDQUE2QlQsS0FBN0IsQ0FBaEI7QUFBQSxHQUFwQjtBQUNEOztBQUVEOzs7O0FBSUEsSUFBTVUsVUFBVSxTQUFWQSxPQUFVLENBQUNDLFVBQUQ7QUFBQTtBQUFBOztBQUNkLHNCQUFxQjtBQUFBOztBQUFBOztBQUFBLHdDQUFOQyxJQUFNO0FBQU5BLFlBQU07QUFBQTs7QUFHbkI7QUFIbUIsNklBQ1ZBLElBRFU7O0FBSW5CLFVBQUlYLFlBQVlZLElBQVosS0FBcUIsQ0FBekIsRUFDRWQsT0FBT2UsZ0JBQVA7O0FBRUYsWUFBS0MsTUFBTCxHQUFjLE1BQUtBLE1BQUwsQ0FBWUMsSUFBWixPQUFkOztBQUVBZixrQkFBWVEsR0FBWjtBQVRtQjtBQVVwQjs7QUFYYTtBQUFBO0FBQUEsbUNBYUQ7QUFBQTs7QUFDWCxZQUFJUSxhQUFhLEtBQUtDLE1BQUwsQ0FBWUMsU0FBN0I7O0FBRUEsWUFBSUYsVUFBSixFQUFnQjtBQUNkO0FBQ0EsY0FBSSxPQUFPQSxVQUFQLEtBQXNCLFFBQTFCLEVBQW9DO0FBQ2xDQSx5QkFBYUcsU0FBU0MsYUFBVCxDQUF1QkosVUFBdkIsQ0FBYjtBQUNGO0FBQ0MsV0FIRCxNQUdPLElBQUlBLFdBQVdBLFVBQWYsRUFBMkI7QUFDaEM7QUFDQUEsdUJBQVdLLFFBQVgsQ0FBb0JiLEdBQXBCLENBQXdCLElBQXhCO0FBQ0FRLHlCQUFhQSxXQUFXQSxVQUF4QjtBQUNEOztBQUVEQSxxQkFBV00sV0FBWCxDQUF1QixLQUFLQyxNQUFMLEVBQXZCO0FBQ0FDLHFCQUFXO0FBQUEsbUJBQU0sT0FBS1YsTUFBTCxFQUFOO0FBQUEsV0FBWCxFQUFnQyxDQUFoQztBQUNEO0FBQ0Y7O0FBRUQ7O0FBaENjO0FBQUE7QUFBQSwrQkFpQ0w7QUFDUCxhQUFLVCxHQUFMLEdBQVdjLFNBQVNNLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWDtBQUNBLGFBQUtwQixHQUFMLENBQVNDLFNBQVQsQ0FBbUJFLEdBQW5CLENBQXVCVixPQUFPNEIsRUFBOUIsRUFBa0MzQixLQUFsQyxFQUF5QyxLQUFLNEIsSUFBOUM7O0FBRUFDLGVBQU9DLG1CQUFQLENBQTJCLFFBQTNCLEVBQXFDLEtBQUtmLE1BQTFDO0FBQ0FjLGVBQU9FLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLEtBQUtoQixNQUF2Qzs7QUFFQSxlQUFPLEtBQUtULEdBQVo7QUFDRDs7QUFFRDs7QUEzQ2M7QUFBQTtBQUFBLCtCQTRDTDtBQUNQLFlBQUksS0FBS0EsR0FBVCxFQUFjO0FBQ1osY0FBTTBCLGVBQWUsS0FBSzFCLEdBQUwsQ0FBUzJCLHFCQUFULEVBQXJCO0FBQ0EsY0FBTUMsUUFBUUYsYUFBYUUsS0FBM0I7QUFDQSxjQUFNQyxTQUFTRCxRQUFRLEdBQVIsR0FBYyxRQUFkLEdBQXlCLEtBQXhDOztBQUVBLGVBQUs1QixHQUFMLENBQVNDLFNBQVQsQ0FBbUI0QixNQUFuQixFQUEyQixPQUEzQjtBQUNEO0FBQ0Y7QUFwRGE7O0FBQUE7QUFBQSxJQUE4QnhCLFVBQTlCO0FBQUEsQ0FBaEI7O2tCQXVEZUQsTyIsImZpbGUiOiJkaXNwbGF5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4uL3V0aWxzL3N0eWxlcyc7XG5cbi8qKiBAbW9kdWxlIGJhc2ljLWNvbnRyb2xsZXJzICovXG5cbi8vIGRlZmF1bHQgdGhlbWVcbmxldCB0aGVtZSA9ICdsaWdodCc7XG4vLyBzZXQgb2YgdGhlIGluc3RhbmNpYXRlZCBjb250cm9sbGVyc1xuY29uc3QgY29udHJvbGxlcnMgPSBuZXcgU2V0KCk7XG5cblxuLyoqXG4gKiBDaGFuZ2UgdGhlIHRoZW1lIG9mIHRoZSBjb250cm9sbGVycywgY3VycmVudGx5IDMgdGhlbWVzIGFyZSBhdmFpbGFibGU6XG4gKiAgLSBgJ2xpZ2h0J2AgKGRlZmF1bHQpXG4gKiAgLSBgJ2dyZXknYFxuICogIC0gYCdkYXJrJ2BcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdGhlbWUgLSBOYW1lIG9mIHRoZSB0aGVtZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFRoZW1lKHZhbHVlKSB7XG4gIGNvbnRyb2xsZXJzLmZvckVhY2goKGNvbnRyb2xsZXIpID0+IGNvbnRyb2xsZXIuJGVsLmNsYXNzTGlzdC5yZW1vdmUodGhlbWUpKTtcbiAgdGhlbWUgPSB2YWx1ZTtcbiAgY29udHJvbGxlcnMuZm9yRWFjaCgoY29udHJvbGxlcikgPT4gY29udHJvbGxlci4kZWwuY2xhc3NMaXN0LmFkZCh0aGVtZSkpO1xufVxuXG4vKipcbiAqIGRpc3BsYXkgbWl4aW4gLSBjb21wb25lbnRzIHdpdGggRE9NXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBkaXNwbGF5ID0gKHN1cGVyY2xhc3MpID0+IGNsYXNzIGV4dGVuZHMgc3VwZXJjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKTtcblxuICAgIC8vIGluc2VydCBzdHlsZXMgd2hlbiB0aGUgZmlyc3QgY29udHJvbGxlciBpcyBjcmVhdGVkXG4gICAgaWYgKGNvbnRyb2xsZXJzLnNpemUgPT09IDApXG4gICAgICBzdHlsZXMuaW5zZXJ0U3R5bGVTaGVldCgpO1xuXG4gICAgdGhpcy5yZXNpemUgPSB0aGlzLnJlc2l6ZS5iaW5kKHRoaXMpO1xuXG4gICAgY29udHJvbGxlcnMuYWRkKHRoaXMpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICBsZXQgJGNvbnRhaW5lciA9IHRoaXMucGFyYW1zLmNvbnRhaW5lcjtcblxuICAgIGlmICgkY29udGFpbmVyKSB7XG4gICAgICAvLyBjc3Mgc2VsZWN0b3JcbiAgICAgIGlmICh0eXBlb2YgJGNvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgJGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJGNvbnRhaW5lcik7XG4gICAgICAvLyBncm91cFxuICAgICAgfSBlbHNlIGlmICgkY29udGFpbmVyLiRjb250YWluZXIpIHtcbiAgICAgICAgLy8gdGhpcy5ncm91cCA9ICRjb250YWluZXI7XG4gICAgICAgICRjb250YWluZXIuZWxlbWVudHMuYWRkKHRoaXMpO1xuICAgICAgICAkY29udGFpbmVyID0gJGNvbnRhaW5lci4kY29udGFpbmVyO1xuICAgICAgfVxuXG4gICAgICAkY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyKCkpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlc2l6ZSgpLCAwKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuJGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZChzdHlsZXMubnMsIHRoZW1lLCB0aGlzLnR5cGUpO1xuXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzaXplKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemUpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlc2l6ZSgpIHtcbiAgICBpZiAodGhpcy4kZWwpIHtcbiAgICAgIGNvbnN0IGJvdW5kaW5nUmVjdCA9IHRoaXMuJGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3Qgd2lkdGggPSBib3VuZGluZ1JlY3Qud2lkdGg7XG4gICAgICBjb25zdCBtZXRob2QgPSB3aWR0aCA+IDYwMCA/ICdyZW1vdmUnIDogJ2FkZCc7XG5cbiAgICAgIHRoaXMuJGVsLmNsYXNzTGlzdFttZXRob2RdKCdzbWFsbCcpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBkaXNwbGF5O1xuIl19