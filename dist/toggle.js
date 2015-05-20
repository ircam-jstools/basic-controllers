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
      var content = '<span class="legend">' + this.legend + '</span>' + '<div class="toggle-container"><div class="toggle-active">' + '<div class="x-1"></div><div class="x-2"></div>' + '</div></div>';

      this.$el = document.createElement('label');
      this.$el.innerHTML = content;

      this.$legend = this.$el.querySelector('.legend');
      this.$toggleContainer = this.$el.querySelector('.toggle-container');
      this.$toggleActive = this.$el.querySelector('.toggle-active');

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
      var display = this.active ? 'block' : 'none';
      this.$toggleActive.style.display = display;
    }
  }, {
    key: 'addStyles',
    value: function addStyles() {
      for (var attr in styles.containerStyles) {
        this.$el.style[attr] = styles.containerStyles[attr];
      }

      for (var attr in styles.legendStyles) {
        this.$legend.style[attr] = styles.legendStyles[attr];
      }

      for (var attr in styles.toggleContainer) {
        this.$toggleContainer.style[attr] = styles.toggleContainer[attr];
      }

      for (var attr in styles.toggleActive) {
        this.$toggleActive.style[attr] = styles.toggleActive[attr];
      }

      for (var attr in styles.x1) {
        this.$x1.style[attr] = styles.x1[attr];
      }

      for (var attr in styles.x2) {
        this.$x2.style[attr] = styles.x2[attr];
      }
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this = this;

      this.$toggleContainer.addEventListener('click', function (e) {
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
//# sourceMappingURL=data:application/json;base64,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SyxJQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO09BQzdCLENBQUMsQ0FBQztLQUNKOzs7U0E3RkcsTUFBTTtHQUFTLE1BQU0sQ0FBQyxZQUFZOztBQWdHeEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMiLCJmaWxlIjoiZXM2L3V0aWxzL3N0eWxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpO1xuY29uc3Qgc3R5bGVzID0gcmVxdWlyZSgnLi91dGlscy9zdHlsZXMnKTtcblxuY2xhc3MgVG9nZ2xlIGV4dGVuZHMgZXZlbnRzLkV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgYWN0aXZlID0gZmFsc2UsICRjb250YWluZXIgPSBmYWxzZSwgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMubGVnZW5kID0gbGVnZW5kO1xuICAgIHRoaXMuX2FjdGl2ZSA9IGFjdGl2ZTtcblxuXG4gICAgaWYgKCRjb250YWluZXIpIHtcbiAgICAgIGlmICh0eXBlb2YgJGNvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgJGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJGNvbnRhaW5lcik7XG4gICAgICB9XG5cbiAgICAgICRjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXIoKSk7XG4gICAgfVxuXG4gICAgaWYgKGNhbGxiYWNrKSB7IHRoaXMub24oJ2NoYW5nZScsIGNhbGxiYWNrKTsgfVxuICB9XG5cbiAgc2V0IGFjdGl2ZShib29sKSB7XG4gICAgdGhpcy5fYWN0aXZlID0gYm9vbDtcbiAgICB0aGlzLnVwZGF0ZUJ0bigpO1xuICB9XG5cbiAgZ2V0IGFjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCBjb250ZW50ID0gYDxzcGFuIGNsYXNzPVwibGVnZW5kXCI+JHt0aGlzLmxlZ2VuZH08L3NwYW4+YCArXG4gICAgICBgPGRpdiBjbGFzcz1cInRvZ2dsZS1jb250YWluZXJcIj48ZGl2IGNsYXNzPVwidG9nZ2xlLWFjdGl2ZVwiPmAgK1xuICAgICAgICBgPGRpdiBjbGFzcz1cIngtMVwiPjwvZGl2PjxkaXYgY2xhc3M9XCJ4LTJcIj48L2Rpdj5gICtcbiAgICAgIGA8L2Rpdj48L2Rpdj5gO1xuXG4gICAgdGhpcy4kZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiRsZWdlbmQgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcubGVnZW5kJyk7XG4gICAgdGhpcy4kdG9nZ2xlQ29udGFpbmVyID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLnRvZ2dsZS1jb250YWluZXInKTtcbiAgICB0aGlzLiR0b2dnbGVBY3RpdmUgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcudG9nZ2xlLWFjdGl2ZScpO1xuXG4gICAgLy8gZHJhdyBhIG5pY2UgcHJldHR5IGNyb3NzaGFpclxuICAgIHRoaXMuJHgxID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLngtMScpO1xuICAgIHRoaXMuJHgyID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLngtMicpO1xuXG4gICAgdGhpcy5hZGRTdHlsZXMoKTtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIC8vIGluaXRpYWxpemVcbiAgICB0aGlzLmFjdGl2ZSA9IHRoaXMuX2FjdGl2ZTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIHVwZGF0ZUJ0bigpIHtcbiAgICB2YXIgZGlzcGxheSA9IHRoaXMuYWN0aXZlID8gJ2Jsb2NrJyA6ICdub25lJztcbiAgICB0aGlzLiR0b2dnbGVBY3RpdmUuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XG4gIH1cblxuICBhZGRTdHlsZXMoKSB7XG4gICAgZm9yIChsZXQgYXR0ciBpbiBzdHlsZXMuY29udGFpbmVyU3R5bGVzKSB7XG4gICAgICB0aGlzLiRlbC5zdHlsZVthdHRyXSA9IHN0eWxlcy5jb250YWluZXJTdHlsZXNbYXR0cl07XG4gICAgfVxuXG4gICAgZm9yIChsZXQgYXR0ciBpbiBzdHlsZXMubGVnZW5kU3R5bGVzKSB7XG4gICAgICB0aGlzLiRsZWdlbmQuc3R5bGVbYXR0cl0gPSBzdHlsZXMubGVnZW5kU3R5bGVzW2F0dHJdO1xuICAgIH1cblxuICAgIGZvciAobGV0IGF0dHIgaW4gc3R5bGVzLnRvZ2dsZUNvbnRhaW5lcikge1xuICAgICAgdGhpcy4kdG9nZ2xlQ29udGFpbmVyLnN0eWxlW2F0dHJdID0gc3R5bGVzLnRvZ2dsZUNvbnRhaW5lclthdHRyXTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBhdHRyIGluIHN0eWxlcy50b2dnbGVBY3RpdmUpIHtcbiAgICAgIHRoaXMuJHRvZ2dsZUFjdGl2ZS5zdHlsZVthdHRyXSA9IHN0eWxlcy50b2dnbGVBY3RpdmVbYXR0cl07XG4gICAgfVxuXG4gICAgZm9yIChsZXQgYXR0ciBpbiBzdHlsZXMueDEpIHtcbiAgICAgIHRoaXMuJHgxLnN0eWxlW2F0dHJdID0gc3R5bGVzLngxW2F0dHJdO1xuICAgIH1cblxuICAgIGZvciAobGV0IGF0dHIgaW4gc3R5bGVzLngyKSB7XG4gICAgICB0aGlzLiR4Mi5zdHlsZVthdHRyXSA9IHN0eWxlcy54MlthdHRyXTtcbiAgICB9XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJHRvZ2dsZUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB2YXIgYWN0aXZlID0gdGhpcy5hY3RpdmUgPyBmYWxzZSA6IHRydWU7XG4gICAgICB0aGlzLmFjdGl2ZSA9IGFjdGl2ZTtcblxuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCBhY3RpdmUpO1xuICAgIH0pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVG9nZ2xlOyJdfQ==