'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _baseController = require('./base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

var _utilsElements = require('../utils/elements');

var elements = _interopRequireWildcard(_utilsElements);

var Toggle = (function (_BaseController) {
  _inherits(Toggle, _BaseController);

  function Toggle(legend) {
    var active = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
    var $container = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
    var callback = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

    _classCallCheck(this, Toggle);

    _get(Object.getPrototypeOf(Toggle.prototype), 'constructor', this).call(this);

    this.type = 'toggle';
    this.legend = legend;
    this._active = active;

    _get(Object.getPrototypeOf(Toggle.prototype), '_applyOptionnalParameters', this).call(this, $container, callback);
  }

  _createClass(Toggle, [{
    key: '_updateBtn',
    value: function _updateBtn() {
      var method = this.active ? 'add' : 'remove';
      this.$toggle.classList[method]('active');
    }
  }, {
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        ' + elements.toggle + '\n      </div>';

      this.$el = _get(Object.getPrototypeOf(Toggle.prototype), 'render', this).call(this, this.type);
      this.$el.classList.add('align-small');
      this.$el.innerHTML = content;

      this.$toggle = this.$el.querySelector('.toggle-element');
      this.bindEvents();
      this.active = this._active; // initialize state

      return this.$el;
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this = this;

      this.$toggle.addEventListener('click', function (e) {
        e.preventDefault();
        _this.active = !_this.active;
        _this.emit('change', _this.active);
      });
    }
  }, {
    key: 'active',
    set: function set(bool) {
      this._active = bool;
      this._updateBtn();
    },
    get: function get() {
      return this._active;
    }
  }]);

  return Toggle;
})(_baseController2['default']);

exports['default'] = Toggle;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi9jb21wb25lbnRzL3RvZ2dsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OEJBQTJCLG1CQUFtQjs7Ozs2QkFDcEIsbUJBQW1COztJQUFqQyxRQUFROztJQUVDLE1BQU07WUFBTixNQUFNOztBQUNkLFdBRFEsTUFBTSxDQUNiLE1BQU0sRUFBdUQ7UUFBckQsTUFBTSx5REFBRyxLQUFLO1FBQUUsVUFBVSx5REFBRyxLQUFLO1FBQUUsUUFBUSx5REFBRyxJQUFJOzswQkFEcEQsTUFBTTs7QUFFdkIsK0JBRmlCLE1BQU0sNkNBRWY7O0FBRVIsUUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7QUFDckIsUUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsUUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7O0FBRXRCLCtCQVJpQixNQUFNLDJEQVFTLFVBQVUsRUFBRSxRQUFRLEVBQUU7R0FDdkQ7O2VBVGtCLE1BQU07O1dBa0JmLHNCQUFHO0FBQ1gsVUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLEdBQUcsUUFBUSxDQUFDO0FBQzVDLFVBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQzFDOzs7V0FFSyxrQkFBRztBQUNQLFVBQUksT0FBTyxxQ0FDYyxJQUFJLENBQUMsTUFBTSw0REFFOUIsUUFBUSxDQUFDLE1BQU0sbUJBQ1osQ0FBQzs7QUFFVixVQUFJLENBQUMsR0FBRyw4QkE5QlMsTUFBTSx3Q0E4QkMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25DLFVBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN0QyxVQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7O0FBRTdCLFVBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUN6RCxVQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDbEIsVUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDOztBQUUzQixhQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7S0FDakI7OztXQUVTLHNCQUFHOzs7QUFDWCxVQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDLENBQUMsRUFBSztBQUM1QyxTQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkIsY0FBSyxNQUFNLEdBQUcsQ0FBQyxNQUFLLE1BQU0sQ0FBQztBQUMzQixjQUFLLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBSyxNQUFNLENBQUMsQ0FBQztPQUNsQyxDQUFDLENBQUM7S0FDSjs7O1NBcENTLGFBQUMsSUFBSSxFQUFFO0FBQ2YsVUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDcEIsVUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQ25CO1NBRVMsZUFBRztBQUFFLGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztLQUFFOzs7U0FoQmxCLE1BQU07OztxQkFBTixNQUFNIiwiZmlsZSI6ImVzNi9jb21wb25lbnRzL3RvZ2dsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlQ29udHJvbGxlciBmcm9tICcuL2Jhc2UtY29udHJvbGxlcic7XG5pbXBvcnQgKiBhcyBlbGVtZW50cyBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZ2dsZSBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IobGVnZW5kLCBhY3RpdmUgPSBmYWxzZSwgJGNvbnRhaW5lciA9IGZhbHNlLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy50eXBlID0gJ3RvZ2dsZSc7XG4gICAgdGhpcy5sZWdlbmQgPSBsZWdlbmQ7XG4gICAgdGhpcy5fYWN0aXZlID0gYWN0aXZlO1xuXG4gICAgc3VwZXIuX2FwcGx5T3B0aW9ubmFsUGFyYW1ldGVycygkY29udGFpbmVyLCBjYWxsYmFjayk7XG4gIH1cblxuICBzZXQgYWN0aXZlKGJvb2wpIHtcbiAgICB0aGlzLl9hY3RpdmUgPSBib29sO1xuICAgIHRoaXMuX3VwZGF0ZUJ0bigpO1xuICB9XG5cbiAgZ2V0IGFjdGl2ZSgpIHsgcmV0dXJuIHRoaXMuX2FjdGl2ZTsgfVxuXG4gIF91cGRhdGVCdG4oKSB7XG4gICAgdmFyIG1ldGhvZCA9IHRoaXMuYWN0aXZlID8gJ2FkZCcgOiAncmVtb3ZlJztcbiAgICB0aGlzLiR0b2dnbGUuY2xhc3NMaXN0W21ldGhvZF0oJ2FjdGl2ZScpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCBjb250ZW50ID0gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJsZWdlbmRcIj4ke3RoaXMubGVnZW5kfTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbm5lci13cmFwcGVyXCI+XG4gICAgICAgICR7ZWxlbWVudHMudG9nZ2xlfVxuICAgICAgPC9kaXY+YDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKHRoaXMudHlwZSk7XG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZCgnYWxpZ24tc21hbGwnKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gICAgdGhpcy4kdG9nZ2xlID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLnRvZ2dsZS1lbGVtZW50Jyk7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgdGhpcy5hY3RpdmUgPSB0aGlzLl9hY3RpdmU7IC8vIGluaXRpYWxpemUgc3RhdGVcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuYWN0aXZlID0gIXRoaXMuYWN0aXZlO1xuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCB0aGlzLmFjdGl2ZSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==