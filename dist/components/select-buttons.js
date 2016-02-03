'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _baseController = require('./base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

var _utilsElements = require('../utils/elements');

var elements = _interopRequireWildcard(_utilsElements);

var SelectButtons = (function (_BaseController) {
  _inherits(SelectButtons, _BaseController);

  function SelectButtons(legend, options, defaultValue) {
    var $container = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
    var callback = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];

    _classCallCheck(this, SelectButtons);

    _get(Object.getPrototypeOf(SelectButtons.prototype), 'constructor', this).call(this);

    this.type = 'select-buttons';
    this.legend = legend; // non breakable space to keep rendering consistency
    this.options = options;
    this._value = defaultValue;
    var currentIndex = this.options.indexOf(this._value);
    this._currentIndex = currentIndex === -1 ? 0 : currentIndex;
    this._maxIndex = this.options.length - 1;

    _get(Object.getPrototypeOf(SelectButtons.prototype), '_applyOptionnalParameters', this).call(this, $container, callback);
  }

  _createClass(SelectButtons, [{
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        ' + elements.arrowLeft + '\n        ' + this.options.map(function (option, index) {
        return '\n            <a href="#" class="btn" data-index="' + index + '" data-value="' + option + '">\n              ' + option + '\n            </a>';
      }).join('') + '\n        ' + elements.arrowRight + '\n      </div>\n    ';

      this.$el = _get(Object.getPrototypeOf(SelectButtons.prototype), 'render', this).call(this, this.type);
      this.$el.innerHTML = content;

      this.$prev = this.$el.querySelector('.arrow-left');
      this.$next = this.$el.querySelector('.arrow-right');
      this.$btns = _Array$from(this.$el.querySelectorAll('.btn'));
      this._highlightBtn(this._currentIndex);

      this.bindEvents();
      return this.$el;
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this = this;

      this.$prev.addEventListener('click', function () {
        var index = _this._currentIndex - 1;
        _this.propagate(index);
      });

      this.$next.addEventListener('click', function () {
        var index = _this._currentIndex + 1;
        _this.propagate(index);
      });

      this.$btns.forEach(function ($btn, index) {
        $btn.addEventListener('click', function (e) {
          e.preventDefault();
          _this.propagate(index);
        });
      });
    }
  }, {
    key: 'propagate',
    value: function propagate(index) {
      if (index < 0 || index > this._maxIndex) {
        return;
      }

      this._currentIndex = index;
      this._value = this.options[index];
      this._highlightBtn(this._currentIndex);

      this.emit('change', this._value);
    }
  }, {
    key: '_highlightBtn',
    value: function _highlightBtn(activeIndex) {
      this.$btns.forEach(function ($btn, index) {
        $btn.classList.remove('active');

        if (activeIndex === index) {
          $btn.classList.add('active');
        }
      });
    }
  }, {
    key: 'value',
    get: function get() {
      return this._value;
    },
    set: function set(value) {}
  }]);

  return SelectButtons;
})(_baseController2['default']);

