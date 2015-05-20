'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _get = require('babel-runtime/helpers/get')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var events = require('events');
var styles = require('./utils/styles');

var Toggle = (function (_events$EventEmitter) {
  function Toggle(legend) {
    var active = arguments[1] === undefined ? false : arguments[1];
    var $container = arguments[2] === undefined ? false : arguments[2];
    var callback = arguments[3] === undefined ? null : arguments[3];

    _classCallCheck(this, Toggle);

    _get(Object.getPrototypeOf(Toggle.prototype), 'constructor', this).call(this);

    this.legend = legend;
    this._active = active;

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

  _inherits(Toggle, _events$EventEmitter);

  _createClass(Toggle, [{
    key: 'active',
    set: function (bool) {
      this._active = bool;
      this.updateBtn();
    },
    get: function () {
      return this._active;
    }
  }, {
    key: 'render',
    value: function render() {
      var content = '<span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        <div class="toggle-container">\n          <div class="x x1"></div><div class="x x2"></div>\n        </div>\n      </div>';

      this.$el = document.createElement('label');
      this.$el.classList.add(styles.ns, 'toggle');
      this.$el.innerHTML = content;

      this.$legend = this.$el.querySelector('.legend');
      this.$innerWrapper = this.$el.querySelector('.inner-wrapper');
      this.$toggle = this.$el.querySelector('.toggle-container');

      // draw a nice pretty crosshair
      this.$x1 = this.$el.querySelector('.x-1');
      this.$x2 = this.$el.querySelector('.x-2');

      this.addStyles();
      this.bindEvents();

      // initialize
      this.active = this._active;

      return this.$el;
    }
  }, {
    key: 'updateBtn',
    value: function updateBtn() {
      var method = this.active ? 'add' : 'remove';
      this.$toggle.classList[method]('active');
    }
  }, {
    key: 'addStyles',
    value: function addStyles() {
      styles.insertRules('.toggle', styles.containerStyles);
      styles.insertRules('.toggle .legend', styles.legendStyles);
      styles.insertRules('.toggle .inner-wrapper', styles.innerWrapper);
      styles.insertRules('.toggle .toggle-container', styles.toggleStyles);

      styles.insertRules('.toggle .toggle-container .x', styles.x);
      styles.insertRules('.toggle .toggle-container .x1', styles.x1);
      styles.insertRules('.toggle .toggle-container .x2', styles.x2);
      styles.insertRules('.toggle .toggle-container.active .x', styles.xActive);
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
})(events.EventEmitter);

module.exports = Toggle;
//# sourceMappingURL=data:application/json;base64,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LENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMzRCxZQUFNLENBQUMsV0FBVyxDQUFDLHdCQUF3QixFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNsRSxZQUFNLENBQUMsV0FBVyxDQUFDLDJCQUEyQixFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQzs7QUFFckUsWUFBTSxDQUFDLFdBQVcsQ0FBQyw4QkFBOEIsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0QsWUFBTSxDQUFDLFdBQVcsQ0FBQywrQkFBK0IsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDL0QsWUFBTSxDQUFDLFdBQVcsQ0FBQywrQkFBK0IsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDL0QsWUFBTSxDQUFDLFdBQVcsQ0FBQyxxQ0FBcUMsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDM0U7OztXQUVTLHNCQUFHOzs7QUFDWCxVQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDLENBQUMsRUFBSztBQUM1QyxTQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkIsWUFBSSxNQUFNLEdBQUcsTUFBSyxNQUFNLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQztBQUN4QyxjQUFLLE1BQU0sR0FBRyxNQUFNLENBQUM7O0FBRXJCLGNBQUssSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztPQUM3QixDQUFDLENBQUM7S0FDSjs7O1NBbEZHLE1BQU07R0FBUyxNQUFNLENBQUMsWUFBWTs7QUFxRnhDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDIiwiZmlsZSI6ImVzNi91dGlscy9zdHlsZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBldmVudHMgPSByZXF1aXJlKCdldmVudHMnKTtcbmNvbnN0IHN0eWxlcyA9IHJlcXVpcmUoJy4vdXRpbHMvc3R5bGVzJyk7XG5cbmNsYXNzIFRvZ2dsZSBleHRlbmRzIGV2ZW50cy5FdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcihsZWdlbmQsIGFjdGl2ZSA9IGZhbHNlLCAkY29udGFpbmVyID0gZmFsc2UsIGNhbGxiYWNrID0gbnVsbCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmxlZ2VuZCA9IGxlZ2VuZDtcbiAgICB0aGlzLl9hY3RpdmUgPSBhY3RpdmU7XG5cblxuICAgIGlmICgkY29udGFpbmVyKSB7XG4gICAgICBpZiAodHlwZW9mICRjb250YWluZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICRjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCRjb250YWluZXIpO1xuICAgICAgfVxuXG4gICAgICAkY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyKCkpO1xuICAgIH1cblxuICAgIGlmIChjYWxsYmFjaykgeyB0aGlzLm9uKCdjaGFuZ2UnLCBjYWxsYmFjayk7IH1cbiAgfVxuXG4gIHNldCBhY3RpdmUoYm9vbCkge1xuICAgIHRoaXMuX2FjdGl2ZSA9IGJvb2w7XG4gICAgdGhpcy51cGRhdGVCdG4oKTtcbiAgfVxuXG4gIGdldCBhY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgY29udGVudCA9IGA8c3BhbiBjbGFzcz1cImxlZ2VuZFwiPiR7dGhpcy5sZWdlbmR9PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImlubmVyLXdyYXBwZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRvZ2dsZS1jb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwieCB4MVwiPjwvZGl2PjxkaXYgY2xhc3M9XCJ4IHgyXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+YDtcblxuICAgIHRoaXMuJGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKHN0eWxlcy5ucywgJ3RvZ2dsZScpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiRsZWdlbmQgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcubGVnZW5kJyk7XG4gICAgdGhpcy4kaW5uZXJXcmFwcGVyID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmlubmVyLXdyYXBwZXInKTtcbiAgICB0aGlzLiR0b2dnbGUgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcudG9nZ2xlLWNvbnRhaW5lcicpO1xuXG4gICAgLy8gZHJhdyBhIG5pY2UgcHJldHR5IGNyb3NzaGFpclxuICAgIHRoaXMuJHgxID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLngtMScpO1xuICAgIHRoaXMuJHgyID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLngtMicpO1xuXG4gICAgdGhpcy5hZGRTdHlsZXMoKTtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIC8vIGluaXRpYWxpemVcbiAgICB0aGlzLmFjdGl2ZSA9IHRoaXMuX2FjdGl2ZTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIHVwZGF0ZUJ0bigpIHtcbiAgICB2YXIgbWV0aG9kID0gdGhpcy5hY3RpdmUgPyAnYWRkJyA6ICdyZW1vdmUnO1xuICAgIHRoaXMuJHRvZ2dsZS5jbGFzc0xpc3RbbWV0aG9kXSgnYWN0aXZlJyk7XG4gIH1cblxuICBhZGRTdHlsZXMoKSB7XG4gICAgc3R5bGVzLmluc2VydFJ1bGVzKCcudG9nZ2xlJywgc3R5bGVzLmNvbnRhaW5lclN0eWxlcyk7XG4gICAgc3R5bGVzLmluc2VydFJ1bGVzKCcudG9nZ2xlIC5sZWdlbmQnLCBzdHlsZXMubGVnZW5kU3R5bGVzKTtcbiAgICBzdHlsZXMuaW5zZXJ0UnVsZXMoJy50b2dnbGUgLmlubmVyLXdyYXBwZXInLCBzdHlsZXMuaW5uZXJXcmFwcGVyKTtcbiAgICBzdHlsZXMuaW5zZXJ0UnVsZXMoJy50b2dnbGUgLnRvZ2dsZS1jb250YWluZXInLCBzdHlsZXMudG9nZ2xlU3R5bGVzKTtcblxuICAgIHN0eWxlcy5pbnNlcnRSdWxlcygnLnRvZ2dsZSAudG9nZ2xlLWNvbnRhaW5lciAueCcsIHN0eWxlcy54KTtcbiAgICBzdHlsZXMuaW5zZXJ0UnVsZXMoJy50b2dnbGUgLnRvZ2dsZS1jb250YWluZXIgLngxJywgc3R5bGVzLngxKTtcbiAgICBzdHlsZXMuaW5zZXJ0UnVsZXMoJy50b2dnbGUgLnRvZ2dsZS1jb250YWluZXIgLngyJywgc3R5bGVzLngyKTtcbiAgICBzdHlsZXMuaW5zZXJ0UnVsZXMoJy50b2dnbGUgLnRvZ2dsZS1jb250YWluZXIuYWN0aXZlIC54Jywgc3R5bGVzLnhBY3RpdmUpO1xuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLiR0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdmFyIGFjdGl2ZSA9IHRoaXMuYWN0aXZlID8gZmFsc2UgOiB0cnVlO1xuICAgICAgdGhpcy5hY3RpdmUgPSBhY3RpdmU7XG5cbiAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJywgYWN0aXZlKTtcbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRvZ2dsZTsiXX0=