'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _get = require('babel-runtime/helpers/get')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var events = require('events');
var styles = require('./utils/styles');

var Buttons = (function (_events$EventEmitter) {
  function Buttons(legend, labels) {
    var $container = arguments[2] === undefined ? null : arguments[2];
    var callback = arguments[3] === undefined ? null : arguments[3];

    _classCallCheck(this, Buttons);

    _get(Object.getPrototypeOf(Buttons.prototype), 'constructor', this).call(this);

    this.legend = legend;
    this.labels = labels;

    console.log(this);
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

  _inherits(Buttons, _events$EventEmitter);

  _createClass(Buttons, [{
    key: 'render',
    value: function render() {
      var content = '<span class="legend">' + this.legend + '</span>' + '<div class="buttons-container">';

      content += this.labels.map(function (label) {
        return '<button data-label="' + label + '">' + label + '</button>';
      }).join('');

      content += '</button>';

      this.$el = document.createElement('label');
      this.$el.innerHTML = content;

      this.$legend = this.$el.querySelector('.legend');
      this.$buttonsContainer = this.$el.querySelector('.buttons-container');
      this.$buttons = _Array$from(this.$el.querySelectorAll('button'));

      this.addStyles();
      this.bindEvents();

      return this.$el;
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

      for (var attr in styles.buttonsContainerStyles) {
        this.$buttonsContainer.style[attr] = styles.buttonsContainerStyles[attr];
      }

      var buttonWidth = 100 / this.$buttons.length;
      this.$buttons.forEach(function (button) {
        button.style.width = buttonWidth + '%';
        for (var attr in styles.buttonStyles) {
          button.style[attr] = styles.buttonStyles[attr];
        }
      });
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this = this;

      this.$buttons.forEach(function (button) {
        var label = button.getAttribute('data-label');

        button.addEventListener('mousedown', function (e) {
          e.preventDefault();
          button.style.backgroundColor = styles.buttonStyles.clickedBackgroundColor;
        });

        button.addEventListener('mouseup', function (e) {
          e.preventDefault();
          button.style.backgroundColor = styles.buttonStyles.backgroundColor;
          _this.emit('change', label);
        });
      });
    }
  }]);

  return Buttons;
})(events.EventEmitter);

module.exports = Buttons;
//# sourceMappingURL=data:application/json;base64,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T0FBTyxDQUFDIiwiZmlsZSI6ImVzNi91dGlscy9zdHlsZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBldmVudHMgPSByZXF1aXJlKCdldmVudHMnKTtcbmNvbnN0IHN0eWxlcyA9IHJlcXVpcmUoJy4vdXRpbHMvc3R5bGVzJyk7XG5cbmNsYXNzIEJ1dHRvbnMgZXh0ZW5kcyBldmVudHMuRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IobGVnZW5kLCBsYWJlbHMsICRjb250YWluZXIgPSBudWxsLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5sZWdlbmQgPSBsZWdlbmQ7XG4gICAgdGhpcy5sYWJlbHMgPSBsYWJlbHM7XG5cbiAgICBjb25zb2xlLmxvZyh0aGlzKTtcbiAgICBpZiAoJGNvbnRhaW5lcikge1xuICAgICAgaWYgKHR5cGVvZiAkY29udGFpbmVyID09PSAnc3RyaW5nJykge1xuICAgICAgICAkY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigkY29udGFpbmVyKTtcbiAgICAgIH1cblxuICAgICAgJGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcigpKTtcbiAgICB9XG5cbiAgICBpZiAoY2FsbGJhY2spIHsgdGhpcy5vbignY2hhbmdlJywgY2FsbGJhY2spOyB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBgPHNwYW4gY2xhc3M9XCJsZWdlbmRcIj4ke3RoaXMubGVnZW5kfTwvc3Bhbj5gICtcbiAgICAgIGA8ZGl2IGNsYXNzPVwiYnV0dG9ucy1jb250YWluZXJcIj5gO1xuXG4gICAgY29udGVudCArPSB0aGlzLmxhYmVscy5tYXAoKGxhYmVsKSA9PiB7XG4gICAgICByZXR1cm4gYDxidXR0b24gZGF0YS1sYWJlbD1cIiR7bGFiZWx9XCI+JHtsYWJlbH08L2J1dHRvbj5gO1xuICAgIH0pLmpvaW4oJycpO1xuXG4gICAgY29udGVudCArPSBgPC9idXR0b24+YDtcblxuICAgIHRoaXMuJGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gICAgdGhpcy4kbGVnZW5kID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmxlZ2VuZCcpO1xuICAgIHRoaXMuJGJ1dHRvbnNDb250YWluZXIgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9ucy1jb250YWluZXInKTtcbiAgICB0aGlzLiRidXR0b25zID0gQXJyYXkuZnJvbSh0aGlzLiRlbC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKSk7XG5cbiAgICB0aGlzLmFkZFN0eWxlcygpO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgYWRkU3R5bGVzKCkge1xuICAgIGZvciAobGV0IGF0dHIgaW4gc3R5bGVzLmNvbnRhaW5lclN0eWxlcykge1xuICAgICAgdGhpcy4kZWwuc3R5bGVbYXR0cl0gPSBzdHlsZXMuY29udGFpbmVyU3R5bGVzW2F0dHJdO1xuICAgIH1cblxuICAgIGZvciAobGV0IGF0dHIgaW4gc3R5bGVzLmxlZ2VuZFN0eWxlcykge1xuICAgICAgdGhpcy4kbGVnZW5kLnN0eWxlW2F0dHJdID0gc3R5bGVzLmxlZ2VuZFN0eWxlc1thdHRyXTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBhdHRyIGluIHN0eWxlcy5idXR0b25zQ29udGFpbmVyU3R5bGVzKSB7XG4gICAgICB0aGlzLiRidXR0b25zQ29udGFpbmVyLnN0eWxlW2F0dHJdID0gc3R5bGVzLmJ1dHRvbnNDb250YWluZXJTdHlsZXNbYXR0cl07XG4gICAgfVxuXG4gICAgY29uc3QgYnV0dG9uV2lkdGggPSAxMDAgLyB0aGlzLiRidXR0b25zLmxlbmd0aDtcbiAgICB0aGlzLiRidXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgYnV0dG9uLnN0eWxlLndpZHRoID0gYnV0dG9uV2lkdGggKyAnJSc7XG4gICAgICBmb3IgKGxldCBhdHRyIGluIHN0eWxlcy5idXR0b25TdHlsZXMpIHtcbiAgICAgICAgYnV0dG9uLnN0eWxlW2F0dHJdID0gc3R5bGVzLmJ1dHRvblN0eWxlc1thdHRyXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGNvbnN0IGxhYmVsID0gYnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS1sYWJlbCcpO1xuXG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBidXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gc3R5bGVzLmJ1dHRvblN0eWxlcy5jbGlja2VkQmFja2dyb3VuZENvbG9yO1xuICAgICAgfSk7XG5cbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBidXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gc3R5bGVzLmJ1dHRvblN0eWxlcy5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJywgbGFiZWwpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b25zO1xuIl19