exports['default'] = SelectButtons;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi9jb21wb25lbnRzL3NlbGVjdC1idXR0b25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQUEyQixtQkFBbUI7Ozs7NkJBQ3BCLG1CQUFtQjs7SUFBakMsUUFBUTs7SUFFQyxhQUFhO1lBQWIsYUFBYTs7QUFDckIsV0FEUSxhQUFhLENBQ3BCLE1BQU0sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFzQztRQUFwQyxVQUFVLHlEQUFHLElBQUk7UUFBRSxRQUFRLHlEQUFHLElBQUk7OzBCQUQxRCxhQUFhOztBQUU5QiwrQkFGaUIsYUFBYSw2Q0FFdEI7O0FBRVIsUUFBSSxDQUFDLElBQUksR0FBRyxnQkFBZ0IsQ0FBQztBQUM3QixRQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixRQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUN2QixRQUFJLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQztBQUMzQixRQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdkQsUUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQztBQUM1RCxRQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzs7QUFFekMsK0JBWmlCLGFBQWEsMkRBWUUsVUFBVSxFQUFFLFFBQVEsRUFBRTtHQUN2RDs7ZUFia0IsYUFBYTs7V0F1QjFCLGtCQUFHO0FBQ1AsVUFBTSxPQUFPLHFDQUNZLElBQUksQ0FBQyxNQUFNLDREQUU5QixRQUFRLENBQUMsU0FBUyxrQkFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFLO0FBQ3BDLHNFQUN3QyxLQUFLLHNCQUFpQixNQUFNLDBCQUM5RCxNQUFNLHdCQUNKO09BQ1QsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsa0JBQ1QsUUFBUSxDQUFDLFVBQVUseUJBRXhCLENBQUM7O0FBRUYsVUFBSSxDQUFDLEdBQUcsOEJBdENTLGFBQWEsd0NBc0NOLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuQyxVQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7O0FBRTdCLFVBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDbkQsVUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNwRCxVQUFJLENBQUMsS0FBSyxHQUFHLFlBQVcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQzNELFVBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDOztBQUV2QyxVQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDbEIsYUFBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0tBQ2pCOzs7V0FFUyxzQkFBRzs7O0FBQ1gsVUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtBQUN6QyxZQUFNLEtBQUssR0FBRyxNQUFLLGFBQWEsR0FBRyxDQUFDLENBQUM7QUFDckMsY0FBSyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7T0FDdkIsQ0FBQyxDQUFDOztBQUVILFVBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07QUFDekMsWUFBTSxLQUFLLEdBQUcsTUFBSyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0FBQ3JDLGNBQUssU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO09BQ3ZCLENBQUMsQ0FBQzs7QUFFSCxVQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBRSxLQUFLLEVBQUs7QUFDbEMsWUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDLENBQUMsRUFBSztBQUNwQyxXQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkIsZ0JBQUssU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3ZCLENBQUMsQ0FBQztPQUNKLENBQUMsQ0FBQztLQUNKOzs7V0FFUSxtQkFBQyxLQUFLLEVBQUU7QUFDZixVQUFJLEtBQUssR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUU7QUFBRSxlQUFPO09BQUU7O0FBRXBELFVBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO0FBQzNCLFVBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNsQyxVQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzs7QUFFdkMsVUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2xDOzs7V0FFWSx1QkFBQyxXQUFXLEVBQUU7QUFDekIsVUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFLO0FBQ2xDLFlBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUVoQyxZQUFJLFdBQVcsS0FBSyxLQUFLLEVBQUU7QUFDekIsY0FBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDOUI7T0FDRixDQUFDLENBQUM7S0FDSjs7O1NBeEVRLGVBQUc7QUFDVixhQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDcEI7U0FFUSxhQUFDLEtBQUssRUFBRSxFQUVoQjs7O1NBckJrQixhQUFhOzs7cUJBQWIsYUFBYSIsImZpbGUiOiJlczYvY29tcG9uZW50cy9zZWxlY3QtYnV0dG9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlQ29udHJvbGxlciBmcm9tICcuL2Jhc2UtY29udHJvbGxlcic7XG5pbXBvcnQgKiBhcyBlbGVtZW50cyBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlbGVjdEJ1dHRvbnMgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgb3B0aW9ucywgZGVmYXVsdFZhbHVlLCAkY29udGFpbmVyID0gbnVsbCwgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudHlwZSA9ICdzZWxlY3QtYnV0dG9ucyc7XG4gICAgdGhpcy5sZWdlbmQgPSBsZWdlbmQ7IC8vIG5vbiBicmVha2FibGUgc3BhY2UgdG8ga2VlcCByZW5kZXJpbmcgY29uc2lzdGVuY3lcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuX3ZhbHVlID0gZGVmYXVsdFZhbHVlO1xuICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IHRoaXMub3B0aW9ucy5pbmRleE9mKHRoaXMuX3ZhbHVlKTtcbiAgICB0aGlzLl9jdXJyZW50SW5kZXggPSBjdXJyZW50SW5kZXggPT09IC0xID/CoDAgOiBjdXJyZW50SW5kZXg7XG4gICAgdGhpcy5fbWF4SW5kZXggPSB0aGlzLm9wdGlvbnMubGVuZ3RoIC0gMTtcblxuICAgIHN1cGVyLl9hcHBseU9wdGlvbm5hbFBhcmFtZXRlcnMoJGNvbnRhaW5lciwgY2FsbGJhY2spO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgY29udGVudCA9IGBcbiAgICAgIDxzcGFuIGNsYXNzPVwibGVnZW5kXCI+JHt0aGlzLmxlZ2VuZH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlclwiPlxuICAgICAgICAke2VsZW1lbnRzLmFycm93TGVmdH1cbiAgICAgICAgJHt0aGlzLm9wdGlvbnMubWFwKChvcHRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidG5cIiBkYXRhLWluZGV4PVwiJHtpbmRleH1cIiBkYXRhLXZhbHVlPVwiJHtvcHRpb259XCI+XG4gICAgICAgICAgICAgICR7b3B0aW9ufVxuICAgICAgICAgICAgPC9hPmA7XG4gICAgICAgIH0pLmpvaW4oJycpfVxuICAgICAgICAke2VsZW1lbnRzLmFycm93UmlnaHR9XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIodGhpcy50eXBlKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gICAgdGhpcy4kcHJldiA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy1sZWZ0Jyk7XG4gICAgdGhpcy4kbmV4dCA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy1yaWdodCcpO1xuICAgIHRoaXMuJGJ0bnMgPSBBcnJheS5mcm9tKHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4nKSk7XG4gICAgdGhpcy5faGlnaGxpZ2h0QnRuKHRoaXMuX2N1cnJlbnRJbmRleCk7XG5cbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJHByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2N1cnJlbnRJbmRleCAtIDE7XG4gICAgICB0aGlzLnByb3BhZ2F0ZShpbmRleCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLiRuZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9jdXJyZW50SW5kZXggKyAxO1xuICAgICAgdGhpcy5wcm9wYWdhdGUoaW5kZXgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy4kYnRucy5mb3JFYWNoKCgkYnRuLCBpbmRleCkgPT4ge1xuICAgICAgJGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5wcm9wYWdhdGUoaW5kZXgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcm9wYWdhdGUoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gdGhpcy5fbWF4SW5kZXgpIHsgcmV0dXJuOyB9XG5cbiAgICB0aGlzLl9jdXJyZW50SW5kZXggPSBpbmRleDtcbiAgICB0aGlzLl92YWx1ZSA9IHRoaXMub3B0aW9uc1tpbmRleF07XG4gICAgdGhpcy5faGlnaGxpZ2h0QnRuKHRoaXMuX2N1cnJlbnRJbmRleCk7XG5cbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIHRoaXMuX3ZhbHVlKTtcbiAgfVxuXG4gIF9oaWdobGlnaHRCdG4oYWN0aXZlSW5kZXgpIHtcbiAgICB0aGlzLiRidG5zLmZvckVhY2goKCRidG4sIGluZGV4KSA9PiB7XG4gICAgICAkYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXG4gICAgICBpZiAoYWN0aXZlSW5kZXggPT09IGluZGV4KSB7XG4gICAgICAgICRidG4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn0iXX0=