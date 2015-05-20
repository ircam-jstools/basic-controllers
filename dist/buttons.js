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
      var content = '<span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">';

      content += this.labels.map(function (label) {
        return '<button data-label="' + label + '">' + label + '</button>';
      }).join('');

      content += '</div>';

      this.$el = document.createElement('label');
      this.$el.classList.add(styles.ns, 'buttons');
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
      styles.insertRules('.buttons', styles.containerStyles);
      styles.insertRules('.buttons .legend', styles.legendStyles);
      styles.insertRules('.buttons .inner-wrapper', styles.innerWrapper);
      styles.insertRules('.buttons button', styles.buttonStyles);
      styles.insertRules('.buttons button.active', styles.buttonActiveStyles);
      // styles.insertRules('.buttons button:focus', styles.buttonFocusStyles);
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this = this;

      this.$buttons.forEach(function (button) {
        var label = button.getAttribute('data-label');

        button.addEventListener('mousedown', function (e) {
          e.preventDefault();
          button.classList.add('active');
        });

        button.addEventListener('mouseup', function (e) {
          e.preventDefault();
          button.classList.remove('active');
          _this.emit('change', label);
        });
      });
    }
  }]);

  return Buttons;
})(events.EventEmitter);

module.exports = Buttons;
//# sourceMappingURL=data:application/json;base64,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LFlBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRWhELGNBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsVUFBQyxDQUFDLEVBQUs7QUFDMUMsV0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ25CLGdCQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNoQyxDQUFDLENBQUM7O0FBRUgsY0FBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFDLENBQUMsRUFBSztBQUN4QyxXQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkIsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2xDLGdCQUFLLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDNUIsQ0FBQyxDQUFDO09BQ0osQ0FBQyxDQUFDO0tBQ0o7OztTQWxFRyxPQUFPO0dBQVMsTUFBTSxDQUFDLFlBQVk7O0FBcUV6QyxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyIsImZpbGUiOiJlczYvYnV0dG9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpO1xuY29uc3Qgc3R5bGVzID0gcmVxdWlyZSgnLi91dGlscy9zdHlsZXMnKTtcblxuY2xhc3MgQnV0dG9ucyBleHRlbmRzIGV2ZW50cy5FdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcihsZWdlbmQsIGxhYmVscywgJGNvbnRhaW5lciA9IG51bGwsIGNhbGxiYWNrID0gbnVsbCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmxlZ2VuZCA9IGxlZ2VuZDtcbiAgICB0aGlzLmxhYmVscyA9IGxhYmVscztcblxuICAgIGlmICgkY29udGFpbmVyKSB7XG4gICAgICBpZiAodHlwZW9mICRjb250YWluZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICRjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCRjb250YWluZXIpO1xuICAgICAgfVxuXG4gICAgICAkY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyKCkpO1xuICAgIH1cblxuICAgIGlmIChjYWxsYmFjaykgeyB0aGlzLm9uKCdjaGFuZ2UnLCBjYWxsYmFjayk7IH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgY29udGVudCA9IGA8c3BhbiBjbGFzcz1cImxlZ2VuZFwiPiR7dGhpcy5sZWdlbmR9PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImlubmVyLXdyYXBwZXJcIj5gO1xuXG4gICAgY29udGVudCArPSB0aGlzLmxhYmVscy5tYXAoKGxhYmVsKSA9PiB7XG4gICAgICByZXR1cm4gYDxidXR0b24gZGF0YS1sYWJlbD1cIiR7bGFiZWx9XCI+JHtsYWJlbH08L2J1dHRvbj5gO1xuICAgIH0pLmpvaW4oJycpO1xuXG4gICAgY29udGVudCArPSBgPC9kaXY+YDtcblxuICAgIHRoaXMuJGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKHN0eWxlcy5ucywgJ2J1dHRvbnMnKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gICAgdGhpcy4kbGVnZW5kID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmxlZ2VuZCcpO1xuICAgIHRoaXMuJGJ1dHRvbnNDb250YWluZXIgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9ucy1jb250YWluZXInKTtcbiAgICB0aGlzLiRidXR0b25zID0gQXJyYXkuZnJvbSh0aGlzLiRlbC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKSk7XG5cbiAgICB0aGlzLmFkZFN0eWxlcygpO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgYWRkU3R5bGVzKCkge1xuICAgIHN0eWxlcy5pbnNlcnRSdWxlcygnLmJ1dHRvbnMnLCBzdHlsZXMuY29udGFpbmVyU3R5bGVzKTtcbiAgICBzdHlsZXMuaW5zZXJ0UnVsZXMoJy5idXR0b25zIC5sZWdlbmQnLCBzdHlsZXMubGVnZW5kU3R5bGVzKTtcbiAgICBzdHlsZXMuaW5zZXJ0UnVsZXMoJy5idXR0b25zIC5pbm5lci13cmFwcGVyJywgc3R5bGVzLmlubmVyV3JhcHBlcik7XG4gICAgc3R5bGVzLmluc2VydFJ1bGVzKCcuYnV0dG9ucyBidXR0b24nLCBzdHlsZXMuYnV0dG9uU3R5bGVzKTtcbiAgICBzdHlsZXMuaW5zZXJ0UnVsZXMoJy5idXR0b25zIGJ1dHRvbi5hY3RpdmUnLCBzdHlsZXMuYnV0dG9uQWN0aXZlU3R5bGVzKTtcbiAgICAvLyBzdHlsZXMuaW5zZXJ0UnVsZXMoJy5idXR0b25zIGJ1dHRvbjpmb2N1cycsIHN0eWxlcy5idXR0b25Gb2N1c1N0eWxlcyk7XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJGJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBjb25zdCBsYWJlbCA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGFiZWwnKTtcblxuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgfSk7XG5cbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJywgbGFiZWwpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b25zO1xuIl19