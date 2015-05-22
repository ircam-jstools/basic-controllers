'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _get = require('babel-runtime/helpers/get')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var BaseController = require('./base-controller');

var Toggle = (function (_BaseController) {
  function Toggle(legend) {
    var active = arguments[1] === undefined ? false : arguments[1];
    var $container = arguments[2] === undefined ? false : arguments[2];
    var callback = arguments[3] === undefined ? null : arguments[3];

    _classCallCheck(this, Toggle);

    _get(Object.getPrototypeOf(Toggle.prototype), 'constructor', this).call(this);

    this.type = 'toggle';
    this.legend = legend;
    this._active = active;

    _get(Object.getPrototypeOf(Toggle.prototype), '_applyOptionnalParameters', this).call(this, $container, callback);
  }

  _inherits(Toggle, _BaseController);

  _createClass(Toggle, [{
    key: 'active',
    set: function (bool) {
      this._active = bool;
      this._updateBtn();
    },
    get: function () {
      return this._active;
    }
  }, {
    key: '_updateBtn',
    value: function _updateBtn() {
      var method = this.active ? 'add' : 'remove';
      this.$toggle.classList[method]('active');
    }
  }, {
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        <div class="toggle-container">\n          <div class="x x1"></div><div class="x x2"></div>\n        </div>\n      </div>';

      this.$el = _get(Object.getPrototypeOf(Toggle.prototype), 'render', this).call(this);
      this.$el.classList.add(this.type);
      this.$el.innerHTML = content;

      this.$toggle = this.$el.querySelector('.toggle-container');
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
        var active = _this.active ? false : true;
        _this.active = active;

        _this.emit('change', active);
      });
    }
  }]);

  return Toggle;
})(BaseController);

module.exports = Toggle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi90b2dnbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOztJQUU5QyxNQUFNO0FBQ0MsV0FEUCxNQUFNLENBQ0UsTUFBTSxFQUF1RDtRQUFyRCxNQUFNLGdDQUFHLEtBQUs7UUFBRSxVQUFVLGdDQUFHLEtBQUs7UUFBRSxRQUFRLGdDQUFHLElBQUk7OzBCQURuRSxNQUFNOztBQUVSLCtCQUZFLE1BQU0sNkNBRUE7O0FBRVIsUUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7QUFDckIsUUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsUUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7O0FBRXRCLCtCQVJFLE1BQU0sMkRBUXdCLFVBQVUsRUFBRSxRQUFRLEVBQUU7R0FDdkQ7O1lBVEcsTUFBTTs7ZUFBTixNQUFNOztTQVdBLFVBQUMsSUFBSSxFQUFFO0FBQ2YsVUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDcEIsVUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQ25CO1NBRVMsWUFBRztBQUFFLGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztLQUFFOzs7V0FFM0Isc0JBQUc7QUFDWCxVQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssR0FBRyxRQUFRLENBQUM7QUFDNUMsVUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDMUM7OztXQUVLLGtCQUFHO0FBQ1AsVUFBSSxPQUFPLHFDQUNjLElBQUksQ0FBQyxNQUFNLGlMQUszQixDQUFDOztBQUVWLFVBQUksQ0FBQyxHQUFHLDhCQWhDTixNQUFNLHVDQWdDaUIsQ0FBQztBQUMxQixVQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xDLFVBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQzs7QUFFN0IsVUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQzNELFVBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNsQixVQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7O0FBRTNCLGFBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztLQUNqQjs7O1dBRVMsc0JBQUc7OztBQUNYLFVBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBQyxFQUFLO0FBQzVDLFNBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNuQixZQUFJLE1BQU0sR0FBRyxNQUFLLE1BQU0sR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ3hDLGNBQUssTUFBTSxHQUFHLE1BQU0sQ0FBQzs7QUFFckIsY0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO09BQzdCLENBQUMsQ0FBQztLQUNKOzs7U0FuREcsTUFBTTtHQUFTLGNBQWM7O0FBc0RuQyxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyIsImZpbGUiOiJlczYvdG9nZ2xlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQmFzZUNvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2Jhc2UtY29udHJvbGxlcicpO1xuXG5jbGFzcyBUb2dnbGUgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgYWN0aXZlID0gZmFsc2UsICRjb250YWluZXIgPSBmYWxzZSwgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudHlwZSA9ICd0b2dnbGUnO1xuICAgIHRoaXMubGVnZW5kID0gbGVnZW5kO1xuICAgIHRoaXMuX2FjdGl2ZSA9IGFjdGl2ZTtcblxuICAgIHN1cGVyLl9hcHBseU9wdGlvbm5hbFBhcmFtZXRlcnMoJGNvbnRhaW5lciwgY2FsbGJhY2spO1xuICB9XG5cbiAgc2V0IGFjdGl2ZShib29sKSB7XG4gICAgdGhpcy5fYWN0aXZlID0gYm9vbDtcbiAgICB0aGlzLl91cGRhdGVCdG4oKTtcbiAgfVxuXG4gIGdldCBhY3RpdmUoKSB7IHJldHVybiB0aGlzLl9hY3RpdmU7IH1cblxuICBfdXBkYXRlQnRuKCkge1xuICAgIHZhciBtZXRob2QgPSB0aGlzLmFjdGl2ZSA/ICdhZGQnIDogJ3JlbW92ZSc7XG4gICAgdGhpcy4kdG9nZ2xlLmNsYXNzTGlzdFttZXRob2RdKCdhY3RpdmUnKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgY29udGVudCA9IGBcbiAgICAgIDxzcGFuIGNsYXNzPVwibGVnZW5kXCI+JHt0aGlzLmxlZ2VuZH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidG9nZ2xlLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ4IHgxXCI+PC9kaXY+PGRpdiBjbGFzcz1cInggeDJcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIoKTtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKHRoaXMudHlwZSk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuJHRvZ2dsZSA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy50b2dnbGUtY29udGFpbmVyJyk7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgdGhpcy5hY3RpdmUgPSB0aGlzLl9hY3RpdmU7IC8vIGluaXRpYWxpemUgc3RhdGVcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciBhY3RpdmUgPSB0aGlzLmFjdGl2ZSA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgIHRoaXMuYWN0aXZlID0gYWN0aXZlO1xuXG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIGFjdGl2ZSk7XG4gICAgfSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUb2dnbGU7Il19