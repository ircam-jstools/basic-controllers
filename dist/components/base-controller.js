'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _styles = require('../utils/styles');

var styles = _interopRequireWildcard(_styles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// store all instance in a stack
var stack = new _set2.default();
var theme = 'light';

// add a single listener on window to trigger update
window.addEventListener('resize', function () {
  stack.forEach(function (controller) {
    return controller.onResize();
  });
});

var BaseController = function (_events$EventEmitter) {
  (0, _inherits3.default)(BaseController, _events$EventEmitter);

  function BaseController() {
    (0, _classCallCheck3.default)(this, BaseController);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(BaseController).call(this));

    if (stack.size === 0) {
      styles.insertStyleSheet();
    }

    stack.add(_this);
    return _this;
  }

  (0, _createClass3.default)(BaseController, [{
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
      var _this2 = this;

      setTimeout(function () {
        return _this2.onResize();
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
}(_events2.default.EventEmitter);

exports.default = BaseController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2UtY29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztJQUFZOzs7Ozs7O0FBRVosSUFBTSxRQUFRLG1CQUFSO0FBQ04sSUFBSSxRQUFRLE9BQVI7OztBQUdKLE9BQU8sZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsWUFBVztBQUMzQyxRQUFNLE9BQU4sQ0FBYyxVQUFDLFVBQUQ7V0FBZ0IsV0FBVyxRQUFYO0dBQWhCLENBQWQsQ0FEMkM7Q0FBWCxDQUFsQzs7SUFJcUI7OztBQUNuQixXQURtQixjQUNuQixHQUFjO3dDQURLLGdCQUNMOzs2RkFESyw0QkFDTDs7QUFHWixRQUFJLE1BQU0sSUFBTixLQUFlLENBQWYsRUFBa0I7QUFDcEIsYUFBTyxnQkFBUCxHQURvQjtLQUF0Qjs7QUFJQSxVQUFNLEdBQU4sUUFQWTs7R0FBZDs7NkJBRG1COztnREFxQjJDO1VBQXBDLG1FQUFhLG9CQUF1QjtVQUFqQixpRUFBVyxvQkFBTTs7QUFDNUQsVUFBSSxVQUFKLEVBQWdCO0FBQ2QsWUFBSSxPQUFPLFVBQVAsS0FBc0IsUUFBdEIsRUFBZ0M7QUFDbEMsdUJBQWEsU0FBUyxhQUFULENBQXVCLFVBQXZCLENBQWIsQ0FEa0M7U0FBcEM7O0FBSUEsbUJBQVcsV0FBWCxDQUF1QixLQUFLLE1BQUwsRUFBdkIsRUFMYztBQU1kLGFBQUssUUFBTCxHQU5jO09BQWhCOztBQVNBLFVBQUksUUFBSixFQUFjO0FBQUUsYUFBSyxFQUFMLENBQVEsUUFBUixFQUFrQixRQUFsQixFQUFGO09BQWQ7Ozs7NkJBR2tCO1VBQWIsNkRBQU8sb0JBQU07O0FBQ2xCLFdBQUssR0FBTCxHQUFXLFNBQVMsYUFBVCxDQUF1QixPQUF2QixDQUFYLENBRGtCO0FBRWxCLFdBQUssR0FBTCxDQUFTLFNBQVQsQ0FBbUIsR0FBbkIsQ0FBdUIsT0FBTyxFQUFQLEVBQVcsS0FBbEMsRUFGa0I7QUFHbEIsVUFBSSxTQUFTLElBQVQsRUFBZTtBQUFFLGFBQUssR0FBTCxDQUFTLFNBQVQsQ0FBbUIsR0FBbkIsQ0FBdUIsSUFBdkIsRUFBRjtPQUFuQjs7QUFFQSxhQUFPLEtBQUssR0FBTCxDQUxXOzs7OytCQVFUOzs7QUFDVCxpQkFBVztlQUFNLE9BQUssUUFBTDtPQUFOLEVBQXVCLENBQWxDLEVBRFM7Ozs7K0JBSUE7QUFDVCxVQUFNLGVBQWUsS0FBSyxHQUFMLENBQVMscUJBQVQsRUFBZixDQURHO0FBRVQsVUFBTSxRQUFRLGFBQWEsS0FBYixDQUZMO0FBR1QsVUFBTSxTQUFTLFFBQVEsR0FBUixHQUFjLFFBQWQsR0FBeUIsS0FBekIsQ0FITjs7QUFLVCxXQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLE1BQW5CLEVBQTJCLE9BQTNCLEVBTFM7Ozs7Ozs7OztpQ0FXRTs7O3NCQTlDSSxPQUFPO0FBQ3RCLFlBQU0sT0FBTixDQUFjLFVBQUMsVUFBRDtlQUFnQixXQUFXLEdBQVgsQ0FBZSxTQUFmLENBQXlCLE1BQXpCLENBQWdDLEtBQWhDO09BQWhCLENBQWQsQ0FEc0I7QUFFdEIsY0FBUSxLQUFSLENBRnNCO0FBR3RCLFlBQU0sT0FBTixDQUFjLFVBQUMsVUFBRDtlQUFnQixXQUFXLEdBQVgsQ0FBZSxTQUFmLENBQXlCLEdBQXpCLENBQTZCLEtBQTdCO09BQWhCLENBQWQsQ0FIc0I7O3dCQU1MO0FBQ2pCLGFBQU8sS0FBUCxDQURpQjs7O1NBakJBO0VBQXVCLGlCQUFPLFlBQVA7O2tCQUF2QiIsImZpbGUiOiJiYXNlLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXZlbnRzIGZyb20gJ2V2ZW50cyc7XG5pbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi4vdXRpbHMvc3R5bGVzJztcbi8vIHN0b3JlIGFsbCBpbnN0YW5jZSBpbiBhIHN0YWNrXG5jb25zdCBzdGFjayA9IG5ldyBTZXQoKTtcbmxldCB0aGVtZSA9ICdsaWdodCc7XG5cbi8vIGFkZCBhIHNpbmdsZSBsaXN0ZW5lciBvbiB3aW5kb3cgdG8gdHJpZ2dlciB1cGRhdGVcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgc3RhY2suZm9yRWFjaCgoY29udHJvbGxlcikgPT4gY29udHJvbGxlci5vblJlc2l6ZSgpKTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlQ29udHJvbGxlciBleHRlbmRzIGV2ZW50cy5FdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKHN0YWNrLnNpemUgPT09IDApIHtcbiAgICAgIHN0eWxlcy5pbnNlcnRTdHlsZVNoZWV0KCk7XG4gICAgfVxuXG4gICAgc3RhY2suYWRkKHRoaXMpO1xuICB9XG5cbiAgc3RhdGljIHNldCB0aGVtZSh2YWx1ZSkge1xuICAgIHN0YWNrLmZvckVhY2goKGNvbnRyb2xsZXIpID0+IGNvbnRyb2xsZXIuJGVsLmNsYXNzTGlzdC5yZW1vdmUodGhlbWUpKTtcbiAgICB0aGVtZSA9IHZhbHVlO1xuICAgIHN0YWNrLmZvckVhY2goKGNvbnRyb2xsZXIpID0+IGNvbnRyb2xsZXIuJGVsLmNsYXNzTGlzdC5hZGQodGhlbWUpKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgdGhlbWUoKSB7XG4gICAgcmV0dXJuIHRoZW1lO1xuICB9XG5cbiAgX2FwcGx5T3B0aW9ubmFsUGFyYW1ldGVycygkY29udGFpbmVyID0gbnVsbCwgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgaWYgKCRjb250YWluZXIpIHtcbiAgICAgIGlmICh0eXBlb2YgJGNvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgJGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJGNvbnRhaW5lcik7XG4gICAgICB9XG5cbiAgICAgICRjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXIoKSk7XG4gICAgICB0aGlzLm9uUmVuZGVyKCk7XG4gICAgfVxuXG4gICAgaWYgKGNhbGxiYWNrKSB7IHRoaXMub24oJ2NoYW5nZScsIGNhbGxiYWNrKTsgfVxuICB9XG5cbiAgcmVuZGVyKHR5cGUgPSBudWxsKSB7XG4gICAgdGhpcy4kZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoc3R5bGVzLm5zLCB0aGVtZSk7XG4gICAgaWYgKHR5cGUgIT09IG51bGwpIHsgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZCh0eXBlKTsgfVxuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgb25SZW5kZXIoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLm9uUmVzaXplKCksIDApO1xuICB9XG5cbiAgb25SZXNpemUoKSB7XG4gICAgY29uc3QgYm91bmRpbmdSZWN0ID0gdGhpcy4kZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3Qgd2lkdGggPSBib3VuZGluZ1JlY3Qud2lkdGg7XG4gICAgY29uc3QgbWV0aG9kID0gd2lkdGggPiA2MDAgPyAncmVtb3ZlJyA6ICdhZGQnO1xuXG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0W21ldGhvZF0oJ3NtYWxsJyk7XG4gIH1cblxuICAvKipcbiAgICogIEludGVyZmFjZVxuICAgKi9cbiAgYmluZEV2ZW50cygpIHt9XG59XG5cbiJdfQ==