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
//# sourceMappingURL=data:application/json;base64,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dGVudCI6WyJjb25zdCBldmVudHMgPSByZXF1aXJlKCdldmVudHMnKTtcbmNvbnN0IHN0eWxlcyA9IHJlcXVpcmUoJy4vdXRpbHMvc3R5bGVzJyk7XG5cbmNsYXNzIEJ1dHRvbnMgZXh0ZW5kcyBldmVudHMuRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IobGVnZW5kLCBsYWJlbHMsICRjb250YWluZXIgPSBudWxsLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5sZWdlbmQgPSBsZWdlbmQ7XG4gICAgdGhpcy5sYWJlbHMgPSBsYWJlbHM7XG5cblxuICAgIGlmICgkY29udGFpbmVyKSB7XG4gICAgICBpZiAodHlwZW9mICRjb250YWluZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICRjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCRjb250YWluZXIpO1xuICAgICAgfVxuXG4gICAgICAkY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyKCkpO1xuICAgIH1cblxuICAgIGlmIChjYWxsYmFjaykgeyB0aGlzLm9uKCdjaGFuZ2UnLCBjYWxsYmFjayk7IH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgY29udGVudCA9IGA8c3BhbiBjbGFzcz1cImxlZ2VuZFwiPiR7dGhpcy5sZWdlbmR9PC9zcGFuPmAgK1xuICAgICAgYDxkaXYgY2xhc3M9XCJidXR0b25zLWNvbnRhaW5lclwiPmA7XG5cbiAgICBjb250ZW50ICs9IHRoaXMubGFiZWxzLm1hcCgobGFiZWwpID0+IHtcbiAgICAgIHJldHVybiBgPGJ1dHRvbiBkYXRhLWxhYmVsPVwiJHtsYWJlbH1cIj4ke2xhYmVsfTwvYnV0dG9uPmA7XG4gICAgfSkuam9pbignJyk7XG5cbiAgICBjb250ZW50ICs9IGA8L2J1dHRvbj5gO1xuXG4gICAgdGhpcy4kZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiRsZWdlbmQgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcubGVnZW5kJyk7XG4gICAgdGhpcy4kYnV0dG9uc0NvbnRhaW5lciA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5idXR0b25zLWNvbnRhaW5lcicpO1xuICAgIHRoaXMuJGJ1dHRvbnMgPSBBcnJheS5mcm9tKHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpKTtcblxuICAgIHRoaXMuYWRkU3R5bGVzKCk7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBhZGRTdHlsZXMoKSB7XG4gICAgZm9yIChsZXQgYXR0ciBpbiBzdHlsZXMuY29udGFpbmVyU3R5bGVzKSB7XG4gICAgICB0aGlzLiRlbC5zdHlsZVthdHRyXSA9IHN0eWxlcy5jb250YWluZXJTdHlsZXNbYXR0cl07XG4gICAgfVxuXG4gICAgZm9yIChsZXQgYXR0ciBpbiBzdHlsZXMubGVnZW5kU3R5bGVzKSB7XG4gICAgICB0aGlzLiRsZWdlbmQuc3R5bGVbYXR0cl0gPSBzdHlsZXMubGVnZW5kU3R5bGVzW2F0dHJdO1xuICAgIH1cblxuICAgIGZvciAobGV0IGF0dHIgaW4gc3R5bGVzLmJ1dHRvbnNDb250YWluZXJTdHlsZXMpIHtcbiAgICAgIHRoaXMuJGJ1dHRvbnNDb250YWluZXIuc3R5bGVbYXR0cl0gPSBzdHlsZXMuYnV0dG9uc0NvbnRhaW5lclN0eWxlc1thdHRyXTtcbiAgICB9XG5cbiAgICBjb25zdCBidXR0b25XaWR0aCA9IDEwMCAvIHRoaXMuJGJ1dHRvbnMubGVuZ3RoO1xuICAgIHRoaXMuJGJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBidXR0b24uc3R5bGUud2lkdGggPSBidXR0b25XaWR0aCArICclJztcbiAgICAgIGZvciAobGV0IGF0dHIgaW4gc3R5bGVzLmJ1dHRvblN0eWxlcykge1xuICAgICAgICBidXR0b24uc3R5bGVbYXR0cl0gPSBzdHlsZXMuYnV0dG9uU3R5bGVzW2F0dHJdO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLiRidXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgY29uc3QgbGFiZWwgPSBidXR0b24uZ2V0QXR0cmlidXRlKCdkYXRhLWxhYmVsJyk7XG5cbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzdHlsZXMuYnV0dG9uU3R5bGVzLmNsaWNrZWRCYWNrZ3JvdW5kQ29sb3I7XG4gICAgICB9KTtcblxuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzdHlsZXMuYnV0dG9uU3R5bGVzLmJhY2tncm91bmRDb2xvcjtcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCBsYWJlbCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvbnM7XG4iXX0=