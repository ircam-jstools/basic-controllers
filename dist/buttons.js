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
//# sourceMappingURL=data:application/json;base64,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Q0FBQyIsImZpbGUiOiJlczYvYnV0dG9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpO1xuY29uc3Qgc3R5bGVzID0gcmVxdWlyZSgnLi91dGlscy9zdHlsZXMnKTtcblxuY2xhc3MgQnV0dG9ucyBleHRlbmRzIGV2ZW50cy5FdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcihsZWdlbmQsIGxhYmVscywgJGNvbnRhaW5lciA9IG51bGwsIGNhbGxiYWNrID0gbnVsbCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmxlZ2VuZCA9IGxlZ2VuZDtcbiAgICB0aGlzLmxhYmVscyA9IGxhYmVscztcblxuICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICAgIGlmICgkY29udGFpbmVyKSB7XG4gICAgICBpZiAodHlwZW9mICRjb250YWluZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICRjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCRjb250YWluZXIpO1xuICAgICAgfVxuXG4gICAgICAkY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyKCkpO1xuICAgIH1cblxuICAgIGlmIChjYWxsYmFjaykgeyB0aGlzLm9uKCdjaGFuZ2UnLCBjYWxsYmFjayk7IH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgY29udGVudCA9IGA8c3BhbiBjbGFzcz1cImxlZ2VuZFwiPiR7dGhpcy5sZWdlbmR9PC9zcGFuPmAgK1xuICAgICAgYDxkaXYgY2xhc3M9XCJidXR0b25zLWNvbnRhaW5lclwiPmA7XG5cbiAgICBjb250ZW50ICs9IHRoaXMubGFiZWxzLm1hcCgobGFiZWwpID0+IHtcbiAgICAgIHJldHVybiBgPGJ1dHRvbiBkYXRhLWxhYmVsPVwiJHtsYWJlbH1cIj4ke2xhYmVsfTwvYnV0dG9uPmA7XG4gICAgfSkuam9pbignJyk7XG5cbiAgICBjb250ZW50ICs9IGA8L2J1dHRvbj5gO1xuXG4gICAgdGhpcy4kZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiRsZWdlbmQgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcubGVnZW5kJyk7XG4gICAgdGhpcy4kYnV0dG9uc0NvbnRhaW5lciA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5idXR0b25zLWNvbnRhaW5lcicpO1xuICAgIHRoaXMuJGJ1dHRvbnMgPSBBcnJheS5mcm9tKHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpKTtcblxuICAgIHRoaXMuYWRkU3R5bGVzKCk7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBhZGRTdHlsZXMoKSB7XG4gICAgZm9yIChsZXQgYXR0ciBpbiBzdHlsZXMuY29udGFpbmVyU3R5bGVzKSB7XG4gICAgICB0aGlzLiRlbC5zdHlsZVthdHRyXSA9IHN0eWxlcy5jb250YWluZXJTdHlsZXNbYXR0cl07XG4gICAgfVxuXG4gICAgZm9yIChsZXQgYXR0ciBpbiBzdHlsZXMubGVnZW5kU3R5bGVzKSB7XG4gICAgICB0aGlzLiRsZWdlbmQuc3R5bGVbYXR0cl0gPSBzdHlsZXMubGVnZW5kU3R5bGVzW2F0dHJdO1xuICAgIH1cblxuICAgIGZvciAobGV0IGF0dHIgaW4gc3R5bGVzLmJ1dHRvbnNDb250YWluZXJTdHlsZXMpIHtcbiAgICAgIHRoaXMuJGJ1dHRvbnNDb250YWluZXIuc3R5bGVbYXR0cl0gPSBzdHlsZXMuYnV0dG9uc0NvbnRhaW5lclN0eWxlc1thdHRyXTtcbiAgICB9XG5cbiAgICBjb25zdCBidXR0b25XaWR0aCA9IDEwMCAvIHRoaXMuJGJ1dHRvbnMubGVuZ3RoO1xuICAgIHRoaXMuJGJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBidXR0b24uc3R5bGUud2lkdGggPSBidXR0b25XaWR0aCArICclJztcbiAgICAgIGZvciAobGV0IGF0dHIgaW4gc3R5bGVzLmJ1dHRvblN0eWxlcykge1xuICAgICAgICBidXR0b24uc3R5bGVbYXR0cl0gPSBzdHlsZXMuYnV0dG9uU3R5bGVzW2F0dHJdO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLiRidXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgY29uc3QgbGFiZWwgPSBidXR0b24uZ2V0QXR0cmlidXRlKCdkYXRhLWxhYmVsJyk7XG5cbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzdHlsZXMuYnV0dG9uU3R5bGVzLmNsaWNrZWRCYWNrZ3JvdW5kQ29sb3I7XG4gICAgICB9KTtcblxuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzdHlsZXMuYnV0dG9uU3R5bGVzLmJhY2tncm91bmRDb2xvcjtcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCBsYWJlbCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvbnM7XG4iXX0=